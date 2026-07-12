(function () {
  var TRAITS = {
    active: {
      eyebrow: "수술비가 가장 걱정된다면",
      headline: "암·뇌·심 수술비가<br>수술할 때마다 준비되는지<br>먼저 살펴보면 좋아요.",
      sub: "진단금과 별개로 실제 치료 과정에서 반복 지급되는 구조인지 확인해요.",
      points: [
        {
          title: "수술 반복 보장",
          description: "질병별·수술별 지급 기준과 횟수를 같이 확인해요."
        },
        {
          title: "급여·비급여 범위",
          description: "치료 방법에 따라 빠지는 항목이 없는지 살펴봐요."
        }
      ]
    },
    curious: {
      eyebrow: "항암치료가 가장 걱정된다면",
      headline: "표적·면역·방사선처럼<br>넓어진 치료 방법을<br>함께 살펴보면 좋아요.",
      sub: "치료 기술이 다양해진 만큼 어떤 치료까지 준비되는지가 중요해요.",
      points: [
        {
          title: "항암약물 범위",
          description: "표적·면역항암약물 등 치료 종류별 기준을 확인해요."
        },
        {
          title: "방사선 치료",
          description: "반복 치료와 연간 한도를 함께 살펴봐요."
        }
      ]
    },
    calm: {
      eyebrow: "뇌·심장 치료가 걱정된다면",
      headline: "암만이 아니라<br>뇌·심장 수술과 혈전 치료까지<br>넓게 살펴보면 좋아요.",
      sub: "한 가지 질병만 보는 구조보다 주요 치료를 함께 준비하는지 확인해요.",
      points: [
        {
          title: "뇌·심장 수술",
          description: "수술 1회가 아니라 반복 지급 기준을 살펴봐요."
        },
        {
          title: "혈전용해 치료",
          description: "응급 치료에 필요한 보장이 포함되는지 확인해요."
        }
      ]
    },
    senior: {
      eyebrow: "보험료가 가장 걱정된다면",
      headline: "보장 범위를 넓히면서도<br>월 보험료를 감당 가능한 수준으로<br>맞추는 게 중요해요.",
      sub: "많이 넣는 것보다 오래 유지할 수 있는 구조인지 함께 봐요.",
      points: [
        {
          title: "갱신 구조",
          description: "갱신 주기와 향후 보험료 변화를 확인해요."
        },
        {
          title: "기존 보장 활용",
          description: "이미 있는 보장은 유지하고 부족한 부분만 보완해요."
        }
      ]
    }
  };

  window.InsuranceLanding.init({
    traits: TRAITS
  });
})();