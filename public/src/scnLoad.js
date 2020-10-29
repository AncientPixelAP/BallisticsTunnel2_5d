export default class ScnLoad extends Phaser.Scene {

    constructor() {
        super("ScnLoad");
        this.loadTxt = null;
    }

    preload(){
        this.cameras.main.setBackgroundColor(0x000000);
        this.cameras.main.setScroll(-this.game.config.width * 0.5, -this.game.config.height * 0.5);

        this.load.setBaseURL("./assets/");

        //this.load.image('image0', '0.png');
        //this.load.json("story1", "storyjson/story1.json");
        //this.load.text("locDE", "languageData/deutsch.txt");
        //this.load.audio('decisionLeft', 'audio/decision.wav');
        //this.load.atlas("tilesGrass", "sprites/tiles/grassDirt.png", "sprites/tiles/tilesGround_atlas.json");

        this.load.image("sprBtn00", "sprites/sprBtn00.png");

        this.load.image("sprSkybox00", "sprites/sprSkybox00.png");

        this.load.image("sprUiCircle", "sprites/sprUiCircle.png");
        this.load.image("sprUiRoll", "sprites/sprUiRoll.png");
        this.load.image("sprUiSpawnerRoll", "sprites/sprUiSpawnerRoll.png");
        this.load.image("sprUiTextWrap", "sprites/sprUiTextWrap.png");

        this.load.image("sprSegDebug00_0", "sprites/sprSegDebug00.png");
        this.load.image("sprSegDebug01_0", "sprites/sprSegDebug01.png");
        this.load.image("sprSegDebug02_0", "sprites/sprSegDebug02.png");
        this.load.image("sprSegDebug03_0", "sprites/sprSegDebug03.png");

        this.load.image("sprSegStartTunnel_0", "sprites/sprSegStartTunnel00.png");

        this.load.image("sprSegMetalRoad00_0", "sprites/sprSegMetalRoad00_0.png");
        this.load.image("sprSegMetalRoad01_0", "sprites/sprSegMetalRoad01_0.png");
        this.load.image("sprSegMetalRoad02_0", "sprites/sprSegMetalRoad02_0.png");
        this.load.image("sprSegMetalRoad02_1", "sprites/sprSegMetalRoad02_1.png");
        this.load.image("sprSegMetalRoad03_0", "sprites/sprSegMetalRoad03_0.png");
        this.load.image("sprSegMetalRoad03_1", "sprites/sprSegMetalRoad03_1.png");
        this.load.image("sprSegMetalRoad03_2", "sprites/sprSegMetalRoad03_2.png");
        this.load.image("sprSegMetalRoad03_3", "sprites/sprSegMetalRoad03_3.png");
        this.load.image("sprSegMetalRoad03_4", "sprites/sprSegMetalRoad03_4.png");
        this.load.image("sprSegMetalRoad03_5", "sprites/sprSegMetalRoad03_5.png");

        this.load.image("sprSegMetalRoad04_0", "sprites/sprSegMetalRoad04_0.png");
        this.load.image("sprSegMetalRoad04_1", "sprites/sprSegMetalRoad04_1.png");
        this.load.image("sprSegMetalRoad04_2", "sprites/sprSegMetalRoad04_2.png");
        this.load.image("sprSegMetalRoad04_3", "sprites/sprSegMetalRoad04_3.png");
        this.load.image("sprSegMetalRoad04_4", "sprites/sprSegMetalRoad04_4.png");
        this.load.image("sprSegMetalRoad04_5", "sprites/sprSegMetalRoad04_5.png");

        this.load.image("sprSegMetalRoad05_0", "sprites/sprSegMetalRoad05_0.png");
        this.load.image("sprSegMetalRoad05_1", "sprites/sprSegMetalRoad05_1.png");
        this.load.image("sprSegMetalRoad05_2", "sprites/sprSegMetalRoad05_2.png");
        this.load.image("sprSegMetalRoad05_3", "sprites/sprSegMetalRoad05_3.png");
        this.load.image("sprSegMetalRoad05_4", "sprites/sprSegMetalRoad05_4.png");
        this.load.image("sprSegMetalRoad05_5", "sprites/sprSegMetalRoad05_5.png");
        this.load.image("sprSegMetalRoad05_6", "sprites/sprSegMetalRoad05_6.png");
        this.load.image("sprSegMetalRoad05_7", "sprites/sprSegMetalRoad05_7.png");

        this.load.image("sprSegFinishLineClamp_0", "sprites/sprSegFinishLineClamp_0.png");
        this.load.image("sprSegFinishLine_0", "sprites/sprSegFinishLine00.png");
        this.load.image("sprSegFinishLine_1", "sprites/sprSegFinishLine01.png");

        this.load.image("sprBike00", "sprites/sprBike00.png");
        this.load.image("sprDebugTarget00", "sprites/sprDebugTarget00.png");
        this.load.image("sprDebugArrow00", "sprites/sprDebugArrow00.png");

        this.loadTxt = this.add.bitmapText(0, 0, "pixelmix", "LOADING: 0%", 8, 1).setOrigin(0.5);

        this.load.on('progress', this.update_progress_display, this);
    }

    create(){
        this.load.off("progress", this.update_progress_display, this);

        this.cache.bitmapFont.get("pixelmix").data.lineHeight = 40;
        this.scene.start("ScnLogin");
    }

    update(){

    }

    update_progress_display(_pct) {
        this.loadTxt.setText("LOADING: " + String(Math.floor(_pct * 100)) + "%");
    }
}
