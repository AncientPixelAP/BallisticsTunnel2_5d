import Hand from "./ui/hand.js";
import Button from "./ui/button.js";

export default class ScnIntro extends Phaser.Scene {

    constructor() {
        super("ScnIntro");
    }

    create() {
        //console.log(this);
        this.cameras.main.setScroll(-this.game.config.width * 0.5, -this.game.config.height * 0.5);
        this.cameras.main.setBackgroundColor(0x000000);

        this.cameras.main.fadeFrom(500, 0, 0, 0, false, (_cam, _pct) => {

        }, this);

        this.left = this.game.config.width * -0.5;
        this.right = this.game.config.width * 0.5;
        this.top = this.game.config.height * -0.5;
        this.bottom = this.game.config.height * 0.5;

        this.keys = {
            space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
            ctrl: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL),
            shift: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT),
            alt: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ALT),
            end: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.END),
            del: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DELETE),
            tab: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB),
            enter: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER),
            escape: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESCAPE),
            backspace: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE),
        }

        this.pos = {
            x: 0,
            y: this.game.config.height,
            start: {
                x: 0,
                y: this.game.config.height,
            }, 
            end: {
                x: 0,
                y: this.game.config.height * -1,
            },
            in: {
                x: 0,
                y: this.game.config.height,
            },
            out: {
                x: 0,
                y: 0,
            }
        }
        this.target = {
            in: {
                x: 0,
                y: 0
            },
            out: {
                x: 0,
                y: this.game.config.height * -1,
            }
        }

        this.tweenIn = this.tweens.add({
            targets: this.pos.in,
            x: { value: () => this.target.in.x },
            y: { value: () => this.target.in.y },
            ease: "Sine.easeInOut",
            duration: 500,
            callbackScope: this
        });
        this.tweenOut = this.tweens.add({
            targets: this.pos.out,
            x: { value: () => this.target.out.x},
            y: { value: () => this.target.out.y},
            ease: "Sine.easeInOut",
            duration: 750,
            callbackScope: this
        });

        this.hand = new Hand(this);

        this.btnBack = new Button(this, { x: -160, y: - 66 }, "sprBtn00", "BACK", false, () => {
            this.cameras.main.fade(500, 0, 0, 0, false, (_cam, _pct) => {
                if (_pct >= 1) {
                    this.gotoMenu();
                }
            }, this);
        });

        this.btnSkip = new Button(this, { x: -160, y: - 33 }, "sprBtn00", "SKIP", false, () => {
            this.cameras.main.fade(500, 0, 0, 0, false, (_cam, _pct) => {
                if (_pct >= 1) {
                    this.gotoGame();
                }
            }, this);
        });

        //STORYBITS
        this.story = {
            currentBit: 0,
            previousBit: -1,
            bits: [
                {
                    txt: this.add.bitmapText(this.pos.start.x, this.pos.start.y, "pixelmix", "click to begin", 8, 1).setOrigin(0.5),
                }, {
                    txt: this.add.bitmapText(this.pos.start.x, this.pos.start.y, "pixelmix", "The world is dying.", 8, 1).setOrigin(0.5),
                }, {
                    txt: this.add.bitmapText(this.pos.start.x, this.pos.start.y, "pixelmix", "We are dying.", 8, 1).setOrigin(0.5),
                }, {
                    txt: this.add.bitmapText(this.pos.start.x, this.pos.start.y, "pixelmix", "A global rise in CO2 levels forced civilisation underground.", 8, 1).setOrigin(0.5),
                }, {
                    txt: this.add.bitmapText(this.pos.start.x, this.pos.start.y, "pixelmix", "Our cities were connected by Pipelines and Hyperloops, built to help us reach prosperity.", 8, 1).setOrigin(0.5),
                }, {
                    txt: this.add.bitmapText(this.pos.start.x, this.pos.start.y, "pixelmix", "Or so we thought.", 8, 1).setOrigin(0.5),
                }, {
                    txt: this.add.bitmapText(this.pos.start.x, this.pos.start.y, "pixelmix", "The rich got richer, the poor grew more poor.", 8, 1).setOrigin(0.5),
                }, {
                    txt: this.add.bitmapText(this.pos.start.x, this.pos.start.y, "pixelmix", "Nobody wanted to do something against the climate crisis. No government wanted to risk their economy.", 8, 1).setOrigin(0.5),
                    sprite: this.add.sprite(this.pos.start.x, this.pos.start.y * 2, "sprStoryPolitics00")
                }, {
                    txt: this.add.bitmapText(this.pos.start.x, this.pos.start.y, "pixelmix", "Instead we got to build for a new future with climate change.", 8, 1).setOrigin(0.5),
                    sprite: this.add.sprite(this.pos.start.x, this.pos.start.y * 2, "sprStoryLoop00")
                }, {
                    txt: this.add.bitmapText(this.pos.start.x, this.pos.start.y, "pixelmix", "Underground.", 8, 1).setOrigin(0.5),
                }, {
                    txt: this.add.bitmapText(this.pos.start.x, this.pos.start.y, "pixelmix", "We built huge air filtering stations, underground gardens, anti-flood pumps. The economy boomed. Everyone had a job and worked for a new future. A new hope.", 8, 1).setOrigin(0.5),
                }, {
                    txt: this.add.bitmapText(this.pos.start.x, this.pos.start.y, "pixelmix", "Little did we know, that the superrich already planned further ahead.", 8, 1).setOrigin(0.5),
                }, {
                    txt: this.add.bitmapText(this.pos.start.x, this.pos.start.y, "pixelmix", "Earths climate is on a runaway course and we are trapped underground.", 8, 1).setOrigin(0.5),
                }, {
                    txt: this.add.bitmapText(this.pos.start.x, this.pos.start.y, "pixelmix", "The rich elite secured their future. Some bought themselves a stasis chamber to outwait the catastrophe. Others left Earth to colonise Mars and start anew.", 8, 1).setOrigin(0.5),
                }, {
                    txt: this.add.bitmapText(this.pos.start.x, this.pos.start.y, "pixelmix", "People are unemployed and dying. They dance a dance macabre until all will come to an end.", 8, 1).setOrigin(0.5),
                }, {
                    txt: this.add.bitmapText(this.pos.start.x, this.pos.start.y, "pixelmix", "There is only one chance left for some us. We race in the tunnels to win one of the last tickets in a rocket off Earth.", 8, 1).setOrigin(0.5),
                    sprite: this.add.sprite(this.pos.start.x, this.pos.start.y * 2, "sprStoryRacing01")
                }, {
                    txt: this.add.bitmapText(this.pos.start.x, this.pos.start.y, "pixelmix", "We are the people who built this all!", 8, 1).setOrigin(0.5),
                }, {
                    txt: this.add.bitmapText(this.pos.start.x, this.pos.start.y, "pixelmix", "And we are the people who race to abandon it!", 8, 1).setOrigin(0.5),
                }
            ]
        }
        for(let b of this.story.bits){
            if(b.txt !== undefined){
                b.txt.setMaxWidth(292);
            }
            if (b.sprite !== undefined) {
                b.sprite.depth = -100;
            }
        }
    }

    update(){
        this.fillInputs();
        this.hand.update();
        this.btnBack.update();
        this.btnSkip.update();

        if (this.story.currentBit < this.story.bits.length) {
            this.story.bits[this.story.currentBit].txt.x = this.pos.in.x + 64;
            this.story.bits[this.story.currentBit].txt.y = this.pos.in.y;
            if (this.story.bits[this.story.currentBit].sprite !== undefined){
                this.story.bits[this.story.currentBit].sprite.x = this.pos.in.x;
                this.story.bits[this.story.currentBit].sprite.y = this.pos.in.y * 2;
            }
        }
        if(this.story.previousBit >= 0){
            this.story.bits[this.story.previousBit].txt.x = this.pos.out.x + 64;
            this.story.bits[this.story.previousBit].txt.y = this.pos.out.y;
            if (this.story.bits[this.story.previousBit].sprite !== undefined) {
                this.story.bits[this.story.previousBit].sprite.x = this.pos.out.x;
                this.story.bits[this.story.previousBit].sprite.y = this.pos.out.y * 2;
            }
        }

        if ((this.hand.justReleased === true || INPUTS.btnA.justReleased === true) && this.tweenOut.isPlaying() === false){
            if(this.story.currentBit < this.story.bits.length){
                this.story.currentBit += 1;
                this.story.previousBit += 1;

                this.pos.in.x = this.pos.start.x;
                this.pos.in.y = this.pos.start.y;
                this.tweenIn.updateTo("x", this.target.in.x, false);
                this.tweenIn.updateTo("y", this.target.in.y, false);
                this.tweenIn.restart();

                this.pos.out.x = 0;
                this.pos.out.y = 0;
                this.tweenOut.updateTo("x", this.target.out.x, false);
                this.tweenOut.updateTo("y", this.target.out.y, false);
                this.tweenOut.restart();

                if(this.story.currentBit === this.story.bits.length){
                    this.gotoGame();
                }
            }else{
                this.gotoGame();
            }
        }

        if(INPUTS.btnB.justReleased === true){
            this.gotoMenu();
        }
    }

    gotoMenu(){
        this.scene.start("ScnLogin");
    }

    gotoGame(){
        this.scene.start("Scn3d");
    }

    fillInputs(){
        let gamepad = null;
        gamepad = navigator.getGamepads()[Math.max(0, gamepadsConnected - 1)];
        if (gamepad === undefined) {
            gamepad = null;
        }

        //A
        if (this.keys.enter.isDown || (gamepad !== null ? gamepad.buttons[0].pressed : false)) {
            if (INPUTS.btnA.pressed === false) {
                INPUTS.btnA.justPressed = true;
                INPUTS.btnA.pressed = true;
                INPUTS.btnA.justReleased = false;
            } else {
                INPUTS.btnA.justPressed = false;
            }
        } else {
            if (INPUTS.btnA.pressed === true) {
                INPUTS.btnA.pressed = false;
                INPUTS.btnA.justReleased = true;
                INPUTS.btnA.justPressed = false;
            } else {
                INPUTS.btnA.justReleased = false;
            }
        }
        //B
        if (this.keys.backspace.isDown || (gamepad !== null ? gamepad.buttons[1].pressed : false)) {
            if (INPUTS.btnB.pressed === false) {
                INPUTS.btnB.justPressed = true;
                INPUTS.btnB.pressed = true;
                INPUTS.btnB.justReleased = false;
            } else {
                INPUTS.btnB.justPressed = false;
            }
        } else {
            if (INPUTS.btnB.pressed === true) {
                INPUTS.btnB.pressed = false;
                INPUTS.btnB.justReleased = true;
                INPUTS.btnB.justPressed = false;
            } else {
                INPUTS.btnB.justReleased = false;
            }
        }
    }
}
