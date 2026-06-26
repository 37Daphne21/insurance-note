const header = document.querySelector(".header");
const sections = document.querySelectorAll(".section[id]");
const progressLinks = document.querySelectorAll(".progress-nav__link");
const floatingCta = document.querySelector(".floating-cta");
const revealTargets = document.querySelectorAll(".section-heading, .worry-card, .insurance-card, .case-card, .guide-card, .team__content, .request-box, .consult__content, .consult-form");
const consultForm = document.querySelector(".consult-form");
const interestSelect = document.querySelector("#interest");
const interestLinks = document.querySelectorAll("[data-interest]");
const hero = document.querySelector(".hero");
const heroVisual = document.querySelector(".hero__visual");
const heroTabs = document.querySelectorAll(".hero__tab");
const heroPanels = document.querySelectorAll(".hero-card-panel");
const heroCards = document.querySelectorAll(".hero-card");

const headerScrollClass = "is-scrolled";
const activeClass = "is-active";
const revealClass = "is-revealed";
const hiddenClass = "is-hidden";
const currentClass = "is-current";
const dimmedClass = "is-dimmed";

const setHeaderState = () => {
  if (!header) return;

  header.classList.toggle(headerScrollClass, window.scrollY > 24);
};

const setFloatingCtaState = () => {
  if (!floatingCta) return;

  const consultSection = document.querySelector("#consult");
  const isNearTop = window.scrollY < 360;
  const isInConsult = consultSection && window.scrollY + window.innerHeight > consultSection.offsetTop;

  floatingCta.classList.toggle(hiddenClass, isNearTop || isInConsult);
};

const setActiveProgress = () => {
  if (!sections.length || !progressLinks.length) return;

  let currentId = sections[0].id;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - window.innerHeight * .35;

    if (window.scrollY >= sectionTop) {
      currentId = section.id;
    }
  });

  progressLinks.forEach((link) => {
    const linkId = link.getAttribute("href").replace("#", "");

    link.classList.toggle(activeClass, linkId === currentId);
  });
};

const setInterestValue = (value) => {
  if (!interestSelect || !value) return;

  interestSelect.value = value;
};

const initInterestLinks = () => {
  if (!interestLinks.length) return;

  interestLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setInterestValue(link.dataset.interest);
    });
  });
};

const initReveal = () => {
  if (!revealTargets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add(revealClass);
      observer.unobserve(entry.target);
    });
  }, {
    threshold: .16,
    rootMargin: "0px 0px -8% 0px",
  });

  revealTargets.forEach((target) => {
    observer.observe(target);
  });
};

const clearHeroCards = () => {
  heroCards.forEach((card) => {
    card.classList.remove(activeClass, dimmedClass);
  });
};

const setActiveHeroCard = (selectedCard) => {
  heroCards.forEach((card) => {
    const isSelected = card === selectedCard;

    card.classList.toggle(activeClass, isSelected);
    card.classList.toggle(dimmedClass, !isSelected);
  });
};

const toggleHeroCard = (selectedCard) => {
  const isActive = selectedCard.classList.contains(activeClass);

  if (isActive) {
    clearHeroCards();
    return;
  }

  setActiveHeroCard(selectedCard);
};

const setCurrentHeroPanel = (key) => {
  if (!key) return;

  heroTabs.forEach((tab) => {
    const isCurrent = tab.dataset.heroTab === key;

    tab.classList.toggle(activeClass, isCurrent);
    tab.setAttribute("aria-selected", isCurrent ? "true" : "false");
    tab.setAttribute("tabindex", isCurrent ? "0" : "-1");
  });

  heroPanels.forEach((panel) => {
    const isCurrent = panel.dataset.heroPanel === key;

    panel.classList.toggle(currentClass, isCurrent);
    panel.setAttribute("aria-hidden", isCurrent ? "false" : "true");
  });

  clearHeroCards();
};

const initHeroTabs = () => {
  if (!hero || !heroTabs.length || !heroPanels.length) return;

  heroTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      setCurrentHeroPanel(tab.dataset.heroTab);
    });

    tab.addEventListener("keydown", (event) => {
      const isNext = event.key === "ArrowRight";
      const isPrev = event.key === "ArrowLeft";

      if (!isNext && !isPrev) return;

      event.preventDefault();

      const nextIndex = isNext ? (index + 1) % heroTabs.length : (index - 1 + heroTabs.length) % heroTabs.length;
      const nextTab = heroTabs[nextIndex];

      nextTab.focus();
      setCurrentHeroPanel(nextTab.dataset.heroTab);
    });
  });

  const currentTab = [...heroTabs].find((tab) => tab.classList.contains(activeClass)) || heroTabs[0];

  setCurrentHeroPanel(currentTab.dataset.heroTab);
};

const initHeroCards = () => {
  if (!heroVisual || !heroCards.length) return;

  heroCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleHeroCard(card);
    });
  });

  heroVisual.addEventListener("click", () => {
    clearHeroCards();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    clearHeroCards();
  });
};

const validateForm = () => {
  if (!consultForm) return;

  consultForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = consultForm.querySelector("#user-name");
    const phoneInput = consultForm.querySelector("#user-phone");
    const agreeInput = consultForm.querySelector("[name='privacyAgree']");

    if (!nameInput.value.trim()) {
      alert("이름을 입력해주세요.");
      nameInput.focus();
      return;
    }

    if (!phoneInput.value.trim()) {
      alert("연락처를 입력해주세요.");
      phoneInput.focus();
      return;
    }

    if (!agreeInput.checked) {
      alert("개인정보 수집 및 이용에 동의해주세요.");
      agreeInput.focus();
      return;
    }

    alert("상담 신청 기능은 추후 연동 예정입니다.");
  });
};

const handleScroll = () => {
  setHeaderState();
  setFloatingCtaState();
  setActiveProgress();
};

window.addEventListener("scroll", handleScroll, { passive: true });
window.addEventListener("resize", handleScroll);
window.addEventListener("load", handleScroll);

initInterestLinks();
initReveal();
initHeroTabs();
initHeroCards();
validateForm();
handleScroll();