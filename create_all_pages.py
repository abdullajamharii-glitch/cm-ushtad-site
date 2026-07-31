import re

NAV_BAR = '''      <div class="nfi-header-wrap">
        <header class="nfi-header">
          <a class="nfi-brand" href="index.html#top" aria-label="CM Usthad Archive home">
            <span class="nfi-brand-mark"><img src="data/cm_logo.png" alt="CM Usthad Logo" class="nfi-brand-img"></span>
            <span class="nfi-brand-text">
              <strong>CM Usthad</strong>
              <small>Archive &amp; Legacy</small>
            </span>
          </a>

          <button class="nav-toggle" type="button" aria-expanded="false" aria-label="Open navigation">
            <span></span><span></span><span></span>
          </button>

          <nav class="nfi-nav" id="primaryNav">

            <!-- 1. Home -->
            <div class="nav-dropdown">
              <a href="index.html" class="nav-dropdown-toggle nfi-nav-link">
                Home
                <svg class="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 1l4 4 4-4"/></svg>
              </a>
              <div class="nav-dropdown-menu">
                <a href="index.html#top">Hero</a>
                <a href="index.html#bio">Introduction</a>
                <a href="index.html#quick-facts">Highlights</a>
              </div>
            </div>

            <!-- 2. Life -->
            <div class="nav-dropdown">
              <a href="life.html" class="nav-dropdown-toggle nfi-nav-link">
                Life
                <svg class="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 1l4 4 4-4"/></svg>
              </a>
              <div class="nav-dropdown-menu">
                <a href="life.html#bio">Biography</a>
                <a href="life.html#timeline">Timeline</a>
                <a href="life.html#family">Family</a>
                <a href="life.html#education">Education</a>
                <a href="life.html#career">Career</a>
              </div>
            </div>

            <!-- 3. Works -->
            <div class="nav-dropdown">
              <a href="works.html" class="nav-dropdown-toggle nfi-nav-link">
                Works
                <svg class="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 1l4 4 4-4"/></svg>
              </a>
              <div class="nav-dropdown-menu">
                <a href="works.html#books">Books</a>
                <a href="works.html#articles">Articles</a>
                <a href="works.html#lectures">Lectures</a>
                <a href="works.html#research">Research</a>
                <a href="works.html#fatwas">Fatwas</a>
              </div>
            </div>

            <!-- 4. Legacy -->
            <div class="nav-dropdown">
              <a href="legacy.html" class="nav-dropdown-toggle nfi-nav-link">
                Legacy
                <svg class="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 1l4 4 4-4"/></svg>
              </a>
              <div class="nav-dropdown-menu">
                <a href="legacy.html#institutions">Institutions</a>
                <a href="legacy.html#students">Students</a>
                <a href="legacy.html#voices">Testimonials</a>
                <a href="legacy.html#influence">Influence</a>
                <a href="legacy.html#awards">Awards &amp; Recognition</a>
              </div>
            </div>

            <!-- 5. Case Diary -->
            <div class="nav-dropdown">
              <a href="case-diary.html" class="nav-dropdown-toggle nfi-nav-link">
                Case Diary
                <svg class="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 1l4 4 4-4"/></svg>
              </a>
              <div class="nav-dropdown-menu">
                <a href="case-diary.html#case-diary">Case Overview</a>
                <a href="case-diary.html#investigation-timeline">Investigation Timeline</a>
                <a href="case-diary.html#fir-records">FIR / Police Records</a>
                <a href="case-diary.html#court-docs">Court Documents</a>
                <a href="case-diary.html#news-reports">Newspaper Reports</a>
                <a href="case-diary.html#official-docs">Official Documents</a>
                <a href="case-diary.html#downloads">Downloadable PDFs</a>
              </div>
            </div>

            <!-- 6. Gallery -->
            <div class="nav-dropdown">
              <a href="gallery.html" class="nav-dropdown-toggle nfi-nav-link">
                Gallery
                <svg class="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 1l4 4 4-4"/></svg>
              </a>
              <div class="nav-dropdown-menu">
                <a href="gallery.html#gallery">Images</a>
                <a href="gallery.html#videos">Videos</a>
                <a href="gallery.html#events">Events</a>
              </div>
            </div>

            <!-- 7. News -->
            <div class="nav-dropdown">
              <a href="news.html" class="nav-dropdown-toggle nfi-nav-link">
                News
                <svg class="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 1l4 4 4-4"/></svg>
              </a>
              <div class="nav-dropdown-menu">
                <a href="news.html#news">Latest Updates</a>
                <a href="news.html#announcements">Announcements</a>
              </div>
            </div>

          </nav>

          <!-- Contact Action Button on Right -->
          <div class="nav-dropdown">
            <a href="contact.html" class="nfi-contact-btn">
              Contact
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </a>
            <div class="nav-dropdown-menu">
              <a href="contact.html#contact">Contact Info</a>
              <a href="contact.html#contribute">Contributions</a>
              <a href="contact.html#submission">Archive Submission</a>
            </div>
          </div>
        </header>
      </div>'''

