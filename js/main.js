// ===== Cambio de idioma ES / EN =====
(function () {
  const body = document.body;
  const btn = document.getElementById("lang-toggle");

  function setLang(lang) {
    body.classList.remove("lang-es", "lang-en");
    body.classList.add("lang-" + lang);
    document.documentElement.lang = lang;
    btn.textContent = lang === "es" ? "EN" : "ES";
    try { localStorage.setItem("lang", lang); } catch (e) {}
  }

  let saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  // Si no hay preferencia guardada, usa el idioma del navegador
  const initial = saved || (navigator.language.startsWith("es") ? "es" : "en");
  setLang(initial);

  btn.addEventListener("click", function () {
    setLang(body.classList.contains("lang-es") ? "en" : "es");
  });
})();

// ===== Puntos de "observación" alrededor de la curva de luz =====
(function () {
  const g = document.querySelector(".lc-dots");
  if (!g) return;
  const svgNS = "http://www.w3.org/2000/svg";

  // Misma forma que la línea: eclipse primario en x=100, secundario en x=275
  function model(x) {
    const prim = 80 * Math.exp(-Math.pow((x - 100) / 13, 2));
    const sec = 45 * Math.exp(-Math.pow((x - 275) / 10, 2));
    return 40 + prim + sec;
  }

  for (let i = 0; i < 90; i++) {
    const x = Math.random() * 400;
    const y = model(x) + (Math.random() - 0.5) * 8;
    const c = document.createElementNS(svgNS, "circle");
    c.setAttribute("cx", x.toFixed(1));
    c.setAttribute("cy", y.toFixed(1));
    c.setAttribute("r", "1.6");
    g.appendChild(c);
  }
})();

// ===== Año del footer =====
document.getElementById("year").textContent = new Date().getFullYear();
