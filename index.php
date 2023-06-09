<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>JP Daily</title>
    <script src="jpdaily.js?cachebreak=<?php echo time(); ?>"></script>
    <script src="wordbank.js?cachebreak=<?php echo time(); ?>"></script>
    <link rel="stylesheet" href="style.css?cachebreak=<?php echo time(); ?>">
  </head>
  <body>

    <div id="card-picker-host">
      Set: <select id="set-picker"></select>
      &nbsp; &nbsp; &nbsp;
      Front side: <select id="side-picker">
        <option value="RO">Romaji</option>
        <option value="EN">English</option>
        <option value="KA">Kana</option>
        <option value="KJ">Kanji</option>
      </select>
    </div>

    <div id="card-display">
      <div id="display-main">a</div>
      <div id="display-secondary">b</div>
    </div>

    <div id="button-host">
      <button id="button-randomize">🔀</button>
      &nbsp; &nbsp; &nbsp; 
      <button id="button-back">Back</button>
      <button id="button-next">Next</button>
    </div>
  </body>
</html>
