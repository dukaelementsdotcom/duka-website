# Duka Interiors – project context

Duka Interiors PLC: interior design and build firm in Addis Ababa, Ethiopia (since 2015). Founders: Dagmawi Tilahun (CEO) and Henok Teshome (COO), both architects. Focus: office partitioning, office renovation and fit-out, custom furniture. Also does residential work.

## Stack and workflow
- Next.js site at https://www.dukainteriors.com, hosted on Vercel.
- Workflow: edit in VS Code, commit and push with GitHub Desktop, Vercel deploys automatically.
- Use a new branch for each batch of changes. Claude builds and checks it locally, pushes, opens a pull request, waits for the Vercel check, then merges into main (= live site) without asking. Standing approval from Dagmawi, 26 Oct 2026.
- Never commit .env files or secrets. Keep the repository private.

## 1. Website audit fixes (Oct 2026) – do these first

### SEO and technical
- [x] Give every page its own title (≤60 chars), meta description (≤160 chars), og:title and og:url. About, Contact, Projects, Resources, Estimate and Products currently copy the homepage's. Service pages point og:url at the homepage, and project pages have no og:url.
- [x] Server-render /projects/. Without JavaScript it only shows "Loading Projects Portfolio...".
- [x] Homepage counters show "0+ Projects / 0+ Clients / 0+ Years" in the page HTML. Put the real numbers in the HTML.
- [x] sitemap.xml: use www and trailing slashes (the site serves https://www.dukainteriors.com/about/). Add the blog posts, /estimate/, /resources/materials/ and /resources/faq/. Use real lastmod dates. Point robots.txt at the www sitemap.
- [x] Shorten titles on service and project pages (remove the duplicate "| Duka Interiors Addis Ababa"). Trim meta descriptions over 160 chars.
- [x] Replace the "thumbnail" alt text in project galleries with real descriptions.
- [x] Fix the empty-URL LinkedIn and Telegram share links on project pages.
- [x] Add `sizes` to large images (they currently request w=3840). Serve the SVG logo directly instead of through /_next/image.
- [x] Fix heading order (H2 jumps to H4 on service pages). Remove the meta keywords tag.
- [x] Add LocalBusiness structured data.

### Content
- [x] Fix "Scheinder" to "Schneider" in the Schneider Electric showroom project. Location confirmed: Bambis.
- [x] Use "Since 2015" everywhere. Remove "9+ years" from the Interior Design page.
- [ ] Testimonial: add a name and company, then more quotes.
- [x] Back up or soften "best", "leading", "transparent fixed costs" and "Used by 150+ businesses".
- [x] Case study template: client, location, m², scope, timeline, challenge, result, and a "Get a quote" call to action.
- [x] Fix the raw HTML showing in the third blog post's excerpt on /resources/.
- [ ] Team page: fix LinkedIn links set to "#", and check photo files against the names shown.

### Conversion
- [ ] Estimator: add ETB price ranges and lead capture (name and phone before sending the result).
- [x] Contact form: add the missing project types (Partitioning, Branding & Signage, Technology, Renovation). Add fields for budget, area (m²) and timeline.
- [x] Use one destination for the "Free Consultation" button (it goes to Telegram on About and to /contact/ elsewhere).
- [x] Hide Products ("Coming soon") from the menu until it launches. Make header and footer menu labels match. Show opening hours.

## 2. Planned builds – discuss before building

### A. 3D office layout planner (public, replaces /estimate/)
The client traces their floor outline (they can upload a plan image to trace over) and enters headcount and work style. The tool lays out partitions, offices, meeting rooms and workstations automatically, shows the result in 3D, and lets the client pick partition types (glass, framed glass, gypsum, acoustic, logo film on glass). It shows a live bill of quantities priced in ETB. To get the PDF, the client enters a name and phone number, and the summary goes to Duka on WhatsApp or Telegram.

### B. Internal office system (private, e.g. portal.dukainteriors.com, with logins and a database)
Users: Dagmawi, Henok and selected staff. Clients never log in; they only receive documents through a share button.
- **Catalog:** one master list of services and materials with units and default ETB prices. Every other module picks items from it.
- **Projects board (like Trello):** create a project, add deliverables from a ready-made list, set deadlines and owners, move cards through stages.
- **Proforma generator:** pick catalog items, add or remove services, apply discounts, calculate 15% VAT. Produces a PDF on the company template with header, stamp and signature, plus a share button (WhatsApp, Telegram, email). Drafts stay private until shared.
- **Invoice and payment requests:** lock the agreed proforma as the final invoice. Generate payment requests from it in stages (for example 40/40/20). Track paid and outstanding amounts. Invoices can be discarded or revised, with older versions kept.
- **BOQ generator:** a materials library built from past Duka BOQs. Pick items, enter quantities, generate the BOQ. Later this could pull quantities from the planner.

Still to collect from Dagmawi: the proforma Excel template and one filled example, scans of the stamp and signature (keep private), past BOQs in Excel, payment-stage terms, bank details, VAT and withholding notes, the list of standard deliverables, and ETB rates.

Open question: should the site position Duka as office-only, or office plus residential? Several portfolio projects are apartments.
