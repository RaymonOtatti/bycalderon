const btnRodrigo = document.getElementById('btnRodrigo');
const btnCru = document.getElementById('btnCru');
const btnPressKit = document.getElementById('btnPressKit');
const btnContacto = document.getElementById('btnContacto');
const fixedBtnRodrigo = document.getElementById('fixedBtnRodrigo');
const fixedBtnCru = document.getElementById('fixedBtnCru');
const fixedBtnPressKit = document.getElementById('fixedBtnPressKit');
const fixedBtnContacto = document.getElementById('fixedBtnContacto');
const mobileBtnRodrigo = document.getElementById('mobileBtnRodrigo');
const mobileBtnCru = document.getElementById('mobileBtnCru');
const mobileBtnPressKit = document.getElementById('mobileBtnPressKit');
const mobileBtnContacto = document.getElementById('mobileBtnContacto');
const whiteSection = document.getElementById('whiteSection');
const cruSection = document.getElementById('cruSection');
const btnUp = document.getElementById('btnUp');
const fixedMenu = document.getElementById('fixedMenu');
const container = document.querySelector('.container');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileNav = document.getElementById('mobileNav');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const carouselTrack = document.getElementById('carouselTrack');

// Función para manejar el scroll a las secciones
const scrollToSection = (section) => {
  section.scrollIntoView({ behavior: 'smooth' });
  // Cerrar el menú móvil al seleccionar una opción
  if (window.innerWidth <= 768) {
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    hamburgerBtn.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = 'auto';
  }
};

// Eventos para botones originales
btnRodrigo.addEventListener('click', () => scrollToSection(whiteSection));
btnCru.addEventListener('click', () => scrollToSection(cruSection));
btnRodrigo.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    scrollToSection(whiteSection);
  }
});
btnCru.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    scrollToSection(cruSection);
  }
});

// Eventos para botones fijos
fixedBtnRodrigo.addEventListener('click', () => scrollToSection(whiteSection));
fixedBtnCru.addEventListener('click', () => scrollToSection(cruSection));
fixedBtnRodrigo.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    scrollToSection(whiteSection);
  }
});
fixedBtnCru.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    scrollToSection(cruSection);
  }
});

// Eventos para botones móviles
mobileBtnRodrigo.addEventListener('click', () => scrollToSection(whiteSection));
mobileBtnCru.addEventListener('click', () => scrollToSection(cruSection));
mobileBtnRodrigo.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    scrollToSection(whiteSection);
  }
});
mobileBtnCru.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    scrollToSection(cruSection);
  }
});

// Botón de subir
btnUp.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Detectar scroll para menú fijo y botón de subir
window.addEventListener('scroll', () => {
  const containerBottom = container.offsetTop + container.offsetHeight;
  const whiteTop = whiteSection.offsetTop;
  const scrollY = window.scrollY;

  // Mostrar/ocultar menú fijo y botones originales
  if (scrollY >= containerBottom) {
    fixedMenu.style.display = 'flex';
    btnRodrigo.style.opacity = '0';
    btnCru.style.opacity = '0';
    btnPressKit.style.opacity = '0';
    btnContacto.style.opacity = '0';
  } else {
    fixedMenu.style.display = 'none';
    btnRodrigo.style.opacity = '1';
    btnCru.style.opacity = '1';
    btnPressKit.style.opacity = '1';
    btnContacto.style.opacity = '1';
  }

  // Cambiar color del botón de subir
  if (scrollY >= whiteTop - 50) {
    btnUp.classList.add('black');
  } else {
    btnUp.classList.remove('black');
  }
});

// Toggle hamburger menu
hamburgerBtn.addEventListener('click', () => {
  const isOpen = hamburgerBtn.classList.toggle('open');
  mobileNav.classList.toggle('open');
  mobileNav.setAttribute('aria-hidden', !isOpen);
  hamburgerBtn.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : 'auto';
});

// Animación para whiteSection
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const image = entry.target.querySelector('.overlay-image');
        const text = entry.target.querySelector('.overlay-text');
        image.classList.add('animate');
        text.classList.add('animate');
        observer.unobserve(entry.target); // Animar solo una vez
      }
    });
  },
  { threshold: 0.1 } // 10% de la sección visible
);

observer.observe(whiteSection);

// Carousel navigation with button-based looping
const scrollCarousel = (direction) => {
  const cardWidth = carouselTrack.querySelector('.card').offsetWidth + 40; // Card width + margin
  const scrollPosition = carouselTrack.scrollLeft;
  const maxScroll = carouselTrack.scrollWidth - carouselTrack.clientWidth;

  if (direction === 'next' && scrollPosition >= maxScroll - 1) {
    // At last card, jump to first
    carouselTrack.scrollTo({ left: 0, behavior: 'smooth' });
  } else if (direction === 'prev' && scrollPosition <= 1) {
    // At first card, jump to last
    carouselTrack.scrollTo({ left: maxScroll, behavior: 'smooth' });
  } else {
    // Normal scroll
    carouselTrack.scrollBy({ left: direction === 'next' ? cardWidth : -cardWidth, behavior: 'smooth' });
  }
};

nextBtn.addEventListener('click', () => scrollCarousel('next'));
prevBtn.addEventListener('click', () => scrollCarousel('prev'));