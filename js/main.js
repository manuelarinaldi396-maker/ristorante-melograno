/* =========================================================
   Trattoria Il Melograno — script del sito
   Per un nuovo cliente basta modificare MENU e ORARI qui sotto.
   ========================================================= */

const img = (id) => `https://images.unsplash.com/photo-${id}?w=700&q=75&auto=format&fit=crop`;

// ---------- MENU: aggiungi/togli piatti qui ----------
// tags: v = vegetariano, vg = vegano, gf = senza glutine, hot = piccante
const MENU = {
  "Antipasti": [
    { name: "Bruschette al pomodoro", desc: "Pane toscano abbrustolito, pomodorini, basilico e olio EVO del Chianti.", price: 7, img: img("1572695157366-5e585ab2b69f"), tags: ["vg"] },
    { name: "Caprese di bufala", desc: "Mozzarella di bufala campana, pomodoro cuore di bue, basilico.", price: 11, img: img("1592417817098-8fd3d9eb14a5"), tags: ["v", "gf"] },
    { name: "Insalata dell'orto", desc: "Verdure di stagione, semi tostati, vinaigrette al melograno.", price: 9, img: img("1512621776951-a57141f2eefd"), tags: ["vg", "gf"] },
  ],
  "Primi": [
    { name: "Pici al ragù di cinghiale", desc: "Pasta tirata a mano, ragù cotto 6 ore, pecorino di Pienza.", price: 16, img: img("1551183053-bf91a1d81141"), tags: [], featured: true },
    { name: "Spaghetti al pomodoro", desc: "Pomodoro San Marzano, basilico fresco, olio a crudo.", price: 12, img: img("1473093295043-cdd812d0e601"), tags: ["vg"] },
    { name: "Risotto ai funghi porcini", desc: "Carnaroli mantecato, porcini dell'Amiata, timo.", price: 17, img: img("1476124369491-e7addf5db371"), tags: ["v", "gf"] },
    { name: "Penne all'arrabbiata", desc: "Pomodoro, aglio, peperoncino calabrese, prezzemolo.", price: 12, img: img("1563379926898-05f4575a45d8"), tags: ["vg", "hot"] },
  ],
  "Secondi": [
    { name: "Bistecca alla fiorentina", desc: "Chianina IGP, cotta sulla brace. Prezzo all'etto (min. 1 kg).", price: 6.5, unit: "/hg", img: img("1600891964092-4316c288032e"), tags: ["gf"], featured: true },
    { name: "Salmone in crosta di erbe", desc: "Filetto al forno, erbe aromatiche, patate novelle.", price: 19, img: img("1519708227418-c8fd9a32b7a2"), tags: ["gf"] },
    { name: "Pollo al mattone", desc: "Pollo ruspante, limone, rosmarino, verdure grigliate.", price: 17, img: img("1598103442097-8b74394b95c6"), tags: ["gf"] },
  ],
  "Dolci": [
    { name: "Tiramisù della casa", desc: "Savoiardi, mascarpone, caffè espresso, cacao amaro.", price: 7, img: img("1571877227200-a0d98ea607e9"), tags: ["v"], featured: true },
    { name: "Panna cotta ai frutti rossi", desc: "Panna fresca, vaniglia Bourbon, coulis di frutti di bosco.", price: 6, img: img("1488477181946-6428a0291777"), tags: ["v", "gf"] },
    { name: "Cheesecake al melograno", desc: "Base di biscotto, crema di formaggio, gelée di melograno.", price: 7, img: img("1533134242443-d4fd215305ad"), tags: ["v"] },
  ],
  "Vini": [
    { name: "Chianti Classico DOCG", desc: "Sangiovese, rosso rubino, note di ciliegia e viola. Calice / bottiglia.", price: 7, unit: " / 28 €", img: img("1510812431401-41d2bd2722f3"), tags: ["vg", "gf"] },
    { name: "Vernaccia di San Gimignano", desc: "Bianco secco e minerale, ideale con pesce e verdure.", price: 6, unit: " / 24 €", img: img("1506377247377-2a5b3b417ebb"), tags: ["vg", "gf"] },
  ],
};

