import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Locale = "en" | "fa" | "ar" | "tr";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
  isTransitioning: boolean;
}

const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.experience": "Experience",
    "nav.contact": "Contact",

    // Hero
    "hero.badge": "Available for new opportunities",
    "hero.title.greeting": "Hi, I'm",
    "hero.subtitle": "Frontend Developer",
    "hero.desc": "Crafting elegant, high-performance web experiences with modern technologies. Passionate about clean code, intuitive UIs, and continuous learning.",
    "hero.cta.experience": "View Experience",
    "hero.cta.contact": "Get In Touch",
    "hero.stats.experience": "Experience",
    "hero.stats.experience.value": "10+ Years",
    "hero.stats.projects": "Projects",
    "hero.stats.projects.value": "50+",
    "hero.scroll": "Scroll",

    // About
    "about.label": "About Me",
    "about.title": "Turning ideas into",
    "about.title.highlight": "reality",
    "about.journey.title": "My Journey",
    "about.journey.p1": "I am a front-end developer with a proven ability to collaborate effectively with senior developers. I always enjoy working as a team member and have a strong passion for learning new technologies.",
    "about.journey.p2": "With experience working in programming teams and coordinating with colleagues, I bring a comprehensive approach to building web applications that deliver exceptional user experiences and meet business objectives.",
    "about.stat.years": "Years of Experience",
    "about.stat.companies": "Companies Worked",
    "about.stat.projects": "Projects Delivered",

    // Skills
    "skills.label": "Tech Stack",
    "skills.title": "Skills &",
    "skills.title.highlight": "Technologies",

    // Experience
    "experience.label": "Career Path",
    "experience.title": "Work",
    "experience.title.highlight": "Experience",

    // Experience items
    "exp.otaghak.title": "Frontend Developer",
    "exp.otaghak.company": "Otaghak",
    "exp.otaghak.date": "Oct 2025",
    "exp.otaghak.desc": "Otaghak is a leading online platform for booking villas, apartments, and accommodations across Iran, Turkey, Armenia, and South Africa. As a Frontend Developer, I contributed to the development and enhancement of the platform's user interface, focusing on creating seamless booking experiences and improving user engagement. The platform features over 38,000 accommodations and provides users with comprehensive search and filtering capabilities.",
    "exp.otaghak.extra": "During my time at Otaghak, I worked on optimizing the booking flow, enhancing the search functionality, and improving the overall user experience across different device types.",

    "exp.dinawin.title": "Frontend Developer",
    "exp.dinawin.company": "Dinawin",
    "exp.dinawin.date": "Jan 2022 - Present",
    "exp.dinawin.desc": "Dinawin is a leading company in the automotive spare parts industry with multiple applications. As a Frontend Developer, my primary responsibility is to modernize and refactor the legacy application from the ground up. This involves implementing modern technologies, improving application performance, and ensuring a seamless user experience across all platforms.",
    "exp.dinawin.highlight1": "Baaz.ir — Main platform for automotive spare parts with advanced search capabilities and real-time inventory management",
    "exp.dinawin.highlight2": "Karban.Baaz.ir — Specialized Task Management System with comprehensive workflow automation",
    "exp.dinawin.highlight3": "Shop.Baaz.ir — E-commerce platform with integrated payment gateways and order tracking",
    "exp.dinawin.highlight4": "Akorayan.com — Additional platform for automotive services with CRM features",

    "exp.ketabplus.title": "Frontend Developer",
    "exp.ketabplus.company": "KetabPlus",
    "exp.ketabplus.date": "Mar 2021 - Feb 2022",
    "exp.ketabplus.desc": "KetabPlus is an innovative startup in the book industry, dedicated to promoting reading culture and making books more accessible. I was responsible for refactoring, developing, and maintaining both the public website and the admin panel.",

    "exp.sandbadcell.title": "Frontend Developer",
    "exp.sandbadcell.company": "SandBadCell",
    "exp.sandbadcell.date": "Aug 2019 - Feb 2021",
    "exp.sandbadcell.desc": "SandBadCell is a B2B platform developed by Ahoora Company, specializing in business-to-business transactions. I developed and maintained both the public-facing website and the administrative panel.",

    "exp.seoraz.title": "Frontend Developer",
    "exp.seoraz.company": "Seoraz | Simagar",
    "exp.seoraz.date": "Feb 2017 - Aug 2019",
    "exp.seoraz.desc": "Seoraz is a fully bundled services provider of Web Design, Development, Corporate Identity, Mobile Apps along with SEO and Social Media. I contributed to various web projects focusing on responsive and visually appealing interfaces.",

    "exp.webnegah.title": "Frontend Developer",
    "exp.webnegah.company": "WebNegah",
    "exp.webnegah.date": "Jan 2015 - Jan 2017",
    "exp.webnegah.desc": "WebNegah is a well-established programming company with over 20 years of experience. I designed and developed websites tailored to specific customer requirements using various technologies.",

    // GitHub
    "github.label": "Open Source",
    "github.title": "GitHub",
    "github.title.highlight": "Activity",

    // Contact
    "contact.label": "Get In Touch",
    "contact.title": "Let's Work",
    "contact.title.highlight": "Together",
    "contact.info.title": "Contact Information",
    "contact.location": "Tehran, Iran",
    "contact.social.title": "Connect With Me",

    // Footer
    "footer.rights": "All rights reserved.",
    "footer.crafted": "Crafted with passion & precision",

    // Language Switcher
    "lang.en": "English",
    "lang.fa": "فارسی",
    "lang.ar": "العربية",
  },

  fa: {
    // Navigation
    "nav.home": "خانه",
    "nav.about": "درباره من",
    "nav.skills": "توانمندی‌ها",
    "nav.experience": "تجربیات",
    "nav.contact": "تماس",

    // Hero
    "hero.badge": "آماده برای فرصت‌های جدید",
    "hero.title.greeting": "سلام، من",
    "hero.subtitle": "توسعه‌دهنده Frontend",
    "hero.desc": "ساخت تجربه‌های وب زیبا و با عملکرد بالا با استفاده از فناوری‌های مدرن. عاشق کد تمیز، رابط‌های کاربری بصری و یادگیری مداوم هستم.",
    "hero.cta.experience": "مشاهده تجربیات",
    "hero.cta.contact": "ارتباط با من",
    "hero.stats.experience": "تجربه",
    "hero.stats.experience.value": "+۱۰ سال",
    "hero.stats.projects": "پروژه‌ها",
    "hero.stats.projects.value": "+۵۰",
    "hero.scroll": "اسکرول",

    // About
    "about.label": "درباره من",
    "about.title": "تبدیل ایده‌ها به",
    "about.title.highlight": "واقعیت",
    "about.journey.title": "مسیر من",
    "about.journey.p1": "من یک توسعه‌دهنده Frontend هستم با تجربه اثبات شده در همکاری مؤثر با توسعه‌دهندگان ارشد. همیشه از کار تیمی لذت می‌برم و علاقه زیادی به یادگیری فناوری‌های جدید دارم.",
    "about.journey.p2": "با تجربه کار در تیم‌های برنامه‌نویسی و هماهنگی با همکاران، رویکردی جامع برای ساخت اپلیکیشن‌های وب ارائه می‌دهم که تجربه‌های کاربری استثنایی ارائه می‌دهند و اهداف کسب‌وکار را برآورده می‌کنند.",
    "about.stat.years": "سال تجربه",
    "about.stat.companies": "شرکت‌های همکار",
    "about.stat.projects": "پروژه‌های تحویل شده",

    // Skills
    "skills.label": "Stack فناوری",
    "skills.title": "توانمندی‌ها و",
    "skills.title.highlight": "فناوری‌ها",

    // Experience
    "experience.label": "مسیر شغلی",
    "experience.title": "تجربه",
    "experience.title.highlight": "کاری",

    // Experience items
    "exp.otaghak.title": "توسعه‌دهنده Frontend",
    "exp.otaghak.company": "اتاقک",
    "exp.otaghak.date": "اکتبر ۲۰۲۵",
    "exp.otaghak.desc": "اتاقک یک پلتفرم آنلاین پیشرو برای رزرو ویلا، آپارتمان و اقامتگاه در ایران، ترکیه، ارمنستان و آفریقای جنوبی است. به عنوان توسعه‌دهنده Frontend، در توسعه و بهبود رابط کاربری پلتفرم مشارکت کردم و بر ایجاد تجربه‌های رزرو یکپارچه و بهبود تعامل کاربران تمرکز داشتم. این پلتفرم بیش از ۳۸,۰۰۰ اقامتگاه دارد و قابلیت‌های جستجو و فیلتر کامل را به کاربران ارائه می‌دهد.",
    "exp.otaghak.extra": "در دوران حضور در اتاقک، بر بهینه‌سازی فرآیند رزرو، بهبود عملکرد جستجو و ارتقای تجربه کاربری در انواع مختلف دستگاه‌ها کار کردم.",

    "exp.dinawin.title": "توسعه‌دهنده Frontend",
    "exp.dinawin.company": "دیناوین",
    "exp.dinawin.date": "ژانویه ۲۰۲۲ - فعلی",
    "exp.dinawin.desc": "دیناوین یک شرکت پیشرو در صنعت قطعات یدکی خودرو با اپلیکیشن‌های متعدد است. به عنوان توسعه‌دهنده Frontend، مسئولیت اصلی من نوسازی و بازسازی اپلیکیشن legacy از صفر است. این شامل پیاده‌سازی فناوری‌های مدرن، بهبود عملکرد اپلیکیشن و تضمین تجربه کاربری یکپارچه در تمام پلتفرم‌ها است.",
    "exp.dinawin.highlight1": "Baaz.ir — پلتفرم اصلی قطعات یدکی خودرو با قابلیت‌های جستجوی پیشرفته و مدیریت موجودی در زمان واقعی",
    "exp.dinawin.highlight2": "Karban.Baaz.ir — سیستم مدیریت وظیفه تخصصی با اتوماسیون جامع گردش کار",
    "exp.dinawin.highlight3": "Shop.Baaz.ir — پلتفرم E-commerce با درگاه‌های پرداخت یکپارچه و پیگیری سفارشات",
    "exp.dinawin.highlight4": "Akorayan.com — پلتفرم اضافی خدمات خودرو با قابلیت‌های CRM",

    "exp.ketabplus.title": "توسعه‌دهنده Frontend",
    "exp.ketabplus.company": "کتاب پلاس",
    "exp.ketabplus.date": "مارس ۲۰۲۱ - فوریه ۲۰۲۲",
    "exp.ketabplus.desc": "کتاب پلاس یک استارتاپ نوآورانه در صنعت کتاب است که به ترویج فرهنگ مطالعه و در دسترس‌تر کردن کتاب‌ها اختصاص دارد. من مسئول بازسازی، توسعه و نگهداری وب‌سایت عمومی و پنل مدیریت بودم.",

    "exp.sandbadcell.title": "توسعه‌دهنده Frontend",
    "exp.sandbadcell.company": "سندبادسل",
    "exp.sandbadcell.date": "آگوست ۲۰۱۹ - فوریه ۲۰۲۱",
    "exp.sandbadcell.desc": "سندبادسل یک پلتفرم B2B است که توسط شرکت اهورا توسعه یافته و در معاملات تجاری B2B تخصص دارد. من وب‌سایت عمومی و پنل مدیریت را توسعه و نگهداری کردم.",

    "exp.seoraz.title": "توسعه‌دهنده Frontend",
    "exp.seoraz.company": "سیوراز | سیماگر",
    "exp.seoraz.date": "فوریه ۲۰۱۷ - آگوست ۲۰۱۹",
    "exp.seoraz.desc": "سیوراز ارائه‌دهنده خدمات کامل طراحی وب، توسعه، هویت سازمانی، اپلیکیشن‌های موبایل به همراه SEO و شبکه‌های اجتماعی است. من در پروژه‌های وب مختلف با تمرکز بر رابط‌های واکنش‌گرا و جذاب بصری مشارکت کردم.",

    "exp.webnegah.title": "توسعه‌دهنده Frontend",
    "exp.webnegah.company": "وب‌نگاه",
    "exp.webnegah.date": "ژانویه ۲۰۱۵ - ژانویه ۲۰۱۷",
    "exp.webnegah.desc": "وب‌نگاه یک شرکت برنامه‌نویسی معتبر با بیش از ۲۰ سال تجربه است. من وب‌سایت‌هایی متناسب با نیازهای خاص مشتریان با استفاده از فناوری‌های مختلف طراحی و توسعه دادم.",

    // GitHub
    "github.label": " Open Source",
    "github.title": "فعالیت‌های",
    "github.title.highlight": "GitHub",

    // Contact
    "contact.label": "ارتباط با من",
    "contact.title": "بیایید با هم",
    "contact.title.highlight": "همکاری کنیم",
    "contact.info.title": "اطلاعات تماس",
    "contact.location": "تهران، ایران",
    "contact.social.title": "در شبکه‌های اجتماعی",

    // Footer
    "footer.rights": "تمامی حقوق محفوظ است.",
    "footer.crafted": "با عشق و دقت ساخته شده",

    // Language Switcher
    "lang.en": "English",
    "lang.fa": "فارسی",
    "lang.ar": "العربية",
  },

  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.about": "عني",
    "nav.skills": "المهارات",
    "nav.experience": "الخبرات",
    "nav.contact": "تواصل",

    // Hero
    "hero.badge": "متاح لفرص جديدة",
    "hero.title.greeting": "مرحباً، أنا",
    "hero.subtitle": "مطور Frontend",
    "hero.desc": "تصميم تجارب ويب أنيقة وعالية الأداء باستخدام التقنيات الحديثة. شغوف بالكود النظيف والواجهات البصرية والتعلم المستمر.",
    "hero.cta.experience": "عرض الخبرات",
    "hero.cta.contact": "تواصل معي",
    "hero.stats.experience": "الخبرة",
    "hero.stats.experience.value": "+١٠ سنوات",
    "hero.stats.projects": "المشاريع",
    "hero.stats.projects.value": "+٥٠",
    "hero.scroll": "تمرير",

    // About
    "about.label": "عني",
    "about.title": "تحويل الأفكار إلى",
    "about.title.highlight": "واقع",
    "about.journey.title": "رحلتي",
    "about.journey.p1": "أنا مطور Frontend مع قدرة مثبتة على التعاون الفعال مع المطورين seniors. أستمتع دائماً بالعمل كعضو في فريق ولدي شغف قوي لتعلم التقنيات الجديدة.",
    "about.journey.p2": "مع الخبرة في العمل في فرق البرمجة والتنسيق مع الزملاء، أحضر نهجاً شاملاً لبناء تطبيقات الويب التي تقدم تجارب استثنائية للمستخدمين وتحقق أهداف الأعمال.",

    "about.stat.years": "سنوات الخبرة",
    "about.stat.companies": "شركات عملت بها",
    "about.stat.projects": "مشاريع تم تسليمها",

    // Skills
    "skills.label": "Stack التقنيات",
    "skills.title": "المهارات و",
    "skills.title.highlight": "التقنيات",

    // Experience
    "experience.label": "المسار المهني",
    "experience.title": "الخبرة",
    "experience.title.highlight": "العملية",

    // Experience items
    "exp.otaghak.title": "مطور Frontend",
    "exp.otaghak.company": "أوتاخاك",
    "exp.otaghak.date": "أكتوبر ٢٠٢٥",
    "exp.otaghak.desc": "أوتاخاك منصة إلكترونية رائدة لحجز الفلل والشقق والإقامات عبر إيران وتركيا وأرمينيا وجنوب أفريقيا. كمطور Frontend، ساهمت في تطوير وتحسين واجهة المستخدم للمنصة، مع التركيز على خلق تجارب حجز سلسة وتحسين تفاعل المستخدمين. تضم المنصة أكثر من ٣٨,٠٠٠ إقامة وتوفر للمستخدمين إمكانيات بحث وتصفية شاملة.",
    "exp.otaghak.extra": "خلال فترة عملي في Otakhak، عملت على تحسين تدفق الحجز، وتعزيز وظائف البحث، وتحسين تجربة المستخدم عبر أنواع الأجهزة المختلفة.",

    "exp.dinawin.title": "مطور Frontend",
    "exp.dinawin.company": "دينوين",
    "exp.dinawin.date": "يناير ٢٠٢٢ - حالي",
    "exp.dinawin.desc": "دينوين شركة رائدة في صناعة قطع غيار السيارات مع تطبيقات متعددة. كمطور Frontend، مسؤوليتي الرئيسية هي تحديث وتجديد التطبيق القديم من الصفر. يشمل ذلك تنفيذ التقنيات الحديثة وتحسين أداء التطبيق وضمان تجربة مستخدم سلسة عبر جميع المنصات.",
    "exp.dinawin.highlight1": "Baaz.ir — المنصة الرئيسية لقطع غيار السيارات مع إمكانيات بحث متقدمة وإدارة المخزون في الوقت الفعلي",
    "exp.dinawin.highlight2": "Karban.Baaz.ir — نظام إدارة المهام المتخصص مع أتمتة شاملة لتدفق العمل",
    "exp.dinawin.highlight3": "Shop.Baaz.ir — منصة التجارة الإلكترونية مع بوابات دفع متكاملة وتتبع الطلبات",
    "exp.dinawin.highlight4": "Akorayan.com — منصة إضافية لخدمات السيارات مع ميزات CRM",

    "exp.ketabplus.title": "مطور Frontend",
    "exp.ketabplus.company": "كتاب بلس",
    "exp.ketabplus.date": "مارس ٢٠٢١ - فبراير ٢٠٢٢",
    "exp.ketabplus.desc": "كتاب بلس شركة ناشئة مبتكرة في صناعة الكتب، مكرسة لتعزيز ثقافة القراءة وجعل الكتب أكثر سهولة في الوصول. كنت مسؤولاً عن تجديد وتطوير وصيانة الموقع الإلكتروني العام ولوحة التحكم.",

    "exp.sandbadcell.title": "مطور Frontend",
    "exp.sandbadcell.company": "سندبادسل",
    "exp.sandbadcell.date": "أغسطس ٢٠١٩ - فبراير ٢٠٢١",
    "exp.sandbadcell.desc": "سندبادسل منصة B2B طورتها شركة أهورا، متخصصة في المعاملات التجارية B2B. قمت بتطوير وصيانة الموقع الإلكتروني ولوحة الإدارة.",

    "exp.seoraz.title": "مطور Frontend",
    "exp.seoraz.company": "سيوراز | سيماجر",
    "exp.seoraz.date": "فبراير ٢٠١٧ - أغسطس ٢٠١٩",
    "exp.seoraz.desc": "سيوراز مزود خدمات متكامل لتصميم وتطوير المواقع والهوية المؤسسية وتطبيقات الهاتف بالإضافة إلى وسائل التواصل الاجتماعي. ساهمت في مشاريع ويب متعددة مع التركيز على واجهات متجاوبة وجذابة بصرياً.",

    "exp.webnegah.title": "مطور Frontend",
    "exp.webnegah.company": "وب نگاه",
    "exp.webnegah.date": "يناير ٢٠١٥ - يناير ٢٠١٧",
    "exp.webnegah.desc": "وب نگاه شركة برمجة راسخة بأكثر من ٢٠ عاماً من الخبرة. صممت وطورت مواقع ويب مصممة خصيصاً وفقاً لمتطلبات العملاء باستخدام تقنيات مختلفة.",

    // GitHub
    "github.label": " Open Source",
    "github.title": "نشاط",
    "github.title.highlight": "GitHub",

    // Contact
    "contact.label": "تواصل معي",
    "contact.title": "دعونا نعمل",
    "contact.title.highlight": "معاً",
    "contact.info.title": "معلومات الاتصال",
    "contact.location": "طهران، إيران",
    "contact.social.title": "تواصل معي",

    // Footer
    "footer.rights": "جميع الحقوق محفوظة.",
    "footer.crafted": "صُنع بشغف ودقة",

    // Language Switcher
    "lang.en": "English",
    "lang.fa": "فارسی",
    "lang.ar": "العربية",
    "lang.tr": "Türkçe",
  },

  tr: {
    // Navigation
    "nav.home": "Ana Sayfa",
    "nav.about": "Hakkımda",
    "nav.skills": "Yetenekler",
    "nav.experience": "Deneyim",
    "nav.contact": "İletişim",

    // Hero
    "hero.badge": "Yeni fırsatlara açığım",
    "hero.title.greeting": "Merhaba, ben",
    "hero.subtitle": "Frontend Developer",
    "hero.desc": "Modern teknolojilerle zarif ve yüksek performanslı web deneyimleri oluşturuyorum. Temiz kod, sezgisel arayüzler ve sürekli öğrenmeye tutkuyla bağlıyım.",
    "hero.cta.experience": "Deneyimi Görüntüle",
    "hero.cta.contact": "İletişime Geç",
    "hero.stats.experience": "Deneyim",
    "hero.stats.experience.value": "10+ Yıl",
    "hero.stats.projects": "Projeler",
    "hero.stats.projects.value": "50+",
    "hero.scroll": "Kaydır",

    // About
    "about.label": "Hakkımda",
    "about.title": "Fikirleri",
    "about.title.highlight": "gerçeğe dönüştürmek",
    "about.journey.title": "Yolculuğum",
    "about.journey.p1": "Kıdemli geliştiricilerle etkin bir şekilde işbirliği yapma konusunda kanıtlanmış bir yeteneğe sahip bir frontend geliştiriciyim. Her zaman bir ekip üyesi olarak çalışmaktan keyif alıyorum ve yeni teknolojileri öğrenmeye karşı güçlü bir tutkum var.",
    "about.journey.p2": "Programlama ekiplerinde çalışma ve meslektaşlarla koordinasyon sağlama deneyimimle, istisnai kullanıcı deneyimleri sunan ve iş hedeflerini karşılayan web uygulamaları oluşturma konusunda kapsamlı bir yaklaşım getiriyorum.",
    "about.stat.years": "Yıl Deneyim",
    "about.stat.companies": "Çalışılan Şirketler",
    "about.stat.projects": "Tamamlanan Projeler",

    // Skills
    "skills.label": "Teknoloji Stack",
    "skills.title": "Yetenekler &",
    "skills.title.highlight": "Teknolojiler",

    // Experience
    "experience.label": "Kariyer Yolu",
    "experience.title": "İş",
    "experience.title.highlight": "Deneyimi",

    // Experience items
    "exp.otaghak.title": "Frontend Developer",
    "exp.otaghak.company": "Otaghak",
    "exp.otaghak.date": "Ekim 2025",
    "exp.otaghak.desc": "Otaghak, İran, Türkiye, Ermenistan ve Güney Afrika genelinde villalar, daireler ve konaklamalar için rezervasyon yapılabilen lider bir çevrimiçi platformdur. Frontend Developer olarak platformun kullanıcı arayüzünün geliştirilmesine ve iyileştirilmesine katkıda bulundum, sorunsuz rezervasyon deneyimleri oluşturmaya ve kullanıcı etkileşimini artırmaya odaklandım. Platform 38.000'den fazla konaklama birimini içermekte ve kullanıcılara kapsamlı arama ve filtreleme olanları sunmaktadır.",
    "exp.otaghak.extra": "Otaghak'ta bulunduğum süre boyunca rezervasyon akışını optimize etme, arama işlevselliğini geliştirme ve farklı cihaz türlerinde genel kullanıcı deneyimini iyileştirme üzerine çalıştım.",

    "exp.dinawin.title": "Frontend Developer",
    "exp.dinawin.company": "Dinawin",
    "exp.dinawin.date": "Ocak 2022 - Günümüz",
    "exp.dinawin.desc": "Dinawin, birden fazla uygulamaya sahip otomotiv yedek parça sektöründe lider bir şirkettir. Frontend Developer olarak birincil sorumluluğum miras uygulamayı baştan sona modernize etmek ve yeniden yapılandırmaktır. Bu, modern teknolojilerin uygulanmasını, uygulama performansının iyileştirilmesini ve tüm platformlarda sorunsuz bir kullanıcı deneyiminin sağlanmasını kapsar.",
    "exp.dinawin.highlight1": "Baaz.ir — Gelişmiş arama yetenekleri ve gerçek zamanlı envanter yönetimiyle ana otomotiv yedek parça platformu",
    "exp.dinawin.highlight2": "Karban.Baaz.ir — Kapsamlı iş akışı otomasyonu ile uzmanlaşmış Görev Yönetim Sistemi",
    "exp.dinawin.highlight3": "Shop.Baaz.ir — Entegre ödeme ağ geçitleri ve sipariş takibiyle e-ticaret platformu",
    "exp.dinawin.highlight4": "Akorayan.com — CRM özelliklerine sahip ek otomotiv hizmet platformu",

    "exp.ketabplus.title": "Frontend Developer",
    "exp.ketabplus.company": "KetabPlus",
    "exp.ketabplus.date": "Mart 2021 - Şubat 2022",
    "exp.ketabplus.desc": "KetabPlus, okuma kültürünü teşvik etmeye ve kitapları daha erişilebilir hale getirmeye adanmış kitap sektöründe yenilikçi bir girişimdir. Hem kamu web sitesinin hem de yönetici panelinin yeniden yapılandırılmasını, geliştirilmesini ve bakımını üstlendim.",

    "exp.sandbadcell.title": "Frontend Developer",
    "exp.sandbadcell.company": "SandBadCell",
    "exp.sandbadcell.date": "Ağustos 2019 - Şubat 2021",
    "exp.sandbadcell.desc": "SandBadCell, Ahoora Şirketi tarafından geliştirilen, işletme-to-işletme işlemlerinde uzmanlaşmış bir B2B platformudur. Hem herkese açık web sitesini hem de yönetici panelini geliştirdim ve sürdürdüm.",

    "exp.seoraz.title": "Frontend Developer",
    "exp.seoraz.company": "Seoraz | Simagar",
    "exp.seoraz.date": "Şubat 2017 - Ağustos 2019",
    "exp.seoraz.desc": "Seoraz, Web Tasarımı, Geliştirme, Kurumsal Kimlik, Mobil Uygulamaların yanı sıra SEO ve Sosyal Medya konusunda eksiksiz hizmet sağlayıcısıdır. Duyarlı ve görsel olarak çekici arayüzlere odaklanan çeşitli web projelerine katkıda bulundum.",

    "exp.webnegah.title": "Frontend Developer",
    "exp.webnegah.company": "WebNegah",
    "exp.webnegah.date": "Ocak 2015 - Ocak 2017",
    "exp.webnegah.desc": "WebNegah, 20 yılı aşkın deneyime sahip köklü bir yazılım şirketidir. Çeşitli teknolojiler kullanarak belirli müşteri gereksinimlerine yönelik web siteleri tasarladım ve geliştirdim.",

    // GitHub
    "github.label": "Open Source",
    "github.title": "GitHub",
    "github.title.highlight": "Aktivitesi",

    // Contact
    "contact.label": "İletişime Geç",
    "contact.title": "Birlikte Çalışalım",
    "contact.title.highlight": "Beraberce",
    "contact.info.title": "İletişim Bilgileri",
    "contact.location": "Tahran, İran",
    "contact.social.title": "Benimle Bağlanın",

    // Footer
    "footer.rights": "Tüm hakları saklıdır.",
    "footer.crafted": "Tutku ve hassasiyetle hazırlandı",

    // Language Switcher
    "lang.en": "English",
    "lang.fa": "فارسی",
    "lang.ar": "العربية",
    "lang.tr": "Türkçe",
  },
};

