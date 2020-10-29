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

        this.btnPlay = new Button(this, { x: 0, y: -16 }, "sprBtn00", "PLAY", false, () => {
            this.gotoMain();
        });

        this.btnFullscreen = new Button(this, { x: 0, y: 16 }, "sprBtn00", "FULLSCRN", false, () => {
            if(this.scale.isFullscreen){
                this.scale.stopFullscreen();
            }else{
                this.scale.startFullscreen();
            }
        });
    }

    update(){
        this.hand.update();

        this.btnFullscreen.update();
        this.btnPlay.update();
    }

    gotoMain(){
        /*localStorage.setItem(SAVEGAMENAME, JSON.stringify({
            name: this.name.txt.text,
            lastLocationId: this.locationTxt.text
        }));*/
        this.scene.start("ScnMain");
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
