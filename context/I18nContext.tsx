import React, { createContext, useContext, useState, useEffect } from 'react';
import { I18nManager } from 'react-native';
import { AsyncStorage_like } from './storage';

export type Language = 'fr' | 'en' | 'ar' | 'tr' | 'ur';

export interface Translations {
  // Tab labels
  tabToday: string;
  tabLibrary: string;
  tabRamadan: string;
  tabFavorites: string;
  tabSettings: string;
  // Home
  wisdomOfDay: string;
  card: string;
  of: string;
  // Library
  library: string;
  wisdoms: string;
  themes: string;
  sources: string;
  all: string;
  names99: string;
  names99Sub: string;
  names99Desc: string;
  thinkers: string;
  thinkersDesc: string;
  // Favorites
  favorites: string;
  noFavorites: string;
  noFavoritesText: string;
  // Settings
  settings: string;
  profile: string;
  yourName: string;
  addName: string;
  greetingPreview: string;
  monthlyIntent: string;
  focusTheme: string;
  notifications: string;
  dailyWisdom: string;
  receiveDaily: string;
  sendTime: string;
  notifTheme: string;
  random: string;
  visualTheme: string;
  language: string;
  interfaceLanguage: string;
  about: string;
  aboutNour: string;
  version: string;
  tagline: string;
  save: string;
  // Themes
  themeDark: string;
  themeLight: string;
  themeSepia: string;
  themeDarkDesc: string;
  themeLightDesc: string;
  themeSepiaDesc: string;
  // Notif presets
  afterFajr: string;
  morning: string;
  noon: string;
  evening: string;
  afterIsha: string;
  afterFajrDesc: string;
  morningDesc: string;
  noonDesc: string;
  eveningDesc: string;
  afterIshaDesc: string;
  // Focus themes
  patience: string;
  gratitude: string;
  love: string;
  faith: string;
  wisdom: string;
  peace: string;
  // Ramadan
  ramadanKareem: string;
  dayOf: string;
  previewMode: string;
  timeToIftar: string;
  iftarPassed: string;
  // Allah Names
  deepMeaning: string;
  exclusivePremium: string;
  // Thinkers
  field: string;
  bornIn: string;
  legacy: string;
  famousQuote: string;
  // Audio
  playRecitation: string;
  playTranslation: string;
  // Share / Wallpaper
  shareCard: string;
  wallpaper: string;
  shareCardTitle: string;
  wallpaperTitle: string;
  preview: string;
  shareBtn: string;
  savePhotos: string;
  // Premium
  premiumTitle: string;
  premiumDesc: string;
  premiumSee: string;
  premiumActive: string;
  // Days
  daysOf: string;
  days: string;
  day: string;
}

