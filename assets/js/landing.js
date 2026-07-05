(function () {
  var TRAITS = {
    active: {
      headline: "활동량이 많은 아이는<br>관절·인대 쪽 병원을<br>찾는 일이 잦아요.",
      sub: "이런 상담도 자주 받아요."
    },
    curious: {
      headline: "호기심이 많은 아이는<br>작은 사고로 병원을<br>찾는 일이 종종 있어요.",
      sub: "미리 알아두면 마음이 편해질 수 있어요."
    },
    calm: {
      headline: "활동이 적은 아이는<br>체중·관절 쪽을<br>신경 쓰는 보호자가 많아요.",
      sub: "이런 상담도 자주 받아요."
    },
    senior: {
      headline: "나이가 있는 아이는<br>검진·관리 비용을<br>미리 챙기는 분이 많아요.",
      sub: "미리 알아두면 마음이 편해질 수 있어요."
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
  }

  function updatePersonalResult(trait) {
    var data = TRAITS[trait];
    var titles = document.querySelectorAll("[data-personal-title]");
    var descriptions = document.querySelectorAll("[data-personal-description]");

    if (!data) {
      return;
    }

    titles.forEach(function (title) {
      title.innerHTML = data.headline;
    });

    descriptions.forEach(function (description) {
      description.textContent = data.sub;
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

      var petButton = event.target.closest("[data-pet-select]");

      if (petButton && petOpening) {
        var selectedPet = petButton.getAttribute("data-pet-select");

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
  }

  document.addEventListener("click", function (event) {
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