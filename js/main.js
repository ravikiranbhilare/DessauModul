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

  // Enquiry form — composes an email to the studio (no backend required)
  const form = $("#enquiry");
  const status = $(".form__status", form);
  form.addEventListener("submit", (e) => {
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
      status.textContent = "This is a preview, so enquiries aren’t sent from here. On the live site this opens an email to ravi@dessaumodul.com.";
      return;
    }
    const d = new FormData(form);
    const interests = d.getAll("interest").join(", ") || "Not specified";
    const body = [
      `Name: ${d.get("name")}`,
      `Phone: ${d.get("phone")}`,
      `Email: ${d.get("email") || "-"}`,
      `Area: ${d.get("area")}`,
      `I am a: ${d.get("role")}`,
      `Interested in: ${interests}`,
      "",
      d.get("message") || "",
    ].join("\n");
    const subject = `Consultation request — ${d.get("name")} (${d.get("area")})`;
    window.location.href = `mailto:ravi@dessaumodul.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = "Opening your email app. Send the message and we’ll get back to you.";
  });
})();
