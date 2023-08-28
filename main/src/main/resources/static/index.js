//=======================================================================
//                          Player
//=======================================================================

const ninjaImage = new Image();
ninjaImage.src = "/images/RedNinja/SpriteSheet.png"
const player = new Player({image: ninjaImage, 
    scale: 3, 
    framesHorizontal: {max: 4}, 
    framesVertical: {max: 7},
    position: {
        x: canvas.width / 2,
        y: canvas.height / 2},
    velocity: 1.0});

const keys = {
    w:{
        pressed: false
    },
    a:{
        pressed: false
    },
    s:{
        pressed: false
    },
    d:{
        pressed: false
    },
    ArrowUp:{
        pressed: false
    },
    ArrowLeft:{
        pressed: false
    },
    ArrowDown:{
        pressed: false
    },
    ArrowRight:{
        pressed:false
    }
}

//=======================================================================
//                      Map / Boundary Setup
//=======================================================================

console.log(fisherman.image.width)
console.log(fisherman.image.height)

const mapImage = new Image();
mapImage.src = "/images/maps/background1.png";
const map = new NavigableMap({image: mapImage, 
    scale: 3, 
    mapWidth: 100, mapHeight: 70,
    position: {
        x: offset.x,
        y: offset.y
    }});

map.setArrayMap(HomeIslandArrayMap);

for(let i = 2; i < 7; ++i){
    let img = new Image();
    img.src = "/images/maps/background" + i + ".png"
    map.addFrame(img);
}

const foregroundImage = new Image();
foregroundImage.src = "/images/maps/foreground.png"
const foreground = new NavigableMap({image: foregroundImage,
    mapWidth: 100,
    mapHeight: 70,
    position: {
        x: offset.x,
        y: offset.y},
    scale: 3});


map.arrayMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol === 1980){
            boundaries.push(new Boundary({
                position: {
                    x: j * 48 + offset.x,
                    y: i * 48 + offset.y}}))
        }
    })
});



//======================================================================
//                            Movables
//======================================================================
const movables = [...boundaries, ...npcs, map, foreground];

//======================================================================
//                           Main Loop
//======================================================================
let lastMovement = Direction.DOWN;
let actionButton = false;
let prevTime = 0.0;
let interactingNPC = null;


const mainLoop = time =>{
    const deltaTime = time - prevTime;
    prevTime = time;

    update(deltaTime);
    render();

    window.requestAnimationFrame(mainLoop);

};

window.requestAnimationFrame(time => {
    prevTime = time;
    window.requestAnimationFrame(mainLoop);
});


function update(deltaTime){
    controller(deltaTime);
    checkNPCs();
}

function render(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    map.draw();
    player.draw();
    

    boundaries.forEach(boundary => {
        boundary.draw();
    })

    npcs.forEach(npc => {
        npc.draw();
    })

    foreground.draw();
    
}

//===================================================================


function controller(deltaTime){

    if(keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed ||
        keys.ArrowUp.pressed || keys.ArrowLeft.pressed || keys.ArrowDown.pressed || 
        keys.ArrowRight.pressed){

            if(interactingNPC !== null){
                interactingNPC = null;
                document.getElementById("npcDialogueBox").style.opacity = "0";
                document.getElementById("npcDialogueBox").style.pointerEvents = "none";
                document.getElementById("contentDiv").style.opacity = "0";
                document.getElementById("contentDiv").style.pointerEvents = "none";

            }

            player.moving = true;
    }
    else{
        player.moving = false;
    }

    if(keys.ArrowUp.pressed || keys.w.pressed && lastMovement === Direction.UP){
        player.direction = Direction.UP;
        checkCollision(Direction.UP);

        if(player.moving){

            movables.forEach(movable => {
                movable.position.y += player.velocity * deltaTime / map.scale;
            });
        }

        
    }
    else if(keys.ArrowLeft.pressed || keys.a.pressed && lastMovement === Direction.LEFT){
        player.direction = Direction.LEFT;
        checkCollision(Direction.LEFT);

        if(player.moving){
            
            movables.forEach(movable => {
                movable.position.x += player.velocity * deltaTime / map.scale;
            });
        }


    }
    else if(keys.ArrowDown.pressed || keys.s.pressed && lastMovement === Direction.DOWN){
        player.direction = Direction.DOWN;
        checkCollision(Direction.DOWN);

        if(player.moving){

            movables.forEach(movable => {
                movable.position.y -= player.velocity * deltaTime / map.scale;
            })

            
        }


    }
    else if(keys.ArrowRight.pressed || keys.d.pressed && lastMovement === Direction.RIGHT){
        player.direction = Direction.RIGHT;
        checkCollision(Direction.RIGHT);

        if(player.moving){
            
            movables.forEach(movable => {
                movable.position.x -= player.velocity * deltaTime / map.scale;
            })

        }

    }
}

