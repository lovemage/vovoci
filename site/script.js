document.addEventListener("DOMContentLoaded", () => {
  // -------------------------------------------------------
  // FAQ Accordion — one open at a time, smooth grid animation
  // -------------------------------------------------------
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const btn = item.querySelector(".faq-question");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      // Close all items
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove("active");
          const otherBtn = other.querySelector(".faq-question");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        }
      });

      // Toggle clicked item
      if (isOpen) {
        item.classList.remove("active");
        btn.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("active");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  // -------------------------------------------------------
  // Copy buttons on code blocks
  // -------------------------------------------------------
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const code = btn.closest(".code-wrapper").querySelector("code");
      if (!code) return;

      try {
        await navigator.clipboard.writeText(code.textContent);
      } catch {
        const range = document.createRange();
        range.selectNodeContents(code);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        document.execCommand("copy");
        sel.removeAllRanges();
      }

      btn.classList.add("copied");
      setTimeout(() => btn.classList.remove("copied"), 1500);
    });
  });

  // -------------------------------------------------------
  // Smooth Scroll with navbar offset
  // -------------------------------------------------------
  const navHeight = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue("--nav-h") || "68",
    10
  );

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const top =
        target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  // -------------------------------------------------------
  // Mobile hamburger menu
  // -------------------------------------------------------
  const hamburger = document.querySelector(".nav-hamburger");
  const mobileMenu = document.getElementById("nav-mobile-menu");

  if (hamburger && mobileMenu) {
    const openMenu = () => {
      mobileMenu.classList.add("open");
      mobileMenu.setAttribute("aria-hidden", "false");
      hamburger.setAttribute("aria-expanded", "true");
    };

    const closeMenu = () => {
      mobileMenu.classList.remove("open");
      mobileMenu.setAttribute("aria-hidden", "true");
      hamburger.setAttribute("aria-expanded", "false");
    };

    hamburger.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.contains("open");
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close on any mobile nav link click
    mobileMenu.querySelectorAll(".nav-mobile-link").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!e.target.closest("#navbar")) {
        closeMenu();
      }
    });
  }

  // -------------------------------------------------------
  // Navbar scroll shadow
  // -------------------------------------------------------
  const navbar = document.getElementById("navbar");
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle("scrolled", window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // -------------------------------------------------------
  // IntersectionObserver — fade-in on scroll
  // -------------------------------------------------------
  const animEls = document.querySelectorAll(".fade-in, .stagger-in");

  if (animEls.length > 0 && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    animEls.forEach((el) => observer.observe(el));
  } else {
    animEls.forEach((el) => el.classList.add("visible"));
  }

  // -------------------------------------------------------
  // Cost chart bar animation (IntersectionObserver)
  // -------------------------------------------------------
  const costChart = document.querySelector(".cost-chart");

  if (costChart && "IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let chartAnimated = false;

    const chartObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !chartAnimated) {
          chartAnimated = true;
          chartObserver.unobserve(costChart);

          const bars = costChart.querySelectorAll(".chart-bar");
          const labels = costChart.querySelectorAll(".chart-bar-label");
          const refLine = costChart.querySelector(".chart-ref-line");
          const refText = costChart.querySelector(".chart-ref-text");

          bars.forEach((bar, i) => {
            const targetY = parseFloat(bar.dataset.targetY);
            const targetH = parseFloat(bar.dataset.targetH);
            const delay = i * 120;

            setTimeout(() => {
              bar.style.transition = "y 0.7s cubic-bezier(0.22, 1, 0.36, 1), height 0.7s cubic-bezier(0.22, 1, 0.36, 1)";
              bar.setAttribute("y", targetY);
              bar.setAttribute("height", targetH);
            }, delay);

            // Show label after bar finishes
            const label = labels[i];
            if (label) {
              setTimeout(() => {
                label.style.transition = "opacity 0.4s ease";
                label.setAttribute("opacity", "1");
              }, delay + 500);
            }
          });

          // Show $3 reference line after all bars
          const refDelay = bars.length * 120 + 600;
          if (refLine) {
            setTimeout(() => {
              refLine.style.transition = "opacity 0.6s ease";
              refLine.setAttribute("opacity", "1");
            }, refDelay);
          }
          if (refText) {
            setTimeout(() => {
              refText.style.transition = "opacity 0.6s ease";
              refText.setAttribute("opacity", "1");
            }, refDelay + 200);
          }
        }
      },
      { threshold: 0.3 }
    );

    chartObserver.observe(costChart);
  } else if (costChart) {
    // Reduced motion or no IO: show everything immediately
    costChart.querySelectorAll(".chart-bar").forEach((bar) => {
      bar.setAttribute("y", bar.dataset.targetY);
      bar.setAttribute("height", bar.dataset.targetH);
    });
    costChart.querySelectorAll(".chart-bar-label").forEach((l) => l.setAttribute("opacity", "1"));
    const refLine = costChart.querySelector(".chart-ref-line");
    const refText = costChart.querySelector(".chart-ref-text");
    if (refLine) refLine.setAttribute("opacity", "1");
    if (refText) refText.setAttribute("opacity", "1");
  }

});
