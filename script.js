const kareler = document.querySelectorAll(".kare");
const kareDizi = Array.from(kareler);
const renkler = ["red", "orange", "yellow", "green", "blue", "purple"];

const puanlar = {
  red: 2000,
  purple: 1200,
  blue: 800,
  green: 600,
  orange: 400,
  yellow: 200,
};

const HAMLE_BONUS = 1000;
const MINI = 40;
const MINI_ARA = 3;
const MIKNATIS_MESAFE = 42;

// ======================================================================
//  VARSAYILAN AYARLAR  —  buradan kolayca degistirilebilir
// ======================================================================
const VARSAYILAN = {
  dil: "tr",              // tr | en | es
  ses: 70,                // 0-100
  sesAcik: true,
  animHiz: "normal",      // yavas | normal | hizli
  sarsinti: true,
  renkKorlugu: false,
  bolum: 1,            // Klasik: kalinan bolum
  enYuksek: 0,         // Klasik: en yuksek skor
  nasilGosterildi: false,
  tersEnYuksek: 0,     // Ters mod: en yuksek skor
  speedEnBolum: 0,     // Speedrun: ulasilan en yuksek bolum
  gunluk: { seri: 0, enUzunSeri: 0, toplam: 0, sonTarih: null },  // Gunluk mod
  ist: {
    tamamlananBolum: 0,
    toplamBlok: 0,
    toplamPuan: 0,
    enYuksekCombo: 1,
    oyunSayisi: 0,
  },
};

// Animasyon temel sureleri (Normal). Hiz carpani bunlari olcekler.
const PATLA_SURE = 900;   // patlama animasyonu (ms)
const ADIM_SURE = 70;     // patlama dalga gecikmesi (ms)
const POP_SURE = 2200;    // puan yazisi ekranda kalma (ms)

// Renk korlugu sembolleri
const renkSembol = {
  red: "●",     // daire
  blue: "▲",    // ucgen
  green: "■",   // kare
  yellow: "★",  // yildiz
  purple: "✚",  // arti
  orange: "◆",  // baklava
};

// ======================================================================
//  DILLER  —  yeni dil eklemek icin buraya yeni bir blok ekle
// ======================================================================
const DILLER = {
  tr: {
    basla: "BAŞLA", ayarlar: "AYARLAR", nasilOynanir: "NASIL OYNANIR", istatistikler: "İSTATİSTİKLER",
    bolumKelime: "Bölüm", enYuksekSkor: "En yüksek", bolumEtiket: "BÖLÜM", hamleEtiket: "HAMLE",
    ipuc_yenile: "Yeniden başlat", ipuc_anamenu: "Ana menü", ipuc_ayarlar: "Ayarlar",
    bolumTamam: "BÖLÜM TAMAM", basarisiz: "BAŞARISIZ", sonrakiBolum: "SONRAKİ BÖLÜM", tekrarDene: "TEKRAR DENE",
    hamlenBitti: "hamlen bitti",
    st_blok: "Patlattığın blok", st_bonus: "Kalan hamle bonusu", st_bolumPuan: "Bölüm puanı",
    st_toplam: "Toplam puan", st_enYuksek: "En yüksek skor",
    zor_kolay: "Kolay", zor_orta: "Orta", zor_zor: "Zor", zor_cokzor: "Çok Zor",
    ayarlarBaslik: "AYARLAR", ayar_dil: "Dil", ayar_ses: "Ses seviyesi", ayar_sesAcik: "Ses",
    ayar_anim: "Animasyon hızı", anim_yavas: "Yavaş", anim_normal: "Normal", anim_hizli: "Hızlı",
    ayar_sarsinti: "Ekran sarsıntısı", ayar_renkKor: "Renk körlüğü modu", ayar_sifirla: "İlerlemeyi sıfırla",
    sifirlaOnay: "Emin misin? (tekrar bas)", kapat: "KAPAT", acikDurum: "Açık", kapaliDurum: "Kapalı",
    nasilBaslik: "NASIL OYNANIR",
    nasil1: "Tahtada renkli bloklardan oluşan boşluklar vardır.",
    nasil2: "Alttaki tepsiden, boşluğa şekli ve rengi uyan parçayı sürükle.",
    nasil3: "Aynı renkten yeterince blok yan yana gelirse patlar ve puan kazanırsın.",
    nasil4: "Her bölümde sınırlı hamlen var; hamlen biterse bölümü kaybedersin.",
    kisayollar: "Klavye kısayolları", ks_esc: "Duraklat / paneli kapat",
    ks_r: "Bölümü yeniden başlat", ks_m: "Ana menüye dön", ileri: "İleri", geri: "Geri",
    istBaslik: "İSTATİSTİKLER", ist_bolum: "Tamamlanan bölüm", ist_blok: "Toplam patlatılan blok",
    ist_puan: "Toplam kazanılan puan", ist_combo: "En yüksek combo", ist_oyun: "Oynanan oyun sayısı",
    duraklatildi: "DURAKLATILDI", devamEt: "DEVAM ET", anaMenu: "ANA MENÜ",
    yeniRekor: "YENİ REKOR!",
    modlar: "MODLAR", geriBtn: "GERİ",
    mod_klasik: "KLASİK", mod_klasik_ac: "Bölüm bölüm ilerle",
    mod_ters: "TERS MOD", mod_ters_ac: "Tahta boş, sen doldur",
    mod_speedrun: "SPEEDRUN", mod_speedrun_ac: "Süreye karşı yarış",
    mod_gunluk: "GÜNLÜK", mod_gunluk_ac: "Her gün yeni bulmaca",
    oyunBitti: "OYUN BİTTİ", sr_sure: "SÜRE",
    st_devreden: "Devreden süre", sr_toplamSure: "Toplam süre",
    sr_ulasilanBolum: "Ulaşılan bölüm", sr_enIyiBolum: "En iyi bölüm",
    gunluk_seri: "Seri", gunluk_enUzun: "En uzun seri", gunluk_toplam: "Tamamlanan bulmaca",
    gunluk_tarih: "Tarih", gunluk_hamleKullanilan: "Kullanılan hamle",
    gunluk_yarin: "Yarınki bulmacaya", gunluk_bugunBitti: "BUGÜNLÜK TAMAM",
    gunluk_seriArtti: "SERİ SÜRÜYOR!", gunluk_seriBasladi: "SERİ BAŞLADI!",
    gunluk_seriKirildi: "Yeni bir seri başlıyor", tekrar: "TEKRAR", menuSeri: "Seri",
    ters_cizgi: "Temizlenen çizgi",
  },
  en: {
    basla: "START", ayarlar: "SETTINGS", nasilOynanir: "HOW TO PLAY", istatistikler: "STATISTICS",
    bolumKelime: "Level", enYuksekSkor: "Best", bolumEtiket: "LEVEL", hamleEtiket: "MOVES",
    ipuc_yenile: "Restart", ipuc_anamenu: "Main menu", ipuc_ayarlar: "Settings",
    bolumTamam: "LEVEL COMPLETE", basarisiz: "FAILED", sonrakiBolum: "NEXT LEVEL", tekrarDene: "TRY AGAIN",
    hamlenBitti: "out of moves",
    st_blok: "Blocks cleared", st_bonus: "Move bonus", st_bolumPuan: "Level score",
    st_toplam: "Total score", st_enYuksek: "Best score",
    zor_kolay: "Easy", zor_orta: "Medium", zor_zor: "Hard", zor_cokzor: "Very Hard",
    ayarlarBaslik: "SETTINGS", ayar_dil: "Language", ayar_ses: "Volume", ayar_sesAcik: "Sound",
    ayar_anim: "Animation speed", anim_yavas: "Slow", anim_normal: "Normal", anim_hizli: "Fast",
    ayar_sarsinti: "Screen shake", ayar_renkKor: "Colorblind mode", ayar_sifirla: "Reset progress",
    sifirlaOnay: "Are you sure? (tap again)", kapat: "CLOSE", acikDurum: "On", kapaliDurum: "Off",
    nasilBaslik: "HOW TO PLAY",
    nasil1: "The board has gaps made of colored blocks.",
    nasil2: "Drag the piece whose shape and color fit the gap from the tray below.",
    nasil3: "When enough same-color blocks line up, they burst and you score.",
    nasil4: "Each level has limited moves; run out and you lose the level.",
    kisayollar: "Keyboard shortcuts", ks_esc: "Pause / close panel",
    ks_r: "Restart level", ks_m: "Back to main menu", ileri: "Next", geri: "Back",
    istBaslik: "STATISTICS", ist_bolum: "Levels completed", ist_blok: "Total blocks cleared",
    ist_puan: "Total score earned", ist_combo: "Best combo", ist_oyun: "Games played",
    duraklatildi: "PAUSED", devamEt: "RESUME", anaMenu: "MAIN MENU",
    yeniRekor: "NEW RECORD!",
    modlar: "MODES", geriBtn: "BACK",
    mod_klasik: "CLASSIC", mod_klasik_ac: "Progress level by level",
    mod_ters: "REVERSE", mod_ters_ac: "Empty board, you fill it",
    mod_speedrun: "SPEEDRUN", mod_speedrun_ac: "Race against time",
    mod_gunluk: "DAILY", mod_gunluk_ac: "A new puzzle every day",
    oyunBitti: "GAME OVER", sr_sure: "TIME",
    st_devreden: "Carried time", sr_toplamSure: "Total time",
    sr_ulasilanBolum: "Level reached", sr_enIyiBolum: "Best level",
    gunluk_seri: "Streak", gunluk_enUzun: "Longest streak", gunluk_toplam: "Puzzles solved",
    gunluk_tarih: "Date", gunluk_hamleKullanilan: "Moves used",
    gunluk_yarin: "Next puzzle in", gunluk_bugunBitti: "DONE FOR TODAY",
    gunluk_seriArtti: "STREAK GOES ON!", gunluk_seriBasladi: "STREAK STARTED!",
    gunluk_seriKirildi: "A new streak begins", tekrar: "RETRY", menuSeri: "Streak",
    ters_cizgi: "Lines cleared",
  },
  es: {
    basla: "EMPEZAR", ayarlar: "AJUSTES", nasilOynanir: "CÓMO JUGAR", istatistikler: "ESTADÍSTICAS",
    bolumKelime: "Nivel", enYuksekSkor: "Mejor", bolumEtiket: "NIVEL", hamleEtiket: "JUGADAS",
    ipuc_yenile: "Reiniciar", ipuc_anamenu: "Menú principal", ipuc_ayarlar: "Ajustes",
    bolumTamam: "NIVEL COMPLETADO", basarisiz: "FALLASTE", sonrakiBolum: "SIGUIENTE NIVEL", tekrarDene: "REINTENTAR",
    hamlenBitti: "sin movimientos",
    st_blok: "Bloques reventados", st_bonus: "Bono de movimientos", st_bolumPuan: "Puntos del nivel",
    st_toplam: "Puntos totales", st_enYuksek: "Mejor puntuación",
    zor_kolay: "Fácil", zor_orta: "Medio", zor_zor: "Difícil", zor_cokzor: "Muy Difícil",
    ayarlarBaslik: "AJUSTES", ayar_dil: "Idioma", ayar_ses: "Volumen", ayar_sesAcik: "Sonido",
    ayar_anim: "Velocidad de animación", anim_yavas: "Lento", anim_normal: "Normal", anim_hizli: "Rápido",
    ayar_sarsinti: "Vibración de pantalla", ayar_renkKor: "Modo daltónico", ayar_sifirla: "Reiniciar progreso",
    sifirlaOnay: "¿Seguro? (pulsa otra vez)", kapat: "CERRAR", acikDurum: "Sí", kapaliDurum: "No",
    nasilBaslik: "CÓMO JUGAR",
    nasil1: "El tablero tiene huecos formados por bloques de colores.",
    nasil2: "Arrastra desde la bandeja la pieza cuya forma y color encajen en el hueco.",
    nasil3: "Cuando bastantes bloques del mismo color se juntan, estallan y ganas puntos.",
    nasil4: "Cada nivel tiene movimientos limitados; si se acaban, pierdes el nivel.",
    kisayollar: "Atajos de teclado", ks_esc: "Pausar / cerrar panel",
    ks_r: "Reiniciar nivel", ks_m: "Volver al menú", ileri: "Siguiente", geri: "Atrás",
    istBaslik: "ESTADÍSTICAS", ist_bolum: "Niveles completados", ist_blok: "Bloques reventados",
    ist_puan: "Puntos totales ganados", ist_combo: "Mejor combo", ist_oyun: "Partidas jugadas",
    duraklatildi: "EN PAUSA", devamEt: "CONTINUAR", anaMenu: "MENÚ PRINCIPAL",
    yeniRekor: "¡NUEVO RÉCORD!",
    modlar: "MODOS", geriBtn: "ATRÁS",
    mod_klasik: "CLÁSICO", mod_klasik_ac: "Avanza nivel a nivel",
    mod_ters: "MODO INVERSO", mod_ters_ac: "Tablero vacío, tú lo llenas",
    mod_speedrun: "SPEEDRUN", mod_speedrun_ac: "Corre contra el tiempo",
    mod_gunluk: "DIARIO", mod_gunluk_ac: "Un puzzle nuevo cada día",
    oyunBitti: "FIN DEL JUEGO", sr_sure: "TIEMPO",
    st_devreden: "Tiempo acumulado", sr_toplamSure: "Tiempo total",
    sr_ulasilanBolum: "Nivel alcanzado", sr_enIyiBolum: "Mejor nivel",
    gunluk_seri: "Racha", gunluk_enUzun: "Mejor racha", gunluk_toplam: "Puzzles resueltos",
    gunluk_tarih: "Fecha", gunluk_hamleKullanilan: "Jugadas usadas",
    gunluk_yarin: "Próximo puzzle en", gunluk_bugunBitti: "HECHO POR HOY",
    gunluk_seriArtti: "¡RACHA CONTINÚA!", gunluk_seriBasladi: "¡RACHA INICIADA!",
    gunluk_seriKirildi: "Empieza una nueva racha", tekrar: "REINTENTAR", menuSeri: "Racha",
    ters_cizgi: "Líneas eliminadas",
  },
};

