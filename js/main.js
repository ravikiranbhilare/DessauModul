(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  // Year
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile menu
  const toggle = $(".nav__toggle");
  const menu = $("#mobile-menu");
  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.hidden = !open;
  };
  toggle.addEventListener("click", () => setMenu(menu.hidden));
  $$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  window.addEventListener("resize", () => { if (window.innerWidth > 900) setMenu(false); });

  // Highlight the nav link for the section in view
  const links = $$(".nav__links a");
  const byId = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.classList.remove("is-current"));
      byId.get(e.target.id)?.classList.add("is-current");
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  byId.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });

  // Reveal on scroll
  const revealTargets = $$(".section__head, .partner, .pull, .product, .commitments li, .steps li, .journey figure, .factory__grid figure, .spec, .merino, .finish-list li, .writing__grid article, .areas, .vm__grid > div");
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    revealTargets.forEach((el, i) => {
      el.classList.add("reveal");
      el.style.transitionDelay = `${(i % 5) * 60}ms`;
      io.observe(el);
    });
  }

  // Gallery filter
  const filters = $$(".filter");
  const tiles = $$(".tile");
  filters.forEach((btn) => btn.addEventListener("click", () => {
    const f = btn.dataset.filter;
    filters.forEach((b) => { b.classList.toggle("is-active", b === btn); b.setAttribute("aria-selected", String(b === btn)); });
    tiles.forEach((t) => t.classList.toggle("is-hidden", f !== "all" && t.dataset.cat !== f));
  }));

  // Lightbox
  const lb = $("#lightbox");
  const lbImg = $("img", lb);
  let lastFocus = null;
  const closeLb = () => { lb.hidden = true; document.body.style.overflow = ""; lastFocus?.focus(); };
  tiles.forEach((t) => t.addEventListener("click", () => {
    const img = $("img", t);
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt;
    lastFocus = t;
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    $(".lightbox__close", lb).focus();
  }));
  lb.addEventListener("click", (e) => { if (e.target !== lbImg) closeLb(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !lb.hidden) closeLb(); });

  // Enquiry form — sent to info@dessaumodul.com through FormSubmit (formsubmit.co).
  // The first submission emails an activation link to that inbox; enquiries arrive once it's clicked.
  const FORM_ENDPOINT = "https://formsubmit.co/ajax/info@dessaumodul.com";
  const FALLBACK = "Please call +91 97307 63884 or email info@dessaumodul.com.";
  const form = $("#enquiry");
  const status = $(".form__status", form);
  const submitBtn = $('button[type="submit"]', form);
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let ok = true;
    ["name", "phone"].forEach((n) => {
      const f = form.elements[n];
      const bad = !f.value.trim();
      f.setAttribute("aria-invalid", String(bad));
      if (bad) ok = false;
    });
    if (!ok) { status.textContent = "Please add your name and phone number."; return; }

    if (form.dataset.preview) {
      status.textContent = "This is a preview, so enquiries aren’t sent from here. On the live site they go straight to info@dessaumodul.com.";
      return;
    }
    if (form.elements._honey.value) return; // spam bots fill the hidden field

    const d = new FormData(form);
    const payload = {
      _subject: `Consultation request: ${d.get("name")}${d.get("area") ? ` (${d.get("area")})` : ""}`,
      _template: "table",
      _captcha: "false",
      Name: d.get("name"),
      Phone: d.get("phone"),
      Email: d.get("email") || "-",
      "City / area": d.get("area") || "-",
      "I am a": d.get("role"),
      "Interested in": d.getAll("interest").join(", ") || "Not specified",
      Message: d.get("message") || "-",
    };
    if (d.get("email")) payload._replyto = d.get("email");

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";
    status.textContent = "";
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || String(json.success) !== "true") throw new Error(json.message || res.status);
      form.reset();
      status.textContent = "Thank you. Your request has been sent, and we’ll call you to fix a consultation time.";
    } catch (err) {
      status.textContent = `Sorry, your request couldn’t be sent. ${FALLBACK}`;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Request my consultation";
    }
  });
})();
