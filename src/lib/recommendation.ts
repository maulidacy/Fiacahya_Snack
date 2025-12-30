// src/lib/recommendation.ts
import {
  PAKET_SNACK,
  type SnackCategory,
  type SnackItem,
  type Tag,
} from "@/data/paket-snack";
import { FIACAHYA_PROFILE } from "@/config/fiacahya-data";
import { getSnackBoxPool } from "@/data/snackbox-fillings";

type Context = {
  intent: "recommend" | "other";
  occasion?:
  | "rapat"
  | "pengajian"
  | "wedding"
  | "ulang-tahun"
  | "hampers"
  | "umum";
  time?: "pagi" | "siang" | "sore" | "malam";
  peopleCount?: number;

  wantsSnackBox?: boolean;
  wantsCake?: boolean;
  wantsCookies?: boolean;

  itemCount?: 3 | 4;
  wantsDrink?: boolean;

  taste?: "gurih" | "manis" | "campur";
  method?: "kukus" | "panggang" | "goreng" | "campur";
  nonce?: string;
  allowSpicy?: boolean;
  budget?: "hemat" | "standar" | "premium";
};

export type RecommendSeed = {
  occasion?: string;
  time?: "pagi" | "siang" | "sore" | "malam";
  peopleCount?: number;
  itemCount?: 3 | 4;
  wantsDrink?: boolean;
  taste?: "gurih" | "manis" | "campur";
  method?: "kukus" | "panggang" | "goreng" | "campur";
  nonce?: string;
  allowSpicy?: boolean;
  budget?: "hemat" | "standar" | "premium";
};

export type RecommendationResult = {
  reply: string;
  done: boolean;
};

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[^\w\s-]/g, "");
}

/**
 * Rekomendasi lokal hanya saat user minta rekomendasi/isian/taste.
 */
function isRecommendIntent(text: string) {
  const t = normalize(text);

  const recommendWords =
    t.includes("rekomendasi") ||
    t.includes("rekomedasi") ||
    t.includes("rekomen") ||
    t.includes("saran") ||
    t.includes("bingung") ||
    t.includes("menu untuk") ||
    t.includes("cocok untuk") ||
    t.includes("bantu pilih");

  const fillSnackbox =
    t.includes("isi snack box") ||
    t.includes("isian snack box") ||
    t.includes("isi snackbox") ||
    t.includes("isian snackbox") ||
    t.includes("isi 3 item") ||
    t.includes("isi 4 item") ||
    t.includes("snack box isi 3") ||
    t.includes("snack box isi 4") ||
    t.includes("isinya apa") ||
    t.includes("isi apa") ||
    t.includes("rekomendasi isian");

  const tasteWords =
    t.includes("gurih") || t.includes("asin") || t.includes("manis");
  const methodWords =
    t.includes("kukus") || t.includes("panggang") || t.includes("goreng");

  return recommendWords || fillSnackbox || tasteWords || methodWords;
}

function parsePeopleCount(text: string): number | undefined {
  const t = text.toLowerCase();
  const m = t.match(/(\d{1,4})\s*(orang|pax|org)?/);
  if (!m) return undefined;
  const n = Number(m[1]);
  return Number.isFinite(n) ? n : undefined;
}

function guessTime(text: string): Context["time"] {
  const t = text.toLowerCase();
  if (t.includes("pagi")) return "pagi";
  if (t.includes("siang")) return "siang";
  if (t.includes("sore")) return "sore";
  if (t.includes("malam")) return "malam";
  return undefined;
}

function guessOccasion(text: string): Context["occasion"] {
  const t = text.toLowerCase();
  if (
    t.includes("rapat") ||
    t.includes("meeting") ||
    t.includes("kantor") ||
    t.includes("seminar")
  )
    return "rapat";
  if (t.includes("pengajian") || t.includes("arisan") || t.includes("tahlil"))
    return "pengajian";
  if (t.includes("wedding") || t.includes("nikah") || t.includes("pernikahan"))
    return "wedding";
  if (
    t.includes("ulang tahun") ||
    t.includes("ultah") ||
    t.includes("birthday")
  )
    return "ulang-tahun";
  if (t.includes("hampers") || t.includes("parcel") || t.includes("hadiah"))
    return "hampers";
  return "umum";
}