const FR: Translations = {
  tabToday: "Aujourd'hui", tabLibrary: 'Bibliothèque', tabRamadan: 'Ramadan',
  tabFavorites: 'Favoris', tabSettings: 'Réglages',
  wisdomOfDay: 'SAGESSE DU JOUR', card: 'CARTE', of: '/',
  library: 'Bibliothèque', wisdoms: 'sagesses', themes: 'Thèmes', sources: 'Sources', all: 'Tout',
  names99: "Les 99 Noms d'Allah", names99Sub: 'أَسْمَاءُ اللَّهِ الْحُسْنَى',
  names99Desc: 'Collection exclusive de 99 cartes',
  thinkers: 'Grands Penseurs de l\'Islam', thinkersDesc: 'Série encyclopédique premium',
  favorites: 'Favoris', noFavorites: 'Aucun favori',
  noFavoritesText: "Appuyez sur le cœur d'une sagesse pour la sauvegarder ici.",
  settings: 'Réglages', profile: 'PROFIL', yourName: 'Votre prénom', addName: 'Ajouter votre prénom...',
  greetingPreview: 'Utilisé pour : "Salam {name}, voici ta sagesse du jour"',
  monthlyIntent: 'INTENTION DU MOIS', focusTheme: 'Thème de focus',
  notifications: 'NOTIFICATIONS', dailyWisdom: 'Sagesse quotidienne',
  receiveDaily: 'Recevez une sagesse chaque jour', sendTime: "Heure d'envoi", notifTheme: 'Thème des notifications',
  random: 'Aléatoire', visualTheme: 'THÈME VISUEL', language: 'LANGUE', interfaceLanguage: "Langue de l'interface",
  about: 'À PROPOS', aboutNour: 'À propos de Nour', version: 'Version 2.0.0',
  tagline: 'Lumière, sagesse et sérénité — chaque jour.',
  save: 'Sauver',
  themeDark: 'Nuit', themeLight: 'Lumière', themeSepia: 'Sépia',
  themeDarkDesc: 'Bleu nuit profond — défaut', themeLightDesc: 'Ivoire chaud et or élégant',
  themeSepiaDesc: 'Parchemin ancien — manuscrit',
  afterFajr: 'Après Fajr', morning: 'Matin', noon: 'Midi', evening: 'Soir', afterIsha: 'Après Isha',
  afterFajrDesc: 'Au lever du soleil', morningDesc: 'Commencez la journée avec sagesse',
  noonDesc: 'Pause du milieu de journée', eveningDesc: 'En fin de journée', afterIshaDesc: 'Avant le coucher',
  patience: 'Patience', gratitude: 'Gratitude', love: 'Amour', faith: 'Foi', wisdom: 'Sagesse', peace: 'Paix',
  ramadanKareem: 'Ramadan Kareem', dayOf: 'Jour', previewMode: 'Aperçu',
  timeToIftar: "Temps avant l'Iftar", iftarPassed: 'Iftar — Bonne rupture du jeûne',
  deepMeaning: 'SIGNIFICATION PROFONDE', exclusivePremium: 'Collection Exclusive Premium',
  field: 'Domaine', bornIn: 'Né à', legacy: 'Héritage', famousQuote: 'Citation célèbre',
  playRecitation: 'Écouter la récitation', playTranslation: 'Écouter la traduction',
  shareCard: 'Partager', wallpaper: 'Fond d\'écran', shareCardTitle: 'Partager', wallpaperTitle: "Fond d'écran",
  preview: 'APERÇU', shareBtn: 'Partager', savePhotos: 'Enregistrer dans Photos',
  premiumTitle: 'Nour Premium', premiumDesc: 'Débloquez toutes les sagesses', premiumSee: 'Voir',
  premiumActive: 'Nour Premium actif',
  daysOf: 'jours de', days: 'jours', day: 'jour',
};

