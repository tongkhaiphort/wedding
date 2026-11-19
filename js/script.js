lucide.createIcons();


// Prevent pinch-to-zoom, multi-touch zoom and double-tap zoom on mobile
document.addEventListener('gesturestart', function(e) { e.preventDefault(); }, { passive: false });
document.addEventListener('gesturechange', function(e) { e.preventDefault(); }, { passive: false });
document.addEventListener('gestureend', function(e) { e.preventDefault(); }, { passive: false });

document.addEventListener('touchstart', function(e) {
  if (e.touches && e.touches.length > 1) {
    e.preventDefault();
  }
}, { passive: false });

document.addEventListener('touchmove', function(e) {
  if (e.touches && e.touches.length > 1) {
    e.preventDefault();
  }
}, { passive: false });

let lastTouchEndTime = 0;
document.addEventListener('touchend', function(e) {
  const now = Date.now();
  if (now - lastTouchEndTime <= 300) {
    if (!e.target.closest('button, a, input, select, textarea, [onclick]')) {
      e.preventDefault();
    }
  }
  lastTouchEndTime = now;
}, { passive: false });

let isEnvelopeOpened = false;
let isPlayingAudio = false;
const bgm = document.getElementById('weddingBgm');
if (bgm) {
  bgm.volume = 0.35; // Soft background music volume (under 50%)
}

let currentLang = 'km';

const I18N = {
  km: {
    // Top Bar
    music_label_on: "តន្ត្រីអាពាហ៍ពិពាហ៍",
    music_label_off: "បិទតន្ត្រី",
    petals_label: "ផ្កាហោះ",
    // Intro
    intro_greeting: "សូមគោរពអញ្ជើញ · Cordially Invited",
    intro_guests: "ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា",
    intro_celebration: "ពិធីសិរីមង្គលអាពាហ៍ពិពាហ៍",
    intro_guide: "សូមចុចលើស្រោមសំបុត្រ ឬប៊ូតុងខាងក្រោមដើម្បីបើកលិខិត",
    intro_open_btn: "បើកសំបុត្រអាពាហ៍ពិពាហ៍",
    intro_audio_hint: "បទភ្លេងនឹងបន្លឺឡើងដោយស្វ័យប្រវត្តិពេលបើក",
    card_invitation_title: "លិខិតអញ្ជើញអាពាហ៍ពិពាហ៍",
    card_invitation_date: "ថ្ងៃអាទិត្យ ទី២០ ខែធ្នូ ឆ្នាំ២០២៦",
    card_invitation_venue: "បាត់ដំបងសុីធីហល៍",
    card_invitation_touch: "ចុចដើម្បីបើក",

    // Hero
    hero_title: "សិរីសួស្តីអាពាហ៍ពិពាហ៍",
    hero_date: "ថ្ងៃអាទិត្យ ទី២០ ខែធ្នូ ឆ្នាំ២០២៦ · ម៉ោង ៥:០០ ល្ងាច",
    hero_date_en: "Sunday, December 20, 2026 · 5:00 PM",
    hero_lunar: "ត្រូវនឹងថ្ងៃ១១កើត ខែមិគសិរ ឆ្នាំមមី អដ្ឋស័ក ព.ស.២៥៧០",
    hero_map_link: "មើលផែនទី · View Map",

    // Invitation
    invitation_title: "មានកិត្តិយសសូមគោរពអញ្ជើញ",
    invitation_title_en: "Cordially Request the Honor of Your Presence",
    invitation_p1: "ឯកឧត្តម អ្នកឧកញ៉ា លោកជំទាវ លោក លោកស្រី អ្នកនាង កញ្ញា និងប្រិយមិត្តជិតឆ្ងាយទាំងអស់",
    invitation_p2: "អញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យសិរីសួស្តី",
    invitation_p3: "ជ័យមង្គលក្នុង ពិធីរៀបអាពាហ៍ពិពាហ៍ កូនប្រុស-ស្រី របស់យើងខ្ញុំ",
    invitation_groom_label: "កូនប្រុសនាម · Groom",
    invitation_bride_label: "កូនស្រីនាម · Bride",
    invitation_reception_lunar: "ពិសាភោជនាហារប្រព្រឹត្តទៅ ថ្ងៃអាទិត្យ ១១កើត ខែមិគសិរ ឆ្នាំមមី អដ្ឋស័ក ព.ស. ២៥៧០",
    invitation_reception_solar: "ត្រូវនឹងថ្ងៃ ទី២០ ខែធ្នូ ឆ្នាំ២០២៦ វេលាម៉ោង ៥:០០ ល្ងាច ស្ថិតនៅបាត់ដំបងស៊ីធីហល៍ (Battambang City Hall)",
    invitation_gratitude: "ដោយមេត្រីភាព! សូមអរគុណ! · With Warmest Gratitude",

    // Couple & Parents
    groom_parents_label: "កូនប្រុសរបស់",
    bride_parents_label: "កូនស្រីរបស់",
    groom_father: "លោក ទី ភត",
    groom_mother: "និងលោកស្រី គង់ សឿន",
    bride_father: "លោក កេត សុជាតិ",
    bride_mother: "និងលោកស្រី ងួន នាវ័ន្ត",

    // Countdown
    countdown_title: "រាប់ថយក្រោយឆ្ពោះទៅកាន់ថ្ងៃមង្គល",
    countdown_days: "ថ្ងៃ",
    countdown_hours: "ម៉ោង",
    countdown_mins: "នាទី",
    countdown_secs: "វិនាទី",
    countdown_ics: "កត់ត្រាក្នុងប្រតិទិន (.ics)",

    // Programme
    programme_title: "កម្មវិធីអាពាហ៍ពិពាហ៍",
    programme_desc: "កម្មវិធីសិរីមង្គលអាពាហ៍ពិពាហ៍តាមប្រពៃណីទំនៀមទម្លាប់ខ្មែរ",
    prog_day1_header: "កម្មវិធីថ្ងៃទី១៖ ថ្ងៃសៅរ៍ ទី១៩ ខែធ្នូ ឆ្នាំ២០២៦",
    prog_d1_1_time: "ម៉ោង ០៩:០០ ព្រឹក",
    prog_d1_1_title: "ពិធីសែនក្រុងពាលី",
    prog_d1_2_time: "ម៉ោង ១០:០០ ព្រឹក",
    prog_d1_2_title: "ពិធីកាត់សក់បង្កក់សិរី",
    prog_d1_3_time: "ម៉ោង ០១:០០ ល្ងាច",
    prog_d1_3_title: "ពិធីសូត្រមន្តចម្រើនព្រះបរិត្ត",
    prog_d1_4_time: "ម៉ោង ០៤:០០ ល្ងាច",
    prog_d1_4_title: "ពិធីជាវខាន់ស្លា",
    prog_d1_5_time: "ម៉ោង ០៥:០០ ល្ងាច",
    prog_d1_5_title: "អញ្ជើញភ្ញៀវកិត្តិយសពិសាអាហារពេលល្ងាច",

    prog_day2_header: "កម្មវិធីថ្ងៃទី២៖ ថ្ងៃអាទិត្យ ទី២០ ខែធ្នូ ឆ្នាំ២០២៦",
    prog_d2_1_time: "ម៉ោង ០៥:៤៥ ព្រឹក",
    prog_d2_1_title: "ពិធីសំពះពាលា",
    prog_d2_2_time: "ម៉ោង ០៦:០០ ព្រឹក",
    prog_d2_2_title: "ជួបជុំភ្ញៀវកិត្តិយសរៀបចំពិធីហែកំណត់",
    prog_d2_3_time: "ម៉ោង ០៧:០០ ព្រឹក",
    prog_d2_3_title: "ពិធីហែជំនូនកំណត់ចូលរោងជ័យ",
    prog_d2_4_time: "ម៉ោង ០៧:៣០ ព្រឹក",
    prog_d2_4_title: "អញ្ជើញភ្ញៀវកិត្តិយសពិសាអាហារពេលព្រឹក",
    prog_d2_5_time: "ម៉ោង ០៨:០០ ព្រឹក",
    prog_d2_5_title: "ពិធីនិយាយជើងការ រៀបរាប់ផ្លែឈើពិសាស្លាកំណត់",
    prog_d2_6_time: "ម៉ោង ០៩:០០ ព្រឹក",
    prog_d2_6_title: "ពិធីពាក់ចិញ្ចៀន",
    prog_d2_7_time: "ម៉ោង ០៩:៣០ ព្រឹក",
    prog_d2_7_title: "ពិធីសែនកុងម៉ា",
    prog_d2_8_time: "ម៉ោង ១០:០០ ព្រឹក",
    prog_d2_8_title: "ពិធីសំពះផ្ទឹម សែនចងដៃ បង្វិលពពិលបាចផ្កាស្លា និង ព្រះថោងតោងស្បៃនាងនាគ",
    prog_d2_9_time: "ម៉ោង ១២:០០ ថ្ងៃត្រង់",
    prog_d2_9_title: "ពិសាអាហារថ្ងៃត្រង់",
    prog_d2_10_time: "ម៉ោង ០៥:០០ ល្ងាច",
    prog_d2_10_title: "ពិធីទទួលបដិសណ្ឋារកិច្ចភ្ញៀវកិត្តិយសពិសាភោជនាហារពេលល្ងាច (នៅបាត់ដំបងស៊ីធីហល៍ អគារ B ដោយមេត្រីភាព) ។",

    // Story
    story_title: "ដំណើរ<br class=\"hidden sm:inline\" />នៃក្តីស្រឡាញ់",
    story_title_en: "Our Love Story &amp; Journey",
    story_desc: "អនុស្សាវរីយ៍ និងកម្ររូបភាព​សម្រាប់ថ្ងៃអាពាហ៍ពិពាហ៍",

    // Gallery
    gallery_title: "អនុស្សាវរីយ៍មុនថ្ងៃមង្គល",

    // Venue
    venue_title: "ទីតាំងប្រារព្ធពិធី",
    venue_address: "ផ្លូវជាតិលេខ ៥ ក្រុងបាត់ដំបង ខេត្តបាត់ដំបង (Battambang Province)",
    venue_time: "វេលាម៉ោង ០៥:០០ ល្ងាច តទៅ (Evening Reception)",
    venue_contact: "ទំនាក់ទំនង ៖ 012 345 678 / 098 765 432",
    venue_map_btn: "បើកក្នុង Google Maps",
    venue_ics_btn: "កត់ត្រាក្នុងប្រតិទិន",

    // Gift
    gift_title: "ចំណងដៃអាពាហ៍ពិពាហ៍",
    gift_desc: "វត្តមាន និងពរជ័យរបស់លោកអ្នក គឺជាកាដូដ៏មានតម្លៃបំផុតសម្រាប់ពួកយើង។ ប្រសិនបើលោកអ្នកមានបំណងជូនចំណងដៃតាមប្រព័ន្ធឌីជីថល៖",
    gift_groom_acc: "គណនីកូនកំលោះ (Groom)",
    gift_bride_acc: "គណនីកូនក្រមុំ (Bride)",
    gift_save_qr: "រក្សាទុក QR Code",

    // Wishes
    wishes_subtitle: "សារជូនពរដល់គូស្វាមីភរិយាថ្មី",
    wishes_title: "ពាក្យជូនពរដល់កូនកំលោះ និងកូនក្រមុំ",
    wishes_desc: "សូមចូលរួមផ្ញើសារជូនពរជ័យ សិរីសួស្តី និងសេចក្តីស្រឡាញ់ ដល់គូស្វាមីភរិយាថ្មី ដើម្បីជាអនុស្សាវរីយ៍ដ៏មានតម្លៃក្នុងថ្ងៃមង្គលដ៏ឧត្តុង្គឧត្តមនេះ",
    wish_card_title: "ផ្ញើសារជូនពរ",
    wish_card_sub: "Guest Blessing · ម្នាក់បានតែម្ដង",
    wish_name_label: "ឈ្មោះរបស់អ្នក / Your Name",
    wish_phone_label: "លេខទូរស័ព្ទ / Phone Number",
    wish_phone_err: "សូមបញ្ចូលលេខទូរស័ព្ទកម្ពុជាឱ្យបានត្រឹមត្រូវ (+855 / 0XX XXX XXX)",
    wish_login_btn: "បន្តទៅសរសេរសារជូនពរ · Continue",
    wish_switch_user: "ប្តូរឈ្មោះ / Switch",
    wish_rel_label: "ទំនាក់ទំនងរបស់អ្នក / Relationship",
    wish_quick_label: "ពាក្យជូនពររហ័ស (Quick Blessings):",
    wish_msg_label: "សារជូនពរ / Your Message",
    wish_send_btn: "ផ្ញើសារជូនពរ · Send Wish (1 លើកប៉ុណ្ណោះ)",
    wish_sent_title: "លោកអ្នកបានផ្ញើសារជូនពររួចរាល់ហើយ",
    wish_tg_btn: "ផ្ញើទៅកាន់ Telegram (@pheavii)",
    wish_other_num: "ចូលដោយលេខទូរស័ព្ទផ្សេង (Sign in with another number)",
    video_title: "វីដេអូអនុស្សាវរីយ៍អាពាហ៍ពិពាហ៍",

    // Footer
    footer_thanks: "សូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅ",
    footer_contact: "ទំនាក់ទំនង · Contact Us"
  },
  en: {
    // Top Bar
    music_label_on: "Wedding Music",
    music_label_off: "Mute Music",
    petals_label: "Flowers",
    // Intro
    intro_greeting: "Cordially Invited",
    intro_guests: "Excellencies, Ladies & Gentlemen, Dear Family & Friends",
    intro_celebration: "The Wedding Celebration of",
    intro_guide: "Touch or click the envelope to open the invitation",
    intro_open_btn: "Open Wedding Invitation",
    intro_audio_hint: "Music will play gently upon opening",
    card_invitation_title: "Wedding Invitation",
    card_invitation_date: "Sunday, December 20, 2026",
    card_invitation_venue: "Battambang City Hall",
    card_invitation_touch: "Tap to open",

    // Hero
    hero_title: "The Wedding Celebration",
    hero_date: "Sunday, December 20, 2026 · 5:00 PM",
    hero_date_en: "The Blessed Wedding Celebration",
    hero_lunar: "11th Waxing Moon of Migasira, Year of the Horse, B.E. 2570",
    hero_map_link: "View Location Map",

    // Invitation
    invitation_title: "Cordially Request the Honor of Your Presence",
    invitation_title_en: "At The Wedding Celebration of Our Beloved Children",
    invitation_p1: "Excellencies, Neak Oknha, Lok Chumteav, Ladies and Gentlemen, Esteemed Relatives and Friends",
    invitation_p2: "To honor us with your gracious presence and bless the newly married couple with lifelong joy and happiness",
    invitation_p3: "On the joyous occasion of the Holy Wedding of our son and daughter",
    invitation_groom_label: "Groom",
    invitation_bride_label: "Bride",
    invitation_reception_lunar: "Wedding Reception Celebration on Sunday, December 20, 2026",
    invitation_reception_solar: "At 5:00 PM at Battambang City Hall, Battambang Province",
    invitation_gratitude: "With Warmest Regards & Heartfelt Gratitude",

    // Couple & Parents
    groom_parents_label: "Son of",
    bride_parents_label: "Daughter of",
    groom_father: "Mr. Ty Phort",
    groom_mother: "& Mrs. Kong Soeun",
    bride_father: "Mr. Keth Socheat",
    bride_mother: "& Mrs. Nguon Neavon",

    // Countdown
    countdown_title: "Countdown to The Blessed Day",
    countdown_days: "Days",
    countdown_hours: "Hours",
    countdown_mins: "Mins",
    countdown_secs: "Secs",
    countdown_ics: "Add to Calendar (.ics)",

    // Programme
    programme_title: "Wedding Programme & Rituals",
    programme_desc: "Traditional Khmer Wedding Ceremony & Evening Banquet Schedule",
    prog_day1_header: "Day 1: Saturday, 19 December 2026",
    prog_d1_1_time: "09:00 AM",
    prog_d1_1_title: "Groundbreaking & Krong Pali Ritual",
    prog_d1_2_time: "10:00 AM",
    prog_d1_2_title: "Hair Cutting & Cleansing Blessing Ritual",
    prog_d1_3_time: "01:00 PM",
    prog_d1_3_title: "Monks Chanting & Buddhist Blessing",
    prog_d1_4_time: "04:00 PM",
    prog_d1_4_title: "Cheav Khan Sla Betel Nut Ritual",
    prog_d1_5_time: "05:00 PM",
    prog_d1_5_title: "Evening Dinner for Honored Guests",

    prog_day2_header: "Day 2: Sunday, 20 December 2026",
    prog_d2_1_time: "05:45 AM",
    prog_d2_1_title: "Dawn Reverence Ceremony (Sampeah Phea Lea)",
    prog_d2_2_time: "06:00 AM",
    prog_d2_2_title: "Guests Gathering for Procession",
    prog_d2_3_time: "07:00 AM",
    prog_d2_3_title: "Dowry & Fruits Procession to Wedding Hall",
    prog_d2_4_time: "07:30 AM",
    prog_d2_4_title: "Morning Breakfast for Honored Guests",
    prog_d2_5_time: "08:00 AM",
    prog_d2_5_title: "Matchmaker Presentation & Betel Offering",
    prog_d2_6_time: "09:00 AM",
    prog_d2_6_title: "Wedding Ring Exchange Ceremony",
    prog_d2_7_time: "09:30 AM",
    prog_d2_7_title: "Ancestor Reverence (Kong Ma) Ritual",
    prog_d2_8_time: "10:00 AM",
    prog_d2_8_title: "Nuptial Blessing, Wrist Tying, Candle Rotation & Scarf Ritual",
    prog_d2_9_time: "12:00 PM",
    prog_d2_9_title: "Midday Celebration Feast",
    prog_d2_10_time: "05:00 PM",
    prog_d2_10_title: "Grand Banquet Reception (Battambang City Hall, Building B)",

    // Story
    story_title: "Our Love<br class=\"hidden sm:inline\" />Story",
    story_title_en: "Cherished Memories on Our Journey to \"I Do\"",
    story_desc: "Unforgettable moments and photographic memories leading to our wedding day",

    // Gallery
    gallery_title: "Pre-Wedding Photo Gallery",

    // Venue
    venue_title: "Reception & Venue Location",
    venue_address: "National Road 5, Battambang City, Battambang Province, Cambodia",
    venue_time: "From 05:00 PM Onwards (Evening Banquet)",
    venue_contact: "Contact: 012 345 678 / 098 765 432",
    venue_map_btn: "Open in Google Maps",
    venue_ics_btn: "Save to Calendar",

    // Gift
    gift_title: "Traditional Wedding Gifts",
    gift_desc: "Your gracious presence and heartfelt blessings are our greatest gift. For guests wishing to send a digital blessing gift:",
    gift_groom_acc: "Groom's Account (ABA)",
    gift_bride_acc: "Bride's Account (ABA)",
    gift_save_qr: "Save QR Code",

    // Wishes
    wishes_subtitle: "Blessings for the Newlyweds",
    wishes_title: "Send Your Blessings to the Bride & Groom",
    wishes_desc: "Join us in sending your love, prayers, and blessings to the newlyweds to commemorate this milestone celebration",
    wish_card_title: "Write Your Blessing",
    wish_card_sub: "Guest Blessing · 1 Wish per Guest",
    wish_name_label: "Your Full Name",
    wish_phone_label: "Cambodian Phone Number (+855)",
    wish_phone_err: "Please enter a valid Cambodian mobile phone number (+855 / 0XX XXX XXX)",
    wish_login_btn: "Continue to Write Blessing",
    wish_switch_user: "Switch Guest",
    wish_rel_label: "Your Relationship to the Couple",
    wish_quick_label: "Quick Blessing Phrases:",
    wish_msg_label: "Your Wedding Blessing",
    wish_send_btn: "Submit Blessing (Once Only)",
    wish_sent_title: "You Have Submitted Your Wedding Wish",
    wish_tg_btn: "Send via Telegram (@pheavii)",
    wish_other_num: "Sign in with another phone number",
    video_title: "Pre-Wedding Memorial Story Video",

    // Footer
    footer_thanks: "Heartfelt Thanks & Deepest Appreciation",
    footer_contact: "Contact & Social Media"
  }
};

