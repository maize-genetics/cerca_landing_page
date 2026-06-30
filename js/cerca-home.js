// JavaScript Document
const premiumHero = document.querySelector('.hero-premium');
const heroBgWebp = document.getElementById('heroBgWebp');
const heroCopyPremium = document.querySelector('.hero-copy-premium');
const reduceHeroMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function updatePremiumHero() {
  if (!premiumHero || !heroBgWebp || reduceHeroMotion) return;
  const rect = premiumHero.getBoundingClientRect();
  const heroHeight = rect.height || window.innerHeight || 1;
  const progress = Math.min(Math.max(-rect.top / heroHeight, 0), 1);
  heroBgWebp.style.transform = `translate3d(0, ${progress * -78}px, 0) scale(${1.10 - (progress * 0.09)})`;
  heroBgWebp.style.filter = `saturate(1.02) contrast(1.03) brightness(${0.80 + (progress * 0.08)})`;
  if (heroCopyPremium) heroCopyPremium.style.transform = `translate3d(0, ${progress * -20}px, 0)`;
}
window.addEventListener('scroll', updatePremiumHero, { passive: true });
window.addEventListener('resize', updatePremiumHero);
updatePremiumHero();

const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.16 });
reveals.forEach(el => revealObserver.observe(el));

const scienceFlow = document.getElementById('scienceFlowTrack');
if (scienceFlow) {
  const flowSteps = scienceFlow.querySelectorAll('.flow-step');
  const flowArrows = scienceFlow.querySelectorAll('.flow-arrow');

  flowSteps.forEach((step, index) => step.classList.add(`step-delay-${index + 1}`));
  flowArrows.forEach((arrow, index) => arrow.classList.add(`arrow-delay-${index + 1}`));

  const flowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      flowSteps.forEach((step, index) => setTimeout(() => step.classList.add('active'), index * 260));
      flowArrows.forEach((arrow, index) => setTimeout(() => arrow.classList.add('active'), (index * 260) + 130));
      flowObserver.unobserve(entry.target);
    });
  }, { threshold: 0.22 });

  flowObserver.observe(scienceFlow);
}
