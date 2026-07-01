// JavaScript Document
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links > a[href$=".html"]').forEach(link => {
  if (link.getAttribute('href') === currentPage) link.classList.add('active');
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

/* interactive map section*/
const teamModal = document.getElementById('teamModal');
const teamModalImg = document.getElementById('teamModalImg');
const teamModalKicker = document.getElementById('teamModalKicker');
const teamModalTitle = document.getElementById('teamModalTitle');
const teamModalText = document.getElementById('teamModalText');
const teamModalLink = document.getElementById('teamModalLink');

const teamCards = {
  missouri1: {
    image: 'images/Flint-Garcia Lab.jpeg',
    kicker: 'Missouri, USA',
    title: 'Flint-Garcia Lab',
    text: 'Optimizing maize nitrogen mobilization to create natural slow-release fertilizers.',
    link: 'https://flint-garcias.mufaculty.umsystem.edu/'  
 },
  newyork1: {
    image: 'images/Buckler-lab.avif',
    kicker: 'New York, USA',
    title: 'Buckler, Costich, Romay Lab',
    text: 'Regional expertise in maize adaptation, agricultural systems, and producer-centered innovation.',
    link: 'https://www.maizegenetics.net/'  
  },
  northcarolina1: {
    image: 'images/ruben-rellan-lab.jpg',
    kicker: 'North Carolina, USA',
    title: 'Rellan-Alvarez Lab',
    text: 'Elucidating metabolic and morphological mechanisms for plant nutrient-stress adaptation.',
    link: 'https://www.gemmalab.org/' 
  },
  minnesota: {
    image: 'images/hirsch-lab2.png',
    kicker: 'Minnesota, USA',
    title: 'Hirsch Lab',
    text: 'Understanding genes regulating kernel nitrogen and stover-driven nitrogen loss.',
    link: 'https://hirschlab.cfans.umn.edu//' 
  },
  oregon: {
    image: 'images/VictorRaboy.jpg',
    kicker: 'Oregon, USA',
    title: 'Victor Raboy',
    text: ''
  },    
  iowa1: {
    image: 'images/hufford-lab.png',
    kicker: 'Iowa, USA',
    title: 'Hufford Lab',
    text: '',
    link: 'https://www.zeagenomics.org/' 
  },
  california1: {
    image: 'images/michael-lab.jpg',
    kicker: 'California, USA',
    title: 'Michael Lab',
    text: 'Deploying molecular and computational approaches to sustain future food, fiber, and fuel.',
    link: 'https://michael.salk.edu/' 
  },    
  california2: {
    image: 'images/CERCA_logo.png',
    kicker: 'California, USA',
    title: 'Busch Lab',
    text: 'Leveraging fundamental root biology to engineer climate-resilient crop systems.',
    link: 'https://busch.salk.edu/' 
  },
  texas1: {
    image: 'images/CERCA_logo.png',
    kicker: 'Texas, USA',
    title: 'Murray Lab',
    text: 'Seeking to reduce nitrogen inputs and loss.',
    link: 'https://soilcrop.tamu.edu/people/murray-seth-c/' 
  },    
  texas2: {
    image: 'images/SakikoOkumoto.jpg',
    kicker: 'Texas, USA',
    title: 'Okumoto Lab',
    text: 'Focused on how amino acids are transported within live plant cells.',
    link: 'https://soilcrop.tamu.edu/people/okumoto-sakiko/' 
  }, 
  texas3: {
    image: 'images/CERCA_logo.png',
    kicker: 'Texas, USA',
    title: 'Junping Chen',
    text: 'Advancing heat and drought tolerance concepts to develop emproved crop germplasm.',
    link: 'https://www.ars.usda.gov/plains-area/lubbock-tx/cropping-systems-research-laboratory/plant-stress-and-germplasm-development-research/people/jumping-chen/' 
  }, 
  florida: {
    image: 'images/CharlieMessina.jpg',
    kicker: 'Florida, USA',
    title: 'Messina Lab',
    text: 'Focused in crop modeling and improvement.',
    link: 'https://hos.ifas.ufl.edu/people/on-campus-faculty/carlos-d-messina/' 
  }, 
  missouri2: {
    image: 'images/WashburnLab3.jpeg',
    kicker: 'Missouri, USA',
    title: 'Washburn Lab',
    text: 'Leveraging genetic diversity to improve plant resilience.',
    link: 'https://jacobwashburn-usda.github.io/LabProtocols/about.html' 
  }, 
  wisconsin1: {
    image: 'images/CERCA_logo.png',
    kicker: 'Wisconsin, USA',
    title: 'de Leon Lab',
    text: '',
    link: 'https://cornbreeding.wisc.edu/' 
  }, 
  wisconsin2: {
    image: 'images/CERCA_logo.png',
    kicker: 'Wisconsin, USA',
    title: 'Kaeppler Lab',
    text: 'Dedicated to plant transformation and regeneration from tissue culture.',
    link: 'https://www.glbrc.org/about/directory/shawn-kaeppler-0' 
  }, 
  michigan: {
    image: 'images/BrunoBasso.jpg',
    kicker: 'Michigan, USA',
    title: 'Basso Lab',
    text: 'Evaluating how climate shifts affect farming and crop systems.',
    link: 'https://basso.glg.msu.edu/?_gl=1*7wblr7*_ga*NzY3Mzg5OTc3LjE3ODE2MjU5MjU.*_ga_D7271B6VVJ*czE3ODE2MjU5MjgkbzEkZzAkdDE3ODE2MjU5MjgkajYwJGwwJGgw' 
  }, 
  nebraska1: {
    image: 'images/CERCA_logo.png',
    kicker: 'Nebraska, USA',
    title: 'Jin Lab',
    text: 'Evaluating soil and yield impacts of corn stover removal in rainfed and irrigated systems.',
    link: 'https://agronomy.unl.edu/jin/' 
  }, 
  michigan2: {
    image: 'images/CERCA_logo.png',
    kicker: 'Michigan, USA',
    title: 'Roston Lab',
    text: '',
    link: 'https://www.rostonlab.com/' 
  }, 
  nebraska3: {
    image: 'images/DavidHolding.jpg',
    kicker: 'Nebraska, USA',
    title: 'David Holding',
    text: 'Specializing in seed protein accumulation',
    link: 'https://holdinglab.unl.edu/' 
  }, 
  northcarolina2: {
    image: 'images/jimholland-lab.jpg',
    kicker: 'North Carolina, USA',
    title: 'Jim Holland',
    text: 'Elucidating the genetic architecture and diversity within Zea mays.',
    link: 'https://cals.ncsu.edu/crop-and-soil-sciences/people/jholland/' 
  }, 
  iowa2: {
    image: 'images/CERCA_logo.png',
    kicker: 'Iowa, USA',
    title: 'Emmett Lab',
    text: 'Understanding environmental and microbial controls on nitrogen cycling and loss from soil.',
    link: 'https://www.ars.usda.gov/midwest-area/ames/nlae/people/bryan-emmett/' 
  },
  iowa3: {
    image: 'images/CERCA_logo.png',
    kicker: 'Iowa, USA',
    title: 'Scott Lab',
    text: 'Investigating the genetic architecture behind economically valuable crop traits.',
    link: 'https://www.ars.usda.gov/midwest-area/ames/cicgru/people/paul-scott/' 
  },
  iowa4: {
    image: 'images/CERCA_logo.png',
    kicker: 'Iowa, USA',
    title: 'Castellano Lab',
    text: 'Integrating biogeochemical and agronomic frameworks to maximize crop yield while minimizing nitrogen loss.',
    link: 'https://www.agron.iastate.edu/people/castellano-michael/' 
  },
  illinois1: {
    image: 'images/CERCA_logo.png',
    kicker: 'Illinois, USA',
    title: 'Ainsworth Lab',
    text: 'Testing mitigation strategies for reducing greenhouse gases from agricultural systems.',
    link: 'https://publish.illinois.edu/ainsworthlab/' 
  },
  illinois3: {
    image: 'images/CERCA_logo.png',
    kicker: 'Illinois, USA',
    title: 'Kaiyu Guan',
    text: '',
    link: 'https://nres.illinois.edu/directory/kaiyug' 
  },
 newyork2: {
    image: 'images/CERCA_logo.png',
    kicker: 'New York, USA',
    title: 'Gore Lab',
    text: 'Focusing in transcriptional regulation in low temperature responses.',
    link: 'https://blogs.cornell.edu/gorelab/' 
  },
 newyork3: {
    image: 'images/CERCA_logo.png',
    kicker: 'New York, USA',
    title: 'Jian Hua',
    text: 'Revealing natural variants that confer adaptation to environment.',
    link: 'https://blogs.cornell.edu/jianhualab/' 
  },
 newyork4: {
    image: 'images/CERCA_logo.png',
    kicker: 'New York, USA',
    title: 'Pineros Lab',
    text: '',
    link: 'https://cals.cornell.edu/people/miguel-pineros' 
  },
   pennsylvania1: {
    image: 'images/RuairidhSawers.jpeg',
    kicker: 'Penssylvania, USA',
    title: 'Sawers Lab',
    text: 'Revealing local adaptation and stress tolerance in crop plants and their wild relatives.',
    link: 'https://iee.psu.edu/people/ruairidh-sawers' 
  },
  michigan3: {
    image: 'images/RuthieAngelovici.jpg',
    kicker: 'Michigan, USA',
    title: 'Angelovici Lab',
    text: 'Uncovering the metabolic and genetic mechanisms driving the amino acid network’s response.',
    link: 'https://scholars.msu.edu/scholar/904409/RUTHIE-ANGELOVICI?unitId=667&unitType=2' 
  },
};