function switchLanguage(lang) {
  currentLang = lang;
  try {
    localStorage.setItem('wedding_lang_pref', lang);
  } catch (_) {}

  const btnKm = document.getElementById('btnLangKm');
  const btnEn = document.getElementById('btnLangEn');

  if (lang === 'en') {
    if (btnEn) btnEn.className = "px-2.5 py-1 text-xs rounded-full bg-gradient-to-r from-[#d8c49a] to-[#f7efdc] text-[#3b3326] font-bold transition-all shadow-sm";
    if (btnKm) btnKm.className = "px-2.5 py-1 text-xs rounded-full text-[#e2d7be] hover:text-white transition-all";
    document.documentElement.lang = 'en';
  } else {
    if (btnKm) btnKm.className = "px-2.5 py-1 text-xs rounded-full bg-gradient-to-r from-[#d8c49a] to-[#f7efdc] text-[#3b3326] font-bold transition-all shadow-sm";
    if (btnEn) btnEn.className = "px-2.5 py-1 text-xs rounded-full text-[#e2d7be] hover:text-white transition-all";
    document.documentElement.lang = 'km';
  }

  // Apply all data-i18n replacements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (I18N[lang] && I18N[lang][key] !== undefined) {
      el.innerHTML = I18N[lang][key];
    }
  });

  // Countdown units
  const khDays = document.querySelector('#countdownSection #khmerDays + div + span');
  const khHours = document.querySelector('#countdownSection #khmerHours + div + span');
  const khMins = document.querySelector('#countdownSection #khmerMins + div + span');
  const khSecs = document.querySelector('#countdownSection #khmerSecs + div + span');
  if (khDays) khDays.textContent = lang === 'en' ? 'Days' : 'ថ្ងៃ';
  if (khHours) khHours.textContent = lang === 'en' ? 'Hours' : 'ម៉ោង';
  if (khMins) khMins.textContent = lang === 'en' ? 'Mins' : 'នាទី';
  if (khSecs) khSecs.textContent = lang === 'en' ? 'Secs' : 'វិនាទី';

  // Petals Toggle Label
  const petalsLabel = document.getElementById('petalsLabel');
  if (petalsLabel) {
    petalsLabel.textContent = lang === 'en' ? 'Flowers' : 'ផ្កាហោះ';
  }

  // Audio Toggle Label
  const musicLabel = document.getElementById('musicLabel');
  if (musicLabel) {
    musicLabel.textContent = isPlayingAudio 
      ? (lang === 'en' ? I18N.en.music_label_off : I18N.km.music_label_off)
      : (lang === 'en' ? I18N.en.music_label_on : I18N.km.music_label_on);
  }

  // Update Wish System labels
  if (typeof updateWishUIState === 'function') {
    updateWishUIState();
  }
}

