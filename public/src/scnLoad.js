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
        this.load.image("sprUiTrackLine", "sprites/sprUiTrackLine.png");
        this.load.image("sprUiTrackLinePlayer", "sprites/sprUiTrackLinePlayer.png");
        this.load.image("sprUiTrackLineBike", "sprites/sprUiTrackLineBike.png");
        this.load.image("sprUiFullscreen", "sprites/sprUiFullscreen.png");

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

        this.load.image("sprSegTreeRoad00_0", "sprites/sprSegTreeRoad00_0.png");
        this.load.image("sprSegTreeRoad00_1", "sprites/sprSegTreeRoad00_1.png");
        this.load.image("sprSegTreeRoad00_2", "sprites/sprSegTreeRoad00_2.png");
        this.load.image("sprSegTreeRoad00_3", "sprites/sprSegTreeRoad00_3.png");

        this.load.image("sprSegFinishLineClamp_0", "sprites/sprSegFinishLineClamp_0.png");
        this.load.image("sprSegFinishLine_0", "sprites/sprSegFinishLine00.png");
        this.load.image("sprSegFinishLine_1", "sprites/sprSegFinishLine01.png");

        this.load.image("sprObsBlade00_0", "sprites/obstacles/sprObsBlade00_0.png");
        this.load.image("sprObsBlade00_1", "sprites/obstacles/sprObsBlade00_1.png");
        this.load.image("sprObsBlade00_2", "sprites/obstacles/sprObsBlade00_2.png");
        this.load.image("sprObsBlade00_3", "sprites/obstacles/sprObsBlade00_3.png");

        this.load.image("sprObsBlade01_0", "sprites/obstacles/sprObsBlade01_0.png");

        this.load.image("sprAdvertTeamArashi", "sprites/clutter/sprAdvertTeamArashi.png");
        this.load.image("sprAdvertTeamDaito", "sprites/clutter/sprAdvertTeamDaito.png");
        this.load.image("sprAdvertTeamHapton", "sprites/clutter/sprAdvertTeamHapton.png");
        this.load.image("sprAdvertTeamTinnemann", "sprites/clutter/sprAdvertTeamTinnemann.png");

        this.load.image("sprBike00_0", "sprites/sprBike00_0.png");
        this.load.image("sprBike00_1", "sprites/sprBike00_1.png");
        this.load.image("sprBike00_2", "sprites/sprBike00_2.png");
        this.load.image("sprBike00_3", "sprites/sprBike00_3.png");
        this.load.image("sprBike01_0", "sprites/sprBike01_0.png");
        this.load.image("sprBike01_1", "sprites/sprBike01_1.png");
        this.load.image("sprBike01_2", "sprites/sprBike01_2.png");
        this.load.image("sprBike01_3", "sprites/sprBike01_3.png");
        this.load.image("sprBike02_0", "sprites/sprBike02_0.png");
        this.load.image("sprBike02_1", "sprites/sprBike02_1.png");
        this.load.image("sprBike02_2", "sprites/sprBike02_2.png");
        this.load.image("sprBike02_3", "sprites/sprBike02_3.png");
        this.load.image("sprBike03_0", "sprites/sprBike03_0.png");
        this.load.image("sprBike03_1", "sprites/sprBike03_1.png");
        this.load.image("sprBike03_2", "sprites/sprBike03_2.png");
        this.load.image("sprBike03_3", "sprites/sprBike03_3.png");

        this.load.image("sprDebugTarget00", "sprites/sprDebugTarget00.png");
        this.load.image("sprDebugArrow00", "sprites/sprDebugArrow00.png");

        this.loadTxt = this.add.bitmapText(0, (this.game.config.height * 0.5) - 32, "pixelmix", "LOADING: 0%", 8, 1).setOrigin(0.5);
        this.ancient = this.add.sprite(0, 0, "sprPixelMan").setScale(2);
        this.pixel = this.add.sprite(0, -48, "sprPixelTurn").setScale(2);

        let turnAnim = this.anims.create({
            key: "turning",
            frames: this.anims.generateFrameNumbers("sprPixelTurn"),
            frameRate: 32,
            repeat: -1
        });
        this.pixel.play("turning");
        this.logoDidRepeat = 0;
        this.pixel.on('animationrepeat', function () {
            this.logoDidRepeat += 1;
        }, this);

        this.load.on('progress', this.update_progress_display, this);
    }

    create(){
        this.load.off("progress", this.update_progress_display, this);
        this.cache.bitmapFont.get("pixelmix").data.lineHeight = 40;  
    }

    update(){
        if (this.logoDidRepeat >= 2) {
            this.scene.start("ScnLogin");
        }
    }

    update_progress_display(_pct) {
        this.loadTxt.setText("LOADING: " + String(Math.floor(_pct * 100)) + "%");
    }
}
