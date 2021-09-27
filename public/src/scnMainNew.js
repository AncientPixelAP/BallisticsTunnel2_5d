import Hand from "./ui/hand.js";
import MusicPlayer from "./musicPlayer.js";
import Segment from "./racing/segment.js";
import TrackGenerator from "./racing/TrackGenerator.js";
import Ui from "./racing/ui.js";

export default class ScnMain extends Phaser.Scene {

    constructor() {
        super("ScnMain");
    }

    init(_data) {
        this.bikeData = _data.bikeData;
        this.bikeData.asset += _data.livery;
    }

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

        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = {
            e: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
            q: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
            w: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            a: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            s: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            d: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
            end: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.END),
            one: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE),
            two: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO),
            three: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE),
            four: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR),
            five: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE),
            six: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX),
            seven: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEVEN),
            eight: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.EIGHT),
            nine: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NINE),
            zero: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO),
            tab: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB),
            plus: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ADD),
            minus: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_SUBSTRACT),
        }

        this.hand = new Hand(this);
        this.musicPlayer = new MusicPlayer(this);
        //this.musicPlayer.playTrackRandom();
        this.trackGenerator = new TrackGenerator(this);

        this.you = null;
        this.playersData = null;
        this.currentTrack = 0;
        this.trackData = null;
        this.trackLength = 0;
        this.trackPoints = [];

        this.obstacles = [];
        this.slices = [];
        for(let i = 0 ; i < 64 ; i++){
            this.slices.push(new Segment(this, { x: 0, y: 0, z: i }, 0, "sprSegStartTunnel00", i % 4 === 0 ? 0 : 1));
        }

        this.zoom = 16;
        this.player = {
            trackPos: 0,
            roll: 0,
            pos: {
                x: 0,
                y: 0,
                z: 0
            },
            spd: {
                max: 1,
                current: 0,
            },
            acc: 0.01,
            stats: this.bikeData,
        }

        this.otherPlayers = [];

        //this.player.sndEngine.play();
        this.sndNewRecord = this.sound.add("sndNewRecord", { volume: OPTIONS.sound.speech});
        this.sndCountdownGo = this.sound.add("sndCountdownGo", { volume: OPTIONS.sound.speech});
        this.sndCountdownOne = this.sound.add("sndCountdownOne", { volume: OPTIONS.sound.speech});
        this.sndCountdownTwo = this.sound.add("sndCountdownTwo", { volume: OPTIONS.sound.speech});
        this.sndCountdownThree = this.sound.add("sndCountdownThree", { volume: OPTIONS.sound.speech});

        //console.log(socket);
        socket.on("pongTest", (_data) => {pongTest
            console.log(_data);
        });
        
        socket.on("getPlayers", (_data) => {
            console.log(_data);
            this.you = _data.you;
            this.playersData = _data.playersData;
            this.switchToTrack(_data.track);

            this.createTrack();

            this.synchronize();
        });

        socket.on("synchUpdate", (_data) => {
            //console.log(_data);
            /*this.playersData = _data.playersData;

            this.synchronize();*/
        });
        
        socket.on("switchTrack", (_data) => {
            this.switchToTrack(_data.track);
            /*if (this.ui.btnScore.active === true) {
                this.ui.btnScore.simulateClick();
            }*/
        });

        socket.on("kickPlayer", (_data) => {
            /*for(let i = this.otherPlayers.length - 1 ; i >= 0 ; i--){
                if(this.otherPlayers[i].id === _data.id){
                    this.otherPlayers[i].sndEngine.stop();
                    this.otherPlayers[i].sprite.destroy();
                    this.otherPlayers.splice(i, 1);
                }
            }*/
        });

        socket.emit("joinPlayer", {
            bikeData: this.bikeData
        });

        this.delta = {
            current: 0,
            treshold: 16,
        }

        this.cameras.main.fadeFrom(500, 0, 0, 0, false, (_cam, _pct) => {

        }, this);

        console.log(this);
    }

    update(_time, _delta){
        //greenscalePipeline.setFloat1('time', _time * 0.01);
        //console.log(_time);

        this.hand.update();
        this.fillInputs();

        this.delta.current += _delta;
        while (this.delta.current >= this.delta.treshold){
            this.delta.current -= this.delta.treshold;
            //do stuff

            if (INPUTS.stickLeft.vertical < -0.3) {//if (this.cursors.up.isDown) {
                if (this.player.spd.current < this.player.spd.max) {
                    this.player.spd.current = Math.min(this.player.spd.max, this.player.spd.current + this.player.stats.acceleration);
                }
            } else if (INPUTS.stickLeft.vertical > 0.3) {//} else if (this.cursors.down.isDown) {
                if (this.player.spd.current > 0) {
                    this.player.spd.current = Math.max(0, this.player.spd.current - this.player.stats.brake);
                }
                this.player.spd.current = Math.max(0, this.player.spd.current);
            } else {
                if (this.player.spd.current > 0) {
                    this.player.spd.current = Math.max(0, this.player.spd.current - this.player.stats.friction);
                }
            }
            if (this.player.spd.current > this.player.spd.max) {
                this.player.spd.current = Math.max(0, this.player.spd.current - this.player.stats.speedDeg);
            }

            if(this.trackPoints.length > 0){
                //calculate how often to jump along the track
                let trackPos = this.player.trackPos;
                this.player.trackPos += this.player.spd.current;
                if(this.player.trackPos >= this.trackLength){this.player.trackPos -= this.trackLength;}
                let diff = this.player.trackPos - trackPos;
                let jumps = [];
                do{
                    jumps.push(Math.min(diff, 1)); //the spd is saved in a jump eg [1, 1, 0.5]
                    diff -= 1;
                } while (diff > 0)
                
                let trackPosFloored = Math.floor(this.player.trackPos);

                for(let j = 0 ; j < jumps.length ; j++){
                    let root = {
                        pos: {
                            x: 0,
                            y: 0,
                            z: 0
                        },
                        curve: {
                            x: 0,
                            y: 0
                        }
                    }
                    //calculate from 0 to slices.length  += curve the trajectory of the track

                    for (let sliceIndex = 0; sliceIndex < this.slices.length; sliceIndex++){
                        let slice = this.slices[sliceIndex];
                        let pos = trackPosFloored + sliceIndex;
                        if(pos >= this.trackLength){pos -= this.trackLength;}
                        
                        let p = this.trackPoints[pos];
                        slice.curve.x = p.curve.x;
                        slice.curve.y = p.curve.y;
                        slice.pos.x = root.pos.x - (Math.sin((root.curve.x + p.curve.x)) * 10), // cuerve + HALPPI
                        slice.pos.y = root.pos.y + (Math.sin((root.curve.y + p.curve.y)) * 10),
                        slice.pos.z = root.pos.z + (Math.cos((root.curve.x + p.curve.x)) * 1),
                        slice.asset = p.asset;
                        slice.frame = p.subImg;
                        slice.sprite.setTexture(slice.asset, slice.frame);

                        root.pos.x = slice.pos.x;
                        root.pos.y = slice.pos.y;
                        root.pos.z = slice.pos.z;
                        root.curve.x += p.curve.x,
                        root.curve.y += p.curve.y

                        slice.update3d();
                    }
                }
            }


        }
    }

    resetPlayer(){

    }

    switchToTrack(_no) {
        console.log("switchting to track " + _no);
        this.currentTrack = _no;
        this.player.waitingTunnel = false;
        this.player.controls = SHIPCONTROLS.autoZero;
        this.resetTrack();
        //this.resetSpawner();
        this.trackGenerator.createTrackData(_no);
        this.resetPlayer();
        //this.startFinishTxt.txt.setText("please\nwait");
        //this.startCountdown();
    }

    resetTrack(){

    }

    createTrack(){
        console.log(this.trackData);

        let root = {
            pos: {
                x: 0,
                y: 0,
                z: 0
            },
            subImg: 0
        }

        this.trackPoints = [];
        for(let sector of this.trackData){
            for(let s of sector.segments){
                let imgSpd = s.imgSpd;
                for(let i = 0 ; i < s.units ; i ++){
                    if(s.imgSpd === -1){
                        root.subImg = Math.floor(Math.random() * s.subimgArr.length);
                    }

                    this.trackPoints.push({
                        pos: {
                            x: root.pos.x + (Math.sin(s.curve.x + HALFPI) * 1), //curve.val + HALFPI
                            y: root.pos.y + (Math.sin(s.curve.y + HALFPI) * 1),
                            z: root.pos.z - (Math.cos(s.curve.x + HALFPI) * 1),
                        },
                        curve: {
                            x: s.curve.x,
                            y: s.curve.y
                        },
                        roll: s.roll,
                        asset: s.asset,
                        subImg: s.subimgArr[Math.floor(root.subImg)],
                        sectorId: sector.id,
                        secctorName: sector.name,
                        sectorNext: sector.jumpTo
                    });

                    root.pos.x = this.trackPoints[this.trackPoints.length - 1].pos.x;
                    root.pos.y = this.trackPoints[this.trackPoints.length - 1].pos.y;
                    root.pos.z = this.trackPoints[this.trackPoints.length - 1].pos.z;
                    if(s.imgSpd >= 0){
                        root.subImg += s.imgSpd;
                    }else{
                        root.subImg = Math.floor(Math.random() * s.subimgArr.length)
                    }
                }
                root.subImg = 0;
            }
        }

        this.trackLength = this.trackPoints.length;

        console.log(this.trackPoints);
    }

    synchronize(){

    }

    gotoMenu(){
        this.musicPlayer.stop();
        this.sound.stopAll();

        socket.emit("leavePlayer", {
            id: this.you.id
        });

        socket.off("pongTest");
        socket.off("getPlayers");
        socket.off("synchUpdate");
        socket.off("kickPlayer");

        this.scene.start("ScnLogin");
    }

    fillInputs(){
        let gamepad = null;
        gamepad = navigator.getGamepads()[Math.max(0, gamepadsConnected - 1)];
        if(gamepad === undefined){
            gamepad = null;
        }
        
        //GAS-BREAK
        INPUTS.stickLeft.vertical = 0;
        INPUTS.stickLeft.horizontal = 0;
        if(this.keys.w.isDown || (gamepad !== null ? gamepad.buttons[7].pressed : false)){
            INPUTS.stickLeft.vertical = -1;
        } else if (this.keys.s.isDown || (gamepad !== null ? gamepad.buttons[6].pressed : false)) {
            INPUTS.stickLeft.vertical = 1;
        }else{
            if(gamepad !== null){
                //INPUTS.stickLeft.vertical = gamepad.axes[1];
            }
        }
        //LEFT-RIGHT
        if (this.keys.a.isDown || this.cursors.left.isDown) {
            INPUTS.stickLeft.horizontal = -1;
        } else if (this.keys.d.isDown || this.cursors.right.isDown) {
            INPUTS.stickLeft.horizontal = 1;
        } else {
            if (gamepad !== null) {
                INPUTS.stickLeft.horizontal = gamepad.axes[0];
            }
        }
        //PITCH UP-DOWN
        INPUTS.stickRight.vertical = 0;
        INPUTS.stickRight.horizontal = 0;
        if (this.cursors.up.isDown) {
            INPUTS.stickRight.vertical = -1;
        } else if (this.cursors.down.isDown) {
            INPUTS.stickRight.vertical = 1;
        } else {
            if (gamepad !== null) {
                INPUTS.stickRight.vertical = gamepad.axes[3];
            }
        }
        //LOOK LEFT-RIGHT
        if (this.keys.q.isDown) {
            INPUTS.stickRight.horizontal = -1;
        } else if (this.keys.e.isDown) {
            INPUTS.stickRight.horizontal = 1;
        } else {
            if (gamepad !== null) {
                INPUTS.stickRight.horizontal = gamepad.axes[2];
            }
        }
        //TAB
        if (this.keys.tab.isDown || (gamepad !== null ? gamepad.buttons[4].pressed : false)) {
            if (INPUTS.btnShoulderLeft.pressed === false) {
                INPUTS.btnShoulderLeft.justPressed = true;
                INPUTS.btnShoulderLeft.pressed = true;
                INPUTS.btnShoulderLeft.justReleased = false;
            } else {
                INPUTS.btnShoulderLeft.justPressed = false;
            }
        } else {
            if (INPUTS.btnShoulderLeft.pressed === true) {
                INPUTS.btnShoulderLeft.pressed = false;
                INPUTS.btnShoulderLeft.justReleased = true;
                INPUTS.btnShoulderLeft.justPressed = false;
            } else {
                INPUTS.btnShoulderLeft.justReleased = false;
            }
        }
        //A
        if (this.keys.end.isDown || (gamepad !== null ? gamepad.buttons[1].pressed : false)) {
            if (INPUTS.btnA.pressed === false) {
                INPUTS.btnA.justPressed = true;
                INPUTS.btnA.pressed = true;
                INPUTS.btnA.justReleased = false;
            } else {
                INPUTS.btnA.justPressed = false;
            }
        } else {
            if (INPUTS.btnA.pressed === true) {
                INPUTS.btnA.pressed = false;
                INPUTS.btnA.justReleased = true;
                INPUTS.btnA.justPressed = false;
            } else {
                INPUTS.btnA.justReleased = false;
            }
        }
    }
}