// Check saved language on startup
function initSavedLanguage() {
  try {
    const saved = localStorage.getItem('wedding_lang_pref');
    if (saved === 'en') {
      switchLanguage('en');
    }
  } catch (_) {}
}
function toggleAudio() {
  const musicDot = document.getElementById('musicDot');
  const musicPulse = document.getElementById('musicPulse');
  const musicLabel = document.getElementById('musicLabel');

  if (!isPlayingAudio) {
    if (bgm) {
      bgm.volume = 0.35; // Set volume to 35% (soft, less than 50%)
      const playPromise = bgm.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          isPlayingAudio = true;
          if (musicDot) musicDot.classList.replace('bg-[#7c8b6a]', 'bg-[#d8c49a]');
          if (musicPulse) musicPulse.classList.remove('hidden');
          if (musicLabel) musicLabel.textContent = (currentLang === "en" ? "Mute Music" : "បិទតន្ត្រី");
        }).catch(e => {
          console.log("Audio play error:", e);
        });
      }
    }
  } else {
    if (bgm) bgm.pause();
    isPlayingAudio = false;
    if (musicDot) musicDot.classList.replace('bg-[#d8c49a]', 'bg-[#7c8b6a]');
    if (musicPulse) musicPulse.classList.add('hidden');
    if (musicLabel) musicLabel.textContent = (currentLang === "en" ? "Wedding Music" : "តន្ត្រីអាពាហ៍ពិពាហ៍");
  }
}

// Auto-start music on first user gesture at gentle volume (less than 50%)
function initAudioOnFirstUserGesture() {
  if (!isPlayingAudio && bgm) {
    toggleAudio();
  }
  document.removeEventListener('click', initAudioOnFirstUserGesture);
  document.removeEventListener('touchstart', initAudioOnFirstUserGesture);
}
document.addEventListener('click', initAudioOnFirstUserGesture, { once: true });
document.addEventListener('touchstart', initAudioOnFirstUserGesture, { once: true });

let isIntroAnimating = false;
const envelopeBody = document.getElementById('envelopeBody');

// 3D Tilt on mouse move — only when idle
window.addEventListener('mousemove', (e) => {
  if (isEnvelopeOpened || isIntroAnimating || !envelopeBody) return;
  const xNorm = (e.clientX / window.innerWidth) - 0.5;
  const yNorm = (e.clientY / window.innerHeight) - 0.5;
  envelopeBody.style.transform = `rotateY(${xNorm * 10}deg) rotateX(${-yNorm * 8}deg)`;
});

// Spawn floating ambient champagne petals on intro screen (slow, graceful drift)
function spawnIntroAmbiance() {
  if (prefersReducedMotion || isWeakDevice) return;
  const layer = document.getElementById('introGoldDustLayer');
  if (!layer) return;
  layer.innerHTML = '';
  const count = isPhone ? 8 : 16;
  for (let i = 0; i < count; i++) {
    const petal = document.createElement('div');
    petal.className = 'intro-ambient-petal';
    const size = 5 + Math.random() * 8;
    const left = 3 + Math.random() * 94;
    const dur = 18 + Math.random() * 14; // Slower: 18s - 32s
    const delay = Math.random() * 10;
    petal.style.cssText = 'width:' + size + 'px;height:' + size + 'px;left:' + left + '%;bottom:-15px;animation-duration:' + dur + 's;animation-delay:' + delay + 's;';
    layer.appendChild(petal);
  }
}

// Intro Entrance Animation on first page load
function playIntroEntrance() {
  if (prefersReducedMotion) return;
  const screen = document.getElementById('envelopeScreen');
  if (!screen || isEnvelopeOpened) return;

  // Start everything invisible
  gsap.set(['#envelopeGreeting', '#envelopeBody', '#waxSeal', '#openGuidePill', '#introCtaBtn', '#introAudioCue', '.intro-corner-ornament'], {
    opacity: 0
  });
  gsap.set('#envelopeGreeting', { y: -30, scale: 0.96 });
  gsap.set('#envelopeBody', { scale: 0.88, y: 30 });
  gsap.set('#waxSeal', { scale: 0.5, rotation: -15 });
  gsap.set(['#introCtaBtn', '#introAudioCue'], { y: 24, scale: 0.95 });
  gsap.set('#openGuidePill', { y: 16, scale: 0.9 });

  const enterTl = gsap.timeline({ delay: 0.3 });
  enterTl
    // Corner ornaments fade in gently
    .to('.intro-corner-ornament', {
      opacity: 0.45, duration: 1.2, ease: 'power2.out', stagger: 0.1
    })
    // Greeting text floats down
    .to('#envelopeGreeting', {
      opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out'
    }, '-=0.9')
    // Envelope body scales up elegantly
    .to('#envelopeBody', {
      opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'power3.out'
    }, '-=0.65')
    // Wax seal pops in with a satisfying bounce
    .to('#waxSeal', {
      opacity: 1, scale: 1, rotation: 0, duration: 0.85, ease: 'back.out(2.2)'
    }, '-=0.5')
    // Guide pill, button, audio cue stagger in
    .to('#openGuidePill', {
      opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'power2.out'
    }, '-=0.3')
    .to('#introCtaBtn', {
      opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'back.out(1.4)'
    }, '-=0.4')
    .to('#introAudioCue', {
      opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power2.out'
    }, '-=0.35');
}

// Silky Smooth Opening Sequence
function startOpeningSequence() {
  if (isEnvelopeOpened || isIntroAnimating) return;
  isEnvelopeOpened = true;
  isIntroAnimating = true;

  const screen = document.getElementById('envelopeScreen');
  const flap = document.getElementById('envelopeFlap');
  const card = document.getElementById('innerCard');
  const body = document.getElementById('envelopeBody');

  if (screen) {
    screen.classList.add('is-animating');
    gsap.set(screen, { willChange: 'opacity, transform' });
  }

  // Remove CSS transitions that could fight GSAP
  if (body) {
    body.style.transition = 'none';
    body.style.transform = 'none';
  }
  if (flap) flap.style.transition = 'none';
  if (card) card.style.transition = 'none';

  // Hardware-accelerate elements & prevent layout jitter
  gsap.set(['#envelopeFlap', '#innerCard', '#waxSealContainer', '#waxSeal', '#envelopeBody'], {
    force3D: true,
    willChange: 'transform, opacity'
  });

  // Unmute & play wedding audio on this valid user gesture
  if (!isPlayingAudio) {
    toggleAudio();
  }

  // Smooth fade of UI elements (soft & graceful)
  gsap.to(['#openGuidePill', '#introCtaBtn', '#introAudioCue', '#introFooterInfo'], {
    opacity: 0,
    y: 16,
    scale: 0.94,
    duration: 0.45,
    pointerEvents: 'none',
    ease: 'power2.inOut',
    stagger: 0.03
  });
  gsap.to('#envelopeGreeting', {
    opacity: 0,
    y: -16,
    duration: 0.6,
    ease: 'power2.inOut'
  });

  // Fade out ambient petals
  gsap.to('.intro-ambient-petal', {
    opacity: 0,
    duration: 0.7,
    ease: 'power1.out'
  });

  const tl = gsap.timeline({
    defaults: { force3D: true },
    onComplete: () => {
      isIntroAnimating = false;
      if (screen) {
        screen.style.display = 'none';
        screen.classList.remove('is-animating');
        gsap.set(screen, { willChange: 'auto' });
      }
      gsap.set(['#envelopeFlap', '#innerCard', '#waxSealContainer', '#waxSeal', '#envelopeBody'], {
        willChange: 'auto'
      });

      document.documentElement.classList.remove('intro-active');
      document.body.classList.remove('intro-active');

      if (window.lenisInstance) {
        window.lenisInstance.start();
        window.lenisInstance.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }

      if (typeof ScrollTrigger !== 'undefined') {
        setTimeout(() => ScrollTrigger.refresh(), 200);
      }
    }
  });

  // Step 1: Wax seal compression -> gentle bloom & dissolve
  tl.to('#waxSeal', {
    scale: 0.92,
    duration: 0.2,
    ease: 'power2.in'
  })
  .to('#waxSeal', {
    scale: 1.18,
    z: 40,
    duration: 0.45,
    ease: 'back.out(1.6)'
  })
  .to('#waxSealContainer', {
    y: -35,
    opacity: 0,
    scale: 1.05,
    duration: 0.65,
    ease: 'power2.out'
  }, '-=0.1')

  // Step 2: Flap unfolds smoothly 180deg with elegant deceleration
  .to('#envelopeFlap', {
    rotateX: 180,
    duration: 1.25,
    ease: 'power2.inOut',
    transformOrigin: 'top center'
  }, '-=0.35')
  .set('#envelopeFlap', { zIndex: 5 }, '<0.62')

  // Step 3: Inner Card rises majestically from within envelope
  .to('#innerCard', {
    y: -215,
    rotateZ: -1.0,
    scale: 1.06,
    duration: 1.35,
    ease: 'power3.out'
  }, '-=0.55')
  .to('#envelopeBody', {
    y: 38,
    opacity: 0.82,
    scale: 0.97,
    duration: 1.15,
    ease: 'power2.out'
  }, '<')

  // Step 4: Card becomes centerpiece with royal poise
  .to('#innerCard', {
    scale: 1.14,
    y: -105,
    opacity: 1,
    rotateZ: 0,
    duration: 0.85,
    ease: 'power2.inOut'
  })

  // Step 5: Screen gently cross-fades & glides up to reveal cover hero
  .to('#envelopeScreen', {
    opacity: 0,
    yPercent: -15,
    scale: 1.02,
    duration: 1.15,
    ease: 'power3.inOut'
  }, '+=0.15')

  // Seamlessly cue the hero titles as the intro fades
  .fromTo('#coverHeroScreen .rosegold-foil-title, #coverHeroScreen .rosegold-foil-couple', {
    y: 22,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 1.05,
    stagger: 0.12,
    ease: 'power3.out'
  }, '-=0.75');
}

function reopenIntro() {
  const screen = document.getElementById('envelopeScreen');
  if (!screen) return;
  isEnvelopeOpened = false;
  isIntroAnimating = false;
  screen.style.display = 'flex';
  screen.classList.remove('is-animating');
  document.documentElement.classList.add('intro-active');
  document.body.classList.add('intro-active');
  if (window.lenisInstance) window.lenisInstance.stop();

  // Reset all elements
  gsap.set(screen, { yPercent: 0, opacity: 1, clearProps: 'willChange' });
  gsap.set('#envelopeBody', { clearProps: 'all' });
  gsap.set('#envelopeFlap', { clearProps: 'all', zIndex: 30 });
  gsap.set('#innerCard', { clearProps: 'all', zIndex: 15 });
  gsap.set('#waxSealContainer', { clearProps: 'all', opacity: 1 });
  gsap.set('#waxSeal', { clearProps: 'all' });
  gsap.set('#envelopeGreeting', { opacity: 1, y: 0 });
  gsap.set(['#openGuidePill', '#introCtaBtn', '#introAudioCue', '#introFooterInfo'], {
    opacity: 1,
    y: 0,
    clearProps: 'pointerEvents'
  });
  window.scrollTo(0, 0);
}

