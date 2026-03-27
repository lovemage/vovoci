# VOVOCI Site — Design Critique Tasklist

Based on the design critique conducted on 2026-03-25.

---

## Priority Issues

### P1. Navbar overflow — mobile/tablet menu missing
- [x] Add hamburger menu for screens below 1024px
- [x] Reduce nav items to 5-6 on desktop (combine "Model Performance" + "Cost", consider dropping "Translation")
- [x] Ensure language switcher remains accessible in mobile menu
- **Command**: `/adapt`

### P2. Page length and rhythmic monotony
- [x] Move Cost section higher — right after Features or as a hero pull-quote stat
- [x] Break center-aligned rhythm: make at least one section left-aligned or full-bleed
- [ ] Consider collapsing Term Scanner + Providers + Model Performance into a tabbed interface
- **Command**: `/arrange`

### P3. Hero particle animation — AI template cliche
- [x] Remove particle network animation (floating dots + connecting lines)
- [x] Keep floating orbs only, OR replace with audio/voice waveform motif
- **Command**: `/distill`

### P4. Feature cards lack visual differentiation
- [x] Add distinct icon or illustration to each of the 7 feature cards
- [x] Use accent color on lead card ("Built for Vibecoding") for priority
- [ ] Consider promoting top 3-4 features, collapsing the rest
- **Command**: `/bolder`

### P5. Accent color (`#c86f4a`) underused
- [x] Apply accent to primary CTA ("Download for Windows")
- [x] Apply accent to NVIDIA "Free tier" badge
- [x] Apply accent to cost `$3.80` price display
- [x] Establish rule: teal = structural, burnt-orange = action/attention
- **Command**: `/colorize`

---

## Minor Issues

### M1. Table cell padding too tight
- [x] Increase `.comparison-table th, td` padding from `12px` to `14px 16px`
- [ ] Abbreviate column headers for mobile readability

### M2. Footer too minimal
- [x] Add key nav links to footer (How It Works, Features, Quick Start)
- [ ] Consider adding a brief tagline or secondary CTA

### M3. Code block border inconsistency
- [x] Scanner prompt preview uses `#444` border, Quick Start uses `#333`
- [x] Unify to a single token or shared value

### M4. FAQ answer lacks visual separation
- [x] Add subtle left border or indentation to `.faq-answer-inner` to distinguish A from Q

### M5. Hero image border-radius jump between breakpoints
- [x] Smooth the transition from top-only radius (desktop) to full radius (mobile) at 768px