document.querySelectorAll('.map-hotspot').forEach(button => {
  button.addEventListener('click', () => {
    const team = teamCards[button.dataset.team];
    if (!team || !teamModal) return;

    teamModalImg.src = team.image;
    teamModalImg.alt = team.title;
    teamModalKicker.textContent = team.kicker;
    teamModalTitle.textContent = team.title;
    teamModalText.textContent = team.text;
      
    if (team.link){
        teamModalLink.href=team.link;
        teamModalLink.style.display='inline-flex';
    }else{
        teamModalLink.style.display = 'none';
    }

    teamModal.classList.add('open');
    teamModal.setAttribute('aria-hidden', 'false');
  });
});

document.querySelectorAll('[data-close-team-modal]').forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    teamModal.classList.remove('open');
    teamModal.setAttribute('aria-hidden', 'true');
  });
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && teamModal.classList.contains('open')) {
    teamModal.classList.remove('open');
    teamModal.setAttribute('aria-hidden', 'true');
  }
});


/* end of interactive map section*/





window.addEventListener('load', () => { syncNavHeights(); updateNavShadow(); updateActiveSection(); updateFloatingIndicator();});
window.addEventListener('resize', () => { syncNavHeights(); updateActiveSection(); updateFloatingIndicator(); });
window.addEventListener('scroll', () => { updateNavShadow(); updateActiveSection(); updateFloatingIndicator(); }, { passive: true });




