// src/lib/recommendation.ts
import {
  PAKET_SNACK,
  type SnackCategory,
  type SnackItem,
  type Tag,
} from "@/data/paket-snack";
import { FIACAHYA_PROFILE } from "@/config/fiacahya-data";

type Context = {
  intent: "recommend" | "other";
  occasion?: "rapat" | "pengajian" | "wedding" | "ulang-tahun" | "hampers" | "umum";
  time?: "pagi" | "siang" | "sore" | "malam";
  peopleCount?: number;

  wantsSnackBox?: boolean;
  wantsCake?: boolean;
  wantsCookies?: boolean;

  itemCount?: 3 | 4;
  wantsDrink?: boolean;

  taste?: "gurih" | "manis" | "campur";
  method?: "kukus" | "panggang" | "goreng" | "campur";
};

export type RecommendSeed = {
  occasion?: string;
  time?: "pagi" | "siang" | "sore" | "malam";
  peopleCount?: number;
  itemCount?: 3 | 4;
  wantsDrink?: boolean;
  taste?: "gurih" | "manis" | "campur";
  method?: "kukus" | "panggang" | "goreng" | "campur";
};

export type RecommendationResult = {
  reply: string;
  done: boolean;
};

function normalize(text: string) {
  return text.toLowerCase().replace(/\s+/g, " ").replace(/[^\w\s-]/g, "");
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

  const tasteWords = t.includes("gurih") || t.includes("asin") || t.includes("manis");
  const methodWords = t.includes("kukus") || t.includes("panggang") || t.includes("goreng");

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
  if (t.includes("rapat") || t.includes("meeting") || t.includes("kantor") || t.includes("seminar")) return "rapat";
  if (t.includes("pengajian") || t.includes("arisan") || t.includes("tahlil")) return "pengajian";
  if (t.includes("wedding") || t.includes("nikah") || t.includes("pernikahan")) return "wedding";
  if (t.includes("ulang tahun") || t.includes("ultah") || t.includes("birthday")) return "ulang-tahun";
  if (t.includes("hampers") || t.includes("parcel") || t.includes("hadiah")) return "hampers";
  return "umum";
}

function guessWants(text: string) {
  const t = text.toLowerCase();
  return {
    wantsSnackBox: t.includes("snack box") || t.includes("snackbox") || t.includes("paket"),
    wantsCake: t.includes("tart") || t.includes("cake") || t.includes("kue ulang") || t.includes("brownies"),
    wantsCookies: t.includes("kue kering") || t.includes("nastar") || t.includes("kastengel") || t.includes("hampers"),
  };
}

