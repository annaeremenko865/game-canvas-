'use strict';
let flag = false;
let intervalId;
let timeId;
let rectId;
let score = document.getElementById("score");
score.textContent = Number(0);
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");  
  
  function Rect(x, dy) {
    this.x = x;
    this.y = 0;
    this.dy = dy * Math.random();
    this.fillColor = 'rgb(' + Math.round( Math.random() * 255) + ', ' + Math.round( Math.random() * 255) + ', ' + Math.round( Math.random() * 255)  + ')';
  }

let rects = [];

function addRect() {
 let x = Math.round(Math.random() * canvas.width);
 if (x > (canvas.width + 20) || x < (canvas.width - 20) ){
  let rect = new Rect(x, 1);
  rects.push(rect);
 } 
}

function clearRects() {
  rects = [];
}
function draw() {
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     ctx.beginPath();
    for(let i = 0; i< rects.length; i++) {
        let rect = rects[i];
        rect.y += rect.dy;
        if (flag === false) {
          ctx.beginPath();
          ctx.fillStyle = rect.fillColor;
        }
        else return;
        ctx.fillRect(rect.x, rect.y, 20, 20);
      }
      rectId = requestAnimationFrame(draw);

}

document.getElementById("start").addEventListener('click', () => {
                requestAnimationFrame(draw);
                intervalId = setInterval(addRect, 1000 );
                score.textContent = 0;

});

document.getElementById("stop").addEventListener('click', () => {
              clearInterval(intervalId);
              clearRects();
                ctx.clearRect(0, 0, canvas.width, canvas.height);
               
});
  canvas.addEventListener('click', e => {
     let elemLeft = canvas.offsetLeft;
     let elemTop = canvas.offsetTop;
     let xx = event.clientX - elemLeft;
     let yy =  event.clientY - elemTop;
     for(let i=0; i < rects.length; i++){
         let x = xx - rects[i].x;
         let y = yy - rects[i].y;
         if (Math.min(x, y) < 0 || Math.max(x, y) > 20) continue;
         rects.splice(i--, 1);
      score.textContent = Number(score.textContent) + 1;
      }

       });