const EN: Translations = {
  tabToday: 'Today', tabLibrary: 'Library', tabRamadan: 'Ramadan',
  tabFavorites: 'Favorites', tabSettings: 'Settings',
  wisdomOfDay: 'WISDOM OF THE DAY', card: 'CARD', of: '/',
  library: 'Library', wisdoms: 'wisdoms', themes: 'Themes', sources: 'Sources', all: 'All',
  names99: "99 Names of Allah", names99Sub: 'أَسْمَاءُ اللَّهِ الْحُسْنَى',
  names99Desc: 'Exclusive collection of 99 cards',
  thinkers: 'Great Islamic Thinkers', thinkersDesc: 'Premium encyclopedia series',
  favorites: 'Favorites', noFavorites: 'No favorites yet',
  noFavoritesText: 'Tap the heart on a wisdom card to save it here.',
  settings: 'Settings', profile: 'PROFILE', yourName: 'Your first name', addName: 'Add your name...',
  greetingPreview: 'Used for: "Salam {name}, here is your wisdom for today"',
  monthlyIntent: 'MONTHLY INTENTION', focusTheme: 'Focus theme',
  notifications: 'NOTIFICATIONS', dailyWisdom: 'Daily wisdom',
  receiveDaily: 'Receive a wisdom every day', sendTime: 'Send time', notifTheme: 'Notification theme',
  random: 'Random', visualTheme: 'VISUAL THEME', language: 'LANGUAGE', interfaceLanguage: 'Interface language',
  about: 'ABOUT', aboutNour: 'About Nour', version: 'Version 2.0.0',
  tagline: 'Light, wisdom and serenity — every day.',
  save: 'Save',
  themeDark: 'Night', themeLight: 'Light', themeSepia: 'Sepia',
  themeDarkDesc: 'Deep midnight blue — default', themeLightDesc: 'Warm ivory and gold',
  themeSepiaDesc: 'Ancient parchment — manuscript feel',
  afterFajr: 'After Fajr', morning: 'Morning', noon: 'Noon', evening: 'Evening', afterIsha: 'After Isha',
  afterFajrDesc: 'At sunrise', morningDesc: 'Start the day with wisdom',
  noonDesc: 'Midday break', eveningDesc: 'End of day', afterIshaDesc: 'Before sleep',
  patience: 'Patience', gratitude: 'Gratitude', love: 'Love', faith: 'Faith', wisdom: 'Wisdom', peace: 'Peace',
  ramadanKareem: 'Ramadan Kareem', dayOf: 'Day', previewMode: 'Preview',
  timeToIftar: 'Time until Iftar', iftarPassed: 'Iftar — Break your fast',
  deepMeaning: 'DEEP MEANING', exclusivePremium: 'Exclusive Premium Collection',
  field: 'Field', bornIn: 'Born in', legacy: 'Legacy', famousQuote: 'Famous quote',
  playRecitation: 'Listen to recitation', playTranslation: 'Listen to translation',
  shareCard: 'Share', wallpaper: 'Wallpaper', shareCardTitle: 'Share', wallpaperTitle: 'Wallpaper',
  preview: 'PREVIEW', shareBtn: 'Share', savePhotos: 'Save to Photos',
  premiumTitle: 'Nour Premium', premiumDesc: 'Unlock all wisdoms', premiumSee: 'View',
  premiumActive: 'Nour Premium active',
  daysOf: 'days of', days: 'days', day: 'day',
};

