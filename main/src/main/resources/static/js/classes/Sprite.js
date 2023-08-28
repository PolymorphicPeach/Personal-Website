class Sprite{
    constructor({
        image,
        position = {x: 0, y: 0},
        scale = 1,
        framesHorizontal = {max: 1},
        framesVertical = {max: 1},
        dialogue = null,
        fullWidth = 128,
        fullHeight = 192,
        }){
            this.image = image;
            this.position = position;
            this.scale = scale;
            this.framesHorizontal = {...framesHorizontal, val: 0, elapsed: 0};
            this.framesVertical = {...framesVertical, val: 0, elapsed: 0};

            this.dialogue = dialogue;

            this.direction = Direction.DOWN;

            this.width = fullWidth / this.framesHorizontal.max * scale;
            this.height = fullHeight / this.framesVertical.max * scale;
            
        }

    draw(){
        context.drawImage(
            this.image,
            this.image.width / this.framesHorizontal.max * this.framesHorizontal.val,
            this.image.height / this.framesVertical.max * this.direction,
            this.image.width / this.framesHorizontal.max,
            this.image.height / this.framesVertical.max,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
        
        ++this.framesHorizontal.elapsed;

        if(this.framesHorizontal.elapsed % 10 === 0){
            if(this.framesHorizontal.val < this.framesHorizontal.max - 1){
                ++this.framesHorizontal.val;
            }
            else{
                this.framesHorizontal.val = 0;
            }
        }
    }

    getCollisionBox(){

        return new Boundary({
            position: {
                x: this.position.x,
                y: this.position.y + 50
            },
            width: this.width - 6,
            height: this.height / 2.1
        })

    }
}