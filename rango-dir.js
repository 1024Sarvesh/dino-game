const can = document.getElementById("can");
const cansize = 600;
can.width = cansize;
can.height = cansize;
const ctx = can.getContext("2d");


const character = {
 size:20,
 color:"blue",
 pos:{ x:200, y:300, dir:"up" },
 speed:10,
 bulletsize:10,
 bulletcolor:"red",
 bulletspeed:5
}


const Enemy1 = {
        size:20, 
        color:"yellow",
        pos:{ x:200,
        y:300, 
        dir:"left" },
        speed:1.5,
        bulletsize:10,
        bulletcolor:"green",
        bulletspeed:4,
        time:0 
      };
const Enemy2 = { 
  size:20,
   color:"orange",
    pos:{ x:400,
    y:200,
    dir:"right" },
    speed:1.2,
    bulletsize:10,
    bulletcolor:"green",
    bulletspeed:4,
    time:0 
  };
const Enemy3 = { 
  size:20,
   color:"purple",
    pos:{ x:100,
     y:100,
    dir:"down" }, 
    speed:1,
    bulletsize:10,
    bulletcolor:"green",
     bulletspeed:4,
    time:0
  };


    const Enemy4 = {
        size:20,
   color:"gray",
    pos:{ x:100,
     y:100,
    dir:"up" }, 
    speed:1,
    bulletsize:10,
    bulletcolor:"green",
     bulletspeed:4,
    time:0
    }
    const Enemy5 = {
        size:20,
   color:"skyblue",
    pos:{ x:100,
     y:100,
    dir:"left" }, 
    speed:1,
    bulletsize:10,
    bulletcolor:"green",
     bulletspeed:4,
    time:0
    }

const enemies = [Enemy1, Enemy2, Enemy3, Enemy4, Enemy5];

const bullets = [];
const enemyBullets = [];

const moveBullet = (b) => {
 b.forEach(e=>{
  if(e.dir==="up") {
    e.y -= e.speed;
  }else if(e.dir==="down"){
     e.y += e.speed;
  }else if(e.dir==="left") {
    e.x -= e.speed;
  }else if(e.dir==="right") {
    e.x += e.speed;
  }
 });
 for(let i=b.length-1;i>=0;i--){
  if(b[i].x<0 || b[i].x>cansize || b[i].y<0 || b[i].y>cansize){
   b.splice(i,1);
  }
 }
}

const enemymover = (ene) => {
 ene.time++;
 if(ene.time>80){
  const dir = Math.floor(Math.random()*4);
  if(dir===0) {
    ene.pos.dir="up";
  }else if(dir===1) {
    ene.pos.dir="down";
  }else if(dir===2) {
    ene.pos.dir="left";
  }else {
    ene.pos.dir="right";
  }
  ene.time = 0;
}

 if(ene.pos.dir==="up") {
  ene.pos.y -= ene.speed;
 }else if(ene.pos.dir==="down") {
  ene.pos.y += ene.speed;
 }else if(ene.pos.dir==="left"){
 ene.pos.x -= ene.speed;
 }else if(ene.pos.dir==="right") {
  ene.pos.x += ene.speed;}



 if(ene.pos.x<1.5*ene.size){
 ene.pos.x=1.5*ene.size;
  ene.pos.dir="right";
 }
 if(ene.pos.x>cansize-1.5*ene.size){
   ene.pos.x=cansize-1.5*ene.size;
    ene.pos.dir="left";
   }
 if(ene.pos.y<1.5*ene.size){ 
  ene.pos.y=1.5*ene.size;
   ene.pos.dir="down"; 
  }
 if(ene.pos.y>cansize-1.5*ene.size){ 
  ene.pos.y=cansize-1.5*ene.size;
   ene.pos.dir="up";
   }
}


const enemyFire = (ene) => {
 enemyBullets.push({
  x:ene.pos.x,
  y:ene.pos.y,
  dir:ene.pos.dir,
  size:ene.bulletsize,
  color:ene.bulletcolor,
  speed:ene.bulletspeed
 });
}


