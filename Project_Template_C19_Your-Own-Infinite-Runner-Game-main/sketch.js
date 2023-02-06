var galaxy, galaxyImg;
var spaceship, spaceshipImg;
var meteor, meteorImg, meteorGroup;
var gameState = "play";

function preload(){
  galaxyImg = loadImage("background.jpg");
  spaceshipImg = loadImage("clipart2908532.png");
  meteorImg = loadImage("pngfind.com-asteroid-png-1154244.png");
}

function setup() {
 createCanvas(600,600);
  galaxy = createSprite(600,600);
  galaxy.addImage("galaxy",galaxyImg);
  galaxy.velocityY = 1;

  spaceship = createSprite(150,150,30,30);
  spaceship.addImage("spaceship",spaceshipImg);
  spaceship.scale = 0.08;

  meteorGroup = new Group();
}

function draw() {

  background (200);

  if (gameState == "play"){
    if (keyDown("space")){
      spaceship.velocityY = -8;
    }
    if (keyDown("right_arrow")){
      spaceship.x = spaceship.x +5;
    }
    if (keyDown("left_arrow")){
      spaceship.x = spaceship.x -5;
    }

    spaceship.velocityY = spaceship.velocityY +0.8;

    meteors();

    if (galaxy.y > 400){
      galaxy.y = 300;
    }

    if (meteorGroup.isTouching(spaceship)){
      spaceship.velocityY = 0;
      spaceship.destroy();
      gameState = "end";
    }

    drawSprites();
  }

  if (gameState == "end"){
    textSize(25);
    text("GAME OVER :(",230,250);
  }

  function meteors(){
     
    if (frameCount % 200 == 0){
      meteor = createSprite(300,-20);
      meteor.addImage("meteor",meteorImg);
      meteor.scale = 0.07;
      meteor.velocityY = 2;
      meteor.x = Math.round(random(100,450));
      meteorGroup.add(meteor);
      meteor.lifetime = 600;
      spaceship.depth = meteor.depth;
      spaceship.depth += 1;
    }
  }



}