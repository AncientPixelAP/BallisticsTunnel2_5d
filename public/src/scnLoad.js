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
        this.load.spritesheet("sprSegMetalRoad00", "sprites/segments/sprSegMetalRoad00.png", { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet("sprSegMetalRoad01", "sprites/segments/sprSegMetalRoad01.png", { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet("sprSegMetalRoad02", "sprites/segments/sprSegMetalRoad02.png", { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet("sprSegMetalRoad03", "sprites/segments/sprSegMetalRoad03.png", { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet("sprSegMetalRoad04", "sprites/segments/sprSegMetalRoad04.png", { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet("sprSegMetalRoad05", "sprites/segments/sprSegMetalRoad05.png", { frameWidth: 128, frameHeight: 128 });
        
        
        this.load.spritesheet("sprSegMetroPlatform00", "sprites/segments/sprSegMetroPlatform00.png", { frameWidth: 200, frameHeight: 128 });
        this.load.spritesheet("sprSegMetroPlatform01", "sprites/segments/sprSegMetroPlatform01.png", { frameWidth: 200, frameHeight: 128 });
        this.load.spritesheet("sprSegMetroLine00", "sprites/segments/sprSegMetroLine00.png", { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet("sprSegMetroLine01", "sprites/segments/sprSegMetroLine01.png", { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet("sprSegMetroPlatformEnd00", "sprites/segments/sprSegMetroPlatformEnd00.png", { frameWidth: 200, frameHeight: 128 });
        this.load.spritesheet("sprSegMetroPlatformEnd01", "sprites/segments/sprSegMetroPlatformEnd01.png", { frameWidth: 200, frameHeight: 128 });
        
        this.load.spritesheet("sprSegAirVent00", "sprites/segments/sprSegAirVent00.png", { frameWidth: 128, frameHeight: 128 });

        this.load.spritesheet("sprSegNuclearRoad00", "sprites/segments/sprSegNuclearRoad00.png", { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet("sprSegNuclearRoom00", "sprites/segments/sprSegNuclearRoom00.png", { frameWidth: 200, frameHeight: 128 });
        this.load.spritesheet("sprSegNuclearRoomEnd00", "sprites/segments/sprSegNuclearRoomEnd00.png", { frameWidth: 200, frameHeight: 128 });
        
        this.load.spritesheet("sprSegLabRoad00", "sprites/segments/sprSegLabRoad00.png", { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet("sprSegTreeRoad00", "sprites/segments/sprSegTreeRoad00.png", { frameWidth: 128, frameHeight: 128 });

        this.load.spritesheet("sprSegCircusRoad00", "sprites/segments/sprSegCircusRoad00.png", { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet("sprSegCircusRoad00", "sprites/segments/sprSegCircusRoad00.png", { frameWidth: 128, frameHeight: 128 });
        
        this.load.spritesheet("sprSegStartTunnel00", "sprites/segments/sprSegStartTunnel00.png", {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet("sprSegFinishLine00", "sprites/segments/sprSegFinishLine00.png", { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet("sprSegNothing00", "sprites/segments/sprSegNothing00.png", { frameWidth: 16, frameHeight: 16 });

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
        this.load.image("sprObsVentDoor01_0", "sprites/obstacles/sprObsVentDoor01_0.png");

        this.load.image("sprObsTrigger_0", "sprites/obstacles/sprTrigger_0.png");

        //CLUTTER
        this.load.image("sprClownFace00_0", "sprites/clutter/sprClownFace00.png");

        this.load.image("sprRadioactive00_0", "sprites/logos/radioactive04.png");

        this.load.image("sprAdvertTeamArashi", "sprites/clutter/sprAdvertTeamArashi.png");
        this.load.image("sprAdvertTeamDaito", "sprites/clutter/sprAdvertTeamDaito.png");
        this.load.image("sprAdvertTeamHapton", "sprites/clutter/sprAdvertTeamHapton.png");
        this.load.image("sprAdvertTeamTinnemann", "sprites/clutter/sprAdvertTeamTinnemann.png");

        this.load.image("sprLogoArashi", "sprites/logos/sprLogoArashi.png");
        this.load.image("sprLogoDaito", "sprites/logos/sprLogoDaito.png");
        this.load.image("sprLogoHapton", "sprites/logos/sprLogoHapton.png");
        this.load.image("sprLogoTinnemann", "sprites/logos/sprLogoTinnemann.png");

        this.load.image("sprBike00_0", "sprites/ships/sprBike00_0.png");
        this.load.image("sprBike00_1", "sprites/ships/sprBike00_1.png");
        this.load.image("sprBike00_2", "sprites/ships/sprBike00_2.png");
        this.load.image("sprBike00_3", "sprites/ships/sprBike00_3.png");
        this.load.image("sprBike01_0", "sprites/ships/sprBike01_0.png");
        this.load.image("sprBike01_1", "sprites/ships/sprBike01_1.png");
        this.load.image("sprBike01_2", "sprites/ships/sprBike01_2.png");
        this.load.image("sprBike01_3", "sprites/ships/sprBike01_3.png");
        this.load.image("sprBike02_0", "sprites/ships/sprBike02_0.png");
        this.load.image("sprBike02_1", "sprites/ships/sprBike02_1.png");
        this.load.image("sprBike02_2", "sprites/ships/sprBike02_2.png");
        this.load.image("sprBike02_3", "sprites/ships/sprBike02_3.png");
        this.load.image("sprBike03_0", "sprites/ships/sprBike03_0.png");
        this.load.image("sprBike03_1", "sprites/ships/sprBike03_1.png");
        this.load.image("sprBike03_2", "sprites/ships/sprBike03_2.png");
        this.load.image("sprBike03_3", "sprites/ships/sprBike03_3.png");

        this.load.image("sprDebugTarget00", "sprites/sprDebugTarget00.png");
        this.load.image("sprObsDebugTrigger_0", "sprites/sprDebugTrigger00.png");
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

        this.load.audio("musTrack0", "sounds/music/dejavu-Anima160kb.mp3");
        this.load.audio("musTrack1", "sounds/music/dejavu-Charger160kb.mp3");
        this.load.audio("musTrack2", "sounds/music/dejavu-stardust160kb.mp3");
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