const KAYIT_ANAHTAR = "snapburst_v2";
const yereller = { tr: "tr-TR", en: "en-US", es: "es-ES" };

function derinKopya(o) {
  return JSON.parse(JSON.stringify(o));
}

function birlestir(temel, gelen) {
  const sonuc = derinKopya(temel);
  if (gelen && typeof gelen === "object") {
    Object.keys(gelen).forEach(function (k) {
      if (!(k in sonuc)) return;
      const t = sonuc[k], g = gelen[k];
      // Ic ice sade nesneleri (ist, gunluk) alan alan birlestir
      if (t && typeof t === "object" && !Array.isArray(t) &&
          g && typeof g === "object" && !Array.isArray(g)) {
        Object.assign(sonuc[k], g);
      } else {
        sonuc[k] = g;
      }
    });
  }
  return sonuc;
}

function veriYukle() {
  try {
    const ham = localStorage.getItem(KAYIT_ANAHTAR);
    if (!ham) return derinKopya(VARSAYILAN);
    return birlestir(VARSAYILAN, JSON.parse(ham));
  } catch (e) {
    return derinKopya(VARSAYILAN);
  }
}

function veriKaydet() {
  try {
    localStorage.setItem(KAYIT_ANAHTAR, JSON.stringify(veri));
  } catch (e) {}
}

let veri = veriYukle();

function metin(anahtar) {
  const d = DILLER[veri.dil] || DILLER.tr;
  if (d[anahtar] != null) return d[anahtar];
  if (DILLER.tr[anahtar] != null) return DILLER.tr[anahtar];
  return anahtar;
}

function sayiBicim(n) {
  return Number(n).toLocaleString(yereller[veri.dil] || "tr-TR");
}

// ======================================================================
//  SES SISTEMI  —  Web Audio API ile sentezlenir (ses dosyasi kullanmaz)
//  --------------------------------------------------------------------
//  Ince ayar: her sesin frekans / sure / seviye degerlerini buradan
//  degistirebilirsin. seviye 0-1 arasi; genel seviye "anaSeviye" ve
//  ayarlar menusundeki ses seviyesi ile carpilir.
// ======================================================================
const SES_AYAR = {
  anaSeviye: 0.5,   // tum seslerin ust sinir carpani (veri.ses ile carpilir)
  filtreHz: 3600,   // yumusaklik icin alcak-gecirgen suzgec kesimi (Hz)

  // Parca bosluga oturunca: kisa, tok, yumusak tik/pop
  koy:    { frekans: 340, bitis: 185, sure: 0.11, seviye: 0.60, dalga: "triangle" },
  // Yanlis yere birakinca: cok kisa, alcak, nazik "olmadi"
  olmadi: { frekans: 200, bitis: 150, sure: 0.13, seviye: 0.42, dalga: "sine" },
  // Blok patlayinca: yumusak dolgun "puf"; combo ile perdesi yukselir
  patla:  { frekans: 190, sure: 0.26, seviye: 0.50, perdeAdim: 55, pufHz: 640, pufAdim: 90 },
  // Combo x2+: patlamanin ustune binen kisa parlak ding; combo ile tizlesir
  combo:  { frekans: 880, sure: 0.20, seviye: 0.34, perdeAdim: 120 },
  // Butona basinca: cok kisa, notr tik
  tik:    { frekans: 420, sure: 0.045, seviye: 0.30, dalga: "sine" },
  // Bolum tamamlaninca: kisa, nese li, yukselen jingle
  kazan:  { notalar: [523, 659, 784, 1046], notaSure: 0.13, aralik: 0.09, seviye: 0.42, dalga: "triangle" },
  // Yeni bolume gecerken: kisa, "ileri" hissi veren yukselen gecis
  bolum:  { frekans: 300, bitis: 660, sure: 0.26, seviye: 0.40, dalga: "sine" },
  // Bolum kaybedilince: alcalan, kisa, yumusak
  kayip:  { notalar: [392, 311, 233], notaSure: 0.16, aralik: 0.10, seviye: 0.40, dalga: "sine" },
};

let sesCtx = null;
let sesFiltre = null;
let sesSeviyesi = veri.sesAcik ? veri.ses : 0;

function sesSeviyesiGuncelle() {
  sesSeviyesi = veri.sesAcik ? veri.ses : 0;
}

function sesBaglamHazir() {
  if (sesCtx) return true;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return false;
  sesCtx = new AC();
  sesFiltre = sesCtx.createBiquadFilter();
  sesFiltre.type = "lowpass";
  sesFiltre.frequency.value = SES_AYAR.filtreHz;
  sesFiltre.Q.value = 0.4;
  sesFiltre.connect(sesCtx.destination);
  return true;
}

// Ilk kullanici etkilesiminde audio context uyandirilir (tarayici kurali).
function sesUyandir() {
  if (!sesBaglamHazir()) return;
  if (sesCtx.state === "suspended") sesCtx.resume();
}
document.addEventListener("pointerdown", sesUyandir);
document.addEventListener("keydown", sesUyandir);

// Yumusak zarfli tek ton (tiklama/pop onlemek icin ustel rampa).
function sesNota(baslaT, frekans, sure, tepe, dalga, kayFrekans) {
  const osc = sesCtx.createOscillator();
  const g = sesCtx.createGain();
  osc.type = dalga || "sine";
  osc.frequency.setValueAtTime(frekans, baslaT);
  if (kayFrekans) osc.frequency.exponentialRampToValueAtTime(Math.max(1, kayFrekans), baslaT + sure);
  const zirve = Math.max(0.0002, tepe);
  g.gain.setValueAtTime(0.0001, baslaT);
  g.gain.exponentialRampToValueAtTime(zirve, baslaT + Math.min(0.012, sure * 0.3));
  g.gain.exponentialRampToValueAtTime(0.0001, baslaT + sure);
  osc.connect(g);
  g.connect(sesFiltre);
  osc.start(baslaT);
  osc.stop(baslaT + sure + 0.03);
}

