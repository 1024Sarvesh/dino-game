const fullSize = 600;
const can = document.getElementById("can");
can.height = fullSize;
can.width = fullSize;
const ctx = can.getContext("2d");

const agent = {
    size:20,
    pos:{ x:300, y:200, dir:"up" },
    color:"red",
    speed:15,
    bulletSpeed:10,
    bulletColor:"yellow",
    bulletSize:10,
    bulletDamage:10,
    health:100
}

const enemy1 ={
    size:20,
    pos:{ x:100, y:100, dir:"up" },
    color:"blue",
    speed:3,
    bulletSpeed:5,
    bulletColor:"green",
    bulletSize:10,
    time:0,
    health:30,
     bulletDamage:2,
}
const enemy2 ={
    size:20,
    pos:{ x:500,y:400,dir:"left" },
    color:"pink",
    speed:3,
    bulletSpeed:5,
    bulletColor:"green",
    bulletSize:10,
    time:0,
    health:40,
     bulletDamage:2,
}
const enemy3 ={
    size:20,
    pos:{ x:200,y:500,dir:"right" },
    color:"aqua",
    speed:3,
    bulletSpeed:5,
    bulletColor:"green",
    bulletSize:10,
    time:0,
    health:60,
     bulletDamage:2,

}
const enemy4 ={
    size:20,
    pos:{ x:400,y:200,dir:"right" },
    color:"gray",
    speed:3,
    bulletSpeed:5,
    bulletColor:"green",
    bulletSize:10,
    time:0,
    health:80,
     bulletDamage:2,
}
const enemy5 ={
    size:40,
    pos:{ x:300,y:500,dir:"right" },
    color:"yellow",
    speed:3,
    bulletSpeed:5,
    bulletColor:"green",
    bulletSize:10,
    time:0,
    health:100,
     bulletDamage:2,
}

const enemies = [enemy1,enemy2,enemy3,enemy4,enemy5];

const bullets = [];
const EnemyBullets = [];

function drawBullets(b){
    b.forEach(e=>{
        ctx.fillStyle = e.color;
        ctx.fillRect(e.x - e.size/2, e.y - e.size/2, e.size, e.size);
    });
}

const DrawCharacter = (x,y,size,color,dir)=>{
    
    ctx.fillStyle = color;

    if(dir === "up"){
        ctx.fillRect(x-size/2,y-size/2,size,size);
        ctx.fillRect(x-size/2,y-1.5*size,size,size);
        ctx.fillRect(x-1.5*size,y-size/2,size,size);
        ctx.fillRect(x+size/2,y-size/2,size,size);
        ctx.fillRect(x-1.5*size,y+size/2,size,size);
        ctx.fillRect(x+size/2,y+size/2,size,size);
    }
    
    else if(dir === "left"){
        ctx.fillRect(x-size/2,y-size/2,size,size);
        ctx.fillRect(x-size/2,y-1.5*size,size,size);
        ctx.fillRect(x-size/2,y+size/2,size,size);
        ctx.fillRect(x-1.5*size,y-size/2,size,size);
        ctx.fillRect(x+size/2,y-1.5*size,size,size);
        ctx.fillRect(x+size/2,y+size/2,size,size);
    }
    
    else if(dir==="right"){
        ctx.fillRect(x-size/2,y-size/2,size,size);
        ctx.fillRect(x+size/2,y-size/2,size,size);
        ctx.fillRect(x-size/2,y-1.5*size,size,size);
        ctx.fillRect(x-size/2,y+size/2,size,size);
        ctx.fillRect(x-1.5*size,y+size/2,size,size);
        ctx.fillRect(x-1.5*size,y-1.5*size,size,size);
    }
    
    else if(dir==="down"){
        ctx.fillRect(x-size/2,y-size/2,size,size);
        ctx.fillRect(x-size/2,y+size/2,size,size);
        ctx.fillRect(x-1.5*size,y-size/2,size,size);
        ctx.fillRect(x+size/2,y-size/2,size,size);
        ctx.fillRect(x-1.5*size,y-1.5*size,size,size);
        ctx.fillRect(x+size/2,y-1.5*size,size,size);
    }
}

const moveBullet = (b) => {

 b.forEach(e=>{
  if(e.dir==="up") {
    e.y -= e.speed;}
  else if(e.dir==="down") {
    e.y += e.speed;}
  else if(e.dir==="left") {
    e.x -= e.speed;}
  else if(e.dir==="right") {
    e.x += e.speed;}
 })

 for(let i=b.length-1;i>=0;i--){
  if(b[i].x<0 || b[i].x>fullSize || b[i].y<0 || b[i].y>fullSize || b[i].ishitted){
   b.splice(i,1);
  }
 }
}

const drawEnemies = ()=>{
    enemies.forEach(e=>{
        DrawCharacter(e.pos.x,e.pos.y,e.size,e.color,e.pos.dir);
    });
}

const EnemyFire = (e)=>{

    if((Math.random()) < 0.04){

        EnemyBullets.push({
            x:e.pos.x,
            y:e.pos.y,
            dir:e.pos.dir,
            color:e.bulletColor,
            speed:e.bulletSpeed,
            size:e.bulletSize,
            damage:e.bulletDamage,
            owner:"enemies"
        })

    }

}

