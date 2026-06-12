export type Locale = 'en' | 'es' | 'fr' | 'hi' | 'de' | 'ja';

export const LOCALES: { value: Locale; label: string; flag: string }[] = [
  { value: 'en', label: 'English', flag: '🇺🇸' },
  { value: 'es', label: 'Español', flag: '🇪🇸' },
  { value: 'fr', label: 'Français', flag: '🇫🇷' },
  { value: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { value: 'ja', label: '日本語', flag: '🇯🇵' },
];

export type TranslationKey =
  | 'app.title'
  | 'nav.dashboard'
  | 'nav.marketplace'
  | 'nav.pluginDashboard'
  | 'nav.installed'
  | 'nav.platform'
  | 'hero.title'
  | 'hero.subtitle'
  | 'marketplace.title'
  | 'marketplace.subtitle'
  | 'login.title'
  | 'login.signIn'
  | 'login.email'
  | 'login.password'
  | 'common.loading'
  | 'common.install'
  | 'common.enable'
  | 'common.disable';

export const translations: Record<Locale, Record<TranslationKey, string>> = {
  en: {
    'app.title': 'Plugin Platform',
    'nav.dashboard': 'Dashboard',
    'nav.marketplace': 'Marketplace',
    'nav.pluginDashboard': 'Platform Console',
    'nav.installed': 'Installed extensions',
    'nav.platform': 'Platform',
    'hero.title': 'Frontend Plugin Platform',
    'hero.subtitle': 'Chrome Extensions · Mozilla Add-ons · VS Code Extensions',
    'marketplace.title': 'Extension Marketplace',
    'marketplace.subtitle': 'Browse, install, and manage extensions — like a browser store',
    'login.title': 'Sign In',
    'login.signIn': 'Sign In',
    'login.email': 'Email',
    'login.password': 'Password',
    'common.loading': 'Loading...',
    'common.install': 'Install',
    'common.enable': 'Enable',
    'common.disable': 'Disable',
  },
  es: {
    'app.title': 'Plataforma de Plugins',
    'nav.dashboard': 'Panel',
    'nav.marketplace': 'Tienda',
    'nav.pluginDashboard': 'Panel de Plugins',
    'nav.installed': 'Extensiones instaladas',
    'nav.platform': 'Plataforma',
    'hero.title': 'Plataforma de Plugins Frontend',
    'hero.subtitle': 'Extensiones de Chrome · Complementos Mozilla · VS Code',
    'marketplace.title': 'Tienda de Extensiones',
    'marketplace.subtitle': 'Instala funciones sin redesplegar el host',
    'login.title': 'Iniciar sesión',
    'login.signIn': 'Entrar',
    'login.email': 'Correo',
    'login.password': 'Contraseña',
    'common.loading': 'Cargando...',
    'common.install': 'Instalar',
    'common.enable': 'Activar',
    'common.disable': 'Desactivar',
  },
  fr: {
    'app.title': 'Plateforme de Plugins',
    'nav.dashboard': 'Tableau de bord',
    'nav.marketplace': 'Boutique',
    'nav.pluginDashboard': 'Tableau des plugins',
    'nav.installed': 'Extensions installées',
    'nav.platform': 'Plateforme',
    'hero.title': 'Plateforme de Plugins Frontend',
    'hero.subtitle': 'Extensions Chrome · Modules Mozilla · VS Code',
    'marketplace.title': 'Boutique d\'extensions',
    'marketplace.subtitle': 'Installez sans redéployer l\'application',
    'login.title': 'Connexion',
    'login.signIn': 'Se connecter',
    'login.email': 'E-mail',
    'login.password': 'Mot de passe',
    'common.loading': 'Chargement...',
    'common.install': 'Installer',
    'common.enable': 'Activer',
    'common.disable': 'Désactiver',
  },
  hi: {
    'app.title': 'प्लगइन प्लेटफ़ॉर्म',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.marketplace': 'मार्केटप्लेस',
    'nav.pluginDashboard': 'प्लगइन डैशबोर्ड',
    'nav.installed': 'इंस्टॉल किए एक्सटेंशन',
    'nav.platform': 'प्लेटफ़ॉर्म',
    'hero.title': 'फ्रंटएंड प्लगइन प्लेटफ़ॉर्म',
    'hero.subtitle': 'क्रोम एक्सटेंशन · मोज़िला ऐड-ऑन · VS Code',
    'marketplace.title': 'एक्सटेंशन मार्केटप्लेस',
    'marketplace.subtitle': 'होस्ट को दोबारा डिप्लॉय किए बिना इंस्टॉल करें',
    'login.title': 'साइन इन',
    'login.signIn': 'साइन इन',
    'login.email': 'ईमेल',
    'login.password': 'पासवर्ड',
    'common.loading': 'लोड हो रहा है...',
    'common.install': 'इंस्टॉल',
    'common.enable': 'सक्षम',
    'common.disable': 'अक्षम',
  },
  de: {
    'app.title': 'Plugin-Plattform',
    'nav.dashboard': 'Dashboard',
    'nav.marketplace': 'Marktplatz',
    'nav.pluginDashboard': 'Plugin-Dashboard',
    'nav.installed': 'Installierte Erweiterungen',
    'nav.platform': 'Plattform',
    'hero.title': 'Frontend Plugin-Plattform',
    'hero.subtitle': 'Chrome-Erweiterungen · Mozilla Add-ons · VS Code',
    'marketplace.title': 'Erweiterungs-Marktplatz',
    'marketplace.subtitle': 'Funktionen ohne Neu-Deployment installieren',
    'login.title': 'Anmelden',
    'login.signIn': 'Anmelden',
    'login.email': 'E-Mail',
    'login.password': 'Passwort',
    'common.loading': 'Laden...',
    'common.install': 'Installieren',
    'common.enable': 'Aktivieren',
    'common.disable': 'Deaktivieren',
  },
  ja: {
    'app.title': 'プラグインプラットフォーム',
    'nav.dashboard': 'ダッシュボード',
    'nav.marketplace': 'マーケット',
    'nav.pluginDashboard': 'プラグインダッシュボード',
    'nav.installed': 'インストール済み',
    'nav.platform': 'プラットフォーム',
    'hero.title': 'フロントエンドプラグインプラットフォーム',
    'hero.subtitle': 'Chrome拡張 · Mozillaアドオン · VS Code',
    'marketplace.title': '拡張マーケット',
    'marketplace.subtitle': 'ホストを再デプロイせずにインストール',
    'login.title': 'ログイン',
    'login.signIn': 'ログイン',
    'login.email': 'メール',
    'login.password': 'パスワード',
    'common.loading': '読み込み中...',
    'common.install': 'インストール',
    'common.enable': '有効化',
    'common.disable': '無効化',
  },
};