const khmerDigits = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
function toKhmerNum(num) {
  return num.toString().split('').map(d => khmerDigits[parseInt(d)] || d).join('');
}

function updateCountdown() {
  const targetDate = new Date("December 20, 2026 17:00:00").getTime();
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff > 0) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('khmerDays').innerText = toKhmerNum(days);
    document.getElementById('khmerHours').innerText = toKhmerNum(hours);
    document.getElementById('khmerMins').innerText = toKhmerNum(mins);
    document.getElementById('khmerSecs').innerText = toKhmerNum(secs);

    document.getElementById('latinDays').innerText = `${days} DAYS`;
    document.getElementById('latinHours').innerText = `${hours} HOURS`;
    document.getElementById('latinMins').innerText = `${mins} MINS`;
    document.getElementById('latinSecs').innerText = `${secs} SECS`;
  }
}
setInterval(updateCountdown, 1000);
updateCountdown();

function spawnFloatingLotus(event) {
  const container = document.getElementById('lotusPondInteractive');
  if (!container) return;
  const rect = container.getBoundingClientRect();
  const x = event ? (event.clientX - rect.left) : (rect.width * 0.5 + (Math.random() * 100 - 50));
  const y = event ? (event.clientY - rect.top) : (rect.height * 0.6 + (Math.random() * 80 - 40));

  const ripple = document.createElement('div');
  ripple.className = 'water-ripple';
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  container.appendChild(ripple);
  setTimeout(() => ripple.remove(), 1600);

  const lantern = document.createElement('div');
  lantern.className = 'lotus-lantern flex flex-col items-center select-none';
  lantern.style.left = `${x - 24}px`;
  lantern.style.top = `${y - 24}px`;

  lantern.innerHTML = `
        <div class="relative flex items-center justify-center">
          <div class="w-6 h-6 rounded-full bg-[#f7efdc] filter blur-md opacity-80"></div>
          <svg class="w-10 h-10 text-[#d8c49a] relative z-10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C12 2 8 8 8 13C8 16 10 18 12 21C14 18 16 16 16 13C16 8 12 2 12 2Z"/>
            <path d="M4 14C4 14 7 15 10 12C9 16 6 18 4 18C2 18 2 16 4 14Z" fill="#f7efdc"/>
            <path d="M20 14C20 14 17 15 14 12C15 16 18 18 20 18C22 18 22 16 20 14Z" fill="#f7efdc"/>
          </svg>
        </div>
      `;
  container.appendChild(lantern);
  setTimeout(() => lantern.remove(), 9000);
}




// ── Lightbox with prev/next navigation across all photos ─────────────────
const lightboxItems = [];
let lightboxIndex = 0;
document.querySelectorAll('[onclick*="openLightbox"]').forEach(el => {
  const m = el.getAttribute('onclick').match(/openLightbox\('([^']+)',\s*'([^']+)'\)/);
  if (m) lightboxItems.push({ src: m[1], caption: m[2] });
});

function renderLightbox() {
  const item = lightboxItems[lightboxIndex];
  if (!item) return;
  const img = document.getElementById('lightboxImg');
  img.src = item.src;
  // retrigger the entrance animation
  img.style.animation = 'none';
  void img.offsetWidth;
  img.style.animation = '';
  document.getElementById('lightboxCaption').innerText = item.caption;
  document.getElementById('lbCounter').innerText =
    (lightboxIndex + 1) + ' / ' + lightboxItems.length;
}

function openLightbox(src, caption) {
  const idx = lightboxItems.findIndex(it => it.src === src);
  lightboxIndex = idx >= 0 ? idx : 0;
  if (idx < 0) lightboxItems.unshift({ src, caption });
  const lb = document.getElementById('galleryLightbox');
  lb.classList.remove('hidden');
  lb.classList.add('lb-open');
  renderLightbox();
  if (window.lenisInstance) window.lenisInstance.stop();
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('galleryLightbox');
  lb.classList.add('hidden');
  lb.classList.remove('lb-open');
  if (window.lenisInstance) window.lenisInstance.start();
  document.body.style.overflow = '';
}

function lightboxStep(dir) {
  if (!lightboxItems.length) return;
  lightboxIndex = (lightboxIndex + dir + lightboxItems.length) % lightboxItems.length;
  renderLightbox();
}

document.addEventListener('keydown', (e) => {
  const lb = document.getElementById('galleryLightbox');
  if (lb.classList.contains('hidden')) return;
  if (e.key === 'Escape') closeLightbox();
  else if (e.key === 'ArrowLeft') lightboxStep(-1);
  else if (e.key === 'ArrowRight') lightboxStep(1);
});

// Click on the dark backdrop closes the lightbox
document.getElementById('galleryLightbox').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeLightbox();
});

// ── Smooth anchor navigation (Lenis-aware) ────────────────────────────────
function scrollToTop() {
  if (window.lenisInstance) window.lenisInstance.scrollTo(0, { duration: 1.4 });
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const hash = a.getAttribute('href');
  if (!hash || hash === '#') return;
  const target = document.querySelector(hash);
  if (!target) return;
  e.preventDefault();
  if (window.lenisInstance) window.lenisInstance.scrollTo(target, { duration: 1.4 });
  else target.scrollIntoView({ behavior: 'smooth' });
});

// ── Page progress bar + back-to-top visibility ────────────────────────────
const pageBar = document.getElementById('pageProgressBar');
const backToTopBtn = document.getElementById('backToTopBtn');
function updatePageProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  pageBar.style.width = Math.min(100, pct) + '%';
  backToTopBtn.classList.toggle('show', window.scrollY > 600);
}
window.addEventListener('scroll', updatePageProgress, { passive: true });
updatePageProgress();

// ── Floating Bottom Navigation Dock (Facebook-style Island Dock) ─────────
function updateBottomNavVisibility() {
  const dock = document.getElementById('floatingBottomDock');
  if (!dock) return;

  const isIntro = document.body.classList.contains('intro-active') || document.documentElement.classList.contains('intro-active');
  const scrollY = window.scrollY || window.pageYOffset || 0;
  // Don't show on first page: wait until user scrolls down past ~320px
  const threshold = Math.min(360, window.innerHeight * 0.42);
  const shouldShow = !isIntro && scrollY > threshold;

  dock.classList.toggle('show', shouldShow);

  if (shouldShow) {
    const sections = [
      { id: 'coverHeroScreen', el: document.getElementById('coverHeroScreen') },
      { id: 'invitationSection', el: document.getElementById('invitationSection') },
      { id: 'countdownSection', el: document.getElementById('countdownSection') },
      { id: 'programmeSection', el: document.getElementById('programmeSection') },
      { id: 'venueSection', el: document.getElementById('venueSection') }
    ];

    const scrollPos = scrollY + window.innerHeight * 0.38;
    let activeId = 'invitationSection';

    for (let i = sections.length - 1; i >= 0; i--) {
      const s = sections[i];
      if (s.el && scrollPos >= s.el.offsetTop) {
        activeId = s.id;
        break;
      }
    }

    document.querySelectorAll('.dock-nav-btn').forEach(btn => {
      const target = btn.getAttribute('data-dock-target');
      btn.classList.toggle('active', target === activeId);
    });
  }
}
window.addEventListener('scroll', updateBottomNavVisibility, { passive: true });
updateBottomNavVisibility();


function copyInvitationLink() {
  navigator.clipboard.writeText(window.location.href);
  const textSpan = document.getElementById('copyLinkText');
  textSpan.innerText = "បានចម្លង!";
  setTimeout(() => { textSpan.innerText = "Copy"; }, 2000);
}

function downloadWeddingICS() {
  const icsData = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    "SUMMARY:អាពាហ៍ពិពាហ៍ ភត សុភ័ក្រ & កេត សុភាវី",
    "DESCRIPTION:ពិធីសិរីមង្គលអាពាហ៍ពិពាហ៍ Phort Sopheak & Keth Sopheavy",
    "LOCATION:Battambang City Hall, Cambodia",
    "DTSTART:20261220T100000Z",
    "DTEND:20261220T150000Z",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", "Wedding_Sopheak_Sopheavy.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* ==========================================================================
   MOTION ENGINE v4 — clean, no containerAnimation per-card
   Key fixes vs v3:
   1. ZERO containerAnimation tweens on individual cards — that was the root
      cause of cards getting stuck in their "from" state. GSAP cannot reliably
      measure card positions inside a horizontally-translating container.
   2. Card reveal done by watching onUpdate progress and toggling CSS classes.
      CSS transitions on compositor-only props (opacity, transform) → no paint.
   3. Lenis official wiring unchanged (confirmed correct).
   4. Only the finale card gets a GSAP tween (single element, triggered once).
========================================================================== */

// ── Capability flags ──────────────────────────────────────────────────────
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isWeakDevice = navigator.hardwareConcurrency != null && navigator.hardwareConcurrency <= 4;
let isPhone = window.innerWidth < 768;
let isDesktop = !isPhone;
const motionOK = !prefersReducedMotion;

// ── 1. Register GSAP plugins ──────────────────────────────────────────────
gsap.registerPlugin(ScrollTrigger);

// ── 2. Lenis — official GSAP integration ─────────────────────────────────
let lenis = null;
if (motionOK && isDesktop && typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    duration: 1.0,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
    infinite: false,
  });
  window.lenisInstance = lenis;
  if (document.documentElement.classList.contains('intro-active')) { lenis.stop(); }
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(500, 33);
}

// ── 3. Petal spawner ──────────────────────────────────────────────────────
function spawnPetal(section) {
  if (isPhone || isWeakDevice) return;
  const p = document.createElement('div');
  const size = 6 + Math.random() * 9;
  p.className = 'story-petal';
  p.style.cssText =
    'width:' + size + 'px;' +
    'height:' + size + 'px;' +
    'left:' + (8 + Math.random() * 84) + '%;' +
    'top:' + (35 + Math.random() * 55) + '%;' +
    'animation-duration:' + (5 + Math.random() * 7) + 's;' +
    'animation-delay:0s;';
  section.appendChild(p);
  p.addEventListener('animationend', () => p.remove(), { once: true });
}

// ── 4. Story motion init (re-runnable across breakpoints) ────────────────
const storyState = { triggers: [], observer: null };

function teardownStoryMotion() {
  storyState.triggers.forEach(st => st && st.kill());
  storyState.triggers = [];
  if (storyState.observer) { storyState.observer.disconnect(); storyState.observer = null; }
  const track = document.getElementById('storyHorizontalTrack');
  const section = document.getElementById('loveStorySection');
  if (track) gsap.set(track, { clearProps: 'all' });
  if (section) section.querySelectorAll('.story-photo-item').forEach(p => gsap.set(p, { clearProps: 'all' }));
  const bar = document.getElementById('storyProgressBar');
  if (bar) bar.style.width = '0%';
}

function scrollStoryTrack(dir) {
  const track = document.getElementById('storyHorizontalTrack');
  if (track) {
    const scrollAmount = Math.max(300, Math.round(track.clientWidth * 0.7));
    track.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' });
  }
}

