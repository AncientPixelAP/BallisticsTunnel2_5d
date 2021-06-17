import Button from "./button.js";
import { SliderHorizontal } from "./slider.js";
import MovingGrid from "./movingGrid.js";

export default class PanelShipselector{
    constructor(_scene) {
        this.scene = _scene;

        this.bgGraphics = this.scene.add.graphics();
        this.bgGraphics.fillStyle(0x000000, 0.9);
        this.bgGraphics.fillRect(this.scene.left, this.scene.top, this.scene.game.config.width, this.scene.game.config.height);

        this.bgGrid = new MovingGrid(this.scene, this.scene.game.config.width, this.scene.game.config.height, 32);
        this.bgGrid.addPointer("hand", this.scene.hand.pos.x, this.scene.hand.pos.y, 128);

        this.btnBack = new Button(this.scene, { x: -160, y: -66 }, "sprBtn00", "BACK", false, () => {
            this.scene.level.shipSelect.currentBike = this.shipSelect.currentBike;
            this.scene.level.shipSelect.currentLivery = this.shipSelect.currentLivery;

            this.scene.level.juggleShip();

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

        //this.shipManager = new ShipManager();
        //this.shipStats = this.shipManager.shipStats;

        this.saveGame = JSON.parse(localStorage.getItem(SAVEGAMENAME));    

        this.shipSelect = {
            bg: this.scene.add.sprite(-16, 0, "sprSegStartTunnel00", 0),
            currentBike: this.saveGame.multiplayer.bike,
            currentLivery: this.saveGame.multiplayer.livery,
            bike: this.scene.add.sprite(-16, 48, this.scene.level.shipStats[this.saveGame.multiplayer.bike].asset + this.saveGame.multiplayer.livery),
            logo: this.scene.add.sprite(-16, 0, this.scene.level.shipStats[this.saveGame.multiplayer.bike].logo),
            btnNext: new Button(this.scene, { x: -160, y: -9 }, "sprBtn00", "SHIP", false, () => {
                this.shipSelect.currentBike += 1;
                if(this.shipSelect.currentBike >= 4){
                    this.shipSelect.currentBike = 0;
                }
                this.saveGame.multiplayer.bike = this.shipSelect.currentBike;
                this.shipSelect.bike.setTexture(this.scene.level.shipStats[this.shipSelect.currentBike].asset + this.shipSelect.currentLivery);
                this.shipSelect.logo.setTexture(this.scene.level.shipStats[this.shipSelect.currentBike].logo);
                this.shipSelect.description.setText(this.scene.level.shipStats[this.shipSelect.currentBike].description);
            }),
            btnLivery: new Button(this.scene, { x: -160, y: 9 }, "sprBtn00", "LVRY", false, () => {
                this.shipSelect.currentLivery += 1;
                if (this.shipSelect.currentLivery >= 4) {
                    this.shipSelect.currentLivery = 0;
                }
                this.saveGame.multiplayer.livery = this.shipSelect.currentLivery;
                this.shipSelect.bike.setTexture(this.scene.level.shipStats[this.shipSelect.currentBike].asset + this.shipSelect.currentLivery);
            }),
            description: this.scene.add.bitmapText(154, 0, "pixelmix", this.scene.level.shipStats[this.saveGame.multiplayer.bike].description, 8, 1).setOrigin(0.5)
        }
        this.shipSelect.description.maxWidth = 144;
        this.shipSelect.logo.depth = 1;
        this.shipSelect.bg.depth = 2;
        this.shipSelect.bg.setScale(2);
        this.shipSelect.bike.depth = 3;
        this.shipSelect.bike.setScale(2);

        this.shipSelect.btnNext.update();
        this.shipSelect.btnLivery.update();
    }

    update(){
        this.bgGrid.updatePointer("hand", this.scene.hand.pos.x, this.scene.hand.pos.y, 128);
        this.bgGrid.update();

        this.btnBack.update();
        //this.btnDream.update();

        this.shipSelect.btnNext.update();
        this.shipSelect.btnLivery.update();
    }

    destroy(){
        this.bgGraphics.destroy();
        this.bgGrid.destroy();
        this.btnBack.destroy();
        //this.btnDream.destroy();

        this.shipSelect.btnNext.destroy();
        this.shipSelect.btnLivery.destroy();
        this.shipSelect.bike.destroy();
        this.shipSelect.logo.destroy();
        this.shipSelect.description.destroy();
        this.shipSelect.bg.destroy();
    }
}