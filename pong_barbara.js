let pontoEsquerda = 0;
let pontoDireita = 0;

function setup() {
  createCanvas(600, 400);
  bolinha = new bolinha();
  esquerda = new raquete(true);
  direita = new raquete(false);
}

function draw() {
  background("#FD5DA8");
  
  
  bolinha.checarRaqueteDireita(direita);
  bolinha.checarRaqueteEsquerda(esquerda);
  
  esquerda.show();
  direita.show();
  esquerda.update();
  direita.update();
  
  bolinha.update();
  bolinha.edges();
  bolinha.show();
  
  fill(255);
  textSize(32);
  text(pontoEsquerda, 32, 40);
  text(pontoDireita, width-64, 40);
}

function keyReleased() {
    esquerda.move(0);
    direita.move(0);
}

function keyPressed() {
    console.log(key);
    if (key == 'w') {
        esquerda.move(-10);
    } else if (key == 's') {
        esquerda.move(10);
    }

    if (key == 'o') {
        direita.move(-10);
    } else if (key == 'k') {
        direita.move(10);
    }
}

class bolinha {
    constructor() {
        this.x = width/2;
        this.y = height/2;
        this.xspeed = 0;
        this.yspeed = 0;
        this.r = 12;
        this.reset();
    }
    
    update() {
        this.x += this.xspeed;
        this.y += this.yspeed;
    }
  
   
    checarRaqueteEsquerda(p) {
        if (this.y - this.r < p.y + p.h/2 &&
            this.y + this.r > p.y - p.h/2 &&
            this.x - this.r < p.x + p.w/2) {
                
            if (this.x > p.x) {
                let diff = this.y - (p.y - p.h/2);
                let rad = radians(45);
                let angle = map(diff, 0, p.h, -rad, rad);
                this.xspeed = 5 * cos(angle);
                this.yspeed = 5 * sin(angle);
                this.x = p.x + p.w/2 + this.r;
            }
            
        }
    }
    checarRaqueteDireita(p) {
        if (this.y - this.r < p.y + p.h/2 &&
            this.y + this.r > p.y - p.h/2 &&
            this.x + this.r > p.x - p.w/2) {
                
            if (this.x < p.x) {
                let diff = this.y - (p.y - p.h/2);
                let angle = map(diff, 0, p.h, radians(225), radians(135));
                this.xspeed = 5 * cos(angle);
                this.yspeed = 5 * sin(angle);
                this.x = p.x - p.w/2 - this.r;
            }
        }
    }
    
    reset() {
        this.x = width/2;
        this.y = height/2;
        let angle = random(-1, 1);
        this.xspeed = 5 * Math.cos(angle);
        this.yspeed = 5 * Math.sin(angle);
        
        if (random(1) < 0.5) {
            this.xspeed *= -1;
        }
    }
  
      edges() {
        if (this.y < 0 || this.y > height) {
            this.yspeed *= -1;
        }
        
        if (this.x - this.r > width) {
            pontoEsquerda++;
            this.reset();
        }
        
        if (this.x + this.r < 0) {
          pontoDireita++;
            this.reset();
        }
    }
  
    show() {
        fill(255);
        ellipse(this.x, this.y, this.r*2);
    }
}

class raquete {
    constructor(isLeft) {
        this.y = height/2;
        this.w = 20;
        this.h = 100;
        this.ychange = 0;
        
        if (isLeft) {
            this.x = this.w;
        } else {
            this.x = width - this.w;
        }      
    }
    
    update() {
        this.y += this.ychange;
        this.y = constrain(this.y, this.h/2, height-this.h/2);
    }
    
    move(steps) {
        this.ychange = steps;
    }
    
    show() {
        fill(255);
        rectMode(CENTER);
        rect(this.x, this.y, this.w, this.h);
    }
}