function initStoryMotion() {
  // Idempotency: kill any previously created story pin/triggers first so a
  // second boot (DOMContentLoaded + window load) or a resize re-init can never
  // stack two ScrollTriggers on #loveStorySection (that produced a corrupted
  // position:fixed + translate(0,pinDistance) hybrid and a blank story).
  teardownStoryMotion();

  const section = document.getElementById('loveStorySection');
  const track = document.getElementById('storyHorizontalTrack');
  const wrapper = document.getElementById('storyTrackWrapper');
  const bar = document.getElementById('storyProgressBar');
  const counter = document.getElementById('storyCounterCurrent');
  const glow1 = document.getElementById('storyGlow1');
  const glow2 = document.getElementById('storyGlow2');
  if (!section || !track || !wrapper) return;

  const photos = Array.from(section.querySelectorAll('.story-photo-item'));
  const imgCards = photos.filter(p => p.querySelector('img'));
  const TOTAL = imgCards.length;

  // Ensure all cards are visible immediately
  photos.forEach(p => {
    p.style.opacity = '1';
    p.style.transform = 'none';
  });

  // ── 4a. Header stagger entrance ──────────────────────────────────────
  if (motionOK && typeof gsap !== 'undefined') {
    try {
      const headerTween = gsap.from('.story-header > *', {
        y: 24, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: section, start: 'top 82%', once: true },
      });
      if (headerTween && headerTween.scrollTrigger) {
        storyState.triggers.push(headerTween.scrollTrigger);
      }
      const cueTween = gsap.to('#storyScrollCue', {
        opacity: 1, duration: 0.5, delay: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 78%', once: true },
      });
      if (cueTween && cueTween.scrollTrigger) {
        storyState.triggers.push(cueTween.scrollTrigger);
      }
    } catch (e) {
      console.warn('Story header tween error:', e);
    }
  }

  // ── 4b. Live Counter, Progress Bar & Ambient Sync ────────────────────
  const finaleCard = photos[photos.length - 1];
  function syncStoryProgress() {
    const max = track.scrollWidth - track.clientWidth;
    const pct = max > 0 ? Math.min(1, Math.max(0, track.scrollLeft / max)) : 0;
    if (bar) bar.style.width = (pct * 100) + '%';
    if (counter) {
      const idx = Math.min(TOTAL, Math.max(1, Math.ceil(pct * TOTAL)));
      counter.textContent = String(idx).padStart(2, '0');
    }
    if (glow1) glow1.style.transform = 'translateX(' + (pct * 70) + 'px)';
    if (glow2) glow2.style.transform = 'translateX(' + (-pct * 50) + 'px)';
    if (finaleCard && !finaleCard.querySelector('img')) {
      if (pct > 0.88) {
        finaleCard.style.opacity = '1';
        finaleCard.style.transform = 'scale(1)';
      }
    }
  }
  track.addEventListener('scroll', syncStoryProgress, { passive: true });
  syncStoryProgress();

  // ── 4c. Mouse Wheel Scroll Directly On The Row ───────────────────────
  // When hovering over the track, wheel scrolls the row horizontally!
  // When at the very end or beginning, page scroll continues naturally.
  wrapper.addEventListener('wheel', (e) => {
    if (e.deltaY !== 0 && !e.shiftKey) {
      const max = track.scrollWidth - track.clientWidth;
      const canScrollRight = track.scrollLeft < max - 5;
      const canScrollLeft = track.scrollLeft > 5;
      if ((e.deltaY > 0 && canScrollRight) || (e.deltaY < 0 && canScrollLeft)) {
        e.preventDefault();
        track.scrollLeft += e.deltaY * 1.35;
      }
    }
  }, { passive: false });

  // ── 4d. Smooth Mouse Drag-to-Scroll (Desktop Grab & Swipe) ───────────
  let isDown = false;
  let startX = 0;
  let startScrollLeft = 0;
  let hasDragged = false;

  wrapper.addEventListener('mousedown', (e) => {
    if (e.target.closest('button')) return;
    isDown = true;
    hasDragged = false;
    startX = e.pageX - wrapper.offsetLeft;
    startScrollLeft = track.scrollLeft;
    track.style.scrollBehavior = 'auto';
  });

  window.addEventListener('mouseup', () => {
    if (!isDown) return;
    isDown = false;
    track.style.scrollBehavior = 'auto';
  });

  wrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const x = e.pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 1.6;
    if (Math.abs(walk) > 5) hasDragged = true;
    track.scrollLeft = startScrollLeft - walk;
  });

  // Prevent triggering lightbox click when releasing a drag
  track.querySelectorAll('.story-photo-item').forEach(item => {
    item.addEventListener('click', (e) => {
      if (hasDragged) {
        e.stopPropagation();
        hasDragged = false;
      }
    }, true);
  });

  // ── 4e. Synchronized Page Scroll Pinning (Desktop) ───────────────────
  if (isDesktop && motionOK) {
    const getPinDistance = () => Math.min(2200, Math.max(1200, Math.round(window.innerHeight * 1.8)));

    const pinTrigger = ScrollTrigger.create({
      trigger: section,
      pin: true,
      pinType: 'fixed',
      start: 'top top',
      end: () => '+=' + getPinDistance(),
      scrub: 0.4,
      invalidateOnRefresh: true,
      fastScrollEnd: true,
      onUpdate(self) {
        // When user scrolls the page vertically, glide the horizontal track
        if (!isDown) {
          const max = track.scrollWidth - track.clientWidth;
          if (max > 0) {
            track.scrollLeft = self.progress * max;
          }
        }
      }
    });
    storyState.triggers.push(pinTrigger);
  }
}

// ── 5. Section scroll-reveal engine (choreographed reveals for ALL sections) ──
// Supports an optional `blur: N` (focus-in: starts soft, resolves to sharp and is
// cleared on complete) plus richer default easing. Weak devices skip the blur so
// the one-time reveals stay cheap; everything is gated by prefers-reduced-motion.
function reveal(targets, vars, trigger, start) {
  if (!motionOK || !trigger || typeof gsap === 'undefined') return;
  if (!targets) return;
  const elements = (Array.isArray(targets) ? targets : [targets]).filter(Boolean);
  if (!elements.length) return;
  const v = Object.assign({}, vars || {});
  const blur = v.blur; delete v.blur;
  const fromVars = Object.assign({ opacity: 0, y: 35, duration: 0.9, ease: 'power3.out' }, v);
  if (blur && !isWeakDevice) fromVars.filter = 'blur(' + blur + 'px)';
  try {
    gsap.from(elements, Object.assign(fromVars, {
      scrollTrigger: {
        trigger: trigger,
        start: start || 'top 85%',
        toggleActions: 'play none none none',
        once: true
      },
      onComplete() { gsap.set(elements, { clearProps: 'transform,opacity,filter' }); }
    }));
  } catch (err) {
    console.warn('reveal error:', err);
    try { gsap.set(elements, { opacity: 1, clearProps: 'all' }); } catch (_) { }
  }
}

function initSectionReveals() {
  if (!motionOK) return;
  const q = (s, root) => Array.from((root || document).querySelectorAll(s));
  const one = (s, root) => (root || document).querySelector(s);
  // Directional slide distance for two-column sections (desktop only).
  const dx = isDesktop ? 64 : 0;
  const dy = isDesktop ? 0 : 38;

  // SECTION 2: Cover Hero
  try {
    const cover = one('#coverHeroScreen');
    if (cover) {
      reveal(one('#coverHeroScreen .pt-2, #coverHeroScreen .pt-4'), { y: 30, blur: 6 }, cover, 'top 75%');
      reveal(one('#coverHeroScreen .my-auto'), { y: 46, scale: 0.955, blur: 7, duration: 1.05 }, cover, 'top 70%');
      reveal(one('#coverHeroScreen .max-w-xl.mx-auto.flex-col'), { y: 22, blur: 5, duration: 0.85 }, cover, 'top 65%');
    }
  } catch (e) { console.warn('Cover reveal error:', e); }

  // SECTION 3: Formal Royal Invitation — columns glide in from the sides
  try {
    const inv = one('#invitationSection');
    if (inv) {
      const invCols = q('#invitationSection [class*="lg:col-span-"]');
      const invLeft = invCols[0] || one('#invitationSection .grid > div:first-child');
      const invRight = invCols[1] || one('#invitationSection .grid > div:last-child');
      if (invLeft) {
        reveal(invLeft, { x: isDesktop ? -dx : 0, y: dy, scale: 0.95, blur: 6, duration: 1 }, inv, 'top 82%');
      }
      if (invRight) {
        reveal(invRight, { x: isDesktop ? dx : 0, y: dy, scale: 0.95, blur: 6, duration: 1 }, inv, 'top 82%');
        const cardPlaque = invRight.querySelector('div');
        if (cardPlaque && cardPlaque.children.length) {
          reveal(Array.from(cardPlaque.children), { y: 22, blur: 4, stagger: 0.06, duration: 0.75 }, inv, 'top 80%');
        }
      }
    }
  } catch (e) { console.warn('Invitation reveal error:', e); }

  // SECTION 4: The Couple — groom/bride part from the edges, photo settles center
  try {
    const couple = one('#coupleSection');
    if (couple) {
      reveal(one('#coupleHeader'), { y: 32, blur: 6 }, couple, 'top 85%');
      const groomCol = one('#coupleLayout > div:nth-child(1)');
      const couplePhoto = one('#coupleLayout > div:nth-child(2)');
      const brideCol = one('#coupleLayout > div:nth-child(3)');

      if (groomCol) reveal(groomCol, { x: isDesktop ? -dx : 0, y: dy, blur: 6, duration: 0.95 }, couple, 'top 82%');
      if (couplePhoto) reveal(couplePhoto, { scale: 0.9, y: 46, blur: 9, duration: 1.05 }, couple, 'top 82%');
      if (brideCol) reveal(brideCol, { x: isDesktop ? dx : 0, y: dy, blur: 6, duration: 0.95 }, couple, 'top 82%');
    }
  } catch (e) { console.warn('Couple reveal error:', e); }

  // SECTION 5: Live Countdown
  try {
    const countdown = one('#countdownSection');
    if (countdown) {
      reveal(one('#countdownSection .text-center > span, #countdownSection .text-center > h2'), { y: 28, blur: 6 }, countdown, 'top 85%');
      const cdCards = q('#countdownSection .grid > div');
      if (cdCards.length) {
        reveal(cdCards, { y: 42, scale: 0.88, blur: 5, stagger: 0.08, duration: 0.8, ease: 'back.out(1.4)' }, countdown, 'top 82%');
      }
      const cdBtn = one('#countdownSection button');
      if (cdBtn) reveal(cdBtn, { y: 18, scale: 0.9, blur: 4, duration: 0.65 }, countdown, 'top 78%');
    }
  } catch (e) { console.warn('Countdown reveal error:', e); }

  // SECTION 6: Ceremony Programme — Day Cards and Milestones
  try {
    const prog = one('#programmeSection');
    if (prog) {
      reveal(one('#programmeSection .text-center'), { y: 32, blur: 6 }, prog, 'top 85%');
      const dayCards = q('#programmeSection .prog-day-card');
      dayCards.forEach(c => {
        reveal(c, { y: 36, opacity: 0, blur: 4, duration: 0.8 }, c, 'top 88%');
      });
      const milestones = q('#programmeSection .prog-milestone');
      milestones.forEach((m, i) => {
        reveal(m, { y: 20, opacity: 0, duration: 0.6, delay: (i % 5) * 0.05 }, m, 'top 92%');
      });
    }
  } catch (e) { console.warn('Programme reveal error:', e); }

  // SECTION 8: Pre-Wedding Photo Gallery Header
  try {
    const gal = one('#gallerySection');
    if (gal) {
      reveal(one('#gallerySection .text-center.mb-10, #gallerySection .text-center.mb-14'), { y: 32, blur: 6 }, gal, 'top 85%');
    }
  } catch (e) { console.warn('Gallery header reveal error:', e); }

  // SECTION 9: Venue & Location Map — info and map glide from the sides
  try {
    const venue = one('#venueSection');
    if (venue) {
      reveal(one('#venueSection .text-center.mb-12'), { y: 32, blur: 6 }, venue, 'top 85%');
      const venueInfo = one('#venueSection .grid > div:first-child');
      const venueMap = one('#venueSection .grid > div:last-child');
      if (venueInfo) reveal(venueInfo, { x: isDesktop ? -dx : 0, y: dy, blur: 6, duration: 0.95 }, venue, 'top 82%');
      if (venueMap) reveal(venueMap, { x: isDesktop ? dx : 0, y: dy, blur: 6, duration: 0.95 }, venue, 'top 82%');
    }
  } catch (e) { console.warn('Venue reveal error:', e); }

  // SECTION 10: Wedding Gift / ចំណងដៃ
  try {
    const gift = one('#giftSection');
    if (gift) {
      reveal(one('#giftSection .text-center.mb-12'), { y: 32, blur: 6 }, gift, 'top 85%');
      const giftCards = q('#giftSection .grid > div');
      if (giftCards.length >= 2) {
        reveal(giftCards[0], { x: isDesktop ? -54 : 0, y: 34, blur: 6, duration: 0.9 }, gift, 'top 82%');
        reveal(giftCards[1], { x: isDesktop ? 54 : 0, y: 34, blur: 6, duration: 0.9 }, gift, 'top 82%');
      } else if (giftCards.length) {
        reveal(giftCards, { y: 44, blur: 5, stagger: 0.16 }, gift, 'top 82%');
      }
    }
  } catch (e) { console.warn('Gift reveal error:', e); }

  
      // SECTION 11: Wedding Wishes & Guestbook
      try {
        const wishes = one('#wishesSection');
        if (wishes) {
          reveal(one('#wishesSection .text-center.mb-10, #wishesSection .text-center.mb-14'), { y: 30 }, wishes, 'top 85%');
          const wishCols = q('#wishesSection .grid > div');
          if (wishCols.length) {
            reveal(wishCols, { y: 35, stagger: 0.12, duration: 0.8 }, wishes, 'top 82%');
          }
        }
      } catch (e) { console.warn('Wishes reveal error:', e); }

      // SECTION 12: Footer & Platform Share
  try {
    const footer = one('footer');
    if (footer) {
      reveal(one('footer h2, footer .rosegold-foil-title'), { y: 28, blur: 6 }, footer, 'top 88%');
      reveal(one('footer .text-center.mb-8'), { y: 22, blur: 4 }, footer, 'top 86%');
      const shareBtns = q('footer a, footer button');
      if (shareBtns.length) {
        reveal(shareBtns, { scale: 0.88, y: 18, blur: 4, stagger: 0.06, duration: 0.6, ease: 'back.out(1.5)' }, footer, 'top 84%');
      }
    }
  } catch (e) { console.warn('Footer reveal error:', e); }
}

