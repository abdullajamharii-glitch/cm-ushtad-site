/**
 * CM Usthad Archive — Shared Content Data Store
 * Admin dashboard writes updates to localStorage under the key "cmusthad_content".
 * Public site reads from localStorage first, falls back to these defaults.
 */

const DEFAULT_CONTENT = {
  settings: {
    siteTitle: "CM Usthad Archive",
    heroCopy: "A dedicated archive for Chembirika Qazi, preserving his life, writings, institutional vision, public service, and continuing search for documented truth.",
    bioText1: "CM Abdulla Moulavi, widely remembered as CM Usthad and Chembirika Qazi, was a Kerala Muslim scholar known for his command of Islamic jurisprudence, astronomy, mathematics, languages, and community leadership.",
    bioText2: "His public life connected traditional scholarship with careful scientific inquiry. He wrote and taught on prayer time calculation, qibla direction, moon sighting, literature, and religious education, while also helping build institutions that carried his educational vision forward."
  },
  articles: [
    {
      id: "art-1",
      title: "The scholar who measured direction",
      category: "Research",
      image: "https://www.micedu.in/masjid.png",
      imageAlt: "MIC campus masjid",
      summary: "A feature on astronomy, prayer timing, qibla science, and the discipline of observation.",
      date: "",
      published: true
    },
    {
      id: "art-2",
      title: "The MIC vision",
      category: "Education",
      image: "https://www.micedu.in/college.png",
      imageAlt: "College campus connected with MIC",
      summary: "How religious and modern education can live inside one serious institutional culture.",
      date: "",
      published: true
    },
    {
      id: "art-3",
      title: "How to preserve a scholar's papers",
      category: "Archive",
      image: "https://www.micedu.in/orphanage.png",
      imageAlt: "MIC institution building",
      summary: "Guidelines for scanning letters, book drafts, photos, case records, and oral history.",
      date: "",
      published: true
    }
  ],
  images: [
    {
      id: "img-1",
      caption: "CM Abdulla Moulavi portrait, sourced from MIC public website.",
      src: "https://www.micedu.in/cmusthad.png",
      alt: "CM Abdulla Moulavi portrait",
      label: "Portrait archive",
      layout: "tall"
    },
    {
      id: "img-2",
      caption: "Malabar Islamic Complex campus image for institutional history.",
      src: "https://www.micedu.in/college.png",
      alt: "MIC college building",
      label: "Institution",
      layout: "normal"
    },
    {
      id: "img-3",
      caption: "MIC masjid image for campus and community context.",
      src: "https://www.micedu.in/masjid.png",
      alt: "MIC masjid",
      label: "Campus",
      layout: "normal"
    },
    {
      id: "img-4",
      caption: "Darul Irshad Academy image, useful for education legacy albums.",
      src: "https://www.micedu.in/daulirshad.jpg",
      alt: "Darul Irshad Academy building",
      label: "Education legacy",
      layout: "wide"
    }
  ],
  books: [
    {
      id: "book-1",
      title: "Magnetic Compass and Its Declination from Standard Directions",
      label: "English",
      category: "astronomy",
      description: "A practical work on compass variation, true direction, and qibla calculation.",
      linkText: "Add scan or PDF",
      linkHref: "#contribute"
    },
    {
      id: "book-2",
      title: "Risala fi istikhraju auqati ssalati wa sumutul qibla",
      label: "Arabic",
      category: "astronomy",
      description: "A treatise connected to prayer timings and qibla direction through calculation.",
      linkText: "Verify edition",
      linkHref: "#contribute"
    },
    {
      id: "book-3",
      title: "Ilmul falak ala dhau'i ilmil hadees",
      label: "Arabic",
      category: "astronomy",
      description: "An introductory astronomy work connecting classical learning and modern science.",
      linkText: "Add bibliography",
      linkHref: "#contribute"
    },
    {
      id: "book-4",
      title: "Fiqh Articles and Community Notes",
      label: "Archive",
      category: "fiqh",
      description: "A future collection for legal notes, qazi records, and verified scholarly responses.",
      linkText: "Submit document",
      linkHref: "#contribute"
    },
    {
      id: "book-5",
      title: "Arabic and Urdu Translation Notes",
      label: "Translation",
      category: "translation",
      description: "Space for preserving translations, poem drafts, and multilingual manuscript records.",
      linkText: "Add manuscript",
      linkHref: "#contribute"
    },
    {
      id: "book-6",
      title: "Tazweedul Fikri Wal Himam",
      label: "Mathematics",
      category: "astronomy",
      description: "A mathematics-focused text introducing ratios and logarithms for students.",
      linkText: "Confirm title",
      linkHref: "#contribute"
    }
  ],
  news: [
    {
      id: "news-1",
      date: "Aug 29, 2025",
      headline: "New inquiry reported in CM Abdulla Moulavi case",
      summary: "KasargodVartha reported a fresh inquiry connected to the death case, supervised by Kannur Range DIG."
    },
    {
      id: "news-2",
      date: "Annual",
      headline: "CM Usthad commemoration events",
      summary: "Programs, seminar photos, speeches, and recordings can be published here after verification."
    },
    {
      id: "news-3",
      date: "Archive call",
      headline: "Collecting books, photos, and letters",
      summary: "A public call can invite students and families to submit scans, memories, and corrections."
    }
  ],
  testimonials: [
    {
      id: "test-1",
      quote: "His classroom joined religious seriousness with curiosity about the created world.",
      attribution: "Student memory, pending full attribution"
    },
    {
      id: "test-2",
      quote: "CM Usthad showed that scholarship could guide institutions, families, and public life.",
      attribution: "Institutional note, pending verification"
    },
    {
      id: "test-3",
      quote: "He made difficult subjects approachable without reducing their dignity.",
      attribution: "Archive interview excerpt, pending source"
    }
  ],
  caseDiary: [
    {
      id: "case-1",
      date: "15 Feb 2010",
      headline: "Passing of CM Usthad",
      summary: "Public reports recorded his death in Kasaragod and the start of sustained community concern."
    },
    {
      id: "case-2",
      date: "2010 onwards",
      headline: "Investigation record",
      summary: "CBI investigation and public appeals should be indexed with official copies and news sources."
    },
    {
      id: "case-3",
      date: "29 Aug 2025",
      headline: "Fresh inquiry reported",
      summary: "Kasargodvartha reported that a new inquiry was assigned under the supervision of the Kannur Range DIG."
    }
  ]
};

/**
 * Load content: localStorage overrides defaults
 */
function loadContent() {
  try {
    const stored = localStorage.getItem("cmusthad_content");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn("Could not parse stored content:", e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_CONTENT));
}

/**
 * Save content to localStorage
 */
function saveContent(data) {
  localStorage.setItem("cmusthad_content", JSON.stringify(data));
}

/**
 * Reset to defaults
 */
function resetContent() {
  localStorage.removeItem("cmusthad_content");
  return JSON.parse(JSON.stringify(DEFAULT_CONTENT));
}

// Make available globally
window.CMArchive = { DEFAULT_CONTENT, loadContent, saveContent, resetContent };
