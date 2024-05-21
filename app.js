const grid=document.getElementById('grid');
const score=document.getElementById('score');
const start=document.getElementById('start');
const width=10;

const colors=[
  'orange',
  'red',
  'purple',
  'green',
  'blue'
]

//var -function scoped as well as global scoped.
//let,const -block scoped
for(let i=0; i<200; i++){
    let square=document.createElement('div');
    square.classList.add('square');
    square.id=i;
    grid.appendChild(square);
}
for(let i=0; i<10; i++){
  let square=document.createElement('div');
  square.classList.add('square')
  square.classList.add('taken');
  square.classList.add('extra');
  square.id=i;
  grid.appendChild(square);
}

let squares=Array.from(document.querySelectorAll('.square'));

const lTetromino=[
[1,width+1,(width*2)+1,2],
[width,width+1,width+2,width*2+2],
[1,width+1,width*2+1,width*2],
[width,width*2,width*2+1,width*2+2]
];

const zTetromino = [
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1]
  ]

  const tTetromino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ]

  const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ]

  const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ]
const tetrominos=[lTetromino,zTetromino,tTetromino,oTetromino,iTetromino];

let currentPos=4;
let currentRotation=0;
let random=Math.floor(Math.random()*tetrominos.length);
let current=tetrominos[random][currentRotation];
let nextRandom=0;
document.addEventListener('keyup',movement);
function movement(event){
  console.log(event.key);
 if(event.key=='ArrowLeft'){
  moveLeft();
 }else if(event.key=='ArrowRight'){
  moveRight();
 }else if(event.key=='ArrowDown'){
  move();
 }else if(event.key=='ArrowUp'){
  rotate();
 }
}
function draw(){
    current.forEach(index => {
        // console.log(index);
        squares[index+currentPos].classList.add('tetromino');
        squares[index+currentPos].style.backgroundColor=colors[random];
        // console.log("draw "+(index+currentPos));
    })
}

function undraw(){
  
    current.forEach(index =>{
      // console.log(index+currentPos-width);
        squares[index+currentPos].classList.remove('tetromino');
        squares[index+currentPos].style.backgroundColor='';
    })
  
}
// draw();
function move(){
  undraw();
    currentPos+=width;
    draw();
   freeze();
}

function moveLeft(){
  console.log('here');
  undraw();
  let leftEdge=current.some(index=>{
    return (currentPos+index)%width==0;
  });
  if(!leftEdge){
    currentPos-=1;
  }
  if(current.some(index=>squares[index+currentPos].classList.contains('taken'))){
    currentPos+=1;
  }
  draw();
}

function moveRight(){
 undraw();
 let rightEdge=current.some(index=>(currentPos+index)%width==width-1);
 if(!rightEdge){
  currentPos+=1;
 }
 if(current.some(index=>squares[index+currentPos].classList.contains('taken'))){
  currentPos-=1;
 }
 draw();
}

function rotate(){
  undraw();
  currentRotation++;
  if(currentRotation>tetrominos[0].length-1){
    currentRotation=0;
  }
  
  current=tetrominos[random][currentRotation];
  draw();
}
// let interval=setInterval(move,1000);

// setTimeout(()=>{
//     clearInterval(interval);
// },10000);

function freeze(){
  // console.log(current.some(index=> squares[index+currentPos+width].classList.contains('taken')));
  if(current.some(index=> squares[index+currentPos+width].classList.contains('taken'))){
    current.forEach(index=> squares[index+currentPos].classList.add('taken'))

    random=nextRandom;
    currentRotation=0;
    current=tetrominos[random][currentRotation];
    
    nextRandom=Math.floor(Math.random()* tetrominos.length);
    currentPos=4;
   
    next();
    addScore();
    gameOver();

  }
}

//minigrid
let minigrid=document.querySelector('.mini-grid');
console.log(minigrid);
for(let i=0; i<16; i++){
  let square=document.createElement('div');
  square.id=i;
  square.classList.add('mini');
  minigrid.appendChild(square);
}
let miniSquares=document.querySelectorAll('.mini');
console.log(miniSquares);
let dwidth=4;
let types=[
  [1,dwidth+1,(dwidth*2)+1,2],
  [0,dwidth,dwidth+1,dwidth*2+1],
  [1,dwidth,dwidth+1,dwidth+2],
  [0,1,dwidth,dwidth+1],
  [1,dwidth+1,dwidth*2+1,dwidth*3+1]
]

function next(){
  console.log('jjjjj')
  miniSquares.forEach(index=> index.classList.remove('d'));
  miniSquares.forEach(index=> index.style.backgroundColor="");
 
  types[nextRandom].forEach(index=> miniSquares[index].classList.add('d'))
  types[nextRandom].forEach(index=> miniSquares[index].style.backgroundColor=colors[nextRandom]);
  // type.forEach(index=>miniSquares[index].classList.add('d'));


}

//start pause
let interval;

start.addEventListener('click',()=>{
  if(interval){
    start.innerHTML="Start"
    clearInterval(interval);
    interval=null;
  }else{
    interval=setInterval(move,1000);
    start.innerHTML="Pause"
  }

  nextRandom=Math.floor(Math.random()*tetrominos.length);
  next();
})

function addScore(){
  console.log('score');
  let i=0;
  let j=0;
  while(j<20){
    let row=[i,i+1,i+2,i+3,i+4,i+5,i+6,i+7,i+8,i+9];
    let splice;
    console.log(row.every(index=>squares[index].classList.contains('taken')));
    if(row.every(index=>squares[index].classList.contains('taken'))){
       splice=squares.splice(i,10);
       console.log(splice);
       console.log(squares.length);
    
    splice.forEach(div=>div.classList.remove('taken'));
    splice.forEach(div=>div.classList.remove('tetromino'));
    splice.forEach(div=>div.style.backgroundColor='');
    squares=splice.concat(squares);
    squares.forEach(div=>grid.appendChild(div));
    score.innerHTML=Number(score.innerHTML)+width;
    }
    i+=width;
    j++;
  }
}

function gameOver(){
  if(current.some(index=> squares[index+currentPos].classList.contains('taken'))){
    clearInterval(interval);
    score.innerHTML="Game Over."
  }
}


