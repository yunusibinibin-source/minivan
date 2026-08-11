(function () {
  "use strict";

  var PHONE = "905448686358";

  function track(name) {
    if (typeof window.gtag === "function") {
      window.gtag("event", name, { send_to: "AW-17874354293" });
    }
  }

  function normalizeTR(value) {
    return String(value || "")
      .toLocaleLowerCase("tr-TR")
      .replaceAll("ı", "i")
      .replaceAll("ğ", "g")
      .replaceAll("ü", "u")
      .replaceAll("ş", "s")
      .replaceAll("ö", "o")
      .replaceAll("ç", "c");
  }

  var menuToggle = document.getElementById("menuToggle");
  var mainNav = document.getElementById("mainNav");

  function closeMenu() {
    if (!menuToggle || !mainNav) return;
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    var icon = menuToggle.querySelector("i");
    if (icon) icon.className = "fa-solid fa-bars";
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      var open = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
      var icon = menuToggle.querySelector("i");
      if (icon) icon.className = "fa-solid " + (open ? "fa-xmark" : "fa-bars");
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("scroll", closeMenu, { passive: true });
  }

  var citySearch = document.getElementById("citySearch");
  var cityGrid = document.querySelector(".city-grid");
  var cityCards = Array.from(document.querySelectorAll(".city-card"));
  var cityCount = document.querySelector(".city-tools > span");
  var showAllButton = document.getElementById("showAllCities");
  var showAll = false;

  function updateCities() {
    var query = normalizeTR(citySearch ? citySearch.value.trim() : "");
    var visible = 0;

    cityCards.forEach(function (card) {
      var matches = !query || normalizeTR(card.textContent).includes(query);
      card.hidden = !matches;
      if (matches) visible += 1;
    });

    if (cityGrid) cityGrid.classList.toggle("collapsed", !query && !showAll);
    if (cityCount) cityCount.textContent = visible + " şehir";
    if (showAllButton) showAllButton.style.display = query ? "none" : "flex";
  }

  if (citySearch) citySearch.addEventListener("input", updateCities);

  if (showAllButton) {
    showAllButton.addEventListener("click", function () {
      showAll = !showAll;
      showAllButton.innerHTML = showAll
        ? 'Daha az göster <i class="fa-solid fa-chevron-up"></i>'
        : 'Tüm şehirleri göster <i class="fa-solid fa-chevron-down"></i>';
      updateCities();
    });
  }

  updateCities();

  var quoteForm = document.getElementById("quoteWhatsAppForm");

  if (quoteForm) {
    quoteForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var data = new FormData(quoteForm);
      var message = [
        "Merhaba, Parça Yük Nakliye Ankara için teklif almak istiyorum.",
        "",
        "Ad Soyad: " + (data.get("name") || ""),
        "Telefon: " + (data.get("phone") || ""),
        "Nereden: " + (data.get("from") || ""),
        "Nereye: " + (data.get("to") || ""),
        "Mesafe: " + (data.get("km") || "-"),
        "Yük: " + (data.get("load") || ""),
        "Not: " + (data.get("note") || "-"),
      ].join("\n");

      track("lead_form_submit");
      window.open("https://wa.me/" + PHONE + "?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer");
    });
  }

  var mapsButton = document.getElementById("openDirections");
  if (mapsButton) {
    mapsButton.addEventListener("click", function () {
      var origin = document.getElementById("quoteFrom").value || "Ankara";
      var destination = document.getElementById("quoteTo").value || "Ankara";
      var url = "https://www.google.com/maps/dir/?api=1&origin=" + encodeURIComponent(origin) + "&destination=" + encodeURIComponent(destination);
      window.open(url, "_blank", "noopener,noreferrer");
    });
  }

  document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {
    link.addEventListener("click", function () { track("phone_click"); });
  });

  document.querySelectorAll('a[href*="wa.me"]').forEach(function (link) {
    link.addEventListener("click", function () { track("whatsapp_click"); });
  });
})();
