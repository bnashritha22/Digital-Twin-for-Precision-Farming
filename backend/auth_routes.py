
import hashlib
import hmac
import secrets
import sqlite3
from datetime import datetime, timedelta, timezone
from pathlib import Path

from fastapi import APIRouter, Depends, Header, HTTPException
from pydantic import BaseModel, Field


router = APIRouter(prefix="/api/auth", tags=["Authentication"])

DB_PATH = Path(__file__).resolve().parent / "farmtwin_users.db"
ITERATIONS = 310_000


def get_db():
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def initialize_auth_db():
    with get_db() as db:
        db.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                full_name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password_hash TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
        """)
        db.execute("""
            CREATE TABLE IF NOT EXISTS auth_sessions (
                token_hash TEXT PRIMARY KEY,
                user_id INTEGER NOT NULL,
                expires_at TEXT NOT NULL,
                FOREIGN KEY(user_id) REFERENCES users(id)
            )
        """)


def hash_password(password: str) -> str:
    salt = secrets.token_bytes(16)
    digest = hashlib.pbkdf2_hmac(
        "sha256", password.encode("utf-8"), salt, ITERATIONS
    )
    return f"{salt.hex()}:{digest.hex()}"


def verify_password(password: str, stored_hash: str) -> bool:
    try:
        salt_hex, digest_hex = stored_hash.split(":")
        salt = bytes.fromhex(salt_hex)
        expected = bytes.fromhex(digest_hex)
        actual = hashlib.pbkdf2_hmac(
            "sha256", password.encode("utf-8"), salt, ITERATIONS
        )
        return hmac.compare_digest(actual, expected)
    except (ValueError, TypeError):
        return False


def create_session(user_id: int) -> str:
    token = secrets.token_urlsafe(32)
    token_hash = hashlib.sha256(token.encode()).hexdigest()
    expires = datetime.now(timezone.utc) + timedelta(days=7)

    with get_db() as db:
        db.execute(
            "INSERT INTO auth_sessions (token_hash, user_id, expires_at) "
            "VALUES (?, ?, ?)",
            (token_hash, user_id, expires.isoformat()),
        )

    return token


def public_user(user):
    return {
        "id": user["id"],
        "full_name": user["full_name"],
        "email": user["email"],
    }


class RegisterInput(BaseModel):
    full_name: str = Field(min_length=2, max_length=80)
    email: str = Field(min_length=5, max_length=254)
    password: str = Field(min_length=8, max_length=128)


class LoginInput(BaseModel):
    email: str = Field(min_length=5, max_length=254)
    password: str = Field(min_length=1, max_length=128)


def get_current_user(authorization: str | None = Header(default=None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Please sign in.")

    token = authorization[7:].strip()
    token_hash = hashlib.sha256(token.encode()).hexdigest()

    with get_db() as db:
        session = db.execute(
            """
            SELECT users.id, users.full_name, users.email,
                   auth_sessions.expires_at
            FROM auth_sessions
            JOIN users ON users.id = auth_sessions.user_id
            WHERE auth_sessions.token_hash = ?
            """,
            (token_hash,),
        ).fetchone()

    if not session:
        raise HTTPException(status_code=401, detail="Session is invalid.")

    expires = datetime.fromisoformat(session["expires_at"])
    if expires <= datetime.now(timezone.utc):
        with get_db() as db:
            db.execute(
                "DELETE FROM auth_sessions WHERE token_hash = ?",
                (token_hash,),
            )
        raise HTTPException(
            status_code=401, detail="Session expired. Please sign in again."
        )

    return session


initialize_auth_db()


@router.post("/register")
def register(data: RegisterInput):
    name = data.full_name.strip()
    email = data.email.strip().lower()

    if len(name) < 2:
        raise HTTPException(status_code=400, detail="Enter your full name.")

    if "@" not in email or "." not in email.rsplit("@", 1)[-1]:
        raise HTTPException(status_code=400, detail="Enter a valid email address.")

    if data.password.strip() == "":
        raise HTTPException(status_code=400, detail="Enter a valid password.")

    try:
        with get_db() as db:
            cursor = db.execute(
                """
                INSERT INTO users (full_name, email, password_hash, created_at)
                VALUES (?, ?, ?, ?)
                """,
                (
                    name,
                    email,
                    hash_password(data.password),
                    datetime.now(timezone.utc).isoformat(),
                ),
            )
            user_id = cursor.lastrowid
            user = db.execute(
                "SELECT id, full_name, email FROM users WHERE id = ?",
                (user_id,),
            ).fetchone()
    except sqlite3.IntegrityError:
        raise HTTPException(
            status_code=409,
            detail="An account with this email already exists. Please sign in.",
        )

    token = create_session(user_id)
    return {"access_token": token, "token_type": "bearer", "user": public_user(user)}


@router.post("/login")
def login(data: LoginInput):
    email = data.email.strip().lower()

    with get_db() as db:
        user = db.execute(
            "SELECT * FROM users WHERE email = ?", (email,)
        ).fetchone()

    if not user or not verify_password(data.password, user["password_hash"]):
        raise HTTPException(
            status_code=401, detail="Incorrect email or password."
        )

    token = create_session(user["id"])
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": public_user(user),
    }


@router.get("/me")
def get_me(user=Depends(get_current_user)):
    return public_user(user)


@router.post("/logout")
def logout(
    authorization: str | None = Header(default=None),
    user=Depends(get_current_user),
):
    token = authorization[7:].strip()
    token_hash = hashlib.sha256(token.encode()).hexdigest()

    with get_db() as db:
        db.execute(
            "DELETE FROM auth_sessions WHERE token_hash = ?",
            (token_hash,),
        )

    return {"message": "Signed out successfully."}