// Experience data translations
export const experienceTranslations: Record<Locale, Array<{
  titleKey: string;
  companyKey: string;
  dateKey: string;
  descKey: string;
  extraKey?: string;
  highlightsKeys?: string[];
  tech: string;
  website?: string;
  websiteLabel?: string;
}>> = {
  en: [
    {
      titleKey: "exp.otaghak.title",
      companyKey: "exp.otaghak.company",
      dateKey: "exp.otaghak.date",
      descKey: "exp.otaghak.desc",
      extraKey: "exp.otaghak.extra",
      tech: "React | Next.js | TypeScript | Modern Frontend Technologies",
      website: "https://www.otaghak.com/",
      websiteLabel: "www.otaghak.com",
    },
    {
      titleKey: "exp.dinawin.title",
      companyKey: "exp.dinawin.company",
      dateKey: "exp.dinawin.date",
      descKey: "exp.dinawin.desc",
      highlightsKeys: [
        "exp.dinawin.highlight1",
        "exp.dinawin.highlight2",
        "exp.dinawin.highlight3",
        "exp.dinawin.highlight4",
      ],
      tech: "React | Next.js | TypeScript | Sass | SignalR | Micro Frontend | Redux | MUI | Zustand | React Query",
    },
    {
      titleKey: "exp.ketabplus.title",
      companyKey: "exp.ketabplus.company",
      dateKey: "exp.ketabplus.date",
      descKey: "exp.ketabplus.desc",
      tech: "TypeScript | Next.js | React | Redux-Toolkit | ReactBootstrap | Tailwind | SASS",
    },
    {
      titleKey: "exp.sandbadcell.title",
      companyKey: "exp.sandbadcell.company",
      dateKey: "exp.sandbadcell.date",
      descKey: "exp.sandbadcell.desc",
      tech: "jQuery | React | Redux | ReactBootstrap | Bootstrap | WordPress | PHP",
    },
    {
      titleKey: "exp.seoraz.title",
      companyKey: "exp.seoraz.company",
      dateKey: "exp.seoraz.date",
      descKey: "exp.seoraz.desc",
      tech: "JavaScript | jQuery | React | Bootstrap | WordPress | SEO",
    },
    {
      titleKey: "exp.webnegah.title",
      companyKey: "exp.webnegah.company",
      dateKey: "exp.webnegah.date",
      descKey: "exp.webnegah.desc",
      tech: "WordPress | DNN | SEO | JavaScript | jQuery | Bootstrap | OpenCart | Photoshop",
    },
  ],
  fa: [
    {
      titleKey: "exp.otaghak.title",
      companyKey: "exp.otaghak.company",
      dateKey: "exp.otaghak.date",
      descKey: "exp.otaghak.desc",
      extraKey: "exp.otaghak.extra",
      tech: "React | Next.js | TypeScript | Modern Frontend Technologies",
      website: "https://www.otaghak.com/",
      websiteLabel: "www.otaghak.com",
    },
    {
      titleKey: "exp.dinawin.title",
      companyKey: "exp.dinawin.company",
      dateKey: "exp.dinawin.date",
      descKey: "exp.dinawin.desc",
      highlightsKeys: [
        "exp.dinawin.highlight1",
        "exp.dinawin.highlight2",
        "exp.dinawin.highlight3",
        "exp.dinawin.highlight4",
      ],
      tech: "React | Next.js | TypeScript | Sass | SignalR | Micro Frontend | Redux | MUI | Zustand | React Query",
    },
    {
      titleKey: "exp.ketabplus.title",
      companyKey: "exp.ketabplus.company",
      dateKey: "exp.ketabplus.date",
      descKey: "exp.ketabplus.desc",
      tech: "TypeScript | Next.js | React | Redux-Toolkit | ReactBootstrap | Tailwind | SASS",
    },
    {
      titleKey: "exp.sandbadcell.title",
      companyKey: "exp.sandbadcell.company",
      dateKey: "exp.sandbadcell.date",
      descKey: "exp.sandbadcell.desc",
      tech: "jQuery | React | Redux | ReactBootstrap | Bootstrap | WordPress | PHP",
    },
    {
      titleKey: "exp.seoraz.title",
      companyKey: "exp.seoraz.company",
      dateKey: "exp.seoraz.date",
      descKey: "exp.seoraz.desc",
      tech: "JavaScript | jQuery | React | Bootstrap | WordPress | SEO",
    },
    {
      titleKey: "exp.webnegah.title",
      companyKey: "exp.webnegah.company",
      dateKey: "exp.webnegah.date",
      descKey: "exp.webnegah.desc",
      tech: "WordPress | DNN | SEO | JavaScript | jQuery | Bootstrap | OpenCart | Photoshop",
    },
  ],
  ar: [
    {
      titleKey: "exp.otaghak.title",
      companyKey: "exp.otaghak.company",
      dateKey: "exp.otaghak.date",
      descKey: "exp.otaghak.desc",
      extraKey: "exp.otaghak.extra",
      tech: "React | Next.js | TypeScript | Modern Frontend Technologies",
      website: "https://www.otaghak.com/",
      websiteLabel: "www.otaghak.com",
    },
    {
      titleKey: "exp.dinawin.title",
      companyKey: "exp.dinawin.company",
      dateKey: "exp.dinawin.date",
      descKey: "exp.dinawin.desc",
      highlightsKeys: [
        "exp.dinawin.highlight1",
        "exp.dinawin.highlight2",
        "exp.dinawin.highlight3",
        "exp.dinawin.highlight4",
      ],
      tech: "React | Next.js | TypeScript | Sass | SignalR | Micro Frontend | Redux | MUI | Zustand | React Query",
    },
    {
      titleKey: "exp.ketabplus.title",
      companyKey: "exp.ketabplus.company",
      dateKey: "exp.ketabplus.date",
      descKey: "exp.ketabplus.desc",
      tech: "TypeScript | Next.js | React | Redux-Toolkit | ReactBootstrap | Tailwind | SASS",
    },
    {
      titleKey: "exp.sandbadcell.title",
      companyKey: "exp.sandbadcell.company",
      dateKey: "exp.sandbadcell.date",
      descKey: "exp.sandbadcell.desc",
      tech: "jQuery | React | Redux | ReactBootstrap | Bootstrap | WordPress | PHP",
    },
    {
      titleKey: "exp.seoraz.title",
      companyKey: "exp.seoraz.company",
      dateKey: "exp.seoraz.date",
      descKey: "exp.seoraz.desc",
      tech: "JavaScript | jQuery | React | Bootstrap | WordPress | SEO",
    },
    {
      titleKey: "exp.webnegah.title",
      companyKey: "exp.webnegah.company",
      dateKey: "exp.webnegah.date",
      descKey: "exp.webnegah.desc",
      tech: "WordPress | DNN | SEO | JavaScript | jQuery | Bootstrap | OpenCart | Photoshop",
    },
  ],
  tr: [
    {
      titleKey: "exp.otaghak.title",
      companyKey: "exp.otaghak.company",
      dateKey: "exp.otaghak.date",
      descKey: "exp.otaghak.desc",
      extraKey: "exp.otaghak.extra",
      tech: "React | Next.js | TypeScript | Modern Frontend Technologies",
      website: "https://www.otaghak.com/",
      websiteLabel: "www.otaghak.com",
    },
    {
      titleKey: "exp.dinawin.title",
      companyKey: "exp.dinawin.company",
      dateKey: "exp.dinawin.date",
      descKey: "exp.dinawin.desc",
      highlightsKeys: [
        "exp.dinawin.highlight1",
        "exp.dinawin.highlight2",
        "exp.dinawin.highlight3",
        "exp.dinawin.highlight4",
      ],
      tech: "React | Next.js | TypeScript | Sass | SignalR | Micro Frontend | Redux | MUI | Zustand | React Query",
    },
    {
      titleKey: "exp.ketabplus.title",
      companyKey: "exp.ketabplus.company",
      dateKey: "exp.ketabplus.date",
      descKey: "exp.ketabplus.desc",
      tech: "TypeScript | Next.js | React | Redux-Toolkit | ReactBootstrap | Tailwind | SASS",
    },
    {
      titleKey: "exp.sandbadcell.title",
      companyKey: "exp.sandbadcell.company",
      dateKey: "exp.sandbadcell.date",
      descKey: "exp.sandbadcell.desc",
      tech: "jQuery | React | Redux | ReactBootstrap | Bootstrap | WordPress | PHP",
    },
    {
      titleKey: "exp.seoraz.title",
      companyKey: "exp.seoraz.company",
      dateKey: "exp.seoraz.date",
      descKey: "exp.seoraz.desc",
      tech: "JavaScript | jQuery | React | Bootstrap | WordPress | SEO",
    },
    {
      titleKey: "exp.webnegah.title",
      companyKey: "exp.webnegah.company",
      dateKey: "exp.webnegah.date",
      descKey: "exp.webnegah.desc",
      tech: "WordPress | DNN | SEO | JavaScript | jQuery | Bootstrap | OpenCart | Photoshop",
    },
  ],
};

