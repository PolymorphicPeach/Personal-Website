const npcs = [];
const boundaries = [];

const fishermanImage = new Image();
fishermanImage.src = "/images/Fisherman/Fisherman_idle.png"

fishermanImage.onload = () => {
    console.log("done loading")
}

const fisherman = new Sprite({image: fishermanImage, 
    scale: 2, 
    framesHorizontal: {max: 4}, 
    framesVertical: {max: 4},
    position: {
        x: offset.x + 1300,
        y: offset.y + 2400},
    dialogue: aerialDialogue});

npcs.push(fisherman);
boundaries.push(fisherman.getCollisionBox());


const alchemistImage = new Image();
alchemistImage.src = "/images/Alchemist/Alchemist_idle.png"
const alchemist = new Sprite({image: alchemistImage, 
    scale: 2, 
    framesHorizontal: {max: 4}, 
    framesVertical: {max: 4},
    position: {
        x: offset.x + 1600,
        y: offset.y + 1350},
    dialogue: ufoDialogue});

npcs.push(alchemist);
boundaries.push(alchemist.getCollisionBox());

const barmaidImage = new Image();
barmaidImage.src = "/images/Barmaid/Barmaid_idle.png"
const barmaid = new Sprite({image: barmaidImage, 
    scale: 2, 
    framesHorizontal: {max: 4}, 
    framesVertical: {max: 4},
    position: {
        x: offset.x + 3350,
        y: offset.y + 1200},
    dialogue: bigfootDialogue});

npcs.push(barmaid);
boundaries.push(barmaid.getCollisionBox());

const blacksmithImage = new Image();
blacksmithImage.src = "/images/Blacksmith/Blacksmith_idle.png"
const blacksmith = new Sprite({image: blacksmithImage, 
    scale: 2, 
    framesHorizontal: {max: 4}, 
    framesVertical: {max: 4},
    position: {
        x: offset.x + 2500,
        y: offset.y + 700},
    dialogue: podcastDialogue});

npcs.push(blacksmith);
boundaries.push(blacksmith.getCollisionBox());

const merchantImage = new Image();
merchantImage.src = "/images/Merchant/Merchant_idle.png"
const merchant = new Sprite({image: merchantImage, 
    scale: 2, 
    framesHorizontal: {max: 4}, 
    framesVertical: {max: 4},
    position: {
        x: offset.x + 1650,
        y: offset.y + 2150},
    dialogue: welcomeDialogue});

npcs.push(merchant);
boundaries.push(merchant.getCollisionBox());