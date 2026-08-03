/**
 * CM Usthad Archive — Legacy Wall (Community Archive) Engine
 * Manages post rendering, creation, filtering, scholarly actions,
 * document viewer modal, and localStorage persistence.
 */

(function () {
  "use strict";

  const STORAGE_KEY = "cmusthad_wall_posts";
  const SAVED_POSTS_KEY = "cmusthad_saved_posts";
  const LIKED_POSTS_KEY = "cmusthad_liked_posts";

  // ══════════════════════════════════════
  // DEFAULT ARCHIVAL SAMPLE POSTS
  // ══════════════════════════════════════
  const DEFAULT_WALL_POSTS = [
    {
      id: "post-101",
      author: {
        name: "Archive Editorial Desk",
        handle: "@cm_archive",
        role: "Official Archive",
        verifiedBadge: "Official Archive",
        avatar: "data/cm_usthad_hd.png",
        bio: "Official digital repository for CM Usthad (C. M. Abdulla Moulavi)."
      },
      category: "Historical Document",
      title: "Qibla Azimuth & Magnetic Compass Declination Table (1991)",
      content: "Preserved original handwritten table by CM Usthad detailing magnetic declination angles and exact Qibla azimuth calculation for Kasaragod and Mangalore mahals.\n\nThis manuscript served as a primary reference for mosque builders and astronomers across Kerala and South Karnataka.",
      attachments: [
        {
          type: "doc",
          title: "Qibla_Azimuth_Calculations_1991.pdf",
          url: "data/vellore_scholarly.png",
          fileSize: "3.2 MB",
          docCategory: "Scientific Manuscript"
        }
      ],
      hashtags: ["#IlmulFalak", "#Manuscript", "#QiblaScience", "#MIC"],
      location: "Chattanchal, Kasaragod",
      eventDate: "12 May 1991",
      era: "1980–1995",
      status: "approved",
      isPinned: true,
      isFeatured: true,
      isOfficial: true,
      appreciations: 64,
      shares: 28,
      bookmarks: 45,
      comments: [
        {
          id: "c-1",
          author: "Prof. Abdurrahman Baqawi",
          avatar: "data/vellore_scholarly.png",
          text: "This calculation table was used during the construction of Chattanchal campus masjid. Extremely accurate."
        }
      ],
      createdAt: "2026-08-01T09:30:00Z"
    },
    {
      id: "post-102",
      author: {
        name: "Prof. Abdurrahman Baqawi",
        handle: "@abdurrahman_b",
        role: "Student",
        verifiedBadge: "Student",
        avatar: "data/vellore_scholarly.png",
        bio: "Former student at Baqiyat al-Swalihat (1978-1982), researching CM Usthad's astronomical treatises."
      },
      category: "Memory",
      title: "Memories from Baqiyat al-Swalihat (Vellore 1963)",
      content: "Remembering CM Usthad's graduation as Maulvi Fadhil Baqawi in Vellore. He excelled in mathematics and Hadith literature. His notebook on logarithmic prayer timing formulation was shared among senior teachers.",
      attachments: [
        {
          type: "image",
          url: "data/vellore_scholarly.png",
          caption: "Baqiyat al-Swalihat study library and rare manuscripts"
        }
      ],
      hashtags: ["#StudentMemories", "#Baqiyat", "#Vellore", "#Astronomy"],
      location: "Vellore, Tamil Nadu",
      eventDate: "March 1963",
      era: "1960–1980",
      status: "approved",
      isPinned: false,
      isFeatured: true,
      isOfficial: false,
      appreciations: 38,
      shares: 12,
      bookmarks: 19,
      comments: [],
      createdAt: "2026-08-02T14:15:00Z"
    },
    {
      id: "post-103",
      author: {
        name: "Dr. Ibrahim Chembirika",
        handle: "@ibrahim_research",
        role: "Researcher",
        verifiedBadge: "Researcher",
        avatar: "data/qazi_mahal.png",
        bio: "Archival researcher specializing in 20th century Kasaragod judicial and educational leadership."
      },
      category: "Historical Document",
      title: "Malabar Islamic Complex (MIC) Foundation Minutes (1993)",
      content: "Archival record of the foundation stone laying ceremony for MIC in Chattanchal on May 1993. CM Usthad laid down a vision integrating Islamic jurisprudence with modern scientific education.",
      attachments: [
        {
          type: "image",
          url: "https://www.micedu.in/college.png",
          caption: "MIC College campus building in Chattanchal"
        },
        {
          type: "doc",
          title: "MIC_Foundation_Minutes_1993.pdf",
          url: "https://www.micedu.in/college.png",
          fileSize: "1.8 MB",
          docCategory: "Institutional Charter"
        }
      ],
      hashtags: ["#MICChattanchal", "#Foundation1993", "#EducationalReform"],
      location: "Chattanchal, Kasaragod",
      eventDate: "18 May 1993",
      era: "1980–1995",
      status: "approved",
      isPinned: false,
      isFeatured: false,
      isOfficial: false,
      appreciations: 52,
      shares: 19,
      bookmarks: 31,
      comments: [],
      createdAt: "2026-08-02T18:40:00Z"
    },
    {
      id: "post-104",
      author: {
        name: "C.M. Mohammad Shareef",
        handle: "@shareef_family",
        role: "Family",
        verifiedBadge: "Family",
        avatar: "data/chembirika_coastal.png",
        bio: "Family member and caretaker of ancestral manuscripts in Chembirika."
      },
      category: "Photograph",
      title: "Chembirika Ancestral House & Study Desk",
      content: "A quiet corner in Chembirika where CM Usthad wrote 'Ilmul Falak Ala Dhau'i Ilmil Hadees'. The desk remains preserved with his original compass, books, and astronomical tables.",
      attachments: [
        {
          type: "image",
          url: "data/chembirika_coastal.png",
          caption: "Chembirika coastal landscape and ancestral mahal area"
        }
      ],
      hashtags: ["#FamilyArchive", "#Chembirika", "#IlmulFalak"],
      location: "Chembirika, Kasaragod",
      eventDate: "1975",
      era: "1960–1980",
      status: "approved",
      isPinned: false,
      isFeatured: false,
      isOfficial: false,
      appreciations: 45,
      shares: 15,
      bookmarks: 22,
      comments: [],
      createdAt: "2026-08-03T07:10:00Z"
    },
    {
      id: "post-105",
      author: {
        name: "Archive Editorial Desk",
        handle: "@cm_archive",
        role: "Official Archive",
        verifiedBadge: "Official Archive",
        avatar: "data/cm_usthad_hd.png",
        bio: "Official digital repository for CM Usthad."
      },
      category: "Official Update",
      title: "Fresh Inquiry Status under Kannur Range DIG (KasargodVartha)",
      content: "Press report summary: State authorities assigned a renewed inquiry supervised by Kannur Range DIG to review unexamined evidence in Chembirika Qazi's case.\n\nThe action committee continues to demand complete transparency and High Court monitored investigation.",
      attachments: [
        {
          type: "image",
          url: "https://www.micedu.in/masjid.png",
          caption: "MIC Masjid Chattanchal"
        }
      ],
      hashtags: ["#CaseJustice", "#CBI", "#DIGInquiry", "#KasargodVartha"],
      location: "Kasaragod / Kannur",
      eventDate: "29 Aug 2025",
      era: "Case Diary",
      status: "approved",
      isPinned: false,
      isFeatured: true,
      isOfficial: true,
      appreciations: 78,
      shares: 34,
      bookmarks: 56,
      comments: [],
      createdAt: "2026-08-03T08:50:00Z"
    }
  ];

  // ══════════════════════════════════════
  // STATE MANAGEMENT
  // ══════════════════════════════════════
  let wallPosts = [];
  let likedPostIds = new Set();
  let savedPostIds = new Set();

  let activeTab = "all";           // all, featured, official, media, research
  let activeSidebarNav = "all";    // all, photos, documents, videos, saved, myposts
  let activeBadgeFilter = "all";   // all, Official Archive, Researcher, Family, Student
  let activeEraFilter = "all";     // all, 1940–1960, 1960–1980, 1980–1995, Case Diary, Legacy
  let activeSearchQuery = "";

  function loadState() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        wallPosts = JSON.parse(stored);
      } else {
        wallPosts = [...DEFAULT_WALL_POSTS];
        savePosts();
      }

      const likedStored = localStorage.getItem(LIKED_POSTS_KEY);
      if (likedStored) likedPostIds = new Set(JSON.parse(likedStored));

      const savedStored = localStorage.getItem(SAVED_POSTS_KEY);
      if (savedStored) savedPostIds = new Set(JSON.parse(savedStored));

    } catch (err) {
      console.warn("Failed loading wall state from localStorage", err);
      wallPosts = [...DEFAULT_WALL_POSTS];
    }
  }

  function savePosts() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wallPosts));
    } catch (err) {
      console.warn("Failed saving wall posts", err);
    }
  }

  function saveLikes() {
    try {
      localStorage.setItem(LIKED_POSTS_KEY, JSON.stringify([...likedPostIds]));
    } catch (err) {}
  }

  function saveBookmarks() {
    try {
      localStorage.setItem(SAVED_POSTS_KEY, JSON.stringify([...savedPostIds]));
    } catch (err) {}
  }

  // ══════════════════════════════════════
  // UI INITIALIZATION & EVENT LISTENERS
  // ══════════════════════════════════════
  document.addEventListener("DOMContentLoaded", () => {
    loadState();
    initComposerForm();
    initTabButtons();
    initSidebarNav();
    initBadgeFilters();
    initEraFilters();
    initSearch();
    initTagPills();
    initModals();
    initBottomNav();
    renderFeed();
  });

  // ── Post Composer Submit Handler ──
  function initComposerForm() {
    const form = document.getElementById("wallPostForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const category = document.getElementById("postCategorySelect").value;
      const role = document.getElementById("postRoleSelect").value;
      const content = document.getElementById("postContentInput").value.trim();
      const title = document.getElementById("postTitleInput").value.trim();
      const location = document.getElementById("postLocationInput").value.trim();
      const dateStr = document.getElementById("postDateInput").value.trim();
      const era = document.getElementById("postEraSelect").value;
      const mediaUrl = document.getElementById("postMediaUrlInput").value.trim();
      const hashtagsRaw = document.getElementById("postHashtagsInput").value.trim();

      if (!content) return;

      const hashtags = hashtagsRaw
        ? hashtagsRaw.split(/\s+/).map(t => t.startsWith("#") ? t : "#" + t)
        : ["#CMUsthad"];

      const attachments = [];
      if (mediaUrl) {
        const isPdf = mediaUrl.toLowerCase().includes(".pdf");
        if (isPdf) {
          attachments.push({
            type: "doc",
            title: title || "Submitted_Document.pdf",
            url: mediaUrl,
            fileSize: "Document Link",
            docCategory: category
          });
        } else {
          attachments.push({
            type: "image",
            url: mediaUrl,
            caption: title || content.slice(0, 40)
          });
        }
      }

      const newPost = {
        id: "post-" + Date.now(),
        author: {
          name: role === "Official Archive" ? "Archive Editorial Desk" : "Community Contributor",
          handle: role === "Official Archive" ? "@cm_archive" : "@contributor_" + Math.floor(Math.random()*1000),
          role: role,
          verifiedBadge: role,
          avatar: role === "Official Archive" ? "data/cm_usthad_hd.png" : "data/vellore_scholarly.png",
          bio: "Registered contributor on CM Usthad Archive."
        },
        category: category,
        title: title,
        content: content,
        attachments: attachments,
        hashtags: hashtags,
        location: location || "Kasaragod",
        eventDate: dateStr || "Recent",
        era: era || "Legacy",
        status: "approved",
        isPinned: false,
        isFeatured: role === "Official Archive",
        isOfficial: role === "Official Archive",
        appreciations: 1,
        shares: 0,
        bookmarks: 0,
        comments: [],
        createdAt: new Date().toISOString()
      };

      wallPosts.unshift(newPost);
      savePosts();

      // Reset form
      form.reset();
      renderFeed();

      // Scroll to feed top smoothly
      const feedEl = document.getElementById("wallPostsFeed");
      if (feedEl) feedEl.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // ── Tab Filters ──
  function initTabButtons() {
    const btns = document.querySelectorAll(".wall-tab-btn");
    btns.forEach(btn => {
      btn.addEventListener("click", () => {
        btns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeTab = btn.dataset.tab;
        renderFeed();
      });
    });
  }

  // ── Sidebar Nav ──
  function initSidebarNav() {
    const items = document.querySelectorAll(".wall-nav-item");
    items.forEach(item => {
      item.addEventListener("click", () => {
        items.forEach(i => i.classList.remove("active"));
        item.classList.add("active");
        activeSidebarNav = item.dataset.snav;
        renderFeed();
      });
    });
  }

  // ── Badge Filters ──
  function initBadgeFilters() {
    const btns = document.querySelectorAll(".badge-chip-btn");
    btns.forEach(btn => {
      btn.addEventListener("click", () => {
        btns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeBadgeFilter = btn.dataset.badgetype;
        renderFeed();
      });
    });
  }

  // ── Era Filters ──
  function initEraFilters() {
    const btns = document.querySelectorAll(".era-chip-btn");
    btns.forEach(btn => {
      btn.addEventListener("click", () => {
        btns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeEraFilter = btn.dataset.era;
        renderFeed();
      });
    });
  }

  // ── Search Bar ──
  function initSearch() {
    const input = document.getElementById("wallSearchInput");
    const clearBtn = document.getElementById("clearWallSearch");

    if (input) {
      input.addEventListener("input", (e) => {
        activeSearchQuery = e.target.value.trim().toLowerCase();
        if (clearBtn) clearBtn.style.display = activeSearchQuery ? "block" : "none";
        renderFeed();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        if (input) input.value = "";
        activeSearchQuery = "";
        clearBtn.style.display = "none";
        renderFeed();
      });
    }
  }

  // ── Tag Pills Quick Bar ──
  function initTagPills() {
    const pills = document.querySelectorAll(".tag-pill-btn");
    pills.forEach(pill => {
      pill.addEventListener("click", () => {
        const tag = pill.dataset.htag;
        const input = document.getElementById("wallSearchInput");
        if (input) {
          input.value = tag;
          activeSearchQuery = tag.toLowerCase();
          renderFeed();
        }
      });
    });
  }

  // ── Modals ──
  function initModals() {
    const docModal = document.getElementById("docViewerModal");
    const closeDoc = document.getElementById("closeDocModal");
    if (closeDoc && docModal) {
      closeDoc.addEventListener("click", () => docModal.close());
      docModal.addEventListener("click", (e) => { if (e.target === docModal) docModal.close(); });
    }

  // ── Bottom Navigation (<768px) ──
  function initBottomNav() {
    const bnavBtns = document.querySelectorAll(".bnav-btn");
    if (!bnavBtns.length) return;

    bnavBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const action = btn.dataset.bnav;

        // Update active bottom nav state
        bnavBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        if (action === "home") {
          activeFeedTab = "latest";
          activeCategory = "all";
          activeSearchQuery = "";
          const input = document.getElementById("wallSearchInput");
          if (input) input.value = "";
          
          document.querySelectorAll(".wall-feed-tab").forEach(tab => {
            tab.classList.toggle("active", tab.dataset.wtab === "latest");
          });

          renderFeed();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        else if (action === "search") {
          const searchInput = document.getElementById("wallSearchInput");
          if (searchInput) {
            searchInput.focus();
            searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }
        else if (action === "media") {
          activeFeedTab = "media";
          activeCategory = "all";
          
          document.querySelectorAll(".wall-feed-tab").forEach(tab => {
            tab.classList.toggle("active", tab.dataset.wtab === "media");
          });

          renderFeed();
          const feedContainer = document.getElementById("wallPostsFeed");
          if (feedContainer) feedContainer.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        else if (action === "docs") {
          activeCategory = "Historical Document";
          activeFeedTab = "all";

          renderFeed();
          const feedContainer = document.getElementById("wallPostsFeed");
          if (feedContainer) feedContainer.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        else if (action === "myposts") {
          activeFeedTab = "my";
          activeCategory = "all";

          renderFeed();
          const feedContainer = document.getElementById("wallPostsFeed");
          if (feedContainer) feedContainer.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  // ══════════════════════════════════════
  // RENDER FEED LOGIC
  // ══════════════════════════════════════
  function renderFeed() {
    const container = document.getElementById("wallPostsFeed");
    if (!container) return;

    let filtered = [...wallPosts];

    // 1. Tab Filter
    if (activeTab === "featured") {
      filtered = filtered.filter(p => p.isFeatured);
    } else if (activeTab === "official") {
      filtered = filtered.filter(p => p.isOfficial || p.author.role === "Official Archive");
    } else if (activeTab === "media") {
      filtered = filtered.filter(p => p.attachments && p.attachments.some(a => a.type === "image" || a.type === "video"));
    } else if (activeTab === "research") {
      filtered = filtered.filter(p => p.category === "Historical Document" || p.category === "Article" || p.category === "Correction");
    }

    // 2. Left Sidebar Nav Filter
    if (activeSidebarNav === "photos") {
      filtered = filtered.filter(p => p.attachments && p.attachments.some(a => a.type === "image"));
    } else if (activeSidebarNav === "documents") {
      filtered = filtered.filter(p => p.attachments && p.attachments.some(a => a.type === "doc"));
    } else if (activeSidebarNav === "videos") {
      filtered = filtered.filter(p => p.attachments && p.attachments.some(a => a.type === "video" || a.type === "audio"));
    } else if (activeSidebarNav === "saved") {
      filtered = filtered.filter(p => savedPostIds.has(p.id));
    } else if (activeSidebarNav === "myposts") {
      filtered = filtered.filter(p => p.author.handle === "@cm_archive" || p.author.handle.startsWith("@contributor_"));
    }

    // 3. Contributor Badge Filter
    if (activeBadgeFilter !== "all") {
      filtered = filtered.filter(p => p.author.verifiedBadge === activeBadgeFilter);
    }

    // 4. Era Filter
    if (activeEraFilter !== "all") {
      filtered = filtered.filter(p => p.era === activeEraFilter);
    }

    // 5. Search Query
    if (activeSearchQuery) {
      filtered = filtered.filter(p => {
        const text = (p.title + " " + p.content + " " + p.author.name + " " + (p.hashtags || []).join(" ") + " " + (p.location || "")).toLowerCase();
        return text.includes(activeSearchQuery);
      });
    }

    if (!filtered.length) {
      container.innerHTML = `
        <div class="wall-empty-state" style="background:#ffffff;padding:40px;border-radius:18px;border:1px solid #dde8e6;text-align:center;">
          <div style="font-size:2rem;margin-bottom:10px;">📜</div>
          <h3 style="font-family:'Poppins',sans-serif;font-size:1.1rem;color:#0d1f1e;margin:0 0 6px;">No contributions match your filter</h3>
          <p style="font-family:'Mulish',sans-serif;color:#64837f;font-size:0.88rem;margin:0;">Try switching tabs, clearing search keywords, or selecting a different historical era.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(post => renderPostCard(post)).join("");

    // Attach Action Handlers (Appreciate, Comment, Save, Share, Doc Modal, Profile Modal)
    attachPostCardListeners();
  }

  // ── Render Post Card HTML ──
  function renderPostCard(p) {
    const isAppreciated = likedPostIds.has(p.id);
    const isSaved = savedPostIds.has(p.id);

    // Color Badge Class
    let badgeClass = "contributor";
    const b = p.author.verifiedBadge || p.author.role;
    if (b === "Official Archive") badgeClass = "official";
    else if (b === "Researcher") badgeClass = "researcher";
    else if (b === "Family") badgeClass = "family";
    else if (b === "Student") badgeClass = "student";

    const badgeIcon = b === "Official Archive" ? "🟢" : b === "Researcher" ? "🔵" : b === "Family" ? "🟣" : b === "Student" ? "🟠" : "⚪";

    // Pinned Banner
    const pinnedHtml = p.isPinned ? `
      <div class="pinned-banner">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/></svg>
        <span>Pinned Official Archival Post</span>
      </div>
    ` : "";

    // Attachments HTML
    let attachmentsHtml = "";
    if (p.attachments && p.attachments.length) {
      p.attachments.forEach(att => {
        if (att.type === "image") {
          attachmentsHtml += `
            <div class="post-media-gallery">
              <img src="${escHtml(att.url)}" alt="${escHtml(att.caption || '')}" class="post-media-img" data-imgsrc="${escHtml(att.url)}" data-caption="${escHtml(att.caption || '')}">
            </div>
          `;
        } else if (att.type === "doc") {
          attachmentsHtml += `
            <div class="post-doc-card" data-docurl="${escHtml(att.url)}" data-doctitle="${escHtml(att.title)}" data-doccat="${escHtml(att.docCategory || p.category)}">
              <div class="doc-info">
                <span class="doc-icon-large">📄</span>
                <div class="doc-text">
                  <h5>${escHtml(att.title || 'Archival Document')}</h5>
                  <span>${escHtml(att.fileSize || 'PDF Scan')} • Click to Open Museum Viewer</span>
                </div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </div>
          `;
        }
      });
    }

    // Hashtags HTML
    const hashtagsHtml = (p.hashtags || []).map(tag => `<span class="tag-pill-btn htag-trigger" data-htag="${escHtml(tag)}">${escHtml(tag)}</span>`).join(" ");

    // Comments HTML
    const commentsListHtml = (p.comments || []).map(c => `
      <div class="comment-item">
        <img src="${escHtml(c.avatar || 'data/cm_usthad_hd.png')}" alt="Avatar" class="comment-avatar">
        <div class="comment-body">
          <strong>${escHtml(c.author)}</strong>
          <p>${escHtml(c.text)}</p>
        </div>
      </div>
    `).join("");

    return `
      <article class="wall-post-card ${p.isPinned ? 'pinned-post' : ''}" id="${p.id}">
        ${pinnedHtml}

        <div class="post-card-header">
          <div class="post-author-box">
            <img src="${escHtml(p.author.avatar)}" alt="${escHtml(p.author.name)}" class="post-author-avatar" data-authorname="${escHtml(p.author.name)}" data-handle="${escHtml(p.author.handle)}" data-role="${escHtml(p.author.role)}" data-bio="${escHtml(p.author.bio || '')}">
            <div class="post-author-details">
              <div class="post-author-title-row">
                <strong class="post-author-name" data-authorname="${escHtml(p.author.name)}">${escHtml(p.author.name)}</strong>
                <span class="badge-tag ${badgeClass}">${badgeIcon} ${escHtml(p.author.verifiedBadge)}</span>
              </div>
              <span class="post-timestamp">${escHtml(p.author.handle)} • ${formatDate(p.createdAt)}</span>
            </div>
          </div>

          <div class="post-tags-row">
            <span class="post-category-chip">${escHtml(p.category)}</span>
            <span class="moderation-badge approved">✓ Verified</span>
          </div>
        </div>

        ${p.title ? `<h4 class="post-title">${escHtml(p.title)}</h4>` : ''}

        <!-- Archival Metadata Box -->
        <div class="post-archive-metadata-box">
          ${p.location ? `<span>📍 <strong>Location:</strong> ${escHtml(p.location)}</span>` : ''}
          ${p.eventDate ? `<span>📅 <strong>Historical Date:</strong> ${escHtml(p.eventDate)}</span>` : ''}
          ${p.era ? `<span>⏳ <strong>Era:</strong> ${escHtml(p.era)}</span>` : ''}
        </div>

        <p class="post-text">${escHtml(p.content)}</p>

        ${attachmentsHtml}

        ${hashtagsHtml ? `<div style="margin-bottom:14px;">${hashtagsHtml}</div>` : ''}

        <!-- Action Bar -->
        <div class="post-action-bar">
          <button type="button" class="post-action-btn appreciate-btn ${isAppreciated ? 'appreciated' : ''}" data-postid="${p.id}">
            <span>${isAppreciated ? '❤️ Appreciated' : '🤍 Appreciate'}</span>
            <strong>(${p.appreciations || 0})</strong>
          </button>

          <button type="button" class="post-action-btn toggle-comments-btn" data-postid="${p.id}">
            <span>💬 Comment</span>
            <strong>(${(p.comments || []).length})</strong>
          </button>

          <button type="button" class="post-action-btn share-btn" data-postid="${p.id}" data-title="${escHtml(p.title || p.content.slice(0, 30))}">
            <span>🔗 Share &amp; Cite</span>
          </button>

          <button type="button" class="post-action-btn save-btn ${isSaved ? 'saved' : ''}" data-postid="${p.id}">
            <span>${isSaved ? '📑 Saved' : '📑 Save'}</span>
          </button>

          <button type="button" class="post-action-btn report-btn" data-postid="${p.id}">
            <span>🚩 Report</span>
          </button>
        </div>

        <!-- Threaded Comments Section -->
        <div class="post-comments-container" id="comments-${p.id}" style="display:none;">
          <div class="comments-list">
            ${commentsListHtml}
          </div>
          <form class="comment-form-row" data-postid="${p.id}">
            <input type="text" placeholder="Add a scholarly comment or memory reply..." required>
            <button type="submit">Post Comment</button>
          </form>
        </div>

      </article>
    `;
  }

  // ══════════════════════════════════════
  // POST INTERACTION LISTENERS
  // ══════════════════════════════════════
  function attachPostCardListeners() {
    // Appreciate (Like)
    document.querySelectorAll(".appreciate-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const pid = btn.dataset.postid;
        const post = wallPosts.find(p => p.id === pid);
        if (!post) return;

        if (likedPostIds.has(pid)) {
          likedPostIds.delete(pid);
          post.appreciations = Math.max(0, (post.appreciations || 1) - 1);
        } else {
          likedPostIds.add(pid);
          post.appreciations = (post.appreciations || 0) + 1;
        }

        saveLikes();
        savePosts();
        renderFeed();
      });
    });

    // Save (Bookmark)
    document.querySelectorAll(".save-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const pid = btn.dataset.postid;
        if (savedPostIds.has(pid)) {
          savedPostIds.delete(pid);
        } else {
          savedPostIds.add(pid);
        }
        saveBookmarks();
        renderFeed();
      });
    });

    // Toggle Comments Thread
    document.querySelectorAll(".toggle-comments-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const pid = btn.dataset.postid;
        const container = document.getElementById("comments-" + pid);
        if (container) {
          container.style.display = container.style.display === "none" ? "block" : "none";
        }
      });
    });

    // Add Comment Form Submit
    document.querySelectorAll(".comment-form-row").forEach(form => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const pid = form.dataset.postid;
        const input = form.querySelector("input");
        const val = input ? input.value.trim() : "";
        if (!val) return;

        const post = wallPosts.find(p => p.id === pid);
        if (!post) return;

        if (!post.comments) post.comments = [];
        post.comments.push({
          id: "c-" + Date.now(),
          author: "Archive Guest Contributor",
          avatar: "data/cm_usthad_hd.png",
          text: val
        });

        savePosts();
        renderFeed();
      });
    });

    // Share & Cite
    document.querySelectorAll(".share-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const title = btn.dataset.title || "CM Usthad Archive Post";
        const citation = `Citation: "${title}" — CM Usthad Archive (https://cmusthad.org/wall.html#${btn.dataset.postid})`;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(citation);
          alert("Citation & link copied to clipboard:\n\n" + citation);
        } else {
          alert(citation);
        }
      });
    });

    // Report
    document.querySelectorAll(".report-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        alert("Thank you. This post has been flagged for moderation review by the Archive Editorial Desk.");
      });
    });

    // Click Document -> Open Museum Viewer Modal
    document.querySelectorAll(".post-doc-card").forEach(card => {
      card.addEventListener("click", () => {
        openDocumentViewer(card.dataset.doctitle, card.dataset.docurl, card.dataset.doccat);
      });
    });

    // Click Author Avatar / Name -> Open Profile Modal
    document.querySelectorAll(".post-author-avatar, .post-author-name").forEach(el => {
      el.addEventListener("click", () => {
        openProfileModal(el.dataset.authorname, el.dataset.handle, el.dataset.role, el.dataset.bio);
      });
    });

    // Hashtag Triggers
    document.querySelectorAll(".htag-trigger").forEach(pill => {
      pill.addEventListener("click", () => {
        const tag = pill.dataset.htag;
        const input = document.getElementById("wallSearchInput");
        if (input) {
          input.value = tag;
          activeSearchQuery = tag.toLowerCase();
          renderFeed();
        }
      });
    });
  }

  // ══════════════════════════════════════
  // MODAL HANDLERS
  // ══════════════════════════════════════
  function openDocumentViewer(title, url, category) {
    const modal = document.getElementById("docViewerModal");
    if (!modal) return;

    document.getElementById("modalDocTitle").textContent = title || "Archival Document Scan";
    document.getElementById("modalDocCategory").textContent = category || "Historical Document";
    document.getElementById("modalDocAuthor").textContent = "CM Usthad / Archive Committee";
    document.getElementById("modalDocLoc").textContent = "Kasargod Archive Desk";

    const previewArea = document.getElementById("modalDocPreview");
    if (previewArea) {
      if (url && (url.endsWith(".png") || url.endsWith(".jpg") || url.endsWith(".jpeg"))) {
        previewArea.innerHTML = `<img src="${escHtml(url)}" alt="Document Preview">`;
      } else {
        previewArea.innerHTML = `
          <div style="text-align:center;padding:40px;color:#ffffff;">
            <div style="font-size:3rem;margin-bottom:12px;">📄</div>
            <h4 style="font-family:'Poppins',sans-serif;font-weight:700;">${escHtml(title)}</h4>
            <p style="font-family:'Mulish',sans-serif;font-size:0.88rem;color:#a8e0d9;">Preserved PDF Document Scan</p>
          </div>
        `;
      }
    }

    const downloadBtn = document.getElementById("modalDocDownloadBtn");
    if (downloadBtn) {
      downloadBtn.href = url || "#";
    }

    modal.showModal();
  }

  function openProfileModal(name, handle, role, bio) {
    const modal = document.getElementById("profileModal");
    if (!modal) return;

    document.getElementById("pModalName").textContent = name || "Contributor";
    document.getElementById("pModalHandle").textContent = handle || "@contributor";
    document.getElementById("pModalBadge").textContent = role || "Student";
    document.getElementById("pModalBio").textContent = bio || "Active registered contributor to the CM Usthad Archive.";

    const avatarImg = document.getElementById("pModalAvatar");
    if (avatarImg) {
      avatarImg.src = role === "Official Archive" ? "data/cm_usthad_hd.png" : "data/vellore_scholarly.png";
    }

    modal.showModal();
  }

  // ══════════════════════════════════════
  // HELPER FUNCTIONS
  // ══════════════════════════════════════
  function escHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatDate(isoStr) {
    if (!isoStr) return "Recent";
    try {
      const d = new Date(isoStr);
      if (isNaN(d.getTime())) return isoStr;
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch (e) {
      return isoStr;
    }
  }

})();
