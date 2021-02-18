import Button from "./button.js";
import { SliderHorizontal } from "./slider.js";
import MovingGrid from "./movingGrid.js";

export default class PanelElevator{
    constructor(_scene) {
        this.scene = _scene;

        this.bgGraphics = this.scene.add.graphics();
        this.bgGraphics.fillStyle(0x000000, 0.9);
        this.bgGraphics.fillRect(this.scene.left, this.scene.top, this.scene.game.config.width, this.scene.game.config.height);

        this.bgGrid = new MovingGrid(this.scene, this.scene.game.config.width, this.scene.game.config.height, 32);
        this.bgGrid.addPointer("hand", this.scene.hand.pos.x, this.scene.hand.pos.y, 128);

        this.btnBack = new Button(this.scene, { x: -160, y: -66 }, "sprBtn00", "BACK", false, () => {
            this.scene.player.setMode(PLAYERMODE.LOOK);
            this.scene.player.panel = null;
            this.destroy();
        });

        this.btnDream = new Button(this.scene, { x: 160, y: -66 }, "sprBtn00", "DREAM", false, () => {
            this.scene.player.jumpToPosition({ x: 0, y: 0, z: 0 });
            this.scene.loadLevel("dream00");

            this.scene.player.setMode(PLAYERMODE.LOOK);
            this.scene.player.panel = null;
            this.destroy();
        });
    }

    update(){
        this.bgGrid.updatePointer("hand", this.scene.hand.pos.x, this.scene.hand.pos.y, 128);
        this.bgGrid.update();

        this.btnBack.update();
        this.btnDream.update();
    }

    destroy(){
        this.bgGraphics.destroy();
        this.bgGrid.destroy();
        this.btnBack.destroy();
        this.btnDream.destroy();
    }
}