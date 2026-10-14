// JavaScript Document
/* interactive partner map section*/
const US_ATLAS_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';
const USDA = 'usda';
const UNIVERSITY = 'university';

const teamCards = {
  missouri1: {
    image: 'images/Flint-Garcia Lab.jpeg',
    kicker: 'Missouri, USA',
    title: 'Flint-Garcia Lab',
    text: 'Optimizing maize nitrogen mobilization to create natural slow-release fertilizers.',
    link: 'https://flint-garcias.mufaculty.umsystem.edu/',
    state: 'Missouri',
    place: 'Columbia, MO',
    lat: 38.9426, lon: -92.3221,
    affiliation: USDA
  },
  newyork1: {
    image: 'images/Buckler-lab.avif',
    kicker: 'New York, USA',
    title: 'Buckler, Costich, Romay Lab',
    text: 'Regional expertise in maize adaptation, agricultural systems, and producer-centered innovation.',
    link: 'https://www.maizegenetics.net/',
    state: 'New York',
    place: 'Ithaca, NY',
    lat: 42.4487, lon: -76.4668,
    affiliation: USDA
  },
  northcarolina1: {
    image: 'images/ruben-rellan-lab.jpg',
    kicker: 'North Carolina, USA',
    title: 'Rellan-Alvarez Lab',
    text: 'Elucidating metabolic and morphological mechanisms for plant nutrient-stress adaptation.',
    link: 'https://www.gemmalab.org/',
    state: 'North Carolina',
    place: 'Raleigh, NC',
    lat: 35.7868, lon: -78.6795,
    affiliation: UNIVERSITY
  },
  minnesota: {
    image: 'images/hirsch-lab2.png',
    kicker: 'Minnesota, USA',
    title: 'Hirsch Lab',
    text: 'Understanding genes regulating kernel nitrogen and stover-driven nitrogen loss.',
    link: 'https://hirschlab.cfans.umn.edu//',
    state: 'Minnesota',
    place: 'St. Paul, MN',
    lat: 44.9846, lon: -93.1847,
    affiliation: UNIVERSITY
  },
  oregon: {
    image: 'images/VictorRaboy.jpg',
    kicker: 'Oregon, USA',
    title: 'Victor Raboy',
    text: '',
    state: 'Oregon',
    place: 'Corvallis, OR',
    lat: 44.5646, lon: -123.262,
    affiliation: UNIVERSITY
  },
  iowa1: {
    image: 'images/hufford-lab.png',
    kicker: 'Iowa, USA',
    title: 'Hufford Lab',
    text: '',
    link: 'https://www.zeagenomics.org/',
    state: 'Iowa',
    place: 'Ames, IA',
    lat: 42.0266, lon: -93.6465,
    affiliation: UNIVERSITY
  },
  california1: {
    image: 'images/michael-lab.jpg',
    kicker: 'California, USA',
    title: 'Michael Lab',
    text: 'Deploying molecular and computational approaches to sustain future food, fiber, and fuel.',
    link: 'https://michael.salk.edu/',
    state: 'California',
    place: 'La Jolla, CA',
    lat: 32.8873, lon: -117.2454,
    affiliation: UNIVERSITY
  },
  california2: {
    image: 'images/CERCA_logo.png',
    kicker: 'California, USA',
    title: 'Busch Lab',
    text: 'Leveraging fundamental root biology to engineer climate-resilient crop systems.',
    link: 'https://busch.salk.edu/',
    state: 'California',
    place: 'La Jolla, CA',
    lat: 32.8873, lon: -117.2454,
    affiliation: UNIVERSITY
  },
  texas1: {
    image: 'images/CERCA_logo.png',
    kicker: 'Texas, USA',
    title: 'Murray Lab',
    text: 'Seeking to reduce nitrogen inputs and loss.',
    link: 'https://soilcrop.tamu.edu/people/murray-seth-c/',
    state: 'Texas',
    place: 'College Station, TX',
    lat: 30.6102, lon: -96.345,
    affiliation: UNIVERSITY
  },
  texas2: {
    image: 'images/SakikoOkumoto.jpg',
    kicker: 'Texas, USA',
    title: 'Okumoto Lab',
    text: 'Focused on how amino acids are transported within live plant cells.',
    link: 'https://soilcrop.tamu.edu/people/okumoto-sakiko/',
    state: 'Texas',
    place: 'College Station, TX',
    lat: 30.6102, lon: -96.345,
    affiliation: UNIVERSITY
  },
  texas3: {
    image: 'images/CERCA_logo.png',
    kicker: 'Texas, USA',
    title: 'Junping Chen',
    text: 'Advancing heat and drought tolerance concepts to develop emproved crop germplasm.',
    link: 'https://www.ars.usda.gov/plains-area/lubbock-tx/cropping-systems-research-laboratory/plant-stress-and-germplasm-development-research/people/jumping-chen/',
    state: 'Texas',
    place: 'Lubbock, TX',
    lat: 33.5944, lon: -101.9033,
    affiliation: USDA
  },
  florida: {
    image: 'images/CharlieMessina.jpg',
    kicker: 'Florida, USA',
    title: 'Messina Lab',
    text: 'Focused in crop modeling and improvement.',
    link: 'https://hos.ifas.ufl.edu/people/on-campus-faculty/carlos-d-messina/',
    state: 'Florida',
    place: 'Gainesville, FL',
    lat: 29.6436, lon: -82.3549,
    affiliation: UNIVERSITY
  },
  missouri2: {
    image: 'images/WashburnLab3.jpeg',
    kicker: 'Missouri, USA',
    title: 'Washburn Lab',
    text: 'Leveraging genetic diversity to improve plant resilience.',
    link: 'https://jacobwashburn-usda.github.io/LabProtocols/about.html',
    state: 'Missouri',
    place: 'Columbia, MO',
    lat: 38.9426, lon: -92.3221,
    affiliation: USDA
  },
  wisconsin1: {
    image: 'images/CERCA_logo.png',
    kicker: 'Wisconsin, USA',
    title: 'de Leon Lab',
    text: '',
    link: 'https://cornbreeding.wisc.edu/',
    state: 'Wisconsin',
    place: 'Madison, WI',
    lat: 43.0742, lon: -89.4125,
    affiliation: UNIVERSITY
  },
  wisconsin2: {
    image: 'images/CERCA_logo.png',
    kicker: 'Wisconsin, USA',
    title: 'Kaeppler Lab',
    text: 'Dedicated to plant transformation and regeneration from tissue culture.',
    link: 'https://www.glbrc.org/about/directory/shawn-kaeppler-0',
    state: 'Wisconsin',
    place: 'Madison, WI',
    lat: 43.0742, lon: -89.4125,
    affiliation: UNIVERSITY
  },
  michigan: {
    image: 'images/BrunoBasso.jpg',
    kicker: 'Michigan, USA',
    title: 'Basso Lab',
    text: 'Evaluating how climate shifts affect farming and crop systems.',
    link: 'https://basso.glg.msu.edu/?_gl=1*7wblr7*_ga*NzY3Mzg5OTc3LjE3ODE2MjU5MjU.*_ga_D7271B6VVJ*czE3ODE2MjU5MjgkbzEkZzAkdDE3ODE2MjU5MjgkajYwJGwwJGgw',
    state: 'Michigan',
    place: 'East Lansing, MI',
    lat: 42.7245, lon: -84.48,
    affiliation: UNIVERSITY
  },
  nebraska1: {
    image: 'images/CERCA_logo.png',
    kicker: 'Nebraska, USA',
    title: 'Jin Lab',
    text: 'Evaluating soil and yield impacts of corn stover removal in rainfed and irrigated systems.',
    link: 'https://agronomy.unl.edu/jin/',
    state: 'Nebraska',
    place: 'Lincoln, NE',
    lat: 40.8366, lon: -96.6803,
    affiliation: USDA
  },
  michigan2: {
    image: 'images/CERCA_logo.png',
    kicker: 'Michigan, USA',
    title: 'Roston Lab',
    text: '',
    link: 'https://www.rostonlab.com/',
    state: 'Michigan',
    place: 'East Lansing, MI',
    lat: 42.7245, lon: -84.48,
    affiliation: UNIVERSITY
  },
  nebraska3: {
    image: 'images/DavidHolding.jpg',
    kicker: 'Nebraska, USA',
    title: 'David Holding',
    text: 'Specializing in seed protein accumulation',
    link: 'https://holdinglab.unl.edu/',
    state: 'Nebraska',
    place: 'Lincoln, NE',
    lat: 40.8366, lon: -96.6803,
    affiliation: UNIVERSITY
  },
  northcarolina2: {
    image: 'images/jimholland-lab.jpg',
    kicker: 'North Carolina, USA',
    title: 'Jim Holland',
    text: 'Elucidating the genetic architecture and diversity within Zea mays.',
    link: 'https://cals.ncsu.edu/crop-and-soil-sciences/people/jholland/',
    state: 'North Carolina',
    place: 'Raleigh, NC',
    lat: 35.7868, lon: -78.6795,
    affiliation: USDA
  },
  iowa2: {
    image: 'images/CERCA_logo.png',
    kicker: 'Iowa, USA',
    title: 'Emmett Lab',
    text: 'Understanding environmental and microbial controls on nitrogen cycling and loss from soil.',
    link: 'https://www.ars.usda.gov/midwest-area/ames/nlae/people/bryan-emmett/',
    state: 'Iowa',
    place: 'Ames, IA',
    lat: 42.0217, lon: -93.6452,
    affiliation: USDA
  },
  iowa3: {
    image: 'images/CERCA_logo.png',
    kicker: 'Iowa, USA',
    title: 'Scott Lab',
    text: 'Investigating the genetic architecture behind economically valuable crop traits.',
    link: 'https://www.ars.usda.gov/midwest-area/ames/cicgru/people/paul-scott/',
    state: 'Iowa',
    place: 'Ames, IA',
    lat: 42.0215, lon: -93.652,
    affiliation: USDA
  },
  iowa4: {
    image: 'images/CERCA_logo.png',
    kicker: 'Iowa, USA',
    title: 'Castellano Lab',
    text: 'Integrating biogeochemical and agronomic frameworks to maximize crop yield while minimizing nitrogen loss.',
    link: 'https://www.agron.iastate.edu/people/castellano-michael/',
    state: 'Iowa',
    place: 'Ames, IA',
    lat: 42.0289, lon: -93.6494,
    affiliation: UNIVERSITY
  },
  illinois1: {
    image: 'images/CERCA_logo.png',
    kicker: 'Illinois, USA',
    title: 'Ainsworth Lab',
    text: 'Testing mitigation strategies for reducing greenhouse gases from agricultural systems.',
    link: 'https://publish.illinois.edu/ainsworthlab/',
    state: 'Illinois',
    place: 'Urbana, IL',
    lat: 40.102, lon: -88.2272,
    affiliation: UNIVERSITY
  },
  illinois3: {
    image: 'images/CERCA_logo.png',
    kicker: 'Illinois, USA',
    title: 'Kaiyu Guan',
    text: '',
    link: 'https://nres.illinois.edu/directory/kaiyug',
    state: 'Illinois',
    place: 'Urbana, IL',
    lat: 40.1016, lon: -88.2238,
    affiliation: UNIVERSITY
  },
  newyork2: {
    image: 'images/CERCA_logo.png',
    kicker: 'New York, USA',
    title: 'Gore Lab',
    text: 'Focusing in transcriptional regulation in low temperature responses.',
    link: 'https://blogs.cornell.edu/gorelab/',
    state: 'New York',
    place: 'Ithaca, NY',
    lat: 42.4482, lon: -76.4779,
    affiliation: UNIVERSITY
  },
  newyork3: {
    image: 'images/JianHua.jpg',
    kicker: 'New York, USA',
    title: 'Jian Hua',
    text: 'Revealing natural variants that confer adaptation to environment.',
    link: 'https://blogs.cornell.edu/jianhualab/',
    state: 'New York',
    place: 'Ithaca, NY',
    lat: 42.4478, lon: -76.4768,
    affiliation: UNIVERSITY
  },
  newyork4: {
    image: 'images/CERCA_logo.png',
    kicker: 'New York, USA',
    title: 'Pineros Lab',
    text: '',
    link: 'https://cals.cornell.edu/people/miguel-pineros',
    state: 'New York',
    place: 'Ithaca, NY',
    lat: 42.4487, lon: -76.4668,
    affiliation: USDA
  },
  pennsylvania1: {
    image: 'images/RuairidhSawers.jpeg',
    kicker: 'Pennsylvania, USA',
    title: 'Sawers Lab',
    text: 'Revealing local adaptation and stress tolerance in crop plants and their wild relatives.',
    link: 'https://iee.psu.edu/people/ruairidh-sawers',
    state: 'Pennsylvania',
    place: 'State College, PA',
    lat: 40.7982, lon: -77.8599,
    affiliation: UNIVERSITY
  },
  michigan3: {
    image: 'images/RuthieAngelovici.jpg',
    kicker: 'Michigan, USA',
    title: 'Angelovici Lab',
    text: 'Uncovering the metabolic and genetic mechanisms driving the amino acid network’s response.',
    link: 'https://scholars.msu.edu/scholar/904409/RUTHIE-ANGELOVICI?unitId=667&unitType=2',
    state: 'Michigan',
    place: 'East Lansing, MI',
    lat: 42.7245, lon: -84.48,
    affiliation: UNIVERSITY
  },
};