// Helper function to get nested translations
function getTranslation(obj: Record<string, string>, path: string): string {
  return obj[path] || path;
}

// Create context
const I18nContext = createContext<I18nContextType>({
  locale: "en",
  setLocale: () => {},
  t: (key: string) => key,
  dir: "ltr",
  isTransitioning: false,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("locale") as Locale | null;
    if (stored && translations[stored]) {
      setLocaleState(stored);
      document.documentElement.setAttribute("lang", stored);
      document.documentElement.setAttribute("dir", stored === "ar" || stored === "fa" ? "rtl" : "ltr");
    }
  }, []);

  const [isTransitioning, setIsTransitioning] = useState(false);

  const setLocale = (newLocale: Locale) => {
    if (newLocale === locale || isTransitioning) return;
    setIsTransitioning(true);
    // Start fade-out, then swap locale and fade-in
    setTimeout(() => {
      setLocaleState(newLocale);
      localStorage.setItem("locale", newLocale);
      document.documentElement.setAttribute("lang", newLocale);
      document.documentElement.setAttribute("dir", newLocale === "ar" || newLocale === "fa" ? "rtl" : "ltr");
      // Small delay so the new text renders before fading in
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(false);
        });
      });
    }, 300);
  };

  const t = (key: string): string => {
    return getTranslation(translations[locale], key);
  };

  const dir: "ltr" | "rtl" = locale === "ar" || locale === "fa" ? "rtl" : "ltr";

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, dir, isTransitioning }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

export function useLocale() {
  const { locale } = useContext(I18nContext);
  return locale;
}
