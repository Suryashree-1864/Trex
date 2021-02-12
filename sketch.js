var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var ground2;
var cloud;
var cloudp;
var ob1, ob2, ob3, ob4, ob5, ob6;
var store;
var score;
var gameState;
var cloudg, cactusg;
var gameover, gameend;
var restart, rewind;
var jump, die, checkpoint;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");

  groundImage = loadImage("ground2.png");
  
  cloudp = loadImage("cloud.png");
  
  ob1 = loadImage ("obstacle1.png");
  ob2 = loadImage ("obstacle2.png");
  ob3 = loadImage ("obstacle3.png");
  ob4 = loadImage ("obstacle4.png");
  ob5 = loadImage ("obstacle5.png");
  ob6 = loadImage ("obstacle6.png");
  
  gameover = loadImage ("gameOver.png");
  restart = loadImage ("restart.png");
  
  die= loadSound ("die.mp3");
  jump= loadSound ("jump.mp3");
  checkpoint= loadSound ("checkPoint.mp3");
}

function setup() {
  createCanvas(600, 200);
  
  //create a trex sprite
  trex = createSprite(50, 180, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation("stop", trex_collided );

  //create a ground sprite
  ground = createSprite(300, 180, 600, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  
  
  //create a ground2 sprite
  ground2 = createSprite (300, 185, 600, 5);
  ground2.visible = false;
  
  //create restart and gameover sprite
  gameend = createSprite(300, 100, 10, 10);
  gameend.addImage("a", gameover);
  gameend.scale = 0.5;
  gameend.visible = false;
  
  rewind = createSprite(300, 140, 10, 10);
  rewind.addImage("b", restart);
  rewind.scale = 0.4;
  rewind.visible = false;
  
  //creating score
  score = 0;
  
  //working on groups
  cloudg = new Group()
  
  cactusg = new Group()
  
  //working on game state
  gameState = "play"; 
  
  //fixing the trex
  trex.setCollider("circle", 0, 0, 50);
  //trex.debug= true;
  
}

function draw() {
  background("orange");
  //console.log(getFrameRate());
  
if (gameState === "play"){
      
      ground.velocityX = -(6+ 3*score/100);
  
      //jump when the space button is pressed
      if (keyDown("space") && trex.y>= 157.5 ) {
        trex.velocityY = -12;
        jump.play();
      }

  //console.log(trex.y);
     //implementation of gravity
     trex.velocityY = trex.velocityY + 0.8

    // resetting to make infinite ground
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
  
   //formation of cloud
   displayclouds()
  
   //formation of obstacles
   displayobstacles()
  
   //creating score
   //score = Math.round(frameCount/ 4);
  score = score+Math.round(getFrameRate()/60);
  if (score% 100 === 0 && score>0) {
    checkpoint.play();
  }
  
  //restarting game
  if (cactusg.isTouching(trex)){
    gameState = "end";
    die.play();
    
    //creating AI in trex
    //trex.velocityY = -12;
    //jump.play();
  }
}
  
  else if (gameState === "end"){
  ground.velocityX = 0;
  cloudg.setVelocityXEach(0);
  cactusg.setVelocityXEach(0);
  cloudg.setLifetimeEach(-1);
  cactusg.setLifetimeEach(-1);
  trex.changeAnimation("stop", trex_collided);
  trex.velocityY= 0;
  gameend.visible = true;
  rewind.visible = true;
    if( mousePressedOver(rewind)){
      gameState = "play";
      rewind.visible = false;
      gameend.visible = false;
      cloudg.destroyEach();
      cactusg.destroyEach();
      trex.changeAnimation("running", trex_running);
      score = 0;
      
    }
}
  
  //displaying score
  text ("Score: " + score, 400, 50);
  
  trex.collide(ground2);
  drawSprites();
}

function displayclouds (){
  if (frameCount% 50 === 0){
  cloud= createSprite (600, 100, 10, 20);
  cloud.velocityX = -5;
  cloud.y = Math.round(random (10, 100));
  cloud.addImage( "floating", cloudp);
  cloud.scale = 0.2;
  cloud.depth = trex.depth;
  trex.depth = trex.depth + 1;
  cloud.lifetime = 120; 
  cloudg.add(cloud);
 } 
}

function displayobstacles (){
  if (frameCount% 100 === 0){
  var obstacles = createSprite (600, 170, 10, 20);
  obstacles.velocityX = ground.velocityX;
    store = Math.round(random (1, 6)); 
    switch(store){
      case 1:
        obstacles.addImage ("cac1", ob1 );
        break;
        
        case 2:
        obstacles.addImage ("cac2", ob2 );
        break;
        
        case 3:
        obstacles.addImage ("cac3", ob3 );
        break;
        
        case 4:
        obstacles.addImage ("cac4", ob4 );
        break;
        
        case 5:
        obstacles.addImage ("cac5", ob5 );
        break;
        
        case 6:
        obstacles.addImage ("cac6", ob6 );
        break;
        
        default:
        break;
        
    }
    obstacles.scale = 0.5;
    
    //time is equal to distance/speed
    obstacles.lifetime = 120; 
    cactusg.add(obstacles);
  }
  
}