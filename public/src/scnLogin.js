import Hand from "./hand.js";
import Button from "./button.js";

export default class ScnLogin extends Phaser.Scene {

    constructor() {
        super("ScnLogin");
    }

    create() {
        //console.log(this);
        this.cameras.main.setScroll(-this.game.config.width * 0.5, -this.game.config.height * 0.5);
        this.cameras.main.setBackgroundColor(0x000000);

        this.left = this.game.config.width * -0.5;
        this.right = this.game.config.width * 0.5;
        this.top = this.game.config.height * -0.5;
        this.bottom = this.game.config.height * 0.5;

        this.saveGame = this.getFreshSaveGame();

        if (localStorage.getItem(SAVEGAMENAME) === null || localStorage.getItem(SAVEGAMENAME) === "null") {
            localStorage.setItem(SAVEGAMENAME, JSON.stringify(this.saveGame));
            console.log("making a new savegame");
        } else {
            this.saveGame = JSON.parse(localStorage.getItem(SAVEGAMENAME));
            console.log("loading savegame");
        }

        this.hand = new Hand(this);

        this.btnPlay = new Button(this, { x: -160, y: -48 }, "sprBtn00", "PLAY", false, () => {
            this.gotoMain();
        });

        this.btnFullscreen = new Button(this, { x: -160, y: 48 }, "sprBtn00", "FULLSCRN", false, () => {
            if(this.scale.isFullscreen){
                this.scale.stopFullscreen();
            }else{
                this.scale.startFullscreen();
            }
        });

        this.shipStats = [
            {
                model: "Aegis",
                manufacturer: "Hapton Industries",
                logo: "sprLogoHapton",
                asset: "sprBike00_",
                description: "The Aegis by Hapton Industries has very good acceleration and speed degrades slowly due to its small aircutting frame.",
                acceleration: 0.01,
                spd: 0.32,
                curveMod: 0.5,
                slipMax: 0.3,
                slipZone: 0.4,
                brake: 0.1,
                friction: 0.009,
                speedDeg: 0.00075,
                roll: 0.05
            }, {
                model: "Dart",
                manufacturer: "Arashi Corporation",
                logo: "sprLogoArashi",
                asset: "sprBike01_",
                description: "Arashi Corporation built Dart for one thing only: speed.\nIt gets so fast it can get troublesome to get around corners or into another pilots slipstream.",
                acceleration: 0.008,
                spd: 0.35,
                curveMod: 0.49,
                slipMax: 0.15,
                slipZone: 0.4,
                brake: 0.1,
                friction: 0.01,
                speedDeg: 0.0011,
                roll: 0.05
            }, {
                model: "Asynch",
                manufacturer: "Daito",
                logo: "sprLogoDaito",
                asset: "sprBike02_",
                description: "Daito´s Asynch asymmetrical design allows for nimble manoeuveurs and excellent cornering speeds, but the offcenter engine it is hard to control for its pilots.",
                acceleration: 0.009,
                spd: 0.34,
                curveMod: 0.51,
                slipMax: 0.25,
                slipZone: 0.4,
                brake: 0.1,
                friction: 0.01,
                speedDeg: 0.0012,
                roll: 0.06
            }, {
                model: "Kite",
                manufacturer: "Tinnemann",
                logo: "sprLogoTinnemann",
                asset: "sprBike03_",
                description: "Inspired by speedboat racing, Tinnemann´s Kite rides the walls of the loop like it would be water and is sometimes equally sluggish.\nThe Kite profits from slipstreaming and the perfect racing line.",
                acceleration: 0.008,
                spd: 0.33,
                curveMod: 0.52,
                slipMax: 0.27,
                slipZone: 0.4,
                brake: 0.1,
                friction: 0.009,
                speedDeg: 0.00085,
                roll: 0.04
            }
        ]

        this.shipSelect = {
            bg: this.add.sprite(-16, 0, "sprSegStartTunnel_0"),
            currentBike: this.saveGame.multiplayer.bike,
            currentLivery: this.saveGame.multiplayer.livery,
            bike: this.add.sprite(-16, 48, this.shipStats[this.saveGame.multiplayer.bike].asset + this.saveGame.multiplayer.livery),
            logo: this.add.sprite(-16, 0, this.shipStats[this.saveGame.multiplayer.bike].logo),
            btnNext: new Button(this, { x: -160, y: -12 }, "sprBtn00", "SHIP", false, () => {
                this.shipSelect.currentBike += 1;
                if(this.shipSelect.currentBike >= 4){
                    this.shipSelect.currentBike = 0;
                }
                this.shipSelect.bike.setTexture(this.shipStats[this.shipSelect.currentBike].asset + this.shipSelect.currentLivery);
                this.shipSelect.logo.setTexture(this.shipStats[this.shipSelect.currentBike].logo);
                this.shipSelect.description.setText(this.shipStats[this.shipSelect.currentBike].description);
            }),
            btnLivery: new Button(this, { x: -160, y: 12 }, "sprBtn00", "LVRY", false, () => {
                this.shipSelect.currentLivery += 1;
                if (this.shipSelect.currentLivery >= 4) {
                    this.shipSelect.currentLivery = 0;
                }
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

        this.btnFullscreen.update();
        this.btnPlay.update();

        this.shipSelect.btnNext.update();
        this.shipSelect.btnLivery.update();
    }

    gotoMain(){
        localStorage.setItem(SAVEGAMENAME, JSON.stringify(this.setSaveGame()));
        this.scene.start("ScnMain", { 
            bikeData: this.shipStats[this.shipSelect.currentBike],
            livery: this.shipSelect.currentLivery
        });
    }

    getFreshSaveGame(){
        return {
            name: this.getRandomName(),
            multiplayer: {
                bike: 0,
                livery: 0
            },
            singleplayer: null
        }
    }

    setSaveGame(){
        return {
            name: this.saveGame.name,
            multiplayer: {
                bike: this.shipSelect.currentBike,
                livery: this.shipSelect.currentLivery
            },
            singleplayer: this.saveGame.singleplayer,
        }
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
