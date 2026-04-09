<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mahjong Pro Game</title>
<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg,#0f172a,#020617);
  color: white;
  text-align: center;
}

h1 { margin: 10px; }

#ui {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

#game {
  display: grid;
  gap: 6px;
  justify-content: center;
  margin: 20px auto;
}

.tile {
  width: 60px;
  height: 60px;
  background: #1e293b;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  user-select: none;
  transition: 0.2s;
}

.tile:hover { transform: scale(1.05); }
.tile.selected { background: #22c55e; }
.tile.matched { background: #475569; pointer-events: none; }

button {
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  background: #22c55e;
  color: white;
  cursor: pointer;
}

</style>
</head>
<body>

<h1>🀄 Mahjong Pro</h1>

<div id="ui">
  <div>Level: <span id="level">1</span></div>
  <div>Score: <span id="score">0</span></div>
  <div>Time: <span id="time">0</span>s</div>
</div>

<button onclick="startGame()">Restart</button>

<div id="game"></div>

<script>
let level = 1;
let score = 0;
let time = 0;
let timer = null;

let first = null;
let second = null;

const symbols = [
'🀄','🀅','🀆','🀇','🀈','🀉','🀊','🀋','🀌','🀍',
'🀎','🀏','🀐','🀑','🀒','🀓','🀔','🀕','🀖','🀗',
'🀘','🀙','🀚','🀛','🀜','🀝','🀞','🀟'
];

function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){
    let j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}

function generateLevel(){
  const game = document.getElementById('game');
  game.innerHTML = '';

  let pairs = Math.min(4 + level*2, symbols.length);
  let chosen = symbols.slice(0,pairs);
  let tiles = shuffle([...chosen,...chosen]);

  let cols = Math.ceil(Math.sqrt(tiles.length));
  game.style.gridTemplateColumns = `repeat(${cols},60px)`;

  tiles.forEach(sym=>{
    let div=document.createElement('div');
    div.className='tile';
    div.textContent='?';
    div.dataset.value=sym;

    div.addEventListener('click',()=>handleClick(div));

    game.appendChild(div);
  });
}

function handleClick(tile){
  if(tile.classList.contains('matched') || tile===first) return;

  tile.textContent = tile.dataset.value;
  tile.classList.add('selected');

  if(!first){
    first = tile;
  } else {
    second = tile;

    if(first.dataset.value === second.dataset.value){
      first.classList.add('matched');
      second.classList.add('matched');
      score += 10;
      updateUI();
      reset();
      checkWin();
    } else {
      setTimeout(()=>{
        first.textContent='?';
        second.textContent='?';
        first.classList.remove('selected');
        second.classList.remove('selected');
        reset();
      },600);
    }
  }
}

function reset(){
  first=null;
  second=null;
}

function checkWin(){
  let tiles = document.querySelectorAll('.tile');
  let done = [...tiles].every(t=>t.classList.contains('matched'));

  if(done){
    clearInterval(timer);
    setTimeout(()=>{
      alert('Level '+level+' selesai!');
      level++;
      startLevel();
    },300);
  }
}

function updateUI(){
  document.getElementById('level').textContent=level;
  document.getElementById('score').textContent=score;
}

function startTimer(){
  clearInterval(timer);
  time = 0;
  timer = setInterval(()=>{
    time++;
    document.getElementById('time').textContent=time;
  },1000);
}

function startLevel(){
  generateLevel();
  updateUI();
  startTimer();
}

function startGame(){
  level = 1;
  score = 0;
  startLevel();
}

// INIT
startGame();
</script>

</body>
</html>
