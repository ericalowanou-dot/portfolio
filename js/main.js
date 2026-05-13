/* Comportement : navigation, coordonnées (config), formulaire mailto, animations, PDF. */
(function () {
  const cfg = window.PORTFOLIO_CONFIG || {};

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const loc = cfg.location || "Lomé, Togo";
  document.querySelectorAll(".js-location-text").forEach(function (el) {
    el.textContent = loc;
  });

  function bindContact(key) {
    document.querySelectorAll('[data-contact="' + key + '"]').forEach(function (wrap) {
      const a = wrap.querySelector("a");
      if (!a) return;

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
    });
  }

  bindContact("email");
  bindContact("phone");
  bindContact("github");
  bindContact("linkedin");

  const header = document.querySelector(".site-header");
  const navToggle = document.getElementById("nav-toggle");
  const siteNav = document.getElementById("site-nav");

  function setNavOpen(open) {
    if (!header || !navToggle) return;
    header.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  }

  if (navToggle && header) {
    navToggle.addEventListener("click", function () {
      setNavOpen(!header.classList.contains("is-open"));
    });
  }

  if (siteNav) {
    siteNav.querySelectorAll("a[href^='#']").forEach(function (link) {
      link.addEventListener("click", function () {
        setNavOpen(false);
      });
    });
  }

  const form = document.getElementById("contact-form");
  const formHint = document.getElementById("contact-form-hint");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!cfg.email) {
        if (formHint) formHint.hidden = false;
        return;
      }
      if (formHint) formHint.hidden = true;
      const fd = new FormData(form);
      var name = String(fd.get("name") || "").trim();
      var reply = String(fd.get("reply_email") || "").trim();
      var msg = String(fd.get("message") || "").trim();
      var subject = "[Portfolio] Contact" + (name ? " — " + name : "");
      var body =
        (msg ? msg + "\n\n" : "") +
        "—\n" +
        "Nom : " +
        (name || "(non renseigné)") +
        "\n" +
        "E-mail du visiteur : " +
        (reply || "(non renseigné)");
      window.location.href =
        "mailto:" + cfg.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
  }

  function preparePrint() {
    document.querySelectorAll(".lang-bar__fill").forEach(function (el) {
      var w = el.getAttribute("data-width");
      if (w) el.style.width = w;
    });
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.remove("reveal--pending");
      el.classList.add("reveal--visible");
    });
  }

  window.addEventListener("beforeprint", preparePrint);

  var pdfBtn = document.getElementById("btn-export-pdf");
  if (pdfBtn) {
    pdfBtn.addEventListener("click", function () {
      preparePrint();
      window.print();
    });
  }

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReduced) {
    var bars = document.querySelectorAll(".lang-bar__fill");
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var el = e.target;
          el.style.width = el.getAttribute("data-width") || "0";
          obs.unobserve(el);
        });
      },
      { threshold: 0.2 }
    );
    bars.forEach(function (b) {
      b.style.width = "0";
      obs.observe(b);
    });

    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("reveal--pending");
      var o = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) {
              en.target.classList.add("reveal--visible");
              o.unobserve(en.target);
            }
          });
        },
        { threshold: 0.06, rootMargin: "0px 0px -50px 0px" }
      );
      o.observe(el);
    });
  } else {
    document.querySelectorAll(".lang-bar__fill").forEach(function (el) {
      var w = el.getAttribute("data-width");
      if (w) el.style.width = w;
    });
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("reveal--visible");
    });
  }
})();
