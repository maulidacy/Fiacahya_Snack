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
  occasion?:
    | "rapat"
    | "pengajian"
    | "wedding"
    | "ulang-tahun"
    | "hampers"
    | "umum";
  time?: "pagi" | "siang" | "sore" | "malam";
  boxItemCount?: 3 | 4;
  peopleCount?: number;
  wantsSnackBox?: boolean;
  wantsCake?: boolean;
  wantsCookies?: boolean;
};

export type RecommendSeed = {
  occasion?: string;
  time?: "pagi" | "siang" | "sore" | "malam";
  peopleCount?: number;
};

export type RecommendationResult = {
  reply: string;
  done: boolean; // true = rekomendasi final, tidak perlu tanya lagi
};

function normalize(text: string) {
  return text.toLowerCase().replace(/\s+/g, " ").replace(/[^\w\s-]/g, "");
}

/**
 * Jalur rekomendasi lokal hanya jika:
 * - ada kata rekomendasi/saran/bingung/menu untuk, ATAU
 * - user eksplisit minta isian snack box / rekomendasi snack box
 *
 * (Tidak otomatis hanya karena menyebut "snack box", supaya OpenAI tetap dipakai untuk tanya harga, dll.)
 */
function isRecommendIntent(text: string) {
  const t = normalize(text);

  const mentionRecommendWords =
    t.includes("rekomendasi") ||
    t.includes("rekomedasi") ||
    t.includes("rekomen") ||
    t.includes("saran") ||
    t.includes("bingung") ||
    t.includes("menu untuk") ||
    t.includes("cocok untuk");

  const mentionFillSnackBox =
    t.includes("isi snack box") ||
    t.includes("isian snack box") ||
    t.includes("isi snackbox") ||
    t.includes("isian snackbox") ||
    t.includes("rekomendasi snack box") ||
    t.includes("rekomendasi snackbox");

  return mentionRecommendWords || mentionFillSnackBox;
}

function parsePeopleCount(text: string): number | undefined {
  const t = text.toLowerCase();
  const m = t.match(/(\d{1,4})\s*(orang|pax|org)?/);
  if (!m) return undefined;
  const n = Number(m[1]);
  return Number.isFinite(n) ? n : undefined;
}