function guessWants(text: string) {
  const t = text.toLowerCase();
  return {
    wantsSnackBox:
      t.includes("snack box") || t.includes("snackbox") || t.includes("paket"),
    wantsCake:
      t.includes("tart") ||
      t.includes("cake") ||
      t.includes("kue ulang") ||
      t.includes("brownies"),
    wantsCookies:
      t.includes("kue kering") ||
      t.includes("nastar") ||
      t.includes("kastengel") ||
      t.includes("hampers"),
  };
}

function guessItemCount(text: string): 3 | 4 | undefined {
  const t = normalize(text);
  if (t.includes("isi 4") || t.includes("4 item") || t.includes("isi empat"))
    return 4;
  if (t.includes("isi 3") || t.includes("3 item") || t.includes("isi tiga"))
    return 3;
  return undefined;
}

function guessWantsDrink(text: string): boolean {
  const t = normalize(text);
  return (
    t.includes("minum") ||
    t.includes("minuman") ||
    t.includes("air mineral") ||
    t.includes("air putih") ||
    t.includes("teh") ||
    t.includes("kopi")
  );
}

function guessBudget(text: string): Context["budget"] {
  const t = normalize(text);
  if (
    t.includes("hemat") ||
    t.includes("murah") ||
    t.includes("budget") ||
    t.includes("minim") ||
    t.includes("low budget")
  )
    return "hemat";

  if (t.includes("premium") || t.includes("eksklusif") || t.includes("mahal"))
    return "premium";

  if (t.includes("standar") || t.includes("normal") || t.includes("sedang"))
    return "standar";

  return undefined;
}

function guessTaste(text: string): Context["taste"] {
  const t = normalize(text);
  const gurih = t.includes("gurih") || t.includes("asin");
  const manis = t.includes("manis");
  if (gurih && manis) return "campur";
  if (gurih) return "gurih";
  if (manis) return "manis";
  return undefined;
}

function guessMethod(text: string): Context["method"] {
  const t = normalize(text);
  const kukus = t.includes("kukus") || t.includes("steamed");
  const panggang =
    t.includes("panggang") || t.includes("baked") || t.includes("oven");
  const goreng = t.includes("goreng") || t.includes("fried");
  const hits = [kukus, panggang, goreng].filter(Boolean).length;
  if (hits >= 2) return "campur";
  if (kukus) return "kukus";
  if (panggang) return "panggang";
  if (goreng) return "goreng";
  return undefined;
}



function detectContext(userMessage: string): Context {
  const t = userMessage.toLowerCase();
  const intent: Context["intent"] = isRecommendIntent(userMessage)
    ? "recommend"
    : "other";
  const peopleCount = parsePeopleCount(t);
  const time = guessTime(t);
  const occasion = guessOccasion(t);
  const wants = guessWants(t);
  const itemCount = guessItemCount(userMessage);
  const wantsDrink = guessWantsDrink(userMessage);
  const taste = guessTaste(userMessage);
  const method = guessMethod(userMessage);
  const budget = guessBudget(userMessage);

  return {
    intent,
    budget,
    occasion,
    time,
    peopleCount,
    itemCount,
    wantsDrink,
    taste,
    method,
    ...wants,
  };
}

function pickCategory(slug: string): SnackCategory | undefined {
  return PAKET_SNACK.find((c) => c.slug === slug);
}