// ── 6. Hero multi-layer scroll parallax (three depth planes) ───────────────
function initHeroMotion() {
  if (!motionOK || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  const heroStart = { trigger: '#coverHeroScreen', start: 'top top', end: 'bottom top' };

  // Plane 1 (far): the background image drifts down slower than the page scroll.
  // #coverParallax is bled ±8% top/bottom, so ±5% keeps its edges fully covered
  // (no gap ever reveals the section background).
  gsap.fromTo('#coverParallax', { yPercent: -5 }, {
    yPercent: 5, ease: 'none',
    scrollTrigger: Object.assign({ scrub: 0.6 }, heroStart),
  });

  // Plane 2 (mid): the gold-dust layer drifts the opposite way → a second parallax
  // depth so particles and the photo separate as you scroll.
  gsap.fromTo('#goldDustLayer', { yPercent: 0 }, {
    yPercent: -12, ease: 'none',
    scrollTrigger: Object.assign({ scrub: 0.85 }, heroStart),
  });

  // Plane 3 (near): the royal corner ornaments rise and fade out as the cover
  // leaves the screen (they are decorative, never reveal-targeted).
  gsap.fromTo('#coverHeroScreen > div.absolute.z-10', { yPercent: 0, opacity: 0.35 }, {
    yPercent: -22, opacity: 0, ease: 'none',
    scrollTrigger: { trigger: '#coverHeroScreen', start: 'top top', end: 'bottom 40%', scrub: 0.6 },
  });
}

// ── 6b. Section 8: gallery cascade (coordinated, smooth) ──────────────────
function initGalleryMotion() {
  if (!motionOK || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  const gal = document.getElementById('gallerySection');
  if (!gal) return;
  const items = Array.from(gal.querySelectorAll('.gallery-item'));
  if (!items.length) return;

  // Pre-hide, then reveal in coordinated batches as the grid scrolls into view
  try {
    const softBlur = isWeakDevice ? null : 'blur(6px)';
    if (softBlur) gsap.set(items, { opacity: 0, y: 35, scale: 0.95, filter: softBlur });
    else gsap.set(items, { opacity: 0, y: 35, scale: 0.95 });
    ScrollTrigger.batch(items, {
      start: 'top 92%',
      once: true,
      interval: 0.08,
      batchMax: 6,
      onEnter: (batch) => gsap.to(batch, Object.assign({
        opacity: 1, y: 0, scale: 1,
        duration: 0.8, ease: 'power3.out',
        overwrite: true, stagger: 0.08,
        clearProps: 'transform,filter',
      }, softBlur ? { filter: 'blur(0px)' } : null)),
    });
  } catch (e) {
    console.warn('Gallery batch error:', e);
    try { gsap.set(items, { opacity: 1, y: 0, scale: 1, clearProps: 'all' }); } catch (_) { }
  }

  // One-time gold sheen sweep across the grid as it first enters (desktop only)
  try {
    const grid = gal.querySelector('.gallery-grid');
    if (grid && !isWeakDevice && !isPhone) {
      const sheen = document.createElement('div');
      sheen.id = 'gallerySheen';
      grid.appendChild(sheen);
      ScrollTrigger.create({
        trigger: grid, start: 'top 76%', once: true,
        onEnter() {
          sheen.style.animation = 'gallerySheenSweep 1.5s ease-out forwards';
          sheen.addEventListener('animationend', () => sheen.remove(), { once: true });
        },
      });
    }
  } catch (e) {
    console.warn('Gallery sheen error:', e);
  }
}

function spawnGoldDust() {
  if (!motionOK || isWeakDevice) return;
  const layer = document.getElementById('goldDustLayer');
  if (!layer) return;
  layer.innerHTML = '';
  const count = isPhone ? 12 : 24;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('span');
    const size = 2 + Math.random() * 3.5;
    const dur = 22 + Math.random() * 20; // Slower: 22s - 42s
    const left = Math.random() * 100;
    const delay = Math.random() * 14;
    s.className = 'gold-dust';
    s.style.width = size + 'px';
    s.style.height = size + 'px';
    s.style.left = left + '%';
    s.style.bottom = '-15px';
    s.style.animationDuration = dur + 's';
    s.style.animationDelay = delay + 's';
    layer.appendChild(s);
  }
}

function applyHoverLift() {
  document.querySelectorAll(
    '#coupleSection .group, #invitationSection .group, #gallerySection .gallery-item, #giftSection .grid > div'
  ).forEach(el => el.classList.add('hover-lift'));
}

// ── 7. Boot all motions exactly once (guarded against DOMContentLoaded + load) ──
let motionsBooted = false;
function bootAllMotions() {
  if (motionsBooted) {
    // Already initialized — just re-measure (layout/fonts may have shifted).
    try { if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh(); } catch (e) { console.warn(e); }
    return;
  }
  motionsBooted = true;
  try { initStoryMotion(); } catch (e) { console.warn('Story motion error:', e); }
  try { initSectionReveals(); } catch (e) { console.warn('Section reveals error:', e); }
  try { initGalleryMotion(); } catch (e) { console.warn('Gallery motion error:', e); }
  try { initHeroMotion(); } catch (e) { console.warn('Hero motion error:', e); }
  try { spawnGoldDust(); } catch (e) { console.warn('Gold dust error:', e); }
  try { applyHoverLift(); } catch (e) { console.warn('Hover lift error:', e); }
  try { if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh(); } catch (e) { console.warn(e); }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    spawnIntroAmbiance();
    playIntroEntrance();
    bootAllMotions();
  });
} else {
  spawnIntroAmbiance();
  playIntroEntrance();
  bootAllMotions();
}

window.addEventListener('load', () => {
  bootAllMotions();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
});

// Rebuild story motion when crossing the mobile/desktop breakpoint
let lastDesktop = isDesktop;
let resizeTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const nowDesktop = window.innerWidth >= 768;
    if (nowDesktop === lastDesktop) return;
    lastDesktop = nowDesktop;
    isPhone = !nowDesktop;
    isDesktop = nowDesktop;
    teardownStoryMotion();
    initStoryMotion();
    ScrollTrigger.refresh();
  }, 180);
});


// ── Wedding Wishes & Guestbook Logic ──────────────────────────────────────────
const DEFAULT_WISHES = [
  {
    id: 'w-1',
    name: 'ពូ សុខុម & មីង ចិន្តា',
    relationship: 'សាច់ញាតិបងប្អូន',
    message: 'សូមជូនពរក្មួយទាំងពីរឱ្យមានសុភមង្គលពេញលេញ ស្រឡាញ់គ្នារហូតដល់ចាស់កោងខ្នង រកស៊ីមានបាន ត្រជាក់ត្រជុំដូចទឹកអម្រឹត!',
    time: '១ ម៉ោងមុន',
    likes: 18,
    liked: false
  },
  {
    id: 'w-2',
    name: 'ចាន់ វណ្ណា (Vanna)',
    relationship: 'ភ្ញៀវខាងកូនកំលោះ',
    message: 'Happy Wedding to Phort Sopheak & Keth Sopheavy! ជូនពរមិត្តសម្លាញ់ជួបតែសំណាងល្អ សុខភាពមាំមួន និងឆាប់បានក្មួយបីឆាប់ៗណា៎!',
    time: '៣ ម៉ោងមុន',
    likes: 14,
    liked: false
  },
  {
    id: 'w-3',
    name: 'លីដា & ក្រុមការងារ',
    relationship: 'មិត្តភក្តិទាំងសងខាង',
    message: 'អបអរសាទរគូស្នេហ៍ដ៏ស័ក្តិសមបំផុត! សូមឱ្យជីវិតអាពាហ៍ពិពាហ៍ពោរពេញដោយស្នាមញញឹម ភាពចម្រុងចម្រើន និងសេចក្តីសុខជានិរន្តរ៍។',
    time: '៥ ម៉ោងមុន',
    likes: 21,
    liked: false
  },
  {
    id: 'w-4',
    name: 'កញ្ញា ម៉ាលីកា',
    relationship: 'ភ្ញៀវខាងកូនក្រមុំ',
    message: 'ថ្ងៃនេះកូនក្រមុំស្អាតខ្លាំងណាស់! ជូនពរប្អូនស្រីមានក្តីសុខក្នុងជីវិតគូថ្មី ស្វាមីស្រឡាញ់ថ្នាក់ថ្នមមួយជីវិតណា៎!',
    time: 'ម្សិលមិញ',
    likes: 16,
    liked: false
  },
  {
    id: 'w-5',
    name: 'គឹម ហេង & គ្រួសារ',
    relationship: 'សាច់ញាតិបងប្អូន',
    message: 'សូមប្រសិទ្ធពរជ័យ បវរសួស្តី វិបុលសុខគ្រប់ប្រការដល់គូស្វាមីភរិយាថ្មី។ ស្រឡាញ់គ្នាលុះគ្រាអាវសាន្ត!',
    time: 'ម្សិលមិញ',
    likes: 12,
    liked: false
  }
];