function parseBoxItemCount(text: string): 3 | 4 | undefined {
  const t = text.toLowerCase();

  // pola umum: "isi 4", "isi 4 item", "4 item", "4 items"
  if (
    t.includes("isi 4") ||
    t.includes("4 item") ||
    t.includes("4 items") ||
    t.includes("empat item") ||
    t.includes("isi empat")
  ) return 4;

  if (
    t.includes("isi 3") ||
    t.includes("3 item") ||
    t.includes("3 items") ||
    t.includes("tiga item") ||
    t.includes("isi tiga")
  ) return 3;

  return undefined;
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

function detectContext(userMessage: string): Context {
  const t = userMessage.toLowerCase();
  const intent: Context["intent"] = isRecommendIntent(userMessage)
    ? "recommend"
    : "other";
  const peopleCount = parsePeopleCount(t);
  const boxItemCount = parseBoxItemCount(t);
  const time = guessTime(t);
  const occasion = guessOccasion(t);
  const wants = guessWants(t);
  return { intent, occasion, time, peopleCount, boxItemCount, ...wants };
}

function pickCategory(slug: string): SnackCategory | undefined {
  return PAKET_SNACK.find((c) => c.slug === slug);
}

function formatOption(name: string, hint?: string) {
  return hint ? `- ${name}  ${hint}` : `- ${name}`;
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

function pickKueBasahMix(seed: number, limit: number) {
  const kb = pickCategory("kue-basah");
  if (!kb) return [];

  const favorit = kb.items.filter((it) => (it.tags ?? []).includes("favorit"));
  const asin = kb.items.filter((it) => (it.tags ?? []).includes("asin"));
  const manis = kb.items.filter((it) => (it.tags ?? []).includes("manis"));

  const pool = uniqueById([...favorit, ...asin, ...manis, ...kb.items]);
  const shuffled = shuffleWithSeed(pool, seed);

  // pola: 1 asin, 1 manis, sisanya bebas (tetap unik)
  const picked: SnackItem[] = [];

  const asinPick = shuffled.find((it) => (it.tags ?? []).includes("asin"));
  const manisPick = shuffled.find((it) => (it.tags ?? []).includes("manis"));

  if (asinPick) picked.push(asinPick);
  if (manisPick && manisPick.id !== asinPick?.id) picked.push(manisPick);

  for (const it of shuffled) {
    if (picked.length >= limit) break;
    if (!picked.some((p) => p.id === it.id)) picked.push(it);
  }

  return picked.slice(0, limit);
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

function buildFollowUp(ctx: Context) {
  const q: string[] = [];

  if (ctx.occasion === "umum") {
    q.push("Acaranya untuk apa, kak? (mis. pengajian/rapat/ultah)");
  }
  if (!ctx.time) {
    q.push("Waktunya kapan (pagi/siang/sore/malam), kak?");
  }
  if (!ctx.peopleCount) {
    q.push("Untuk berapa orang (perkiraan pax), kak?");
  }

  return q.slice(0, 2);
}

/**
 * Return:
 * - null => bukan permintaan rekomendasi, lanjut ke OpenAI
 * - {reply, done} => jalur rekomendasi lokal
 *
 * done=false => masih tanya follow-up (maks 2 baris)
 * done=true  => rekomendasi final (tanpa pertanyaan lagi)
 */
function pickSnackBoxPackByCount(seed: number, count?: 3 | 4) {
  const sb = pickCategory("snack-box-paket");
  if (!sb?.items?.length) return undefined;

  if (!count) {
    // fallback: pilih yg paling cocok/random kecil
    return shuffleWithSeed(sb.items, seed)[0];
  }

  const keyword = count === 4 ? "isi 4" : "isi 3";
  const filtered = sb.items.filter((it) =>
    (it.nama ?? "").toLowerCase().includes(keyword)
  );

  if (filtered.length) return shuffleWithSeed(filtered, seed)[0];

  // kalau nama paket tidak konsisten, fallback
  return shuffleWithSeed(sb.items, seed)[0];
}

function pickDrink(seed: number) {
  // sederhana & hemat token
  const drinks = [
    "Air Mineral (botol/cup)",
    "Teh Manis (cup)",
    "Teh Botol/teh kemasan",
  ];
  return drinks[seed % drinks.length];
}

export function buildRecommendationReply(
  userMessage: string,
  force = false,
  seed?: RecommendSeed
): RecommendationResult | null {
  const ctx = detectContext(userMessage);

  // Gabungkan seed saat follow-up
  if (force) {
    if ((ctx.occasion === "umum" || !ctx.occasion) && seed?.occasion) {
      ctx.occasion = seed.occasion as Context["occasion"];
    }
    if (!ctx.time && seed?.time) ctx.time = seed.time;
    if (!ctx.peopleCount && seed?.peopleCount) ctx.peopleCount = seed.peopleCount;
  }

  if (ctx.intent !== "recommend" && !force) return null;

  // FINAL hanya jika occasion + time + peopleCount sudah ada
  const needMore = ctx.occasion === "umum" || !ctx.time || !ctx.peopleCount;
  if (needMore) {
    const followUps = buildFollowUp(ctx);
    return {
      done: false,
      reply: `Siap, kak.\n${followUps.join("\n")}`.trim(),
    };
  }

    const reason = reasonForOccasion(ctx.occasion);
  const seedNum = hashStr(`${userMessage}|${ctx.occasion}|${ctx.time}|${ctx.peopleCount}|${ctx.boxItemCount ?? ""}`);

  const out: string[] = [];
  out.push("Berikut rekomendasi yang cocok, kak:");

  // Paket snack box sesuai isi 3/4
  const pack = pickSnackBoxPackByCount(seedNum, ctx.boxItemCount);
  if (pack) out.push(formatOption(pack.nama, reason));

  // Tentukan jumlah makanan yang direkomendasikan
  // isi 3 item -> 3 makanan
  // isi 4 item -> 3 makanan + 1 minuman
  const foodCount = 3;

  // 3 makanan (mix asin/manis biar variatif)
  const foods = pickKueBasahMix(seedNum, foodCount);
  for (const it of foods) out.push(formatOption(it.nama, "cocok untuk snack box"));

  // tambah minuman kalau isi 4 item
  if (ctx.boxItemCount === 4) {
    out.push(formatOption(pickDrink(seedNum + 7), "biar lengkap 4 item"));
  }

  // batasi opsi (biar hemat token) -> total opsi max 1 pack + 4 item = 5 baris
  const header = out[0];
  const options = out.slice(1).slice(0, 6);

  const wa = FIACAHYA_PROFILE.kontak.whatsappAdmin;

  const final: string[] = [];
  final.push(header);
  final.push(...options);
  final.push("");
  final.push(`Untuk penyesuaian detail (tanggal/budget), konfirmasi admin via WhatsApp: ${wa}.`);

  return { reply: final.join("\n"), done: true };
}