const moveEnemies = ()=>{

    enemies.forEach(e=>{

        e.time++;

        if(e.time % 40 === 0){
            const directions = ["up","down","left","right"];
            e.pos.dir = directions[Math.floor(Math.random()*4)];
        }

        if(e.pos.dir === "up"){
            e.pos.y -= e.speed;
        }
        else if(e.pos.dir === "down"){
            e.pos.y += e.speed;
        }
        else if(e.pos.dir === "left"){
            e.pos.x -= e.speed;
        }
        else if(e.pos.dir === "right"){
            e.pos.x += e.speed;
        }

        
        EnemyFire(e);

        
        const limit = 1.5 * e.size;

        if(e.pos.x < limit){
            e.pos.x = limit;
        }

        if(e.pos.x > fullSize - limit){
            e.pos.x = fullSize - limit;
        }

        if(e.pos.y < limit){
            e.pos.y = limit;
        }

        if(e.pos.y > fullSize - limit){
            e.pos.y = fullSize - limit;
        }

    });

}



const BulletHitted = (b)=>{

    b.forEach((b)=>{

        if(b.owner === "agent"){

       enemies.forEach((e,i)=>{
         if(Math.abs(b.x - e.pos.x) < 1.5* e.size + b.size /2 &&
           Math.abs(b.y - e.pos.y) < 1.5*e.size + b.size/2){
                   b.ishitted = true;
                   e.health= e.health-b.damage;
                      if (e.health <= 0) {
                     console.log("killed")
                     Killed++;
                     KillbyAgent();
                     enemyKilled()
                     enemies.splice(i, 1)
                  }
                }
            });
        }

        if(b.owner === "enemies"){
                if(Math.abs(b.x - agent.pos.x) < 1.5*agent.size + b.size/2 &&
               Math.abs(b.y - agent.pos.y) < 1.5*agent.size + b.size/2){
                b.ishitted = true
                agent.health -= b.damage
                    Health = Health - 2;
                console.log("agent health:",agent.health)
                if(agent.health <= 0){
                    let gameOver = false;
    console.log("GAME OVER")
    alert("Game Over")
    gameOver = true

    setTimeout(()=>{
        location.reload()
    },20)
}
                
            }
        }
        }
   ) }
   let score = 0;
   function enemyKilled() {
        score = score + 5;
    document.getElementById("score").innerText = "Score : " + score;
}



let Health = agent.health;
function AgentHealth(){
    document.getElementById("Health").innerText = "Health : " + Health
}
let Killed = 0;
function KillbyAgent(){
    document.getElementById("Killed").innerText = "Killed : " + Killed
}






const maxEnemy = 5;
const EnemyCount = ()=>{
    const NextEnemy = ()=>{
        const Directions = ["up","down","left","right"];
        const color = ["red","pink","blue","green","orange","gray","yellow","whiteSmoke"];

        const EnemyDoner = {
            size:20 + Math.floor(Math.random()*20),
            pos:{
                x:Math.random()*fullSize,
                y:Math.random()*fullSize,
                dir:Directions[Math.floor(Math.random()*Directions.length)]
            },
            color:color[Math.floor(Math.random()*color.length)],
            speed:2,
            bulletSpeed:5 + Math.floor(Math.random()*5),
            bulletColor:"green",
            bulletSize:10,
            time:0,
            health:100 + Math.floor(Math.random()*100),
            bulletDamage:5
        }

        enemies.push(EnemyDoner);
    }

    while(enemies.length < maxEnemy){
        NextEnemy();
    }
}




setInterval(()=>{
    
    EnemyCount();
    moveBullet(EnemyBullets);
    moveEnemies();
    BulletHitted(bullets)
    BulletHitted(EnemyBullets)
    moveBullet(bullets);
    AgentHealth();

    ctx.clearRect(0,0,fullSize,fullSize);
    drawBullets(EnemyBullets);
    drawBullets(bullets);
    drawEnemies();
    DrawCharacter(agent.pos.x,agent.pos.y,agent.size,agent.color,agent.pos.dir );
},20);

window.addEventListener("keydown",(e)=>{

    if(e.code === "KeyW"){
        agent.pos.y -= agent.speed;
        agent.pos.dir = "up";
    }

    else if(e.code === "KeyS"){
        agent.pos.y += agent.speed;
        agent.pos.dir = "down";
    }

    else if(e.code === "KeyA"){
        agent.pos.x -= agent.speed;
        agent.pos.dir = "left";
    }

    else if(e.code === "KeyD"){
        agent.pos.x += agent.speed;
        agent.pos.dir = "right";
    }

    else if(e.code === "Space"){

        bullets.push({
            x: agent.pos.x,
            y: agent.pos.y,
            dir: agent.pos.dir,
            color: agent.bulletColor,
            speed: agent.bulletSpeed,
            size: agent.bulletSize,
            owner:"agent",
            damage:agent.bulletDamage
        });

    }

     if (agent.pos.x > fullSize + agent.size * 1.5) {
    agent.pos.x = -1.5 * agent.size
  } else if (agent.pos.x < -1.5 * agent.size) {
    agent.pos.x = fullSize + agent.size * 1.5
  } else if (agent.pos.y > fullSize + agent.size * 1.5) {
    agent.pos.y = -1.5 * agent.size
  } else if (agent.pos.y < -1.5 * agent.size) {
    agent.pos.y = fullSize + agent.size * 1.5
  }

});