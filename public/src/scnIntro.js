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

        this.left = this.game.config.width * -0.5;
        this.right = this.game.config.width * 0.5;
        this.top = this.game.config.height * -0.5;
        this.bottom = this.game.config.height * 0.5;
    }

    update(){
        
    }

    gotoMenu(){
        this.scene.start("ScnLogin");
    }
}