const AR: Translations = {
  tabToday: 'اليوم', tabLibrary: 'المكتبة', tabRamadan: 'رمضان',
  tabFavorites: 'المفضلة', tabSettings: 'الإعدادات',
  wisdomOfDay: 'حكمة اليوم', card: 'بطاقة', of: 'من',
  library: 'المكتبة', wisdoms: 'حكم', themes: 'المواضيع', sources: 'المصادر', all: 'الكل',
  names99: 'أسماء الله الحسنى', names99Sub: 'أَسْمَاءُ اللَّهِ الْحُسْنَى',
  names99Desc: 'مجموعة حصرية من ٩٩ بطاقة',
  thinkers: 'كبار المفكرين الإسلاميين', thinkersDesc: 'سلسلة موسوعية حصرية',
  favorites: 'المفضلة', noFavorites: 'لا توجد مفضلة',
  noFavoritesText: 'اضغط على قلب الحكمة لحفظها هنا.',
  settings: 'الإعدادات', profile: 'الملف الشخصي', yourName: 'اسمك الأول', addName: 'أضف اسمك...',
  greetingPreview: 'يُستخدم في: "سلام {name}، إليك حكمة اليوم"',
  monthlyIntent: 'نية الشهر', focusTheme: 'موضوع التركيز',
  notifications: 'الإشعارات', dailyWisdom: 'الحكمة اليومية',
  receiveDaily: 'استقبل حكمة كل يوم', sendTime: 'وقت الإرسال', notifTheme: 'موضوع الإشعارات',
  random: 'عشوائي', visualTheme: 'المظهر البصري', language: 'اللغة', interfaceLanguage: 'لغة الواجهة',
  about: 'حول التطبيق', aboutNour: 'حول تطبيق نور', version: 'الإصدار ٢.٠.٠',
  tagline: 'نور وحكمة وسكينة — كل يوم.',
  save: 'حفظ',
  themeDark: 'ليل', themeLight: 'نور', themeSepia: 'قديم',
  themeDarkDesc: 'أزرق داكن — افتراضي', themeLightDesc: 'عاجي دافئ وذهبي',
  themeSepiaDesc: 'رق قديم — كالمخطوطات',
  afterFajr: 'بعد الفجر', morning: 'الصباح', noon: 'الظهر', evening: 'المساء', afterIsha: 'بعد العشاء',
  afterFajrDesc: 'عند الشروق', morningDesc: 'ابدأ يومك بالحكمة',
  noonDesc: 'استراحة منتصف النهار', eveningDesc: 'آخر اليوم', afterIshaDesc: 'قبل النوم',
  patience: 'الصبر', gratitude: 'الشكر', love: 'الحب', faith: 'الإيمان', wisdom: 'الحكمة', peace: 'السلام',
  ramadanKareem: 'رمضان كريم', dayOf: 'اليوم', previewMode: 'معاينة',
  timeToIftar: 'وقت الإفطار', iftarPassed: 'حان وقت الإفطار',
  deepMeaning: 'المعنى العميق', exclusivePremium: 'مجموعة حصرية مميزة',
  field: 'المجال', bornIn: 'وُلد في', legacy: 'الإرث', famousQuote: 'اقتباس مشهور',
  playRecitation: 'استمع إلى التلاوة', playTranslation: 'استمع إلى الترجمة',
  shareCard: 'مشاركة', wallpaper: 'خلفية الشاشة', shareCardTitle: 'مشاركة', wallpaperTitle: 'خلفية الشاشة',
  preview: 'معاينة', shareBtn: 'مشاركة', savePhotos: 'حفظ في الصور',
  premiumTitle: 'نور المميز', premiumDesc: 'افتح جميع الحكم', premiumSee: 'عرض',
  premiumActive: 'نور المميز مفعّل',
  daysOf: 'أيام من', days: 'أيام', day: 'يوم',
};