const drawBullets = (b) => {
 b.forEach(e=>{
  ctx.fillStyle = e.color;
  ctx.fillRect(e.x - e.size/2, e.y - e.size/2, e.size, e.size);
 });
}


const boxchar = (x,y,size,color,dir)=>{
 ctx.fillStyle=color;
 if(dir==="up"){
  ctx.fillRect(x-size/2,y-1.5*size,size,size);
  ctx.fillRect(x-size/2,y-size/2,size,size);
  ctx.fillRect(x-1.5*size,y-size/2,size,size);
  ctx.fillRect(x+size/2,y-size/2,size,size);
  ctx.fillRect(x+size/2,y+size/2,size,size);
  ctx.fillRect(x-1.5*size,y+size/2,size,size);
 } else if(dir==="down"){
  ctx.fillRect(x-size/2,y+size/2,size,size);
  ctx.fillRect(x-size/2,y-size/2,size,size);
  ctx.fillRect(x-1.5*size,y-size/2,size,size);
  ctx.fillRect(x+size/2,y-size/2,size,size);
  ctx.fillRect(x-1.5*size,y-1.5*size,size,size);
  ctx.fillRect(x+size/2,y-1.5*size,size,size);
 } else if(dir==="left"){
  ctx.fillRect(x-1.5*size,y-size/2,size,size);
  ctx.fillRect(x-size/2,y-size/2,size,size);
  ctx.fillRect(x-size/2,y-1.5*size,size,size);
  ctx.fillRect(x-size/2,y+size/2,size,size);
  ctx.fillRect(x+size/2,y-1.5*size,size,size);
  ctx.fillRect(x+size/2,y+size/2,size,size);
 } else if(dir==="right"){
  ctx.fillRect(x+size/2,y-size/2,size,size);
  ctx.fillRect(x-size/2,y-size/2,size,size);
  ctx.fillRect(x-size/2,y-1.5*size,size,size);
  ctx.fillRect(x-size/2,y+size/2,size,size);
  ctx.fillRect(x-1.5*size,y-1.5*size,size,size);
  ctx.fillRect(x-1.5*size,y+size/2,size,size);
 }
}


const drawEnemy = (e)=>{ 
  boxchar(e.pos.x,e.pos.y,e.size,e.color,e.pos.dir); }

setInterval(()=>{
 enemies.forEach(ene=>{
  enemymover(ene);
  if(Math.random()<0.02){
     enemyFire(ene); 
  }
 });

 moveBullet(bullets);
 moveBullet(enemyBullets);

 ctx.clearRect(0,0,cansize,cansize);

 drawBullets(bullets);
 drawBullets(enemyBullets);

 enemies.forEach(ene=>drawEnemy(ene));

 

 const limit = 1.5 * character.size;

if (character.pos.x > cansize + limit) {
  character.pos.x = -limit;
}
if (character.pos.x < -limit) {
  character.pos.x = cansize + limit;
}
if (character.pos.y > cansize + limit) {
  character.pos.y = -limit;
}
if (character.pos.y < -limit) {
  character.pos.y = cansize + limit;
}

 boxchar(character.pos.x,character.pos.y,character.size,character.color,character.pos.dir);

},20);


window.addEventListener("keypress",(e)=>{
 if(e.code==="KeyW"){ 
  character.pos.y -= character.speed;
   character.pos.dir="up";

  }else if(e.code==="KeyS"){ 
  character.pos.y += character.speed;
  character.pos.dir="down";

  }else if(e.code==="KeyA"){ 
  character.pos.x -= character.speed;
  character.pos.dir="left";

  } else if(e.code==="KeyD"){ 
  character.pos.x += character.speed;
  character.pos.dir="right";

  }else if(e.code==="Space"){

  bullets.push({
   x: character.pos.x,
   y: character.pos.y,
   dir: character.pos.dir,
   size: character.bulletsize,
   color: character.bulletcolor,
   speed: character.bulletspeed
  })
 }
});