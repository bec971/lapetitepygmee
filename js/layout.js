(function () {
  function getBasePath() {
    var href = window.location.href.replace(/\\/g, '/');
    if (href.indexOf('/establishments/') !== -1) return '../../';
    if (href.indexOf('/pages/') !== -1) return '../';
    return '';
  }

  function navHref(base, href, isAnchor) {
    if (isAnchor && base === '') return href;
    if (isAnchor) return base + href.replace(/^\//, '');
    return base + href;
  }

  var base = getBasePath();
  var page = document.body.getAttribute('data-page') || '';

  var navItems = [
    { id: 'home', label: 'Accueil', href: navHref(base, 'index.html') },
    { id: 'restaurants', label: 'Nos établissements', href: navHref(base, 'pages/restaurants.html') },
    { id: 'about', label: 'À propos', href: navHref(base, 'pages/about.html') },
    { id: 'contact', label: 'Contact', href: navHref(base, 'pages/contact.html') }
  ];

  var footerNavItems = navItems.concat([
    { id: 'menu', label: 'Menu', href: navHref(base, 'index.html#menu', true) },
    { id: 'gallery', label: 'Galerie', href: navHref(base, 'index.html#galerie', true) }
  ]);

  var navLinks = navItems.map(function (item) {
    var active = item.id === page ? ' class="active"' : '';
    return '<li><a href="' + item.href + '"' + active + '>' + item.label + '</a></li>';
  }).join('');

  var header = document.getElementById('site-header');
  if (header) {
    header.innerHTML =
      '<header class="site-header">' +
        '<div class="wrap header-inner">' +
          '<div class="logo">' +
            '<a href="' + navHref(base, 'index.html') + '" aria-label="Accueil">' +
              '<img src="' + base + 'logo.png" alt="Logo La Petite Pygmée" />' +
            '</a>' +
            '<span class="brand-wrap">' +
              '<span class="brand">La Petite Pygmée</span>' +
              '<span class="brand-tagline">Restaurant</span>' +
            '</span>' +
          '</div>' +
          '<nav class="main-nav" aria-label="Navigation principale">' +
            '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="main-nav">Menu</button>' +
            '<ul id="main-nav">' + navLinks + '</ul>' +
          '</nav>' +
          '<div class="header-actions">' +
            '<a href="' + navHref(base, 'pages/reservation.html') + '" class="btn btn-reserve">Réserver</a>' +
          '</div>' +
        '</div>' +
      '</header>';
  }

  var footer = document.getElementById('site-footer');
  if (footer) {
    footer.innerHTML =
      '<footer class="site-footer">' +
        '<div class="wrap footer-grid">' +
          '<div class="footer-brand">' +
            '<div class="logo">' +
              '<img src="' + base + 'logo.png" alt="Logo La Petite Pygmée" />' +
              '<span class="brand">La Petite Pygmée</span>' +
            '</div>' +
            '<p>Saveurs authentiques et moments inoubliables à Bertoua et Yaoundé.</p>' +
            '<div class="social-links">' +
              '<a href="https://wa.me/237670000001" target="_blank" rel="noreferrer noopener">WhatsApp</a>' +
              '<a href="https://facebook.com" target="_blank" rel="noreferrer noopener">Facebook</a>' +
            '</div>' +
          '</div>' +
          '<div>' +
            '<h4>Liens rapides</h4>' +
            '<ul class="footer-links">' +
              navItems.map(function (item) {
                return '<li><a href="' + item.href + '">' + item.label + '</a></li>';
              }).join('') +
              footerNavItems.slice(4).map(function (item) {
                return '<li><a href="' + item.href + '">' + item.label + '</a></li>';
              }).join('') +
              '<li><a href="' + navHref(base, 'pages/reservation.html') + '">Réservation</a></li>' +
            '</ul>' +
          '</div>' +
          '<div>' +
            '<h4>Nos établissements</h4>' +
            '<ul class="footer-links">' +
              '<li><a href="' + navHref(base, 'pages/establishments/bertoua-agence-1.html') + '">Bertoua — Agence 1</a></li>' +
              '<li><a href="' + navHref(base, 'pages/establishments/bertoua-agence-2.html') + '">Bertoua — Agence 2</a></li>' +
              '<li><a href="' + navHref(base, 'pages/establishments/yaounde-agence-3.html') + '">Yaoundé — Agence 3</a></li>' +
            '</ul>' +
          '</div>' +
          '<div>' +
            '<h4>Contact</h4>' +
            '<ul class="footer-contact">' +
              '<li>Rue 876, Quartier Mokolo, Bertoua</li>' +
              '<li><a href="tel:+237670000001">+237 6 70 00 00 01</a></li>' +
              '<li>10h00 – 23h00, 7j/7</li>' +
            '</ul>' +
          '</div>' +
        '</div>' +
        '<div class="wrap foot-bottom">' +
          '<span>© 2026 La Petite Pygmée — Bertoua</span>' +
          '<span>Restaurant camerounais · Bertoua & Yaoundé</span>' +
        '</div>' +
      '</footer>' +
      '<a href="https://wa.me/237670000001" class="wa-float" target="_blank" rel="noreferrer noopener" aria-label="WhatsApp">WA</a>';
  }
})();
