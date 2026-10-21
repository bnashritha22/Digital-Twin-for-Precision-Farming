
import './Profile.css';

export default function Profile({ user, language, setLanguage, theme, toggleTheme, onLogout }) {
  const name = user?.full_name || 'FarmTwin User';
  const email = user?.email || 'Email not available';
  const initials = name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="profile-page">
      <section className="profile-hero">
        <div className="profile-hero-glow" />
        <div className="profile-hero-content">
          <div className="profile-avatar">{initials}</div>
          <div className="profile-hero-text">
            <span className="profile-eyebrow">FARMTWIN ACCOUNT</span>
            <h2>{name}</h2>
            <p>{email}</p>
            <span className="profile-status">
              <span className="profile-status-dot" />
              Account registered
            </span>
          </div>
          <div className="profile-hero-icon">🌱</div>
        </div>
        <div className="profile-hero-footer">
          <span>🌾 Digital Twin for Precision Farming</span>
          <span>Your farming workspace</span>
        </div>
      </section>

      <div className="profile-section-heading">
        <div>
          <span className="profile-section-kicker">YOUR ACCOUNT</span>
          <h2>Profile & Settings</h2>
          <p>Manage your account and personalize your experience.</p>
        </div>
      </div>

      <div className="profile-grid">
        <section className="profile-card profile-details-card">
          <div className="profile-card-heading">
            <div className="profile-card-icon">👤</div>
            <div>
              <h3>Personal information</h3>
              <p>Your registered account details</p>
            </div>
          </div>

          <div className="profile-info-row">
            <span className="profile-info-icon">✦</span>
            <div>
              <span className="profile-field-label">FULL NAME</span>
              <strong>{name}</strong>
            </div>
          </div>

          <div className="profile-info-row">
            <span className="profile-info-icon">✉</span>
            <div>
              <span className="profile-field-label">EMAIL ADDRESS</span>
              <strong className="profile-email">{email}</strong>
            </div>
          </div>

          <div className="profile-account-note">
            <span>🛡️</span>
            <div>
              <strong>Your account is ready</strong>
              <p>Access your precision farming tools from one place.</p>
            </div>
          </div>
        </section>

        <section className="profile-card profile-preferences-card">
          <div className="profile-card-heading">
            <div className="profile-card-icon">⚙️</div>
            <div>
              <h3>App preferences</h3>
              <p>Set up FarmTwin your way</p>
            </div>
          </div>

          <label className="profile-setting-row">
            <span className="profile-setting-icon">🌐</span>
            <span className="profile-setting-copy">
              <strong>Display language</strong>
              <small>Choose your preferred language</small>
            </span>
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              aria-label="Display language"
            >
              <option value="English">English</option>
              <option value="Hindi">हिन्दी</option>
              <option value="Kannada">ಕನ್ನಡ</option>
              <option value="Tamil">தமிழ்</option>
              <option value="Telugu">తెలుగు</option>
              <option value="Malayalam">മലയാളം</option>
            </select>
          </label>

          <div className="profile-setting-row">
            <span className="profile-setting-icon">
              {theme === 'light' ? '🌙' : '☀️'}
            </span>
            <span className="profile-setting-copy">
              <strong>Appearance</strong>
              <small>{theme === 'light' ? 'Light mode enabled' : 'Dark mode enabled'}</small>
            </span>
            <button
              type="button"
              className="profile-outline-button"
              onClick={toggleTheme}
            >
              {theme === 'light' ? 'Dark mode' : 'Light mode'}
            </button>
          </div>

          <div className="profile-preference-note">
            <span>💡</span>
            Your preferences apply to the existing FarmTwin interface.
          </div>
        </section>
      </div>

      <section className="profile-logout-card">
        <div className="profile-logout-symbol">↗</div>
        <div className="profile-logout-copy">
          <h3>Leaving FarmTwin?</h3>
          <p>Sign out of your account on this device. You can sign in again anytime.</p>
        </div>
        <button
          type="button"
          className="profile-logout-button"
          onClick={onLogout}
        >
          <span>⇥</span> Sign out
        </button>
      </section>

      <p className="profile-footer-note">
        FARMTWIN <span>•</span> SMARTER FARMING, BETTER DECISIONS
      </p>
    </div>
  );
}
