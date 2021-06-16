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

        this.btnAdmin = new Button(this.scene, { x: 160, y: -66 }, "sprBtn00", "ADMIN", false, () => {
            this.scene.player.jumpToPosition({ x: 0, y: 0, z: 0 });
            this.scene.loadLevel("quarters00");

            this.scene.player.setMode(PLAYERMODE.LOOK);
            this.scene.player.panel = null;
            this.destroy();
        });

        this.btnQuarters = new Button(this.scene, { x: 160, y: -33 }, "sprBtn00", "QUARTERS", false, () => {
            this.scene.player.jumpToPosition({ x: 0, y: 0, z: 0 });
            this.scene.loadLevel("quarters00");

            this.scene.player.setMode(PLAYERMODE.LOOK);
            this.scene.player.panel = null;
            this.destroy();
        });

        this.btnLounge = new Button(this.scene, { x: 160, y: 0 }, "sprBtn00", "LOUNGE", false, () => {
            this.scene.player.jumpToPosition({ x: 0, y: 0, z: 0 });
            this.scene.loadLevel("marketsquare00");

            this.scene.player.setMode(PLAYERMODE.LOOK);
            this.scene.player.panel = null;
            this.destroy();
        });

        this.btnSocial = new Button(this.scene, { x: 160, y: 33 }, "sprBtn00", "MARKET", false, () => {
            this.scene.player.jumpToPosition({ x: 0, y: 0, z: 0 });
            this.scene.loadLevel("marketsquare00");

            this.scene.player.setMode(PLAYERMODE.LOOK);
            this.scene.player.panel = null;
            this.destroy();
        });

        this.btnHangar = new Button(this.scene, { x: 160, y: 66 }, "sprBtn00", "HANGAR", false, () => {
            this.scene.player.jumpToPosition({ x: 0, y: 0, z: 0 });
            this.scene.loadLevel("hangar00");

            this.scene.player.setMode(PLAYERMODE.LOOK);
            this.scene.player.panel = null;
            this.destroy();
        });

        this.btnPower = new Button(this.scene, { x: 160, y: 99 }, "sprBtn00", "POWER", false, () => {
            //this.scene.player.jumpToPosition({ x: 0, y: 0, z: 0 });
            //this.scene.loadLevel("hangar00");

            this.scene.player.setMode(PLAYERMODE.LOOK);
            this.scene.player.panel = null;
            this.destroy();
        });

        /*this.btnDream = new Button(this.scene, { x: 160, y: -66 }, "sprBtn00", "DREAM", false, () => {
            this.scene.player.jumpToPosition({ x: 0, y: 0, z: 0 });
            this.scene.loadLevel("dream00");

            this.scene.player.setMode(PLAYERMODE.LOOK);
            this.scene.player.panel = null;
            this.destroy();
        });*/
    }

    update(){
        this.bgGrid.updatePointer("hand", this.scene.hand.pos.x, this.scene.hand.pos.y, 128);
        this.bgGrid.update();

        this.btnBack.update();
        //this.btnDream.update();
        this.btnAdmin.update();
        this.btnQuarters.update();
        this.btnLounge.update();
        this.btnSocial.update();
        this.btnHangar.update();
        this.btnPower.update();
    }

    destroy(){
        this.bgGraphics.destroy();
        this.bgGrid.destroy();
        this.btnBack.destroy();
        //this.btnDream.destroy();
        this.btnAdmin.destroy();
        this.btnQuarters.destroy();
        this.btnLounge.destroy();
        this.btnSocial.destroy();
        this.btnHangar.destroy();
        this.btnPower.destroy();
    }
}