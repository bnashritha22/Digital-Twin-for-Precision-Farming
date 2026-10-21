
import { useState } from 'react';
import './Notifications.css';

const notificationTranslations = {
  English: {
    heading: 'Notification Center',
    description: 'Keep track of important updates for your digital farm.',
    unread: 'unread',
    all: 'All',
    unreadFilter: 'Unread',
    markAll: 'Mark all as read',
    caughtUp: "You're all caught up!",
    none: 'No notifications to display.',
    markRead: 'Mark as read',
    dismiss: 'Dismiss',
    clearAll: 'Clear all notifications',
    note: 'These are demonstration notifications. Live alerts will be connected to your backend in a later step.',
    types: ['Weather', 'Crop Health', 'Soil'],
    titles: ['Weather Update', 'Crop Health Reminder', 'Soil Moisture Check'],
    messages: [
      'Check the latest weather conditions before scheduling irrigation.',
      'Review your crop analysis for signs of stress or nutrient deficiency.',
      'Monitor soil moisture before deciding whether your crops need watering.',
    ],
    times: ['Just now', '10 minutes ago', 'Today'],
  },
  Hindi: {
    heading: 'सूचना केंद्र',
    description: 'अपने डिजिटल खेत के महत्वपूर्ण अपडेट देखें।',
    unread: 'अपठित',
    all: 'सभी',
    unreadFilter: 'अपठित',
    markAll: 'सभी को पढ़ा हुआ चिह्नित करें',
    caughtUp: 'आपने सभी सूचनाएँ देख ली हैं!',
    none: 'दिखाने के लिए कोई सूचना नहीं है।',
    markRead: 'पढ़ा हुआ चिह्नित करें',
    dismiss: 'हटाएँ',
    clearAll: 'सभी सूचनाएँ हटाएँ',
    note: 'ये प्रदर्शन के लिए नमूना सूचनाएँ हैं। लाइव अलर्ट बाद में बैकएंड से जोड़े जाएँगे।',
    types: ['मौसम', 'फसल स्वास्थ्य', 'मिट्टी'],
    titles: ['मौसम अपडेट', 'फसल स्वास्थ्य अनुस्मारक', 'मिट्टी की नमी की जाँच'],
    messages: [
      'सिंचाई का समय तय करने से पहले नवीनतम मौसम की स्थिति देखें।',
      'तनाव या पोषक तत्वों की कमी के संकेतों के लिए फसल विश्लेषण देखें।',
      'फसलों को पानी देने का निर्णय लेने से पहले मिट्टी की नमी जाँचें।',
    ],
    times: ['अभी', '10 मिनट पहले', 'आज'],
  },
  Kannada: {
    heading: 'ಅಧಿಸೂಚನೆ ಕೇಂದ್ರ',
    description: 'ನಿಮ್ಮ ಡಿಜಿಟಲ್ ಹೊಲದ ಪ್ರಮುಖ ನವೀಕರಣಗಳನ್ನು ಗಮನದಲ್ಲಿಡಿ.',
    unread: 'ಓದದವು',
    all: 'ಎಲ್ಲಾ',
    unreadFilter: 'ಓದದವು',
    markAll: 'ಎಲ್ಲವನ್ನೂ ಓದಿದವು ಎಂದು ಗುರುತಿಸಿ',
    caughtUp: 'ನೀವು ಎಲ್ಲಾ ಅಧಿಸೂಚನೆಗಳನ್ನು ನೋಡಿದ್ದೀರಿ!',
    none: 'ತೋರಿಸಲು ಯಾವುದೇ ಅಧಿಸೂಚನೆಗಳಿಲ್ಲ.',
    markRead: 'ಓದಿದವು ಎಂದು ಗುರುತಿಸಿ',
    dismiss: 'ತೆಗೆದುಹಾಕಿ',
    clearAll: 'ಎಲ್ಲಾ ಅಧಿಸೂಚನೆಗಳನ್ನು ತೆರವುಗೊಳಿಸಿ',
    note: 'ಇವು ಪ್ರದರ್ಶನಕ್ಕಾಗಿ ಇರುವ ಮಾದರಿ ಅಧಿಸೂಚನೆಗಳು. ನೈಜ ಎಚ್ಚರಿಕೆಗಳನ್ನು ನಂತರ ಬ್ಯಾಕೆಂಡ್‌ಗೆ ಸಂಪರ್ಕಿಸಲಾಗುತ್ತದೆ.',
    types: ['ಹವಾಮಾನ', 'ಬೆಳೆ ಆರೋಗ್ಯ', 'ಮಣ್ಣು'],
    titles: ['ಹವಾಮಾನ ನವೀಕರಣ', 'ಬೆಳೆ ಆರೋಗ್ಯ ಜ್ಞಾಪನೆ', 'ಮಣ್ಣಿನ ತೇವಾಂಶ ಪರಿಶೀಲನೆ'],
    messages: [
      'ನೀರಾವರಿ ವೇಳಾಪಟ್ಟಿ ಮಾಡುವ ಮೊದಲು ಇತ್ತೀಚಿನ ಹವಾಮಾನವನ್ನು ಪರಿಶೀಲಿಸಿ.',
      'ಬೆಳೆ ಒತ್ತಡ ಅಥವಾ ಪೋಷಕಾಂಶಗಳ ಕೊರತೆಯ ಲಕ್ಷಣಗಳಿಗಾಗಿ ಬೆಳೆ ವಿಶ್ಲೇಷಣೆಯನ್ನು ಪರಿಶೀಲಿಸಿ.',
      'ಬೆಳೆಗಳಿಗೆ ನೀರು ಹಾಕುವ ಮೊದಲು ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ಪರಿಶೀಲಿಸಿ.',
    ],
    times: ['ಈಗಷ್ಟೇ', '10 ನಿಮಿಷಗಳ ಹಿಂದೆ', 'ಇಂದು'],
  },
  Tamil: {
    heading: 'அறிவிப்பு மையம்',
    description: 'உங்கள் டிஜிட்டல் பண்ணையின் முக்கிய புதுப்பிப்புகளைக் கவனியுங்கள்.',
    unread: 'படிக்காதவை',
    all: 'அனைத்தும்',
    unreadFilter: 'படிக்காதவை',
    markAll: 'அனைத்தையும் படித்ததாகக் குறிக்கவும்',
    caughtUp: 'அனைத்து அறிவிப்புகளையும் பார்த்துவிட்டீர்கள்!',
    none: 'காண்பிக்க அறிவிப்புகள் இல்லை.',
    markRead: 'படித்ததாகக் குறிக்கவும்',
    dismiss: 'நீக்கவும்',
    clearAll: 'அனைத்து அறிவிப்புகளையும் அழிக்கவும்',
    note: 'இவை செயல்விளக்க அறிவிப்புகள். நேரடி எச்சரிக்கைகள் பின்னர் பின்தளத்துடன் இணைக்கப்படும்.',
    types: ['வானிலை', 'பயிர் ஆரோக்கியம்', 'மண்'],
    titles: ['வானிலை புதுப்பிப்பு', 'பயிர் ஆரோக்கிய நினைவூட்டல்', 'மண் ஈரப்பதச் சோதனை'],
    messages: [
      'நீர்ப்பாசனத்தைத் திட்டமிடுவதற்கு முன் சமீபத்திய வானிலையைச் சரிபார்க்கவும்.',
      'பயிர்களில் பாதிப்பு அல்லது ஊட்டச்சத்துக் குறைபாட்டின் அறிகுறிகளைப் பார்க்கவும்.',
      'பயிர்களுக்கு நீர் தேவைப்படுகிறதா என முடிவு செய்வதற்கு முன் மண் ஈரப்பதத்தைச் சரிபார்க்கவும்.',
    ],
    times: ['இப்போது', '10 நிமிடங்களுக்கு முன்', 'இன்று'],
  },
  Telugu: {
    heading: 'నోటిఫికేషన్ కేంద్రం',
    description: 'మీ డిజిటల్ పొలానికి సంబంధించిన ముఖ్యమైన అప్‌డేట్‌లను తెలుసుకోండి.',
    unread: 'చదవనివి',
    all: 'అన్నీ',
    unreadFilter: 'చదవనివి',
    markAll: 'అన్నింటినీ చదివినవిగా గుర్తించండి',
    caughtUp: 'మీరు అన్ని నోటిఫికేషన్‌లను చూశారు!',
    none: 'చూపించడానికి నోటిఫికేషన్‌లు లేవు.',
    markRead: 'చదివినట్లుగా గుర్తించండి',
    dismiss: 'తొలగించండి',
    clearAll: 'అన్ని నోటిఫికేషన్‌లను తొలగించండి',
    note: 'ఇవి ప్రదర్శన కోసం ఉన్న నమూనా నోటిఫికేషన్‌లు. నిజమైన అలర్ట్‌లు తర్వాత బ్యాకెండ్‌కు అనుసంధానించబడతాయి.',
    types: ['వాతావరణం', 'పంట ఆరోగ్యం', 'నేల'],
    titles: ['వాతావరణ అప్‌డేట్', 'పంట ఆరోగ్య రిమైండర్', 'నేల తేమ తనిఖీ'],
    messages: [
      'నీటిపారుదల షెడ్యూల్ చేయడానికి ముందు తాజా వాతావరణాన్ని పరిశీలించండి.',
      'పంట ఒత్తిడి లేదా పోషకాల లోపం సంకేతాల కోసం పంట విశ్లేషణను చూడండి.',
      'పంటలకు నీరు అవసరమా అని నిర్ణయించే ముందు నేల తేమను పరిశీలించండి.',
    ],
    times: ['ఇప్పుడే', '10 నిమిషాల క్రితం', 'ఈరోజు'],
  },
  Malayalam: {
    heading: 'അറിയിപ്പ് കേന്ദ്രം',
    description: 'നിങ്ങളുടെ ഡിജിറ്റൽ കൃഷിയിടത്തിലെ പ്രധാന അപ്‌ഡേറ്റുകൾ ശ്രദ്ധിക്കുക.',
    unread: 'വായിക്കാത്തവ',
    all: 'എല്ലാം',
    unreadFilter: 'വായിക്കാത്തവ',
    markAll: 'എല്ലാം വായിച്ചതായി അടയാളപ്പെടുത്തുക',
    caughtUp: 'എല്ലാ അറിയിപ്പുകളും നിങ്ങൾ കണ്ടുകഴിഞ്ഞു!',
    none: 'പ്രദർശിപ്പിക്കാൻ അറിയിപ്പുകളില്ല.',
    markRead: 'വായിച്ചതായി അടയാളപ്പെടുത്തുക',
    dismiss: 'നീക്കം ചെയ്യുക',
    clearAll: 'എല്ലാ അറിയിപ്പുകളും മായ്ക്കുക',
    note: 'ഇവ പ്രദർശനത്തിനുള്ള മാതൃകാ അറിയിപ്പുകളാണ്. തത്സമയ അലർട്ടുകൾ പിന്നീട് ബാക്കെൻഡുമായി ബന്ധിപ്പിക്കും.',
    types: ['കാലാവസ്ഥ', 'വിളയുടെ ആരോഗ്യം', 'മണ്ണ്'],
    titles: ['കാലാവസ്ഥാ അപ്‌ഡേറ്റ്', 'വിള ആരോഗ്യ ഓർമ്മപ്പെടുത്തൽ', 'മണ്ണിലെ ഈർപ്പ പരിശോധന'],
    messages: [
      'ജലസേചനം ആസൂത്രണം ചെയ്യുന്നതിന് മുമ്പ് ഏറ്റവും പുതിയ കാലാവസ്ഥ പരിശോധിക്കുക.',
      'വിളയിലെ സമ്മർദ്ദത്തിന്റെയോ പോഷകക്കുറവിന്റെയോ ലക്ഷണങ്ങൾക്കായി വിള വിശകലനം പരിശോധിക്കുക.',
      'വിളകൾക്ക് വെള്ളം ആവശ്യമാണോ എന്ന് തീരുമാനിക്കുന്നതിന് മുമ്പ് മണ്ണിലെ ഈർപ്പം പരിശോധിക്കുക.',
    ],
    times: ['ഇപ്പോൾ', '10 മിനിറ്റ് മുമ്പ്', 'ഇന്ന്'],
  },
};

