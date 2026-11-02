# Trattoria Il Melograno — sito beta

Sito dimostrativo per un ristorante immaginario. HTML + CSS + JavaScript, nessun framework.

```
index.html     struttura e testi
css/style.css  aspetto (colori e font nelle variabili :root in cima)
js/main.js     menu, prenotazioni, galleria, orari
```

## Cosa contiene (checklist per un sito di ristorante)

- [x] Hero con foto, slogan e bottone "Prenota" ben visibile
- [x] Chi siamo / storia
- [x] Menu a schede con foto, prezzi, descrizioni e allergeni (V, VG, GF, piccante)
- [x] Galleria con ingrandimento (lightbox)
- [x] Recensioni
- [x] Prenotazione: data (no passato, no giorno di chiusura), orari pranzo/cena,
      orari pieni, persone, contatti, note allergie, consenso privacy, validazione
- [x] Orari, badge "Aperto ora / Chiuso ora", indirizzo, mappa Google, telefono cliccabile, WhatsApp
- [x] Mobile: menu hamburger + bottone "Prenota" fisso in basso
- [x] SEO: title, description, anteprima social (Open Graph), dati strutturati schema.org/Restaurant
- [x] Accessibilità: testi alternativi, link "vai al contenuto", navigazione da tastiera

## Personalizzare per un nuovo cliente

1. **Colori/font** → `css/style.css`, blocco `:root`
2. **Piatti** → `js/main.js`, oggetto `MENU` (nome, descrizione, prezzo, foto, tag)
3. **Orari e giorni di chiusura** → `js/main.js`, oggetto `ORARI` (+ tabella orari e JSON-LD in `index.html`)
4. **Foto** → ora sono di Unsplash; per un cliente vero metti le sue foto in una cartella `img/`

## Ricevere le prenotazioni via email (Formspree)

Il modulo è già pronto: manca solo l'indirizzo di Formspree.

1. Vai su https://formspree.io e crea un account gratuito (con l'email che deve ricevere le prenotazioni)
2. Clicca **+ New Form**, dagli un nome (es. "Prenotazioni Melograno")
3. Copia l'endpoint che ti mostra, tipo `https://formspree.io/f/abcdwxyz`
4. In `js/main.js` incollalo in `const FORM_ENDPOINT = "";`
5. Fai una prenotazione di prova: la prima volta Formspree ti chiede di confermare il form via email

Ogni prenotazione arriva con oggetto *"Nuova prenotazione: Nome, data ore …"*;
premendo "Rispondi" scrivi direttamente al cliente. Se l'invio fallisce,
il cliente vede un messaggio con il numero di telefono.

Piano gratuito: 50 invii al mese. Alternative: Getform, Netlify Forms, oppure
widget professionali (TheFork, OpenTable, Quandoo) che gestiscono anche disponibilità.

## Cosa manca per andare online "sul serio"

- **Privacy e cookie policy** vere (obbligatorie in Italia/UE, es. tramite Iubenda) e P.IVA reale
- **Menu PDF** scaricabile
- **Pubblicazione**: Netlify, Vercel o GitHub Pages (gratis) + dominio (~10 €/anno)
- **Google Business Profile** collegato al sito

## Avvio in locale

```
py -m http.server 8125 --directory ristorante-beta
```
poi apri http://localhost:8125
