const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = document.querySelectorAll("#mobileMenu a");

function openMobileMenu() {
  mobileMenu.classList.add("menu-visible");
  menuButton.classList.add("button-open");
  document.body.classList.add("menu-open");

  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", "Close navigation menu");
}

function closeMobileMenu() {
  mobileMenu.classList.remove("menu-visible");
  menuButton.classList.remove("button-open");
  document.body.classList.remove("menu-open");

  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation menu");
}

menuButton.addEventListener("click", () => {
  const menuIsOpen =
    mobileMenu.classList.contains("menu-visible");

  if (menuIsOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
});


/* ========================================
   MOBILE NAV LINKS
======================================== */

mobileLinks.forEach((link) => {

  link.addEventListener("click", (event) => {

    const href = link.getAttribute("href");

    /* External links like Instagram */
    if (!href || !href.startsWith("#")) {
      closeMobileMenu();
      return;
    }

    const targetSection =
      document.querySelector(href);

    if (!targetSection) return;

    event.preventDefault();

    /* Scroll FIRST */
    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    /* Close immediately */
    closeMobileMenu();

  });

});


document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});


/* ========================================
   LOGO MOUSE MOVEMENT
======================================== */

const logoArea =
  document.querySelector(".logo-area");

const heroLogo =
  document.querySelector(".hero-logo");

if (
  logoArea &&
  heroLogo &&
  window.matchMedia("(pointer: fine)").matches
) {

  logoArea.addEventListener(
    "mousemove",
    (event) => {

      const area =
        logoArea.getBoundingClientRect();

      const mouseX =
        event.clientX - area.left;

      const mouseY =
        event.clientY - area.top;

      const centerX =
        area.width / 2;

      const centerY =
        area.height / 2;

      const moveX =
        (mouseX - centerX) / 45;

      const moveY =
        (mouseY - centerY) / 45;

      heroLogo.style.transform =
        `translate3d(${moveX}px, ${moveY}px, 0)`;
    }
  );


  logoArea.addEventListener(
    "mouseleave",
    () => {

      heroLogo.style.transform = "";

    }
  );

}


/* ========================================
   GALLERY SCROLL REVEAL
======================================== */

const galleryItems =
  document.querySelectorAll(
    ".gallery-reveal"
  );

const galleryObserver =
  new IntersectionObserver(

    (entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "gallery-visible"
          );

          observer.unobserve(
            entry.target
          );

        }

      });

    },

    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }

  );

galleryItems.forEach((item) => {
  galleryObserver.observe(item);
});