function checkCollision(movementDirection){

    for(let i = 0; i < boundaries.length; ++i){

        const boundary = boundaries[i];

        if(movementDirection === Direction.UP){
            if(rectangularCollision({
                rectangle1: player,
                rectangle2: {...boundary, 
                    position: {x: boundary.position.x, y: boundary.position.y + 3} }
            }))
            {
                player.moving = false;
                break;
            }
        }
        else if(movementDirection === Direction.LEFT){
            if(rectangularCollision({
                rectangle1: player,
                rectangle2: {...boundary, 
                    position: {x: boundary.position.x + 3, y: boundary.position.y} }
            }))
            {
                player.moving = false;
                break;
            }
    
        }
        else if(movementDirection === Direction.DOWN){
            if(rectangularCollision({
                rectangle1: player,
                rectangle2: {...boundary, 
                    position: {x: boundary.position.x, y: boundary.position.y - 3} }
            }))
            {
                player.moving = false;
                break;
            }
    
        }
        else if(movementDirection === Direction.RIGHT){
            if(rectangularCollision({
                rectangle1: player,
                rectangle2: {...boundary, 
                    position: {x: boundary.position.x - 3, y: boundary.position.y} }
            }))
            {
                player.moving = false;
                break;
            }
        }
    }
}

// Conditions:  Rectangle1's right side touches/crosses rectangle2's left side
//              Rectangle1's left side touches/crosses rectangle2's right side
//            * Rectangle1's top touches/crosses rectangle2's bottom
//              Rectangle1's bottom touches/crosses rectangle2's top

// * Random "+ 8" because the sprite height seems a bit high for what's actually drawn
 function rectangularCollision({rectangle1, rectangle2}){
    return(rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y + 8<= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height > rectangle2.position.y);
}

function checkNPCs(){

    if(actionButton){
        for(let i = 0; i < npcs.length; ++i){
            const npcBoundary = npcs[i].getCollisionBox();

            if(player.direction === Direction.UP){
                if(player.position.x + (player.width / 2) > npcBoundary.position.x && 
                    player.position.x < npcBoundary.position.x + npcBoundary.width){

                    if(player.position.y < npcBoundary.position.y + npcBoundary.height && 
                        player.position.y > npcBoundary.position.y){
                        //console.log("ACTION UP")

                        npcs[i].direction = 0;
                        interactingNPC = npcs[i];
                        break;
                    }
                }
            }
            else if(player.direction === Direction.LEFT){
                if (player.position.y > npcBoundary.position.y * 0.90 && 
                      player.position.y < npcBoundary.position.y + npcBoundary.height - (player.height / 2)){

                        if(player.position.x - (npcBoundary.position.x + npcBoundary.width) <= 3 &&
                            player.position.x > npcBoundary.position.x){
                                //console.log("ACTION LEFT")

                                npcs[i].direction = 2;
                                interactingNPC = npcs[i];
                                break;
                            }
                }
            }
            else if(player.direction === Direction.DOWN){
                if(player.position.x + (player.width / 3) > npcBoundary.position.x && 
                    player.position.x < npcBoundary.position.x + npcBoundary.width){

                    if(player.position.y + player.height + 3 > npcBoundary.position.y && 
                        player.position.y < npcBoundary.position.y){
                        //console.log("ACTION DOWN")

                        npcs[i].direction = 3;
                        interactingNPC = npcs[i];
                        break;
                    }  
                }
            }
            else if(player.direction === Direction.RIGHT){
                if (player.position.y > npcBoundary.position.y * 0.90 && 
                    player.position.y < npcBoundary.position.y + npcBoundary.height - (player.height / 2)){

                      if(npcBoundary.position.x - player.position.x - player.width <= 3 && 
                            player.position.x < npcBoundary.position.x){
                              //console.log("ACTION RIGHT")

                              npcs[i].direction = 1;
                              interactingNPC = npcs[i];
                              break;
                        }
                }
            }
        }

        if(interactingNPC !== null){

            document.getElementById("npcDialogueBox").style.opacity = "1";
            document.getElementById("npcDialogueBox").style.pointerEvents = "visible";

            document.getElementById("npcDialogue").innerText = interactingNPC.dialogue.welcome;
            document.getElementById("button1").innerText = interactingNPC.dialogue.playerOptions.option1;
            document.getElementById("button2").innerText = interactingNPC.dialogue.playerOptions.option2;
            document.getElementById("button3").innerText = interactingNPC.dialogue.playerOptions.option3;
            document.getElementById("button4").innerText = interactingNPC.dialogue.playerOptions.option4;
        }
    }


}