// Yumusak "puf": kisa, alcak-gecirgen suzulmus, sonumlenen gurultu.
function sesPuf(baslaT, sure, tepe, kesimHz) {
  const n = Math.max(1, Math.floor(sesCtx.sampleRate * sure));
  const buf = sesCtx.createBuffer(1, n, sesCtx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
  const src = sesCtx.createBufferSource();
  src.buffer = buf;
  const lp = sesCtx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = kesimHz;
  lp.Q.value = 0.5;
  const g = sesCtx.createGain();
  g.gain.setValueAtTime(0.0001, baslaT);
  g.gain.exponentialRampToValueAtTime(Math.max(0.0002, tepe), baslaT + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, baslaT + sure);
  src.connect(lp);
  lp.connect(g);
  g.connect(sesFiltre);
  src.start(baslaT);
  src.stop(baslaT + sure + 0.02);
}

// Tek cagri noktasi. carpan = combo carpani (perde icin, varsayilan 1).
function sesCal(isim, carpan) {
  if (!veri.sesAcik || veri.ses <= 0) return;
  if (!sesBaglamHazir()) return;
  if (sesCtx.state === "suspended") sesCtx.resume();

  const A = SES_AYAR;
  const g0 = (veri.ses / 100) * A.anaSeviye;   // genel seviye carpani
  const t = sesCtx.currentTime + 0.001;
  const k = carpan || 1;

  if (isim === "koy") {
    sesNota(t, A.koy.frekans, A.koy.sure, g0 * A.koy.seviye, A.koy.dalga, A.koy.bitis);
  } else if (isim === "olmadi") {
    sesNota(t, A.olmadi.frekans, A.olmadi.sure, g0 * A.olmadi.seviye, A.olmadi.dalga, A.olmadi.bitis);
  } else if (isim === "patla") {
    const f = A.patla.frekans + (k - 1) * A.patla.perdeAdim;
    sesNota(t, f, A.patla.sure, g0 * A.patla.seviye, "sine", f * 0.6);
    sesPuf(t, A.patla.sure * 0.7, g0 * A.patla.seviye * 0.5, A.patla.pufHz + (k - 1) * A.patla.pufAdim);
  } else if (isim === "combo") {
    const f = A.combo.frekans + (k - 2) * A.combo.perdeAdim;
    sesNota(t, f, A.combo.sure, g0 * A.combo.seviye, "sine");
    sesNota(t + 0.04, f * 1.5, A.combo.sure * 0.8, g0 * A.combo.seviye * 0.7, "sine");
  } else if (isim === "tik") {
    sesNota(t, A.tik.frekans, A.tik.sure, g0 * A.tik.seviye, A.tik.dalga);
  } else if (isim === "kazan") {
    A.kazan.notalar.forEach(function (f, i) {
      sesNota(t + i * A.kazan.aralik, f, A.kazan.notaSure, g0 * A.kazan.seviye, A.kazan.dalga);
    });
  } else if (isim === "bolum") {
    sesNota(t, A.bolum.frekans, A.bolum.sure, g0 * A.bolum.seviye, A.bolum.dalga, A.bolum.bitis);
  } else if (isim === "kayip") {
    A.kayip.notalar.forEach(function (f, i) {
      sesNota(t + i * A.kayip.aralik, f, A.kayip.notaSure, g0 * A.kayip.seviye, A.kayip.dalga);
    });
  }
}

function animCarpan() {
  if (veri.animHiz === "hizli") return 0.5;
  if (veri.animHiz === "yavas") return 1.5;
  return 1;
}

const bolumRenkleri = [
  { sayfa: "#6f9fd8", tahta: "#456891" },
  { sayfa: "#8a76b8", tahta: "#5b4c80" },
  { sayfa: "#5fa3a0", tahta: "#3c6f6c" },
  { sayfa: "#7480c4", tahta: "#4c5588" },
  { sayfa: "#b07487", tahta: "#7d4859" },
  { sayfa: "#6faa78", tahta: "#487a51" },
];

function arkaPlanGuncelle() {
  const secim = bolumRenkleri[(bolum - 1) % bolumRenkleri.length];
  document.documentElement.style.setProperty("--sayfa-bg", secim.sayfa);
  document.documentElement.style.setProperty("--tahta-bg", secim.tahta);
}

// ======================================================================
//  ZORLUK AYARLARI  —  dengeyi buradan elle ayarlayabilirsin
//  Kademe tablolarinda: bolum <= "bolum" olan İLK satir secilir.
// ======================================================================
const ZORLUK = {
  // 1) Kullanilan renk sayisi
  renk: [
    { bolum: 2, deger: 3 },          // bolum 1-2
    { bolum: 5, deger: 4 },          // bolum 3-5
    { bolum: 9, deger: 5 },          // bolum 6-9
    { bolum: Infinity, deger: 6 },   // bolum 10+
  ],

  // 2) Bosluk sayisi: bolum 1'de "baslangic", her bolum "artis", "max"ta durur
  bosluk: { baslangic: 4, artis: 1, max: 14 },

  // 4) Fazladan hamle hakki
  ekstraHamle: [
    { bolum: 3, deger: 3 },          // bolum 1-3
    { bolum: 7, deger: 2 },          // bolum 4-7
    { bolum: Infinity, deger: 1 },   // bolum 8+
  ],

  // 5) Patlama esigi (kac ayni renk yan yana gelince patlar)
  esik: [
    { bolum: 4, deger: 3 },          // bolum 1-4
    { bolum: 11, deger: 4 },         // bolum 5-11
    { bolum: Infinity, deger: 5 },   // bolum 12+
  ],

  // 6) Combo penceresi (ms)
  comboSure: [
    { bolum: 4, deger: 2500 },       // bolum 1-4
    { bolum: 9, deger: 2000 },       // bolum 5-9
    { bolum: Infinity, deger: 1500 },// bolum 10+
  ],

  // 7) Puan carpani = puanTaban + bolum * puanEgim
  puanTaban: 1,
  puanEgim: 0.1,

  // 3) Sekil havuzu bu bolumlerden İTİBAREN genisler
  sekilOrtaBolum: 4,   // 4 kareli basit sekiller (I, kare) girer
  sekilZorBolum: 8,    // T / karmasik 4 kareli sekiller girer

  // EK) Panel zorluk etiketi (dil anahtari)
  etiket: [
    { bolum: 3, ad: "zor_kolay" },     // bolum 1-3
    { bolum: 7, ad: "zor_orta" },      // bolum 4-7
    { bolum: 11, ad: "zor_zor" },      // bolum 8-11
    { bolum: Infinity, ad: "zor_cokzor" }, // bolum 12+
  ],
};

// ======================================================================
//  MOD AYARLARI  —  her modun ince ayari buradan yapilir
// ======================================================================
const MOD_AYAR = {
  ters: {
    // Block Blast mantigi: renk/combo sisteminden bagimsiz, satir/sutun temizleme
    tepsiParca: 3,      // tepsideki sabit slot / parca sayisi
    tahtaBoyut: 8,      // NxN tahta
    blokPuan: 10,       // yerlestirilen her blok icin puan
    cizgiPuan: 800,     // temizlenen her cizgi (satir/sutun) icin puan
    renkSayisi: 6,      // gorsel renk cesitliligi (puana etkisi YOK)
    zorlukBolum: 5,     // sekil havuzu icin referans bolum
  },
  speedrun: {
    tabanSure: 6,       // her bolume taban saniye
    boslukCarpani: 1.6, // her bosluk basina eklenen saniye
    cimriEgim: 0.04,    // ilerledikce sure cimrilesir (bolum basina)
    enAzCimri: 0.5,     // cimrilik carpani bu degerin altina inmez
    enAzSure: 6,        // bir bolum en az bu kadar saniye alir
    uyariEsik: 10,      // altinda kirmizi + nabiz
  },
  gunluk: {
    zorlukBolum: 6,     // gunluk bulmacanin sabit zorluk seviyesi
  },
};

let mod = "klasik";     // "klasik" | "ters" | "speedrun" | "gunluk"

// Tohumlu rastgelelik (sadece gunluk modda kullanilir; aksi halde Math.random)
let rastgeleUretici = null;
function rastgele() {
  return rastgeleUretici ? rastgeleUretici() : Math.random();
}
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function tarihAnahtar(d) {
  return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
}
function dunAnahtar() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return tarihAnahtar(d);
}
function tarihTohum(d) {
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

// Kademeli sekil havuzlari
const sekilBasit = [                 // 2-3 kareli: duz cizgi ve basit L
  [[0,0],[0,1]],
  [[0,0],[1,0]],
  [[0,0],[0,1],[0,2]],
  [[0,0],[1,0],[2,0]],
  [[0,0],[0,1],[1,0]],
  [[0,0],[0,1],[1,1]],
  [[0,0],[1,0],[1,1]],
  [[0,1],[1,0],[1,1]],
];
const sekilOrta = [                  // 4 kareli duzenli: uzun cizgiler ve kare
  [[0,0],[0,1],[0,2],[0,3]],
  [[0,0],[1,0],[2,0],[3,0]],
  [[0,0],[0,1],[1,0],[1,1]],
];
const sekilZor = [                   // 4 kareli karmasik: T ve duzensiz formlar
  [[0,0],[0,1],[0,2],[1,1]],
  [[0,0],[1,0],[1,1],[1,2]],
  [[0,0],[0,1],[0,2],[1,0]],
  [[0,0],[1,0],[2,0],[2,1]],
];

function kademeSec(bolum, tablo) {
  for (const satir of tablo) {
    if (bolum <= satir.bolum) return satir;
  }
  return tablo[tablo.length - 1];
}

function bolumAyarlari(bolum) {
  let sekiller = sekilBasit.slice();
  if (bolum >= ZORLUK.sekilOrtaBolum) sekiller = sekiller.concat(sekilOrta);
  if (bolum >= ZORLUK.sekilZorBolum) sekiller = sekiller.concat(sekilZor);

  return {
    renkSayisi: kademeSec(bolum, ZORLUK.renk).deger,
    bosluk: Math.min(
      ZORLUK.bosluk.baslangic + (bolum - 1) * ZORLUK.bosluk.artis,
      ZORLUK.bosluk.max
    ),
    ekstraHamle: kademeSec(bolum, ZORLUK.ekstraHamle).deger,
    esik: kademeSec(bolum, ZORLUK.esik).deger,
    comboSure: kademeSec(bolum, ZORLUK.comboSure).deger,
    puanCarpani: ZORLUK.puanTaban + bolum * ZORLUK.puanEgim,
    sekiller: sekiller,
    zorluk: kademeSec(bolum, ZORLUK.etiket).ad,
  };
}

const ustBar = document.createElement("div");
ustBar.className = "ust-bar";
document.body.appendChild(ustBar);

const bolumKutu = document.createElement("div");
bolumKutu.className = "bolum-gosterge";
bolumKutu.innerHTML =
  '<div class="bolum-etiket" data-i18n="bolumEtiket">BÖLÜM</div>' +
  '<div class="bolum-sayi" id="bolumSayi">1</div>';
ustBar.appendChild(bolumKutu);

const bolumSayi = bolumKutu.querySelector("#bolumSayi");

const skorKutu = document.createElement("div");
skorKutu.className = "skor";
skorKutu.textContent = "0";
ustBar.appendChild(skorKutu);

const hamleKutu = document.createElement("div");
hamleKutu.className = "hamle";
hamleKutu.innerHTML =
  '<div class="hamle-etiket" data-i18n="hamleEtiket">HAMLE</div>' +
  '<div class="hamle-sayi" id="hamleSayi">0</div>';
ustBar.appendChild(hamleKutu);

const hamleSayi = hamleKutu.querySelector("#hamleSayi");

const tahta = document.querySelector(".tahta");

const comboCubuk = document.createElement("div");
comboCubuk.className = "combo-cubuk";
comboCubuk.innerHTML = '<div class="combo-dolgu" id="comboDolgu"></div>';
document.body.insertBefore(comboCubuk, tahta);

const comboDolgu = comboCubuk.querySelector("#comboDolgu");

const tepsi = document.createElement("div");
tepsi.className = "tepsi";
document.body.appendChild(tepsi);

const resetBtn = document.createElement("button");
resetBtn.className = "reset";
resetBtn.textContent = "\u21BB";
document.body.appendChild(resetBtn);

const kaplama = document.createElement("div");
kaplama.className = "kaplama";
kaplama.innerHTML =
  '<div class="panel" id="panel">' +
    '<div class="panel-baslik" id="panelBaslik">B\u00d6L\u00dcM TAMAM</div>' +
    '<div class="panel-alt" id="panelAlt"></div>' +
    '<div class="stat-satir"><span data-i18n="st_blok">Patlatt\u0131\u011f\u0131n blok</span><span id="statBlok">0</span></div>' +
    '<div class="stat-satir" id="statBonusSatir"><span data-i18n="st_bonus">Kalan hamle bonusu</span><span id="statBonus">0</span></div>' +
    '<div class="stat-satir"><span data-i18n="st_bolumPuan">B\u00f6l\u00fcm puan\u0131</span><span id="statBolum">0</span></div>' +
    '<div class="stat-satir" id="statEnYuksekSatir"><span data-i18n="st_enYuksek">En y\u00fcksek skor</span><span id="statEnYuksek">0</span></div>' +
    '<div class="stat-satir" id="statDevredenSatir" style="display:none"><span data-i18n="st_devreden">Devreden s\u00fcre</span><span id="statDevreden">0</span></div>' +
    '<div class="stat-satir toplam"><span data-i18n="st_toplam">Toplam puan</span><span id="statToplam">0</span></div>' +
    '<button class="devam-btn" id="devamBtn">SONRAK\u0130 B\u00d6L\u00dcM</button>' +
  '</div>';
document.body.appendChild(kaplama);

const panel = kaplama.querySelector("#panel");
const panelBaslik = kaplama.querySelector("#panelBaslik");
const panelAlt = kaplama.querySelector("#panelAlt");
const statBlok = kaplama.querySelector("#statBlok");
const statBonusSatir = kaplama.querySelector("#statBonusSatir");
const statBonus = kaplama.querySelector("#statBonus");
const statBolum = kaplama.querySelector("#statBolum");
const statEnYuksek = kaplama.querySelector("#statEnYuksek");
const statEnYuksekSatir = kaplama.querySelector("#statEnYuksekSatir");
const statDevredenSatir = kaplama.querySelector("#statDevredenSatir");
const statDevreden = kaplama.querySelector("#statDevreden");
const statToplam = kaplama.querySelector("#statToplam");
const devamBtn = kaplama.querySelector("#devamBtn");

function bolumKaydet() {
  veri.bolum = bolum;
  veriKaydet();
}

let skor = 0;
let bolum = veri.bolum;
let bolumPuan = 0;
let bolumBlok = 0;
let aktifAyar = bolumAyarlari(bolum);
let hamle = 0;
let baslangicHamle = 0;     // bolum basi hamle (kullanilan hamle hesabi icin)
let kayipMi = false;
let bitisBekliyor = false;
let comboCarpan = 1;
let comboZaman = null;
let suruklenen = null;
let ofsetX = 0;
let ofsetY = 0;
let miknatisAdaylar = [];
let miknatisGrup = null;

// Panel yonetimi ve duraklatma durumu
let acikPanel = null;       // "ayarlar" | "nasil" | "ist" | "duraklat" | null
let duraklatildiMi = false;
let oturumRekoru = veri.enYuksek;   // bu oturum baslarken kayitli rekor
let rekorEfektiCikti = false;

function oyunKilitli() {
  return duraklatildiMi || acikPanel !== null;
}

function menudeMi() {
  return !giris.classList.contains("kapali");
}

function oyunSonuMu() {
  return kaplama.classList.contains("acik") ||
    (typeof sonKaplama !== "undefined" && sonKaplama && sonKaplama.classList.contains("acik"));
}

function imzaCikar(koordinatlar) {
  let minR = Infinity;
  let minC = Infinity;
  koordinatlar.forEach(function (k) {
    if (k[0] < minR) minR = k[0];
    if (k[1] < minC) minC = k[1];
  });
  return koordinatlar
    .map(function (k) { return (k[0] - minR) + "," + (k[1] - minC); })
    .sort()
    .join("|");
}

function hamleGuncelle() {
  hamleSayi.textContent = String(hamle);
  if (hamle <= 2) {
    hamleKutu.classList.add("az");
  } else {
    hamleKutu.classList.remove("az");
  }
  hamleKutu.classList.remove("azaldi");
  void hamleKutu.offsetWidth;
  hamleKutu.classList.add("azaldi");
}

function bolumGoster(zipla) {
  bolumSayi.textContent = String(bolum);
  if (zipla) {
    bolumKutu.classList.remove("zipla");
    void bolumKutu.offsetWidth;
    bolumKutu.classList.add("zipla");
  }
}

function skorEkle(miktar) {
  skor += miktar;
  bolumPuan += miktar;
  if (miktar > 0) veri.ist.toplamPuan += miktar;
  skorKutu.textContent = sayiBicim(skor);
  skorKutu.classList.remove("artti");
  void skorKutu.offsetWidth;
  skorKutu.classList.add("artti");
  enYuksekYaz();
}

function enYuksekOku() {
  return veri.enYuksek;
}

function rekorEfekt() {
  // Oturum basindaki rekoru asinca bir kez "YENI REKOR" efekti
  if (oturumRekoru > 0 && !rekorEfektiCikti) {
    rekorEfektiCikti = true;
    yeniRekorEfekti();
  }
}

function enYuksekYaz() {
  // Skor rekoru sadece Klasik ve Ters modda tutulur (ayri kayitlar)
  if (mod === "klasik") {
    if (skor > veri.enYuksek) { veri.enYuksek = skor; veriKaydet(); rekorEfekt(); }
  } else if (mod === "ters") {
    if (skor > veri.tersEnYuksek) { veri.tersEnYuksek = skor; veriKaydet(); rekorEfekt(); }
  }
}

function puanPop(hucreler, miktar, renk) {
  let x = 0;
  let y = 0;
  hucreler.forEach(function (h) {
    const kutu = kareDizi[h].getBoundingClientRect();
    x += kutu.left + kutu.width / 2;
    y += kutu.top + kutu.height / 2;
  });
  x = x / hucreler.length;
  y = y / hucreler.length;

  const sure = POP_SURE * animCarpan();
  const pop = document.createElement("div");
  pop.className = "puan-pop";
  pop.textContent = "+" + sayiBicim(miktar);
  pop.style.left = x + "px";
  pop.style.top = y + "px";
  pop.style.color = renk;
  pop.style.animationDuration = sure + "ms";
  document.body.appendChild(pop);

  setTimeout(function () {
    pop.remove();
  }, sure);
}

function yeniRekorEfekti() {
  const el = document.createElement("div");
  el.className = "rekor-pop";
  el.textContent = metin("yeniRekor");
  document.body.appendChild(el);
  setTimeout(function () {
    el.remove();
  }, 1800);
}

function sarsIt() {
  if (!veri.sarsinti) return;
  document.body.classList.remove("sarsil");
  void document.body.offsetWidth;
  document.body.classList.add("sarsil");
}

function comboRenk(carpan) {
  if (carpan === 2) return "#3b82f6";
  if (carpan === 3) return "#a855f7";
  if (carpan === 4) return "#f97316";
  if (carpan === 5) return "#ef4444";
  return "#fbbf24";
}

function comboYaziGoster(carpan) {
  const renk = comboRenk(carpan);
  const guc = Math.min(carpan, 7);

  const yazi = document.createElement("div");
  yazi.className = "combo-yazi";
  yazi.textContent = "COMBO x" + carpan;
  yazi.style.color = renk;
  yazi.style.fontSize = Math.min(18 + guc * 6, 60) + "px";
  yazi.style.letterSpacing = (0.5 + guc * 0.25) + "px";
  yazi.style.setProperty("-webkit-text-stroke", Math.min(1 + guc * 0.25, 3) + "px rgba(0, 0, 0, 0.85)");
  yazi.style.textShadow =
    "0 0 " + (3 + guc * 3) + "px " + renk + ", " +
    "0 0 " + (8 + guc * 6) + "px " + renk + ", " +
    "0 3px 8px rgba(0, 0, 0, 0.45)";
  document.body.appendChild(yazi);

  setTimeout(function () {
    yazi.remove();
  }, 1500);
}

function comboCubukBaslat() {
  comboCubuk.style.setProperty("--parlak", String(comboCarpan - 1));
  comboCubuk.classList.add("acik");
  comboDolgu.classList.remove("akiyor");
  void comboDolgu.offsetWidth;
  comboDolgu.style.animationDuration = aktifAyar.comboSure + "ms";
  comboDolgu.classList.add("akiyor");
}

function comboSifirla() {
  if (comboZaman) clearTimeout(comboZaman);
  comboZaman = null;
  comboCarpan = 1;
  comboCubuk.classList.remove("acik");
  comboDolgu.classList.remove("akiyor");
}

function comboArttir() {
  if (comboZaman) {
    clearTimeout(comboZaman);
    comboCarpan++;
  } else {
    comboCarpan = 1;
  }

  comboZaman = setTimeout(comboSifirla, aktifAyar.comboSure);
  comboCubukBaslat();
  if (comboCarpan >= 2) {
    comboYaziGoster(comboCarpan);
    sarsIt();
  }

  if (comboCarpan > veri.ist.enYuksekCombo) veri.ist.enYuksekCombo = comboCarpan;

  return comboCarpan;
}

function komsular(index) {
  const satir = Math.floor(index / 8);
  const sutun = index % 8;
  const liste = [];
  if (satir > 0) liste.push(index - 8);
  if (satir < 7) liste.push(index + 8);
  if (sutun > 0) liste.push(index - 1);
  if (sutun < 7) liste.push(index + 1);
  return liste;
}

function sekilHucreleri(sekil, satir, sutun) {
  const hucreler = [];
  for (const kayma of sekil) {
    const r = satir + kayma[0];
    const c = sutun + kayma[1];
    if (r < 0 || r > 7 || c < 0 || c > 7) return null;
    hucreler.push(r * 8 + c);
  }
  return hucreler;
}

function karistir(dizi) {
  const kopya = dizi.slice();
  for (let i = kopya.length - 1; i > 0; i--) {
    const j = Math.floor(rastgele() * (i + 1));
    const gecici = kopya[i];
    kopya[i] = kopya[j];
    kopya[j] = gecici;
  }
  return kopya;
}

function genisletmeAdaylari(hucreler, ihtiyac) {
  const bolge = new Set(hucreler);
  const secilen = [];
  let sinir = hucreler.slice();

  while (secilen.length < ihtiyac && sinir.length > 0) {
    const yeniSinir = [];
    const adaylar = [];

    sinir.forEach(function (h) {
      komsular(h).forEach(function (k) {
        if (bolge.has(k)) return;
        if (kareDizi[k].dataset.durum !== "dolu") return;
        if (kareDizi[k].dataset.rezerve !== "") return;
        if (adaylar.indexOf(k) === -1) adaylar.push(k);
      });
    });

    if (adaylar.length === 0) break;

    karistir(adaylar).forEach(function (k) {
      if (secilen.length >= ihtiyac) return;
      bolge.add(k);
      // (karistir rastgele() kullanir -> gunluk modda deterministik)
      secilen.push(k);
      yeniSinir.push(k);
    });

    sinir = yeniSinir;
  }

  if (secilen.length < ihtiyac) return null;

  const dokunanVar = secilen.some(function (k) {
    return komsular(k).some(function (n) { return hucreler.includes(n); });
  });
  if (!dokunanVar) return null;

  return secilen;
}

function korumali(h) {
  const rez = kareDizi[h].dataset.rezerve;
  if (!rez) return false;
  return kareDizi.some(function (k) {
    return k.dataset.durum === "bos" && k.dataset.grup === rez;
  });
}

function yeniOyun() {
  bolumPuan = 0;
  bolumBlok = 0;
  kayipMi = false;
  bitisBekliyor = false;
  comboSifirla();

  if (mod === "ters") { tersYeniOyun(); return; }

  arkaPlanGuncelle();

  // Gunluk mod: tarihe gore tohumlu, herkese ayni tahta
  rastgeleUretici = (mod === "gunluk") ? mulberry32(tarihTohum(new Date())) : null;

  aktifAyar = bolumAyarlari(bolum);
  bolumGoster(false);
  const aktifRenkler = renkler.slice(0, aktifAyar.renkSayisi);
  const sekiller = aktifAyar.sekiller;

  kareDizi.forEach(function (kare) {
    const renk = aktifRenkler[Math.floor(rastgele() * aktifRenkler.length)];
    kare.style.background = renk;
    kare.style.color = renk;
    kare.style.boxShadow = "";
    kare.style.transform = "";
    kare.style.opacity = "";
    kare.classList.remove("patla");
    kare.dataset.renk = renk;
    kare.dataset.sembol = renkSembol[renk] || "";
    kare.dataset.durum = "dolu";
    kare.dataset.grup = "";
    kare.dataset.hedefRenk = "";
    kare.dataset.rezerve = "";
  });

  tepsi.innerHTML = "";

  const parcalar = [];
  let eklenen = 0;
  let deneme = 0;

  while (eklenen < aktifAyar.bosluk && deneme < 3000) {
    deneme++;
    const sekil = sekiller[Math.floor(rastgele() * sekiller.length)];
    const satir = Math.floor(rastgele() * 8);
    const sutun = Math.floor(rastgele() * 8);
    const hucreler = sekilHucreleri(sekil, satir, sutun);
    if (!hucreler) continue;

    const uygun = hucreler.every(function (h) {
      if (kareDizi[h].dataset.durum !== "dolu") return false;
      if (kareDizi[h].dataset.rezerve !== "") return false;
      return komsular(h).every(function (k) {
        if (hucreler.includes(k)) return true;
        return kareDizi[k].dataset.durum === "dolu" && kareDizi[k].dataset.rezerve === "";
      });
    });
    if (!uygun) continue;

    let ihtiyac = aktifAyar.esik - hucreler.length;
    if (ihtiyac < 1) ihtiyac = 1;

    const ekstra = genisletmeAdaylari(hucreler, ihtiyac);
    if (!ekstra) continue;

    const renk = aktifRenkler[Math.floor(rastgele() * aktifRenkler.length)];
    const grup = String(eklenen);

    ekstra.forEach(function (k) {
      kareDizi[k].style.background = renk;
      kareDizi[k].style.color = renk;
      kareDizi[k].dataset.renk = renk;
      kareDizi[k].dataset.sembol = renkSembol[renk] || "";
      kareDizi[k].dataset.rezerve = grup;
    });

    hucreler.forEach(function (h) {
      kareDizi[h].style.background = "transparent";
      kareDizi[h].style.color = "transparent";
      kareDizi[h].style.boxShadow = "inset 0 0 0 2px #60a5fa";
      kareDizi[h].dataset.durum = "bos";
      kareDizi[h].dataset.sembol = "";
      kareDizi[h].dataset.grup = grup;
      kareDizi[h].dataset.hedefRenk = renk;
      kareDizi[h].dataset.rezerve = grup;
    });

    parcalar.push({ sekil: sekil, renk: renk });
    eklenen++;
  }

  hamle = eklenen + aktifAyar.ekstraHamle;
  if (hamle < eklenen) hamle = eklenen;   // toplam hamle bosluk sayisinin altina dusmesin
  if (mod === "speedrun") hamle = eklenen + 999;  // speedrun: hamle degil sure sinirlar
  baslangicHamle = hamle;
  hamleGuncelle();

  karistir(parcalar).forEach(function (p) {
    parcaEkle(p.sekil, p.renk);
  });

  rastgeleUretici = null;   // tohumlu uretimi kapat (diger sistemler Math.random)
}

function parcaYap(sekil, renk) {
  let maxR = 0, maxC = 0;
  sekil.forEach(function (kayma) {
    if (kayma[0] > maxR) maxR = kayma[0];
    if (kayma[1] > maxC) maxC = kayma[1];
  });

  const parca = document.createElement("div");
  parca.className = "parca";
  parca.style.gap = MINI_ARA + "px";
  parca.style.gridTemplateColumns = "repeat(" + (maxC + 1) + ", " + MINI + "px)";
  parca.style.gridTemplateRows = "repeat(" + (maxR + 1) + ", " + MINI + "px)";

  for (let r = 0; r <= maxR; r++) {
    for (let c = 0; c <= maxC; c++) {
      const mini = document.createElement("div");
      const buradaVar = sekil.some(function (kayma) {
        return kayma[0] === r && kayma[1] === c;
      });
      if (buradaVar) {
        mini.className = "mini";
        mini.style.background = renk;
        mini.dataset.sembol = renkSembol[renk] || "";
      }
      parca.appendChild(mini);
    }
  }

  parca.dataset.renk = renk;
  parca.dataset.imza = imzaCikar(sekil);
  parca.dataset.sekil = JSON.stringify(sekil);   // serbest yerlestirme icin

  parca.addEventListener("pointerdown", function (olay) {
    if (kayipMi || oyunKilitli()) return;
    olay.preventDefault();
    suruklenen = parca;
    tersSonHedef = null;
    miknatisAdaylar = (mod === "ters") ? [] : adaylariTopla(parca);

    const kutu = parca.getBoundingClientRect();
    ofsetX = olay.clientX - kutu.left;
    ofsetY = olay.clientY - kutu.top;

    parca.style.width = kutu.width + "px";
    parca.style.height = kutu.height + "px";
    parca.style.left = kutu.left + "px";
    parca.style.top = kutu.top + "px";
    parca.classList.add("suruklerken");
  });

  return { parca: parca, maxR: maxR, maxC: maxC };
}

function parcaEkle(sekil, renk) {
  const yapim = parcaYap(sekil, renk);
  const yuva = document.createElement("div");
  yuva.className = "yuva";
  yuva.style.width = ((yapim.maxC + 1) * MINI + yapim.maxC * MINI_ARA) + "px";
  yuva.style.height = ((yapim.maxR + 1) * MINI + yapim.maxR * MINI_ARA) + "px";
  yuva.appendChild(yapim.parca);
  tepsi.appendChild(yuva);
}

function adaylariTopla(parca) {
  const harita = {};

  kareDizi.forEach(function (k, idx) {
    if (k.dataset.durum !== "bos") return;
    if (k.dataset.hedefRenk !== parca.dataset.renk) return;
    if (!harita[k.dataset.grup]) harita[k.dataset.grup] = [];
    harita[k.dataset.grup].push(idx);
  });

  const liste = [];

  Object.keys(harita).forEach(function (grup) {
    const hucreler = harita[grup];
    const koordinatlar = hucreler.map(function (h) {
      return [Math.floor(h / 8), h % 8];
    });
    if (imzaCikar(koordinatlar) !== parca.dataset.imza) return;

    let minR = Infinity;
    let minC = Infinity;
    koordinatlar.forEach(function (k) {
      if (k[0] < minR) minR = k[0];
      if (k[1] < minC) minC = k[1];
    });

    liste.push({ grup: grup, bas: minR * 8 + minC, hucreler: hucreler });
  });

  return liste;
}

function miknatisBul(x, y) {
  let enIyi = null;
  let enYakin = MIKNATIS_MESAFE;

  miknatisAdaylar.forEach(function (aday) {
    const kutu = kareDizi[aday.bas].getBoundingClientRect();
    const dx = kutu.left - x;
    const dy = kutu.top - y;
    const uzaklik = Math.sqrt(dx * dx + dy * dy);
    if (uzaklik < enYakin) {
      enYakin = uzaklik;
      enIyi = aday;
    }
  });

  return enIyi;
}

function miknatisIsaretle(aday) {
  if (miknatisGrup === aday) return;

  if (miknatisGrup) {
    miknatisGrup.hucreler.forEach(function (h) {
      kareDizi[h].classList.remove("hedefte");
    });
  }

  miknatisGrup = aday;

  if (miknatisGrup) {
    miknatisGrup.hucreler.forEach(function (h) {
      kareDizi[h].classList.add("hedefte");
    });
  }
}

function miknatisTemizle() {
  miknatisIsaretle(null);
  miknatisAdaylar = [];
}

function grupYerlestir(grup, parca) {
  const renk = parca.dataset.renk;

  const hucreler = [];
  kareDizi.forEach(function (k, idx) {
    if (k.dataset.durum === "bos" && k.dataset.grup === grup) {
      hucreler.push(idx);
    }
  });
  if (hucreler.length === 0) return false;

  const koordinatlar = hucreler.map(function (h) {
    return [Math.floor(h / 8), h % 8];
  });
  if (imzaCikar(koordinatlar) !== parca.dataset.imza) return false;

  hucreler.forEach(function (h) {
    const k = kareDizi[h];
    k.style.background = renk;
    k.style.color = renk;
    k.style.boxShadow = "";
    k.dataset.renk = renk;
    k.dataset.sembol = renkSembol[renk] || "";
    k.dataset.durum = "dolu";
    k.dataset.grup = "";
    k.dataset.hedefRenk = "";
  });

  kareDizi.forEach(function (k) {
    if (k.dataset.rezerve === grup) k.dataset.rezerve = "";
  });

  parca.remove();
  sesCal("koy");
  patlamaKontrol(hucreler, renk);
  return true;
}

document.addEventListener("pointermove", function (olay) {
  if (!suruklenen) return;

  if (mod === "ters") { tersSurukle(olay); return; }

  const x = olay.clientX - ofsetX;
  const y = olay.clientY - ofsetY;
  const aday = miknatisBul(x, y);

  miknatisIsaretle(aday);

  if (aday) {
    const kutu = kareDizi[aday.bas].getBoundingClientRect();
    suruklenen.style.left = kutu.left + "px";
    suruklenen.style.top = kutu.top + "px";
    suruklenen.classList.add("yapisti");
  } else {
    suruklenen.style.left = x + "px";
    suruklenen.style.top = y + "px";
    suruklenen.classList.remove("yapisti");
  }
});

document.addEventListener("pointerup", function (olay) {
  if (!suruklenen) return;

  const parca = suruklenen;
  const yapisan = miknatisGrup;
  suruklenen = null;
  miknatisTemizle();

  parca.classList.remove("suruklerken");
  parca.classList.remove("yapisti");
  parca.style.left = "";
  parca.style.top = "";
  parca.style.width = "";
  parca.style.height = "";

  if (mod === "ters") { tersBirak(parca); return; }

  let basarili = false;

  if (yapisan) {
    basarili = grupYerlestir(yapisan.grup, parca);
  } else {
    const hedef = document.elementFromPoint(olay.clientX, olay.clientY);
    if (!hedef || !hedef.classList.contains("kare")) return;

    if (hedef.dataset.durum === "bos" && hedef.dataset.hedefRenk === parca.dataset.renk) {
      basarili = grupYerlestir(hedef.dataset.grup, parca);
    }
  }

  hamle--;
  hamleGuncelle();

  if (basarili) {
    bitisKontrol();
  } else {
    sesCal("olmadi");
    if (hamle <= 0 && (mod === "klasik" || mod === "gunluk")) kayipKontrol();
  }
});

function kalanParca() {
  return tepsi.querySelectorAll(".parca").length;
}

function bitisKontrol() {
  if (bitisBekliyor) return;
  if (kalanParca() === 0) {
    bitisBekliyor = true;
    setTimeout(bolumBitti, 1600);
    return;
  }
  if (hamle <= 0) kayipKontrol();
}

function kayipKontrol() {
  if (bitisBekliyor) return;
  if (kalanParca() === 0) return;
  bitisBekliyor = true;
  kayipMi = true;
  setTimeout(bolumKaybedildi, 900);
}

function panelAltYaz(sonEk) {
  panelAlt.innerHTML = metin("bolumKelime") + " " + bolum +
    ' <span class="zorluk-rozet">' + metin(aktifAyar.zorluk) + "</span>" + (sonEk || "");
}

function panelIstYaz() {
  statBonus.textContent = sayiBicim(Math.max(0, hamle) * HAMLE_BONUS);
  statBlok.textContent = sayiBicim(bolumBlok);
  statBolum.textContent = sayiBicim(bolumPuan);
  statEnYuksek.textContent = sayiBicim(veri.enYuksek);
  statToplam.textContent = sayiBicim(skor);
  statEnYuksekSatir.style.display = "";
  statDevredenSatir.style.display = "none";
}

function bolumBitti() {
  comboSifirla();

  if (mod === "gunluk") { gunlukBitti(); return; }
  if (mod === "speedrun") { speedBolumBitti(); return; }

  const kalanHamle = Math.max(0, hamle);
  const bonus = kalanHamle * HAMLE_BONUS;
  skorEkle(bonus);

  veri.ist.tamamlananBolum++;
  veriKaydet();

  panel.classList.remove("kayip");
  panelBaslik.textContent = metin("bolumTamam");
  panelAltYaz("");
  statBonusSatir.style.display = "";
  panelIstYaz();
  devamBtn.textContent = metin("sonrakiBolum");
  kaplama.classList.add("acik");
  sesCal("kazan");
}

function bolumKaybedildi() {
  comboSifirla();
  veriKaydet();
  panel.classList.add("kayip");
  panelBaslik.textContent = metin("basarisiz");
  panelAltYaz(" \u2014 " + metin("hamlenBitti"));
  statBonusSatir.style.display = "none";
  panelIstYaz();
  devamBtn.textContent = metin("tekrarDene");
  kaplama.classList.add("acik");
  sesCal("kayip");
}

devamBtn.addEventListener("click", function () {
  const ilerledi = !kayipMi;
  kaplama.classList.remove("acik");

  if (mod === "speedrun") {
    if (ilerledi) {
      bolum++;
      if (bolum > veri.speedEnBolum) { veri.speedEnBolum = bolum; veriKaydet(); }
      yeniOyun();
      bolumGoster(true);
      sesCal("bolum");
      speedBaslat(speedBolumSure());   // yeni bolum suresi devreden sureye eklenir
    }
    return;
  }

  if (kayipMi) {
    skor -= bolumPuan;
    if (skor < 0) skor = 0;
    skorKutu.textContent = sayiBicim(skor);
  } else {
    bolum++;
    bolumKaydet();
  }
  yeniOyun();
  if (ilerledi) {
    bolumGoster(true);
    sesCal("bolum");
  }
});

function ayniRenkGrubu(baslangic, renk) {
  const grup = new Set();
  const yigin = [baslangic];
  while (yigin.length > 0) {
    const h = yigin.pop();
    if (grup.has(h)) continue;
    if (kareDizi[h].dataset.durum !== "dolu") continue;
    if (kareDizi[h].dataset.renk !== renk) continue;
    grup.add(h);
    komsular(h).forEach(function (k) {
      if (!grup.has(k)) yigin.push(k);
    });
  }
  return grup;
}

function patlat(sirali) {
  const carpan = animCarpan();
  const ADIM = ADIM_SURE * carpan;
  const patlaSure = PATLA_SURE * carpan;
  sirali.forEach(function (h, sira) {
    const kare = kareDizi[h];
    setTimeout(function () {
      kare.style.background = kare.dataset.renk;
      kare.style.animationDuration = patlaSure + "ms";
      kare.classList.add("patla");
      setTimeout(function () {
        kare.classList.remove("patla");
        kare.style.animationDuration = "";
        kare.style.background = "transparent";
        kare.style.color = "transparent";
        kare.style.boxShadow = "";
        kare.style.transform = "";
        kare.style.opacity = "";
        kare.dataset.durum = "temiz";
        kare.dataset.renk = "";
        kare.dataset.sembol = "";
        kare.dataset.rezerve = "";
      }, patlaSure);
    }, sira * ADIM);
  });
}

function patlamaKontrol(dolanlar, renk) {
  const patlayacak = new Set();

  dolanlar.forEach(function (h) {
    const grup = ayniRenkGrubu(h, renk);
    if (grup.size >= aktifAyar.esik) {
      grup.forEach(function (g) {
        if (!korumali(g)) patlayacak.add(g);
      });
    }
  });

  const patladi = patlayacak.size > 0;   // gercek patlama mi (esik tuttu mu)

  if (patlayacak.size === 0) {
    dolanlar.forEach(function (h) { patlayacak.add(h); });
  }

  const merkez = dolanlar[0];
  const mr = Math.floor(merkez / 8);
  const mc = merkez % 8;

  const sirali = Array.from(patlayacak).sort(function (a, b) {
    const da = Math.abs(Math.floor(a / 8) - mr) + Math.abs((a % 8) - mc);
    const db = Math.abs(Math.floor(b / 8) - mr) + Math.abs((b % 8) - mc);
    return da - db;
  });

  const carpan = comboArttir();
  const kazanilan = Math.round(sirali.length * (puanlar[renk] || 200) * carpan * aktifAyar.puanCarpani);
  bolumBlok += sirali.length;
  veri.ist.toplamBlok += sirali.length;
  puanPop(sirali, kazanilan, renk);
  skorEkle(kazanilan);
  if (patladi) {
    sesCal("patla", carpan);
    if (carpan >= 2) sesCal("combo", carpan);
  }
  patlat(sirali);
}

function bolumuSifirla() {
  sesCal("tik");
  kaplama.classList.remove("acik");
  sonKapat();
  speedDur();
  if (mod === "klasik") {
    skor = 0;
    bolum = 1;
    bolumKaydet();
    oturumRekoru = veri.enYuksek;
    rekorEfektiCikti = false;
    skorKutu.textContent = sayiBicim(0);
    yeniOyun();
  } else {
    // Diger modlar: modu bastan baslat (speedrun sureyi de sifirlar)
    modBaslat(mod);
  }
}

resetBtn.addEventListener("click", bolumuSifirla);

// ======================================================================
//  GIRIS EKRANI
// ======================================================================
const giris = document.createElement("div");
giris.className = "giris";

const girisBaslik = document.createElement("div");
girisBaslik.className = "giris-baslik";

const KELIME = "SNAPBURST";
const harfRenkleri = ["red", "orange", "yellow", "green", "blue", "purple", "red", "orange", "yellow"];
for (let i = 0; i < KELIME.length; i++) {
  const harf = document.createElement("span");
  harf.className = "giris-harf";
  harf.textContent = KELIME[i];
  harf.style.background = harfRenkleri[i % harfRenkleri.length];
  harf.style.animationDelay = (i * 0.07) + "s";
  girisBaslik.appendChild(harf);
}

const basBtn = document.createElement("button");
basBtn.className = "devam-btn giris-btn";
basBtn.dataset.i18n = "basla";
basBtn.textContent = "BAŞLA";

const girisMenu = document.createElement("div");
girisMenu.className = "giris-menu";
const gAyarBtn = document.createElement("button");
gAyarBtn.className = "devam-btn mini-btn";
gAyarBtn.dataset.i18n = "ayarlar";
const gNasilBtn = document.createElement("button");
gNasilBtn.className = "devam-btn mini-btn";
gNasilBtn.dataset.i18n = "nasilOynanir";
const gIstBtn = document.createElement("button");
gIstBtn.className = "devam-btn mini-btn";
gIstBtn.dataset.i18n = "istatistikler";
girisMenu.append(gAyarBtn, gNasilBtn, gIstBtn);

const girisBolum = document.createElement("div");
girisBolum.className = "giris-bolum";

const girisSkor = document.createElement("div");
girisSkor.className = "giris-skor";

function girisBolumGuncelle() {
  girisBolum.textContent = metin("bolumKelime") + " " + bolum;
}

function girisSkorGuncelle() {
  girisSkor.textContent = metin("enYuksekSkor") + ": " + sayiBicim(veri.enYuksek);
}

giris.append(girisBaslik, basBtn, girisMenu, girisBolum, girisSkor);
document.body.appendChild(giris);

// Ana menude bir yere tiklayinca tik sesi (butonlar dahil, tek dinleyici).
giris.addEventListener("pointerdown", function () {
  sesCal("tik");
});

basBtn.addEventListener("click", function () {
  modBaslat("klasik");
});

// ======================================================================
//  UST DUGMELER (yenile / ana menu / ayarlar)
// ======================================================================
const menuBtn = document.createElement("button");
menuBtn.className = "reset";
menuBtn.textContent = "⌂";

const ayarBtn = document.createElement("button");
ayarBtn.className = "reset";
ayarBtn.textContent = "⚙";

const dugmeSatir = document.createElement("div");
dugmeSatir.className = "dugme-satir";
document.body.insertBefore(dugmeSatir, resetBtn);
dugmeSatir.append(resetBtn, menuBtn, ayarBtn);

function anaMenuyeDon() {
  // Ilerleme (bolum, skor, zorluk) korunur; yarim kalan bolum tekrar
  // BASLA'ya basilinca yeniOyun() ile bastan kurulur.
  sesCal("tik");
  comboSifirla();
  speedDur();
  clearTimeout(tersKontrolZaman);
  sonKapat();
  kaplama.classList.remove("acik");
  duraklatildiMi = false;
  panelKapat();
  suruklenen = null;
  miknatisTemizle();
  if (typeof tersOnizlemeTemizle === "function") tersOnizlemeTemizle();
  kayipMi = false;
  bitisBekliyor = false;
  girisSkorGuncelle();
  girisBolumGuncelle();
  girisSeriGuncelle();
  giris.classList.remove("kapali");
}

menuBtn.addEventListener("click", anaMenuyeDon);
ayarBtn.addEventListener("click", function () { ayarlarAc(); });

// ======================================================================
//  ORTAK PANEL ALTYAPISI
// ======================================================================
function modalOlustur(icHTML) {
  const k = document.createElement("div");
  k.className = "kaplama modal-ust";
  k.innerHTML = '<div class="panel modal-panel">' + icHTML + "</div>";
  document.body.appendChild(k);
  return k;
}

// ---- Ayarlar paneli ----
const ayarKaplama = modalOlustur(
  '<div class="panel-baslik" data-i18n="ayarlarBaslik">AYARLAR</div>' +
  '<div class="ayar-liste">' +
    '<div class="ayar-satir"><span data-i18n="ayar_dil">Dil</span>' +
      '<div class="secim-grup" id="dilGrup">' +
        '<button data-deger="tr">Türkçe</button>' +
        '<button data-deger="en">English</button>' +
        '<button data-deger="es">Español</button>' +
      '</div></div>' +
    '<div class="ayar-satir"><span data-i18n="ayar_ses">Ses seviyesi</span>' +
      '<div class="ses-kontrol">' +
        '<button class="toggle-btn" id="sesToggle"></button>' +
        '<input type="range" min="0" max="100" id="sesSlider">' +
        '<span class="ses-deger" id="sesDeger">0</span>' +
      '</div></div>' +
    '<div class="ayar-satir"><span data-i18n="ayar_anim">Animasyon hızı</span>' +
      '<div class="secim-grup" id="animGrup">' +
        '<button data-deger="yavas" data-i18n="anim_yavas">Yavaş</button>' +
        '<button data-deger="normal" data-i18n="anim_normal">Normal</button>' +
        '<button data-deger="hizli" data-i18n="anim_hizli">Hızlı</button>' +
      '</div></div>' +
    '<div class="ayar-satir"><span data-i18n="ayar_sarsinti">Ekran sarsıntısı</span>' +
      '<button class="toggle-btn" id="sarsintiToggle"></button></div>' +
    '<div class="ayar-satir"><span data-i18n="ayar_renkKor">Renk körlüğü modu</span>' +
      '<button class="toggle-btn" id="renkKorToggle"></button></div>' +
  '</div>' +
  '<button class="devam-btn tehlike-btn" id="sifirlaBtn">İlerlemeyi sıfırla</button>' +
  '<button class="devam-btn kapat-btn" id="ayarKapatBtn" data-i18n="kapat">KAPAT</button>'
);

const dilGrup = ayarKaplama.querySelector("#dilGrup");
const animGrup = ayarKaplama.querySelector("#animGrup");
const sesSlider = ayarKaplama.querySelector("#sesSlider");
const sesDeger = ayarKaplama.querySelector("#sesDeger");
const sesToggle = ayarKaplama.querySelector("#sesToggle");
const sarsintiToggle = ayarKaplama.querySelector("#sarsintiToggle");
const renkKorToggle = ayarKaplama.querySelector("#renkKorToggle");
const sifirlaBtn = ayarKaplama.querySelector("#sifirlaBtn");
let sifirlaOnayDurum = false;

function toggleYaz(btn, acik) {
  btn.textContent = metin(acik ? "acikDurum" : "kapaliDurum");
  btn.classList.toggle("acik", acik);
}

function segSec(grup, deger) {
  grup.querySelectorAll("button").forEach(function (b) {
    b.classList.toggle("secili", b.dataset.deger === deger);
  });
}

function sifirlaBtnYaz() {
  sifirlaBtn.textContent = sifirlaOnayDurum ? metin("sifirlaOnay") : metin("ayar_sifirla");
  sifirlaBtn.classList.toggle("onayli", sifirlaOnayDurum);
}

function ayarUIGuncelle() {
  segSec(dilGrup, veri.dil);
  segSec(animGrup, veri.animHiz);
  sesSlider.value = veri.ses;
  sesDeger.textContent = veri.ses;
  toggleYaz(sesToggle, veri.sesAcik);
  toggleYaz(sarsintiToggle, veri.sarsinti);
  toggleYaz(renkKorToggle, veri.renkKorlugu);
  sifirlaOnayDurum = false;
  sifirlaBtnYaz();
}

dilGrup.querySelectorAll("button").forEach(function (b) {
  b.addEventListener("click", function () {
    veri.dil = b.dataset.deger;
    veriKaydet();
    dilUygula();
  });
});
animGrup.querySelectorAll("button").forEach(function (b) {
  b.addEventListener("click", function () {
    veri.animHiz = b.dataset.deger;
    veriKaydet();
    segSec(animGrup, veri.animHiz);
  });
});
sesSlider.addEventListener("input", function () {
  veri.ses = parseInt(sesSlider.value, 10);
  sesDeger.textContent = veri.ses;
  sesSeviyesiGuncelle();
});
sesSlider.addEventListener("change", veriKaydet);
sesToggle.addEventListener("click", function () {
  veri.sesAcik = !veri.sesAcik;
  toggleYaz(sesToggle, veri.sesAcik);
  sesSeviyesiGuncelle();
  veriKaydet();
});
sarsintiToggle.addEventListener("click", function () {
  veri.sarsinti = !veri.sarsinti;
  toggleYaz(sarsintiToggle, veri.sarsinti);
  veriKaydet();
});
renkKorToggle.addEventListener("click", function () {
  veri.renkKorlugu = !veri.renkKorlugu;
  toggleYaz(renkKorToggle, veri.renkKorlugu);
  bodyDurumGuncelle();
  veriKaydet();
});
sifirlaBtn.addEventListener("click", function () {
  if (!sifirlaOnayDurum) {
    sifirlaOnayDurum = true;
    sifirlaBtnYaz();
  } else {
    ilerlemeSifirla();
  }
});
ayarKaplama.querySelector("#ayarKapatBtn").addEventListener("click", panelKapat);

function ilerlemeSifirla() {
  veri.bolum = 1;
  veri.enYuksek = 0;
  veri.ist = derinKopya(VARSAYILAN.ist);
  veriKaydet();
  bolum = 1;
  skor = 0;
  oturumRekoru = 0;
  rekorEfektiCikti = false;
  skorKutu.textContent = sayiBicim(0);
  girisBolumGuncelle();
  girisSkorGuncelle();
  istGuncelle();
  duraklatildiMi = false;
  yeniOyun();
  panelKapat();
}

// ---- Nasil oynanir paneli ----
const nasilKaplama = modalOlustur(
  '<div class="panel-baslik" data-i18n="nasilBaslik">NASIL OYNANIR</div>' +
  '<div class="nasil-adimlar">' +
    '<div class="nasil-adim">' +
      '<div class="nasil-gorsel">' +
        '<span class="nb" style="background:red"></span>' +
        '<span class="nb" style="background:blue"></span>' +
        '<span class="nb bos"></span>' +
      '</div>' +
      '<div class="nasil-metin"><span class="nasil-no">1</span><span data-i18n="nasil1"></span></div>' +
    '</div>' +
    '<div class="nasil-adim">' +
      '<div class="nasil-gorsel">' +
        '<span class="nb" style="background:green"></span>' +
        '<span class="nasil-ok">→</span>' +
        '<span class="nb bos"></span>' +
      '</div>' +
      '<div class="nasil-metin"><span class="nasil-no">2</span><span data-i18n="nasil2"></span></div>' +
    '</div>' +
    '<div class="nasil-adim">' +
      '<div class="nasil-gorsel">' +
        '<span class="nb" style="background:gold"></span>' +
        '<span class="nb" style="background:gold"></span>' +
        '<span class="nb" style="background:gold"></span>' +
        '<span class="nasil-patla">★</span>' +
      '</div>' +
      '<div class="nasil-metin"><span class="nasil-no">3</span><span data-i18n="nasil3"></span></div>' +
    '</div>' +
    '<div class="nasil-adim">' +
      '<div class="nasil-gorsel"><span class="nasil-hamle">✋ 3</span></div>' +
      '<div class="nasil-metin"><span class="nasil-no">4</span><span data-i18n="nasil4"></span></div>' +
    '</div>' +
  '</div>' +
  '<div class="kisayol-kutu">' +
    '<div class="kisayol-baslik" data-i18n="kisayollar">Klavye kısayolları</div>' +
    '<div class="kisayol-satir"><kbd>ESC</kbd><span data-i18n="ks_esc"></span></div>' +
    '<div class="kisayol-satir"><kbd>R</kbd><span data-i18n="ks_r"></span></div>' +
    '<div class="kisayol-satir"><kbd>M</kbd><span data-i18n="ks_m"></span></div>' +
  '</div>' +
  '<button class="devam-btn kapat-btn" id="nasilKapatBtn" data-i18n="kapat">KAPAT</button>'
);
nasilKaplama.querySelector("#nasilKapatBtn").addEventListener("click", panelKapat);

// ---- Istatistik paneli ----
const istKaplama = modalOlustur(
  '<div class="panel-baslik" data-i18n="istBaslik">İSTATİSTİKLER</div>' +
  '<div class="stat-satir"><span data-i18n="ist_bolum"></span><span id="istBolum">0</span></div>' +
  '<div class="stat-satir"><span data-i18n="ist_blok"></span><span id="istBlok">0</span></div>' +
  '<div class="stat-satir"><span data-i18n="ist_puan"></span><span id="istPuan">0</span></div>' +
  '<div class="stat-satir"><span data-i18n="ist_combo"></span><span id="istCombo">0</span></div>' +
  '<div class="stat-satir toplam"><span data-i18n="ist_oyun"></span><span id="istOyun">0</span></div>' +
  '<button class="devam-btn kapat-btn" id="istKapatBtn" data-i18n="kapat">KAPAT</button>'
);
const istBolum = istKaplama.querySelector("#istBolum");
const istBlok = istKaplama.querySelector("#istBlok");
const istPuan = istKaplama.querySelector("#istPuan");
const istCombo = istKaplama.querySelector("#istCombo");
const istOyun = istKaplama.querySelector("#istOyun");
istKaplama.querySelector("#istKapatBtn").addEventListener("click", panelKapat);

function istGuncelle() {
  istBolum.textContent = sayiBicim(veri.ist.tamamlananBolum);
  istBlok.textContent = sayiBicim(veri.ist.toplamBlok);
  istPuan.textContent = sayiBicim(veri.ist.toplamPuan);
  istCombo.textContent = "x" + veri.ist.enYuksekCombo;
  istOyun.textContent = sayiBicim(veri.ist.oyunSayisi);
}

// ---- Duraklat paneli ----
const duraklatKaplama = modalOlustur(
  '<div class="panel-baslik" data-i18n="duraklatildi">DURAKLATILDI</div>' +
  '<button class="devam-btn" id="devamEtBtn" data-i18n="devamEt">DEVAM ET</button>' +
  '<button class="devam-btn ikincil" id="duraklatAyarBtn" data-i18n="ayarlar">AYARLAR</button>' +
  '<button class="devam-btn ikincil" id="duraklatMenuBtn" data-i18n="anaMenu">ANA MENÜ</button>'
);
duraklatKaplama.querySelector("#devamEtBtn").addEventListener("click", devamEt);
duraklatKaplama.querySelector("#duraklatAyarBtn").addEventListener("click", function () { ayarlarAc(); });
duraklatKaplama.querySelector("#duraklatMenuBtn").addEventListener("click", anaMenuyeDon);

// ---- Panel yoneticisi (ayni anda tek panel) ----
const paneller = {
  ayarlar: ayarKaplama,
  nasil: nasilKaplama,
  ist: istKaplama,
  duraklat: duraklatKaplama,
};

function panelAc(ad) {
  Object.keys(paneller).forEach(function (k) {
    paneller[k].classList.toggle("acik", k === ad);
  });
  acikPanel = ad;
}

function panelKapat() {
  Object.keys(paneller).forEach(function (k) {
    paneller[k].classList.remove("acik");
  });
  acikPanel = null;
  // Oyun duraklatilmissa duraklat paneli geri gelsin
  if (duraklatildiMi) {
    paneller.duraklat.classList.add("acik");
    acikPanel = "duraklat";
  }
}

function ayarlarAc() { ayarUIGuncelle(); panelAc("ayarlar"); }
function nasilAc() { panelAc("nasil"); }
function istAc() { istGuncelle(); panelAc("ist"); }
function duraklat() { duraklatildiMi = true; panelAc("duraklat"); }
function devamEt() { duraklatildiMi = false; panelKapat(); }

gAyarBtn.addEventListener("click", ayarlarAc);
gNasilBtn.addEventListener("click", nasilAc);
gIstBtn.addEventListener("click", istAc);

// ======================================================================
//  MOD SISTEMI
// ======================================================================

// ---- Ust bar: mod-bazli gostergeler ----
const sureKutu = document.createElement("div");
sureKutu.className = "sure-gosterge";
sureKutu.innerHTML =
  '<div class="sure-etiket" data-i18n="sr_sure">SÜRE</div>' +
  '<div class="sure-deger" id="sureDeger">0</div>';
ustBar.appendChild(sureKutu);
const sureDeger = sureKutu.querySelector("#sureDeger");

const seriKutu = document.createElement("div");
seriKutu.className = "seri-gosterge";
seriKutu.innerHTML =
  '<span class="seri-alev">🔥</span><span class="seri-sayi" id="seriSayi">0</span>';
ustBar.appendChild(seriKutu);
const seriSayi = seriKutu.querySelector("#seriSayi");

const sureCubuk = document.createElement("div");
sureCubuk.className = "sure-cubuk";
sureCubuk.innerHTML = '<div class="sure-dolgu" id="sureDolgu"></div>';
document.body.insertBefore(sureCubuk, tahta);
const sureDolgu = sureCubuk.querySelector("#sureDolgu");

function seriGosterGuncelle() { seriSayi.textContent = String(veri.gunluk.seri); }

function modArayuzGuncelle() {
  const g = function (el, goster) { el.style.display = goster ? "" : "none"; };
  g(bolumKutu, mod === "klasik" || mod === "speedrun");
  g(hamleKutu, mod === "klasik" || mod === "gunluk");
  g(sureKutu, mod === "speedrun");
  g(sureCubuk, mod === "speedrun");
  g(seriKutu, mod === "gunluk");
  document.body.classList.toggle("mod-ters", mod === "ters");
  if (mod === "gunluk") seriGosterGuncelle();
}

// ---- SPEEDRUN: sure sistemi ----
let speedKalan = 0, speedBarMax = 1, speedGecen = 0, speedSonAn = 0, speedRaf = null;

function speedBolumSure() {
  const A = MOD_AYAR.speedrun;
  const bosluk = aktifAyar.bosluk || 4;
  const cimri = Math.max(A.enAzCimri, 1 - (bolum - 1) * A.cimriEgim);
  return Math.max(A.enAzSure, Math.round((A.tabanSure + bosluk * A.boslukCarpani) * cimri));
}

function speedBaslat(ekle) {
  speedKalan += ekle;          // devreden sure + yeni bolum suresi
  speedBarMax = speedKalan;
  if (!speedRaf) {
    speedSonAn = performance.now();
    speedRaf = requestAnimationFrame(speedDongu);
  }
  speedGosterGuncelle();
}

function speedDur() {
  if (speedRaf) cancelAnimationFrame(speedRaf);
  speedRaf = null;
}

function speedDongu(t) {
  const dt = (t - speedSonAn) / 1000;
  speedSonAn = t;
  const calisiyor = mod === "speedrun" && !duraklatildiMi && acikPanel === null &&
    !oyunSonuMu() && !menudeMi() && !bitisBekliyor;
  if (calisiyor) {
    speedKalan -= dt;
    speedGecen += dt;
    if (speedKalan <= 0) {
      speedKalan = 0;
      speedGosterGuncelle();
      speedDur();
      speedOyunBitti();
      return;
    }
  }
  speedGosterGuncelle();
  speedRaf = requestAnimationFrame(speedDongu);
}

function speedGosterGuncelle() {
  const s = Math.max(0, speedKalan);
  sureDeger.textContent = s < 10 ? s.toFixed(1) : String(Math.ceil(s));
  const oran = speedBarMax > 0 ? Math.max(0, Math.min(1, s / speedBarMax)) : 0;
  sureDolgu.style.width = (oran * 100) + "%";
  const uyari = s <= MOD_AYAR.speedrun.uyariEsik;
  sureKutu.classList.toggle("uyari", uyari);
  sureCubuk.classList.toggle("uyari", uyari);
}

function speedBolumBitti() {
  kayipMi = false;
  panel.classList.remove("kayip");
  panelBaslik.textContent = metin("bolumTamam");
  panelAltYaz("");
  statBonusSatir.style.display = "none";
  statEnYuksekSatir.style.display = "none";
  statDevredenSatir.style.display = "";
  statBlok.textContent = sayiBicim(bolumBlok);
  statBolum.textContent = sayiBicim(bolumPuan);
  statToplam.textContent = sayiBicim(skor);
  statDevreden.textContent = Math.ceil(speedKalan) + " s";
  devamBtn.textContent = metin("sonrakiBolum");
  kaplama.classList.add("acik");
  sesCal("kazan");
}

function speedOyunBitti() {
  bitisBekliyor = true;
  if (bolum > veri.speedEnBolum) { veri.speedEnBolum = bolum; veriKaydet(); }
  sesCal("kayip");
  sonucGoster({
    baslik: metin("oyunBitti"),
    kayip: true,
    satirlar: [
      [metin("sr_ulasilanBolum"), sayiBicim(bolum)],
      [metin("st_toplam"), sayiBicim(skor)],
      [metin("sr_toplamSure"), Math.round(speedGecen) + " s"],
      [metin("sr_enIyiBolum"), sayiBicim(veri.speedEnBolum)],
    ],
    btn1: { metin: metin("tekrar"), aksiyon: function () { sonKapat(); modBaslat("speedrun"); } },
    btn2: { metin: metin("anaMenu"), aksiyon: function () { sonKapat(); anaMenuyeDon(); } },
  });
}

// ---- TERS MOD ----
// ======================================================================
//  TERS MOD  —  Block Blast mantigi (renk/combo sisteminden BAGIMSIZ)
//  * Tahta bos baslar, tepside 3 sabit slot, serbest yerlestirme.
//  * Satir/sutun tamamen dolunca temizlenir (renk onemsiz).
//  * Combo = ayni hamlede temizlenen cizgi sayisi.
// ======================================================================
let tersSonHedef = null;
let tersOnizleme = [];
let tersKontrolZaman = null;
let tersTemizlenenCizgi = 0;

function tersN() { return MOD_AYAR.ters.tahtaBoyut; }

function tersYeniOyun() {
  bolum = 1;
  tersTemizlenenCizgi = 0;
  aktifAyar = {
    sekiller: bolumAyarlari(MOD_AYAR.ters.zorlukBolum).sekiller,
    zorluk: "zor_orta",
    bosluk: 0,
  };
  arkaPlanGuncelle();

  kareDizi.forEach(function (kare) {
    kare.classList.remove("patla");
    kare.style.background = "";
    kare.style.color = "";
    kare.style.boxShadow = "";
    kare.style.transform = "";
    kare.style.opacity = "";
    kare.style.animationDuration = "";
    kare.dataset.renk = "";
    kare.dataset.sembol = "";
    kare.dataset.durum = "temiz";
    kare.dataset.grup = "";
    kare.dataset.hedefRenk = "";
    kare.dataset.rezerve = "";
  });

  tepsi.innerHTML = "";
  hamle = 0;
  baslangicHamle = 0;
  tersTepsiDoldur();
}

// Sabit 3 slot; ucu de yerlestirilince yeni parti birlikte gelir.
function tersTepsiDoldur() {
  tepsi.innerHTML = "";
  const havuz = aktifAyar.sekiller;
  for (let i = 0; i < MOD_AYAR.ters.tepsiParca; i++) {
    const slot = document.createElement("div");
    slot.className = "ters-slot";
    const sekil = havuz[Math.floor(Math.random() * havuz.length)];
    const renk = renkler[Math.floor(Math.random() * MOD_AYAR.ters.renkSayisi)];
    slot.appendChild(parcaYap(sekil, renk).parca);
    tepsi.appendChild(slot);
  }
}

function tersHedefBul(px, py) {
  const N = tersN();
  const sekil = JSON.parse(suruklenen.dataset.sekil);
  const c0 = kareDizi[0].getBoundingClientRect();
  const stride = c0.width + 3;   // hucre + bosluk
  const col = Math.round((px - c0.left) / stride);
  const row = Math.round((py - c0.top) / stride);
  const hucreler = [];
  let gecerli = true;
  sekil.forEach(function (k) {
    const r = row + k[0], cc = col + k[1];
    if (r < 0 || r >= N || cc < 0 || cc >= N) { gecerli = false; hucreler.push(-1); return; }
    const idx = r * N + cc;
    hucreler.push(idx);
    if (kareDizi[idx].dataset.durum === "dolu") gecerli = false;
  });
  return { hucreler: hucreler, gecerli: gecerli };
}

function tersOnizlemeTemizle() {
  tersOnizleme.forEach(function (k) {
    k.classList.remove("onizleme", "onizleme-hata", "cizgi-vurgu");
    k.style.removeProperty("--onz");
  });
  tersOnizleme = [];
}

// Bu yerlestirme yapilirsa dolacak satir/sutunlarin hucrelerini dondurur.
function tersTamamlananCizgiler(yeni) {
  const N = tersN();
  const dolu = function (idx) {
    return kareDizi[idx].dataset.durum === "dolu" || yeni.indexOf(idx) !== -1;
  };
  const sonuc = new Set();
  for (let r = 0; r < N; r++) {
    let tam = true;
    for (let c = 0; c < N; c++) if (!dolu(r * N + c)) { tam = false; break; }
    if (tam) for (let c = 0; c < N; c++) sonuc.add(r * N + c);
  }
  for (let c = 0; c < N; c++) {
    let tam = true;
    for (let r = 0; r < N; r++) if (!dolu(r * N + c)) { tam = false; break; }
    if (tam) for (let r = 0; r < N; r++) sonuc.add(r * N + c);
  }
  return sonuc;
}

function tersSurukle(olay) {
  const x = olay.clientX - ofsetX;
  const y = olay.clientY - ofsetY;
  suruklenen.style.left = x + "px";
  suruklenen.style.top = y + "px";

  const hedef = tersHedefBul(x, y);
  tersOnizlemeTemizle();

  hedef.hucreler.forEach(function (idx) {
    if (idx < 0) return;
    const k = kareDizi[idx];
    if (hedef.gecerli) {
      k.style.setProperty("--onz", suruklenen.dataset.renk);
      k.classList.add("onizleme");
    } else {
      k.classList.add("onizleme-hata");
    }
    tersOnizleme.push(k);
  });

  // Gecerliyse, bu hamleyle tamamlanacak satir/sutunlari vurgula
  if (hedef.gecerli) {
    const vurgu = tersTamamlananCizgiler(hedef.hucreler);
    vurgu.forEach(function (idx) {
      kareDizi[idx].classList.add("cizgi-vurgu");
      if (tersOnizleme.indexOf(kareDizi[idx]) === -1) tersOnizleme.push(kareDizi[idx]);
    });
  }

  tersSonHedef = hedef.gecerli ? hedef.hucreler : null;
}

function tersBirak(parca) {
  const hedef = tersSonHedef;
  tersOnizlemeTemizle();
  tersSonHedef = null;
  if (hedef) {
    tersYerlestir(parca, hedef);
  } else {
    sesCal("olmadi");   // parca yuvasina geri doner (slot sabit kalir)
  }
}

function tersYerlestir(parca, hucreler) {
  const renk = parca.dataset.renk;
  hucreler.forEach(function (idx) {
    const k = kareDizi[idx];
    k.style.background = renk;
    k.style.color = renk;
    k.style.boxShadow = "";
    k.dataset.renk = renk;
    k.dataset.sembol = renkSembol[renk] || "";
    k.dataset.durum = "dolu";
    k.dataset.grup = "";
    k.dataset.hedefRenk = "";
    k.dataset.rezerve = "";
  });
  parca.remove();
  sesCal("koy");

  // 1) Yerlestirilen blok puani (renkten bagimsiz)
  skorEkle(hucreler.length * MOD_AYAR.ters.blokPuan);

  // 2) Satir/sutun temizleme (asil mekanik)
  const temizlenenHucre = tersCizgiTemizle();

  // 3) Ucu de bitince yeni parti birlikte gelir
  if (kalanParca() === 0) tersTepsiDoldur();

  // 4) Animasyon bitince oyun sonu kontrolu
  const c = animCarpan();
  const bekle = temizlenenHucre > 0
    ? (temizlenenHucre * ADIM_SURE + PATLA_SURE + 200) * c
    : 60;
  clearTimeout(tersKontrolZaman);
  tersKontrolZaman = setTimeout(tersDurumKontrol, bekle);
}

// Dolu satir/sutunlari temizler; temizlenen hucre sayisini dondurur.
function tersCizgiTemizle() {
  const N = tersN();
  const temizle = new Set();
  let cizgiSayisi = 0;

  for (let r = 0; r < N; r++) {
    let tam = true;
    for (let c = 0; c < N; c++) if (kareDizi[r * N + c].dataset.durum !== "dolu") { tam = false; break; }
    if (tam) { cizgiSayisi++; for (let c = 0; c < N; c++) temizle.add(r * N + c); }
  }
  for (let c = 0; c < N; c++) {
    let tam = true;
    for (let r = 0; r < N; r++) if (kareDizi[r * N + c].dataset.durum !== "dolu") { tam = false; break; }
    if (tam) { cizgiSayisi++; for (let r = 0; r < N; r++) temizle.add(r * N + c); }
  }

  if (cizgiSayisi === 0) return 0;

  const hucreler = Array.from(temizle).sort(function (a, b) { return a - b; });
  tersTemizlenenCizgi += cizgiSayisi;
  veri.ist.toplamBlok += hucreler.length;

  // Combo = ayni hamledeki cizgi sayisi (zaman penceresi/zincir YOK)
  const kazanilan = MOD_AYAR.ters.cizgiPuan * cizgiSayisi * cizgiSayisi;
  puanPop(hucreler, kazanilan, "#fde047");
  skorEkle(kazanilan);
  if (cizgiSayisi >= 2) {
    comboYaziGoster(cizgiSayisi);
    sarsIt();
  }

  patlat(hucreler);   // mevcut dalga + neon animasyonu
  return hucreler.length;
}

function tersParcaSigarMi(sekil) {
  const N = tersN();
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      let ok = true;
      for (let i = 0; i < sekil.length; i++) {
        const r = row + sekil[i][0], cc = col + sekil[i][1];
        if (r < 0 || r >= N || cc < 0 || cc >= N) { ok = false; break; }
        if (kareDizi[r * N + cc].dataset.durum === "dolu") { ok = false; break; }
      }
      if (ok) return true;
    }
  }
  return false;
}

