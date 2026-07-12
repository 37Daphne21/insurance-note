(function () {
  function init(options) {
    var settings = options || {};
    var traits = settings.traits || {};
    var flow = document.querySelector("[data-flow]");
    var stage = document.querySelector("[data-stage]");
    var steps = Array.prototype.slice.call(document.querySelectorAll("[data-step]"));
    var progress = document.querySelector("[data-progress]");
    var progressItems = Array.prototype.slice.call(document.querySelectorAll(".la-progress__item"));
    var progressText = document.querySelector("[data-progress-text]");
    var backButton = document.querySelector("[data-back]");
    var current = 0;
    var api = {
      animateNumber: animateNumber,
      getCurrent: function () {
        return current;
      },
      moveStep: moveStep,
      renderProgress: function () {
        renderProgress(current);
      }
    };

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
        var isVisible = settings.isBackVisible ? settings.isBackVisible(index) : index > 0;

        backButton.classList.toggle("is-visible", isVisible);
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

      if (settings.onStepChange) {
        settings.onStepChange(next, api);
      }
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
      var data = traits[trait];
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

        var animationProgress = Math.min((time - startTime) / duration, 1);
        var currentValue = start + (value - start) * animationProgress;

        element.textContent = currentValue.toFixed(1);

        if (animationProgress < 1) {
          window.requestAnimationFrame(update);
        }
      }

      window.requestAnimationFrame(update);
    }

    function toggleAccordion(accordionButton) {
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
        var accordionButton = event.target.closest("[data-accordion-button]");

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

        if (accordionButton) {
          toggleAccordion(accordionButton);
          return;
        }

        if (settings.onStageClick) {
          settings.onStageClick(event, api);
        }
      });

      if (backButton) {
        backButton.addEventListener("click", function () {
          if (settings.onBack && settings.onBack(api)) {
            return;
          }

          moveStep(current - 1);
        });
      }

      renderProgress(0);
    }

    document.querySelectorAll(".is-open [data-accordion-panel]").forEach(function (panel) {
      panel.style.maxHeight = panel.scrollHeight + "px";
    });

    initDesktopReality();

    document.addEventListener("click", function (event) {
      var desktopAccordionButton = event.target.closest(".la-page--desktop [data-accordion-button]");

      if (desktopAccordionButton) {
        toggleAccordion(desktopAccordionButton);
        return;
      }

      var desktopChoice = event.target.closest(".la-page--desktop [data-choice]");

      if (!desktopChoice) {
        return;
      }

      setSelectedChoice(desktopChoice);
      updatePersonalResult(desktopChoice.getAttribute("data-trait"));
    });
  }

  window.InsuranceLanding = {
    init: init
  };
})();