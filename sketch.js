
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 backImage=loadImage("th (52).jpg");
  groundImage=loadImage("th (55).jpg");
}



function setup() {
  createCanvas(600,300);
  
  
  
  ground=createSprite(300,280,600,3);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
 
  ground.shapeColor="black";
  
  
  
  monkey=createSprite(30,250)
monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  obstaclesGroup = createGroup();
  bananaGroup = createGroup();
  
  
  bananas=0;
  survivalTime=0;
}


function draw() {
background(200);
  
  textSize(20);
  
  
  
  
  fill("green")
  survivalTime=Math.ceil(frameCount/frameRate())
  text("survivaltime:"+survivalTime,100,50);
  text("Bananas:"+bananas,300,50);
  
  ground.velocityX =-(4 + 3* survivalTime/10)
    //scoring
    
  
  
  if(keyDown("space")&& monkey.y >= 150) {
        monkey.velocityY = -10;
        
    }
    if(monkey.isTouching(bananaGroup)){
      bananas=bananas+1;
    }
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
  
  ground.x=ground.width/2;
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  
  
  //when monkey touches banana
  if(bananaGroup.isTouching(monkey)){
    survivalTime=survivalTime+5;
    bananaGroup.destroyEach();
    
  }
  
  
  monkey.collide(ground);
  
  
  if(obstaclesGroup.isTouching(monkey)){
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0); 
    survivalTime=0;
    
    
  }
  
  spawnObstacles();
  spawnBananas();
  drawSprites();
}

function spawnObstacles(){
  if (frameCount % 90 === 0){
   var obstacle = createSprite(600,263,10,40);
   obstacle.velocityX = -(6 + survivalTime/10);
    obstacle.addImage(obstacleImage);
    
    
    
    
    
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  
    
  }
  
  
  
  
  
  
  
}

function spawnBananas(){
  
  if (frameCount % 120 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,150));
    banana.addImage(bananaImage);
    banana.scale = 0.5;
    banana.velocityX = -9;
    banana.scale=0.1;
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    bananaGroup.add(banana);
    
  }
}