function tersDurumKontrol() {
  if (mod !== "ters") return;
  const parcalar = tepsi.querySelectorAll(".parca");
  if (parcalar.length === 0) { tersTepsiDoldur(); return; }
  let sigar = false;
  parcalar.forEach(function (p) {
    if (sigar) return;
    if (tersParcaSigarMi(JSON.parse(p.dataset.sekil))) sigar = true;
  });
  if (!sigar) tersOyunBitti();
}

function tersOyunBitti() {
  bitisBekliyor = true;
  if (skor > veri.tersEnYuksek) { veri.tersEnYuksek = skor; veriKaydet(); }
  sesCal("kayip");
  sonucGoster({
    baslik: metin("oyunBitti"),
    kayip: true,
    satirlar: [
      [metin("st_toplam"), sayiBicim(skor)],
      [metin("ters_cizgi"), sayiBicim(tersTemizlenenCizgi)],
      [metin("st_enYuksek"), sayiBicim(veri.tersEnYuksek)],
    ],
    btn1: { metin: metin("tekrar"), aksiyon: function () { sonKapat(); modBaslat("ters"); } },
    btn2: { metin: metin("anaMenu"), aksiyon: function () { sonKapat(); anaMenuyeDon(); } },
  });
}

// ---- GUNLUK MOD ----
function gunlukBugunOynandi() {
  return veri.gunluk.sonTarih === tarihAnahtar(new Date());
}

