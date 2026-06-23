<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Sky Radio｜空島電台</title>

  <link rel="stylesheet" href="style.css">
</head>

<body>
  <div class="app">

    <!-- 標題 -->
    <header class="header">
      <h1>🌍 Sky Radio</h1>
      <p>空島即時觀測電台</p>
    </header>

    <!-- 控制按鈕 -->
    <div class="controls">
      <button onclick="run()">生成今日新聞</button>
    </div>

    <!-- 時間顯示 -->
    <div class="time">
      <span id="timeHint">點擊生成新聞以更新空島狀態</span>
    </div>

    <!-- 新聞區 -->
    <main id="output" class="news"></main>

  </div>

  <!-- ⚠️ 一定要放最後 -->
  <script src="Skyradio.js"></script>
</body>
</html>