/* ---- team modal ---- */
const teamModal = document.getElementById('teamModal');
const teamModalImg = document.getElementById('teamModalImg');
const teamModalKicker = document.getElementById('teamModalKicker');
const teamModalTitle = document.getElementById('teamModalTitle');
const teamModalText = document.getElementById('teamModalText');
const teamModalLink = document.getElementById('teamModalLink');

function openTeamModal(team) {
  if (!team || !teamModal) return;

  teamModalImg.src = team.image;
  teamModalImg.alt = team.title;
  teamModalKicker.textContent = team.kicker;
  teamModalTitle.textContent = team.title;
  teamModalText.textContent = team.text;

  if (team.link) {
    teamModalLink.href = team.link;
    teamModalLink.style.display = 'inline-flex';
  } else {
    teamModalLink.style.display = 'none';
  }

  teamModal.classList.add('open');
  teamModal.setAttribute('aria-hidden', 'false');
}

function closeTeamModal() {
  if (!teamModal) return;
  teamModal.classList.remove('open');
  teamModal.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('[data-close-team-modal]').forEach(closeBtn => {
  closeBtn.addEventListener('click', closeTeamModal);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && teamModal && teamModal.classList.contains('open')) closeTeamModal();
});

/* ---- D3 map ---- */
function buildPartnerMap(container, usAtlas) {
  const width = 980;
  const height = 600;
  // Alaska, Hawaii and Puerto Rico are dropped so the contiguous states fill the frame.
  const offMainland = new Set(['02', '15', '72']);
  const states = topojson.feature(usAtlas, usAtlas.objects.states);
  states.features = states.features.filter(feature => !offMainland.has(feature.id));
  const teams = Object.values(teamCards);
  const partnerStates = new Set(teams.map(team => team.state));

  const projection = d3.geoAlbersUsa().fitExtent([[10, 10], [width - 10, height - 10]], states);
  const path = d3.geoPath(projection);

  const points = teams.map(team => {
    const projected = projection([team.lon, team.lat]);
    return projected && { team, x: projected[0], y: projected[1], offsetX: 0, offsetY: 0 };
  }).filter(Boolean);

  // Labs on the same campus land on the same pixel, so each one is nudged onto the
  // smallest ring that keeps it clickable, centred on its own true position. The
  // nudge is measured in dot radii and shrinks with zoom, so the dots settle back
  // onto their real coordinates as the map is zoomed in.
  const OVERLAP_DISTANCE = 14;
  const groups = [];
  points.forEach(point => {
    const group = groups.find(([first]) => Math.hypot(first.x - point.x, first.y - point.y) < OVERLAP_DISTANCE);
    if (group) group.push(point); else groups.push([point]);
  });
  groups.forEach(members => {
    if (members.length < 2) return;
    const ring = 1.15 / Math.sin(Math.PI / members.length);
    members.forEach((point, index) => {
      const angle = (index / members.length) * Math.PI * 2 - Math.PI / 2;
      point.offsetX = Math.cos(angle) * ring;
      point.offsetY = Math.sin(angle) * ring;
    });
  });

  const svg = d3.select(container)
    .append('svg')
    .attr('class', 'partner-map-svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .attr('role', 'group')
    .attr('aria-label', 'Map of CERCA collaborator locations across the United States');

  const mapLayer = svg.append('g');
  const stateLayer = mapLayer.append('g').attr('class', 'partner-map-states');
  const dotLayer = mapLayer.append('g').attr('class', 'partner-map-dots');

  const tooltip = d3.select(container).append('div')
    .attr('class', 'partner-map-tooltip')
    .attr('role', 'status')
    .style('opacity', 0);

  function showTooltip(event, html) {
    const bounds = container.getBoundingClientRect();
    tooltip.html(html)
      .style('left', `${event.clientX - bounds.left}px`)
      .style('top', `${event.clientY - bounds.top}px`)
      .style('opacity', 1);
  }

  function hideTooltip() {
    tooltip.style('opacity', 0);
  }

  const statePaths = stateLayer.selectAll('path')
    .data(states.features)
    .join('path')
    .attr('d', path)
    .attr('class', d => `partner-map-state${partnerStates.has(d.properties.name) ? ' is-partner' : ''}`)
    .attr('stroke-width', 1)
    .on('pointermove', (event, d) => {
      if (!partnerStates.has(d.properties.name)) return hideTooltip();
      const members = teams.filter(team => team.state === d.properties.name);
      showTooltip(event, `<strong>${d.properties.name}</strong><span>${members.map(team => team.title).join(' &middot; ')}</span>`);
    })
    .on('pointerleave', hideTooltip)
    .on('click', (event, d) => {
      event.stopPropagation();
      zoomToFeature(d);
    });

  const dots = dotLayer.selectAll('circle')
    .data(points)
    .join('circle')
    .attr('class', d => `partner-map-dot is-${d.team.affiliation}`)
    .attr('tabindex', 0)
    .attr('role', 'button')
    .attr('aria-label', d => `${d.team.title}, ${d.team.place}`)
    .on('pointermove', (event, d) => {
      event.stopPropagation();
      showTooltip(event, `<strong>${d.team.title}</strong><span>${d.team.place} &middot; ${d.team.affiliation === USDA ? 'USDA-ARS' : 'University partner'}</span>`);
    })
    .on('pointerleave', hideTooltip)
    .on('click', (event, d) => {
      event.stopPropagation();
      openTeamModal(d.team);
    })
    .on('focus', function (event, d) {
      const bounds = this.getBoundingClientRect();
      showTooltip({ clientX: bounds.left + bounds.width / 2, clientY: bounds.top }, `<strong>${d.team.title}</strong><span>${d.team.place}</span>`);
    })
    .on('blur', hideTooltip)
    .on('keydown', (event, d) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      openTeamModal(d.team);
    });

  // Dots are sized in viewBox units, so they grow on narrow screens to stay tappable
  // and shrink again as the map is zoomed in.
  let baseRadius = 6;
  let currentScale = 1;

  function placeDots() {
    const radius = baseRadius / Math.sqrt(currentScale);
    dots
      .attr('cx', d => d.x + d.offsetX * radius)
      .attr('cy', d => d.y + d.offsetY * radius)
      .attr('r', radius)
      .attr('stroke-width', radius * 0.7);
  }

  function fitDotsToWidth() {
    baseRadius = Math.min(12, Math.max(6, 3.3 * (width / (container.clientWidth || width))));
    placeDots();
  }

  fitDotsToWidth();
  new ResizeObserver(fitDotsToWidth).observe(container);

  const resetButton = d3.select(container).append('button')
    .attr('type', 'button')
    .attr('class', 'partner-map-reset')
    .text('Reset view')
    .on('click', resetZoom);

  const zoom = d3.zoom()
    .scaleExtent([1, 9])
    .translateExtent([[0, 0], [width, height]])
    .on('zoom', zoomed);

  svg.call(zoom).on('click', resetZoom);

  function zoomed(event) {
    const k = event.transform.k;
    currentScale = k;
    mapLayer.attr('transform', event.transform);
    statePaths.attr('stroke-width', 1 / k);
    placeDots();
    resetButton.classed('is-visible', k > 1.01);
    hideTooltip();
  }

  function zoomToFeature(feature) {
    const [[x0, y0], [x1, y1]] = path.bounds(feature);
    const scale = Math.min(9, 0.8 / Math.max((x1 - x0) / width, (y1 - y0) / height));
    svg.transition().duration(650).call(
      zoom.transform,
      d3.zoomIdentity
        .translate(width / 2, height / 2)
        .scale(scale)
        .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
    );
  }

  function resetZoom() {
    svg.transition().duration(500).call(zoom.transform, d3.zoomIdentity);
  }
}

function initPartnerMap() {
  const container = document.getElementById('partnerMap');
  if (!container) return;

  const fail = () => container.classList.add('has-failed');

  if (typeof d3 === 'undefined' || typeof topojson === 'undefined') return fail();

  d3.json(US_ATLAS_URL)
    .then(usAtlas => buildPartnerMap(container, usAtlas))
    .catch(fail);
}

initPartnerMap();
/* end of interactive map section*/
