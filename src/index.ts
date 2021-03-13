import { TSConfigReader } from "typedoc";
import { Mouse } from "./type";

// canvas setup
const canvas = <HTMLCanvasElement>document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

let score: number = 0;
let gameFrame: number = 0;
if (ctx) {
    ctx.font = "50px sans-serif";
}

// mouse intercativity
let canvasPosition: DOMRect = canvas.getBoundingClientRect();
const mouse: Mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    click: false
}

canvas.addEventListener("mousedown", function (event: MouseEvent) {
    mouse.click = true;
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
    console.log(mouse.x, mouse.y);
})

canvas.addEventListener("mouseup", function (event: MouseEvent){
    mouse.click = false;
}) 

// player

class Player {
    x: number;
    y: number;
    radius: number;
    angle: number;
    frameX: number;
    frameY: number;
    frame: number;
    spriteWidth: number;
    spriteHeight: number;
    constructor() {
        this.x = canvas.width;
        this.y = canvas.height / 2;
        this.radius = 50;
        this.angle = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.spriteWidth = 498;
        this.spriteHeight = 327;
    }

    update() {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        if (mouse.x != this.x) {
            this.x -= dx / 30;
        }
        if (mouse.y != this.y) {
            this.y -= dy / 30
        }
    }
    draw() {
        if (!ctx) return;
        if (mouse.click) {
            ctx.lineWidth = 0.2
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y,this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        
    }
}
const player = new Player();
// bubbles
const bubblesArray: Bubble[] = [];
class Bubble {
    x: number;
    y: number;
    radius: number;
    speed: number;
    distance: number = 1000;
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height +  Math.random() * canvas.height;
        this.radius = 50;
        this.speed = Math.random() * 5 +1;
    }
    update() {
        this.y -= this.speed;
    }
    draw() {
       if (!ctx) return;
       ctx.fillStyle = "blue";
       ctx.beginPath();
       ctx.arc(this.x, this.y, this.radius, 0 , Math.PI * 2);
       ctx.fill();
       ctx.closePath();
       ctx.stroke();
    }
}

function handleBubbles() {
    if (gameFrame % 50 == 0) {
        bubblesArray.push(new Bubble());
        console.log(bubblesArray.length);
    }
    for( let i = 0; i < bubblesArray.length; i++) {
        bubblesArray[i].update();
        bubblesArray[i].draw();
    }
    for( let i = 0; i < bubblesArray.length; i++) {
        if (bubblesArray[i].y < 0 - bubblesArray[i].radius) {
            bubblesArray.splice(i,1);
        }
        // if (bubblesArray[i].distance)
    }
}


// animation loop
function animate() {
    if (!ctx) return;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    handleBubbles();
    player.update();
    player.draw();
    ctx.fillStyle = "black";
    ctx.fillText("得分：" + score, 10 ,50);
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();
