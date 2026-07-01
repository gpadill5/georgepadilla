(function () {
  var filePattern = /\.(pdf|docx?)($|[?#])/i;

  document.querySelectorAll("a[href]").forEach(function (link) {
    var rawHref = link.getAttribute("href") || "";

    if (
      rawHref.indexOf("/files/") === 0 ||
      filePattern.test(rawHref) ||
      (link.protocol === "http:" || link.protocol === "https:") &&
        link.hostname !== window.location.hostname
    ) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener");
    }
  });
})();
