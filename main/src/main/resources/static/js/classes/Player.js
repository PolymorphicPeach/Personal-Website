class Player{
    constructor({
        image,
        position = {x: 0, y: 0},
        scale = 1,
        framesHorizontal = {max: 1},
        framesVertical = {max: 1},
        velocity = 0.75
        }){
            this.image = image;
            this.position = position;
            this.scale = scale;
            this.framesHorizontal = {...framesHorizontal, val: 0, elapsed: 0};
            this.framesVertical = {...framesVertical, val: 0, elapsed: 0};
            this.velocity = velocity;

            this.direction = Direction.DOWN;
            this.moving = false;

            this.timeAccumulator = 0;

            this.image.onload = () =>{
                this.width = this.image.width / this.framesHorizontal.max * this.scale;
                this.height = this.image.height / this.framesVertical.max * this.scale;
            }
        }

    draw(){
        context.drawImage(
            this.image,
            this.image.width / this.framesHorizontal.max * this.direction,
            this.image.height / this.framesVertical.max * this.framesVertical.val + 1,
            this.image.width / this.framesHorizontal.max,
            this.image.height / this.framesVertical.max - 1,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );

        if(this.moving){
            this.interacting = false;

            ++this.framesVertical.elapsed;

            if(this.framesVertical.elapsed % 10 === 0){
                if(this.framesVertical.val < this.framesVertical.max - 4){
                    ++this.framesVertical.val;
                }
                else{
                    this.framesVertical.val = 0;
                }
            }
        }
        else{
            this.framesVertical.val = 0;
        }
        
    }
}