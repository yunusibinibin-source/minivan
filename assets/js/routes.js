(function () {
  'use strict';
  var input = document.getElementById('provinceSearch');
  var count = document.getElementById('provinceCount');
  var provinces = Array.from(document.querySelectorAll('[data-province]'));

  function normalize(value) {
    return value.toLocaleLowerCase('tr-TR')
      .replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u')
      .replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c');
  }

  if (input && count) {
    input.addEventListener('input', function () {
      var query = normalize(input.value.trim());
      var matches = 0;
      provinces.forEach(function (item) {
        var visible = normalize(item.dataset.province).includes(query);
        item.hidden = !visible;
        if (visible) matches += 1;
      });
      count.textContent = matches ? matches + ' il gösteriliyor.' : 'Eşleşen il bulunamadı. İl adını kontrol edin veya telefonla ulaşın.';
    });
  }

  var menu = document.getElementById('mainNav');
  var toggle = document.getElementById('menuToggle');
  if (menu && toggle) {
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menu.classList.contains('open')) {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        var icon = toggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
        toggle.focus();
      }
    });
  }
})();
