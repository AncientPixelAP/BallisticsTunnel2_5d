import Hand from "./ui/hand.js";
import Button from "./ui/button.js";
import { SliderHorizontal } from "./ui/slider.js";
import MovingGrid from "./ui/movingGrid.js";
import ShipManager from "./shipManager.js";

export default class ScnLogin extends Phaser.Scene {

    constructor() {
        super("ScnLogin");
    }

    /*preload(){
        this.load.setBaseURL("./assets/");
        this.load.audio("musTrack0", "sounds/music/dejavu-Anima.mp3");
        this.load.audio("musTrack1", "sounds/music/dejavu-Charger.mp3");
        this.load.audio("musTrack2", "sounds/music/dejavu-stardust.mp3");
        this.load.audio("musTrack3", "sounds/music/Lantriperc-AmazingSelector.mp3");
        this.load.audio("musTrack4", "sounds/music/Lantriperc-PeopleMachine.mp3");
        this.load.audio("musTrack5", "sounds/music/Lantriperc-TechniqueMecha.mp3");
        this.load.audio("musTrack6", "sounds/music/ModifiedMotion&Faction-MagicMan.mp3");
        this.loadTxt = this.add.bitmapText(0, (this.game.config.height * 0.5) - 32, "pixelmix", "LOADING: 0%", 8, 1).setOrigin(0.5);
        this.load.on('progress', this.updateProgressDisplay, this);
    }*/

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

        this.saveGame = this.getFreshSaveGame();

        if (localStorage.getItem(SAVEGAMENAME) === null || localStorage.getItem(SAVEGAMENAME) === "null") {
            localStorage.setItem(SAVEGAMENAME, JSON.stringify(this.saveGame));
        } else {
            this.saveGame = JSON.parse(localStorage.getItem(SAVEGAMENAME));
            if(this.checkSaveGameInegrity() === false){
                console.warn("found corrupt savegame, generating a new one")
                this.saveGame = this.getFreshSaveGame();
                localStorage.setItem(SAVEGAMENAME, JSON.stringify(this.saveGame));
            }
        }

        OPTIONS.sound.music = this.saveGame.sound.music;
        OPTIONS.sound.sfx = this.saveGame.sound.sfx;
        OPTIONS.sound.speech = this.saveGame.sound.speech;
        OPTIONS.effects.screenshake = this.saveGame.effects.screenshake;
        OPTIONS.effects.shader = this.saveGame.effects.shader;

        this.hand = new Hand(this);

        this.bgGrid = new MovingGrid(this, this.game.config.width, this.game.config.height * 2, 32);
        this.bgGrid.addPointer("hand", this.hand.pos.x, this.hand.pos.y, 128);

        this.btnPlay = new Button(this, { x: -160, y: -66 }, "sprBtn00", "PLAY", false, () => {
            this.cameras.main.fade(500, 0, 0, 0, false, (_cam, _pct) => {
                if(_pct >= 1){
                    this.gotoMain();
                }
            }, this);
        });

        this.btnSingleplayer = new Button(this, { x: -160, y: -48 }, "sprBtn00", "STORY", false, () => {
            this.cameras.main.fade(500, 0, 0, 0, false, (_cam, _pct) => {
                if (_pct >= 1) {
                    this.gotoSingleplayer();
                }
            }, this);
        });

        this.btnOptions = new Button(this, { x: -160, y: 66 }, "sprBtn00", "OPTIONS", false, () => {
            this.cameras.main.pan(0, this.game.config.height, 1000, "Cubic", false, () => {

            });
        });



        //OPTIONS SCREEN
        this.btnBack = new Button(this, { x: -160, y: this.game.config.height - 66 }, "sprBtn00", "BACK", false, () => {
            this.cameras.main.pan(0, 0, 1000, "Cubic", false, () => {

            });
        });

        this.btnMusic = new Button(this, { x: -160, y: this.game.config.height - 36 }, "sprBtn00", "MUSIC", false, () => {});
        this.sliderMusic = new SliderHorizontal(this, {x: -16, y: this.game.config.height - 36}, OPTIONS.sound.music, 128);
        this.sliderMusic.move(-64, this.game.config.height - 36);
        this.sliderMusic.releaseFunc = () => {
            OPTIONS.sound.music = this.sliderMusic.value;
            this.saveGame.sound.music = this.sliderMusic.value;
        }