with open('index.html', 'r', encoding='utf-8') as f:
    orig = f.read()

# Replace header block in index.html with NAV_BAR
new_index = re.sub(r'<div class="nfi-header-wrap">.*?</div>\s*</header>\s*</div>', NAV_BAR, orig, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_index)

print('index.html navbar updated!')

# Extract section helper
def extract_section(section_id):
    pattern = rf'(<section[^>]*id="{section_id}".*?</section>)'
    match = re.search(pattern, orig, re.DOTALL)
    if match:
        return match.group(1)
    return ""

footer_match = re.search(r'(<footer class="site-footer">.*)', orig, re.DOTALL)
footer_block = footer_match.group(1) if footer_match else ""

def make_page(title, subtitle, main_content):
    return f'''<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} | CM Usthad Archive</title>
    <meta name="description" content="{subtitle}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800&family=Montserrat:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
    <link rel="icon" type="image/png" href="data/favicon.png">
    <link rel="shortcut icon" href="favicon.ico">
    <link rel="stylesheet" href="styles.css">
    <script src="data/content.js"></script>
  </head>
  <body>
    <!-- ═══ PAGE FRAME ═══ -->
    <div class="nfi-page" id="top">

      <!-- College Architectural Sketch Background -->
      <div class="nfi-hero-bg-sketch" aria-hidden="true">
        <img src="https://www.micedu.in/college.png" alt="" class="nfi-hero-sketch-img">
      </div>

{NAV_BAR}

      <!-- Page Header Banner -->
      <div class="nfi-page-banner">
        <div class="nfi-eyebrow-pill">
          <span class="nfi-pill-badge">CM</span>
          <span class="nfi-pill-text">Abdulla Moulavi Chembarikka</span>
        </div>
        <h1>{title}</h1>
        <p class="nfi-hero-copy">{subtitle}</p>
      </div>

    </div>

    <main>
{main_content}
    </main>

{footer_block}'''

pages = [
    ("life.html", "Life & Biography", "Explore the life, lineage, education, and 7 key historical milestones of CM Abdulla Moulavi (CM Usthad).", f"{extract_section('quick-facts')}\n{extract_section('bio')}\n{extract_section('timeline')}"),
    ("works.html", "Books & Literature Works", "Searchable, catalogued writings on astronomy, magnetic compass declination, Islamic jurisprudence, and translations.", f"{extract_section('research')}\n{extract_section('books')}\n{extract_section('articles')}"),
    ("legacy.html", "Institutional Legacy & Impact", "The enduring educational and spiritual legacy of CM Usthad through the Malabar Islamic Complex (MIC) and generations of scholars.", f"{extract_section('legacy')}\n{extract_section('voices')}"),
    ("case-diary.html", "Case Diary & Digital Archive", "A sober, verified public record of official FIR reports, CBI court filings, news coverage, and document scans.", f"{extract_section('case-diary')}\n{extract_section('sources')}"),
    ("gallery.html", "Gallery & Media Archive", "Visual archive of historic photographs, portrait albums, video lectures, and annual conference programs.", extract_section("gallery")),
    ("news.html", "Newsroom & Updates", "Latest updates on inquiry proceedings, annual commemoration programs, and archive calls.", extract_section("news")),
    ("contact.html", "Contact & Contribution Desk", "Get in touch with the archive editorial committee or submit book scans, photographs, and historical records.", extract_section("contribute"))
]

for filename, title, subtitle, content in pages:
    html = make_page(title, subtitle, content)
    with open(filename, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"{filename} generated!")

print("All multi-page HTML files created!")
