class Rocket extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.firing = false;
        this.sfxRocket = scene.sound.add('sfx_rocket');
    }


    
    update(){
    

        if(Phaser.Input.Keyboard.JustDown(keyF)&& !this.isFiring){
            this.sfxRocket.play();  // play sfx
            console.log("shot");
            this.firing = true;
        }

        if(this.firing){ 

            console.log("firing");
            this.y -= 10;
            if(this.y < 0){
                this.reset();
            }

            
        }
    }
    
    reset(){
        //this.x = game.config.width/2
        this.y = 431;
        this.firing = false;
    }
    
}

/*

create(){

    this.starfield - this.addEventListener.tileSprite(
        0,0,640, 'starfield'

    ).setOrigin(0,0)

    //add green rectangle
    this.add.rectangle(


    )

}
*/