// ---------- ORARI: 0 = domenica, 1 = lunedì ... 6 = sabato ----------
const ORARI = {
  closedDays: [1],
  lunch:  { from: "12:00", to: "14:00" },   // ultimo orario prenotabile
  dinner: { from: "19:00", to: "22:00" },
  stepMinutes: 30,
  // orari di apertura reali (per il badge "Aperto ora")
  open: [["12:00", "14:30"], ["19:00", "23:00"]],
};

// ---------- INVIO PRENOTAZIONI VIA EMAIL ----------
// 1. Crea un account gratuito su https://formspree.io e un nuovo form
// 2. Incolla qui l'indirizzo che ti dà (es. "https://formspree.io/f/abcdwxyz")
// Se resta vuoto, il sito funziona in modalità demo (salva solo nel browser).
const FORM_ENDPOINT = "https://formspree.io/f/xzeekrld";

const TAG_LABEL ={ v: "V", vg: "VG", gf: "GF", hot: "🌶" };
const FALLBACK_IMG = "data:image/svg+xml," + encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'><rect width='300' height='200' fill='#f3ebdf'/><text x='150' y='108' font-family='Georgia' font-size='18' fill='#a3262a' text-anchor='middle'>Foto in arrivo</text></svg>`
);

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const euro = (n) => n.toLocaleString("it-IT", { style: "currency", currency: "EUR", minimumFractionDigits: n % 1 ? 2 : 0 });

/* ===================== NAVBAR ===================== */
const nav = $("#nav");
const navToggle = $("#navToggle");

function onScroll() {
  nav.classList.toggle("is-scrolled", window.scrollY > 40);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

navToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", open);
});
$$("#navMenu a").forEach((a) => a.addEventListener("click", () => {
  nav.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", false);
}));

/* ===================== MENU ===================== */
const tabsEl = $("#menuTabs");
const gridEl = $("#menuGrid");

function renderMenu(category) {
  $$(".tab", tabsEl).forEach((t) => t.setAttribute("aria-selected", t.dataset.cat === category));
  gridEl.innerHTML = MENU[category].map((d) => `
    <article class="dish ${d.featured ? "dish--featured" : ""}">
      <img class="dish__img" src="${d.img}" alt="${d.name}" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK_IMG}'">
      <div class="dish__body">
        ${d.featured ? '<span class="badge">★ Consigliato dallo chef</span>' : ""}
        <div class="dish__top">
          <h3 class="dish__name">${d.name}</h3>
          <span class="dish__price">${euro(d.price)}${d.unit || ""}</span>
        </div>
        <p class="dish__desc">${d.desc}</p>
        <div class="dish__tags">${d.tags.map((t) => `<span class="tag tag--${t}">${TAG_LABEL[t]}</span>`).join("")}</div>
      </div>
    </article>`).join("");
}

tabsEl.innerHTML = Object.keys(MENU)
  .map((c) => `<button class="tab" role="tab" data-cat="${c}">${c}</button>`).join("");
tabsEl.addEventListener("click", (e) => {
  const tab = e.target.closest(".tab");
  if (tab) renderMenu(tab.dataset.cat);
});
renderMenu(Object.keys(MENU)[0]);

$("#menuPdf").addEventListener("click", (e) => {
  e.preventDefault();
  alert("Qui andrebbe il link al PDF del menu (es. menu.pdf nella cartella del sito).");
});

/* ===================== GALLERIA / LIGHTBOX ===================== */
const lightbox = $("#lightbox");
const lightboxImg = $("img", lightbox);

$("#gallery").addEventListener("click", (e) => {
  const item = e.target.closest(".gallery__item");
  if (!item) return;
  const src = $("img", item);
  lightboxImg.src = src.src.replace(/w=\d+/, "w=1600");
  lightboxImg.alt = src.alt;
  lightbox.hidden = false;
});
lightbox.addEventListener("click", (e) => {
  if (e.target !== lightboxImg) lightbox.hidden = true;
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { lightbox.hidden = true; closeModal(); }
});