function geceYarisinaKalan() {
  const now = new Date();
  const yarin = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
  return Math.max(0, yarin - now);
}
function sureBicimSaat(ms) {
  const t = Math.floor(ms / 1000);
  const iki = function (n) { return (n < 10 ? "0" : "") + n; };
  return iki(Math.floor(t / 3600)) + ":" + iki(Math.floor(t / 60) % 60) + ":" + iki(t % 60);
}

function gunlukBitti() {
  const oncekiSon = veri.gunluk.sonTarih;
  const bugun = tarihAnahtar(new Date());
  let devam = false, artti = false;
  if (oncekiSon !== bugun) {
    devam = (oncekiSon === dunAnahtar());
    veri.gunluk.seri = devam ? (veri.gunluk.seri + 1) : 1;
    if (veri.gunluk.seri > veri.gunluk.enUzunSeri) veri.gunluk.enUzunSeri = veri.gunluk.seri;
    veri.gunluk.toplam += 1;
    veri.gunluk.sonTarih = bugun;
    veriKaydet();
    artti = true;
  }
  seriGosterGuncelle();
  girisSeriGuncelle();
  sesCal("kazan");
  const kullanilan = Math.max(0, baslangicHamle - Math.max(0, hamle));
  sonucGoster({
    baslik: metin("gunluk_bugunBitti"),
    ust: '<div class="seri-buyuk"><span class="seri-alev">🔥</span><span class="seri-sayi-b">' +
      veri.gunluk.seri + '</span></div>' +
      '<div class="seri-etiket">' + metin(devam ? "gunluk_seriArtti" : "gunluk_seriBasladi") + '</div>',
    satirlar: [
      [metin("gunluk_tarih"), bugun],
      [metin("gunluk_hamleKullanilan"), sayiBicim(kullanilan)],
      [metin("st_toplam"), sayiBicim(skor)],
      [metin("gunluk_seri"), String(veri.gunluk.seri)],
    ],
    btn1: { metin: metin("anaMenu"), aksiyon: function () { sonKapat(); anaMenuyeDon(); } },
  });
  if (artti) setTimeout(seriKutlama, 350);
}

