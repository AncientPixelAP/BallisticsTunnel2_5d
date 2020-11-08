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
        this.load.image("sprBtnSlider00", "sprites/sprBtnSlider00.png");
        this.load.image("sprSliderLeft00", "sprites/sprSliderLeft00.png");
        this.load.image("sprSliderRight00", "sprites/sprSliderRight00.png");
        this.load.image("sprSliderHighlight00", "sprites/sprSliderHighlight00.png");

        this.load.image("sprSkybox00", "sprites/sprSkybox00.png");

        this.load.image("sprUiBit", "sprites/sprUiBit.png");
        this.load.image("sprUiCircle", "sprites/sprUiCircle.png");
        this.load.image("sprUiRoll", "sprites/sprUiRoll.png");
        this.load.image("sprUiSpawnerRoll", "sprites/sprUiSpawnerRoll.png");
        this.load.image("sprUiShortWrap", "sprites/sprUiShortWrap.png");
        this.load.image("sprUiTextWrap", "sprites/sprUiTextWrap.png");
        this.load.image("sprUiTrackLine", "sprites/sprUiTrackLine.png");
        this.load.image("sprUiTrackLinePlayer", "sprites/sprUiTrackLinePlayer.png");
        this.load.image("sprUiTrackLineBike", "sprites/sprUiTrackLineBike.png");
        this.load.image("sprUiFullscreen", "sprites/sprUiFullscreen.png");
        this.load.image("sprUiMenu", "sprites/sprUiMenu.png");
        this.load.image("sprUiScore", "sprites/sprUiScore.png");

        this.load.image("sprStoryPolitics00", "sprites/story/storyPolitics00.png");
        this.load.image("sprStoryLoop00", "sprites/story/storyLoop00.png");
        this.load.image("sprStoryRacing01", "sprites/story/storyRacing01.png");

        //SEGMENTS
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

        this.load.image("sprSegLabRoad00_0", "sprites/sprSegLabRoad00_0.png");
        this.load.image("sprSegLabRoad00_1", "sprites/sprSegLabRoad00_1.png");
        this.load.image("sprSegLabRoad00_2", "sprites/sprSegLabRoad00_2.png");
        this.load.image("sprSegLabRoad00_3", "sprites/sprSegLabRoad00_3.png");
        this.load.image("sprSegLabRoad00_4", "sprites/sprSegLabRoad00_4.png");

        this.load.image("sprSegMetroPlatform00_0", "sprites/sprSegMetroPlatform00_0.png");
        this.load.image("sprSegMetroPlatform00_1", "sprites/sprSegMetroPlatform00_1.png");
        this.load.image("sprSegMetroPlatform00_2", "sprites/sprSegMetroPlatform00_2.png");
        this.load.image("sprSegMetroPlatform00_3", "sprites/sprSegMetroPlatform00_3.png");
        this.load.image("sprSegMetroPlatform00_4", "sprites/sprSegMetroPlatform00_4.png");
        this.load.image("sprSegMetroPlatform00_5", "sprites/sprSegMetroPlatform00_5.png");
        this.load.image("sprSegMetroPlatform00_6", "sprites/sprSegMetroPlatform00_6.png");
        this.load.image("sprSegMetroPlatform00_7", "sprites/sprSegMetroPlatform00_7.png");
        this.load.image("sprSegMetroPlatform01_0", "sprites/sprSegMetroPlatform01_0.png");
        this.load.image("sprSegMetroPlatform01_1", "sprites/sprSegMetroPlatform01_1.png");
        this.load.image("sprSegMetroPlatform01_2", "sprites/sprSegMetroPlatform01_2.png");
        this.load.image("sprSegMetroPlatform01_3", "sprites/sprSegMetroPlatform01_3.png");
        this.load.image("sprSegMetroPlatform01_4", "sprites/sprSegMetroPlatform01_4.png");
        this.load.image("sprSegMetroPlatform01_5", "sprites/sprSegMetroPlatform01_5.png");
        this.load.image("sprSegMetroPlatform01_6", "sprites/sprSegMetroPlatform01_6.png");
        this.load.image("sprSegMetroPlatform01_7", "sprites/sprSegMetroPlatform01_7.png");

        this.load.image("sprSegMetroPlatformEnd00_0", "sprites/sprSegMetroPlatformEnd00_0.png");
        this.load.image("sprSegMetroPlatformEnd01_0", "sprites/sprSegMetroPlatformEnd01_0.png");

        this.load.image("sprSegMetroLine00_0", "sprites/sprSegMetroLine00_0.png");
        this.load.image("sprSegMetroLine00_3", "sprites/sprSegMetroLine00_3.png");
        this.load.image("sprSegMetroLine01_0", "sprites/sprSegMetroLine01_0.png");
        this.load.image("sprSegMetroLine01_3", "sprites/sprSegMetroLine00_3.png");

        this.load.image("sprSegAirVent00_0", "sprites/sprSegAirVent00_0.png");

        this.load.image("sprSegTreeRoad00_0", "sprites/sprSegTreeRoad00_0.png");
        this.load.image("sprSegTreeRoad00_1", "sprites/sprSegTreeRoad00_1.png");
        this.load.image("sprSegTreeRoad00_2", "sprites/sprSegTreeRoad00_2.png");
        this.load.image("sprSegTreeRoad00_3", "sprites/sprSegTreeRoad00_3.png");
        this.load.image("sprSegTreeRoad00_4", "sprites/sprSegTreeRoad01_0.png");
        this.load.image("sprSegTreeRoad00_5", "sprites/sprSegTreeRoad01_1.png");
        this.load.image("sprSegTreeRoad00_6", "sprites/sprSegTreeRoad01_2.png");
        this.load.image("sprSegTreeRoad00_7", "sprites/sprSegTreeRoad01_3.png");

        this.load.image("sprSegCircusRoad00_0", "sprites/sprSegCircusRoad00_0.png");
        this.load.image("sprSegCircusRoad00_1", "sprites/sprSegCircusRoad00_1.png");
        this.load.image("sprSegCircusRoad00_2", "sprites/sprSegCircusRoad00_2.png");
        this.load.image("sprSegCircusRoad00_3", "sprites/sprSegCircusRoad00_3.png");

        this.load.image("sprSegNothing00_0", "sprites/sprSegNothing00_0.png");

        this.load.image("sprSegFinishLineClamp_0", "sprites/sprSegFinishLineClamp_0.png");
        this.load.image("sprSegFinishLine_0", "sprites/sprSegFinishLine00.png");
        this.load.image("sprSegFinishLine_1", "sprites/sprSegFinishLine01.png");

        //OBSTCLES
        this.load.image("sprObsBlade00_0", "sprites/obstacles/sprObsBlade00_0.png");
        this.load.image("sprObsBlade00_1", "sprites/obstacles/sprObsBlade00_1.png");
        this.load.image("sprObsBlade00_2", "sprites/obstacles/sprObsBlade00_2.png");
        this.load.image("sprObsBlade00_3", "sprites/obstacles/sprObsBlade00_3.png");

        this.load.image("sprObsBlade01_0", "sprites/obstacles/sprObsBlade01_0.png");

        this.load.image("sprObsDoor00_0", "sprites/obstacles/sprObsDoor00_0.png");
        this.load.image("sprObsDoor00_1", "sprites/obstacles/sprObsDoor00_1.png");
        this.load.image("sprObsDoor00_2", "sprites/obstacles/sprObsDoor00_2.png");
        this.load.image("sprObsDoor00_3", "sprites/obstacles/sprObsDoor00_3.png");
        this.load.image("sprObsDoor00_4", "sprites/obstacles/sprObsDoor00_4.png");
        this.load.image("sprObsDoor00_5", "sprites/obstacles/sprObsDoor00_5.png");

        this.load.image("sprObsVentBlade00_0", "sprites/obstacles/sprObsVentBlade00_0.png");

        this.load.image("sprObsVentDoor00_0", "sprites/obstacles/sprObsVentDoor00_0.png");

        //CLUTTER
        this.load.image("sprClownFace00_0", "sprites/clutter/sprClownFace00.png");

        this.load.image("sprAdvertTeamArashi", "sprites/clutter/sprAdvertTeamArashi.png");
        this.load.image("sprAdvertTeamDaito", "sprites/clutter/sprAdvertTeamDaito.png");
        this.load.image("sprAdvertTeamHapton", "sprites/clutter/sprAdvertTeamHapton.png");
        this.load.image("sprAdvertTeamTinnemann", "sprites/clutter/sprAdvertTeamTinnemann.png");

        this.load.image("sprLogoArashi", "sprites/logos/sprLogoArashi.png");
        this.load.image("sprLogoDaito", "sprites/logos/sprLogoDaito.png");
        this.load.image("sprLogoHapton", "sprites/logos/sprLogoHapton.png");
        this.load.image("sprLogoTinnemann", "sprites/logos/sprLogoTinnemann.png");

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

        this.load.audio("sndEngine00", "sounds/jetengine.mp3");
        this.load.audio("sndWhoo00", "sounds/whoo00.mp3");
        this.load.audio("sndPew00", "sounds/finalmoan.mp3");
        this.load.audio("sndSwoosh00", "sounds/Swoosh1.mp3");
        this.load.audio("sndSwoosh01", "sounds/Swoosh3.mp3");

        this.load.audio("sndNewRecord", "sounds/af_newrecord.mp3");
        this.load.audio("sndFinalLap", "sounds/af_finallap.mp3");
        this.load.audio("sndCountdownGo", "sounds/af_countdown_go.mp3");
        this.load.audio("sndCountdownOne", "sounds/af_countdown_one.mp3");
        this.load.audio("sndCountdownTwo", "sounds/af_countdown_two.mp3");
        this.load.audio("sndCountdownThree", "sounds/af_countdown_three.mp3");

        this.load.audio("musTrack0", "sounds/music/dejavu-Anima.mp3");
        this.load.audio("musTrack1", "sounds/music/dejavu-Charger.mp3");
        this.load.audio("musTrack2", "sounds/music/dejavu-stardust.mp3");
        /*this.load.audio("musTrack3", "sounds/music/Lantriperc-AmazingSelector.mp3");
        this.load.audio("musTrack4", "sounds/music/Lantriperc-PeopleMachine.mp3");
        this.load.audio("musTrack5", "sounds/music/Lantriperc-TechniqueMecha.mp3");
        this.load.audio("musTrack6", "sounds/music/ModifiedMotion&Faction-MagicMan.mp3");*/

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

        this.load.on('progress', this.updateProgressDisplay, this);
    }

    create(){
        this.load.off("progress", this.updateProgressDisplay, this);
        this.cache.bitmapFont.get("pixelmix").data.lineHeight = 40;  
    }

    update(){
        if (this.logoDidRepeat >= 2) {
            this.scene.start("ScnLogin");
        }
    }

    updateProgressDisplay(_pct) {
        let txt = "LOADING: " + String(Math.floor(_pct * 100)) + "%\n";
        if(_pct === 1){
            txt += "decoding audio";
        }
        this.loadTxt.setText(txt);
    }
}