const TR: Translations = {
  tabToday: 'Bugün', tabLibrary: 'Kütüphane', tabRamadan: 'Ramazan',
  tabFavorites: 'Favoriler', tabSettings: 'Ayarlar',
  wisdomOfDay: 'GÜNÜN HİKMETİ', card: 'KART', of: '/',
  library: 'Kütüphane', wisdoms: 'hikmet', themes: 'Temalar', sources: 'Kaynaklar', all: 'Tümü',
  names99: "Allah'ın 99 İsmi", names99Sub: 'أَسْمَاءُ اللَّهِ الْحُسْنَى',
  names99Desc: "99 kartlık özel koleksiyon",
  thinkers: 'Büyük İslam Düşünürleri', thinkersDesc: 'Premium ansiklopedik seri',
  favorites: 'Favoriler', noFavorites: 'Henüz favori yok',
  noFavoritesText: 'Buraya kaydetmek için bir hikmet kartındaki kalbe dokunun.',
  settings: 'Ayarlar', profile: 'PROFİL', yourName: 'Adınız', addName: 'Adınızı ekleyin...',
  greetingPreview: 'Kullanım: "Selam {name}, işte bugünkü hikmetin"',
  monthlyIntent: 'AYLIK NİYET', focusTheme: 'Odak teması',
  notifications: 'BİLDİRİMLER', dailyWisdom: 'Günlük hikmet',
  receiveDaily: 'Her gün bir hikmet alın', sendTime: 'Gönderim zamanı', notifTheme: 'Bildirim teması',
  random: 'Rastgele', visualTheme: 'GÖRSEL TEMA', language: 'DİL', interfaceLanguage: 'Arayüz dili',
  about: 'HAKKINDA', aboutNour: "Nour hakkında", version: 'Sürüm 2.0.0',
  tagline: 'Işık, hikmet ve huzur — her gün.',
  save: 'Kaydet',
  themeDark: 'Gece', themeLight: 'Işık', themeSepia: 'Sepya',
  themeDarkDesc: 'Derin gece mavisi — varsayılan', themeLightDesc: 'Sıcak fildişi ve altın',
  themeSepiaDesc: 'Eski parşömen — el yazması hissi',
  afterFajr: 'Sabah Namazı Sonrası', morning: 'Sabah', noon: 'Öğle', evening: 'Akşam', afterIsha: 'Yatsı Sonrası',
  afterFajrDesc: 'Gün doğumunda', morningDesc: 'Güne hikmetle başla',
  noonDesc: 'Öğle molası', eveningDesc: 'Günün sonu', afterIshaDesc: 'Uyumadan önce',
  patience: 'Sabır', gratitude: 'Şükür', love: 'Sevgi', faith: 'İman', wisdom: 'Hikmet', peace: 'Barış',
  ramadanKareem: 'Ramazan Kareem', dayOf: 'Gün', previewMode: 'Önizleme',
  timeToIftar: 'İftara kalan süre', iftarPassed: 'İftar — Orucu açın',
  deepMeaning: 'DERİN ANLAM', exclusivePremium: 'Özel Premium Koleksiyon',
  field: 'Alan', bornIn: 'Doğduğu yer', legacy: 'Miras', famousQuote: 'Ünlü alıntı',
  playRecitation: 'Tilaveti dinle', playTranslation: 'Çeviriyi dinle',
  shareCard: 'Paylaş', wallpaper: 'Duvar kağıdı', shareCardTitle: 'Paylaş', wallpaperTitle: 'Duvar kağıdı',
  preview: 'ÖNİZLEME', shareBtn: 'Paylaş', savePhotos: "Fotoğraflara kaydet",
  premiumTitle: 'Nour Premium', premiumDesc: 'Tüm hikmetlerin kilidini aç', premiumSee: 'Gör',
  premiumActive: 'Nour Premium aktif',
  daysOf: 'günlük', days: 'gün', day: 'gün',
};

