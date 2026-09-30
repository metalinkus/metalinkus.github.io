document.getElementById("year").textContent = new Date().getFullYear();

(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  function isMobileNav() {
    return window.matchMedia("(max-width: 900px)").matches;
  }

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    if (open) {
      nav.removeAttribute("hidden");
    } else if (isMobileNav()) {
      nav.setAttribute("hidden", "");
    }
  }

  function syncToViewport() {
    if (isMobileNav()) {
      setOpen(toggle.getAttribute("aria-expanded") === "true");
    } else {
      nav.removeAttribute("hidden");
      toggle.setAttribute("aria-expanded", "false");
    }
  }

  toggle.addEventListener("click", function () {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  nav.addEventListener("click", function (event) {
    if (event.target.tagName === "A" && isMobileNav()) {
      setOpen(false);
    }
  });

  document.addEventListener("click", function (event) {
    if (!isMobileNav()) return;
    if (toggle.getAttribute("aria-expanded") !== "true") return;
    if (toggle.contains(event.target) || nav.contains(event.target)) return;
    setOpen(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });

  window.addEventListener("resize", syncToViewport);
  syncToViewport();
})();
