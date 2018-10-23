var frame;

function init() {
  
  frame = document.getElementById("frame");
  frame.innerHTML = "<div id='player'></div>";
}

function animate() {
  
  var player = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    left: false,
    up: false,
    right: false,
    down: false,
    lkey: 37,
    ukey: 38,
    rkey: 39,
    dkey: 40
  }
  
  window.addEventListener("keydown", function (e) {
    
    if (e.keyCode === player.lkey)  { player.left = true; }
    if (e.keyCode === player.ukey)    { player.up = true; }
    if (e.keyCode === player.rkey) { player.right = true; }
    if (e.keyCode === player.dkey)  { player.down = true; }
    
  });
  
  window.addEventListener("keyup", function (e) {
    
    if (e.keyCode === player.lkey)  { player.left = false; }
    if (e.keyCode === player.ukey)    { player.up = false; }
    if (e.keyCode === player.rkey) { player.right = false; }
    if (e.keyCode === player.dkey)  { player.down = false; }
    
  });
}