const UR: Translations = {
  tabToday: 'آج', tabLibrary: 'کتب خانہ', tabRamadan: 'رمضان',
  tabFavorites: 'پسندیدہ', tabSettings: 'ترتیبات',
  wisdomOfDay: 'آج کی حکمت', card: 'کارڈ', of: 'سے',
  library: 'کتب خانہ', wisdoms: 'حکمتیں', themes: 'موضوعات', sources: 'ذرائع', all: 'سب',
  names99: 'اللہ کے ۹۹ نام', names99Sub: 'أَسْمَاءُ اللَّهِ الْحُسْنَى',
  names99Desc: '99 کارڈز کا خصوصی مجموعہ',
  thinkers: 'اسلام کے عظیم مفکرین', thinkersDesc: 'پریمیم انسائیکلوپیڈیک سیریز',
  favorites: 'پسندیدہ', noFavorites: 'کوئی پسندیدہ نہیں',
  noFavoritesText: 'اسے یہاں محفوظ کرنے کے لیے حکمت پر دل کو تھپتھپائیں۔',
  settings: 'ترتیبات', profile: 'پروفائل', yourName: 'آپ کا نام', addName: 'اپنا نام شامل کریں...',
  greetingPreview: 'استعمال: "سلام {name}، یہ آپ کی آج کی حکمت ہے"',
  monthlyIntent: 'ماہانہ نیت', focusTheme: 'توجہ موضوع',
  notifications: 'اطلاعات', dailyWisdom: 'روزانہ حکمت',
  receiveDaily: 'روزانہ ایک حکمت حاصل کریں', sendTime: 'بھیجنے کا وقت', notifTheme: 'اطلاع کا موضوع',
  random: 'بے ترتیب', visualTheme: 'بصری تھیم', language: 'زبان', interfaceLanguage: 'انٹرفیس زبان',
  about: 'کے بارے میں', aboutNour: 'نور کے بارے میں', version: 'ورژن 2.0.0',
  tagline: 'روشنی، حکمت اور سکون — ہر روز۔',
  save: 'محفوظ کریں',
  themeDark: 'رات', themeLight: 'روشنی', themeSepia: 'سیپیا',
  themeDarkDesc: 'گہرا نیلا — ڈیفالٹ', themeLightDesc: 'گرم ہاتھی دانت اور سونا',
  themeSepiaDesc: 'قدیم چرمی — مخطوطہ احساس',
  afterFajr: 'فجر کے بعد', morning: 'صبح', noon: 'دوپہر', evening: 'شام', afterIsha: 'عشاء کے بعد',
  afterFajrDesc: 'طلوع آفتاب پر', morningDesc: 'حکمت سے دن شروع کریں',
  noonDesc: 'دوپہر کا وقفہ', eveningDesc: 'دن کا اختتام', afterIshaDesc: 'سونے سے پہلے',
  patience: 'صبر', gratitude: 'شکر', love: 'محبت', faith: 'ایمان', wisdom: 'حکمت', peace: 'امن',
  ramadanKareem: 'رمضان کریم', dayOf: 'دن', previewMode: 'پیش نظارہ',
  timeToIftar: 'افطار تک وقت', iftarPassed: 'افطار — روزہ کھولیں',
  deepMeaning: 'گہرا معنی', exclusivePremium: 'خصوصی پریمیم مجموعہ',
  field: 'شعبہ', bornIn: 'پیدائش', legacy: 'ورثہ', famousQuote: 'مشہور اقتباس',
  playRecitation: 'تلاوت سنیں', playTranslation: 'ترجمہ سنیں',
  shareCard: 'شیئر کریں', wallpaper: 'وال پیپر', shareCardTitle: 'شیئر کریں', wallpaperTitle: 'وال پیپر',
  preview: 'پیش نظارہ', shareBtn: 'شیئر کریں', savePhotos: 'تصاویر میں محفوظ کریں',
  premiumTitle: 'نور پریمیم', premiumDesc: 'تمام حکمتیں انلاک کریں', premiumSee: 'دیکھیں',
  premiumActive: 'نور پریمیم فعال',
  daysOf: 'دن کی', days: 'دن', day: 'دن',
};

export const LANG_MAP: Record<Language, Translations> = { fr: FR, en: EN, ar: AR, tr: TR, ur: UR };

export const LANG_META: { code: Language; label: string; native: string; rtl: boolean }[] = [
  { code: 'fr', label: 'Français',  native: 'Français', rtl: false },
  { code: 'en', label: 'English',   native: 'English',  rtl: false },
  { code: 'ar', label: 'Arabe',     native: 'العربية',  rtl: true  },
  { code: 'tr', label: 'Türkçe',    native: 'Türkçe',   rtl: false },
  { code: 'ur', label: 'Ourdou',    native: 'اردو',     rtl: true  },
];

interface I18nCtx {
  lang: Language;
  t: Translations;
  setLang: (l: Language) => void;
  isRTL: boolean;
}

const I18nContext = createContext<I18nCtx>({
  lang: 'fr',
  t: FR,
  setLang: () => {},
  isRTL: false,
});

const KEY = 'nour_language';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  console.log('🟦 [NOUR-DEBUG] I18nProvider mounting');
  const [lang, setLangState] = useState<Language>('fr');

  useEffect(() => {
    const saved = AsyncStorage_like.get(KEY) as Language | null;
    if (saved && LANG_MAP[saved]) setLangState(saved);
  }, []);

  function setLang(l: Language) {
    setLangState(l);
    AsyncStorage_like.set(KEY, l);
    // RTL layout — on native this requires a restart; on web we handle via flexDirection
  }

  const isRTL = lang === 'ar' || lang === 'ur';
  const t = LANG_MAP[lang];

  return (
    <I18nContext.Provider value={{ lang, t, setLang, isRTL }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
