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

  var petOpening = document.querySelector(".pet-opening");
  var petImages = petOpening ? petOpening.querySelectorAll(".pet-visual__image") : [];
  var selectedPetType = "dog";

  function updatePetStat(pet, animateNumber) {
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

  window.InsuranceLanding.init({
    traits: TRAITS,
    isBackVisible: function (index) {
      return index > 0 || Boolean(petOpening && petOpening.classList.contains("is-selected"));
    },
    onStepChange: function (next, api) {
      if (next.classList.contains("la-step--reality")) {
        updatePetStat(selectedPetType, api.animateNumber);
      }
    },
    onStageClick: function (event, api) {
      var petButton = event.target.closest("[data-pet-select]");

      if (!petButton || !petOpening) {
        return;
      }

      selectedPetType = petButton.getAttribute("data-pet-select");
      petOpening.classList.remove("is-selecting");
      petOpening.classList.add("is-selected");
      petOpening.dataset.pet = selectedPetType;

      petImages.forEach(function (image) {
        image.classList.toggle("is-active", image.dataset.pet === selectedPetType);
      });

      api.renderProgress();
    },
    onBack: function (api) {
      if (api.getCurrent() !== 0 || !petOpening || !petOpening.classList.contains("is-selected")) {
        return false;
      }

      petOpening.classList.remove("is-selected");
      petOpening.classList.add("is-selecting");
      petOpening.removeAttribute("data-pet");

      petImages.forEach(function (image) {
        image.classList.remove("is-active");
      });

      api.renderProgress();
      return true;
    }
  });
})();