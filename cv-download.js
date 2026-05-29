(function () {
  function downloadBlob(blob, filename) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.rel = "noopener";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      URL.revokeObjectURL(url);
      a.remove();
    }, 250);
  }

  document.querySelectorAll("a.js-cv-download").forEach(function (link) {
    link.addEventListener("click", function (ev) {
      var href = link.getAttribute("href");
      var name = link.getAttribute("download") || "Ida-Kilander-CV-2.pdf";
      if (!href) return;

      if (location.protocol === "file:") {
        link.setAttribute(
          "title",
          "Om filen bara öppnas i fliken: starta en lokal webbserver (t.ex. Live Server) så fungerar nedladdning."
        );
        return;
      }

      ev.preventDefault();
      fetch(href, { credentials: "same-origin", cache: "no-store" })
        .then(function (res) {
          if (!res.ok) throw new Error("CV fetch failed");
          return res.blob();
        })
        .then(function (blob) {
          downloadBlob(blob, name);
        })
        .catch(function () {
          window.location.assign(href);
        });
    });
  });
})();
