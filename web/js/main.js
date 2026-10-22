/**
 * main.js
 * 메인 애플리케이션 - 내비게이션, 히어로 파티클/타이핑, 프로젝트 그리드, CJ 핵심 가치, 스크롤 인터랙션
 */

// ─────────────────────────────────────────────
// 초기화
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches) initHeroParticles();
  initHeroTyping();
  initTechIcons();
  initProjectsGrid();
  initEngineeringValues();
  initAboutSection();
  initFilterTabs();
  initScrollProgress();
  initCardTilt();
  initRevealObserver();
});

// ─────────────────────────────────────────────
// 1. Navigation
// ─────────────────────────────────────────────
function initNav() {
  const nav = document.getElementById('site-nav');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileClose = document.getElementById('mobile-close');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav?.classList.add('nav-scrolled');
    } else {
      nav?.classList.remove('nav-scrolled');
    }
    updateActiveNav();
  }, { passive: true });

  hamburger?.addEventListener('click', () => {
    mobileNav?.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  mobileClose?.addEventListener('click', closeMobileNav);
  mobileNav?.addEventListener('click', (e) => {
    if (e.target === mobileNav) closeMobileNav();
  });

  function closeMobileNav() {
    mobileNav?.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        closeMobileNav();
        const offset = 70;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  let currentId = '';

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 100 && rect.bottom >= 100) {
      currentId = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentId}`) {
      link.classList.add('active');
    }
  });
}

// ─────────────────────────────────────────────
// 2. 히어로 인터랙티브 파티클 (CJ Blossom 3색)
// ─────────────────────────────────────────────
function initHeroParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  let stars = [];
  let animId;
  let mouse = { x: -9999, y: -9999, prevX: -9999, prevY: -9999, vx: 0, vy: 0, radius: 110 };

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  class InteractiveStar {
    constructor(w, h) {
      this.w = w;
      this.h = h;
      this.reset();
    }

    reset() {
      const isRightCluster = Math.random() < 0.75;
      if (isRightCluster) {
        this.originX = this.w * (0.50 + Math.random() * 0.45);
        this.originY = this.h * (0.15 + Math.random() * 0.70);
      } else {
        this.originX = Math.random() * this.w;
        this.originY = Math.random() * this.h;
      }

      this.x = this.originX;
      this.y = this.originY;
      this.vx = 0;
      this.vy = 0;

      this.baseRadius = Math.random() < 0.25 ? Math.random() * 0.6 + 1.1:Math.random() * 0.5 + 0.6;
      this.radius = this.baseRadius;
      this.alpha = Math.random() * 0.45 + 0.25;
      this.twinkleSpeed = Math.random() * 0.015 + 0.006;
      this.twinkleOffset = Math.random() * Math.PI * 2;

      // CJ Blossom 3색 (Red, Yellow, Blue) 및 틴트
      const colors = ['#FF403B', '#C62828', '#F3F3F3', '#FF7975', '#A0A0A0'];
      this.color = colors[Math.floor(Math.random() * colors.length)];

      this.floatAngle = Math.random() * Math.PI * 2;
      this.floatSpeed = Math.random() * 0.006 + 0.003;
      this.floatRadius = Math.random() * 3 + 1.5;
    }

    update() {
      this.floatAngle += this.floatSpeed;
      const targetBaseX = this.originX + Math.cos(this.floatAngle) * this.floatRadius;
      const targetBaseY = this.originY + Math.sin(this.floatAngle) * this.floatRadius;

      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouse.radius && dist > 0) {
        const force = (1 - dist / mouse.radius);
        const angle = Math.atan2(dy, dx);
        const sideDir = dx >= 0 ? 1:-1;
        const pushX = (Math.cos(angle) * 0.4 + sideDir * 0.6) * force * 3.5;
        const pushY = Math.sin(angle) * force * 1.5;

        this.vx += pushX;
        this.vy += pushY;
      }

      const spring = 0.022;
      const friction = 0.93;

      this.vx += (targetBaseX - this.x) * spring;
      this.vy += (targetBaseY - this.y) * spring;

      this.vx *= friction;
      this.vy *= friction;

      this.x += this.vx;
      this.y += this.vy;

      this.twinkleOffset += this.twinkleSpeed;
      this.currentAlpha = this.alpha * (0.75 + 0.25 * Math.sin(this.twinkleOffset));
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = Math.min(0.85, Math.max(0.12, this.currentAlpha));
      ctx.shadowBlur = this.radius * 2;
      ctx.shadowColor = this.color;
      ctx.fillStyle = this.color;

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  function initStars() {
    const count = Math.min(65, Math.max(35, Math.floor(canvas.width / 22)));
    stars = Array.from({ length: count }, () => new InteractiveStar(canvas.width, canvas.height));
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.update();
      s.draw();
    });

    mouse.vx *= 0.5;
    mouse.vy *= 0.5;
    animId = requestAnimationFrame(animate);
  }

  resize();
  initStars();
  animate();

  window.addEventListener('resize', () => {
    resize();
    initStars();
  }, { passive: true });

  const hero = canvas.closest('#hero');
  if (hero) {
    const handleMove = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      const newX = clientX - rect.left;
      const newY = clientY - rect.top;
      if (mouse.prevX !== -9999) {
        mouse.vx = newX - mouse.prevX;
        mouse.vy = newY - mouse.prevY;
      }
      mouse.x = newX;
      mouse.y = newY;
      mouse.prevX = newX;
      mouse.prevY = newY;
    };

    hero.addEventListener('mousemove', e => {
      handleMove(e.clientX, e.clientY);
    });

    hero.addEventListener('mouseleave', () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.prevX = -9999;
      mouse.prevY = -9999;
      mouse.vx = 0;
      mouse.vy = 0;
    });

    hero.addEventListener('touchmove', e => {
      if (e.touches && e.touches[0]) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    hero.addEventListener('touchend', () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.prevX = -9999;
      mouse.prevY = -9999;
    });
  }
}

// ─────────────────────────────────────────────
// 3. 히어로 타이핑 애니메이션
// ─────────────────────────────────────────────
function initHeroTyping() {
  const el = document.getElementById('hero-typing');
  if (!el) return;
  const words = ['Unity 기반 게임플레이 구현', 'VR HMD 90fps 성능 목표 달성', 'C++·OpenGL 렌더링 파이프라인 구현', 'Android·AI 피드백 기능 개발'];
  let wi = 0, ci = 0, deleting = false;

  function type() {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) {
        deleting = true;
        setTimeout(type, 2200);
        return;
      }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
      }
    }
    setTimeout(type, deleting ? 55:80);
  }
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) el.textContent=words[0]; else type();
}

// ─────────────────────────────────────────────
// 4. IntersectionObserver 리빌 애니메이션
// ─────────────────────────────────────────────
function initRevealObserver() {
  const opts = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        const fills = entry.target.querySelectorAll('.skill-bar-fill');
        fills.forEach(f => f.classList.add('animate'));
      }
    });
  }, opts);

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });
}

// ─────────────────────────────────────────────
// 5. 프로젝트 그리드 렌더링
// ─────────────────────────────────────────────
let currentFilter = 'all';

function initProjectsGrid() {
  renderProjects('all');
}

function renderProjects(filter) {
  currentFilter = filter;
  const grid = document.getElementById('projects-grid');
  if (!grid || typeof PROJECTS_DATA === 'undefined') return;

  const filtered = filter === 'all'
    ? PROJECTS_DATA:PROJECTS_DATA.filter(p => p.category === filter);

  grid.innerHTML = filtered.map((proj, idx) => buildProjectCard(proj, idx)).join('');

  grid.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.projectId;
      const proj = PROJECTS_DATA.find(p => p.id === id);
      if (proj) openProjectModal(proj);
    });
  });

  initCardTilt();

  const opts = { threshold: 0.05 };
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, opts);
  grid.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

function buildProjectCard(proj, idx) {
  const delay = `${(idx % 3) * 0.1}s`;
  const thumb = proj.media.thumbnail
    ? `<img src="${proj.media.thumbnail}" alt="${proj.title}" loading="lazy" onerror="this.style.display='none'">`
    : `<div class="card-thumbnail-placeholder">${cardPlaceholder(proj.title)}</div>`;

  const fitList = proj.competencies || [];
  const valueBadges = fitList.map(v => {
    const meta = (typeof COMPETENCY_META !== 'undefined') ? COMPETENCY_META[v] : null;
    return meta ? `<span class="badge badge-${meta.class}" style="background:${meta.bgColor};color:${meta.color};border:1px solid ${meta.color}40;font-weight:700;">${meta.label}</span>` : '';
  }).join('');

  const tags = proj.tags.slice(0, 5).map(t =>
    `<span class="badge badge-ghost">${t}</span>`
  ).join('');

  const hasYoutube = proj.links.youtube;
  const hasGithub = proj.links.github;

  return `
    <div class="project-card ${proj.isFeatured ? 'featured' : ''} reveal tilt-card"
         style="animation-delay:${delay}"
         data-project-id="${proj.id}">
      <div class="card-thumbnail">
        ${thumb}
        <div class="card-thumbnail-overlay"></div>
        <div class="card-type-badge">
          <span class="badge ${proj.isFeatured ? 'badge-blue' : 'badge-ghost'}">
            ${proj.isFeatured ? '★ MAIN' : 'SUB'}
          </span>
        </div>
        ${proj.media.videoUrl ? '<div class="card-play-btn">▶</div>' : ''}
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span class="badge badge-ghost font-code" style="font-size:0.68rem">${proj.engine}</span>
          <span class="text-muted font-code" style="font-size:0.72rem">${proj.periodShort}</span>
        </div>
        ${valueBadges ? `<div class="card-meta" style="margin-top:0.4rem;gap:4px;">${valueBadges}</div>` : ''}
        <h4 class="card-title">${proj.title}
          ${proj.titleKr ? `<span style="color:#b4b4b4;font-size:0.85em;font-weight:400"> · ${proj.titleKr}</span>` : ''}
        </h4>
        <p class="card-desc">${proj.summary}</p>
        ${proj.achievement ? `
          <div class="card-achievement">
            <span>🏆</span>
            <span>${proj.achievement}</span>
          </div>` : ''}
        <div class="card-tags">${tags}</div>
        <div class="card-date font-code">
          <span class="card-date-icon">📅</span>
          <span class="card-date-label">만든 날짜:</span>
          <span class="card-date-val">${proj.createdDate || proj.period || proj.periodShort || ''}</span>
        </div>
        <div class="card-footer">
          <div class="card-links" onclick="event.stopPropagation()">
            ${hasGithub ? `<a href="${proj.links.github}" target="_blank" class="btn btn-ghost btn-sm">GitHub</a>` : ''}
            ${hasYoutube ? `<a href="${proj.links.youtube}" target="_blank" class="btn btn-secondary btn-sm">▶ Demo</a>` : ''}
          </div>
          <button class="btn btn-primary btn-sm" onclick="event.stopPropagation();openProjectModalById('${proj.id}')">
            Deep-Dive →
          </button>
        </div>
      </div>
    </div>
  `;
}

function cardPlaceholder(title) {
  return `
    <div class="card-thumbnail-placeholder">
      <div class="placeholder-icon">🎨</div>
      <span style="font-size:0.75rem">${title}</span>
    </div>
  `;
}

// 전역 함수로 노출
window.openProjectModalById = function (id) {
  if (typeof PROJECTS_DATA === 'undefined') return;
  const proj = PROJECTS_DATA.find(p => p.id === id);
  if (proj && typeof openProjectModal === 'function') {
    openProjectModal(proj);
  }
};

// ─────────────────────────────────────────────
// 6. 필터 탭
// ─────────────────────────────────────────────
function initFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {t.classList.remove('active');t.setAttribute('aria-selected','false');});
      tab.classList.add('active');
      tab.setAttribute('aria-selected','true');
      const filter = tab.dataset.filter;
      renderProjects(filter);
    });
  });
}

// ─────────────────────────────────────────────
// 7. CJ 핵심가치 카드
// ─────────────────────────────────────────────
function initEngineeringValues() {
  const container = document.getElementById('values-container');
  if (!container || typeof COMPETENCY_META === 'undefined') return;
  const cb = {gameplay:'#ff403b',graphics:'#ff403b',performance:'#ff403b',tools:'#ff403b'};
  const ic = {};
  const ev = {
    gameplay:['Unity VR 클라이언트 개발','상태 기반 이벤트 및 공간 전환 구현','기획·아트 담당 팀원과의 전시 프로젝트 완주'],
    graphics:['C++·OpenGL 렌더링 파이프라인 구현','FBO 후처리 및 FPS 카메라 구현','계층적 모델링과 UV 매핑 구현'],
    performance:['URP Render Pass 처리 흐름 분석','다운샘플링·프레임 스킵 적용','VR HMD 90fps 성능 목표 달성'],
    tools:['Android·FastAPI 통신 파이프라인 연동','AI 분석 결과 및 피드백 UI 구현','C++·OpenCV 의료 영상 처리 구현']
  };
  let html = '';
  Object.entries(COMPETENCY_META).forEach(([k, m]) => {
    const tc = cb[k] || '#1A1A1A';
    const ico = ic[k] || '';
    const li = (ev[k] || []).map(t => `<li style="margin-bottom:6px;line-height:1.45;">${t}</li>`).join('');

    html += `
      <div class="value-card reveal" style="background:#101010;border:1px solid #383838;border-top:4px solid ${tc};border-radius:14px;padding:24px;box-shadow:0 4px 16px rgba(0,0,0,0.05);display:flex;flex-direction:column;">
        <div style="color:${m.color};background:${m.bgColor};border-radius:9999px;display:inline-block;padding:4px 12px;font-size:11px;font-weight:800;margin-bottom:10px;align-self:flex-start;">
          ${ico} ${m.label}
        </div>
        <div style="color:#f3f3f3;font-size:1.05rem;font-weight:800;margin-bottom:6px;">${m.kr}</div>
        <p style="color:#b4b4b4;font-size:0.85rem;margin-bottom:12px;line-height:1.5;">${m.desc}</p>
        <ul style="color:#b4b4b4;font-size:0.82rem;padding-left:16px;margin:0;">${li}</ul>
      </div>
    `;
  });
  container.innerHTML = html;
}

// ─────────────────────────────────────────────
// 8. About 섹션 인터랙션 초기화
// ─────────────────────────────────────────────
function initAboutSection() {
  // 타임라인 및 소개 인터랙션은 HTML onclick 및 클래스 바인딩으로 구동
}

// ─────────────────────────────────────────────
// 9. 스크롤 진행 바
// ─────────────────────────────────────────────
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = total > 0 ? (window.scrollY / total) * 100:0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

// ─────────────────────────────────────────────
// 10. 카드 3D 틸트 효과
// ─────────────────────────────────────────────
function initCardTilt() {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rx = ((e.clientY - cy) / (rect.height / 2)) * -5;
      const ry = ((e.clientX - cx) / (rect.width / 2)) * 5;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

function trapFocus(e, container) {
  const list = [...container.querySelectorAll('a[href],button,input,[tabindex="0"]')].filter(el => !el.disabled && el.getClientRects().length);
  const first = list[0], last = list[list.length - 1];
  if (!first) return;
  if(e.shiftKey && document.activeElement === first) {e.preventDefault();last.focus();}
  else if(!e.shiftKey && document.activeElement === last) {e.preventDefault();first.focus();}
}


