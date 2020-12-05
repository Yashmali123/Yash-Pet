var dog,dogstand,doghappy;
var database,foodS,foodStock;

function preload()
{
dogstand=loadImage("images/dogImg.png")
doghappy=loadImage("images/dogImg1.png")
}

function setup() {
createCanvas(500,500);
//creating database
database=firebase.database();

// Creating Dog Sprite
dog=createSprite(250,250,50,50)  
dog.scale=0.12
dog.addAnimation("stand",dogstand)
dog.addAnimation("happy",doghappy)

//taking data from firebase
foodStock= database.ref('Food');
foodStock.on("value",readStock,showError);

}

function readStock(data){
foodS=data.val()
}

function writeStock(x){
if(x<=0){
x=0;
}else{
  x=x-1;
}

database.ref('/').update({
  Food:x
})
}

function showError(){
  console.log("Error in writing to the database");
}

function draw() {  



background(46,139,87)
  
if(keyWentDown(LEFT_ARROW)){
writeStock(foodS);
dog.changeAnimation("doghappy")
}

drawSprites();
fill(255);
textSize(20)
textFont("Georgia")
text("Note:Press UP_ARROW to Feed Dog",70,50)
}



