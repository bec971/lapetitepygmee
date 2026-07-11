// Main JS: navigation toggle, menu tabs, search, and interactions
document.addEventListener('DOMContentLoaded', function () {
  // Scroll class detection for header
  var header = document.querySelector('.site-header');
  if (header) {
    var toggleHeaderScrolled = function () {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    toggleHeaderScrolled();
    window.addEventListener('scroll', toggleHeaderScrolled, { passive: true });
  }

  // Scroll Reveal System using Intersection Observer
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    // Auto-reveal sections & grid containers
    document.querySelectorAll('section, .pres-grid > div, .loc-grid > div').forEach(function (el) {
      if (!el.classList.contains('hero') && !el.classList.contains('search-bar')) {
        el.classList.add('reveal');
        revealObserver.observe(el);
      }
    });

    // Staggered reveal for cards, features and points
    var staggerContainers = '.establishments-grid, .avis-grid, .features-grid, .event-grid, .about-points';
    document.querySelectorAll(staggerContainers).forEach(function (container) {
      Array.from(container.children).forEach(function (child, idx) {
        child.classList.add('reveal');
        child.style.transitionDelay = (idx * 0.12) + 's';
        revealObserver.observe(child);
      });
    });
  }

  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.textContent = isOpen ? 'Fermer' : 'Menu';
    });
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 860) {
          mainNav.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.textContent = 'Menu';
        }
      });
    });
  }

  document.querySelectorAll('.tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.tab').forEach(function (t) { t.classList.remove('active'); });
      document.querySelectorAll('.menu-list').forEach(function (l) { l.classList.remove('active'); });
      tab.classList.add('active');
      var id = tab.dataset.tab;
      if (id) {
        var el = document.getElementById(id);
        if (el) el.classList.add('active');
      }
    });
  });

  (function () {
    var wraps = document.querySelectorAll('.marquee-wrap');
    wraps.forEach(function (wrap) {
      var resumeTimer = null;
      var startPause = function () {
        wrap.classList.add('paused');
        if (resumeTimer) { clearTimeout(resumeTimer); resumeTimer = null; }
      };
      var scheduleResume = function () {
        if (resumeTimer) clearTimeout(resumeTimer);
        resumeTimer = setTimeout(function () {
          wrap.classList.remove('paused');
          resumeTimer = null;
        }, 2000);
      };
      wrap.addEventListener('touchstart', startPause, { passive: true });
      wrap.addEventListener('touchmove', startPause, { passive: true });
      wrap.addEventListener('touchend', scheduleResume, { passive: true });
      wrap.addEventListener('pointerdown', startPause);
      wrap.addEventListener('pointerup', scheduleResume);
    });
  })();

  function filterEstablishments(query) {
    var q = (query || '').trim().toLowerCase();
    var cards = document.querySelectorAll('.establishments-grid .card');
    var visibleCount = 0;
    cards.forEach(function (card) {
      var text = (card.textContent || '').toLowerCase();
      var show = q === '' || text.includes(q);
      card.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });

    var grid = document.querySelector('.establishments-grid');
    if (grid) {
      var emptyEl = document.getElementById('search-empty-state');
      if (visibleCount === 0) {
        if (!emptyEl) {
          emptyEl = document.createElement('div');
          emptyEl.id = 'search-empty-state';
          emptyEl.className = 'search-empty-state';
          emptyEl.innerHTML = '<h3>Aucun établissement trouvé</h3><p>Essayez une autre recherche (ex : Bastos, Gare, Nkoldbisson...)</p><button type="button" class="btn btn-primary btn-sm reset-search-btn" style="padding: 8px 16px; font-size: 0.8rem; border: none;">Réinitialiser</button>';
          grid.parentNode.insertBefore(emptyEl, grid.nextSibling);
          
          emptyEl.querySelector('.reset-search-btn').addEventListener('click', function() {
            var input = document.querySelector('.search-input');
            if (input) {
              input.value = '';
              filterEstablishments('');
            }
          });
        }
        emptyEl.style.display = 'block';
      } else {
        if (emptyEl) {
          emptyEl.style.display = 'none';
        }
      }
    }
  }

  var searchInput = document.querySelector('.search-input');
  var searchBtn = document.querySelector('.search-btn');
  if (searchBtn && searchInput) {
    var runSearch = function () { filterEstablishments(searchInput.value); };
    searchBtn.addEventListener('click', runSearch);
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        runSearch();
      }
    });
  }

  // Update real-time open/closed status indicators
  function updateOpenStatus() {
    var indicators = document.querySelectorAll('.status-indicator');
    indicators.forEach(function (indicator) {
      var hoursStr = indicator.dataset.hours || '';
      var parts = hoursStr.split('-');
      if (parts.length === 2) {
        var startParts = parts[0].split(':');
        var endParts = parts[1].split(':');
        
        var now = new Date();
        var currentHours = now.getHours();
        var currentMinutes = now.getMinutes();
        
        var startH = parseInt(startParts[0], 10);
        var startM = parseInt(startParts[1] || '0', 10);
        var endH = parseInt(endParts[0], 10);
        var endM = parseInt(endParts[1] || '0', 10);
        
        var currentVal = currentHours * 60 + currentMinutes;
        var startVal = startH * 60 + startM;
        var endVal = endH * 60 + endM;
        
        if (currentVal >= startVal && currentVal < endVal) {
          indicator.textContent = 'Ouvert actuellement';
          indicator.className = 'status-indicator open';
        } else {
          indicator.textContent = 'Fermé actuellement';
          indicator.className = 'status-indicator closed';
        }
      }
    });
  }
  updateOpenStatus();
  setInterval(updateOpenStatus, 60000);

  // Filter buttons logic
  var filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      
      var filterValue = btn.dataset.filter;
      var cards = document.querySelectorAll('.establishments-grid .card');
      var visibleCount = 0;
      
      // Reset text search input to make filtering clearer
      var searchInput = document.querySelector('.search-input');
      if (searchInput) searchInput.value = '';

      cards.forEach(function (card) {
        var meta = card.querySelector('.meta');
        var metaText = meta ? (meta.textContent || '').trim().toLowerCase() : '';
        
        var show = false;
        if (filterValue === 'all') {
          show = true;
        } else if (filterValue === 'bertoua' && metaText.includes('bertoua')) {
          show = true;
        } else if (filterValue === 'yaounde' && metaText.includes('yaoundé')) {
          show = true;
        }
        
        card.style.display = show ? '' : 'none';
        if (show) visibleCount++;
      });
      
      // Update empty state if grid exists
      var grid = document.querySelector('.establishments-grid');
      if (grid) {
        var emptyEl = document.getElementById('search-empty-state');
        if (visibleCount === 0) {
          if (!emptyEl) {
            emptyEl = document.createElement('div');
            emptyEl.id = 'search-empty-state';
            emptyEl.className = 'search-empty-state';
            emptyEl.innerHTML = '<h3>Aucun établissement trouvé</h3><p>Essayez une autre recherche (ex : Bastos, Gare, Nkoldbisson...)</p><button type="button" class="btn btn-primary btn-sm reset-search-btn" style="padding: 8px 16px; font-size: 0.8rem; border: none;">Réinitialiser</button>';
            grid.parentNode.insertBefore(emptyEl, grid.nextSibling);
            emptyEl.querySelector('.reset-search-btn').addEventListener('click', function() {
              if (searchInput) {
                searchInput.value = '';
              }
              btn.click();
            });
          }
          emptyEl.style.display = 'block';
        } else {
          if (emptyEl) {
            emptyEl.style.display = 'none';
          }
        }
      }
    });
  });


  // Share location button handling
  document.querySelectorAll('.share-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (navigator.share) {
        navigator.share({
          title: document.title,
          text: 'Découvrez cet établissement de La Petite Pygmée !',
          url: window.location.href
        }).catch(function() {});
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(function () {
          alert('Lien de l\'établissement copié dans le presse-papiers !');
        });
      }
    });
  });
});