        this.btnSfx = new Button(this, { x: -160, y: this.game.config.height - 18}, "sprBtn00", "SFX", false, () => { });
        this.sliderSfx = new SliderHorizontal(this, { x: -16, y: this.game.config.height -  18}, OPTIONS.sound.sfx, 128);
        this.sliderSfx.move(-64, this.game.config.height - 18);
        this.sliderSfx.releaseFunc = () => {
            OPTIONS.sound.sfx = this.sliderSfx.value;
            this.saveGame.sound.sfx = this.sliderSfx.value;
        }

        this.btnSpeech = new Button(this, { x: -160, y: this.game.config.height }, "sprBtn00", "SPEECH", false, () => { });
        this.sliderSpeech = new SliderHorizontal(this, { x: -16, y: this.game.config.height }, OPTIONS.sound.speech, 128);
        this.sliderSpeech.move(-64, this.game.config.height);
        this.sliderSpeech.releaseFunc = () => {
            OPTIONS.sound.speech = this.sliderSpeech.value;
            this.saveGame.sound.speech = this.sliderSpeech.value;
        }

        this.btnScreenshake = new Button(this, { x: -160, y: this.game.config.height + 36 }, "sprBtn00", "SCRNSHAKE", false, () => {});
        this.sliderScreenshake = new SliderHorizontal(this, { x: -16, y: this.game.config.height + 36 }, OPTIONS.effects.screenshake, 128);
        this.sliderScreenshake.move(-64, this.game.config.height + 36);
        this.sliderScreenshake.releaseFunc = () => {
            OPTIONS.effects.screenshake = this.sliderScreenshake.value;
            this.saveGame.effects.screenshake = this.sliderScreenshake.value;
            this.cameras.main.shake(150, (0.01) * OPTIONS.effects.screenshake, true, () => { }, this);
        }

        this.btnShader = new Button(this, { x: 48, y: this.game.config.height + 36 }, "sprBtn00", "SHADER", true, () => { 
            OPTIONS.effects.shader = true;
            this.saveGame.effects.shader = true;
        });
        this.btnShader.toggleOffFunc = () => {
            OPTIONS.effects.shader = false;
            this.saveGame.effects.shader = false;
        };
        if(OPTIONS.effects.shader === true){
            this.btnShader.simulateClick();
        }