function labelFromTasteMethod(
  taste?: Context["taste"],
  method?: Context["method"]
) {
  // Standar utama (sesuai rekomendasi yang kamu setuju)
  if (taste === "manis" && method === "kukus") return "manis, kukus lembut";
  if (taste === "manis" && method === "panggang") return "manis, kue panggang";
  if (taste === "gurih" && method === "goreng") return "gurih, camilan goreng";
  if (taste === "gurih" && method === "kukus") return "gurih, kukus lembut";
  if (taste === "gurih" && method === "panggang")
    return "gurih, panggang ringan";

  // Campur / sebagian
  if (taste === "campur" && method && method !== "campur") {
    return `campur, ${method === "kukus"
      ? "kukus lembut"
      : method === "panggang"
        ? "panggang ringan"
        : "camilan goreng"
      }`;
  }
  if (method === "campur" && taste && taste !== "campur") {
    return `${taste}, pilihan variatif`;
  }
  if (taste === "campur" || method === "campur")
    return "campur, pilihan variatif";

  // Kalau cuma salah satunya ada
  if (taste === "manis") return "manis, ringan";
  if (taste === "gurih") return "gurih, mengenyangkan";
  if (method === "kukus") return "kukus lembut";
  if (method === "panggang") return "kue panggang";
  if (method === "goreng") return "camilan goreng";

  // fallback
  return "pilihan isian";
}

// infer method yang kamu sudah punya
// function inferMethodFromNameOrTags(it: SnackItem): Context["method"] { ... }

// Tambahan: infer taste dari tags item (asin/manis)
function inferTasteFromTags(it: SnackItem): Context["taste"] {
  const tags = it.tags ?? [];
  const gurih = tags.includes("asin");
  const manis = tags.includes("manis");
  if (gurih && manis) return "campur";
  if (gurih) return "gurih";
  if (manis) return "manis";
  return undefined;
}

// Ini yang akan dipakai saat bikin bullet isian
function labelForItem(it: SnackItem) {
  const itemTaste = inferTasteFromTags(it);
  const itemMethod = inferMethodFromNameOrTags(it);
  return labelFromTasteMethod(itemTaste, itemMethod);
}

function formatOption(name: string, hint?: string) {
  return hint ? `- ${name} - ${hint}` : `- ${name}`;
}

