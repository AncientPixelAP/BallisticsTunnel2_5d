import Hand from "./hand.js";
import Button from "./button.js";

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

        this.pos = {
            x: 0,
            y: 0
        }
        this.target = {
            x: 0,
            y: 0
        }

        this.tween = this.scene.tweens.add({
            targets: this.pos,
            x: { value: () => this.target.x },
            y: { value: () => this.target.y },
            ease: "Sine.easeInOut",
            duration: 500,
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

        //STORYBITS
        
    }

    update(){
        this.hand.update();
        this.btnBack.update();
    }

    gotoMenu(){
        this.scene.start("ScnLogin");
    }
}
