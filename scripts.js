const hamburger = document.querySelector(".nav__hamburger");
const nav = document.querySelector("#nav-links");
const navLinks = document.querySelectorAll("#nav-links li");

hamburger.addEventListener("click", navSlide);

function navSlide() {
  //Toggle Nav
  nav.classList.toggle("nav__links--show");

  //Animate Links
  navLinks.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = "";
    } else {
      link.style.animation = `navLinkFade 0.3s ease forwards ${index / 9}s`;
      // console.log(index/7);
    }
  });
  //Hamurger Btn Animation
  hamburger.classList.toggle("nav__hamburger--active");
}

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", scrollActive);

function scrollActive() {
  const scrollY = window.pageYOffset;
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 60;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector("#nav-links a[href*=" + sectionId + "]")
        .classList.add("--active");
    } else {
      document
        .querySelector("#nav-links a[href*=" + sectionId + "]")
        .classList.remove("--active");
    }
  });
}

function closeHamburger() {
  if (
    window.getComputedStyle(hamburger, null).getPropertyValue("display") ===
    "block"
  ) {
    // Mobile view, closing of navbar box with animations
    navSlide();
  } else {
    // Desktop view, nothing happens to prevent animations
  }
  // console.log(window.getComputedStyle(hamburger,null).getPropertyValue('display'))
}

// Closing of hamburger menu after selecting a nav link
navLinks.forEach((n) => n.addEventListener("click", closeHamburger));

/*==================== DARK LIGHT THEME ====================*/

const themeButton = document.getElementById("theme-button");
const darkTheme = "body--dark-theme";
const iconTheme = "bx-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx-moon" : "bx-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});