function getStoredWishes() {
  try {
    const raw = localStorage.getItem('wedding_wishes_list_v1');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('localStorage read error:', e);
  }
  return DEFAULT_WISHES;
}

function saveWishes(wishes) {
  try {
    localStorage.setItem('wedding_wishes_list_v1', JSON.stringify(wishes));
  } catch (e) {
    console.warn('localStorage write error:', e);
  }
}

let activeWishes = getStoredWishes();

// Validate Cambodian (+855) mobile phone numbers
function validateKhmerPhoneNumber(rawPhone) {
  if (!rawPhone) return { isValid: false, formatted: '' };

  let cleaned = rawPhone.trim().replace(/[\s\-\(\)\.]/g, '');

  if (cleaned.startsWith('+855')) {
    cleaned = cleaned.substring(4);
  } else if (cleaned.startsWith('855')) {
    cleaned = cleaned.substring(3);
  } else if (cleaned.startsWith('0')) {
    cleaned = cleaned.substring(1);
  }

  const khmerMobileRegex = /^[1-9]\d{7,8}$/;
  if (!khmerMobileRegex.test(cleaned)) {
    return { isValid: false, formatted: '' };
  }

  let formatted = '';
  if (cleaned.length === 8) {
    formatted = `+855 ${cleaned.substring(0, 2)} ${cleaned.substring(2, 5)} ${cleaned.substring(5)}`;
  } else {
    formatted = `+855 ${cleaned.substring(0, 3)} ${cleaned.substring(3, 6)} ${cleaned.substring(6)}`;
  }

  return {
    isValid: true,
    formatted: formatted,
    rawLocal: '0' + cleaned,
    e164: '+855' + cleaned
  };
}

function insertQuickWish(text) {
  const textarea = document.getElementById('wishMessage');
  if (textarea) {
    textarea.value = text;
    textarea.focus();
  }
}

// Current Guest Session Management (1 Wish per Guest/Phone)
function getCurrentGuest() {
  try {
    const raw = localStorage.getItem('wedding_current_guest_v1');
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return null;
}

function setCurrentGuest(guest) {
  try {
    if (guest) {
      localStorage.setItem('wedding_current_guest_v1', JSON.stringify(guest));
    } else {
      localStorage.removeItem('wedding_current_guest_v1');
    }
  } catch (_) {}
}

function findWishByGuestPhone(rawPhone) {
  if (!rawPhone) return null;
  const cleanTarget = rawPhone.replace(/\D/g, '').slice(-8);
  return activeWishes.find(w => {
    const cleanW = (w.rawPhone || w.phone || '').replace(/\D/g, '').slice(-8);
    return cleanW && cleanW === cleanTarget;
  });
}

function updateWishUIState() {
  const currentGuest = getCurrentGuest();
  const step1 = document.getElementById('guestLoginStep');
  const step2 = document.getElementById('guestWriteWishStep');
  const step3 = document.getElementById('guestAlreadySentStep');
  const badge = document.getElementById('guestLoginBadge');
  const badgeName = document.getElementById('guestLoginBadgeName');
  const activeLabel = document.getElementById('activeGuestLabel');
  const summaryCard = document.getElementById('guestSentSummaryCard');
  const resendBtn = document.getElementById('wishTelegramBtnStep3');

  if (!step1 || !step2 || !step3) return;

  if (!currentGuest) {
    // Step 1: Login Form
    step1.classList.remove('hidden');
    step2.classList.add('hidden');
    step3.classList.add('hidden');
    if (badge) badge.classList.add('hidden');
  } else {
    if (badge) {
      badge.classList.remove('hidden');
      if (badgeName) badgeName.textContent = currentGuest.name || 'ភ្ញៀវ';
    }

    // Check if this guest already submitted a wish
    const existingWish = findWishByGuestPhone(currentGuest.rawPhone || currentGuest.phone);

    if (existingWish) {
      // Step 3: Already submitted
      step1.classList.add('hidden');
      step2.classList.add('hidden');
      step3.classList.remove('hidden');

      if (summaryCard) {
        const isEn = (currentLang === 'en');
        summaryCard.innerHTML = `
          <div class="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#d8c49a]/20">
            <span class="text-[#d8c49a] font-medium">${isEn ? '👤 Guest Name:' : '👤 ឈ្មោះភ្ញៀវ៖'}</span>
            <span class="text-[#fffaf0]">${existingWish.name} (${existingWish.relationship || (isEn ? 'Guest' : 'ភ្ញៀវ')})</span>
          </div>
          <div class="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#d8c49a]/20">
            <span class="text-[#d8c49a] font-medium">${isEn ? '📞 Phone Number:' : '📞 លេខទូរស័ព្ទ៖'}</span>
            <span class="text-[#fffaf0] font-mono">${existingWish.phone || currentGuest.phone}</span>
          </div>
          <div>
            <span class="text-[#d8c49a] font-medium block mb-1">${isEn ? '💌 Your Blessing:' : '💌 សារជូនពររបស់អ្នក៖'}</span>
            <p class="text-[#f7efdc] italic bg-[#1e1912]/80 p-2.5 rounded-lg border border-[#d8c49a]/15">
              "${existingWish.message}"
            </p>
          </div>
        `;
      }

      if (resendBtn) {
        const tgMsg = `🎉 សារជូនពរអាពាហ៍ពិពាហ៍ (Wedding Blessing) 🎉\n🤵 ភត សុភ័ក្រ & 👰 កេត សុភាវី\n-----------------------------------------\n👤 ពីភ្ញៀវ៖ ${existingWish.name} (${existingWish.relationship || 'ភ្ញៀវ'})\n📞 លេខទូរស័ព្ទ៖ ${existingWish.phone || currentGuest.phone}\n💌 សារជូនពរ៖ ${existingWish.message}\n-----------------------------------------\nសូមអរគុណ!`;
        resendBtn.href = 'https://t.me/pheavii?text=' + encodeURIComponent(tgMsg);
      }
    } else {
      // Step 2: Write Wish Form
      step1.classList.add('hidden');
      step2.classList.remove('hidden');
      step3.classList.add('hidden');

      if (activeLabel) {
        activeLabel.textContent = (currentLang === "en" ? `Guest: ${currentGuest.name} (${currentGuest.phone})` : `ភ្ញៀវ៖ ${currentGuest.name} (${currentGuest.phone})`);
      }
    }
  }

  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}

function handleGuestLogin(e) {
  e.preventDefault();
  const nameInput = document.getElementById('loginGuestName');
  const phoneInput = document.getElementById('loginGuestPhone');
  const phoneError = document.getElementById('loginPhoneError');

  if (!nameInput || !phoneInput) return;

  const name = nameInput.value.trim();
  const rawPhone = phoneInput.value.trim();

  if (!name || !rawPhone) {
    alert('សូមបញ្ចូលឈ្មោះ និងលេខទូរស័ព្ទរបស់អ្នក!');
    return;
  }

  const phoneCheck = validateKhmerPhoneNumber(rawPhone);
  if (!phoneCheck.isValid) {
    if (phoneError) phoneError.classList.remove('hidden');
    phoneInput.focus();
    phoneInput.classList.add('border-rose-500');
    alert('សូមបញ្ចូលលេខទូរស័ព្ទកម្ពុជា (+855) ឱ្យបានត្រឹមត្រូវ! (ឧទាហរណ៍៖ 012 345 678 ឬ +855 12 345 678)\n(Please enter a valid Cambodian phone number).');
    return;
  }

  if (phoneError) phoneError.classList.add('hidden');
  phoneInput.classList.remove('border-rose-500');

  const guest = {
    name: name,
    phone: phoneCheck.formatted,
    rawPhone: phoneCheck.rawLocal
  };

  setCurrentGuest(guest);
  updateWishUIState();
}

function handleGuestLogout() {
  setCurrentGuest(null);
  updateWishUIState();
}

function handleWishSubmit(e) {
  e.preventDefault();
  const currentGuest = getCurrentGuest();
  if (!currentGuest) {
    alert('សូមបញ្ចូលឈ្មោះ និងលេខទូរស័ព្ទរបស់អ្នកជាមុនសិន!');
    updateWishUIState();
    return;
  }

  // Check if this guest already sent a wish (1 wish limit!)
  const existingWish = findWishByGuestPhone(currentGuest.rawPhone || currentGuest.phone);
  if (existingWish) {
    alert('លោកអ្នកបានផ្ញើសារជូនពររួចរាល់ហើយ! អាចផ្ញើបានតែម្ដងប៉ុណ្ណោះ។\n(You have already submitted your wedding wish. Only 1 wish is allowed.)');
    updateWishUIState();
    return;
  }

  const relInput = document.getElementById('wishRelationship');
  const messageInput = document.getElementById('wishMessage');

  if (!messageInput) return;
  const relationship = relInput ? relInput.value : 'មិត្តភក្តិទាំងសងខាង';
  const message = messageInput.value.trim();

  if (!message) {
    alert('សូមសរសេរសារជូនពររបស់អ្នក!');
    return;
  }

  const newWish = {
    id: 'w-' + Date.now(),
    name: currentGuest.name,
    phone: currentGuest.phone,
    rawPhone: currentGuest.rawPhone,
    relationship: relationship,
    message: message,
    time: 'ទើបតែផ្ញើ (Just now)',
    date: new Date().toLocaleDateString('km-KH')
  };

  activeWishes.unshift(newWish);
  saveWishes(activeWishes);

  // Telegram direct URL
  const telegramMessage = `🎉 សារជូនពរអាពាហ៍ពិពាហ៍ (Wedding Blessing) 🎉\n🤵 ភត សុភ័ក្រ & 👰 កេត សុភាវី\n-----------------------------------------\n👤 ពីភ្ញៀវ៖ ${currentGuest.name} (${relationship})\n📞 លេខទូរស័ព្ទ៖ ${currentGuest.phone}\n💌 សារជូនពរ៖ ${message}\n-----------------------------------------\nសូមអរគុណ!`;
  const tgUrl = 'https://t.me/pheavii?text=' + encodeURIComponent(telegramMessage);

  try {
    window.open(tgUrl, '_blank');
  } catch (_) {}

  if (typeof window.burstFlowerPetals === 'function') {
    window.burstFlowerPetals(window.innerWidth / 2, window.innerHeight * 0.6, 14);
  }

  // Transition to Step 3 (already sent)
  updateWishUIState();
}

function initWishSystem() {
  updateWishUIState();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => { initSavedLanguage(); initWishSystem(); });
} else {
  initSavedLanguage();
  initWishSystem();
}


