/* =========================
   🌍 空島電台 Sky Radio
   JS 版本（可直接跑）
========================= */

/* =========================
   🌍 世界資料
========================= */

const worldState = {
  forest: { name: "森林島", stability: 80 },
  plain: { name: "平原島", stability: 85 },
  mine: { name: "礦山島", stability: 75 },
  sea: { name: "沙灘島", stability: 78 }
};

/* =========================
   ⏳ 時間系統（空島 20h / 65min）
========================= */

function getSkyTime() {
  const now = new Date();

  const totalMinutes = now.getHours() * 60 + now.getMinutes();

  const skyDayMinutes = 20 * 65; // 1300

  const normalized = totalMinutes % skyDayMinutes;

  const hour = Math.floor(normalized / 65);
  const minute = Math.floor(normalized % 65);

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
   🌪 事件系統（時間影響事件種類）
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
   🌪 生成新聞
========================= */

function generateNews() {
  const time = getSkyTime();
  const period = getPeriod(time.hour);

  const islands = Object.keys(worldState);

  return islands.map((key) => {
    const event = pick(eventPool[period]);

    // 世界狀態微幅變動
    worldState[key].stability += Math.random() * 2 - 1;

    return {
      island: worldState[key].name,
      text: `【${period}觀測】${event}｜穩定度 ${worldState[key].stability.toFixed(1)}`
    };
  });
}

/* =========================
   🚀 UI 入口（給 HTML 用）
========================= */

function run() {
  const output = document.getElementById("output");

  const news = generateNews();

  output.innerText = news
    .map(n => `${n.island}\n${n.text}`)
    .join("\n\n");
}

/* 讓 HTML 可以呼叫 */
window.run = run;
