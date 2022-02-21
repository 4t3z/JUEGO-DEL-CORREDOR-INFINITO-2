var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var bg,bgimg;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadAnimation("gameOver.png");
  bgimg = loadImage("bg.jpg");
}
function setup(){
  createCanvas(displayWidth-300,displayHeight-280);
// Moving background
path=createSprite(displayWidth/2-140,200);
path.addImage(pathImg);
path.velocityY = 4;

//creating boy running
boy = createSprite(70,height-50,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
bg = createSprite(displayWidth-830,displayHeight-300);
bg.addImage(bgimg);
bg.scale=2.2;
bg.depth = bg.depth-10;

cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();
}
function draw() {
  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+100;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection= treasureCollection + 150;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState=END;
        
        boy.addAnimation("SahilRunning",endImg);
        boy.x=width/2+8;
        boy.y=250;
        boy.scale=0.6;
        
        cashG.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        swordGroup.destroyEach();
        
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
    }
  }
  
  if(path.y>height){
    path.y = windowWidth - 30
  }
    
  console.log(gameState);

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,width - 160,30);

  fill("black");
  textSize(30);
  text("¡ATRAPA LOS TESOROS! ¡Ten cuidado con las espadas!",50,30);
  text("-----------------------------------------------------------------------------",50,50);

  
  if(gameState === END){
    fill("black");
    textSize(20);
    text("¡Presiona 'r' para volver a empezar!",width/2-150,300);
  }
  }
  if(gameState === END && keyDown("R")){
    gameState=PLAY;

    boy.addAnimation("SahilRunning",boyImg);
    boy.y=boy.y+170;
    boy.scale=0.08;

    treasureCollection = 0;
  }
}
function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, width - 50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 300;
  cashG.add(cash);
  }
}
function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, width - 50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 300;
  diamondsG.add(diamonds);
  }
}
function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, width - 50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 300;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, width - 50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 300;
  swordGroup.add(sword);
  }
}