console.log("hello from menu dot js");


class Menu extends Phaser.Scene {
    constructor() {
        super("menu");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/select.wav');
        this.load.audio('sfx_explosion', './assets/explosion.wav');
        this.load.audio('sfx_rocket', './assets/shot.wav');
      }
    

    create(){
        
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '26px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text((game.config.width/3 ), game.config.height/2 - borderUISize - 
        borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0,5);
        this.add.text((game.config.width/14), game.config.height/2, 
        'Use arrows to move & (F) to fire', menuConfig).setOrigin(0,5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text((game.config.width/27), game.config.height/2 + borderUISize + 
        borderPadding, 'Press <-- for Novice or --> for Expert', menuConfig).setOrigin(0,5);
        
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        


        //this.scene.start("play");
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start("play");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start("play");    
        }
      }
    }