function seriKutlama() {
  const el = document.createElement("div");
  el.className = "rekor-pop seri-kutlama";
  el.textContent = "🔥 " + veri.gunluk.seri;
  document.body.appendChild(el);
  setTimeout(function () { el.remove(); }, 1800);
}

function gunlukKilitEkrani() {
  sonucGoster({
    baslik: metin("gunluk_bugunBitti"),
    ust: '<div class="seri-buyuk"><span class="seri-alev">🔥</span><span class="seri-sayi-b">' +
      veri.gunluk.seri + '</span></div>',
    satirlar: [
      [metin("gunluk_seri"), String(veri.gunluk.seri)],
      [metin("gunluk_enUzun"), String(veri.gunluk.enUzunSeri)],
      [metin("gunluk_toplam"), String(veri.gunluk.toplam)],
    ],
    btn1: { metin: metin("anaMenu"), aksiyon: function () { sonKapat(); anaMenuyeDon(); } },
  });
  sonGeriSayim.style.display = "";
  const guncelle = function () {
    sonGeriSayim.textContent = metin("gunluk_yarin") + ": " + sureBicimSaat(geceYarisinaKalan());
  };
  guncelle();
  clearInterval(geriSayimZaman);
  geriSayimZaman = setInterval(guncelle, 1000);
}

