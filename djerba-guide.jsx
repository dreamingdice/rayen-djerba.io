import { useState, useEffect, useRef } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

/* ─── TRANSLATIONS ───────────────────────────────────────────── */
const T = {
  de: {
    badge: "✦ Familien-Reiseführer · Regensburg · August 2026 ✦",
    heroSub: "Die Perle des Mittelmeers — 14 Nächte Familientraum",
    heroChips: ["Reisende","Nächte","Zimmer","Im August","Meer","Flüge H/R","Sehenswürdigkeiten"],
    nav: ["Flüge","Hotels","Sehenswürdigkeiten","Strände","Aktivitäten","Ausflüge","Planung","Restaurants","Cafés","Wetter","Tipps"],
    navIds: ["vol","hotels","sites","plages","activites","excursions","planning","restaurants","cafes","meteo","conseils"],
    flightSec: "✈️ Bestätigte Flüge",
    flightH: ["Frankfurt","München","Djerba"],
    flightSub: "Discover Airlines · Airbus A320 · Nonstop · 5 Personen",
    flightFamTitle: "6 Passagiere — Familie aus Regensburg",
    flightFamSub: "3 Erwachsene + 2 Kinder (Mädchen 8 & 10 Jahre) · Regensburg → Startflughafen per ICE (~1h20) → Djerba direkt",
    outbound: "✈ Hinflug",
    return: "↩ Rückflug",
    nonstop: "nonstop",
    bagWarnTitle: "Economy Light — Kein Aufgabegepäck inklusive!",
    bagWarnText: "Jeder Passagier: 1 persönliches Gepäckstück max. 40×30×15cm + 1 Handgepäck max. 8kg (55×40×23cm). Aufgabegepäck kostet ca. €80–120 Aufpreis für die Gruppe.",
    totalFlight5: "Gesamtflugkosten · 5 Passagiere",
    perPax: "≈ €{x} pro Person · Hin- und Rückflug",
    nights14: "14 Nächte auf der Insel — 5. bis 19. Aug",
    directBoth: "Beide Flüge nonstop, gleiche Airline",
    or: "ODER",
    fromCity: "ab",
    hotelSec: "🏨 Live Hotel-Suche · 3 Zimmer · 5.–19. Aug",
    hotelH: ["Beste","Hotels"],
    hotelSub: "Zimmer 1 (2 Erw. + 2 Kinder) · Zimmer 2 (2 Erw.) · Zimmer 3 (2 Erw.) · 14 Nächte · Preise in EUR",
    perRoomTitle: "💶 Preis pro Zimmer · 14 Nächte",
    total3rooms: "Gesamt 3 Zimmer",
    perNight: "Nacht",
    totalNights: "Gesamt",
    cancelOk: "✓ Kostenlos stornierbar bis",
    cancelNo: "✗ Nicht erstattungsfähig ⚠️",
    onRequest: "Auf Anfrage",
    contactHotel: "Direkt beim Hotel anfragen",
    perRoomNote: "* Geschätzte Zimmerpreise basierend auf lastminute.com Gesamtpreis (GBP × 1.17 = EUR)",
    bestBeachTitle: "Bestes Strandhotel: Iberostar Waves Mehari Djerba",
    bestBeachDesc: "Bewertet 98/100 von 4.725 Gästen. Direkt am Strand von Sidi Mahres — Djerbas schönste 12km Sandstrand. Privatstrand inklusive, All-Inclusive, kostenlose Stornierung bis 1. Aug.",
    beach: "🏖️ Strand",
    allInclusive: "🍽️ All-Inclusive",
    roomOnly: "🛏️ Nur Zimmer",
    bb: "🌅 Zimmer + Frühstück",
    sitesSec: "🏛️ Sehenswürdigkeiten",
    sitesH: ["Die Highlights","von Djerba"],
    sitesSub: "17 Sehenswürdigkeiten für 2.500 Jahre Geschichte — Kultur, Kunst, Architektur, Natur und sogar Star Wars!",
    must: "⭐ Unbedingt besuchen",
    beachesSec: "🏖️ Strände",
    beachesH: ["Die","Strände","von Djerba"],
    beachesSub: "Zwei Hauptstrände mit sehr unterschiedlichem Charakter.",
    actSec: "🎯 Aktivitäten & Freizeit",
    actH: ["Was","tun","in Djerba?"],
    actSub: "8 unvergessliche Aktivitäten für die ganze Familie.",
    forKids: "👥 Für Familien",
    forAll: "👥 Für alle",
    excSec: "🗺️ Tagesausflüge",
    excH: ["Über die Insel","hinaus"],
    excSub: "Zwei epische Ausflüge in den Süden Tunesiens.",
    planSec: "📅 Tagesplan",
    planH: ["14 Nächte","Abenteuer","5.–19. Aug 2026"],
    planSub: "Jeder Tag geplant mit Aktivitäten, Restaurants und Tipps.",
    restoSec: "🍽️ Restaurants",
    restoH: ["Die besten","Tische","in Djerba"],
    restoSub: "Top 15 Restaurants der Insel nach Bewertung.",
    cafesSec: "☕ Cafés & Pausen",
    cafesH: ["Durchatmen,","Genießen"],
    cafesSub: "6 Adressen für den besten Kaffee der Insel.",
    meteoSec: "🌤️ Wetter & Klima",
    meteoH: ["August —","Beste Zeit","fürs Meer"],
    meteoSub: "30°C Luft, 28°C Meer, 12h Sonnenschein täglich.",
    meteoWarn: "⚠️ Im August ist es zwischen 13 und 16 Uhr sehr heiß — plane Aktivitäten für früh morgens und späten Nachmittag.",
    tipsSec: "💡 Reise-Tipps",
    tipsH: ["Alles was Ihre","Familie wissen","muss"],
    tipsSub: "12 wichtige Tipps für einen perfekten Familienurlaub.",
    footerTitle: "Djerba Familien-Reiseführer 2026 — Familie aus Regensburg",
    footerSub: "5. Aug → 19. Aug · 5 Personen · 14 Nächte · Die Perle des Mittelmeers erwartet Sie 🌊",
    bLabels: ["Flüge (5 Pers.)","Hotel Bestes","Hotel Top Strand","Dauer","Reisende","Sehenswürd."],
    langBtn: "🇩🇪 DE / 🇬🇧 EN",
    airTemp: "● Lufttemperatur",
    seaTemp: "● Meerestemperatur",
    hotelTopPlage: "🏅 Bester Strand",
    hotelAI: "🏆 All-Inclusive",
    hotelValue: "💰 Bestes Preis-Leistungs-Verhältnis",
    hotelNature: "🌿 Natur & Ruhe",
    hotelBnb: "🌸 Gästehaus",
    hotelChar: "✨ Boutique Hotel",
    mustVisitBadge: "⭐ Unbedingt",
    fromPrice: "Ab",
    totalLabel: "Gesamt",
  },
  en: {
    badge: "✦ Family Travel Guide · Regensburg · August 2026 ✦",
    heroSub: "The Pearl of the Mediterranean — 14 Nights Family Dream",
    heroChips: ["Travellers","Nights","Rooms","In August","Sea","Flights R/T","Sights"],
    nav: ["Flights","Hotels","Sights","Beaches","Activities","Day Trips","Itinerary","Restaurants","Cafés","Weather","Tips"],
    navIds: ["vol","hotels","sites","plages","activites","excursions","planning","restaurants","cafes","meteo","conseils"],
    flightSec: "✈️ Confirmed Flights",
    flightH: ["Frankfurt","Munich","Djerba"],
    flightSub: "Discover Airlines · Airbus A320 · Non-stop · 5 Passengers",
    flightFamTitle: "5 Passengers — Family from Regensburg",
    flightFamSub: "3 Adults + 2 Children (girls 8 & 10 yrs) · Regensburg → Departure airport by ICE (~1h20) → Djerba direct",
    outbound: "✈ Outbound",
    return: "↩ Return",
    nonstop: "non-stop",
    bagWarnTitle: "Economy Light — No checked baggage included!",
    bagWarnText: "Each passenger: 1 personal item max. 40×30×15cm + 1 cabin bag max. 8kg (55×40×23cm). Checked luggage costs approx. €80–120 extra for the group.",
    totalFlight5: "Total Flight Cost · 5 Passengers",
    perPax: "≈ €{x} per person · Round-trip",
    nights14: "14 nights on the island — Aug 5 to 19",
    directBoth: "Both flights non-stop, same airline",
    or: "OR",
    fromCity: "from",
    hotelSec: "🏨 Live Hotel Search · 3 Rooms · Aug 5–19",
    hotelH: ["Best","Hotels"],
    hotelSub: "Room 1 (2 adults + 2 children) · Room 2 (2 adults) · Room 3 (2 adults) · 14 nights · Prices in EUR",
    perRoomTitle: "💶 Price per Room · 14 nights",
    total3rooms: "Total 3 rooms",
    perNight: "night",
    totalNights: "Total",
    cancelOk: "✓ Free cancellation until",
    cancelNo: "✗ Non-refundable ⚠️",
    onRequest: "On request",
    contactHotel: "Contact hotel directly",
    perRoomNote: "* Estimated per-room prices based on lastminute.com total (GBP × 1.17 = EUR)",
    bestBeachTitle: "Best Beach Hotel: Iberostar Waves Mehari Djerba",
    bestBeachDesc: "Rated 98/100 by 4,725 guests. Directly on Sidi Mahres beach — Djerba's finest 12km of white sand. Private beach, All-Inclusive, free cancellation until Aug 1.",
    beach: "🏖️ Beach",
    allInclusive: "🍽️ All-Inclusive",
    roomOnly: "🛏️ Room Only",
    bb: "🌅 Bed & Breakfast",
    sitesSec: "🏛️ Sights",
    sitesH: ["Top Attractions","in Djerba"],
    sitesSub: "17 sights to discover 2,500 years of history — culture, art, architecture, nature and even Star Wars!",
    must: "⭐ Must Visit",
    beachesSec: "🏖️ Beaches",
    beachesH: ["The","Beaches","of Djerba"],
    beachesSub: "Two main beaches with very different characters.",
    actSec: "🎯 Activities & Leisure",
    actH: ["What","to Do","in Djerba?"],
    actSub: "8 unforgettable activities for the whole family.",
    forKids: "👥 Family-Friendly",
    forAll: "👥 For Everyone",
    excSec: "🗺️ Day Trips",
    excH: ["Beyond","the Island"],
    excSub: "Two epic day trips into southern Tunisia.",
    planSec: "📅 Day-by-Day Plan",
    planH: ["14 Nights","of Adventure","Aug 5–19, 2026"],
    planSub: "Every day planned with activities, restaurants and tips.",
    restoSec: "🍽️ Restaurants",
    restoH: ["Best","Tables","in Djerba"],
    restoSub: "Top 15 restaurants on the island by rating.",
    cafesSec: "☕ Cafés & Coffee",
    cafesH: ["Slow Down,","Savour"],
    cafesSub: "6 addresses for the best coffee on the island.",
    meteoSec: "🌤️ Weather & Climate",
    meteoH: ["August —","Best Time","for the Sea"],
    meteoSub: "30°C air, 28°C sea, 12h sunshine daily.",
    meteoWarn: "⚠️ In August it gets very hot between 1pm–4pm — plan activities for early morning and late afternoon.",
    tipsSec: "💡 Travel Tips",
    tipsH: ["Everything Your","Family","Needs to Know"],
    tipsSub: "12 essential tips for a perfect family holiday.",
    footerTitle: "Djerba Family Travel Guide 2026 — Regensburg Family",
    footerSub: "Aug 5 → 19 · 5 Persons · 14 Nights · The Pearl of the Mediterranean awaits 🌊",
    bLabels: ["Flights (5 pax)","Best Value","Top Beach","Duration","Travellers","Sights"],
    langBtn: "🇩🇪 DE / 🇬🇧 EN",
    airTemp: "● Air Temperature",
    seaTemp: "● Sea Temperature",
    hotelTopPlage: "🏅 Best Beach",
    hotelAI: "🏆 All-Inclusive",
    hotelValue: "💰 Best Value",
    hotelNature: "🌿 Nature & Calm",
    hotelBnb: "🌸 Guesthouse",
    hotelChar: "✨ Boutique Hotel",
    mustVisitBadge: "⭐ Must-See",
    fromPrice: "From",
    totalLabel: "Total",
  }
};

/* ─── STYLES ───────────────────────────────────────────────────── */
const G = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,600;0,900;1,300&family=Outfit:wght@300;400;500;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
:root{
  --sun:#F5A623;--ocean:#0E4D7B;--teal:#1A8C7E;--sand:#FDF6EC;
  --coral:#E8643C;--white:#FFFFFF;--ink:#1C1410;--mist:#F0EAE0;
  --r:20px;--shadow:0 4px 24px rgba(14,77,123,.10);
  --ff-h:'Fraunces',serif;--ff-b:'Outfit',sans-serif;
}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%;}
body{font-family:var(--ff-b);background:var(--sand);color:var(--ink);font-size:16px;line-height:1.6;}

/* TOPBAR */
.topbar{position:sticky;top:0;z-index:999;background:var(--ocean);
  padding:0 12px;display:flex;align-items:center;
  overflow-x:auto;scrollbar-width:none;box-shadow:0 2px 16px rgba(0,0,0,.25);}
.topbar::-webkit-scrollbar{display:none;}
.tb-btn{flex-shrink:0;padding:15px 16px 13px;font-size:12px;font-weight:600;
  color:rgba(255,255,255,.6);cursor:pointer;white-space:nowrap;
  border-bottom:3px solid transparent;transition:.2s;display:flex;align-items:center;gap:5px;}
