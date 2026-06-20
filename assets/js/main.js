const header = document.querySelector(".header");
const sections = document.querySelectorAll(".section[id]");
const progressLinks = document.querySelectorAll(".progress-nav__link");
const floatingCta = document.querySelector(".floating-cta");
const revealTargets = document.querySelectorAll(".section-heading, .worry-card, .insurance-card, .case-card, .guide-card, .team__content, .request-box, .consult__content, .consult-form");
const consultForm = document.querySelector(".consult-form");
const interestSelect = document.querySelector("#interest");
const interestLinks = document.querySelectorAll("[data-interest]");
const heroVisual = document.querySelector(".hero__visual");
const heroCards = document.querySelectorAll(".hero-card");

const headerScrollClass = "is-scrolled";
const activeClass = "is-active";
const revealClass = "is-revealed";
const hiddenClass = "is-hidden";

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

const initHeroMotion = () => {
  if (!heroVisual || !heroCards.length) return;

  heroVisual.addEventListener("mousemove", (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;

    heroCards.forEach((card, index) => {
      const depth = (index + 1) * 8;
      const moveX = x * depth;
      const moveY = y * depth;

      card.style.setProperty("--move-x", `${moveX}px`);
      card.style.setProperty("--move-y", `${moveY}px`);
    });
  });

  heroVisual.addEventListener("mouseleave", () => {
    heroCards.forEach((card) => {
      card.style.setProperty("--move-x", "0px");
      card.style.setProperty("--move-y", "0px");
    });
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
initHeroMotion();
validateForm();
handleScroll();