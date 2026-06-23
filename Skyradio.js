/* =========================
   🌍 SKY RADIO MAP ENGINE
========================= */

const worldState = {
  forest: { name: "森林島", stability: 80 },
  plain: { name: "平原島", stability: 85 },
  mine: { name: "礦山島", stability: 75 },
  sea: { name: "沙灘島", stability: 78 }
};

/* 空島時間 */
const SKY_HOUR_MIN = 65;
const SKY_DAY = 20 * SKY_HOUR_MIN;

function getSkyTime() {
  const now = new Date();
  const m = now.getHours() * 60 + now.getMinutes();

  const t = m % SKY_DAY;

  return {
    hour: Math.floor(t / SKY_HOUR_MIN),
    min: Math.floor(t % SKY_HOUR_MIN)
  };
}

function getPeriod(h) {
  if (h < 3) return "深夜";
  if (h < 6) return "黎明";
  if (h < 10) return "清晨";
  if (h < 14) return "白天";
  if (h < 17) return "午後";
  if (h < 19) return "傍晚";
  return "夜晚";
}

/* 事件池 */
const eventPool = {
  深夜: ["霧氣凝結", "海面靜默", "礦山低鳴"],
  黎明: ["氣流重組", "森林薄霧升起", "航線恢復"],
  清晨: ["市場開啟", "空鷹起飛", "氣候穩定"],
  白天: ["貿易高峰", "島嶼交流", "氣流活躍"],
  午後: ["雲層堆積", "物流延遲", "經濟波動"],
  傍晚: ["航線收縮", "海風增強", "市場降溫"],
  夜晚: ["系統休眠", "氣候穩定", "島嶼沉靜"]
};

function pick(a) {
  return a[Math.floor(Math.random() * a.length)];
}

/* 世界變動 */
function updateWorld(key) {
  worldState[key].stability += Math.random() * 2 - 1;
  worldState[key].stability = Math.max(0, Math.min(100, worldState[key].stability));
}

/* 新聞生成 */
function generateNews() {
  const t = getSkyTime();
  const period = getPeriod(t.hour);

  return Object.keys(worldState).map(k => {
    updateWorld(k);

    return {
      island: worldState[k].name,
      text: `【${period}】${pick(eventPool[period])}｜穩定度 ${worldState[k].stability.toFixed(1)}`
    };
  });
}

/* UI */
function render() {
  const el = document.getElementById("output");
  const timeEl = document.getElementById("timeHint");

  const news = generateNews();

  el.innerHTML = news.map(n =>
    `<div class="card">
      <div class="island">${n.island}</div>
      <div class="text">${n.text}</div>
    </div>`
  ).join("");

  const t = getSkyTime();
  timeEl.innerText = `⏳ 空島時間 ${t.hour.toString().padStart(2,"0")}:${t.min.toString().padStart(2,"0")}`;
}

/* MAP核心：自動播報 */
render();
setInterval(render, 8000);
