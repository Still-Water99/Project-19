var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostStImg, ghostJuImg;
var invisibleBlockGroup, invisibleBlock;
var PLAY = "play";
var END = "end";
var gameState = PLAY;
var d;

function preload() {
    towerImg = loadImage("tower.png");
    doorImg = loadImage("door.png");
    climberImg = loadImage("climber.png");
    ghostStImg = loadImage("ghost-standing.png");
    ghostJuImg = loadImage("ghost-jumping.png");
    spookySound = loadSound("spooky.wav");
}

function setup() {
    createCanvas(600, 600);
    tower = createSprite(300, 300);
    tower.addImage("tower", towerImg);

    tower.velocityY = 1;

    ghost = createSprite(350, 300);
    ghost.addImage("ghost", ghostStImg);
    ghost.addImage("jumping", ghostJuImg)
    ghost.scale = 0.4;

    doorsGroup = new Group();
    climbersGroup = new Group();
}

function draw() {
    background(0);
    if (gameState == PLAY) {
        spookySound.play();
        if (keyWentDown(UP_ARROW)) {
            ghost.velocityY = -4;
            ghost.changeImage("jumping");
        }
        if (keyWentUp(UP_ARROW)) {
            ghost.changeImage("ghost");
        }
        if (keyDown(LEFT_ARROW)) {
            ghost.x -= 5;
        }
        if (keyDown(RIGHT_ARROW)) {
            ghost.x += 5
        }

        if (tower.y > 400) {
            tower.y = 300
        }

        if (doorsGroup.isTouching(ghost)) {
            gameState = END;
        }
        if (climbersGroup.isTouching(ghost)) {
            ghost.velocityY = 0;
        } else {
            ghost.velocityY += 0.2;
        }
        if (ghost.y > 630) {
            gameState = END;
        }

        createDoors();
    }
    if (gameState == END) {
        doorsGroup.destroyEach();
        climbersGroup.destroyEach();
        ghost.destroy();
        tower.destroy();

        fill("red");
        textSize(20);
        text("Game Over", 230, 230);
    }

    drawSprites();
}

function createDoors() {
    if (frameCount % 150 == 0) {
        door = createSprite(Math.round(random(100, 500)), -50);
        door.addImage("door", doorImg);
        door.velocityY = 2;
        door.setCollider("rectangle", 0, 60, 80, 10);
        d = ghost.depth;
        ghost.depth = door.depth;
        door.depth = d;
        door.lifetime = 400;
        doorsGroup.add(door);

        climber = createSprite(door.x, door.y + 60);
        climber.addImage("climber", climberImg);
        climber.velocityY = 2;
        climber.lifetime = 400;
        climbersGroup.add(climber);
    }
}