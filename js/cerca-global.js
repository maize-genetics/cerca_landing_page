// JavaScript Document
const pageSlug = path => {
  const slug = path.split(/[?#]/)[0].split('/').pop().replace(/\.html$/, '');
  return slug === '' || slug === '.' || slug === 'index' ? 'index' : slug;
};
const currentPage = pageSlug(window.location.pathname);
document.querySelectorAll('.nav-links > a').forEach(link => {
  if (pageSlug(link.getAttribute('href')) === currentPage) link.classList.add('active');
});

const navWrap = document.getElementById('siteNav') || document.querySelector('.nav-wrap');
const sectionNav = document.getElementById('sectionNav');
const navLinks = document.getElementById('navLinks');
const mobileToggle = document.getElementById('mobileToggle');
const drop = document.querySelector('.drop');
const dropBtn = document.querySelector('.drop-btn');
const sectionLinks = document.querySelectorAll('.section-link');
const floatingDots = document.querySelectorAll('.floating-dot');
const themeToggle = document.getElementById('themeToggle');
const themeToggleLabel = document.querySelector('.theme-toggle-label');

function syncNavHeights() {
  if (navWrap) document.documentElement.style.setProperty('--primary-nav-height', `${navWrap.offsetHeight}px`);
  if (sectionNav && getComputedStyle(sectionNav).display !== 'none') {
    document.documentElement.style.setProperty('--secondary-nav-height', `${sectionNav.offsetHeight}px`);
  } else {
    document.documentElement.style.setProperty('--secondary-nav-height', `0px`);
  }
}
function updateNavShadow() {
  if (navWrap) navWrap.classList.toggle('scrolled', window.scrollY > 10);
  if (sectionNav) sectionNav.classList.toggle('scrolled', window.scrollY > 40);
}
if (mobileToggle && navLinks) {
  mobileToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
}
if (dropBtn && drop) {
  dropBtn.addEventListener('click', (e) => {
    if (window.innerWidth <= 960) {
      e.preventDefault();
      drop.classList.toggle('open');
    }
  });
}
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 960 && navLinks) {
      navLinks.classList.remove('open');
      if (drop) drop.classList.remove('open');
    }
  });
});

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('theme-dark', isDark);
  if (themeToggle) themeToggle.setAttribute('aria-pressed', String(isDark));
  if (themeToggleLabel) themeToggleLabel.textContent = isDark ? 'Dark' : 'Light';
  localStorage.setItem('cerca-theme', theme);
}
const savedTheme = localStorage.getItem('cerca-theme');
if (savedTheme) {
  applyTheme(savedTheme);
} else {
  applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    applyTheme(document.body.classList.contains('theme-dark') ? 'light' : 'dark');
  });
}

/*const sections = [
  document.getElementById('top'),
  document.getElementById('about'),
  document.getElementById('impact'),
  document.getElementById('science'),
  document.getElementById('funding'),
  document.getElementById('join'),
  document.getElementById('blog')
].filter(Boolean);*/

const sections = [
    ...document.querySelectorAll('[data-section-link]')
].map(link => {
    const target = link.getAttribute('data-section-link');
    return document.querySelector(target);
}).filter(Boolean);

function updateActiveSection() {
    if(window.innerWidth <= 1024) return;
      
  const triggerLine =
    (navWrap ? navWrap.offsetHeight : 84) +
    (sectionNav && getComputedStyle(sectionNav).display !== 'none' ? sectionNav.offsetHeight : 0) + 24;
    /*(sectionNav ? sectionNav.offsetHeight : 52) + 40;*/
    
    let currentId = '#top';
    
    const topSection = document.getElementById('top');
    
    if(topSection){
        const  topRec = topSection.getBoundingClientRect();
        if(topRec.top <= triggerLine && topRec.bottom > triggerLine) {
            currentId = '#top';
        }    
    }
    sections.forEach(section => {
        if(section.id === 'top') return;
        
        const rect = section.getBoundingClientRect();
        
        if(rect.top <= triggerLine && rect.bottom > triggerLine) {
            currentId = `#${section.id}`;
        }
    });
    
    sectionLinks.forEach(link => {
        link.classList.toggle(
        'active',
        link.getAttribute('data-section-link') === currentId
        );
    });
}

