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

        this.saveGame = {
            name: this.getRandomName()
        }

        /*if (localStorage.getItem(SAVEGAMENAME) === null) {
            localStorage.setItem(SAVEGAMENAME, JSON.stringify(this.saveGame));
        } else {
            this.saveGame = JSON.parse(localStorage.getItem(SAVEGAMENAME));
        }*/

        this.hand = new Hand(this);

        this.btnPlay = new Button(this, { x: -32, y: -48 }, "sprBtn00", "PLAY", false, () => {
            this.gotoMain();
        });

        this.btnFullscreen = new Button(this, { x: -32, y: 48 }, "sprBtn00", "FULLSCRN", false, () => {
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
                asset: "sprBike00_",
                acceleration: 0.01,
                spd: 0.3,
                curveMod: 0.5,
                slipMax: 0.3,
                slipZone: 0.3,
                brake: 0.1,
                friction: 0.01,
                speedDeg: 0.00075,
                roll: 0.05
            }, {
                model: "Dart",
                manufacturer: "Arashi Corporation",
                asset: "sprBike01_",
                acceleration: 0.008,
                spd: 0.35,
                curveMod: 0.45,
                slipMax: 0.15,
                slipZone: 0.3,
                brake: 0.1,
                friction: 0.01,
                speedDeg: 0.0011,
                roll: 0.05
            }, {
                model: "Asynch",
                manufacturer: "Daito",
                asset: "sprBike02_",
                acceleration: 0.009,
                spd: 0.33,
                curveMod: 0.52,
                slipMax: 0.25,
                slipZone: 0.3,
                brake: 0.1,
                friction: 0.01,
                speedDeg: 0.001,
                roll: 0.06
            }, {
                model: "Kite",
                manufacturer: "Tinnemann",
                asset: "sprBike03_",
                acceleration: 0.008,
                spd: 0.32,
                curveMod: 0.55,
                slipMax: 0.27,
                slipZone: 0.3,
                brake: 0.1,
                friction: 0.01,
                speedDeg: 0.001,
                roll: 0.04
            }
        ]

        this.shipSelect = {
            bg: this.add.sprite(64, 0, "sprSegStartTunnel_0"),
            currentBike: 0,
            currentLivery: 0,
            bike: this.add.sprite(64, 24, "sprBike00_0"),
            btnNext: new Button(this, { x: -32, y: -12 }, "sprBtn00", "SHIP", false, () => {
                this.shipSelect.currentBike += 1;
                if(this.shipSelect.currentBike >= 4){
                    this.shipSelect.currentBike = 0;
                }
                this.shipSelect.bike.setTexture(this.shipStats[this.shipSelect.currentBike].asset + this.shipSelect.currentLivery);
            }),
            btnLivery: new Button(this, { x: -32, y: 12 }, "sprBtn00", "LVRY", false, () => {
                this.shipSelect.currentLivery += 1;
                if (this.shipSelect.currentLivery >= 4) {
                    this.shipSelect.currentLivery = 0;
                }
                this.shipSelect.bike.setTexture(this.shipStats[this.shipSelect.currentBike].asset + this.shipSelect.currentLivery);
            }),
        }
    }

    update(){
        this.hand.update();

        this.btnFullscreen.update();
        this.btnPlay.update();

        this.shipSelect.btnNext.update();
        this.shipSelect.btnLivery.update();
    }

    gotoMain(){
        /*localStorage.setItem(SAVEGAMENAME, JSON.stringify({
            name: this.name.txt.text,
            lastLocationId: this.locationTxt.text
        }));*/
        this.scene.start("ScnMain", { 
            bikeData: this.shipStats[this.shipSelect.currentBike],
            livery: this.shipSelect.currentLivery
        });
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