        this.btnFullscreen = new Button(this, { x: -160, y: this.game.config.height + 66 }, "sprBtn00", "FULLSCRN", false, () => {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }
        });

        this.shipManager = new ShipManager();
        this.shipStats = this.shipManager.shipStats;

        this.shipSelect = {
            bg: this.add.sprite(-16, 0, "sprSegStartTunnel00", 0),
            currentBike: this.saveGame.multiplayer.bike,
            currentLivery: this.saveGame.multiplayer.livery,
            bike: this.add.sprite(-16, 48, this.shipStats[this.saveGame.multiplayer.bike].asset + this.saveGame.multiplayer.livery),
            logo: this.add.sprite(-16, 0, this.shipStats[this.saveGame.multiplayer.bike].logo),
            btnNext: new Button(this, { x: -160, y: -9 }, "sprBtn00", "SHIP", false, () => {
                this.shipSelect.currentBike += 1;
                if(this.shipSelect.currentBike >= 4){
                    this.shipSelect.currentBike = 0;
                }
                this.saveGame.multiplayer.bike = this.shipSelect.currentBike;
                this.shipSelect.bike.setTexture(this.shipStats[this.shipSelect.currentBike].asset + this.shipSelect.currentLivery);
                this.shipSelect.logo.setTexture(this.shipStats[this.shipSelect.currentBike].logo);
                this.shipSelect.description.setText(this.shipStats[this.shipSelect.currentBike].description);
            }),
            btnLivery: new Button(this, { x: -160, y: 9 }, "sprBtn00", "LVRY", false, () => {
                this.shipSelect.currentLivery += 1;
                if (this.shipSelect.currentLivery >= 4) {
                    this.shipSelect.currentLivery = 0;
                }
                this.saveGame.multiplayer.livery = this.shipSelect.currentLivery;
                this.shipSelect.bike.setTexture(this.shipStats[this.shipSelect.currentBike].asset + this.shipSelect.currentLivery);
            }),
            description: this.add.bitmapText(154, 0, "pixelmix", this.shipStats[this.saveGame.multiplayer.bike].description, 8, 1).setOrigin(0.5)
        }
        this.shipSelect.description.maxWidth = 144;
        this.shipSelect.logo.depth = 1;
        this.shipSelect.bg.depth = 2;
        this.shipSelect.bg.setScale(2);
        this.shipSelect.bike.depth = 3;
        this.shipSelect.bike.setScale(2);
    }

    update(){
        this.hand.update();

        this.bgGrid.updatePointer("hand", this.hand.pos.x, this.hand.pos.y, 128);
        this.bgGrid.update();


        this.btnPlay.update();
        this.btnSingleplayer.update();
        this.btnOptions.update();

        this.btnFullscreen.update();
        this.sliderMusic.update();
        this.sliderSfx.update();
        this.sliderSpeech.update();
        this.sliderScreenshake.update();
        this.btnShader.update();
        this.btnBack.update();

        this.shipSelect.btnNext.update();
        this.shipSelect.btnLivery.update();
    }

    gotoMain(){
        localStorage.setItem(SAVEGAMENAME, JSON.stringify(this.saveGame));
        
        this.scene.start("ScnMain", { 
            bikeData: this.shipStats[this.shipSelect.currentBike],
            livery: this.shipSelect.currentLivery
        });
    }

    gotoSingleplayer() {
        localStorage.setItem(SAVEGAMENAME, JSON.stringify(this.saveGame));

        //this.scene.start("ScnIntro");
        this.scene.start("Scn3d");
    }

    getFreshSaveGame(){
        return {
            name: this.getRandomName(),
            sound:{
                music: OPTIONS.sound.music,
                sfx: OPTIONS.sound.sfx,
                speech: OPTIONS.sound.speech
            },
            effects: {
                screenshake: OPTIONS.effects.screenshake,
                shader: OPTIONS.effects.shader
            },
            multiplayer: {
                bike: 0,
                livery: 0
            },
            singleplayer: null
        }
    }

    checkSaveGameInegrity(){
        if(this.saveGame.name === undefined){
            return false;
        }
        if(this.saveGame.sound === undefined){
            return false;
        }else{
            if(this.saveGame.sound.music === undefined){
                return false;
            }
            if (this.saveGame.sound.sfx === undefined) {
                return false;
            }
            if (this.saveGame.sound.speech === undefined) {
                return false;
            }
        }
        if(this.saveGame.effects === undefined){
            return false;
        }else{
            if(this.saveGame.effects.screenshake === undefined){
                return false;
            }
            if (this.saveGame.effects.shader === undefined) {
                return false;
            }
        }
        if(this.saveGame.multiplayer === undefined){
            return false;
        }else{
            if(this.saveGame.multiplayer.bike === undefined){
                return false;
            }
            if (this.saveGame.multiplayer.livery === undefined) {
                return false;
            }
        }
        if(this.saveGame.singleplayer === undefined){
            return false;
        }
        return true;
    }

    updateProgressDisplay(_pct) {
        this.loadTxt.setText("LOADING: " + String(Math.floor(_pct * 100)) + "%");
    }

    getRandomName(){

        let prefixes = [
            "",
            "Chef ",
            "Ensign ",
            "Cmd. ",
            "Lt. ",
            "Lt. Cmd. ",
            "Dr. ",
            "Son of ",
            "Daughter of ",
            "One of ",
            "Two of ",
            "Three of ",
            "Nine of ",
            "Number ",
            "Doc ",
            "Specialist ",
            "Prof. ",
            "Mr. ",
            "Mrs. ",
            "SCPO ",
            "Constable "
        ]

        let names = [
            "Hugh",
            "Wax",
            "Repaer",
            "Everyone",
            "Rogue",
            "Licious",
            "Kerk",
            "Fernandez",
            "Nine",
            "Pup",
            "Vogue",
            "Peetaq",
            "Uhudler",
            "Two",
            "Three",
            "Spork",
            "Foon",
            "Spot",
            "Tyller",
            "Doc",
            "Bones",
            "Thrasher",
            "Pulanski",
            "Trucker",
            "Troja",
            "Wuff",
            "Le Fraud",
            "Triker",
            "Toto",
            "Dutu",
            "Soren",
            "Vor",
            "Song",
            "McLean",
            "McBash",
            "McMash",
            "Rome",
            "Nugg",
            "Dirk",
            "Fontaine",
            "Myway",
            "Tictac",
            "Wideman",
            "Tilik",
            "O´Neill",
            "Orca",
            "Parcel",
            "Aburch"
        ]
        return prefixes[Math.floor(Math.random() * prefixes.length)] + names[Math.floor(Math.random() * names.length)];
    }
}