.tb-btn:hover{color:#fff;}
.tb-btn.on{color:#fff;border-bottom-color:var(--sun);}
.lang-btn{margin-left:auto;flex-shrink:0;background:rgba(255,255,255,.12);
  border:1px solid rgba(255,255,255,.25);border-radius:20px;padding:6px 14px;
  font-size:11px;font-weight:700;color:#fff;cursor:pointer;white-space:nowrap;transition:.2s;}
.lang-btn:hover{background:rgba(255,255,255,.2);}

/* HERO */
.hero{background:linear-gradient(160deg,#061825 0%,var(--ocean) 45%,#0E6B5E 75%,#C4763B 100%);
  min-height:85vh;display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:60px 24px 88px;position:relative;overflow:hidden;text-align:center;}
.hero::before{content:'';position:absolute;inset:0;
  background:radial-gradient(circle at 30% 70%,rgba(245,166,35,.12) 0%,transparent 60%),
    radial-gradient(circle at 70% 20%,rgba(26,140,126,.15) 0%,transparent 50%);}
.hero-badge{background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);
  color:#fff;font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;
  padding:8px 22px;border-radius:30px;margin-bottom:24px;position:relative;}
.hero h1{font-family:var(--ff-h);font-size:clamp(60px,12vw,120px);font-weight:900;
  color:#fff;line-height:.88;letter-spacing:-3px;position:relative;
  text-shadow:0 4px 50px rgba(0,0,0,.4);}
.hero h1 em{font-style:italic;color:var(--sun);}
.hero-tagline{font-family:var(--ff-h);font-style:italic;font-weight:300;
  font-size:clamp(17px,2.8vw,24px);color:rgba(255,255,255,.8);margin-top:16px;position:relative;}
.hero-chips{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:40px;position:relative;}
.hchip{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);
  border-radius:14px;padding:12px 18px;color:#fff;min-width:100px;}
.hchip .v{font-family:var(--ff-h);font-size:24px;font-weight:900;color:var(--sun);display:block;line-height:1;}
.hchip .l{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;opacity:.6;margin-top:3px;}
.hero-wave{position:absolute;bottom:-2px;left:0;width:100%;}

/* SECTION */
.wrap{max-width:1100px;margin:0 auto;padding:64px 20px;}
.sh{margin-bottom:36px;}
.sh .ey{font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--coral);font-weight:700;margin-bottom:8px;}
.sh h2{font-family:var(--ff-h);font-size:clamp(28px,5vw,50px);font-weight:900;color:var(--ocean);line-height:1.05;}
.sh h2 span{color:var(--coral);}
.sh p{font-size:15px;color:#6B5A4A;margin-top:10px;max-width:600px;line-height:1.65;}

/* DARK BANDS */
.band-dark{background:#0D1E2C;}
.band-ocean{background:var(--ocean);}
.band-teal{background:#0D4A43;}
.band-white{background:var(--white);}
.band-sand{background:var(--sand);}
.band-mist{background:var(--mist);}

/* FLIGHT STYLES */
.flt-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:22px;}
@media(max-width:620px){.flt-grid{grid-template-columns:1fr;}}
.flt-opt-label{font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:700;
  color:rgba(255,255,255,.5);margin-bottom:12px;}
.flt{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);
  border-radius:var(--r);padding:26px;}
.flt.go{border-top:4px solid #56D9C8;}
.flt.back{border-top:4px solid var(--sun);}
.flt-dir{font-size:10px;letter-spacing:3px;text-transform:uppercase;font-weight:700;margin-bottom:10px;}
.flt.go .flt-dir{color:#56D9C8;}
.flt.back .flt-dir{color:var(--sun);}
.flt-date{font-size:12px;color:rgba(255,255,255,.4);margin-bottom:18px;}
.flt-times{display:flex;align-items:center;gap:10px;margin-bottom:16px;}
.flt-t{font-family:var(--ff-h);font-size:40px;font-weight:900;color:#fff;line-height:1;}
.flt-ap{font-size:11px;color:rgba(255,255,255,.4);letter-spacing:2px;margin-top:4px;}
.flt-mid{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;}
.flt-line{width:100%;height:1px;background:rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;}
.flt-line::after{content:'✈';font-size:13px;color:rgba(255,255,255,.3);background:rgba(255,255,255,.05);padding:0 7px;}
.flt-ns{font-size:10px;color:rgba(255,255,255,.28);letter-spacing:2px;text-transform:uppercase;}
.flt-foot{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:6px;
  padding-top:14px;border-top:1px solid rgba(255,255,255,.08);}
.flt-dur{font-size:12px;color:rgba(255,255,255,.5);}
.flt-dur b{color:#fff;}
.flt-cls{background:rgba(245,166,35,.18);color:var(--sun);border-radius:8px;padding:3px 10px;font-size:11px;font-weight:700;}

.flt-or-divider{display:flex;align-items:center;gap:16px;margin:20px 0;color:rgba(255,255,255,.4);}
.flt-or-divider::before,.flt-or-divider::after{content:'';flex:1;height:1px;background:rgba(255,255,255,.12);}
.flt-or-text{font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;
  background:rgba(255,255,255,.08);padding:6px 16px;border-radius:20px;}

.price-hero{background:linear-gradient(135deg,rgba(86,217,200,.1),rgba(245,166,35,.07));
  border:1px solid rgba(86,217,200,.2);border-radius:var(--r);
  padding:24px 28px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px;margin-bottom:20px;}
.price-big{font-family:var(--ff-h);font-size:56px;font-weight:900;color:#fff;line-height:1;}
.price-big sup{font-size:24px;color:#56D9C8;}
.price-lbl{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:5px;}
.price-sub{font-size:12px;color:rgba(255,255,255,.38);margin-top:4px;}
.flt-facts{display:flex;flex-direction:column;gap:8px;}
.flt-fact{background:rgba(255,255,255,.05);border-radius:10px;padding:9px 14px;font-size:13px;color:rgba(255,255,255,.7);}
.flt-fact b{color:#fff;}
.warn-box{background:rgba(245,166,35,.1);border:1px solid rgba(245,166,35,.28);
  border-radius:13px;padding:14px 18px;display:flex;gap:12px;align-items:flex-start;margin-bottom:20px;}
.warn-box p{font-size:13px;color:rgba(255,255,255,.75);line-height:1.55;}
.warn-box p b{color:#fff;}

/* HOTEL */
.htl-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px;margin-bottom:28px;}
.htl-card{background:var(--white);border-radius:var(--r);overflow:hidden;
  box-shadow:var(--shadow);display:flex;flex-direction:column;transition:.25s;}
.htl-card:hover{transform:translateY(-5px);box-shadow:0 16px 48px rgba(14,77,123,.16);}
.htl-thumb{height:150px;display:flex;align-items:center;justify-content:center;font-size:60px;position:relative;}
.htl-rank{position:absolute;top:12px;left:12px;color:#fff;font-size:11px;font-weight:700;
  letter-spacing:1px;padding:4px 12px;border-radius:20px;}
.htl-rank.best{background:var(--coral);}
.htl-rank.top{background:var(--ocean);}
.htl-rank.value{background:var(--teal);}
.htl-body{padding:18px;flex:1;display:flex;flex-direction:column;gap:9px;}
.htl-name{font-family:var(--ff-h);font-size:17px;font-weight:600;color:var(--ocean);line-height:1.2;}
.htl-stars{color:var(--sun);font-size:14px;}
.htl-score-row{display:flex;align-items:baseline;gap:5px;}
.htl-score-n{font-family:var(--ff-h);font-size:30px;font-weight:900;color:var(--teal);line-height:1;}
.htl-score-s{font-size:12px;color:#9A8A7A;}
.htl-beach-pill{background:#E8F8F5;border-radius:10px;padding:8px 12px;font-size:13px;color:var(--teal);}
.htl-beach-pill b{display:block;font-size:10px;text-transform:uppercase;letter-spacing:1px;margin-bottom:2px;}
.htl-room{background:var(--sand);border-radius:11px;padding:9px 13px;}
.htl-room-name{font-size:12px;color:#6B5A4A;margin-bottom:3px;}
.meal-pill{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.8px;border-radius:7px;padding:2px 8px;}
.mp-ai{background:#D1F5EF;color:#0D6B5E;}
.mp-ro{background:#EEE;color:#666;}
.mp-bb{background:#FFF3D0;color:#8B6010;}
.cancel-ok{font-size:11px;color:#1A8C7E;font-weight:600;margin-top:3px;}
.cancel-no{font-size:11px;color:#C0392B;font-weight:600;margin-top:3px;}

/* PER-ROOM BREAKDOWN */
.per-room{margin-top:8px;border:1px solid #E8DFD2;border-radius:12px;overflow:hidden;}
.per-room-hd{background:#F0EAE0;padding:7px 12px;font-size:10px;font-weight:700;
  letter-spacing:1.5px;text-transform:uppercase;color:#7A6A5A;}
.per-row{display:grid;grid-template-columns:1fr auto;gap:4px;padding:8px 12px;
  border-bottom:1px solid #F0EAE0;align-items:center;}
.per-row:last-child{border-bottom:none;}
.per-who{font-size:12px;color:#5A4A3A;}
.per-prices{text-align:right;}
.per-ppn{font-family:var(--ff-h);font-size:16px;font-weight:600;color:var(--ocean);}
.per-total{font-size:10px;color:#9A8A7A;display:block;}
.per-footer{background:#FDF6EC;padding:7px 12px;display:flex;justify-content:space-between;
  align-items:center;border-top:2px solid #E8DFD2;}
.per-footer-lbl{font-size:10px;color:#7A6A5A;font-weight:700;letter-spacing:1px;text-transform:uppercase;}
.per-footer-val{font-family:var(--ff-h);font-size:18px;font-weight:900;color:var(--ocean);}
.per-note{padding:6px 12px;font-size:10px;color:#9A8A7A;font-style:italic;background:#FAFAF7;}
.htl-perks{display:flex;gap:6px;flex-wrap:wrap;margin-top:4px;}
.htl-perk{background:var(--mist);border-radius:8px;padding:3px 9px;font-size:11px;color:#6B5A4A;}

.beach-winner{background:linear-gradient(135deg,var(--coral),#A03820);color:#fff;
  border-radius:var(--r);padding:22px 26px;display:flex;align-items:center;gap:16px;flex-wrap:wrap;}
.beach-winner .bwi{font-size:40px;}
.beach-winner h3{font-family:var(--ff-h);font-size:19px;font-weight:600;margin-bottom:4px;}
.beach-winner p{font-size:13px;opacity:.87;line-height:1.5;}

/* SITES */
.sites-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:16px;}
.site-card{background:var(--white);border-radius:var(--r);padding:20px;
  box-shadow:var(--shadow);display:flex;flex-direction:column;gap:8px;
  transition:.2s;border-left:4px solid transparent;}
.site-card:hover{transform:translateY(-3px);}
.site-card.c-culture{border-left-color:var(--ocean);}
.site-card.c-history{border-left-color:#8B4513;}
.site-card.c-art{border-left-color:#9B59B6;}
.site-card.c-nature{border-left-color:var(--teal);}
.site-card.c-religion{border-left-color:#E74C3C;}
.site-card.c-craft{border-left-color:#E67E22;}
.site-card.c-arch{border-left-color:#95A5A6;}
.site-icon{font-size:32px;}
.site-cat{font-size:10px;letter-spacing:2.5px;text-transform:uppercase;font-weight:700;color:var(--coral);}
.site-name{font-family:var(--ff-h);font-size:16px;font-weight:600;color:var(--ocean);line-height:1.2;}
.site-desc{font-size:13px;color:#6B5A4A;line-height:1.55;}
.must-tag{background:#FFF0E8;color:var(--coral);border-radius:8px;padding:2px 9px;font-size:11px;font-weight:700;align-self:flex-start;}

/* BEACHES */
.beach-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px;}
.beach-card{background:var(--white);border-radius:var(--r);overflow:hidden;box-shadow:var(--shadow);transition:.2s;}
.beach-card:hover{transform:translateY(-4px);}
.beach-hd{height:140px;display:flex;align-items:center;justify-content:center;position:relative;}
.beach-hd .big{font-size:60px;}
.beach-badge{position:absolute;top:12px;right:12px;background:rgba(255,255,255,.9);
  border-radius:14px;padding:4px 11px;font-size:11px;font-weight:700;color:var(--ocean);}
.beach-body{padding:20px;}
.beach-name{font-family:var(--ff-h);font-size:20px;font-weight:600;color:var(--ocean);margin-bottom:4px;}
.beach-loc{font-size:11px;color:#9A8A7A;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;}
.beach-desc{font-size:14px;color:#5A4A3A;line-height:1.65;margin-bottom:12px;}
.beach-ideal{background:#E8F8F5;border-radius:10px;padding:8px 12px;font-size:13px;color:#0D6B5E;font-weight:500;margin-bottom:12px;}
.beach-tags{display:flex;gap:6px;flex-wrap:wrap;}
.btag{background:#E8F4FD;color:var(--ocean);border-radius:9px;padding:3px 9px;font-size:12px;font-weight:500;}

/* ACTIVITIES */
.act-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:18px;}
.act-card{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.11);
  border-radius:var(--r);padding:24px;transition:.2s;}
.act-card:hover{background:rgba(255,255,255,.12);transform:translateY(-4px);}
.act-icon{font-size:38px;margin-bottom:12px;display:block;}
.act-cat{font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:#56D9C8;font-weight:700;margin-bottom:5px;}
.act-name{font-family:var(--ff-h);font-size:17px;font-weight:600;color:#fff;margin-bottom:7px;line-height:1.2;}
.act-desc{font-size:13px;color:rgba(255,255,255,.62);line-height:1.58;margin-bottom:12px;}
.act-meta{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:7px;}
.act-price{font-family:var(--ff-h);font-size:17px;font-weight:600;color:#56D9C8;}
.act-who{font-size:11px;font-weight:600;border-radius:8px;padding:3px 9px;}
.who-fam{background:rgba(245,166,35,.16);color:var(--sun);}
.who-all{background:rgba(86,217,200,.11);color:#56D9C8;}

/* EXCURSIONS */
.exc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:18px;}
.exc-card{background:var(--white);border-radius:var(--r);padding:24px;box-shadow:var(--shadow);transition:.2s;}
.exc-card:hover{transform:translateY(-4px);}
.exc-icon{font-size:40px;margin-bottom:12px;display:block;}
.exc-dest{font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:var(--coral);font-weight:700;margin-bottom:5px;}
.exc-name{font-family:var(--ff-h);font-size:19px;font-weight:600;color:var(--ocean);margin-bottom:7px;}
.exc-desc{font-size:13px;color:#5A4A3A;line-height:1.65;margin-bottom:12px;}
.exc-dist{background:var(--mist);border-radius:9px;padding:7px 12px;font-size:13px;color:var(--ocean);font-weight:500;}

/* ITINERARY */
.itin{display:flex;flex-direction:column;}
.iday{display:grid;grid-template-columns:92px 22px 1fr;position:relative;}
.iday::after{content:'';position:absolute;left:103px;top:36px;bottom:0;width:2px;background:#DDD5C8;}
.iday:last-child::after{display:none;}
.iday-lbl{padding-top:18px;text-align:right;padding-right:12px;}
.iday-n{font-family:var(--ff-h);font-size:13px;font-weight:600;color:var(--coral);}
.iday-d{font-size:10px;color:#9A8A7A;margin-top:2px;}
.iday-dot{width:22px;height:22px;border-radius:50%;flex-shrink:0;margin-top:20px;
  z-index:1;position:relative;border:3px solid var(--sand);}
.dot-n{background:var(--coral);}
.dot-arrive{background:#1A8C7E;}
.dot-special{background:var(--ocean);}
.dot-depart{background:#E74C3C;}
.iday-box{padding:12px 0 22px 20px;}
.iday-title{font-family:var(--ff-h);font-size:17px;font-weight:600;color:var(--ocean);margin-bottom:8px;}
.iday-items{display:flex;flex-direction:column;gap:6px;}
.iday-item{display:flex;gap:9px;align-items:flex-start;font-size:14px;color:#4A3A2A;line-height:1.55;}
.iday-item .ico{font-size:17px;flex-shrink:0;margin-top:2px;}
.dtag{display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;
  border-radius:5px;padding:2px 7px;margin-right:3px;}
.t-beach{background:#DCEEFB;color:#0E5E8A;}
.t-food{background:#FFF0E0;color:#C05010;}
.t-culture{background:#EDE4FF;color:#5B2DA0;}
.t-kids{background:#E0F5E8;color:#0D6B30;}
.t-relax{background:#FFF8E0;color:#8B6010;}
.t-arrive{background:#D6F5EE;color:#0A5E4A;}
.t-depart{background:#FDECEA;color:#B02020;}

/* RESTAURANTS */
.resto-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:14px;}
.resto-card{background:var(--white);border-radius:16px;padding:16px;
  box-shadow:var(--shadow);display:flex;flex-direction:column;gap:7px;transition:.2s;}
.resto-card:hover{transform:translateY(-3px);}
.resto-rank{font-family:var(--ff-h);font-size:26px;font-weight:900;color:var(--mist);line-height:1;}
.resto-rat{display:flex;align-items:center;gap:5px;margin-top:-4px;}
.stars-f{color:var(--sun);font-size:13px;}
.rat-n{font-family:var(--ff-h);font-size:17px;font-weight:600;color:var(--ocean);}
.resto-name{font-family:var(--ff-h);font-size:15px;font-weight:600;color:var(--ocean);line-height:1.2;}
.resto-spec{font-size:12px;color:#7A6A5A;line-height:1.5;}
.rtag{display:inline-block;font-size:10px;font-weight:700;letter-spacing:.8px;border-radius:5px;padding:2px 7px;}
.rt-top{background:#FFF0E0;color:var(--coral);}
.rt-sea{background:#E0F0FF;color:var(--ocean);}
.rt-local{background:#E0F5E8;color:var(--teal);}
.rt-dec{background:#F0E0FF;color:#7030A0;}

/* CAFES */
.cf-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:15px;}
.cf-card{border-radius:15px;padding:18px;display:flex;flex-direction:column;gap:7px;transition:.2s;}
.cf-card:hover{transform:translateY(-3px);}
.cf-icon{font-size:34px;}
.cf-cat{font-size:10px;letter-spacing:2px;text-transform:uppercase;font-weight:700;color:var(--coral);}
.cf-name{font-family:var(--ff-h);font-size:15px;font-weight:600;color:var(--ocean);}
.cf-desc{font-size:13px;color:#6B5A4A;line-height:1.55;}
.cf-spec{display:inline-block;font-size:11px;font-weight:600;border-radius:8px;padding:4px 11px;margin-top:2px;}

/* CHARTS */
.chart-grid{display:grid;grid-template-columns:1fr 1fr;gap:22px;}
@media(max-width:640px){.chart-grid{grid-template-columns:1fr;}}
.chart-box{background:var(--white);border-radius:var(--r);padding:22px;box-shadow:var(--shadow);}
.chart-box h3{font-family:var(--ff-h);font-size:17px;font-weight:600;color:var(--ocean);margin-bottom:3px;}
.chart-box p{font-size:12px;color:#9A8A7A;margin-bottom:16px;}
.meteo-warn{background:#E8F8F5;border-radius:14px;padding:14px 18px;margin-bottom:24px;
  font-size:14px;color:#0D6B5E;font-weight:500;}

/* TIPS */
.tips-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:14px;}
.tip-card{background:var(--white);border-radius:13px;padding:20px;
  border-left:3px solid var(--coral);box-shadow:var(--shadow);}
.tip-icon{font-size:26px;margin-bottom:8px;display:block;}
.tip-title{font-family:var(--ff-h);font-size:16px;font-weight:600;color:var(--ocean);margin-bottom:5px;}
.tip-text{font-size:13px;color:#6B5A4A;line-height:1.58;}

/* FOOTER */
.footer-wrap{padding:52px 24px;text-align:center;}
.footer-wrap .ft{font-size:32px;margin-bottom:12px;}
.footer-wrap h3{font-family:var(--ff-h);font-size:20px;font-weight:600;color:#fff;margin-bottom:5px;}
.footer-wrap p{font-size:13px;color:rgba(255,255,255,.48);}
.budget-row{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:12px;margin-top:28px;}
.bitem{background:rgba(255,255,255,.06);border-radius:13px;padding:14px;text-align:center;}
.bitem .bl{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.38);margin-bottom:4px;}
.bitem .bv{font-family:var(--ff-h);font-size:22px;font-weight:900;color:var(--sun);}
`;

/* ─── DATA ──────────────────────────────────────── */
const weatherData = [
  {m:"Jan",t:12,s:6,sea:16},{m:"Feb",t:13,s:7,sea:16},{m:"Mar",t:15,s:8,sea:17},
  {m:"Apr",t:18,s:9,sea:18},{m:"Mai",t:22,s:10,sea:20},{m:"Jun",t:26,s:12,sea:24},
  {m:"Jul",t:30,s:13,sea:27},{m:"Aug",t:30,s:12,sea:28},{m:"Sep",t:26,s:10,sea:26},
  {m:"Okt",t:22,s:8,sea:23},{m:"Nov",t:17,s:6,sea:20},{m:"Dez",t:13,s:5,sea:17},
];

// GBP prices × 1.17 = EUR
const gbpToEur = (gbp) => Math.round(gbp * 1.17);

const hotelsData = [
  {
    thumb:"🏖️",thumbBg:"linear-gradient(135deg,#1A8C7E,#0E4D7B)",
    rank:"best", rankKey:"hotelTopPlage",
    name:"Iberostar Waves Mehari Djerba",stars:"⭐⭐⭐⭐",score:"98",reviews:"4.725",
    beachKey:"beach", beachDesc:{de:"Direkt am Strand Sidi Mahres — 12 km weißer Sand. Der schönste Strand Djerbas.",en:"Directly on Sidi Mahres beach — 12km of white sand. Djerba's finest beach."},
    roomName:{de:"Familienzimmer Gartenblick",en:"Family Room Garden View"},
    totalEur: gbpToEur(20888),
    perRoom:[
      {who:"🛏️ Zi.1 — 2 Erw. + 2 Kinder",whoEn:"🛏️ Rm.1 — 2 Adults + 2 Children",ppnEur:Math.round(gbpToEur(20888)/14*0.38),tot14Eur:Math.round(gbpToEur(20888)*0.38)},
      {who:"🛏️ Zi.2 — 2 Erwachsene",whoEn:"🛏️ Rm.2 — 2 Adults",ppnEur:Math.round(gbpToEur(20888)/14*0.31),tot14Eur:Math.round(gbpToEur(20888)*0.31)},
      {who:"🛏️ Zi.3 — 2 Erwachsene",whoEn:"🛏️ Rm.3 — 2 Adults",ppnEur:Math.round(gbpToEur(20888)/14*0.31),tot14Eur:Math.round(gbpToEur(20888)*0.31)},
    ],
    meal:"AI", cancel:true, cancelDate:{de:"1. Aug",en:"Aug 1"},
    perks:{de:["Privatstrand","Thalasso-Spa","5 Restaurants","Kinderclub"],en:["Private Beach","Thalasso Spa","5 Restaurants","Kids Club"]},
  },
  {
    thumb:"🌟",thumbBg:"linear-gradient(135deg,#F5A623,#C4763B)",
    rank:"top", rankKey:"hotelAI",
    name:"ROBINSON Djerba Bahiya",stars:"⭐⭐⭐⭐",score:"96",reviews:"1.603",
    beachKey:"beach", beachDesc:{de:"Privatstrand Aghir (Ostküste) — ruhiger, wilder. Traumhafte Sonnenuntergänge.",en:"Private beach Aghir (east coast) — quieter, wilder. Breathtaking sunsets."},
    roomName:{de:"Familienzimmer Klassisch",en:"Family Room Classic"},
    totalEur: gbpToEur(17957),
    perRoom:[
      {who:"🛏️ Zi.1 — 2 Erw. + 2 Kinder",whoEn:"🛏️ Rm.1 — 2 Adults + 2 Children",ppnEur:Math.round(gbpToEur(17957)/14*0.38),tot14Eur:Math.round(gbpToEur(17957)*0.38)},
      {who:"🛏️ Zi.2 — 2 Erwachsene",whoEn:"🛏️ Rm.2 — 2 Adults",ppnEur:Math.round(gbpToEur(17957)/14*0.31),tot14Eur:Math.round(gbpToEur(17957)*0.31)},
      {who:"🛏️ Zi.3 — 2 Erwachsene",whoEn:"🛏️ Rm.3 — 2 Adults",ppnEur:Math.round(gbpToEur(17957)/14*0.31),tot14Eur:Math.round(gbpToEur(17957)*0.31)},
    ],
    meal:"AI", cancel:true, cancelDate:{de:"6. Jul",en:"Jul 6"},
    perks:{de:["Aqua-Park","All-Inclusive","Tennis","Babysitting"],en:["Aqua-Park","All-Inclusive","Tennis","Babysitting"]},
  },
  {
    thumb:"💎",thumbBg:"linear-gradient(135deg,#2D6A4F,#1A5C50)",
    rank:"value", rankKey:"hotelValue",
    name:"Cesar Thalasso",stars:"⭐⭐⭐⭐",score:"93",reviews:"456",
    beachKey:"beach", beachDesc:{de:"Tourismuszone Sidi Mahres — 2 Min. zum Hauptstrand.",en:"Sidi Mahres tourist zone — 2 min to main beach."},
    roomName:{de:"Standard Vierbettzimmer",en:"Standard Quad Room"},
    totalEur: gbpToEur(8760),
    perRoom:[
      {who:"🛏️ Zi.1 — 2 Erw. + 2 Kinder",whoEn:"🛏️ Rm.1 — 2 Adults + 2 Children",ppnEur:Math.round(gbpToEur(8760)/14*0.38),tot14Eur:Math.round(gbpToEur(8760)*0.38)},
      {who:"🛏️ Zi.2 — 2 Erwachsene",whoEn:"🛏️ Rm.2 — 2 Adults",ppnEur:Math.round(gbpToEur(8760)/14*0.31),tot14Eur:Math.round(gbpToEur(8760)*0.31)},
      {who:"🛏️ Zi.3 — 2 Erwachsene",whoEn:"🛏️ Rm.3 — 2 Adults",ppnEur:Math.round(gbpToEur(8760)/14*0.31),tot14Eur:Math.round(gbpToEur(8760)*0.31)},
    ],
    meal:"AI", cancel:false, cancelDate:null,
    perks:{de:["Thalassotherapie","Pool","WLAN","Parkplatz"],en:["Thalassotherapy","Pool","Free WiFi","Parking"]},
  },
  {
    thumb:"🌴",thumbBg:"linear-gradient(135deg,#5B8C3E,#2D6A4F)",
    rank:"value", rankKey:"hotelNature",
    name:"Les Jardins de Toumana",stars:"⭐⭐⭐⭐",score:"90",reviews:"437",
    beachKey:"beach", beachDesc:{de:"Eigener Privatstrand vor Ort. Midoun-Gebiet, La-Séguia-Lagune in der Nähe.",en:"Private beach on-site. Midoun area, La Seguia lagoon nearby."},
    roomName:{de:"Familien-Apartment 1 Schlafzimmer",en:"Family Apartment 1 Bedroom"},
    totalEur: gbpToEur(6688),
    perRoom:[
      {who:"🛏️ Zi.1 — 2 Erw. + 2 Kinder",whoEn:"🛏️ Rm.1 — 2 Adults + 2 Children",ppnEur:Math.round(gbpToEur(6688)/14*0.38),tot14Eur:Math.round(gbpToEur(6688)*0.38)},
      {who:"🛏️ Zi.2 — 2 Erwachsene",whoEn:"🛏️ Rm.2 — 2 Adults",ppnEur:Math.round(gbpToEur(6688)/14*0.31),tot14Eur:Math.round(gbpToEur(6688)*0.31)},
      {who:"🛏️ Zi.3 — 2 Erwachsene",whoEn:"🛏️ Rm.3 — 2 Adults",ppnEur:Math.round(gbpToEur(6688)/14*0.31),tot14Eur:Math.round(gbpToEur(6688)*0.31)},
    ],
    meal:"RO", cancel:true, cancelDate:{de:"4. Aug",en:"Aug 4"},
    perks:{de:["Privatstrand","Fahrräder","Pool","Spielzimmer"],en:["Private Beach","Bicycles","Pool","Game Room"]},
  },
  {
    thumb:"🏡",thumbBg:"linear-gradient(135deg,#9B7B5A,#6B4A2A)",
    rank:"top", rankKey:"hotelBnb",
    name:"Dar Bibine",stars:"⭐⭐⭐",score:"88",reviews:{de:"Gästehaus",en:"Guesthouse"},
    beachKey:"beach", beachDesc:{de:"Außerhalb der Tourismuszone. Authentisches lokales Flair.",en:"Outside tourist zone. Authentic local atmosphere."},
    roomName:{de:"Doppelzimmer / Apartment",en:"Double Room / Apartment"},
    totalEur:null,
    perRoom:[
      {who:"🛏️ Zi.1 — 2 Erw. + 2 Kinder",whoEn:"🛏️ Rm.1 — 2 Adults + 2 Children",ppnEur:null},
      {who:"🛏️ Zi.2 — 2 Erwachsene",whoEn:"🛏️ Rm.2 — 2 Adults",ppnEur:null},
      {who:"🛏️ Zi.3 — 2 Erwachsene",whoEn:"🛏️ Rm.3 — 2 Adults",ppnEur:null},
    ],
    meal:"BB", cancel:true, cancelDate:null,
    perks:{de:["Authentisch","Ruhig","Lokal","Frühstück"],en:["Authentic","Quiet","Local","Breakfast"]},
  },
  {
    thumb:"🌺",thumbBg:"linear-gradient(135deg,#8B4595,#5B2D6B)",
    rank:"top", rankKey:"hotelChar",
    name:"Dar Dhiafa",stars:"⭐⭐⭐⭐",score:"92",reviews:"Erriadh",
    beachKey:"beach", beachDesc:{de:"Im Herzen von Erriadh / Djerbahood. 2 Pools, einzigartiges Kunstambiente.",en:"Heart of Erriadh / Djerbahood. 2 pools, unique art atmosphere."},
    roomName:{de:"Superior Zimmer",en:"Superior Room"},
    totalEur:null,
    perRoom:[
      {who:"🛏️ Zi.1 — 2 Erw. + 2 Kinder",whoEn:"🛏️ Rm.1 — 2 Adults + 2 Children",ppnEur:null},
      {who:"🛏️ Zi.2 — 2 Erwachsene",whoEn:"🛏️ Rm.2 — 2 Adults",ppnEur:null},
      {who:"🛏️ Zi.3 — 2 Erwachsene",whoEn:"🛏️ Rm.3 — 2 Adults",ppnEur:null},
    ],
    meal:"BB", cancel:true, cancelDate:null,
    perks:{de:["2 Pools","Djerbahood","Architektur","Einzigartig"],en:["2 Pools","Djerbahood","Architecture","Unique"]},
  },
];

const sitesData = [
  {icon:"🏘️",cat:"c-culture",label:{de:"Historische Stadt",en:"Historic Town"},name:{de:"Altstadt Houmt Souk",en:"Houmt Souk Old Town"},desc:{de:"Hauptstadt von Djerba mit belebten Souks, weißen Gassen und typischer Architektur.",en:"Djerba's capital — lively souks, whitewashed alleys and typical architecture."},must:true},
  {icon:"🏛️",cat:"c-culture",label:{de:"Museum",en:"Museum"},name:{de:"Museum des traditionellen Erbes",en:"Museum of Traditional Heritage"},desc:{de:"Das Leben und die Traditionen der Insel anhand authentischer Objekte und Kostüme.",en:"Island life and traditions told through authentic objects and costumes."},must:false},
  {icon:"⚓",cat:"c-history",label:{de:"Denkmal",en:"Monument"},name:{de:"Turm Ghazi Mustapha (Fort Borj El Kebir)",en:"Tower Ghazi Mustapha (Fort Borj El Kebir)"},desc:{de:"Osmanisches Fort aus dem 15. Jh. über dem Hafen von Houmt Souk. Panoramablick auf das Meer.",en:"15th-century Ottoman fort above Houmt Souk harbor. Panoramic sea views."},must:true},
  {icon:"⛵",cat:"c-culture",label:{de:"Hafen",en:"Harbor"},name:{de:"Marina Djerba",en:"Djerba Marina"},desc:{de:"Kleiner lebhafter Fischerhafen in Houmt Souk. Perfekt bei Sonnenaufgang.",en:"Small lively fishing harbor in Houmt Souk. Perfect at sunrise."},must:false},
  {icon:"🦁",cat:"c-nature",label:{de:"Touristenpark",en:"Theme Park"},name:{de:"Djerba Explore Park",en:"Djerba Explore Park"},desc:{de:"20 km östlich von Houmt Souk. Zoo, Kulturerbe-Dorf, Krokodil-Farm und Museum.",en:"20km east of Houmt Souk. Zoo, heritage village, crocodile farm and museum."},must:true},
  {icon:"🏺",cat:"c-culture",label:{de:"Kunstmuseum",en:"Art Museum"},name:{de:"Museum Lalla Hadria",en:"Lalla Hadria Museum"},desc:{de:"Weltklasse-Sammlung islamischer Kunst im Djerba Explore Park.",en:"World-class collection of Islamic art inside the Djerba Explore Park."},must:false},
  {icon:"🐊",cat:"c-nature",label:{de:"Tierpark",en:"Animal Park"},name:{de:"Krokodil-Farm",en:"Crocodile Farm"},desc:{de:"Hunderte von Nilkrokodilen auf einer faszinierenden Farm. Kinder lieben es!",en:"Hundreds of Nile crocodiles at a fascinating farm. Kids absolutely love it!"},must:true},
  {icon:"🎨",cat:"c-art",label:{de:"Street Art",en:"Street Art"},name:{de:"Djerbahood",en:"Djerbahood"},desc:{de:"Dorf Erriadh als Open-Air-Museum. 150+ Wandgemälde weltberühmter Künstler.",en:"Village Erriadh as an open-air museum. 150+ murals by world-famous artists."},must:true},
  {icon:"🕌",cat:"c-religion",label:{de:"Gotteshaus",en:"Sacred Site"},name:{de:"Synagoge El Ghriba",en:"El Ghriba Synagogue"},desc:{de:"Eine der ältesten Synagogen der Welt (586 v. Chr.). Wallfahrtsort, maurisches Interieur.",en:"One of the world's oldest synagogues (586 BC). Pilgrimage site, Moorish interior."},must:true},
  {icon:"🏺",cat:"c-craft",label:{de:"Kunsthandwerk",en:"Craft Village"},name:{de:"Guellala",en:"Guellala"},desc:{de:"Töpferdorf des Südens, 2.000 Jahre alte Tradition. Offene Werkstätten für Besucher.",en:"Southern pottery village, 2,000 years of tradition. Open workshops for visitors."},must:false},
  {icon:"🎬",cat:"c-culture",label:{de:"Star Wars!",en:"Star Wars!"},name:{de:"Moschee Sidi Jemour",en:"Sidi Jemour Mosque"},desc:{de:"Drehort von Star Wars! Unvermeidlich für Fans der Saga — tolle Fotos garantiert!",en:"Star Wars filming location! A must for fans of the saga — great photos guaranteed!"},must:true},
  {icon:"🏘️",cat:"c-culture",label:{de:"Stadt",en:"Town"},name:{de:"Ajim",en:"Ajim"},desc:{de:"3. Stadt der Insel, typische weiße Gebäude, entspannte lokale Atmosphäre.",en:"3rd town on the island, typical white buildings, relaxed local atmosphere."},must:false},
  {icon:"🏛️",cat:"c-arch",label:{de:"Archäologie",en:"Archaeology"},name:{de:"Archäologische Stätte Meninx",en:"Meninx Archaeological Site"},desc:{de:"Antike römische Stadt an der Südspitze der Insel. Faszinierende Überreste.",en:"Ancient Roman city at the southern tip of the island. Fascinating remains."},must:false},
  {icon:"🏰",cat:"c-history",label:{de:"Festung",en:"Fortress"},name:{de:"Borj El Kastil",en:"Borj El Kastil"},desc:{de:"Mittelalterliche Festung der Aragonesen aus dem 13. Jh. Atemberaubende Küstenblicke.",en:"13th-century Aragonese medieval fortress. Breathtaking coastal views."},must:false},
  {icon:"🕌",cat:"c-religion",label:{de:"Denkmal 14. Jh.",en:"14th-C Monument"},name:{de:"Moschee Fadhloun",en:"Fadhloun Mosque"},desc:{de:"Moschee aus dem 14. Jh., gekalkt, traditionelle djerbiote Architektur.",en:"14th-century mosque, whitewashed, traditional Djerbian architecture."},must:false},
];

const beachesData = [
  {emoji:"🏖️",bg:"linear-gradient(135deg,#1A8C7E,#0E4D7B)",badge:{de:"⭐ Schönste",en:"⭐ Most Beautiful"},
   name:{de:"Strand Sidi Mahres",en:"Sidi Mahres Beach"},loc:{de:"Norden der Insel",en:"North of the island"},
   desc:{de:"Der beliebteste und am besten erschlossene Strand Djerbas. 12 km weißer Sand mit türkisfarbenem Wasser. Ideal zum Schwimmen und Wassersport.",en:"Djerba's most popular beach. 12km of white sand with turquoise water. Ideal for swimming and water sports."},
   ideal:{de:"Perfekt für die ganze Familie",en:"Perfect for the whole family"},
   tags:["Schwimmen/Swimming","Wassersport/Watersports","Familien/Families"],
  },
  {emoji:"🌿",bg:"linear-gradient(135deg,#2D6A4F,#1A8C7E)",badge:{de:"🌊 Wild & Ruhig",en:"🌊 Wild & Calm"},
   name:{de:"Strand La Séguia",en:"La Seguia Beach"},loc:{de:"Südosten der Insel",en:"South-east of island"},
   desc:{de:"Weniger frequentiert und wilder als Sidi Mahres. Ruhiges, seichtes Wasser, perfekt für Kinder. Lagune und intakte Natur.",en:"Less crowded and wilder than Sidi Mahres. Calm, shallow water perfect for children. Lagoon and unspoilt nature."},
   ideal:{de:"Ideal für Kinder",en:"Ideal for children"},
   tags:["Ruhig/Quiet","Schnorcheln/Snorkeling","Lagune/Lagoon"],
  },
];

const activitiesData = [
  {icon:"🤿",cat:{de:"Tauchen",en:"Diving"},name:{de:"Tauchen & Schnorcheln",en:"Scuba & Snorkeling"},desc:{de:"Kristallklares Wasser bis 20m Sicht im August. Seegraswiesen, Oktopusse, bunte Fische. Tauchclub La Sirène.",en:"Crystal clear water up to 20m visibility in August. Seagrass, octopuses, colourful fish. Dive club La Sirène."},price:"Ab / From 45 TND",who:"fam"},
  {icon:"⛳",cat:{de:"Sport",en:"Sport"},name:{de:"Golf — 27 Loch",en:"Golf — 27 Holes"},desc:{de:"Djerba Golf Club an der Nordostküste. 27-Loch-Platz mit Meerblick. Materialverleih möglich.",en:"Djerba Golf Club on the north-east coast. 27-hole course with sea views. Equipment rental available."},price:"Ab / From 80 TND",who:"all"},
  {icon:"💦",cat:{de:"Aquapark",en:"Water Park"},name:{de:"Aqua Park Pirate",en:"Aqua Park Pirate"},desc:{de:"In Midoun — Wasserrutschen, Wellenbecken, Spielzonen. Der perfekte Kindertag!",en:"In Midoun — slides, wave pools, play zones. The perfect day for kids!"},price:"Ab / From 35 TND",who:"fam"},
  {icon:"🐴",cat:{de:"Reiten",en:"Horse Riding"},name:{de:"Ranch Adada — Reiten",en:"Ranch Adada — Horse Riding"},desc:{de:"Ranch Adada Djerba in Aghir. Strandausritte und Ausritte durch Olivenhaine.",en:"Ranch Adada Djerba in Aghir. Rides along the beach and through olive groves."},price:"Ab / From 40 TND",who:"fam"},
  {icon:"⛵",cat:{de:"Kreuzfahrt",en:"Cruise"},name:{de:"Piratenschiff-Kreuzfahrt",en:"Pirate Boat Cruise"},desc:{de:"Fahrt zur Insel Ras Rmal, um Flamingos in freier Wildbahn zu beobachten. Unvergesslich!",en:"Sail to Ras Rmal island to watch wild flamingos. Unforgettable!"},price:"Ab / From 30 TND",who:"fam"},
  {icon:"🐪",cat:{de:"Abenteuer",en:"Adventure"},name:{de:"Kamelritt bei Sonnenaufgang",en:"Camel Trek at Sunrise"},desc:{de:"Trek bei Sonnenaufgang vom Strand Aghir. Reiten durch Küstendünen wenn der Himmel rosa leuchtet.",en:"Trek at sunrise from Aghir beach. Ride through coastal dunes as the sky turns pink."},price:"Ab / From 30 TND",who:"fam"},
  {icon:"🧖",cat:{de:"Wellness",en:"Wellness"},name:{de:"Traditionelles Hammam",en:"Traditional Hammam"},desc:{de:"Jahrhundertealtes Ritual: schwarze Seife, Kessa-Peeling, Dampf und Massage. Absolutes Wohlbefinden.",en:"Century-old ritual: black soap, kessa scrub, steam and massage. Pure bliss."},price:"Ab / From 35 TND",who:"all"},
  {icon:"🚲",cat:{de:"Entdeckung",en:"Discovery"},name:{de:"Radtour um die Insel",en:"Cycling the Island"},desc:{de:"Verleih in Houmt Souk — flaches Terrain, Olivenhaine, weiße Dörfer und Küsten. Ideal für Familien.",en:"Rental in Houmt Souk — flat terrain, olive groves, white villages and coasts. Ideal for families."},price:"Ab / From 10 TND",who:"fam"},
];

const excursionsData = [
  {icon:"🏔️",dest:{de:"Tagesausflug",en:"Day Trip"},name:"Matmata",
   desc:{de:"~3h Fahrt. Berühmtes Troglodytendorf, Bewohner leben in Felsen gegrabenen Häusern. Drehorte von Star Wars!",en:"~3h drive. Famous troglodyte village where inhabitants live in rock-hewn houses. Star Wars filming locations!"},
   dist:{de:"~3h Fahrt · Ganztag",en:"~3h drive · Full day"}},
  {icon:"🏯",dest:{de:"Tagesausflug",en:"Day Trip"},name:"Tataouine & Ksour",
   desc:{de:"Felsige Stadt im Süden Tunesiens. Beeindruckende Ksour (befestigte Berber-Speicher), darunter Ksar Ouled Soltane.",en:"Rocky southern Tunisian city. Impressive ksour (fortified Berber granaries), including Ksar Ouled Soltane."},
   dist:{de:"~3h Fahrt · Ganztag",en:"~3h drive · Full day"}},
];

const itinData = [
  {d:1,date:{de:"Mi. 5. Aug",en:"Wed 5 Aug"},title:{de:"✈️ Ankunft in Djerba!",en:"✈️ Arrival in Djerba!"},dot:"arrive",items:[
    {ico:"🛬",t:{de:<><span className="dtag t-arrive">ANKFT</span> Landung <b>06:30 DJE</b> (FRA) / <b>07:40 DJE</b> (MUC). Gepäck abholen, zum Hotel fahren.</>,en:<><span className="dtag t-arrive">ARRIVE</span> Landing <b>06:30 DJE</b> (FRA) / <b>07:40 DJE</b> (MUC). Collect luggage, head to hotel.</>}},
    {ico:"🏨",t:{de:<>Check-in ab <b>14:00–15:00 Uhr</b>. Koffer früh abgeben, Pool und Hotelgelände erkunden.</>,en:<>Check-in from <b>2:00–3:00 PM</b>. Drop bags early, explore hotel grounds and pool.</>}},
    {ico:"🏖️",t:{de:<><span className="dtag t-beach">STRAND</span> Erstes Bad im Mittelmeer! 28°C Wasser — die Mädchen werden es lieben!</>,en:<><span className="dtag t-beach">BEACH</span> First swim in the Mediterranean! 28°C water — the girls will love it!</>}},
    {ico:"🍽️",t:{de:<><span className="dtag t-food">ABEND</span> Hotelrestaurant. Früh schlafen — der Tag begann um 04:45 Uhr!</>,en:<><span className="dtag t-food">DINNER</span> Hotel restaurant. Early night — the day started at 4:45am!</>}},
  ]},
  {d:2,date:{de:"Do. 6. Aug",en:"Thu 6 Aug"},title:{de:"🏖️ Sidi Mahres — Der Hauptstrand",en:"🏖️ Sidi Mahres — The Main Beach"},dot:"n",items:[
    {ico:"🌅",t:{de:<>Sonnenaufgangsspaziergang am Strand. 12 km weißer Sand fast menschenleer bei Tagesanbruch.</>,en:<>Sunrise walk on the beach. 12km of white sand almost empty at dawn.</>}},
    {ico:"🤿",t:{de:<><span className="dtag t-beach">MEER</span> Schnorcheln — ruhiges, seichtes Wasser, perfekt für die Mädchen (8 und 10 Jahre).</>,en:<><span className="dtag t-beach">SEA</span> Snorkeling — calm, shallow water, perfect for the girls (8 and 10 years).</>}},
    {ico:"🏺",t:{de:<><span className="dtag t-culture">ABEND</span> Spaziergang durch die <b>Altstadt Houmt Souk</b> — Souks, Gewürze, Teppiche, weiße Architektur.</>,en:<><span className="dtag t-culture">EVENING</span> Stroll through <b>Houmt Souk Old Town</b> — souks, spices, carpets, white architecture.</>}},
    {ico:"🍽️",t:{de:<><span className="dtag t-food">ABENDESSEN</span> <b>Restaurant La Mamma ⭐4.8</b> — Familienliebling seit 1978. Riesige Portionen, tolle Meeresfrüchte.</>,en:<><span className="dtag t-food">DINNER</span> <b>Restaurant La Mamma ⭐4.8</b> — family favourite since 1978. Huge portions, great seafood.</>}},
  ]},
  {d:3,date:{de:"Fr. 7. Aug",en:"Fri 7 Aug"},title:{de:"🦁 Djerba Explore — Kindertag",en:"🦁 Djerba Explore — Kids Day"},dot:"special",items:[
    {ico:"🦁",t:{de:<><span className="dtag t-kids">KINDER ★</span> <b>Djerba Explore Park</b> — Zoo, Kulturdorf und Krokodil-Farm. Ganztagesaktivität.</>,en:<><span className="dtag t-kids">KIDS ★</span> <b>Djerba Explore Park</b> — zoo, heritage village and crocodile farm. Full day activity.</>}},
    {ico:"🐊",t:{de:<>Krokodil-Fütterungsshow um 14:30 Uhr — die Mädchen werden das nie vergessen! (~35 TND/Person)</>,en:<>Crocodile feeding show at 2:30pm — the girls will never forget it! (~35 TND/person)</>}},
    {ico:"🏛️",t:{de:<><b>Museum Lalla Hadria</b> — weltklasse islamische Kunstsammlung. Wunderschön für die ganze Familie.</>,en:<><b>Lalla Hadria Museum</b> — world-class Islamic art collection. Beautiful for the whole family.</>}},
    {ico:"🍽️",t:{de:<><span className="dtag t-food">ABENDESSEN</span> <b>Restaurant Djerba Lina ⭐4.7</b> — traditionelle tunesische Küche.</>,en:<><span className="dtag t-food">DINNER</span> <b>Restaurant Djerba Lina ⭐4.7</b> — traditional Tunisian cuisine.</>}},
  ]},
  {d:4,date:{de:"Sa. 8. Aug",en:"Sat 8 Aug"},title:{de:"🎨 Djerbahood & Kultur",en:"🎨 Djerbahood & Culture"},dot:"n",items:[
    {ico:"🎨",t:{de:<><span className="dtag t-culture">KUNST</span> <b>Djerbahood</b> in Erriadh — 150+ Wandmalereien weltberühmter Künstler. Freilichtmuseum.</>,en:<><span className="dtag t-culture">ART</span> <b>Djerbahood</b> in Erriadh — 150+ murals by world-famous artists. Open-air museum.</>}},
    {ico:"🏛️",t:{de:<><b>Museum des traditionellen Erbes</b> — Traditionen und Kostüme der Insel. Lehrreich für Kinder.</>,en:<><b>Museum of Traditional Heritage</b> — island traditions and costumes. Educational for kids.</>}},
    {ico:"🍽️",t:{de:<><span className="dtag t-food">ABENDESSEN</span> <b>Restaurant Essofra ⭐4.6</b> — schönstes Interieur der Insel im Souk von Houmt Souk.</>,en:<><span className="dtag t-food">DINNER</span> <b>Restaurant Essofra ⭐4.6</b> — most beautiful interior on the island in Houmt Souk souk.</>}},
  ]},
  {d:5,date:{de:"So. 9. Aug",en:"Sun 9 Aug"},title:{de:"🕌 Synagoge & Guellala",en:"🕌 Synagogue & Guellala"},dot:"special",items:[
    {ico:"🕌",t:{de:<><span className="dtag t-culture">KULTUR</span> <b>Synagoge El Ghriba</b> — 586 v. Chr.! Eine der ältesten Synagogen der Welt.</>,en:<><span className="dtag t-culture">CULTURE</span> <b>El Ghriba Synagogue</b> — 586 BC! One of the world's oldest synagogues.</>}},
    {ico:"🏺",t:{de:<><b>Dorf Guellala</b> — 2.000 Jahre alte Töpfertradition. Die Mädchen können ihre eigene Töpferware bemalen!</>,en:<><b>Guellala Village</b> — 2,000 years of pottery tradition. The girls can paint their own pot!</>}},
    {ico:"🍽️",t:{de:<><span className="dtag t-food">ABENDESSEN</span> <b>Restaurant Zitouna ⭐4.7</b> — außergewöhnlicher Couscous mit Meeresfrüchten.</>,en:<><span className="dtag t-food">DINNER</span> <b>Restaurant Zitouna ⭐4.7</b> — exceptional couscous with seafood.</>}},
  ]},
  {d:6,date:{de:"Mo. 10. Aug",en:"Mon 10 Aug"},title:{de:"⛵ Kreuzfahrt & Flamingos",en:"⛵ Cruise & Flamingos"},dot:"n",items:[
    {ico:"⛵",t:{de:<><span className="dtag t-beach">MEER</span> <b>Piratenschiff-Kreuzfahrt</b> zur Insel Ras Rmal — Flamingos in freier Wildbahn. Magisch!</>,en:<><span className="dtag t-beach">SEA</span> <b>Pirate boat cruise</b> to Ras Rmal island — flamingos in the wild. Magical!</>}},
    {ico:"🦩",t:{de:<>Lagune Ras Rmel im Morgengrauen — hunderte Flamingos in ihrem natürlichen Lebensraum.</>,en:<>Ras Rmel lagoon at dawn — hundreds of flamingos in their natural habitat.</>}},
    {ico:"🍽️",t:{de:<><span className="dtag t-food">ABENDESSEN</span> <b>Restaurant Haroun</b> — Abendessen auf dem Deck eines Bootes mit Hafenblick. Unvergesslich!</>,en:<><span className="dtag t-food">DINNER</span> <b>Restaurant Haroun</b> — dinner on a boat deck with harbor views. Unforgettable!</>}},
  ]},
  {d:7,date:{de:"Di. 11. Aug",en:"Tue 11 Aug"},title:{de:"🐪 Kamelritt & Strand Aghir",en:"🐪 Camel Trek & Aghir Beach"},dot:"n",items:[
    {ico:"🐪",t:{de:<><span className="dtag t-kids">FAMILIE</span> <b>Kamelritt bei Sonnenaufgang</b> ab Strand Aghir — Abfahrt 06:30. ~30 TND.</>,en:<><span className="dtag t-kids">FAMILY</span> <b>Camel trek at sunrise</b> from Aghir beach — depart 06:30. ~30 TND.</>}},
    {ico:"🏖️",t:{de:<><span className="dtag t-beach">STRAND</span> <b>Strand Aghir</b> — ruhiger, goldener Sand. Legendäre Sonnenuntergänge.</>,en:<><span className="dtag t-beach">BEACH</span> <b>Aghir Beach</b> — quieter, golden sand. Legendary sunsets.</>}},
    {ico:"🍽️",t:{de:<><span className="dtag t-food">ABENDESSEN</span> <b>La Lagune</b> — Strandblick, charmante Atmosphäre.</>,en:<><span className="dtag t-food">DINNER</span> <b>La Lagune</b> — beach views, charming atmosphere.</>}},
  ]},
  {d:8,date:{de:"Mi. 12. Aug",en:"Wed 12 Aug"},title:{de:"🌊 Freier Tag — Pool & Strand",en:"🌊 Free Day — Pool & Beach"},dot:"n",items:[
    {ico:"😴",t:{de:<><span className="dtag t-relax">PAUSE</span> Ausschlafen. Hotelpool, Sandburgen bauen, Ruhe genießen.</>,en:<><span className="dtag t-relax">REST</span> Lie in. Hotel pool, sandcastles, relaxation.</>}},
    {ico:"🏖️",t:{de:<>Nachmittag am <b>Strand El Kantara</b> — nahe der antiken römischen Brücke, umgeben von Palmen.</>,en:<>Afternoon at <b>El Kantara Beach</b> — near the ancient Roman causeway, surrounded by palms.</>}},
    {ico:"🍽️",t:{de:<><span className="dtag t-food">ABENDESSEN</span> <b>Restaurant La Mamma ⭐4.8</b> — wir kommen wieder, es ist einfach zu gut!</>,en:<><span className="dtag t-food">DINNER</span> <b>Restaurant La Mamma ⭐4.8</b> — going back, it's just too good!</>}},
  ]},
  {d:9,date:{de:"Do. 13. Aug",en:"Thu 13 Aug"},title:{de:"🎬 Star Wars & Geschichte",en:"🎬 Star Wars & History"},dot:"special",items:[
    {ico:"🎬",t:{de:<><span className="dtag t-culture">STAR WARS</span> <b>Moschee Sidi Jemour</b> — Drehort von Star Wars! Die Mädchen werden begeistert sein.</>,en:<><span className="dtag t-culture">STAR WARS</span> <b>Sidi Jemour Mosque</b> — Star Wars filming location! The girls will be thrilled.</>}},
    {ico:"🏰",t:{de:<><b>Borj El Kastil</b> — aragonesische Festung aus dem 13. Jh. Atemberaubende Küstenblicke.</>,en:<><b>Borj El Kastil</b> — 13th-century Aragonese fortress. Breathtaking coastal views.</>}},
    {ico:"🍽️",t:{de:<><span className="dtag t-food">ABENDESSEN</span> <b>Restaurant Baccar ⭐4.6</b> — frischer Fisch des Tages, hervorragend.</>,en:<><span className="dtag t-food">DINNER</span> <b>Restaurant Baccar ⭐4.6</b> — fresh catch of the day, excellent.</>}},
  ]},
  {d:10,date:{de:"Fr. 14. Aug",en:"Fri 14 Aug"},title:{de:"🏇 Quad & Nordküste",en:"🏇 Quad & North Coast"},dot:"n",items:[
    {ico:"🏇",t:{de:<><span className="dtag t-kids">ABENTEUER</span> <b>Quad Evasion et Passion</b> — Dünen und Olivenhaine per Quad. Ab 12 Jahren. ~60 TND.</>,en:<><span className="dtag t-kids">ADVENTURE</span> <b>Quad Evasion et Passion</b> — dunes and olive groves by quad. Ages 12+. ~60 TND.</>}},
    {ico:"🛍️",t:{de:<>Souvenirshopping in Houmt Souk — handbemalte Keramik, Berber-Körbe, Gewürze.</>,en:<>Souvenir shopping in Houmt Souk — hand-painted ceramics, Berber baskets, spices.</>}},
    {ico:"🍽️",t:{de:<><span className="dtag t-food">ABENDESSEN</span> <b>Restaurant cobry ⭐4.7</b> — lokales Juwel, authentisch tunesische Aromen.</>,en:<><span className="dtag t-food">DINNER</span> <b>Restaurant cobry ⭐4.7</b> — local gem, authentic Tunisian flavours.</>}},
  ]},
  {d:11,date:{de:"Sa. 15. Aug",en:"Sat 15 Aug"},title:{de:"⚓ Fort & Stadt Ajim",en:"⚓ Fort & Town Ajim"},dot:"n",items:[
    {ico:"⚓",t:{de:<><span className="dtag t-culture">GESCHICHTE</span> <b>Turm Ghazi Mustapha</b> — osmanisches Fort, Panoramablick auf das Meer.</>,en:<><span className="dtag t-culture">HISTORY</span> <b>Ghazi Mustapha Tower</b> — Ottoman fort, panoramic sea view.</>}},
    {ico:"🏖️",t:{de:<>Entdeckung von <b>Ajim</b> — 3. Stadt der Insel, typische weiße Gebäude.</>,en:<>Discover <b>Ajim</b> — 3rd town on the island, typical white buildings.</>}},
    {ico:"🍽️",t:{de:<><span className="dtag t-food">ABENDESSEN</span> <b>Restaurant Scilla ⭐4.6</b> — Meeresfrüchte-Terrasse, Kalamari und Garnelen.</>,en:<><span className="dtag t-food">DINNER</span> <b>Restaurant Scilla ⭐4.6</b> — seafood terrace, calamari and prawns.</>}},
  ]},
  {d:12,date:{de:"So. 16. Aug",en:"Sun 16 Aug"},title:{de:"🚲 Radtour um die Insel",en:"🚲 Cycling the Island"},dot:"n",items:[
    {ico:"🚲",t:{de:<><span className="dtag t-kids">FAMILIE</span> Fahrradverleih in Houmt Souk — flaches Terrain, ideal für die ganze Familie. ~25 km Runde.</>,en:<><span className="dtag t-kids">FAMILY</span> Bike rental in Houmt Souk — flat terrain, ideal for the whole family. ~25km circuit.</>}},
    {ico:"🌿",t:{de:<>Route: Houmt Souk → Erriadh → Guellala → Küste Aghir → zurück. Olivenhaine und weiße Dörfer.</>,en:<>Route: Houmt Souk → Erriadh → Guellala → Aghir coast → back. Olive groves and white villages.</>}},
    {ico:"🍽️",t:{de:<><span className="dtag t-food">ABENDESSEN</span> <b>Restaurant chez Moktar ⭐4.7</b> — bester frischer Fisch laut Einheimischen.</>,en:<><span className="dtag t-food">DINNER</span> <b>Restaurant chez Moktar ⭐4.7</b> — best fresh fish according to locals.</>}},
  ]},
  {d:13,date:{de:"Mo. 17. Aug",en:"Mon 17 Aug"},title:{de:"🌅 Leuchtturm & Wilde Küste",en:"🌅 Lighthouse & Wild Coast"},dot:"n",items:[
    {ico:"🏛️",t:{de:<><span className="dtag t-culture">BESUCH</span> <b>Leuchtturm Taguermess</b> — Südspitze der Insel. Wilde Küste, Traumfotos.</>,en:<><span className="dtag t-culture">VISIT</span> <b>Taguermess Lighthouse</b> — southern tip of the island. Wild coast, dream photos.</>}},
    {ico:"🦩",t:{de:<>Letzter Besuch bei den Flamingos am Ras Rmel Lagon — Abschiedspicknick.</>,en:<>Last visit to the flamingos at Ras Rmel lagoon — farewell picnic.</>}},
    {ico:"🍽️",t:{de:<><span className="dtag t-food">ABENDESSEN</span> <b>Restaurant la Bohème ⭐4.9</b> — #1 von Djerba! Reservierung notwendig.</>,en:<><span className="dtag t-food">DINNER</span> <b>Restaurant la Bohème ⭐4.9</b> — #1 in Djerba! Reservation required.</>}},
  ]},
  {d:14,date:{de:"Di. 18. Aug",en:"Tue 18 Aug"},title:{de:"🧖 Letztes Hammam & Sonnenuntergang",en:"🧖 Final Hammam & Sunset"},dot:"n",items:[
    {ico:"🧖",t:{de:<><span className="dtag t-relax">SPA</span> Hammam für alle — Peeling, Dampf, Massage. Pures Wohlbefinden zum Abschluss.</>,en:<><span className="dtag t-relax">SPA</span> Hammam for everyone — scrub, steam, massage. Pure bliss as a finale.</>}},
    {ico:"🌅",t:{de:<><b>Strand Aghir um 19:00 Uhr</b> — legendärer Sonnenuntergang Djerbas. Orangener, rosafarbener Himmel.</>,en:<><b>Aghir Beach at 7:00 PM</b> — Djerba's legendary sunset. Orange, pink sky.</>}},
    {ico:"🍽️",t:{de:<><span className="dtag t-food">ABSCHLUSSDINNER</span> <b>Restaurant la Bohème ⭐4.9</b> — das finale Festmahl. Meeresfrüchte, Couscous, Pastilla.</>,en:<><span className="dtag t-food">FAREWELL DINNER</span> <b>Restaurant la Bohème ⭐4.9</b> — the final feast. Seafood, couscous, pastilla.</>}},
    {ico:"🧳",t:{de:<>Koffer heute Abend packen. Flug morgen um <b>07:15 / 08:25</b>. Wecker auf <b>04:30</b> stellen.</>,en:<>Pack bags tonight. Flight tomorrow at <b>07:15 / 08:25</b>. Set alarm for <b>04:30</b>.</>}},
  ]},
  {d:15,date:{de:"Mi. 19. Aug",en:"Wed 19 Aug"},title:{de:"✈️ Auf Wiedersehen Djerba",en:"✈️ Farewell Djerba"},dot:"depart",items:[
    {ico:"⏰",t:{de:<><span className="dtag t-depart">ABFLUG</span> Wecker <b>04:30</b>. Checkout bis 12:00 Uhr — Frühcheckout am Vorabend arrangieren.</>,en:<><span className="dtag t-depart">DEPART</span> Alarm <b>04:30</b>. Check out by noon — arrange early checkout the night before.</>}},
    {ico:"🚐",t:{de:<>Transfer zum Flughafen DJE. Flug <b>07:15 → FRA 11:10</b> oder <b>08:25 → MUC 12:00</b>.</>,en:<>Transfer to DJE airport. Flight <b>07:15 → FRA 11:10</b> or <b>08:25 → MUC 12:00</b>.</>}},
    {ico:"🌴",t:{de:<>Ankunft in Deutschland um die Mittagszeit. ICE zurück nach Regensburg ~1h20. Heimkehr mit Erinnerungen fürs Leben 🌊</>,en:<>Arrive Germany around noon. ICE back to Regensburg ~1h20. Home with memories for life 🌊</>}},
  ]},
];

const restosData = [
  {rank:1,name:"Restaurant la Bohème",rating:"4.9",tag:"top",spec:{de:"Unbedingt reservieren — #1 der ganzen Insel",en:"Must book ahead — #1 on the whole island"}},
  {rank:2,name:"Restaurant La Mamma",rating:"4.8",tag:"sea",spec:{de:"Meeresfrüchte, Familienatmosphäre seit 1978",en:"Seafood, family atmosphere since 1978"}},
  {rank:3,name:"Restaurant Djerba Lina",rating:"4.7",tag:"local",spec:{de:"Traditionelle tunesische Küche, sehr beliebt",en:"Traditional Tunisian cuisine, very popular"}},
  {rank:4,name:"Restaurant Zitouna",rating:"4.7",tag:"local",spec:{de:"Traditionelles Ambiente, Couscous aux fruits de mer",en:"Traditional setting, couscous with seafood"}},
  {rank:5,name:"Restaurant cobry",rating:"4.7",tag:"local",spec:{de:"Lokales Juwel, authentische tunesische Aromen",en:"Local gem, authentic Tunisian flavours"}},
  {rank:6,name:"Restaurant Essofra",rating:"4.6",tag:"dec",spec:{de:"Schönstes Interieur der Insel im Souk",en:"Most beautiful interior on the island"}},
  {rank:7,name:"Restaurant chez Moktar",rating:"4.7",tag:"sea",spec:{de:"Bester Frischfisch laut Einheimischen",en:"Best fresh fish according to locals"}},
  {rank:8,name:"Restaurant Haroun",rating:"4.0",tag:"sea",spec:{de:"Abendessen auf einem Bootsdeck, Hafenblick",en:"Dinner on a boat deck with harbour view"}},
  {rank:9,name:"La Lagune",rating:"4.3",tag:"local",spec:{de:"Strandblick, charmante Atmosphäre",en:"Beach view, charming atmosphere"}},
  {rank:10,name:"Restaurant Baccar",rating:"4.6",tag:"sea",spec:{de:"Frischer Tagesfang, ausgezeichnetes Preis-Leistungs-Verhältnis",en:"Fresh daily catch, excellent value"}},
  {rank:11,name:"Restaurant Scilla",rating:"4.6",tag:"sea",spec:{de:"Terrasse, Kalamari und Garnelen an der Plancha",en:"Terrace, calamari and prawns on the griddle"}},
  {rank:12,name:"Restaurant Darkom",rating:"4.6",tag:"local",spec:{de:"Romantische Terrasse, Lammspieße",en:"Romantic terrace, lamb skewers"}},
  {rank:13,name:"Chez Maryouma",rating:"4.6",tag:"local",spec:{de:"Hausgemachte Küche, herzliche Aufnahme",en:"Home-cooked food, warm welcome"}},
  {rank:14,name:"Padella Djerba",rating:"4.5",tag:"local",spec:{de:"Gute Pizzen und Pasta — ideal für Kinder",en:"Good pizzas and pasta — ideal for kids"}},
  {rank:15,name:"Restaurant Djerba Nova",rating:"4.5",tag:"local",spec:{de:"Moderne lokale Küche, sehr geschätzt",en:"Modern local cuisine, highly regarded"}},
];

const cafesData = [
  {icon:"☕",cat:{de:"Historisch · Ikonisch",en:"Historic · Iconic"},name:{de:"Café de la Médina",en:"Café de la Médina"},desc:{de:"Ältestes Café Djerbas. Türkischer Kaffee in einem Innenhof aus dem 19. Jh.",en:"Djerba's oldest café. Turkish coffee in a 19th-century courtyard."},spec:{de:"☕ Türkischer Kaffee & Minztee",en:"☕ Turkish Coffee & Mint Tea"},bg:"#F5EEE6",specBg:"#FFF0D8",specCol:"#8B5010"},
  {icon:"🌿",cat:{de:"Garten · Zen",en:"Garden · Zen"},name:{de:"Le Jasmin Café",en:"Le Jasmin Café"},desc:{de:"Verstecktes Café hinter Jasminwänden nahe El Ghriba. Berühmt für Orangenblütentee.",en:"Hidden café behind jasmine walls near El Ghriba. Famous for orange blossom tea."},spec:{de:"🌸 Orangenblütentee",en:"🌸 Orange Blossom Tea"},bg:"#EEF5EE",specBg:"#D8F0D8",specCol:"#1A7A1A"},
  {icon:"🌊",cat:{de:"Strandcafé",en:"Beachside"},name:{de:"Café La Plage",en:"Café La Plage"},desc:{de:"Füße im Sand am Sidi Mahres. Frische Säfte, Eiskaffee, Meerblick.",en:"Feet in the sand at Sidi Mahres. Fresh juices, iced coffee, sea views."},spec:{de:"🍹 Frische Limonade",en:"🍹 Fresh Lemonade"},bg:"#E8F4FD",specBg:"#C8E8F8",specCol:"#0E5E8A"},
  {icon:"🎨",cat:{de:"Kunst · Kultur",en:"Art · Culture"},name:{de:"Café Culturel Erriadh",en:"Café Culturel Erriadh"},desc:{de:"Galerie-Café im Djerbahood-Dorf. Spezialitätenkaffee umgeben von Kunst.",en:"Gallery-café in Djerbahood village. Speciality coffee surrounded by art."},spec:{de:"🎨 Cold Brew",en:"🎨 Cold Brew"},bg:"#F5EEF8",specBg:"#E8D8F8",specCol:"#5B2DA0"},
  {icon:"🌴",cat:{de:"Lokal · Authentisch",en:"Local · Authentic"},name:{de:"Café Sidi Slim",en:"Café Sidi Slim"},desc:{de:"Wo die Einheimischen den Morgen beginnen. Espresso + Beignet für 0.5 TND.",en:"Where locals start their morning. Espresso + beignet for 0.5 TND."},spec:{de:"🍩 Espresso + Beignet",en:"🍩 Espresso + Beignet"},bg:"#F5F0E8",specBg:"#EEE0C8",specCol:"#7A5020"},
  {icon:"🛶",cat:{de:"Rooftop · Aussicht",en:"Rooftop · Views"},name:{de:"Terrasse du Borj",en:"Terrasse du Borj"},desc:{de:"Rooftop-Café mit Hafen- und Festungsblick. Ideal zum Sonnenuntergang.",en:"Rooftop café with harbour and fortress views. Ideal at sunset."},spec:{de:"🌅 Minztee bei Sonnenuntergang",en:"🌅 Mint Tea at Sunset"},bg:"#EEF0F5",specBg:"#D8DCF0",specCol:"#2A3A8A"},
];

const tipsData = [
  {i:"✈️",t:{de:"Flug · Gepäck",en:"Flight · Luggage"},d:{de:"Economy Light = KEIN Aufgabegepäck! 1 Handgepäck 8kg (55×40×23cm) + 1 persönliches Gepäckstück (40×30×15cm) pro Person. Aufgabegepäck ~€80–100 Aufpreis.",en:"Economy Light = NO checked luggage! 1 cabin bag 8kg (55×40×23cm) + 1 personal item (40×30×15cm) per person. Checked luggage ~€80–100 extra."}},
  {i:"🚆",t:{de:"Regensburg → Flughafen",en:"Regensburg → Airport"},d:{de:"ICE Regensburg → Frankfurt oder München ~1h20. Für die 04:45/06:10-Flüge: Zug um ~01:30/03:30 nehmen oder Vorabend am Flughafen übernachten.",en:"ICE Regensburg → Frankfurt or Munich ~1h20. For 04:45/06:10 flights: take train at ~01:30/03:30 or stay overnight at airport the evening before."}},
  {i:"💰",t:{de:"Währung",en:"Currency"},d:{de:"Tunesischer Dinar (TND). 1€ ≈ 3,4 TND. Bargeld ist König. Euros zum Wechseln mitbringen. Geldautomaten in Houmt Souk.",en:"Tunisian Dinar (TND). 1€ ≈ 3.4 TND. Cash is king. Bring euros to exchange. ATMs in Houmt Souk."}},
  {i:"🚗",t:{de:"Transport auf der Insel",en:"Getting Around"},d:{de:"Auto am Flughafen mieten — für 5 Personen unerlässlich. Die Insel ist flach und klein, ideal auch für Fahrradtouren.",en:"Rent a car at the airport — essential for 5 people. The island is flat and small, ideal for cycling too."}},
  {i:"🌡️",t:{de:"Wetter im August",en:"August Weather"},d:{de:"Sommer-Hochsaison. 30°C tagsüber, 28°C Meer. 12h Sonne. Aktivitäten meiden zwischen 13–16 Uhr — Mittagsschlaf Pflicht!",en:"Peak summer. 30°C days, 28°C sea. 12h sunshine. Avoid activities 1–4pm — siesta mandatory!"}},
  {i:"🧒",t:{de:"Tipps für Kinder",en:"Kids Tips"},d:{de:"Für Mädchen 8 & 10: Krokodil-Farm, Piratenschiff, Kamel, Aquapark, Schnorcheln. Sonnencreme LSF 50+ unbedingt!",en:"For girls 8 & 10: crocodile farm, pirate boat, camel, aqua-park, snorkeling. Sunscreen SPF50+ essential!"}},
  {i:"👗",t:{de:"Kleiderordnung",en:"Dress Code"},d:{de:"Bademode an Hotels und Stränden OK. In der Stadt, Synagoge und Moscheen: Schultern und Knie bedecken — auch für Kinder.",en:"Swimwear at hotels and beaches OK. In town, synagogue and mosques: cover shoulders and knees — for kids too."}},
  {i:"🗓️",t:{de:"Beste Reisezeit",en:"Best Time"},d:{de:"Ihre Familie reist im August (Hochsaison) — sehr heiß aber perfektes Meer. Frühling und Herbst ruhiger und kühler.",en:"Your family travels in August (peak season) — very hot but perfect sea. Spring and autumn are quieter and cooler."}},
  {i:"🎉",t:{de:"Ulysses Festival",en:"Ulysses Festival"},d:{de:"Das Internationale Ulysses Festival beginnt im Juli — beliebtestes Festival der Insel. Konzerte, Shows, Animationen.",en:"The International Ulysses Festival starts in July — most popular festival on the island. Concerts, shows, animations."}},
  {i:"🛡️",t:{de:"Sicherheit",en:"Safety"},d:{de:"Djerba ist eines der sichersten Ziele Tunesiens. Gastfreundliche, kulturell vielfältige Insel. Keine Bedenken für Familien.",en:"Djerba is one of Tunisia's safest destinations. Welcoming, culturally diverse island. No concerns for families."}},
  {i:"📱",t:{de:"Konnektivität",en:"Connectivity"},d:{de:"WLAN in allen Hotels. Lokale tunesische SIM-Karte kaufen für 5–10 TND — unbegrenztes Internet für die ganze Woche.",en:"WiFi in all hotels. Buy a local Tunisian SIM for 5–10 TND — unlimited internet for the whole week."}},
  {i:"🏥",t:{de:"Reiseversicherung",en:"Travel Insurance"},d:{de:"Dringend empfohlen für 5 Personen. Deckung inkl. medizinische Rückführung und Stornierung. ~€80–120 für 5 Personen.",en:"Strongly recommended for 5 people. Coverage incl. medical repatriation and cancellation. ~€80–120 for 5 people."}},
];

/* ─── COMPONENT ─────────────────────────────────────── */
export default function DjerbaGuide() {
  const [lang, setLang] = useState("de");
  const [active, setActive] = useState("vol");
  const t = T[lang];

  // ── Scroll-spy via IntersectionObserver ──
  const observerRef = useRef(null);
  useEffect(() => {
    const ids = t.navIds;
    const options = { rootMargin: "-20% 0px -70% 0px", threshold: 0 };
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, options);
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    });
    return () => observerRef.current && observerRef.current.disconnect();
  }, [lang]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const mealLabel = (m) => m === "AI" ? t.allInclusive : m === "RO" ? t.roomOnly : t.bb;
  const mealCls = (m) => m === "AI" ? "mp-ai" : m === "RO" ? "mp-ro" : "mp-bb";
  const fmtEur = (n) => `€${n.toLocaleString("de-DE")}`;

  const siteLabel = (s) => typeof s.label === "object" ? s.label[lang] : s.label;
  const siteName = (s) => typeof s.name === "object" ? s.name[lang] : s.name;
  const siteDesc = (s) => typeof s.desc === "object" ? s.desc[lang] : s.desc;

  return (
    <>
      <style>{G}</style>

      {/* HERO */}
      <div className="hero">
        <div className="hero-badge">{t.badge}</div>
        <h1><em>Djerba</em><br/>Tunesien</h1>
        <p className="hero-tagline">{t.heroSub}</p>
        <div className="hero-chips">
          {[["5","Reisende / Travellers"],["14","Nächte / Nights"],["3","Zimmer / Rooms"],["30°C","Im August"],["28°C","Meer / Sea"],["€1 726","Flüge FRA"],["€1 750","Flüge MUC"]].map(([v,l])=>(
            <div className="hchip" key={l}><span className="v">{v}</span><span className="l">{l}</span></div>
          ))}
        </div>
        <svg className="hero-wave" viewBox="0 0 1440 80" fill="none">
          <path d="M0 40 C360 80 1080 0 1440 40 L1440 80 L0 80 Z" fill="#FDF6EC"/>
        </svg>
      </div>

      {/* TOPBAR */}
      <nav className="topbar">
        {t.nav.map((label, i) => (
          <div key={t.navIds[i]}
            className={`tb-btn${active === t.navIds[i] ? " on" : ""}`}
            onClick={() => scrollTo(t.navIds[i])}>
            {label}
          </div>
        ))}
        <button className="lang-btn" onClick={() => setLang(l => l === "de" ? "en" : "de")}>
          {lang === "de" ? "🇬🇧 English" : "🇩🇪 Deutsch"}
        </button>
      </nav>

      {/* ══ FLÜGE / FLIGHTS ══ */}
      <div className="band-dark" id="vol">
        <div className="wrap" style={{paddingTop:52}}>
          <div className="sh">
            <div className="ey">{t.flightSec}</div>
            <h2 style={{color:"#fff"}}>{lang==="de"?"Frankfurt & München":"Frankfurt & Munich"} <span>↔ Djerba</span></h2>
            <p style={{color:"rgba(255,255,255,.5)"}}>{t.flightSub}</p>
          </div>

          {/* Family bar */}
          <div style={{background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.12)",borderRadius:16,padding:"14px 20px",display:"flex",alignItems:"center",gap:14,marginBottom:28,flexWrap:"wrap"}}>
            <span style={{fontSize:30}}>👨‍👩‍👧‍👧</span>
            <div>
              <div style={{color:"#fff",fontWeight:700,fontSize:14,marginBottom:2}}>{t.flightFamTitle}</div>
              <div style={{color:"rgba(255,255,255,.5)",fontSize:13}}>{t.flightFamSub}</div>
            </div>
          </div>

          {/* Option 1: Frankfurt */}
          <div className="flt-opt-label">{lang==="de"?"Option 1 — ab Frankfurt (FRA)":"Option 1 — from Frankfurt (FRA)"}</div>
          <div className="flt-grid">
            <div className="flt go">
              <div className="flt-dir">{t.outbound}</div>
              <div className="flt-date">📅 {lang==="de"?"Mittwoch, 5. August 2026":"Wednesday, 5 August 2026"}</div>
              <div className="flt-times">
                <div><div className="flt-t">04:45</div><div className="flt-ap">FRA · T1</div></div>
                <div className="flt-mid">
                  <div className="flt-line"></div>
                  <div className="flt-ns">{t.nonstop} · 4Y 210</div>
                </div>
                <div><div className="flt-t">06:30</div><div className="flt-ap">DJE · Zarzis</div></div>
              </div>
              <div className="flt-foot">
                <span className="flt-dur"><b>2h 45min</b></span>
                <span style={{fontSize:11,color:"rgba(255,255,255,.35)"}}>Airbus A320</span>
                <span className="flt-cls">Economy Light</span>
              </div>
            </div>
            <div className="flt back">
              <div className="flt-dir">{t.return}</div>
              <div className="flt-date">📅 {lang==="de"?"Mittwoch, 19. August 2026":"Wednesday, 19 August 2026"}</div>
              <div className="flt-times">
                <div><div className="flt-t">07:15</div><div className="flt-ap">DJE</div></div>
                <div className="flt-mid">
                  <div className="flt-line"></div>
                  <div className="flt-ns">{t.nonstop} · 4Y 211</div>
                </div>
                <div><div className="flt-t">11:10</div><div className="flt-ap">FRA · T1</div></div>
              </div>
              <div className="flt-foot">
                <span className="flt-dur"><b>2h 55min</b></span>
                <span style={{fontSize:11,color:"rgba(255,255,255,.35)"}}>Airbus A320</span>
                <span className="flt-cls">Economy Light</span>
              </div>
            </div>
          </div>
          <div className="price-hero">
            <div>
              <div className="price-lbl">{t.totalFlight5}</div>
              <div className="price-big"><sup>€</sup>1 726.40</div>
              <div className="price-sub">{t.perPax.replace("{x}","345")}</div>
            </div>
            <div className="flt-facts">
              <div className="flt-fact">🏖️ {t.nights14}</div>
              <div className="flt-fact">🚆 Regensburg → FRA <b>ICE ~1h20</b></div>
              <div className="flt-fact">✅ {t.directBoth}</div>
            </div>
          </div>

          {/* OR divider */}
          <div className="flt-or-divider"><span className="flt-or-text">{t.or}</span></div>

          {/* Option 2: Munich */}
          <div className="flt-opt-label">{lang==="de"?"Option 2 — ab München (MUC)":"Option 2 — from Munich (MUC)"}</div>
          <div className="flt-grid">
            <div className="flt go">
              <div className="flt-dir">{t.outbound}</div>
              <div className="flt-date">📅 {lang==="de"?"Mittwoch, 5. August 2026":"Wednesday, 5 August 2026"}</div>
              <div className="flt-times">
                <div><div className="flt-t">06:10</div><div className="flt-ap">MUC</div></div>
                <div className="flt-mid">
                  <div className="flt-line"></div>
                  <div className="flt-ns">{t.nonstop}</div>
                </div>
                <div><div className="flt-t">07:40</div><div className="flt-ap">DJE · Zarzis</div></div>
              </div>
              <div className="flt-foot">
                <span className="flt-dur"><b>2h 30min</b></span>
                <span style={{fontSize:11,color:"rgba(255,255,255,.35)"}}>Airbus A320</span>
                <span className="flt-cls">Economy Light</span>
              </div>
            </div>
            <div className="flt back">
              <div className="flt-dir">{t.return}</div>
              <div className="flt-date">📅 {lang==="de"?"Mittwoch, 19. August 2026":"Wednesday, 19 August 2026"}</div>
              <div className="flt-times">
                <div><div className="flt-t">08:25</div><div className="flt-ap">DJE</div></div>
                <div className="flt-mid">
                  <div className="flt-line"></div>
                  <div className="flt-ns">{t.nonstop}</div>
                </div>
                <div><div className="flt-t">12:00</div><div className="flt-ap">MUC</div></div>
              </div>
              <div className="flt-foot">
                <span className="flt-dur"><b>2h 35min</b></span>
                <span style={{fontSize:11,color:"rgba(255,255,255,.35)"}}>Airbus A320</span>
                <span className="flt-cls">Economy Light</span>
              </div>
            </div>
          </div>
          <div className="price-hero">
            <div>
              <div className="price-lbl">{t.totalFlight5}</div>
              <div className="price-big"><sup>€</sup>1 750.10</div>
              <div className="price-sub">{t.perPax.replace("{x}","350")}</div>
            </div>
            <div className="flt-facts">
              <div className="flt-fact">🏖️ {t.nights14}</div>
              <div className="flt-fact">🚆 Regensburg → MUC <b>{lang==="de"?"~1h20 Zug/Auto":"~1h20 train/car"}</b></div>
              <div className="flt-fact">✅ {t.directBoth}</div>
            </div>
          </div>

          <div className="warn-box">
            <span style={{fontSize:22,flexShrink:0}}>⚠️</span>
            <p><b>{t.bagWarnTitle}</b> {t.bagWarnText}</p>
          </div>
        </div>
      </div>

      {/* ══ HOTELS ══ */}
      <div className="band-ocean" id="hotels">
        <div className="wrap" style={{paddingTop:52}}>
          <div className="sh">
            <div className="ey">{t.hotelSec}</div>
            <h2 style={{color:"#fff"}}>{t.hotelH[0]} <span>{t.hotelH[1]}</span></h2>
            <p style={{color:"rgba(255,255,255,.55)"}}>{t.hotelSub}</p>
          </div>
          <div className="htl-grid">
            {hotelsData.map(h => (
              <div className="htl-card" key={h.name}>
                <div className="htl-thumb" style={{background:h.thumbBg}}>
                  <div style={{fontSize:56}}>{h.thumb}</div>
                  <div className={`htl-rank ${h.rank}`}>{t[h.rankKey]}</div>
                </div>
                <div className="htl-body">
                  <div className="htl-name">{h.name}</div>
                  <div className="htl-stars">{h.stars}</div>
                  <div className="htl-score-row">
                    <span className="htl-score-n">{h.score}</span>
                    <span className="htl-score-s">/100 · {typeof h.reviews === "object" ? h.reviews[lang] : h.reviews} {lang==="de"?"Bewertungen":"reviews"}</span>
                  </div>
                  <div className="htl-beach-pill">
                    <b>{t.beach}</b>{h.beachDesc[lang]}
                  </div>
                  <div className="htl-room">
                    <div className="htl-room-name">{h.roomName[lang]}</div>
                    <span className={`meal-pill ${mealCls(h.meal)}`}>{mealLabel(h.meal)}</span>
                    {h.cancel
                      ? <div className="cancel-ok">{t.cancelOk} {h.cancelDate ? h.cancelDate[lang] : ""}</div>
                      : <div className="cancel-no">{t.cancelNo}</div>
                    }
                  </div>
                  {/* Per-room breakdown */}
                  <div className="per-room">
                    <div className="per-room-hd">{t.perRoomTitle}</div>
                    {h.perRoom.map((pr, i) => (
                      <div className="per-row" key={i}>
                        <div className="per-who">{lang === "de" ? pr.who : pr.whoEn}</div>
                        <div className="per-prices">
                          {pr.ppnEur
                            ? <><div className="per-ppn">{fmtEur(pr.ppnEur)}/{t.perNight}</div><span className="per-total">{fmtEur(pr.tot14Eur)} {t.totalNights}</span></>
                            : <div className="per-ppn" style={{fontSize:13,color:"#9A8A7A"}}>{t.onRequest}</div>
                          }
                        </div>
                      </div>
                    ))}
                    {h.totalEur
                      ? <div className="per-footer">
                          <span className="per-footer-lbl">{t.total3rooms}</span>
                          <div style={{textAlign:"right"}}>
                            <div className="per-footer-val">{fmtEur(h.totalEur)}</div>
                            <div style={{fontSize:10,color:"#9A8A7A"}}>{fmtEur(Math.round(h.totalEur/14))}/{t.perNight}</div>
                          </div>
                        </div>
                      : <div style={{padding:"8px 12px",fontSize:12,color:"#7A6A5A",fontStyle:"italic"}}>{t.contactHotel}</div>
                    }
                    <div className="per-note">{t.perRoomNote}</div>
                  </div>
                  <div className="htl-perks">{h.perks[lang].map(p => <span className="htl-perk" key={p}>{p}</span>)}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="beach-winner">
            <span className="bwi">🏅</span>
            <div>
              <h3>{t.bestBeachTitle}</h3>
              <p>{t.bestBeachDesc}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ══ SITES ══ */}
      <div className="band-sand" id="sites">
        <div className="wrap">
          <div className="sh">
            <div className="ey">{t.sitesSec}</div>
            <h2>{t.sitesH[0]} <span>{t.sitesH[1]}</span></h2>
            <p>{t.sitesSub}</p>
          </div>
          <div className="sites-grid">
            {sitesData.map(s => (
              <div className={`site-card ${s.cat}`} key={siteName(s)}>
                <span className="site-icon">{s.icon}</span>
                <div className="site-cat">{siteLabel(s)}</div>
                <div className="site-name">{siteName(s)}</div>
                {s.must && <span className="must-tag">{t.must}</span>}
                <div className="site-desc">{siteDesc(s)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ BEACHES ══ */}
      <div className="band-white" id="plages">
        <div className="wrap">
          <div className="sh">
            <div className="ey">{t.beachesSec}</div>
            <h2>{t.beachesH[0]} <span>{t.beachesH[1]}</span> {t.beachesH[2]}</h2>
            <p>{t.beachesSub}</p>
          </div>
          <div className="beach-cards">
            {beachesData.map(b => (
              <div className="beach-card" key={b.name.de}>
                <div className="beach-hd" style={{background:b.bg}}>
                  <div className="big">{b.emoji}</div>
                  <div className="beach-badge">{b.badge[lang]}</div>
                </div>
                <div className="beach-body">
                  <div className="beach-name">{b.name[lang]}</div>
                  <div className="beach-loc">📍 {b.loc[lang]}</div>
                  <div className="beach-desc">{b.desc[lang]}</div>
                  <div className="beach-ideal">💡 {b.ideal[lang]}</div>
                  <div className="beach-tags">{b.tags.map(tag => <span className="btag" key={tag}>{tag}</span>)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ ACTIVITIES ══ */}
      <div className="band-teal" id="activites">
        <div className="wrap">
          <div className="sh">
            <div className="ey" style={{color:"#56D9C8"}}>{t.actSec}</div>
            <h2 style={{color:"#fff"}}>{t.actH[0]} <span style={{color:"#56D9C8"}}>{t.actH[1]}</span> {t.actH[2]}</h2>
            <p style={{color:"rgba(255,255,255,.55)"}}>{t.actSub}</p>
          </div>
          <div className="act-grid">
            {activitiesData.map(a => (
              <div className="act-card" key={a.name.de}>
                <span className="act-icon">{a.icon}</span>
                <div className="act-cat">{a.cat[lang]}</div>
                <div className="act-name">{a.name[lang]}</div>
                <div className="act-desc">{a.desc[lang]}</div>
                <div className="act-meta">
                  <span className="act-price">{a.price}</span>
                  <span className={`act-who who-${a.who}`}>{a.who==="fam"?t.forKids:t.forAll}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ EXCURSIONS ══ */}
      <div className="band-mist" id="excursions">
        <div className="wrap">
          <div className="sh">
            <div className="ey">{t.excSec}</div>
            <h2>{t.excH[0]} <span>{t.excH[1]}</span></h2>
            <p>{t.excSub}</p>
          </div>
          <div className="exc-grid">
            {excursionsData.map(e => (
              <div className="exc-card" key={e.name}>
                <span className="exc-icon">{e.icon}</span>
                <div className="exc-dest">{e.dest[lang]}</div>
                <div className="exc-name">{e.name}</div>
                <div className="exc-desc">{e.desc[lang]}</div>
                <div className="exc-dist">🚗 {e.dist[lang]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ ITINERARY ══ */}
      <div className="band-white" id="planning">
        <div className="wrap">
          <div className="sh">
            <div className="ey">{t.planSec}</div>
            <h2>{t.planH[0]} <span>{t.planH[1]}</span><br/>{t.planH[2]}</h2>
            <p>{t.planSub}</p>
          </div>
          <div className="itin">
            {itinData.map(d => (
              <div className="iday" key={d.d}>
                <div className="iday-lbl">
                  <div className="iday-n">{lang==="de"?"Tag":"Day"} {d.d}</div>
                  <div className="iday-d">{d.date[lang]}</div>
                </div>
                <div className={`iday-dot dot-${d.dot==="n"?"n":d.dot}`}></div>
                <div className="iday-box">
                  <div className="iday-title">{d.title[lang]}</div>
                  <div className="iday-items">
                    {d.items.map((it, i) => (
                      <div className="iday-item" key={i}>
                        <span className="ico">{it.ico}</span>
                        <span>{it.t[lang]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ RESTAURANTS ══ */}
      <div className="band-sand" id="restaurants">
        <div className="wrap">
          <div className="sh">
            <div className="ey">{t.restoSec}</div>
            <h2>{t.restoH[0]} <span>{t.restoH[1]}</span> {t.restoH[2]}</h2>
            <p>{t.restoSub}</p>
          </div>
          <div className="resto-list">
            {restosData.map(r => (
              <div className="resto-card" key={r.rank}>
                <div className="resto-rank">#{r.rank}</div>
                <div className="resto-rat">
                  <span className="stars-f">{"★".repeat(Math.floor(parseFloat(r.rating)))}</span>
                  <span className="rat-n">{r.rating}</span>
                </div>
                <div className="resto-name">{r.name}</div>
                <span className={`rtag rt-${r.tag}`}>
                  {r.tag==="top"?"⭐ Top":r.tag==="sea"?"🐟 Seafood":r.tag==="dec"?"🎭 Décor":lang==="de"?"🫕 Lokal":"🫕 Local"}
                </span>
                <div className="resto-spec">{r.spec[lang]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ CAFÉS ══ */}
      <div className="band-white" id="cafes">
        <div className="wrap">
          <div className="sh">
            <div className="ey">{t.cafesSec}</div>
            <h2>{t.cafesH[0]} <span>{t.cafesH[1]}</span></h2>
            <p>{t.cafesSub}</p>
          </div>
          <div className="cf-grid">
            {cafesData.map(c => (
              <div className="cf-card" key={c.name.de} style={{background:c.bg}}>
                <span className="cf-icon">{c.icon}</span>
                <div className="cf-cat">{c.cat[lang]}</div>
                <div className="cf-name">{c.name[lang]}</div>
                <div className="cf-desc">{c.desc[lang]}</div>
                <span className="cf-spec" style={{background:c.specBg,color:c.specCol}}>{c.spec[lang]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ WEATHER ══ */}
      <div className="band-sand" id="meteo">
        <div className="wrap">
          <div className="sh">
            <div className="ey">{t.meteoSec}</div>
            <h2>{t.meteoH[0]} <span>{t.meteoH[1]}</span> {t.meteoH[2]}</h2>
            <p>{t.meteoSub}</p>
          </div>
          <div className="meteo-warn">{t.meteoWarn}</div>
          <div className="chart-grid">
            <div className="chart-box">
              <h3>{lang==="de"?"Temperaturen (°C) — Luft & Meer":"Temperatures (°C) — Air & Sea"}</h3>
              <p>{lang==="de"?"Im August: 30°C Luft, 28°C Meer":"In August: 30°C air, 28°C sea"}</p>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={weatherData}>
                  <XAxis dataKey="m" tick={{fontSize:11,fill:"#9A8A7A"}}/>
                  <YAxis tick={{fontSize:11,fill:"#9A8A7A"}} unit="°" domain={[10,35]}/>
                  <Tooltip formatter={(v,n)=>[`${v}°C`,n==="t"?(lang==="de"?"Luft":"Air"):(lang==="de"?"Meer":"Sea")]} contentStyle={{borderRadius:10,border:"none",fontSize:12}}/>
                  <Line type="monotone" dataKey="t" stroke="#E8643C" strokeWidth={3} dot={{r:3}} name="t"/>
                  <Line type="monotone" dataKey="sea" stroke="#0E4D7B" strokeWidth={3} dot={{r:3}} name="sea"/>
                </LineChart>
              </ResponsiveContainer>
              <div style={{display:"flex",gap:18,marginTop:10}}>
                <span style={{fontSize:12,color:"#E8643C",fontWeight:600}}>{t.airTemp}</span>
                <span style={{fontSize:12,color:"#0E4D7B",fontWeight:600}}>{t.seaTemp}</span>
              </div>
            </div>
            <div className="chart-box">
              <h3>{lang==="de"?"Sonnenstunden / Tag":"Daily Sunshine Hours"}</h3>
              <p>{lang==="de"?"August = 12h Sonne — der sonnigste Monat":"August = 12h sunshine — sunniest month"}</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={weatherData} barSize={16}>
                  <XAxis dataKey="m" tick={{fontSize:11,fill:"#9A8A7A"}}/>
                  <YAxis tick={{fontSize:11,fill:"#9A8A7A"}} unit="h" domain={[0,14]}/>
                  <Tooltip formatter={v=>[`${v}h`,lang==="de"?"Sonne":"Sun"]} contentStyle={{borderRadius:10,border:"none",fontSize:12}}/>
                  <Bar dataKey="s" fill="#F5A623" radius={[5,5,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* ══ TIPS ══ */}
      <div className="band-white" id="conseils">
        <div className="wrap">
          <div className="sh">
            <div className="ey">{t.tipsSec}</div>
            <h2>{t.tipsH[0]} <span>{t.tipsH[1]}</span> {t.tipsH[2]}</h2>
            <p>{t.tipsSub}</p>
          </div>
          <div className="tips-grid">
            {tipsData.map(tip => (
              <div className="tip-card" key={tip.t.de}>
                <span className="tip-icon">{tip.i}</span>
                <div className="tip-title">{tip.t[lang]}</div>
                <div className="tip-text">{tip.d[lang]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="band-dark">
        <div className="footer-wrap">
          <div className="ft">🌴</div>
          <h3>{t.footerTitle}</h3>
          <p>{t.footerSub}</p>
          <div className="budget-row">
            {[
              [lang==="de"?"Flüge FRA (5P)":"Flights FRA (5P)","€1 726"],
              [lang==="de"?"Flüge MUC (5P)":"Flights MUC (5P)","€1 750"],
              [lang==="de"?"Hotel (Bestes)":"Hotel (Best Value)",`€${gbpToEur(6688).toLocaleString("de-DE")}`],
              [lang==="de"?"Hotel (Top Strand)":"Hotel (Top Beach)",`€${gbpToEur(20888).toLocaleString("de-DE")}`],
              [lang==="de"?"Dauer":"Duration","14 "+( lang==="de"?"Nächte":"nights")],
              [lang==="de"?"Sehenswürdigkeiten":"Sights","17+"],
            ].map(([l,v]) => (
              <div className="bitem" key={l}><div className="bl">{l}</div><div className="bv">{v}</div></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
