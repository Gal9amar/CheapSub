(function () {
  "use strict";

  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (!selectHeader.classList.contains("scroll-up-sticky") && !selectHeader.classList.contains("sticky-top") && !selectHeader.classList.contains("fixed-top")) return;
    window.scrollY > 100 ? selectBody.classList.add("scrolled") : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add("active") : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(swiperElement.querySelector(".swiper-config").innerHTML.trim());

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll(".faq-item h3, .faq-item .faq-toggle").forEach((faqItem) => {
    faqItem.addEventListener("click", () => {
      faqItem.parentNode.classList.toggle("faq-active");
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
        document.querySelectorAll(".navmenu a.active").forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);
})();
// -------------

const AUTH_KEY = "isAuthorized"; // מפתח לאחסון במקומי
const BUTTON_KEY = "guideButtonHidden"; // מפתח לשמירת מצב הכפתור
const COLLAPSE_KEY = "collapseState"; // מפתח לשמירת מצב התוכן המוסתר
const AUTH_TIMEOUT = 20 * 60 * 1000; // 20 דקות במילישניות

// פונקציה לבדוק אם המשתמש מורשה
function isUserAuthorized() {
  const authData = localStorage.getItem(AUTH_KEY);
  if (!authData) return false;

  const { authorized, timestamp } = JSON.parse(authData);
  const now = new Date().getTime();

  // בודק אם המצב בתוקף
  return authorized && now - timestamp <= AUTH_TIMEOUT;
}

// פונקציה לעדכון הרשאת המשתמש
function setAuthorization(status) {
  const now = new Date().getTime();
  localStorage.setItem(AUTH_KEY, JSON.stringify({ authorized: status, timestamp: now }));
}

// פונקציה להסתיר את הכפתור
function hideGuideButton() {
  document.getElementById("guide").style.display = "none";
  localStorage.setItem(BUTTON_KEY, "hidden");
}

// פונקציה להחזיר את הכפתור
function showGuideButton() {
  document.getElementById("guide").style.display = "block";
  localStorage.setItem(BUTTON_KEY, "visible");
}

// פונקציה להסתיר את התוכן
function hideContent() {
  const collapseElement = document.querySelector("#collapseExample");
  const bsCollapse = new bootstrap.Collapse(collapseElement, { toggle: false });
  localStorage.setItem(COLLAPSE_KEY, "hidden");
}

// פונקציה להציג את התוכן
function showContent() {
  const collapseElement = document.querySelector("#collapseExample");
  const bsCollapse = new bootstrap.Collapse(collapseElement, { toggle: true });
  localStorage.setItem(COLLAPSE_KEY, "visible");
}

// פעולה כאשר לוחצים על כפתור המדריך
document.getElementById("guide").addEventListener("click", function () {
  if (isUserAuthorized()) {
    // אם המשתמש מורשה, פותחים את התוכן ישירות (בלי לפתוח את המודאל)
    const collapseState = localStorage.getItem(COLLAPSE_KEY);
    if (collapseState === "visible") {
      showContent(); // אם התוכן היה פתוח, משאירים אותו פתוח
    } else {
      hideContent(); // אם התוכן היה מוסתר, שומרים אותו כך
    }
  } else {
    // אם המשתמש לא מורשה, פותחים את המודאל להזנת סיסמה
    const passwordModal = new bootstrap.Modal(document.getElementById("passwordModal"));
    passwordModal.show();
  }
});

// פעולה כאשר לוחצים על "אישור" במודאל
document.getElementById("submitPassword").addEventListener("click", function () {
  const password = document.getElementById("passwordInput").value;
  const correctPassword = "9070000"; // שנה את הסיסמה לפי הצורך

  if (password === correctPassword) {
    setAuthorization(true); // עדכון הרשאה

    // סגירת המודאל
    const passwordModal = bootstrap.Modal.getInstance(document.getElementById("passwordModal"));
    passwordModal.hide();

    // הסרת אלמנט modal-backdrop
    const backdrop = document.querySelector(".modal-backdrop");
    if (backdrop) {
      backdrop.parentNode.removeChild(backdrop);
    }

    // פותחים את התוכן
    showContent();

    // הסתרת הכפתור לאחר הזנת סיסמה נכונה
    hideGuideButton();

    // הפעלת מנגנון שתאפשר להחזיר את הכפתור אחרי 20 דקות
    setTimeout(() => {
      showGuideButton();
    }, AUTH_TIMEOUT);
  } else {
    // אם הסיסמה שגויה, מציג הודעה
    alert("סיסמה שגויה. אנא בקש סיסמה חדשה ממנהל האתר");
  }
});

// טיפול באירוע סגירת מודאל
document.getElementById("passwordModal").addEventListener("hidden.bs.modal", function () {
  // הסרת מחלקות פוקוס במקרה של בעיה
  document.body.classList.remove("modal-open");
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";

  // הסרת אלמנט modal-backdrop
  const backdrop = document.querySelector(".modal-backdrop");
  if (backdrop) {
    backdrop.parentNode.removeChild(backdrop);
  }

  // איפוס שדה הסיסמה במודאל
  document.getElementById("passwordInput").value = "";
});

// בדיקה אם יש שמירה ב-localStorage ופעולה בהתאם
window.addEventListener("load", function () {
  const buttonState = localStorage.getItem(BUTTON_KEY);
  if (buttonState === "hidden") {
    hideGuideButton(); // מסתיר את הכפתור אם הוא מוסתר
  } else {
    showGuideButton(); // מוודא שהכפתור מוצג אם הוא לא הוסתר
  }

  const collapseState = localStorage.getItem(COLLAPSE_KEY);
  if (collapseState === "visible") {
    showContent(); // אם התוכן היה פתוח, פותחים אותו מחדש
  } else {
    hideContent(); // אם התוכן היה מוסתר, שומרים אותו כך
  }
});
