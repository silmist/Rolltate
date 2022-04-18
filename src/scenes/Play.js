class Play extends Phaser.Scene{
    constructor(){
        super("play");
    }

    preload(){
        this.load.image('el', 'assets/starfield.png');
        this.load.image('rocket', 'assets/sq48.png');
        this.load.image('ship', 'assets/sq64.png');
        this.load.spritesheet('explosion', 'assets/spritesheet.png', {frameWidth: 64, frameHeight: 42, startFrame: 0, endFrame: 5});
    }

    create() {

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.starfield = this.add.tileSprite(
            0,0, game.config.width, game.config.height, 'el'
        
        ).setOrigin(0,0);

        //put rockets
        this.p1Rocket = new Rocket(this,game.config.width/2,431, 'rocket').setOrigin(0,0)
        this.p1Rocket.reset();

        //put ship
        this.shipA = new Ship(this, game.config.width + borderUISize*6, borderUISize*4, 'ship', 0, 30).setOrigin(0, 0);
        this.shipB = new Ship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'ship', 0, 20).setOrigin(0,0);
        this.shipC = new Ship(this, game.config.width, borderUISize*6 + borderPadding*4, 'ship', 0, 10).setOrigin(0,0);
        //this.p1Rocket.reset();

        
        //green UI bg
        this.add.rectangle(
            0,
            borderUISize + borderPadding,
            game.config.width,
            borderUISize * 2,
            0x00FF00,
        ).setOrigin(0,0);

        //white borders
        this.add.rectangle(0,0, game.config.width, borderUISize, 0xfacade).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize,0xfacade).setOrigin(0,0);
        this.add.rectangle(0,0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0)
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);  
        
        this.input.keyboard.on('keydown_A', function (event) {
            console.log('Hello from the A Key!');
          });

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 5, first: 0}),
            frameRate: 30
        });
        
        // initialize score
        this.p1Score = 0;

          // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);


        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

    
    }

    update(){
        
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menu");
        }

        this.starfield.tilePositionX -= 4;
        
        //const movementSpeed = 4
        const movementSpeed = game.settings.spaceshipSpeed;

        
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.p1Rocket.x -= 48;
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            this.p1Rocket.x += 48;
        }

        this.p1Rocket.update();
        

        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.shipA.update();           // update spaceships (x3)
            this.shipB.update();
            this.shipC.update();
        } 

        // check collisions
        
        if(this.checkCollision(this.p1Rocket, this.shipC)) {
            console.log('kaboom ship 03');
            this.p1Rocket.reset();
            this.shipExplode(this.shipC);   
        }
        if (this.checkCollision(this.p1Rocket, this.shipB)) {
            console.log('kaboom ship 02');
            this.p1Rocket.reset();
            this.shipExplode(this.shipB);   
        }
        
        if (this.checkCollision(this.p1Rocket, this.shipA)) {
            console.log('kaboom ship 01');
            this.p1Rocket.reset();
            this.shipExplode(this.shipA);   
        }

        
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;

        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });    

        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;  
        this.sound.play('sfx_explosion'); 
      }
}