// ---- SONUC PANELI (ters / speedrun / gunluk terminal ekranlari) ----
const sonKaplama = modalOlustur(
  '<div class="panel-baslik" id="sonBaslik"></div>' +
  '<div class="son-ust" id="sonUst"></div>' +
  '<div id="sonSatirlar"></div>' +
  '<div class="son-geri" id="sonGeriSayim"></div>' +
  '<button class="devam-btn" id="sonBtn1"></button>' +
  '<button class="devam-btn ikincil" id="sonBtn2"></button>'
);
const sonPanel = sonKaplama.querySelector(".panel");
const sonBaslik = sonKaplama.querySelector("#sonBaslik");
const sonUst = sonKaplama.querySelector("#sonUst");
const sonSatirlar = sonKaplama.querySelector("#sonSatirlar");
const sonGeriSayim = sonKaplama.querySelector("#sonGeriSayim");
const sonBtn1 = sonKaplama.querySelector("#sonBtn1");
const sonBtn2 = sonKaplama.querySelector("#sonBtn2");
let sonBtn1Aksiyon = null, sonBtn2Aksiyon = null, geriSayimZaman = null;

sonBtn1.addEventListener("click", function () { sesCal("tik"); if (sonBtn1Aksiyon) sonBtn1Aksiyon(); });
sonBtn2.addEventListener("click", function () { sesCal("tik"); if (sonBtn2Aksiyon) sonBtn2Aksiyon(); });

