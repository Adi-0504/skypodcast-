/******************************
 * 🌍 SKY RADIO v1.0
 * World + Time + Causality + TTS Routing
 ******************************/

/* =========================
   ⏳ SKY TIME SYSTEM
========================= */

const SKY_HOUR_MINUTES = 65;
const SKY_DAY_HOURS = 20;

function earthToSkyTime() {
  const now = new Date();

  const earthMinutes = now.getHours() * 60 + now.getMinutes();
  const skyDayMinutes = SKY_HOUR_MINUTES * SKY_DAY_HOURS;

  const normalized = earthMinutes % skyDayMinutes;

  const hour = Math.floor(normalized / SKY_HOUR_MINUTES);
  const minute = Math.floor(normalized % SKY_HOUR_MINUTES);

  return { hour, minute };
}

function getSkyPeriod(hour: number) {
  if (hour < 3) return "deepNight";
  if (hour < 6) return "dawn";
  if (hour < 10) return "morning";
  if (hour < 14) return "day";
  if (hour < 17) return "afternoon";
  if (hour < 19) return "evening";
  return "night";
}

/* =========================
   🌍 WORLD STATE
========================= */

type Island = "forest" | "plain" | "mine" | "sea";

const worldState: Record<Island, any> = {
  forest: { name: "森林島", stability: 80 },
  plain: { name: "平原島", stability: 85 },
  mine: { name: "礦山島", stability: 75 },
  sea: { name: "沙灘島", stability: 78 }
};

/* =========================
   🌪 EVENT CATALOG（核心）
   👉 不同時間「不同事件池」
========================= */

const eventCatalog = {
  deepNight: [
    "霧氣異常凝結",
    "海面靜默異常",
    "礦山低頻震動"
  ],
  dawn: [
    "氣流重新排列",
    "森林薄霧升起",
    "航線開始恢復"
  ],
  morning: [
    "市場活動增加",
    "空鷹航線啟動",
    "氣候穩定上升"
  ],
  day: [
    "貿易高峰運行",
    "島嶼交流頻繁",
    "氣流活躍"
  ],
  afternoon: [
    "雲層堆積",
    "物流延遲",
    "經濟波動"
  ],
  evening: [
    "航線開始收縮",
    "海風增強",
    "市場降溫"
  ],
  night: [
    "系統進入低活動",
    "氣候穩定下降",
    "島嶼進入休眠狀態"
  ]
};

/* =========================
   🌪 EVENT GENERATION
========================= */

function pick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateEvent(island: Island, period: string) {
  return {
    origin: island,
    text: pick(eventCatalog[period as keyof typeof eventCatalog]),
    impact: Math.random() * 10 - 5
  };
}

/* =========================
   🔗 CAUSALITY SYSTEM
========================= */

const causality: Record<string, Island[]> = {
  forest: ["plain", "sea"],
  sea: ["plain"],
  mine: ["plain"],
  plain: ["forest"]
};

function propagate(event: any) {
  const targets = causality[event.origin] || [];

  return targets.map((t) => ({
    island: t,
    text: `受${event.origin}影響：${event.text}`,
    impact: event.impact * 0.6
  }));
}

/* =========================
   🌍 APPLY WORLD CHANGES
========================= */

function apply(event: any, propagated: any[]) {
  const all = [event, ...propagated];

  for (const e of all) {
    const island = worldState[e.island || e.origin];
    if (!island) continue;

    island.stability += e.impact;
  }
}

/* =========================
   🎙 TTS ROUTER
========================= */

function route(text: string) {
  const hasChinese = /[\u4e00-\u9fff]/.test(text);
  return hasChinese ? "openformosa" : "kokoro";
}

async function speak(text: string) {
  const provider = route(text);

  if (provider === "openformosa") {
    console.log("[OPENFORMOSA]", text);
  } else {
    console.log("[KOKORO]", text);
  }
}

/* =========================
   🧠 NEWS GENERATOR
========================= */

function generateNews(period: string) {
  const islands: Island[] = ["forest", "plain", "mine", "sea"];

  return islands.map((i) => {
    const event = generateEvent(i, period);
    const propagated = propagate(event);

    apply(event, propagated);

    const text = `
【${worldState[i].name}觀測】

${event.text}
穩定度：${worldState[i].stability.toFixed(1)}
    `;

    return text;
  });
}

/* =========================
   🚀 MAIN PIPELINE
========================= */

async function main() {
  const time = earthToSkyTime();
  const period = getSkyPeriod(time.hour);

  console.log(`⏳ 空島時間：${time.hour}:${time.minute}`);
  console.log(`🌍 時段：${period}`);

  const news = generateNews(period);

  for (const n of news) {
    await speak(n);
  }
}

main();
