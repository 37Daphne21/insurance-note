(function () {
  var TRAITS = {
    active: {
      eyebrow: "활동량이 많은 아이라면",
      headline: "관절·인대처럼<br>자주 움직이는 부위를<br>같이 살펴보면 좋아요.",
      sub: "위험하다는 뜻은 아니에요.<br>상담할 때 이런 부분을 미리 확인하면 더 편해요.",
      points: [
        {
          title: "통원·검사 기준",
          description: "자주 병원에 갈 때 실제로 부담하는 금액을 같이 봐요."
        },
        {
          title: "수술·입원 기준",
          description: "갑자기 큰 진료가 필요할 때 어디까지 준비되는지 확인해요."
        }
      ]
    },
    curious: {
      eyebrow: "호기심이 많은 아이라면",
      headline: "예상 못 한 사고나<br>이물질·상처 진료를<br>가볍게 체크해보면 좋아요.",
      sub: "먹으면 안 되는 것을 삼키거나<br>장난치다 다치는 경우가 있어요.",
      points: [
        {
          title: "응급·사고 진료",
          description: "갑작스러운 내원 때 보장 기준이 어떻게 잡히는지 확인해요."
        },
        {
          title: "제외 항목",
          description: "보장된다고 생각했지만 빠지는 항목이 없는지 같이 봐요."
        }
      ]
    },
    calm: {
      eyebrow: "집에서 쉬는 걸 좋아한다면",
      headline: "체중 관리나<br>반복되는 생활 질환 쪽을<br>같이 살펴보면 좋아요.",
      sub: "생활 패턴에 따라 병원비가 달라질 수 있어서<br>무리 없이 볼 기준을 잡아봐요.",
      points: [
        {
          title: "반복 진료 기준",
          description: "피부·소화·체중처럼 반복될 수 있는 진료 기준을 확인해요."
        },
        {
          title: "자기부담금",
          description: "작은 진료가 반복될 때 실제 부담액이 어떤지 같이 봐요."
        }
      ]
    },
    senior: {
      eyebrow: "나이가 조금 있는 아이라면",
      headline: "검진·관리 비용과<br>갱신 흐름을<br>미리 같이 보면 좋아요.",
      sub: "늦었다는 뜻은 아니에요. 지금 기준에서 가능한 선택지를 차분히 보는 단계예요.",
      points: [
        {
          title: "가입 가능 나이",
          description: "현재 나이에서 가능한 범위와 조건을 먼저 확인해요."
        },
        {
          title: "갱신 보험료",
          description: "시간이 지나며 보험료가 어떻게 달라질 수 있는지 같이 봐요."
        }
      ]
    }
  };

  var PET_STATS = {
    dog: {
      before: 74.5,
      after: 143.3,
      beforeRate: 52,
      afterRate: 100,
      caption: "2025년, 반려견 1마리당 평균 치료비"
    },
    cat: {
      before: 59.8,
      after: 103.2,
      beforeRate: 58,
      afterRate: 100,
      caption: "2025년, 반려묘 1마리당 평균 치료비"
    }
  };

  var flow = document.querySelector("[data-flow]");
  var stage = document.querySelector("[data-stage]");
  var steps = Array.prototype.slice.call(document.querySelectorAll("[data-step]"));
  var progress = document.querySelector("[data-progress]");
  var progressItems = Array.prototype.slice.call(document.querySelectorAll(".la-progress__item"));
  var progressText = document.querySelector("[data-progress-text]");
  var backButton = document.querySelector("[data-back]");
  var petOpening = document.querySelector(".pet-opening");
  var petImages = petOpening ? petOpening.querySelectorAll(".pet-visual__image") : [];
  var current = 0;
  var selectedPetType = "dog";

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
      var isOpeningSelected =
        petOpening &&
        petOpening.classList.contains("is-selected");

      backButton.classList.toggle(
        "is-visible",
        index > 0 || isOpeningSelected
      );
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

    if (next.classList.contains("la-step--reality")) {
      updatePetStat(selectedPetType);
    }
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

  function updatePetStat(pet) {
    var data = PET_STATS[pet];

    if (!data) {
      return;
    }

    var number = document.querySelector("[data-stat-number]");
    var caption = document.querySelector("[data-stat-caption]");
    var before = document.querySelector("[data-stat-before]");
    var after = document.querySelector("[data-stat-after]");
    var beforeBar = document.querySelector("[data-stat-before-bar]");
    var afterBar = document.querySelector("[data-stat-after-bar]");

    if (number) {
      animateNumber(number, data.after);
    }

    if (caption) {
      caption.textContent = data.caption;
    }

    if (before) {
      before.textContent = data.before + "만원";
    }

    if (after) {
      after.textContent = data.after + "만원";
    }

    if (beforeBar) {
      beforeBar.style.width = "0";
    }

    if (afterBar) {
      afterBar.style.width = "0";
    }

    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        if (beforeBar) {
          beforeBar.style.width = data.beforeRate + "%";
        }

        if (afterBar) {
          afterBar.style.width = data.afterRate + "%";
        }
      });
    });
  }

  if (flow && stage && steps.length) {
    stage.addEventListener("click", function (event) {
      var nextButton = event.target.closest("[data-next]");
      var choiceButton = event.target.closest("[data-choice]");

      if (nextButton) {
        moveStep(current + 1);
      }

      if (choiceButton) {
        stage.querySelectorAll("[data-choice]").forEach(function (button) {
          button.classList.remove("is-selected");
        });

        choiceButton.classList.add("is-selected");
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

      var petButton = event.target.closest("[data-pet-select]");

      if (petButton && petOpening) {
        var selectedPet = petButton.getAttribute("data-pet-select");
        selectedPetType = selectedPet;

        petOpening.classList.remove("is-selecting");
        petOpening.classList.add("is-selected");
        petOpening.dataset.pet = selectedPet;

        petImages.forEach(function (image) {
          image.classList.toggle(
            "is-active",
            image.dataset.pet === selectedPet
          );
        });

        renderProgress(current);

        return;
      }
    });

    if (backButton) {
      backButton.addEventListener("click", function () {
        if (
          current === 0 &&
          petOpening &&
          petOpening.classList.contains("is-selected")
        ) {
          petOpening.classList.remove("is-selected");
          petOpening.classList.add("is-selecting");
          petOpening.removeAttribute("data-pet");

          petImages.forEach(function (image) {
            image.classList.remove("is-active");
          });

          renderProgress(current);

          return;
        }

        moveStep(current - 1);
      });
    }

    renderProgress(0);

    document.querySelectorAll(".is-open [data-accordion-panel]").forEach(function (panel) {
      panel.style.maxHeight = panel.scrollHeight + "px";
    });
  }

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

    document.querySelectorAll(".la-page--desktop [data-choice]").forEach(function (button) {
      button.classList.remove("is-selected");
    });

    desktopChoice.classList.add("is-selected");
    updatePersonalResult(desktopChoice.getAttribute("data-trait"));
  });
})();