function guessItemCount(text: string): 3 | 4 | undefined {
  const t = normalize(text);
  if (t.includes("isi 4") || t.includes("4 item") || t.includes("isi empat")) return 4;
  if (t.includes("isi 3") || t.includes("3 item") || t.includes("isi tiga")) return 3;
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
  const panggang = t.includes("panggang") || t.includes("baked") || t.includes("oven");
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
  const intent: Context["intent"] = isRecommendIntent(userMessage) ? "recommend" : "other";
  const peopleCount = parsePeopleCount(t);
  const time = guessTime(t);
  const occasion = guessOccasion(t);
  const wants = guessWants(t);
  const itemCount = guessItemCount(userMessage);
  const wantsDrink = guessWantsDrink(userMessage);
  const taste = guessTaste(userMessage);
  const method = guessMethod(userMessage);

  return { intent, occasion, time, peopleCount, itemCount, wantsDrink, taste, method, ...wants };
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
  if (taste === "gurih" && method === "panggang") return "gurih, panggang ringan";

  // Campur / sebagian
  if (taste === "campur" && method && method !== "campur") {
    return `campur, ${method === "kukus" ? "kukus lembut" : method === "panggang" ? "panggang ringan" : "camilan goreng"}`;
  }
  if (method === "campur" && taste && taste !== "campur") {
    return `${taste}, pilihan variatif`;
  }
  if (taste === "campur" || method === "campur") return "campur, pilihan variatif";

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
function labelForItem(it: SnackItem, ctx: Context) {
  const itemTaste = ctx.taste ?? inferTasteFromTags(it);
  const itemMethod = ctx.method ?? inferMethodFromNameOrTags(it);
  return labelFromTasteMethod(itemTaste, itemMethod);
}


function formatOption(name: string, hint?: string) {
  return hint ? `- ${name} - ${hint}` : `- ${name}`;
}

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

function reasonForOccasion(occ?: Context["occasion"]) {
  switch (occ) {
    case "rapat": return "praktis untuk acara formal";
    case "pengajian": return "aman untuk tamu beragam";
    case "wedding": return "cocok untuk acara spesial";
    case "ulang-tahun": return "pas untuk momen perayaan";
    case "hampers": return "cocok sebagai hadiah";
    default: return "pilihan aman";
  }
}

function isAskingContentsOnly(text: string) {
  const t = normalize(text);
  return (
    t.includes("rekomendasi isian") ||
    t.includes("isinya apa") ||
    t.includes("isi apa") ||
    (t.includes("isian") && (t.includes("snack box") || t.includes("snackbox"))) ||
    (t.includes("4 item") && (t.includes("isi") || t.includes("isian") || t.includes("snack box") || t.includes("snackbox"))) ||
    (t.includes("3 item") && (t.includes("isi") || t.includes("isian") || t.includes("snack box") || t.includes("snackbox")))
  );
}

/**
 * Kalau user minta gurih/manis/kukus/panggang → boleh kasih rekomendasi generic TANPA tanya acara/waktu/jumlah.
 */
function isTasteOrMethodOnly(ctx: Context, userMessage: string) {
  const t = normalize(userMessage);
  const explicitlyTasteOrMethod =
    !!ctx.taste || !!ctx.method || t.includes("gurih") || t.includes("manis") || t.includes("kukus") || t.includes("panggang") || t.includes("goreng");
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

  const kukus = name.includes("kukus") || name.includes("putu") || name.includes("lapis") || name.includes("apem") || name.includes("serabi");
  const goreng = name.includes("risoles") || name.includes("pastel") || name.includes("lumpia") || name.includes("goreng");
  const panggang = name.includes("brownies") || name.includes("panggang") || name.includes("bolu panggang");

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

function pickKueBasahFiltered(seed: number, limit: number, taste?: Context["taste"], method?: Context["method"]) {
  const kb = pickCategory("kue-basah");
  if (!kb) return [];

  const filtered = kb.items.filter((it) => matchesTaste(it, taste) && matchesMethod(it, method));

  // fallback kalau filter terlalu sempit (biar tetap ada output)
  const pool = uniqueById(filtered.length ? filtered : kb.items);

  // prefer favorit
  const favorit = pool.filter((it) => (it.tags ?? []).includes("favorit"));
  const rest = pool.filter((it) => !(it.tags ?? []).includes("favorit"));

  const merged = uniqueById([...favorit, ...rest]);
  const shuffled = shuffleWithSeed(merged, seed);
  return shuffled.slice(0, limit);
}

function pickSnackBoxPack(ctx: Context, seedNum: number) {
  const sb = pickCategory("snack-box-paket");
  if (!sb?.items?.length) return undefined;

  const targetTags: Tag[] =
    ctx.occasion === "rapat" ? ["rapat"] :
    ctx.occasion === "pengajian" ? ["pengajian"] :
    ctx.occasion === "wedding" ? ["wedding"] :
    ctx.occasion === "hampers" ? ["hampers"] :
    ["favorit"];

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

  return scored[seedNum % Math.max(1, Math.min(3, scored.length))]?.it ?? scored[0]?.it;
}

function buildFollowUp(ctx: Context) {
  const q: string[] = [];
  if (ctx.occasion === "umum") q.push("Acaranya untuk apa, kak? (mis. rapat/pengajian/ultah)");
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
    if (!ctx.peopleCount && seed?.peopleCount) ctx.peopleCount = seed.peopleCount;
    if (!ctx.itemCount && seed?.itemCount) ctx.itemCount = seed.itemCount;
    if (!ctx.wantsDrink && seed?.wantsDrink) ctx.wantsDrink = seed.wantsDrink;
    if (!ctx.taste && seed?.taste) ctx.taste = seed.taste;
    if (!ctx.method && seed?.method) ctx.method = seed.method;
  }

  if (ctx.intent !== "recommend" && !force) return null;

  const itemCount: 3 | 4 = ctx.itemCount ?? 3;
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

  // seedNum baru dibuat DI SINI (sebelum dipakai)
  const seedNum = hashStr(
    `${userMessage}|${ctx.occasion}|${ctx.time}|${ctx.peopleCount}|${itemCount}|${ctx.taste}|${ctx.method}`
  );

  const prefLabel =
    ctx.taste === "gurih" ? "gurih" :
    ctx.taste === "manis" ? "manis" :
    ctx.method ? ctx.method : "";

  const header =
    contentsOnly
      ? `Berikut contoh isi Snack Box ${itemCount} Item${prefLabel ? " (" + prefLabel + ")" : ""}, kak:`
      : `Berikut rekomendasi${prefLabel ? " (" + prefLabel + ")" : ""} yang cocok, kak:`;

  // ✅ out baru dibuat DI SINI
  const out: string[] = [];
  out.push(header);

  // ✅ (A1) KHUSUS ULANG TAHUN → wajib ada cake (LETaknya benar)
  if (ctx.occasion === "ulang-tahun") {
    const cakeCat = pickCategory("kue-tart-cake");
    if (cakeCat?.items?.length) {
      const cake = shuffleWithSeed(cakeCat.items, seedNum + 7)[0];
      if (cake) {
        out.push(formatOption(cake.nama, "kue utama untuk perayaan ulang tahun"));
      }
    }
  }

  // Paket snack box sebagai konteks
  const askedSnackBox =
    normalize(userMessage).includes("snack box") ||
    !!ctx.wantsSnackBox ||
    contentsOnly;

  if (askedSnackBox) {
    const pack = pickSnackBoxPack(ctx, seedNum);
    const reason = reasonForOccasion(ctx.occasion);
    if (pack) out.push(formatOption(`Paket: ${pack.nama}`, reason));
  }

  // Isian makanan
  let fillings: SnackItem[] = [];

  if (ctx.occasion === "ulang-tahun") {
    fillings = pickKueBasahFiltered(
      seedNum + 17,
      itemCount,
      ctx.taste ?? "manis",
      ctx.method ?? "kukus"
    );
  } else if (ctx.occasion === "rapat") {
    fillings = pickKueBasahFiltered(
      seedNum + 17,
      itemCount,
      ctx.taste ?? "gurih",
      ctx.method ?? "campur"
    );
  } else {
    fillings = pickKueBasahFiltered(seedNum + 17, itemCount, "campur", "campur");
  }

  for (const it of fillings) {
    out.push(formatOption(it.nama, labelForItem(it, ctx)));
  }

  if (ctx.wantsDrink) out.push(formatOption("Air mineral cup/botol", "opsional minuman"));

  out.push("");
  out.push(`Untuk penyesuaian varian & tanggal produksi, konfirmasi admin via WhatsApp: ${wa}.`);

  return { reply: out.join("\n"), done: true };
}