const initialNotifications = [
  { id: 1, index: 0, icon: '🌦️', read: false },
  { id: 2, index: 1, icon: '🌱', read: false },
  { id: 3, index: 2, icon: '💧', read: true },
];

export default function Notifications({ language = 'English' }) {
  const t =
    notificationTranslations[language] ||
    notificationTranslations.English;

  const [notifications, setNotifications] =
    useState(initialNotifications);
  const [filter, setFilter] = useState('All');

  const unreadCount = notifications.filter(
    (item) => !item.read
  ).length;

  const visibleNotifications = notifications.filter((item) =>
    filter === 'Unread' ? !item.read : true
  );

  function markAsRead(id) {
    setNotifications((current) =>
      current.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  }

  function markAllAsRead() {
    setNotifications((current) =>
      current.map((item) => ({ ...item, read: true }))
    );
  }

  function dismissNotification(id) {
    setNotifications((current) =>
      current.filter((item) => item.id !== id)
    );
  }

  return (
    <section className="content-card notifications-page">
      <div className="notification-heading">
        <div>
          <h2>🔔 {t.heading}</h2>
          <p>{t.description}</p>
        </div>

        <span className="notification-count">
          {unreadCount} {t.unread}
        </span>
      </div>

      <div className="notification-toolbar">
        <div className="notification-filters">
          <button
            className={filter === 'All' ? 'selected' : ''}
            onClick={() => setFilter('All')}
          >
            {t.all} ({notifications.length})
          </button>

          <button
            className={filter === 'Unread' ? 'selected' : ''}
            onClick={() => setFilter('Unread')}
          >
            {t.unreadFilter} ({unreadCount})
          </button>
        </div>

        <button
          className="notification-text-button"
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
        >
          {t.markAll}
        </button>
      </div>

      <div className="notification-list">
        {visibleNotifications.length === 0 ? (
          <div className="notification-empty">
            <span>🎉</span>
            <h3>{t.caughtUp}</h3>
            <p>{t.none}</p>
          </div>
        ) : (
          visibleNotifications.map((item) => (
            <article
              key={item.id}
              className={`notification-item ${
                item.read ? 'is-read' : 'is-unread'
              }`}
            >
              <div className="notification-icon">
                {item.icon}
              </div>

              <div className="notification-body">
                <div className="notification-title-row">
                  <h3>{t.titles[item.index]}</h3>
                  {!item.read && (
                    <span className="notification-dot" />
                  )}
                </div>

                <span className="notification-type">
                  {t.types[item.index]}
                </span>

                <p>{t.messages[item.index]}</p>

                <span className="notification-time">
                  {t.times[item.index]}
                </span>

                <div className="notification-actions">
                  {!item.read && (
                    <button onClick={() => markAsRead(item.id)}>
                      {t.markRead}
                    </button>
                  )}

                  <button
                    onClick={() => dismissNotification(item.id)}
                  >
                    {t.dismiss}
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      {notifications.length > 0 && (
        <button
          className="notification-clear-button"
          onClick={() => setNotifications([])}
        >
          {t.clearAll}
        </button>
      )}

      <p className="notification-note">{t.note}</p>
    </section>
  );
}