function sonucGoster(o) {
  Object.keys(paneller).forEach(function (k) { paneller[k].classList.remove("acik"); });
  kaplama.classList.remove("acik");

  sonBaslik.textContent = o.baslik || "";
  sonUst.innerHTML = o.ust || "";
  sonUst.style.display = o.ust ? "" : "none";
  sonGeriSayim.style.display = "none";
  clearInterval(geriSayimZaman);

  sonSatirlar.innerHTML = "";
  const satirlar = o.satirlar || [];
  satirlar.forEach(function (s, i) {
    const son = i === satirlar.length - 1;
    sonSatirlar.insertAdjacentHTML("beforeend",
      '<div class="stat-satir' + (son ? " toplam" : "") + '"><span>' + s[0] + "</span><span>" + s[1] + "</span></div>");
  });

  sonPanel.classList.toggle("kayip", !!o.kayip);
  sonBtn1.textContent = o.btn1 ? o.btn1.metin : "";
  sonBtn1.style.display = o.btn1 ? "" : "none";
  sonBtn1Aksiyon = o.btn1 ? o.btn1.aksiyon : null;
  sonBtn2.textContent = o.btn2 ? o.btn2.metin : "";
  sonBtn2.style.display = o.btn2 ? "" : "none";
  sonBtn2Aksiyon = o.btn2 ? o.btn2.aksiyon : null;

  sonKaplama.classList.add("acik");
}

function sonKapat() {
  sonKaplama.classList.remove("acik");
  clearInterval(geriSayimZaman);
}

// ---- MOD SECME EKRANI + KARTLAR ----
const MOD_KARTLAR = [
  { id: "klasik", ad: "mod_klasik", ac: "mod_klasik_ac", tema: "klasik",
    gorsel: '<span class="kv-grid"><i style="background:red"></i><i style="background:blue"></i><i style="background:green"></i><i style="background:orange"></i><i style="background:purple"></i><i style="background:gold"></i></span>' },
  { id: "ters", ad: "mod_ters", ac: "mod_ters_ac", tema: "ters",
    gorsel: '<span class="kv-grid"><i class="bos"></i><i style="background:purple"></i><i class="bos"></i><i class="bos"></i><i class="bos"></i><i style="background:blue"></i></span>' },
  { id: "speedrun", ad: "mod_speedrun", ac: "mod_speedrun_ac", tema: "speedrun",
    gorsel: '<span class="kv-sembol">⏱</span>' },
  { id: "gunluk", ad: "mod_gunluk", ac: "mod_gunluk_ac", tema: "gunluk",
    gorsel: '<span class="kv-sembol">🗓️</span>' },
];

const modlarEkran = document.createElement("div");
modlarEkran.className = "modlar-ekran kapali";
modlarEkran.innerHTML =
  '<div class="modlar-baslik" data-i18n="modlar">MODLAR</div>' +
  '<div class="mod-izgara" id="modIzgara"></div>' +
  '<button class="devam-btn mini-btn geri-btn" id="modlarGeri" data-i18n="geriBtn">GERİ</button>';
document.body.appendChild(modlarEkran);

const modIzgara = modlarEkran.querySelector("#modIzgara");
MOD_KARTLAR.forEach(function (m) {
  const kart = document.createElement("div");
  kart.className = "mod-kart tema-" + m.tema;
  kart.dataset.mod = m.id;
  kart.innerHTML =
    '<div class="mod-kart-gorsel">' + m.gorsel + "</div>" +
    '<div class="mod-kart-ad" data-i18n="' + m.ad + '"></div>' +
    '<div class="mod-kart-ac" data-i18n="' + m.ac + '"></div>' +
    '<div class="mod-kilit">🔒</div>';
  kart.addEventListener("click", function () {
    if (kart.classList.contains("kilitli")) return;
    sesCal("tik");
    kart.classList.remove("basildi");
    void kart.offsetWidth;
    kart.classList.add("basildi");
    setTimeout(function () { modBaslat(m.id); }, 130);
  });
  modIzgara.appendChild(kart);
});

modlarEkran.querySelector("#modlarGeri").addEventListener("click", function () {
  sesCal("tik");
  modlarEkran.classList.add("kapali");
});

function modlarAcikMi() { return !modlarEkran.classList.contains("kapali"); }
function modlarAc() { modlarEkran.classList.remove("kapali"); }

// ---- MENU: MODLAR butonu + seri gostergesi ----
const gModlarBtn = document.createElement("button");
gModlarBtn.className = "devam-btn mini-btn modlar-ac-btn";
gModlarBtn.dataset.i18n = "modlar";
giris.insertBefore(gModlarBtn, girisMenu);
gModlarBtn.addEventListener("click", modlarAc);

const girisSeri = document.createElement("div");
girisSeri.className = "giris-seri";
giris.appendChild(girisSeri);
function girisSeriGuncelle() {
  if (veri.gunluk.seri > 0) {
    girisSeri.style.display = "";
    girisSeri.innerHTML = "🔥 " + metin("menuSeri") + ": " + veri.gunluk.seri;
  } else {
    girisSeri.style.display = "none";
  }
}

// ---- MOD BASLATMA ----
function modBaslat(m) {
  mod = m;
  modlarEkran.classList.add("kapali");

  if (m === "gunluk" && gunlukBugunOynandi()) {
    giris.classList.add("kapali");
    modArayuzGuncelle();
    gunlukKilitEkrani();
    return;
  }

  veri.ist.oyunSayisi++;
  rekorEfektiCikti = false;

  if (m === "klasik") { bolum = veri.bolum; skor = 0; oturumRekoru = veri.enYuksek; }
  else if (m === "ters") { bolum = 1; skor = 0; oturumRekoru = veri.tersEnYuksek; }
  else if (m === "speedrun") { bolum = 1; skor = 0; oturumRekoru = 0; speedKalan = 0; speedGecen = 0; }
  else if (m === "gunluk") { bolum = MOD_AYAR.gunluk.zorlukBolum; skor = 0; oturumRekoru = 0; }

  if (m === "speedrun" && bolum > veri.speedEnBolum) veri.speedEnBolum = bolum;
  veriKaydet();

  skorKutu.textContent = sayiBicim(0);
  giris.classList.add("kapali");
  modArayuzGuncelle();
  yeniOyun();

  if (m === "speedrun") { speedGecen = 0; speedBaslat(speedBolumSure()); }
}

// ======================================================================
//  DIL VE GORUNUM UYGULAMA
// ======================================================================
function dilUygula() {
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    el.textContent = metin(el.dataset.i18n);
  });
  document.documentElement.lang = veri.dil;
  resetBtn.title = metin("ipuc_yenile");
  menuBtn.title = metin("ipuc_anamenu");
  ayarBtn.title = metin("ipuc_ayarlar");
  girisBolumGuncelle();
  girisSkorGuncelle();
  girisSeriGuncelle();
  ayarUIGuncelle();
  istGuncelle();
}

function bodyDurumGuncelle() {
  document.body.classList.toggle("renk-korlugu", veri.renkKorlugu);
}

// ======================================================================
//  KLAVYE KISAYOLLARI
// ======================================================================
document.addEventListener("keydown", function (olay) {
  if (olay.key === "Escape") {
    if (modlarAcikMi()) { modlarEkran.classList.add("kapali"); }
    else if (acikPanel === "duraklat") devamEt();
    else if (acikPanel) panelKapat();
    else if (!menudeMi() && !oyunSonuMu()) duraklat();
    return;
  }
  if (acikPanel || menudeMi() || oyunSonuMu() || modlarAcikMi()) return;
  const k = olay.key.toLowerCase();
  if (k === "r") bolumuSifirla();
  else if (k === "m") anaMenuyeDon();
});

// ======================================================================
//  BASLANGIC
// ======================================================================
dilUygula();
bodyDurumGuncelle();
sesSeviyesiGuncelle();
modArayuzGuncelle();
girisSeriGuncelle();

if (!veri.nasilGosterildi) {
  veri.nasilGosterildi = true;
  veriKaydet();
  nasilAc();
}