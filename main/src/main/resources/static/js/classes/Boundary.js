class Boundary{
    constructor({
        width = 48, 
        height = 48,
        position = {
            x: 0,
            y: 0 },
    })
    {
        this.position = position;
        this.width = width;
        this.height = height;
    }

    draw(){
        // Red
        //context.fillStyle = "red";

        // Transparent 
        context.fillStyle = "rgba(255, 0, 0, 0)"

        context.fillRect(this.position.x, this.position.y, this.width, this.height);

    }
}