function updateFloatingIndicator(){
    if(window.innerWidth > 1024 || !floatingDots.length || !sections.length) return;
    
    let currentId = '#top';
    
  const navOffset =
    (navWrap ? navWrap.offsetHeight : 84) +
    (sectionNav && getComputedStyle(sectionNav).display !== 'none' ? sectionNav.offsetHeight : 0) + 24;
    /*(sectionNav ? sectionNav.offsetHeight : 52) + 40;*/
    
    const topSection = document.getElementById('top');
    const heroBottom = topSection ? topSection.offsetHeight - navOffset : 0;
    
    if(window.scrollY < heroBottom) {
        currentId = '#top';
    } else {
        sections.forEach(section => {
            if (section.id === 'top') return;
            
            const sectionTop = section.offsetTop - navOffset;
            if (window.scrollY >= sectionTop) {
                currentId = `#${section.id}`;
            }
        });
    }
    
    floatingDots.forEach(dot => {
        dot.classList.toggle(
        'active',
        dot.getAttribute('data-float-section') === currentId
        );
    });
}

    
/*  sections.forEach(section => {
    const sectionTop = section.offsetTop - navOffset;
    if (window.scrollY >= sectionTop) currentId = `#${section.id}`;
  });
  sectionLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-section-link') === currentId);
  });
    
  floatingDots.forEach(dot => {
    dot.classList.toggle('active', dot.getAttribute('data-float-section') === currentId);
  });*/


/* nitrogen interactive section */

const figureModal = document.getElementById('figureModal');
const modalKicker = document.getElementById('modalKicker');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');

const nitrogenCards = {
  cob: {
    kicker: 'Cob nitrogen',
    title: 'Leave more nitrogen in the cob',
    text: 'This concept explores whether nitrogen can be retained in non-grain tissues where it supports system-level recycling. By shifting part of the nitrogen story away from grain protein alone, CERCA frames the plant as part of a circular nutrient strategy.'
  },
  grain: {
    kicker: 'Grain composition',
    title: 'Reduce insoluble protein content in the grain',
    text: 'Many maize uses reward starch more than protein. CERCA highlights the possibility of reducing low-value nitrogen investment in insoluble grain protein while preserving productivity and improving overall nitrogen-use efficiency.'
  },
  roots: {
    kicker: 'Root nitrogen sink',
    title: 'Activate a late-season nitrogen sink in roots',
    text: 'Roots can become part of a late-season nitrogen retention strategy. A stronger root sink may help keep nitrogen in the farm system, supporting recycling, soil function, and reduced loss after harvest.'
  }
};

document.querySelectorAll('.figure-hotspot').forEach(button => {
  button.addEventListener('click', () => {
    const cardKey = button.dataset.card;
    const card = nitrogenCards[cardKey];

    if (!card || !figureModal) return;

    modalKicker.textContent = card.kicker;
    modalTitle.textContent = card.title;
    modalText.textContent = card.text;

    figureModal.classList.add('open');
    figureModal.setAttribute('aria-hidden', 'false');
  });
});

document.querySelectorAll('[data-close-modal]').forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    figureModal.classList.remove('open');
    figureModal.setAttribute('aria-hidden', 'true');
  });
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && figureModal.classList.contains('open')) {
    figureModal.classList.remove('open');
    figureModal.setAttribute('aria-hidden', 'true');
  }
});
/*end of nitrogen interactive section*/

/*video volume*/
document.querySelectorAll('.about-video').forEach(video => {
    video.addEventListener('loadedmetadata', () => {
        video.volume = 0.3; // 40% volume
    });
});
/* end of video volume*/






window.addEventListener('load', () => { syncNavHeights(); updateNavShadow(); updateActiveSection(); updateFloatingIndicator();});
window.addEventListener('resize', () => { syncNavHeights(); updateActiveSection(); updateFloatingIndicator(); });
window.addEventListener('scroll', () => { updateNavShadow(); updateActiveSection(); updateFloatingIndicator(); }, { passive: true });