function processPlayerResponse(response){
    if(!player.moving && interactingNPC !== null){

        switch(response){
            case 1:
                document.getElementById("npcDialogue").innerText = interactingNPC.dialogue.responses.one;
                break;
            
            case 2:
                document.getElementById("npcDialogue").innerText = interactingNPC.dialogue.responses.two;
                break;

            case 3:
                document.getElementById("npcDialogue").innerText = interactingNPC.dialogue.responses.three;
                break;

            
            case 4:
                document.getElementById("npcDialogue").innerText = interactingNPC.dialogue.responses.four;
                break;
        }

        if(interactingNPC.dialogue.showIframeOn === response){
            document.getElementById("externalContent").src = interactingNPC.dialogue.iframeAddress;
            document.getElementById("contentDiv").style.opacity = "1";
            document.getElementById("contentDiv").style.pointerEvents = "visible"
        }

    } 
}


// Event Listeners
window.addEventListener("keydown", (event) => {

    switch(event.key){
        case "x":
            actionButton = true;
            break;

        case "w":
            keys.w.pressed = true;
            lastMovement = Direction.UP;
            break;

        case "a":
            keys.a.pressed = true;
            lastMovement = Direction.LEFT;
            break;

        case "s":
            keys.s.pressed = true;
            lastMovement = Direction.DOWN;
            break;

        case "d":
            keys.d.pressed = true;
            lastMovement = Direction.RIGHT;
            break;

        case "ArrowUp":
            keys.ArrowUp.pressed = true;
            lastMovement = Direction.UP;
            break;

        case "ArrowLeft":
            keys.ArrowLeft.pressed = true;
            lastMovement = Direction.LEFT;
            break;

        case "ArrowDown":
            keys.ArrowDown.pressed = true;
            lastMovement = Direction.DOWN;
            break;

        case "ArrowRight":
            keys.ArrowRight.pressed = true;
            lastMovement = Direction.RIGHT;
            break;
    }
});

window.addEventListener("keyup", (event) => {
    switch(event.key){
        case "x":
            actionButton = false;
            break;

        case "w":
            keys.w.pressed = false;
            break;

        case "a":
            keys.a.pressed = false;
            break;

        case "s":
            keys.s.pressed = false;
            break;

        case "d":
            keys.d.pressed = false;
            break;

        case "ArrowUp":
            keys.ArrowUp.pressed = false;
            break;

        case "ArrowLeft":
            keys.ArrowLeft.pressed = false;
            break;

        case "ArrowDown":
            keys.ArrowDown.pressed = false;
            break;

        case "ArrowRight":
            keys.ArrowRight.pressed = false;
            break;
    }
});