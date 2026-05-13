/* Comportement : année, coordonnées (config), animations, export PDF. Coordonnées → js/config.js */
(function () {
  const cfg = window.PORTFOLIO_CONFIG || {};

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const locEl = document.getElementById("text-location");
  if (locEl) locEl.textContent = cfg.location || "Lomé, Togo";

  function bindContact(key) {
    const wrap = document.querySelector('[data-contact="' + key + '"]');
    const a = wrap && wrap.querySelector("a");
    if (!wrap || !a) return;

    const val = cfg[key];
    const span = a.querySelector(".contact-text");

    if (!val) {
      wrap.hidden = true;
      return;
    }

    wrap.hidden = false;
    if (key === "email") {
      a.href = "mailto:" + val;
      if (span) span.textContent = val;
    } else if (key === "phone") {
      a.href = "tel:" + String(val).replace(/\s/g, "");
      if (span) span.textContent = val;
    } else {
      a.href = val;
    }
  }

  bindContact("email");
  bindContact("phone");
  bindContact("github");
  bindContact("linkedin");

  function preparePrint() {
    document.querySelectorAll(".lang-bar__fill").forEach((el) => {
      const w = el.getAttribute("data-width");
      if (w) el.style.width = w;
    });
    document.querySelectorAll(".reveal").forEach((el) => {
      el.classList.remove("reveal--pending");
      el.classList.add("reveal--visible");
    });
  }

  window.addEventListener("beforeprint", preparePrint);

  const pdfBtn = document.getElementById("btn-export-pdf");
  if (pdfBtn) {
    pdfBtn.addEventListener("click", function () {
      preparePrint();
      window.print();
    });
  }

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReduced) {
    const bars = document.querySelectorAll(".lang-bar__fill");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          el.style.width = el.getAttribute("data-width") || "0";
          obs.unobserve(el);
        });
      },
      { threshold: 0.2 }
    );
    bars.forEach((b) => {
      b.style.width = "0";
      obs.observe(b);
    });

    document.querySelectorAll(".reveal").forEach((el) => {
      el.classList.add("reveal--pending");
      const o = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add("reveal--visible");
              o.unobserve(en.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
      );
      o.observe(el);
    });
  } else {
    document.querySelectorAll(".lang-bar__fill").forEach((el) => {
      const w = el.getAttribute("data-width");
      if (w) el.style.width = w;
    });
    document.querySelectorAll(".reveal").forEach((el) => {
      el.classList.add("reveal--visible");
    });
  }
})();