// --- PATCH: TIME SALT untuk variasi rekomendasi ---
// Berubah tiap 3 jam agar rekomendasi tidak identik terus untuk pesan yang sama.
function getTimeSalt(hoursWindow = 3) {
  const now = new Date();
  const bucket = Math.floor(now.getHours() / hoursWindow); // 0..7 untuk 3 jam
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}-b${bucket}`;
}
// --- END PATCH ---

function hashStr(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function uniqueById(items: SnackItem[]) {
  const seen = new Set<string>();
  const out: SnackItem[] = [];
  for (const it of items) {
    if (!seen.has(it.id)) {
      seen.add(it.id);
      out.push(it);
    }
  }
  return out;
}

function shuffleWithSeed<T>(arr: T[], seed: number) {
  const a = [...arr];
  let x = seed || 1;
  for (let i = a.length - 1; i > 0; i--) {
    x = (x * 1103515245 + 12345) & 0x7fffffff;
    const j = x % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const DRINKS = {
  hemat: ["Air mineral cup"],
  standar: ["Teh manis", "Air mineral botol"],
  premium: ["Teh botol", "Air mineral premium"],
} as const;

function pickDrink(ctx: Context, seedNum: number, userMessage: string) {
  const tier = ctx.budget ?? "standar";
  const pool = [...DRINKS[tier]];

  // Penyesuaian konteks sederhana (aman & tidak halusinasi harga)
  if (ctx.time === "pagi" && ctx.occasion === "rapat") {
    // teh manis lebih relevan untuk pagi rapat jika tersedia di tier
    if (tier !== "hemat" && pool.includes("Teh manis")) return "Teh manis";
  }

  // kalau user spesifik minta air mineral/teh, ikuti
  const t = normalize(userMessage);
  if (t.includes("air mineral") || t.includes("air putih")) return tier === "hemat" ? "Air mineral cup" : "Air mineral botol";
  if (t.includes("teh botol")) return tier === "premium" ? "Teh botol" : "Teh manis";
  if (t.includes("teh")) return tier === "hemat" ? "Air mineral cup" : "Teh manis";

  // fallback random stabil
  const shuffled = shuffleWithSeed(pool as unknown as string[], seedNum + 99);
  return shuffled[0] ?? "Air mineral cup";
}

function reasonForOccasion(occ?: Context["occasion"]) {
  switch (occ) {
    case "rapat":
      return "praktis untuk acara formal";
    case "pengajian":
      return "aman untuk tamu beragam";
    case "wedding":
      return "cocok untuk acara spesial";
    case "ulang-tahun":
      return "pas untuk momen perayaan";
    case "hampers":
      return "cocok sebagai hadiah";
    default:
      return "pilihan aman";
  }
}

function isAskingContentsOnly(text: string) {
  const t = normalize(text);
  return (
    t.includes("rekomendasi isian") ||
    t.includes("isinya apa") ||
    t.includes("isi apa") ||
    (t.includes("isian") &&
      (t.includes("snack box") || t.includes("snackbox"))) ||
    (t.includes("4 item") &&
      (t.includes("isi") ||
        t.includes("isian") ||
        t.includes("snack box") ||
        t.includes("snackbox"))) ||
    (t.includes("3 item") &&
      (t.includes("isi") ||
        t.includes("isian") ||
        t.includes("snack box") ||
        t.includes("snackbox")))
  );
}

/**
 * Kalau user minta gurih/manis/kukus/panggang → boleh kasih rekomendasi generic TANPA tanya acara/waktu/jumlah.
 */
function isTasteOrMethodOnly(ctx: Context, userMessage: string) {
  const t = normalize(userMessage);
  const explicitlyTasteOrMethod =
    !!ctx.taste ||
    !!ctx.method ||
    t.includes("gurih") ||
    t.includes("manis") ||
    t.includes("kukus") ||
    t.includes("panggang") ||
    t.includes("goreng");
  const notAskingSnackBoxContents = !isAskingContentsOnly(userMessage);
  return explicitlyTasteOrMethod && notAskingSnackBoxContents;
}

// ---- FILTER LOGIC ----
function inferMethodFromNameOrTags(it: SnackItem): Context["method"] {
  const name = (it.nama ?? "").toLowerCase();
  const tags = (it.tags ?? []).map((x) => x.toLowerCase());

  if (tags.includes("kukus")) return "kukus";
  if (tags.includes("panggang")) return "panggang";
  if (tags.includes("goreng")) return "goreng";

  const kukus =
    name.includes("kukus") ||
    name.includes("putu") ||
    name.includes("lapis") ||
    name.includes("apem") ||
    name.includes("serabi");
  const goreng =
    name.includes("risoles") ||
    name.includes("pastel") ||
    name.includes("lumpia") ||
    name.includes("goreng");
  const panggang =
    name.includes("brownies") ||
    name.includes("panggang") ||
    name.includes("bolu panggang");

  if (kukus) return "kukus";
  if (panggang) return "panggang";
  if (goreng) return "goreng";
  return undefined;
}

function matchesTaste(it: SnackItem, taste?: Context["taste"]) {
  if (!taste || taste === "campur") return true;
  const tags = it.tags ?? [];
  if (taste === "gurih") return tags.includes("asin");
  if (taste === "manis") return tags.includes("manis");
  return true;
}

function matchesMethod(it: SnackItem, method?: Context["method"]) {
  if (!method || method === "campur") return true;
  const m = inferMethodFromNameOrTags(it);
  return m === method;
}

function matchesOccasion(it: SnackItem, occasion?: Context["occasion"]) {
  if (!occasion || occasion === "umum") return true;

  const tags = it.tags ?? [];

  if (occasion === "rapat")
    return tags.includes("rapat") || tags.includes("asin");
  if (occasion === "pengajian")
    return tags.includes("pengajian") || tags.includes("manis");
  if (occasion === "ulang-tahun")
    return tags.includes("anak-anak") || tags.includes("manis");
  if (occasion === "wedding")
    return (
      tags.includes("wedding") ||
      tags.includes("favorit") ||
      tags.includes("manis")
    );
  if (occasion === "hampers")
    return tags.includes("hampers") || tags.includes("favorit");

  return true;
}

function pickKueBasahFiltered(
  seed: number,
  limit: number,
  occasion?: Context["occasion"],
  taste?: Context["taste"],
  method?: Context["method"]
) {
  const kb = pickCategory("kue-basah");
  if (!kb) return [];

  // filter by taste + method + occasion
  const filtered = kb.items.filter(
    (it) =>
      matchesTaste(it, taste) &&
      matchesMethod(it, method) &&
      matchesOccasion(it, occasion)
  );

  // fallback jika terlalu sempit
  const pool = uniqueById(filtered.length ? filtered : kb.items);

  // pisahkan favorit & non favorit
  const favorit = pool.filter((it) => (it.tags ?? []).includes("favorit"));
  const rest = pool.filter((it) => !(it.tags ?? []).includes("favorit"));

  // shuffle masing-masing agar lebih variatif
  const favShuffled = shuffleWithSeed(favorit, seed + 1);
  const restShuffled = shuffleWithSeed(rest, seed + 2);

  const out: SnackItem[] = [];

  // ambil max 1 favorit dulu
  if (favShuffled.length) out.push(favShuffled[0]);

  // sisanya dari non favorit
  for (const it of restShuffled) {
    if (out.length >= limit) break;
    out.push(it);
  }

  // kalau masih kurang, ambil favorit lagi
  for (const it of favShuffled.slice(1)) {
    if (out.length >= limit) break;
    out.push(it);
  }

  return out.slice(0, limit);
}
function pickSnackBoxFillingsMixed(
  seed: number,
  itemCount: 3 | 4,
  occasion?: Context["occasion"],
  allowSpicy?: boolean
) {
  const poolGlobal = uniqueById(getSnackBoxPool({ allowSpicy }));
  if (!poolGlobal.length) return [];

  const poolOccasion = poolGlobal.filter((it) => matchesOccasion(it, occasion));

  // ambil manis/gurih dari pool occasion dulu
  let manisPool = poolOccasion.filter((it) => (it.tags ?? []).includes("manis"));
  let gurihPool = poolOccasion.filter((it) => (it.tags ?? []).includes("asin"));

  // kalau kurang, fallback ke pool global
  if (manisPool.length < 1) {
    manisPool = poolGlobal.filter((it) => (it.tags ?? []).includes("manis"));
  }
  if (gurihPool.length < 1) {
    gurihPool = poolGlobal.filter((it) => (it.tags ?? []).includes("asin"));
  }

  const manisShuffled = shuffleWithSeed(manisPool, seed + 11);
  const gurihShuffled = shuffleWithSeed(gurihPool, seed + 22);

  // target komposisi
  const isThree = itemCount === 3;
  const rand = (seed % 2) === 0;
  const targetManis = isThree ? (rand ? 2 : 1) : 2;
  const targetGurih = isThree ? (rand ? 1 : 2) : 1; // penting: 4 item = 3 makanan (2 manis + 1 gurih)

  const out: SnackItem[] = [];

  // manis
  for (const it of manisShuffled) {
    if (out.length >= targetManis) break;
    out.push(it);
  }

  // gurih
  for (const it of gurihShuffled) {
    if (out.length >= targetManis + targetGurih) break;
    if (!out.find((x) => x.id === it.id)) out.push(it);
  }

  // fallback bila masih kurang (ambil dari poolOccasion dulu agar relevan)
  const combined = shuffleWithSeed(
    uniqueById([...poolOccasion, ...poolGlobal]),
    seed + 33
  );

  for (const it of combined) {
    if (out.length >= itemCount) break;
    if (!out.find((x) => x.id === it.id)) out.push(it);
  }

  return out.slice(0, itemCount);
}

function pickSnackBoxPack(ctx: Context, seedNum: number) {
  const sb = pickCategory("snack-box-paket");
  if (!sb?.items?.length) return undefined;

  // --- PATCH: PRIORITAS PAKET PAGI UNTUK RAPAT PAGI ---
  // Jika user rapat pagi dan tidak menyebut isi 3/4 item, pilih sb-pagi.
  if (ctx.occasion === "rapat" && ctx.time === "pagi" && !ctx.itemCount) {
    const pagi = sb.items.find((x) => x.id === "sb-pagi");
    if (pagi) return pagi;
  }
  // --- END PATCH ---

  const targetTags: Tag[] =
    ctx.occasion === "rapat"
      ? ["rapat"]
      : ctx.occasion === "pengajian"
        ? ["pengajian"]
        : ctx.occasion === "ulang-tahun"
          ? ["favorit", "anak-anak"]
          : ctx.occasion === "wedding"
            ? ["wedding", "favorit"]
            : ctx.occasion === "hampers"
              ? ["hampers", "favorit"]
              : ["favorit"];

  const want4 = ctx.itemCount === 4;
  const scored = sb.items
    .map((it) => {
      const tags = it.tags ?? [];
      let s = 0;
      for (const tg of targetTags) if (tags.includes(tg)) s += 2;
      if (tags.includes("favorit")) s += 1;

      const name = it.nama.toLowerCase();
      if (want4 && name.includes("isi 4")) s += 3;
      if (!want4 && name.includes("isi 3")) s += 2;

      return { it, s };
    })
    .sort((a, b) => b.s - a.s);

  return (
    scored[seedNum % Math.max(1, Math.min(3, scored.length))]?.it ??
    scored[0]?.it
  );
}

function buildFollowUp(ctx: Context) {
  const q: string[] = [];
  if (ctx.occasion === "umum")
    q.push("Acaranya untuk apa, kak? (mis. rapat/pengajian/ultah)");
  if (!ctx.time) q.push("Waktunya kapan (pagi/siang/sore/malam), kak?");
  if (!ctx.peopleCount) q.push("Untuk berapa orang (perkiraan pax), kak?");
  return q.slice(0, 2);
}

export function buildRecommendationReply(
  userMessage: string,
  force = false,
  seed?: RecommendSeed
): RecommendationResult | null {
  const ctx = detectContext(userMessage);

  // merge seed saat follow-up (WAJIB untuk jaga preferensi "gurih" tidak hilang)
  if (force) {
    if ((ctx.occasion === "umum" || !ctx.occasion) && seed?.occasion)
      ctx.occasion = seed.occasion as Context["occasion"];
    if (!ctx.time && seed?.time) ctx.time = seed.time;
    if (!ctx.peopleCount && seed?.peopleCount)
      ctx.peopleCount = seed.peopleCount;
    if (!ctx.itemCount && seed?.itemCount) ctx.itemCount = seed.itemCount;
    if (!ctx.wantsDrink && seed?.wantsDrink) ctx.wantsDrink = seed.wantsDrink;
    if (!ctx.taste && seed?.taste) ctx.taste = seed.taste;
    if (!ctx.method && seed?.method) ctx.method = seed.method;
    if (!ctx.budget && seed?.budget) ctx.budget = seed.budget;
    if (seed?.nonce) ctx.nonce = seed.nonce;
    if (seed?.allowSpicy !== undefined) ctx.allowSpicy = seed.allowSpicy;
  }

  if (ctx.intent !== "recommend" && !force) return null;

  const itemCount: 3 | 4 = ctx.itemCount ?? 3;
  const foodCount = itemCount === 4 ? 3 : itemCount;
  const wa = FIACAHYA_PROFILE.kontak.whatsappAdmin;

  const contentsOnly = isAskingContentsOnly(userMessage);

  const needMoreForContextual =
    !contentsOnly &&
    !isTasteOrMethodOnly(ctx, userMessage) &&
    (ctx.occasion === "umum" || !ctx.time || !ctx.peopleCount);

  if (needMoreForContextual) {
    const followUps = buildFollowUp(ctx);
    return { done: false, reply: `Siap, kak. ${followUps.join(" ")}`.trim() };
  }

  // --- PATCH: seed variatif dengan timeSalt ---
  const timeSalt = getTimeSalt(3);
  const seedNum = hashStr(
    `${userMessage}|${ctx.occasion}|${ctx.time}|${ctx.peopleCount}|${itemCount}|${ctx.taste}|${ctx.method}|${ctx.budget}|${timeSalt}`
  );
  // --- END PATCH ---

  const prefLabel =
    ctx.taste === "gurih"
      ? "gurih"
      : ctx.taste === "manis"
        ? "manis"
        : ctx.method
          ? ctx.method
          : "";

  const header = contentsOnly
    ? `Berikut contoh isi Snack Box ${itemCount} Item${prefLabel ? " (" + prefLabel + ")" : ""}, kak:`
    : `Berikut rekomendasi${prefLabel ? " (" + prefLabel + ")" : ""} yang cocok, kak:`;

  // out baru dibuat DI SINI
  const out: string[] = [];
  out.push(header);

  // A1) KHUSUS ULANG TAHUN → wajib ada cake (LETaknya benar)
  if (ctx.occasion === "ulang-tahun") {
    const cakeCat = pickCategory("kue-tart-cake");
    if (cakeCat?.items?.length) {
      const cake = shuffleWithSeed(cakeCat.items, seedNum + 7)[0];
      if (cake) {
        out.push(
          formatOption(cake.nama, "kue utama untuk perayaan ulang tahun")
        );
      }
    }
  }

  // Paket snack box sebagai konteks
  const askedSnackBox =
    normalize(userMessage).includes("snack box") ||
    !!ctx.wantsSnackBox ||
    contentsOnly;

  const mustMixSnackBox = askedSnackBox;

  if (askedSnackBox) {
    const pack = pickSnackBoxPack(ctx, seedNum);
    const reason = reasonForOccasion(ctx.occasion);
    if (pack) out.push(formatOption(`Paket: ${pack.nama}`, reason));

    // Set wantsDrink safely without breaking old logic
    if (itemCount === 4 || pack?.id === "sb-pagi" || (pack && (pack.nama.toLowerCase().includes("air mineral") || pack.nama.toLowerCase().includes("minuman")))) {
      ctx.wantsDrink = true;
    }
  }
  // Isian makanan
  let fillings: SnackItem[] = [];

  if (askedSnackBox && mustMixSnackBox) {
    fillings = pickSnackBoxFillingsMixed(seedNum + 17, foodCount, ctx.occasion);
  } else if (ctx.occasion === "pengajian") {
    fillings = pickKueBasahFiltered(
      seedNum + 17,
      itemCount,
      "pengajian",
      ctx.taste ?? "campur",
      ctx.method ?? "campur"
    );
  } else if (ctx.occasion === "rapat") {
    fillings = pickKueBasahFiltered(
      seedNum + 17,
      itemCount,
      "rapat",
      ctx.taste ?? "gurih",
      ctx.method ?? "campur"
    );
  } else if (ctx.occasion === "ulang-tahun") {
    fillings = pickKueBasahFiltered(
      seedNum + 17,
      itemCount,
      "ulang-tahun",
      ctx.taste ?? "manis",
      ctx.method ?? "kukus"
    );
  } else {
    fillings = pickKueBasahFiltered(
      seedNum + 17,
      itemCount,
      ctx.occasion ?? "umum",
      ctx.taste ?? "campur",
      ctx.method ?? "campur"
    );
  }

  for (const it of fillings) {
    out.push(formatOption(it.nama, labelForItem(it)));
  }

  if (ctx.wantsDrink) {
    const drink = pickDrink(ctx, seedNum, userMessage);
    out.push(formatOption(drink, "opsional minuman"));
  }

  out.push("");
  out.push(
    `Untuk penyesuaian varian & tanggal produksi, konfirmasi admin via WhatsApp: ${wa}.`
  );

  return { reply: out.join("\n"), done: true };
}
