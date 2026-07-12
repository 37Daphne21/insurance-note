(function () {
  var mobileMenu = document.querySelector("[data-mobile-menu]");
  var mobileMenuOpenButton = document.querySelector("[data-mobile-menu-open]");
  var mobileMenuCloseButtons = Array.prototype.slice.call(document.querySelectorAll("[data-mobile-menu-close]"));
  var insuranceMenuButton = document.querySelector("[data-insurance-menu-button]");
  var insuranceMenu = document.querySelector("[data-insurance-menu]");
  var mobileMenuCloseTimer = null;

  function openMobileMenu() {
    if (!mobileMenu || !mobileMenuOpenButton) {
      return;
    }

    window.clearTimeout(mobileMenuCloseTimer);
    mobileMenu.hidden = false;
    document.body.classList.add("is-navigation-open");
    mobileMenuOpenButton.setAttribute("aria-expanded", "true");

    window.requestAnimationFrame(function () {
      mobileMenu.classList.add("is-open");

      var firstLink = mobileMenu.querySelector("a");

      if (firstLink) {
        firstLink.focus();
      }
    });
  }

  function closeMobileMenu() {
    if (!mobileMenu || !mobileMenuOpenButton || mobileMenu.hidden) {
      return;
    }

    mobileMenu.classList.remove("is-open");
    document.body.classList.remove("is-navigation-open");
    mobileMenuOpenButton.setAttribute("aria-expanded", "false");

    mobileMenuCloseTimer = window.setTimeout(function () {
      mobileMenu.hidden = true;
      mobileMenuOpenButton.focus();
    }, 300);
  }

  function closeInsuranceMenu() {
    if (!insuranceMenuButton || !insuranceMenu) {
      return;
    }

    insuranceMenuButton.setAttribute("aria-expanded", "false");
    insuranceMenu.classList.remove("is-open");
  }

  if (mobileMenuOpenButton) {
    mobileMenuOpenButton.addEventListener("click", openMobileMenu);
  }

  mobileMenuCloseButtons.forEach(function (button) {
    button.addEventListener("click", closeMobileMenu);
  });

  if (insuranceMenuButton && insuranceMenu) {
    insuranceMenuButton.addEventListener("click", function () {
      var isOpen = insuranceMenuButton.getAttribute("aria-expanded") === "true";

      insuranceMenuButton.setAttribute("aria-expanded", isOpen ? "false" : "true");
      insuranceMenu.classList.toggle("is-open", !isOpen);
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") {
      return;
    }

    closeMobileMenu();
    closeInsuranceMenu();
  });

  document.addEventListener("click", function (event) {
    if (
      insuranceMenuButton &&
      insuranceMenu &&
      !event.target.closest(".la-header__dropdown")
    ) {
      closeInsuranceMenu();
    }
  });
})();