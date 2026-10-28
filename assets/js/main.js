/**
 * Murilo Neto - Portfólio de Barbearia
 * Navegação suave, galeria de cortes e visualização interativa
 */

(function () {
  'use strict';

  // ============================================================
  // CUTS DATA DICTIONARY (Lightbox Inspection)
  // ============================================================
  const CUTS_DATA = {
    '1': {
      title: 'Classic Flow com Acabamento Natural',
      badge: '[ CORTE 01 // TESOURA & FLUXO ]',
      desc: 'Corte clássico estruturado com distribuição de peso na tesoura, respeitando o caimento natural dos fios e finalizado com nuca em taper suave.',
      technique: 'Corte em mechas verticais, tesoura fio laser e texturização nas pontas',
      focus: 'Harmonia com o formato do crânio e caimento fluido',
      img: 'assets/images/corte-1-classic-taper.jpg'
    },
    '2': {
      title: 'Graduação Limpa & Contorno de Nuca',
      badge: '[ CORTE 02 // TAPER FADE ]',
      desc: 'Transição uniforme na região da nuca sem marcas bruscas. Cria um sombreado suave que valoriza a simetria da cabeça.',
      technique: 'Alavancagem suave com pentes intermediários e acabamento alinhado',
      focus: 'Simetria da linha de nuca e acabamento limpo',
      img: 'assets/images/corte-2-neck-taper.jpg'
    },
    '3': {
      title: 'Modern Textured Crop & Low Taper',
      badge: '[ CORTE 03 // TEXTURIZADO & CROP ]',
      desc: 'Estilo contemporâneo com franja desfiada para frente e textura marcante no topo, conectado a um degradê baixo nas têmporas.',
      technique: 'Point cutting profundo, desfiado no topo e taper fade baixo',
      focus: 'Definição e movimento com pomada efeito matte',
      img: 'assets/images/corte-3-textured-crop.jpg'
    },
    '4': {
      title: 'Mid Taper Flow & Transição de Barba',
      badge: '[ CORTE 04 // DROP TAPER & BARBA ]',
      desc: 'Conexão equilibrada entre o corte de cabelo e a barba, desenhando com precisão o contorno da mandíbula.',
      technique: 'Mid drop taper, tesoura sobre pente e conexão com a barba',
      focus: 'Linhas anatômicas e continuidade visual',
      img: 'assets/images/corte-4-mid-drop-flow.jpg'
    },
    '5': {
      title: 'Low Skin Fade & Escultura de Barba',
      badge: '[ CORTE 05 // SKIN FADE NAVALHADO ]',
      desc: 'Degradê partindo da lâmina zero até o topo com encaixe perfeito. Desenho nítido e geométrico da barba.',
      technique: 'Lâmina zero na base, fade milimétrico e navalhete',
      focus: 'Contraste, nitidez de linha e biossegurança',
      img: 'assets/images/corte-5-skin-fade-buzz.jpg'
    }
  };

  // ============================================================
  // SMOOTH SCROLL NAVIGATION (Sem fechar/abrir tela)
  // ============================================================
  function smoothScrollTo(targetId) {
    if (!targetId) return;
    const cleanId = targetId.replace('#', '');
    const element = document.getElementById(cleanId);
    if (element) {
      const headerOffset = 72;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  // Attach smooth scrolling to all data-smooth-nav links
  document.querySelectorAll('[data-smooth-nav]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-smooth-nav');
      closeMobileDrawer();
      smoothScrollTo(targetId);
    });
  });

  // ============================================================
  // SCROLL PROGRESS & SCROLL SPY
  // ============================================================
  const progressBar = document.getElementById('scroll-progress');
  const navItems = document.querySelectorAll('.nav-item');
  const sections = ['sobre', 'projetos', 'especializacao', 'contato'];

  window.addEventListener('scroll', () => {
    // 1. Scroll progress bar
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) {
      progressBar.style.width = scrollPercent + '%';
    }

    // 2. Active nav item highlighting
    let currentSection = '';
    const scrollPos = scrollTop + 130;

    sections.forEach((secId) => {
      const secEl = document.getElementById(secId);
      if (secEl) {
        const top = secEl.offsetTop;
        const height = secEl.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSection = secId;
        }
      }
    });

    navItems.forEach((item) => {
      const sec = item.getAttribute('data-section');
      if (sec === currentSection) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  });

  // ============================================================
  // MOBILE DRAWER CONTROLS
  // ============================================================
  const mobileDrawer = document.getElementById('mobile-drawer');
  const menuTrigger = document.getElementById('menu-trigger');
  const drawerClose = document.getElementById('drawer-close');
  const drawerBackdrop = document.getElementById('drawer-backdrop');

  function openMobileDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (menuTrigger) menuTrigger.addEventListener('click', openMobileDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeMobileDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeMobileDrawer);

  // ============================================================
  // GALLERY FILTER CONTROLS
  // ============================================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cutCards = document.querySelectorAll('.cut-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      cutCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('is-hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  // ============================================================
  // LIGHTBOX MODAL (Apenas Inspeção e Detalhes)
  // ============================================================
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxBadge = document.getElementById('lightbox-badge');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxTechnique = document.getElementById('lightbox-technique');
  const lightboxFocus = document.getElementById('lightbox-focus');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');

  function openLightbox(cutId) {
    const data = CUTS_DATA[cutId];
    if (!data || !lightboxModal) return;

    if (lightboxImg) lightboxImg.src = data.img;
    if (lightboxTitle) lightboxTitle.textContent = data.title;
    if (lightboxBadge) lightboxBadge.textContent = data.badge;
    if (lightboxDesc) lightboxDesc.textContent = data.desc;
    if (lightboxTechnique) lightboxTechnique.textContent = data.technique;
    if (lightboxFocus) lightboxFocus.textContent = data.focus;

    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  document.querySelectorAll('.btn-zoom-lightbox').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const cutId = btn.getAttribute('data-cut-id');
      openLightbox(cutId);
    });
  });

  document.querySelectorAll('.cut-card').forEach((card) => {
    card.addEventListener('click', () => {
      const cutId = card.getAttribute('data-cut-id');
      openLightbox(cutId);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });

  // ============================================================
  // BACK TO TOP BUTTON
  // ============================================================
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      smoothScrollTo('hero');
    });
  }

  // ============================================================
  // AMBIENT MOUSE GLOW (Desktop)
  // ============================================================
  const cursorGlow = document.getElementById('cursor-glow');
  if (cursorGlow && window.matchMedia('(min-width: 1024px)').matches) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    });
  }

  // Initialize Lucide icons
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

})();
