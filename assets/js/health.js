(function () {
  var TRAITS = {
    active: {
      eyebrow: "수술비가 가장 걱정된다면",
      headline: "암·뇌·심 수술비가<br>수술할 때마다 준비되는지<br>먼저 살펴보면 좋아요.",
      sub: "진단금과 별개로 실제 치료 과정에서 반복 지급되는 구조인지 확인해요.",
      points: [
        { title: "수술 반복 보장", description: "질병별·수술별 지급 기준과 횟수를 같이 확인해요." },
        { title: "급여·비급여 범위", description: "치료 방법에 따라 빠지는 항목이 없는지 살펴봐요." }
      ]
    },
    curious: {
      eyebrow: "항암치료가 가장 걱정된다면",
      headline: "표적·면역·방사선처럼<br>넓어진 치료 방법을<br>함께 살펴보면 좋아요.",
      sub: "치료 기술이 다양해진 만큼 어떤 치료까지 준비되는지가 중요해요.",
      points: [
        { title: "항암약물 범위", description: "표적·면역항암약물 등 치료 종류별 기준을 확인해요." },
        { title: "방사선 치료", description: "반복 치료와 연간 한도를 함께 살펴봐요." }
      ]
    },
    calm: {
      eyebrow: "뇌·심장 치료가 걱정된다면",
      headline: "암만이 아니라<br>뇌·심장 수술과 혈전 치료까지<br>넓게 살펴보면 좋아요.",
      sub: "한 가지 질병만 보는 구조보다 주요 치료를 함께 준비하는지 확인해요.",
      points: [
        { title: "뇌·심장 수술", description: "수술 1회가 아니라 반복 지급 기준을 살펴봐요." },
        { title: "혈전용해 치료", description: "응급 치료에 필요한 보장이 포함되는지 확인해요." }
      ]
    },
    senior: {
      eyebrow: "보험료가 가장 걱정된다면",
      headline: "보장 범위를 넓히면서도<br>월 보험료를 감당 가능한 수준으로<br>맞추는 게 중요해요.",
      sub: "많이 넣는 것보다 오래 유지할 수 있는 구조인지 함께 봐요.",
      points: [
        { title: "갱신 구조", description: "갱신 주기와 향후 보험료 변화를 확인해요." },
        { title: "기존 보장 활용", description: "이미 있는 보장은 유지하고 부족한 부분만 보완해요." }
      ]
    }
  };


  var flow = document.querySelector("[data-flow]");
  var stage = document.querySelector("[data-stage]");
  var steps = Array.prototype.slice.call(document.querySelectorAll("[data-step]"));
  var progress = document.querySelector("[data-progress]");
  var progressItems = Array.prototype.slice.call(document.querySelectorAll(".la-progress__item"));
  var progressText = document.querySelector("[data-progress-text]");
  var backButton = document.querySelector("[data-back]");
  var current = 0;

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

  function renderProgress(index) {
    progressItems.forEach(function (item, itemIndex) {
      item.classList.remove("is-current", "is-done");

      if (itemIndex < index) {
        item.classList.add("is-done");
      }

      if (itemIndex === index) {
        item.classList.add("is-current");
      }
    });

    if (progress) {
      progress.setAttribute("aria-valuenow", index + 1);
    }

    if (progressText) {
      progressText.textContent = (index + 1) + "단계 / " + steps.length + "단계";
    }

    if (backButton) {
      backButton.classList.toggle("is-visible", index > 0);
    }
  }

  function moveStep(index) {
    if (!steps.length || index < 0 || index >= steps.length || index === current) {
      return;
    }

    var previous = steps[current];
    var next = steps[index];

    previous.classList.remove("is-active");
    previous.classList.add("is-leaving");

    window.setTimeout(function () {
      previous.classList.remove("is-leaving");
    }, 450);

    current = index;
    next.classList.add("is-active");
    renderProgress(current);

  }

  function setSelectedChoice(selectedChoice) {
    var choiceList = selectedChoice.closest("[data-choice-list]");

    if (!choiceList) {
      return;
    }

    choiceList.querySelectorAll("[data-choice]").forEach(function (choice) {
      var isSelected = choice === selectedChoice;

      choice.classList.toggle("is-selected", isSelected);
      choice.setAttribute("aria-pressed", isSelected ? "true" : "false");
    });
  }

  function updatePersonalResult(trait) {
    var data = TRAITS[trait];
    var eyebrows = document.querySelectorAll("[data-personal-eyebrow]");
    var titles = document.querySelectorAll("[data-personal-title]");
    var descriptions = document.querySelectorAll("[data-personal-description]");
    var pointTitleFirst = document.querySelectorAll("[data-personal-point-title-1]");
    var pointDescriptionFirst = document.querySelectorAll("[data-personal-point-description-1]");
    var pointTitleSecond = document.querySelectorAll("[data-personal-point-title-2]");
    var pointDescriptionSecond = document.querySelectorAll("[data-personal-point-description-2]");

    if (!data) {
      return;
    }

    eyebrows.forEach(function (eyebrow) {
      eyebrow.textContent = data.eyebrow;
    });

    titles.forEach(function (title) {
      title.innerHTML = data.headline;
    });

    descriptions.forEach(function (description) {
      description.innerHTML = data.sub;
    });

    pointTitleFirst.forEach(function (title) {
      title.textContent = data.points[0].title;
    });

    pointDescriptionFirst.forEach(function (description) {
      description.textContent = data.points[0].description;
    });

    pointTitleSecond.forEach(function (title) {
      title.textContent = data.points[1].title;
    });

    pointDescriptionSecond.forEach(function (description) {
      description.textContent = data.points[1].description;
    });
  }

  function animateNumber(element, value) {
    element.textContent = "0";
    var start = 0;
    var duration = 800;
    var startTime = null;

    function update(time) {
      if (!startTime) {
        startTime = time;
      }

      var progress = Math.min((time - startTime) / duration, 1);
      var currentValue = start + (value - start) * progress;

      element.textContent = currentValue.toFixed(1);

      if (progress < 1) {
        window.requestAnimationFrame(update);
      }
    }

    window.requestAnimationFrame(update);
  }

  function initDesktopReality() {
    var reality = document.querySelector(".la-page--desktop .la-section--reality");

    if (!reality) {
      return;
    }

    var numbers = Array.prototype.slice.call(reality.querySelectorAll("[data-reality-number]"));
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var hasRevealed = false;

    function revealReality() {
      if (hasRevealed) {
        return;
      }

      hasRevealed = true;
      reality.classList.add("is-visible");

      numbers.forEach(function (number) {
        var value = Number(number.getAttribute("data-reality-number"));

        if (reduceMotion) {
          number.textContent = value.toFixed(1);
          return;
        }

        animateNumber(number, value);
      });
    }

    reality.classList.add("is-reality-ready");

    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealReality();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        revealReality();
        observer.unobserve(reality);
      });
    }, {
      threshold: .3,
      rootMargin: "0px 0px -8% 0px"
    });

    observer.observe(reality);
  }

  if (flow && stage && steps.length) {
    stage.addEventListener("click", function (event) {
      var nextButton = event.target.closest("[data-next]");
      var choiceButton = event.target.closest("[data-choice]");

      if (nextButton) {
        moveStep(current + 1);
      }

      if (choiceButton) {
        setSelectedChoice(choiceButton);
        updatePersonalResult(choiceButton.getAttribute("data-trait"));

        window.setTimeout(function () {
          moveStep(current + 1);
        }, 420);
      }

      var accordionButton = event.target.closest("[data-accordion-button]");

      if (accordionButton) {
        var accordion = accordionButton.closest("[data-accordion]");
        var item = accordionButton.closest("[data-accordion-item]");

        if (!accordion || !item) {
          return;
        }

        var panel = item.querySelector("[data-accordion-panel]");
        var isOpen = item.classList.contains("is-open");

        if (!panel) {
          return;
        }

        item.classList.toggle("is-open", !isOpen);
        accordionButton.setAttribute("aria-expanded", isOpen ? "false" : "true");
        panel.style.maxHeight = isOpen ? null : panel.scrollHeight + "px";

        return;
      }

    });

    if (backButton) {
      backButton.addEventListener("click", function () {
        moveStep(current - 1);
      });
    }

    renderProgress(0);

    document.querySelectorAll(".is-open [data-accordion-panel]").forEach(function (panel) {
      panel.style.maxHeight = panel.scrollHeight + "px";
    });
  }

  initDesktopReality();

  document.addEventListener("click", function (event) {
    var desktopAccordionButton = event.target.closest(".la-page--desktop [data-accordion-button]");

    if (desktopAccordionButton) {
      var desktopAccordionItem = desktopAccordionButton.closest("[data-accordion-item]");
      var desktopAccordionPanel = desktopAccordionItem ? desktopAccordionItem.querySelector("[data-accordion-panel]") : null;
      var isDesktopAccordionOpen = desktopAccordionItem && desktopAccordionItem.classList.contains("is-open");

      if (!desktopAccordionItem || !desktopAccordionPanel) {
        return;
      }

      desktopAccordionItem.classList.toggle("is-open", !isDesktopAccordionOpen);
      desktopAccordionButton.setAttribute("aria-expanded", isDesktopAccordionOpen ? "false" : "true");
      desktopAccordionPanel.style.maxHeight = isDesktopAccordionOpen ? null : desktopAccordionPanel.scrollHeight + "px";

      return;
    }

    var desktopChoice = event.target.closest(".la-page--desktop [data-choice]");

    if (!desktopChoice) {
      return;
    }

    setSelectedChoice(desktopChoice);
    updatePersonalResult(desktopChoice.getAttribute("data-trait"));
  });
})();
