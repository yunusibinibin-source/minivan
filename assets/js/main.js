(function ($) {
  "use strict";

  $("#year").text(new Date().getFullYear());

  // Reveal animasyonu
  function revealOnScroll() {
    $(".reveal").each(function () {
      var $el = $(this);
      var top = $el.offset().top;
      var scroll = $(window).scrollTop();
      var winH = $(window).height();
      if (top < scroll + winH - 90) $el.addClass("is-visible");
    });
  }
  revealOnScroll();
  $(window).on("scroll", revealOnScroll);

  // Mobil menü tıkla-kapat
  $(".navbar-nav .nav-link").on("click", function () {
    $(".navbar-collapse").collapse("hide");
  });

  // ScrollSpy
  $("body").scrollspy({ target: "#mainNav", offset: 84 });
  $(window).on("load", function () {
    $("body").scrollspy("refresh");
  });

  // Slider
  $("#testiCarousel").carousel({
    interval: 4200,
    pause: "hover"
  });

  // WhatsApp teklif formu
  $("#quoteWhatsAppForm").on("submit", function (e) {
    e.preventDefault();

    var $f = $(this);
    var valid = true;

    $f.find("[required]").each(function () {
      if (!$(this).val().trim()) valid = false;
    });

    if (!valid) {
      alert("Lütfen zorunlu alanları doldurun.");
      return;
    }

    var data = {
      name:  $f.find("[name='name']").val().trim(),
      phone: $f.find("[name='phone']").val().trim(),
      from:  $f.find("[name='from']").val().trim(),
      to:    $f.find("[name='to']").val().trim(),
      km:    $f.find("[name='km']").val().trim(),
      load:  $f.find("[name='load']").val().trim(),
      note:  $f.find("[name='note']").val().trim()
    };

    var msg =
      "Merhaba, Parça Yük Nakliye Ankara’dan teklif almak istiyorum.%0A%0A" +
      "Ad Soyad: " + encodeURIComponent(data.name) + "%0A" +
      "Telefon: " + encodeURIComponent(data.phone) + "%0A" +
      "Nereden: " + encodeURIComponent(data.from) + "%0A" +
      "Nereye: " + encodeURIComponent(data.to) + "%0A" +
      (data.km ? ("Mesafe (km): " + encodeURIComponent(data.km) + "%0A") : "") +
      "Yük: " + encodeURIComponent(data.load) + "%0A" +
      (data.note ? ("Not: " + encodeURIComponent(data.note) + "%0A") : "");

    window.open("https://wa.me/9054486866358?text=" + msg, "_blank");
  });

  // Haritalar rota/mesafe (harita alanı yok)
  $("#btnOpenDirections").on("click", function () {
    var from = ($("#quoteWhatsAppForm [name='from']").val() || "").trim();
    var to   = ($("#quoteWhatsAppForm [name='to']").val() || "").trim();

    if (!from || !to) {
      alert("Lütfen 'Nereden' ve 'Nereye' alanlarını doldurun.");
      return;
    }

    var url = "https://www.google.com/maps/dir/?api=1" +
      "&origin=" + encodeURIComponent(from) +
      "&destination=" + encodeURIComponent(to);

    window.open(url, "_blank");
  });

})(jQuery);
$(window).on("scroll", function () {
  if ($(this).scrollTop() > 60) {
    $("#mainNav").addClass("nav-scrolled");
  } else {
    $("#mainNav").removeClass("nav-scrolled");
  }
});