/* ===================== PRENOTAZIONE ===================== */
const form = $("#bookingForm");
const dateInput = $("#date");
const guestsSelect = $("#guests");
const slotsEl = $("#slots");
let selectedTime = null;

if (FORM_ENDPOINT) $("#demoNote").hidden = true;

const toMin = (hhmm) => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; };
const toHHMM = (min) => `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;
const isoDate = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

// Data minima = oggi, massima = tra 60 giorni
const today = new Date();
dateInput.min = isoDate(today);
dateInput.max = isoDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 60));

guestsSelect.innerHTML = Array.from({ length: 10 }, (_, i) =>
  `<option value="${i + 1}" ${i === 1 ? "selected" : ""}>${i + 1} ${i ? "persone" : "persona"}</option>`).join("");

function slotsFor(range) {
  const out = [];
  for (let m = toMin(range.from); m <= toMin(range.to); m += ORARI.stepMinutes) out.push(toHHMM(m));
  return out;
}

// Simula alcuni orari "pieni" (in un sito vero arriverebbero dal server)
function isFull(dateStr, time) {
  const seed = [...(dateStr + time)].reduce((a, c) => a + c.charCodeAt(0), 0);
  return seed % 5 === 0;
}

function renderSlots() {
  selectedTime = null;
  const value = dateInput.value;
  if (!value) { slotsEl.innerHTML = '<p class="muted">Scegli prima una data.</p>'; return; }

  const date = new Date(value + "T00:00");
  if (ORARI.closedDays.includes(date.getDay())) {
    slotsEl.innerHTML = '<p class="muted">Siamo chiusi in questo giorno. Scegli un\'altra data.</p>';
    return;
  }

  const isToday = value === isoDate(new Date());
  const nowMin = new Date().getHours() * 60 + new Date().getMinutes() + 60; // almeno 1h di anticipo

  const group = (label, range) => `
    <span class="slot-group">${label}</span>
    ${slotsFor(range).map((t) => {
      const disabled = (isToday && toMin(t) < nowMin) || isFull(value, t);
      return `<button type="button" class="slot" role="radio" aria-checked="false" data-time="${t}" ${disabled ? "disabled title='Non disponibile'" : ""}>${t}</button>`;
    }).join("")}`;

  slotsEl.innerHTML = group("Pranzo", ORARI.lunch) + group("Cena", ORARI.dinner);
}

dateInput.addEventListener("change", () => { renderSlots(); validateField("date"); });

slotsEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".slot");
  if (!btn || btn.disabled) return;
  $$(".slot", slotsEl).forEach((s) => s.setAttribute("aria-checked", s === btn));
  selectedTime = btn.dataset.time;
  setError("time", "");
});

function setError(field, msg) {
  const el = $(`.error[data-for="${field}"]`);
  if (el) el.textContent = msg;
  const input = form.elements[field];
  if (input && input.classList) input.classList.toggle("is-invalid", !!msg);
}

const validators = {
  date: () => {
    const v = dateInput.value;
    if (!v) return "Seleziona una data.";
    if (v < dateInput.min) return "La data non può essere nel passato.";
    if (v > dateInput.max) return "Si può prenotare fino a 60 giorni in anticipo.";
    if (ORARI.closedDays.includes(new Date(v + "T00:00").getDay())) return "Il lunedì siamo chiusi.";
    return "";
  },
  guests: () => (guestsSelect.value ? "" : "Indica il numero di persone."),
  time: () => (selectedTime ? "" : "Scegli un orario."),
  name: () => (form.name.value.trim().length >= 3 ? "" : "Inserisci nome e cognome."),
  phone: () => (/^\+?[\d\s]{8,15}$/.test(form.phone.value.trim()) ? "" : "Numero di telefono non valido."),
  email: () => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.value.trim()) ? "" : "Email non valida."),
  privacy: () => (form.privacy.checked ? "" : "Devi accettare l'informativa privacy."),
};

function validateField(field) {
  const msg = validators[field]();
  setError(field, msg);
  return !msg;
}

["name", "phone", "email"].forEach((f) => form.elements[f].addEventListener("blur", () => validateField(f)));
form.privacy.addEventListener("change", () => validateField("privacy"));

// Invia la prenotazione a Formspree, che la inoltra per email al ristorante
async function sendBooking(booking, dateLabel) {
  const res = await fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      _subject: `Nuova prenotazione: ${booking.name}, ${dateLabel} ore ${booking.time}`,
      Nome: booking.name,
      Data: dateLabel,
      Orario: booking.time,
      Persone: booking.guests,
      Telefono: booking.phone,
      email: booking.email,   // "email" permette di rispondere direttamente al cliente
      Note: booking.notes || "—",
    }),
  });
  if (!res.ok) throw new Error("Invio fallito: " + res.status);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const ok = Object.keys(validators).map(validateField).every(Boolean);
  if (!ok) {
    const firstError = $$(".error", form).find((el) => el.textContent);
    firstError?.parentElement.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  const booking = {
    date: dateInput.value,
    time: selectedTime,
    guests: Number(guestsSelect.value),
    name: form.name.value.trim(),
    phone: form.phone.value.trim(),
    email: form.email.value.trim(),
    notes: form.notes.value.trim(),
    createdAt: new Date().toISOString(),
  };

  const dateLabel = new Date(booking.date + "T00:00").toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" });

  if (FORM_ENDPOINT) {
    const submitBtn = $("button[type=submit]", form);
    submitBtn.disabled = true;
    submitBtn.textContent = "Invio in corso…";
    try {
      await sendBooking(booking, dateLabel);
    } catch {
      setError("privacy", "Non siamo riusciti a inviare la prenotazione. Riprova o chiamaci al 055 000 0000.");
      return;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Invia prenotazione";
    }
  } else {
    // Modalità demo: salvataggio solo nel browser
    try {
      const list = JSON.parse(localStorage.getItem("melograno_prenotazioni") || "[]");
      list.push(booking);
      localStorage.setItem("melograno_prenotazioni", JSON.stringify(list));
    } catch { /* storage non disponibile: va bene lo stesso */ }
  }

  $("#modalText").innerHTML = `Grazie <strong>${booking.name.split(" ")[0]}</strong>! Abbiamo ricevuto la richiesta per <strong>${booking.guests} ${booking.guests > 1 ? "persone" : "persona"}</strong> ${dateLabel} alle <strong>${booking.time}</strong>.<br>Riceverai una conferma a ${booking.email}.`;
  $("#modal").hidden = false;
  $("#modalClose").focus();

  form.reset();
  guestsSelect.value = "2";
  renderSlots();
});

function closeModal() { $("#modal").hidden = true; }
$("#modalClose").addEventListener("click", closeModal);
$("#modal").addEventListener("click", (e) => { if (e.target.id === "modal") closeModal(); });

/* ===================== APERTO / CHIUSO ORA ===================== */
function updateOpenStatus() {
  const el = $("#openStatus");
  const now = new Date();
  const min = now.getHours() * 60 + now.getMinutes();
  const open = !ORARI.closedDays.includes(now.getDay()) &&
    ORARI.open.some(([a, b]) => min >= toMin(a) && min < toMin(b));
  el.textContent = open ? "Aperto ora" : "Chiuso ora";
  el.className = "status " + (open ? "is-open" : "is-closed");
}
updateOpenStatus();
setInterval(updateOpenStatus, 60_000);

/* ===================== CTA MOBILE ===================== */
// Nasconde il bottone fisso "Prenota" quando il form è già visibile
const stickyCta = $(".sticky-cta");
new IntersectionObserver(([entry]) => {
  stickyCta.classList.toggle("is-hidden", entry.isIntersecting);
}, { threshold: 0.1 }).observe($("#prenota"));
