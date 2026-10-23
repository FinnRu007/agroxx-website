(function () {
  // Menü auf dem Handy
  var knopf = document.querySelector('.nav-toggle');
  var nav = document.getElementById('hauptnav');
  if (knopf && nav) {
    knopf.addEventListener('click', function () {
      var offen = nav.classList.toggle('offen');
      knopf.setAttribute('aria-expanded', offen);
    });
  }

  // Bildergalerie (Lightbox)
  var links = [].slice.call(document.querySelectorAll('a[data-lightbox]'));
  if (!links.length) return;

  var box = document.createElement('div');
  box.className = 'lightbox';
  box.hidden = true;
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Bildansicht');
  box.innerHTML =
    '<button class="lb-close" aria-label="Schließen">&times;</button>' +
    '<button class="lb-prev" aria-label="Vorheriges Bild">&#8249;</button>' +
    '<figure><img alt=""><figcaption></figcaption></figure>' +
    '<button class="lb-next" aria-label="Nächstes Bild">&#8250;</button>';
  document.body.appendChild(box);

  var bild = box.querySelector('img');
  var beschriftung = box.querySelector('figcaption');
  var gruppe = [];
  var pos = 0;
  var zuletzt = null;

  function zeige(i) {
    pos = (i + gruppe.length) % gruppe.length;
    var a = gruppe[pos];
    var text = a.getAttribute('data-caption') || '';
    bild.src = a.href;
    bild.alt = text;
    beschriftung.textContent = text + ' (' + (pos + 1) + ' von ' + gruppe.length + ')';
  }
  function oeffne(a) {
    zuletzt = document.activeElement;
    var name = a.getAttribute('data-lightbox');
    gruppe = links.filter(function (l) { return l.getAttribute('data-lightbox') === name; });
    zeige(gruppe.indexOf(a));
    box.hidden = false;
    document.body.classList.add('lb-offen');
    box.querySelector('.lb-close').focus();
  }
  function schliesse() {
    box.hidden = true;
    bild.removeAttribute('src');
    document.body.classList.remove('lb-offen');
    if (zuletzt) zuletzt.focus();
  }

  links.forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); oeffne(a); });
  });
  box.addEventListener('click', function (e) {
    var c = e.target.classList;
    if (e.target === box || c.contains('lb-close')) schliesse();
    else if (c.contains('lb-prev')) zeige(pos - 1);
    else if (c.contains('lb-next')) zeige(pos + 1);
  });
  document.addEventListener('keydown', function (e) {
    if (box.hidden) return;
    if (e.key === 'Escape') schliesse();
    else if (e.key === 'ArrowLeft') zeige(pos - 1);
    else if (e.key === 'ArrowRight') zeige(pos + 1);
  });
})();
