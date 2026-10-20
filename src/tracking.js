/**
 * Bewerbungs-Links: iverbohnes.de/<kürzel>
 *
 * Jede Bewerbung enthält einen eigenen Link (z. B. /otto). Wird er geöffnet,
 * meldet die Seite das an die Career Inbox und zeigt danach die normale
 * Adresse ohne Kürzel. Keine Cookies, keine IP — nur Kürzel, Unterseiten,
 * Verweildauer und Geräteart (siehe Datenschutz, Abschnitt 6).
 *
 * Ziel-URL der Career Inbox kommt aus REACT_APP_INBOX_URL (Vercel → Settings
 * → Environment Variables). Fehlt sie, passiert nichts.
 */

const INBOX = (process.env.REACT_APP_INBOX_URL || '').replace(/\/$/, '');

/** Echte Unterseiten und Dateien — die sind nie ein Bewerbungs-Kürzel. */
const RESERVIERT = new Set([
  'cv',
  'impressum',
  'datenschutz',
  'en',
  'de',
  'static',
  'images',
  'fonts',
  'documents',
  'api',
  'index.html',
]);

const KEY_REF = 'ib-ref';
const KEY_SITZUNG = 'ib-sitzung';
const KEY_START = 'ib-start';

/* sessionStorage kann in privaten Fenstern fehlen — dann im Speicher halten. */
const speicher = {};
function lesen(key) {
  try {
    return window.sessionStorage.getItem(key);
  } catch (e) {
    return speicher[key] || null;
  }
}
function schreiben(key, value) {
  speicher[key] = value;
  try {
    window.sessionStorage.setItem(key, value);
  } catch (e) {
    /* egal */
  }
}

function senden(daten) {
  if (!INBOX) return;
  try {
    const body = JSON.stringify(daten);
    const ziel = `${INBOX}/api/visit`;
    // text/plain löst keinen CORS-Preflight aus; sendBeacon überlebt auch das Schließen des Tabs.
    if (navigator.sendBeacon && navigator.sendBeacon(ziel, new Blob([body], { type: 'text/plain' }))) return;
    fetch(ziel, { method: 'POST', body, keepalive: true, mode: 'no-cors', headers: { 'Content-Type': 'text/plain' } }).catch(
      () => {}
    );
  } catch (e) {
    /* Tracking darf die Seite nie stören */
  }
}

function seitenName(pathname) {
  const p = (pathname || '/').replace(/\/+$/, '');
  return p === '' ? 'start' : p.replace(/^\//, '');
}

let endeRegistriert = false;
function endeMelden() {
  if (endeRegistriert) return;
  endeRegistriert = true;
  const melden = () => {
    const ref = lesen(KEY_REF);
    const start = Number(lesen(KEY_START));
    if (!ref || !start) return;
    senden({
      typ: 'ende',
      ref,
      sitzung: lesen(KEY_SITZUNG),
      sekunden: Math.round((Date.now() - start) / 1000),
    });
  };
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') melden();
  });
  window.addEventListener('pagehide', melden);
}

/** Läuft einmal vor dem ersten Rendern (index.js). */
export function initTracking() {
  try {
    const treffer = window.location.pathname.match(/^\/([a-z0-9-]{2,40})\/?$/i);
    const kandidat = treffer ? treffer[1].toLowerCase() : null;

    if (kandidat && !RESERVIERT.has(kandidat)) {
      const sitzung = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
      schreiben(KEY_REF, kandidat);
      schreiben(KEY_SITZUNG, sitzung);
      schreiben(KEY_START, String(Date.now()));
      // Adresse aufräumen, bevor der Router startet — sonst landet man auf einer leeren Seite.
      window.history.replaceState(null, '', `/${window.location.search}${window.location.hash}`);
      senden({
        typ: 'start',
        ref: kandidat,
        sitzung,
        pfad: 'start',
        bot: Boolean(navigator.webdriver),
        sprache: (navigator.language || '').slice(0, 5),
      });
    }

    if (lesen(KEY_REF)) endeMelden();
  } catch (e) {
    /* nie die Seite blockieren */
  }
}

/** Bei jedem Seitenwechsel (App.js). Ohne Kürzel in der Sitzung: nichts. */
export function trackSeite(pathname) {
  const ref = lesen(KEY_REF);
  if (!ref) return;
  senden({ typ: 'seite', ref, sitzung: lesen(KEY_SITZUNG), pfad: seitenName(pathname) });
}

/** Für die Website-eigene Erkennung: kam der Besucher über einen Bewerbungs-Link? */
export function hatRef() {
  return Boolean(lesen(KEY_REF));
}
