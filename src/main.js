console.log("Hello from main dot js");



let config = {
    scene: [Menu, Play],
    type: Phaser.CANVAS,
    width: 640,
    height: 480
    
};

let keyF, keyR, keyLEFT, keyRIGHT;


let borderUISize = config.height / 15;
let borderPadding = borderUISize / 3;

let game = new Phaser.Game(config);

//let game= new phaser.Game();
// comment from michael