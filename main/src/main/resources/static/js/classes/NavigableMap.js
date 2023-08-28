class NavigableMap{
    constructor({
        image,
        position = {x: 0, y: 0},
        scale = 1,
        tileSize = 16,
        mapWidth = 1,
        mapHeight = 1,
        }){
            this.image = image;
            this.position = position;
            this.scale = scale;
            this.tileSize = tileSize;
            this.mapWidth = mapWidth;
            this.mapHeight = mapHeight;

            this.arrayMap = new Array (this.mapHeight);

            this.images = [];
            this.images.push(image);

            this.frames = {val: 0, elapsed: 0, max: 1};
            
            for(let i = 0; i < this.mapHeight; ++i){
                this.arrayMap[i] = new Array(this.mapWidth);
            }

            this.image.onload = () =>{
                this.width = this.image.width * this.scale;
                this.height = this.image.height * this.scale;
            }
        }

        draw(){
            context.drawImage(
                this.images[this.frames.val],
                0,
                0,
                this.image.width,
                this.image.height,
                this.position.x,
                this.position.y,
                this.image.width * this.scale,
                this.image.height * this.scale
            )

            ++this.frames.elapsed;
            
            if(this.frames.elapsed % 25 === 0){
                if(this.frames.val < this.frames.max - 1){
                    ++this.frames.val;
                }
                else{
                    this.frames.val = 0;
                }
            }
        }

        addFrame(image){
            this.images.push(image);
            ++this.frames.max;
        }

        setArrayMap(arr){
            for(let i = 0; i < this.mapHeight; ++i){
                for(let j = 0; j < this.mapWidth; ++j){
                    this.arrayMap[i][j] = arr[i * this.mapWidth + j]
                }
            }
        }
}