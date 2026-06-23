/* =========================
   🌍 SKY RADIO FULL ENGINE
   空島電台完整版（可運行）
========================= */

/* =========================
   🌍 世界狀態
========================= */

const worldState = {
  forest: { name: "森林島", stability: 80 },
  plain: { name: "平原島", stability: 85 },
  mine: { name: "礦山島", stability: 75 },
  sea: { name: "沙灘島", stability: 78 }
};

/* =========================
   ⏳ 空島時間系統
   1天 = 20小時
   1小時 = 65分鐘
========================= */

const SKY_HOUR_MIN = 65;
const SKY_DAY_HOURS = 20;

function getSkyTime() {
  const now = new Date();

  const earthMinutes = now.getHours() * 60 + now.getMinutes();
  const skyDayMinutes = SKY_HOUR_MIN * SKY_DAY_HOURS; // 1300

  const normalized = earthMinutes % skyDayMinutes;

  const hour = Math.floor(normalized / SKY_HOUR_MIN);
  const minute = Math.floor(normalized % SKY_HOUR_MIN);

  return { hour, minute };
}

function getPeriod(hour) {
  if (hour < 3) return "深夜";
  if (hour < 6) return "黎明";
  if (hour < 10) return "清晨";
  if (hour < 14) return "白天";
  if (hour < 17) return "午後";
  if (hour < 19) return "傍晚";
  return "夜晚";
}

/* =========================
   🌪 事件池（依時間變化）
========================= */

const eventPool = {
  深夜: [
    "霧氣異常凝結",
    "海面進入靜默狀態",
    "礦山低頻震動"
  ],
  黎明: [
    "氣流開始重組",
    "森林薄霧上升",
    "航線逐步恢復"
  ],
  清晨: [
    "市場活動開始增加",
    "空鷹航線啟動",
    "氣候穩定上升"
  ],
  白天: [
    "貿易活動高峰",
    "島嶼交流頻繁",
    "氣流活躍"
  ],
  午後: [
    "雲層逐漸堆積",
    "物流出現延遲",
    "經濟波動增加"
  ],
  傍晚: [
    "航線開始收縮",
    "海風增強",
    "市場降溫"
  ],
  夜晚: [
    "系統進入低活動狀態",
    "氣候逐漸穩定",
    "島嶼進入休眠"
  ]
};

/* =========================
   🔧 工具
========================= */

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* =========================
   🌍 世界變動（簡化版）
========================= */

function applyWorldChange(islandKey, impact) {
  worldState[islandKey].stability += impact;

  // 限制範圍
  worldState[islandKey].stability = Math.max(
    0,
    Math.min(100, worldState[islandKey].stability)
  );
}

/* =========================
   🌪 新聞生成
========================= */

function generateNews() {
  const time = getSkyTime();
  const period = getPeriod(time.hour);

  const islands = Object.keys(worldState);

  return islands.map((key) => {
    const event = pick(eventPool[period]);

    const impact = Math.random() * 2 - 1; // -1 ~ +1

    applyWorldChange(key, impact);

    return {
      island: worldState[key].name,
      text: `【${period}觀測】${event}｜穩定度 ${worldState[key].stability.toFixed(1)}`
    };
  });
}

/* =========================
   ⏳ 時間顯示
========================= */

function updateTime() {
  const el = document.getElementById("timeHint");
  if (!el) return;

  const t = getSkyTime();

  el.innerText = `⏳ 空島時間：${t.hour.toString().padStart(2, "0")}:${t.minute
    .toString()
    .padStart(2, "0")}`;
}

/* =========================
   🚀 UI 主入口
========================= */

function run() {
  const output = document.getElementById("output");

  const news = generateNews();

  output.innerText = news
    .map(n => `${n.island}\n${n.text}`)
    .join("\n\n");

  updateTime();
}

/* =========================
   🌍 初始化
========================= */

updateTime();
setInterval(updateTime, 1000);

/* 讓 HTML 可以呼叫 */
window.run = run;