/* ========================================================================= */
/* 3D ROMANTIC FLYING FLOWER PETALS ENGINE (HTML5 Canvas 60fps)              */
/* ========================================================================= */
(function() {
  const canvas = document.getElementById('flowerPetalsCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let animationFrameId = null;
  let isRunning = false;
  let isEnabled = true;
  let lastTime = performance.now();
  let scrollWind = 0;
  let lastScrollY = window.scrollY;

  const pointer = { x: -9999, y: -9999 };
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768;
  const MAX_PETALS = isMobile ? 9 : 16;
  const particles = [];

  const TYPE_DIST = ['rose', 'rose', 'rose', 'gold', 'blossom'];

  function createPetal(burst = false, burstX = 0, burstY = 0) {
    const type = TYPE_DIST[Math.floor(Math.random() * TYPE_DIST.length)];
    const z = 0.45 + Math.random() * 0.95;
    const baseSize = (type === 'blossom' ? 10 : 14) + Math.random() * 6;

    let x, y, vx, vy;
    const slowBaseVy = (0.24 + Math.random() * 0.32) * z;
    if (burst) {
      x = burstX + (Math.random() - 0.5) * 30;
      y = burstY + (Math.random() - 0.5) * 30;
      const angle = Math.random() * Math.PI * 2;
      const speed = (1.2 + Math.random() * 2.2) * (z * 0.85);
      vx = Math.cos(angle) * speed;
      vy = Math.sin(angle) * speed - 0.8;
    } else {
      x = Math.random() * (width + 60) - 30;
      y = -30 - Math.random() * (height * 0.3);
      vx = (Math.random() - 0.5) * 0.35;
      vy = slowBaseVy;
    }

    return {
      x, y, z,
      vx, vy,
      baseVy: slowBaseVy,
      type,
      size: baseSize * z,
      width: (type === 'blossom' ? baseSize : baseSize * 0.85) * z,
      length: (type === 'blossom' ? baseSize : baseSize * 1.45) * z,
      curl: (Math.random() - 0.5) * 0.42,
      opacity: (type === 'gold' ? 0.65 : 0.75) + Math.random() * 0.22,
      rotX: Math.random() * Math.PI * 2,
      rotY: Math.random() * Math.PI * 2,
      rotZ: Math.random() * Math.PI * 2,
      vRotX: (Math.random() - 0.5) * 0.014,
      vRotY: (Math.random() - 0.5) * 0.014,
      vRotZ: (Math.random() - 0.5) * 0.008,
      phase: Math.random() * Math.PI * 2,
      swayAmp: 0.6 + Math.random() * 0.8,
      isBurst: burst,
      burstDecay: burst ? (0.91 + Math.random() * 0.02) : 1
    };
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function initParticles() {
    particles.length = 0;
    for (let i = 0; i < MAX_PETALS; i++) {
      const p = createPetal(false);
      p.y = Math.random() * height;
      particles.push(p);
    }
  }

  function drawPetal(p, isFront, scale) {
    const w = p.width * scale;
    const h = p.length * scale;
    const curl = p.curl;

    ctx.beginPath();
    ctx.moveTo(0, h * 0.48);
    ctx.bezierCurveTo(w * 0.65, h * 0.35, w * (0.75 + curl), -h * 0.1, 0, -h * 0.5);
    ctx.bezierCurveTo(-w * (0.75 - curl), -h * 0.1, -w * 0.65, h * 0.35, 0, h * 0.48);
    ctx.closePath();

    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(w, h));
    if (p.type === 'gold') {
      if (isFront) {
        grad.addColorStop(0, 'rgba(255, 252, 240, ' + p.opacity + ')');
        grad.addColorStop(0.45, 'rgba(228, 204, 158, ' + (p.opacity * 0.95) + ')');
        grad.addColorStop(1, 'rgba(188, 154, 98, ' + (p.opacity * 0.85) + ')');
      } else {
        grad.addColorStop(0, 'rgba(220, 192, 142, ' + p.opacity + ')');
        grad.addColorStop(0.5, 'rgba(180, 148, 92, ' + (p.opacity * 0.95) + ')');
        grad.addColorStop(1, 'rgba(142, 110, 62, ' + (p.opacity * 0.85) + ')');
      }
    } else {
      if (isFront) {
        grad.addColorStop(0, 'rgba(255, 244, 246, ' + p.opacity + ')');
        grad.addColorStop(0.5, 'rgba(248, 190, 202, ' + (p.opacity * 0.95) + ')');
        grad.addColorStop(1, 'rgba(224, 140, 156, ' + (p.opacity * 0.85) + ')');
      } else {
        grad.addColorStop(0, 'rgba(242, 182, 195, ' + p.opacity + ')');
        grad.addColorStop(0.55, 'rgba(216, 128, 146, ' + (p.opacity * 0.95) + ')');
        grad.addColorStop(1, 'rgba(178, 92, 112, ' + (p.opacity * 0.85) + ')');
      }
    }
    ctx.fillStyle = grad;
    ctx.fill();

    if (scale > 0.82) {
      ctx.beginPath();
      ctx.moveTo(0, h * 0.4);
      ctx.quadraticCurveTo(w * curl * 0.3, 0, 0, -h * 0.36);
      ctx.strokeStyle = isFront
        ? (p.type === 'gold' ? 'rgba(255, 255, 255, ' + (p.opacity * 0.5) + ')' : 'rgba(255, 255, 255, ' + (p.opacity * 0.45) + ')')
        : 'rgba(140, 60, 80, ' + (p.opacity * 0.3) + ')';
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
  }

  function drawBlossom(p, isFront, scale) {
    const r = (p.size * 0.5) * scale;
    const numPetals = 5;
    for (let i = 0; i < numPetals; i++) {
      const angle = (i * Math.PI * 2) / numPetals;
      ctx.save();
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(r * 0.4, -r * 0.5, r * 0.45, -r * 0.92, 0, -r);
      ctx.bezierCurveTo(-r * 0.45, -r * 0.92, -r * 0.4, -r * 0.5, 0, 0);
      ctx.closePath();

      const grad = ctx.createRadialGradient(0, 0, 0, 0, -r * 0.5, r);
      if (isFront) {
        grad.addColorStop(0, 'rgba(255, 248, 248, ' + p.opacity + ')');
        grad.addColorStop(0.55, 'rgba(250, 198, 208, ' + (p.opacity * 0.92) + ')');
        grad.addColorStop(1, 'rgba(226, 145, 164, ' + (p.opacity * 0.82) + ')');
      } else {
        grad.addColorStop(0, 'rgba(242, 190, 202, ' + p.opacity + ')');
        grad.addColorStop(0.6, 'rgba(220, 132, 152, ' + (p.opacity * 0.92) + ')');
        grad.addColorStop(1, 'rgba(182, 94, 116, ' + (p.opacity * 0.82) + ')');
      }
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    }
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.22, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(228, 194, 110, ' + (p.opacity * 0.95) + ')';
    ctx.fill();
  }

  function render(now) {
    if (!isRunning || !isEnabled) return;
    const delta = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;

    ctx.clearRect(0, 0, width, height);
    scrollWind *= 0.92;
    const timeSec = now * 0.001;

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];

      p.rotX += p.vRotX;
      p.rotY += p.vRotY;
      p.rotZ += p.vRotZ;

      if (p.isBurst) {
        p.vx *= p.burstDecay;
        p.vy = p.vy * p.burstDecay + p.baseVy * (1 - p.burstDecay);
        if (Math.abs(p.vx) < 0.8 && Math.abs(p.vy - p.baseVy) < 0.4) {
          p.isBurst = false;
        }
      }

      const sway = Math.sin(timeSec * 0.65 + p.phase) * (p.swayAmp * 0.65) * (p.z * 0.8);
      p.x += (p.vx + sway + scrollWind * 0.35);
      p.y += p.vy;

      const dx = p.x - pointer.x;
      const dy = p.y - pointer.y;
      const distSq = dx * dx + dy * dy;
      if (distSq < 14400) {
        const dist = Math.sqrt(distSq);
        const force = (1 - dist / 120) * 1.6;
        p.x += (dx / dist) * force * 3;
        p.y += (dy / dist) * force * 1.5;
        p.rotZ += 0.04;
      }

      if (p.y > height + 40 || p.x < -60 || p.x > width + 60) {
        if (p.isBurst) {
          particles.splice(i, 1);
          continue;
        } else {
          p.x = Math.random() * (width + 60) - 30;
          p.y = -35;
          p.vx = (Math.random() - 0.5) * 0.35;
          p.vy = p.baseVy;
          p.rotX = Math.random() * Math.PI * 2;
          p.rotY = Math.random() * Math.PI * 2;
          p.rotZ = Math.random() * Math.PI * 2;
        }
      }

      const cosX = Math.cos(p.rotX);
      const cosY = Math.cos(p.rotY);
      const isFront = (cosX * cosY) >= 0;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotZ);

      const scaleX = Math.max(Math.abs(cosX), 0.08) * p.z;
      const scaleY = Math.max(Math.abs(cosY), 0.08) * p.z;
      ctx.scale(scaleX, scaleY);

      if (p.type === 'blossom') {
        drawBlossom(p, isFront, 1.0);
      } else {
        drawPetal(p, isFront, 1.0);
      }

      ctx.restore();
    }

    animationFrameId = requestAnimationFrame(render);
  }

  function start() {
    if (isRunning) return;
    isRunning = true;
    lastTime = performance.now();
    animationFrameId = requestAnimationFrame(render);
  }

  function stop() {
    isRunning = false;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  window.burstFlowerPetals = function(x, y, count = 12) {
    if (!isEnabled) return;
    const cx = x !== undefined ? x : width / 2;
    const cy = y !== undefined ? y : height * 0.45;
    for (let i = 0; i < count; i++) {
      particles.push(createPetal(true, cx, cy));
    }
  };

  window.toggleFlowerPetals = function() {
    isEnabled = !isEnabled;
    try {
      localStorage.setItem('wedding_petals_enabled', isEnabled ? 'true' : 'false');
    } catch (_) {}

    const btn = document.getElementById('petalsToggleBtn');
    const icon = document.getElementById('petalsIcon');
    if (canvas) {
      canvas.style.opacity = isEnabled ? '1' : '0';
    }
    if (btn) {
      btn.classList.toggle('opacity-50', !isEnabled);
      btn.classList.toggle('active', isEnabled);
    }
    if (icon) {
      icon.textContent = isEnabled ? '🌸' : '🍃';
    }

    if (isEnabled) {
      start();
      window.burstFlowerPetals(window.innerWidth / 2, window.innerHeight * 0.4, 12);
    }
  };

  window.addEventListener('resize', resize, { passive: true });

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    const dy = currentY - lastScrollY;
    scrollWind = Math.max(-4, Math.min(4, dy * 0.12));
    lastScrollY = currentY;
  }, { passive: true });

  window.addEventListener('mousemove', (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      pointer.x = e.touches[0].clientX;
      pointer.y = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    pointer.x = -9999;
    pointer.y = -9999;
  }, { passive: true });

  window.addEventListener('click', (e) => {
    const tag = e.target && e.target.tagName ? e.target.tagName.toLowerCase() : '';
    if (tag !== 'button' && tag !== 'a' && tag !== 'input' && tag !== 'select' && tag !== 'textarea') {
      if (isEnabled && Math.random() < 0.25) {
        window.burstFlowerPetals(e.clientX, e.clientY, 1);
      }
    }
  }, { passive: true });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stop();
    } else if (isEnabled) {
      start();
    }
  });

  try {
    const saved = localStorage.getItem('wedding_petals_enabled');
    if (saved === 'false') {
      isEnabled = false;
      if (canvas) canvas.style.opacity = '0';
      const btn = document.getElementById('petalsToggleBtn');
      if (btn) btn.classList.add('opacity-50');
    }
  } catch (_) {}

  resize();
  initParticles();
  if (isEnabled) {
    start();
  }
})();
