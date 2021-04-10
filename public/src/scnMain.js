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

        this.keyNumber = [this.keys.one, this.keys.two, this.keys.three, this.keys.four, this.keys.five, this.keys.six];
        for(let [i, k] of this.keyNumber.entries()){
            k.on("up", (_key, _event) => {
                socket.emit("forceSwitchTrack", {
                    track: i
                });
            }, this);
        }

        this.keys.q.on("down", (_key, _event) => {
            _event.stopPropagation();
            console.log(navigator.getGamepads()[Math.max(0, gamepadsConnected - 1)]);
        }, this);

        this.keys.plus.on("down", (_key, _event) => {
            _event.stopPropagation();
            socket.emit("forceSwitchTrack", {
                track: this.currentTrack + 1
            });
        }, this);

        this.keys.minus.on("down", (_key, _event) => {
            _event.stopPropagation();
            socket.emit("forceSwitchTrack", {
                track: this.currentTrack - 1
            });
        }, this);

        this.keys.tab.on('down', (_key, _event) => {
            _event.stopPropagation();
            this.ui.btnScore.simulateClick();
        }, this);
        this.keys.tab.on('up', (_key, _event) => {
            _event.stopPropagation();
            this.ui.btnScore.simulateClick();
        }, this);

        this.keys.space.on('down', function (key, event) {
            console.log(this.player.trackPos);
        }, this);

        this.hand = new Hand(this);
        this.musicPlayer = new MusicPlayer(this);
        this.musicPlayer.playTrackRandom();
        this.trackGenerator = new TrackGenerator(this);

        //Phaser.Math.RND.sow(["seed"]);
        //console.log(Phaser.Math.RND);

        
        this.you = null;
        this.playersData = null;
        this.segments = [];
        this.obstacles = [];
        this.clutter = [];
        this.trackData = [];
        this.trackLength = 0;
        this.lapsMax = 5;
        
        this.startFinishTxt = this.trackGenerator.createTextClutter(18, 0, 10, "WELCOME");

        this.spawner = {
            trackPos: 0,
            trackArrPos: 0,
            sector: {
                id: 0,
                pos: 0,
                arrPos: 0,
                segmentArrPos: 0,
            },
            strength: 0,
            yaw: 0,
            pitch: 0,
            roll: 0,
            toRoll: 0,
            asset: "sprSegStartTunnel_",
            curve: {
                x: 0,
                y: 0
            },
            pos: {
                x: 0,
                y: 0,
                z: 0
            },
            subimgArrPos: 0,
            subimgJumper: 0,
            subimgArr: [0],
            subimage: 0,
            subimageMax: 1,
            imgSpd: 0,
            sprite: this.add.sprite(0, 0, "sprDebugTarget00")
        }
        this.spawner.sprite.depth = 11000;
        this.spawner.sprite.alpha = 0;
        
        this.zoom = 16;
        this.player = {
            waitingTunnel: false,
            inSlipstream: false,
            justOutOfSlipstream: false,
            controls: SHIPCONTROLS.free,
            spd: 0,
            spdMax: 0.25,
            slipstream: 0,
            stats: this.bikeData,
            vel: {
                x: 0,
                y: 0,
                z: 0
            },
            radius: 24,
            yaw: 0,
            pitch: 0,
            roll: 0,
            pos: {
                x: 0,
                y: 0,
                z: 0,
                to: {
                    x: 0,
                    y: 0,
                    z: 0
                }
            },
            trackPos: this.trackLength-64,
            position: -1,
            laps: 0,
            lapTime: {
                current: 0,
                best: -1,
                start: -1
            },
            sndEngine: this.sound.add("sndEngine00", { loop: true, volume: OPTIONS.sound.sfx})
        }

        this.otherPlayers = [];
        /*{
            trackPos: 128,
            sprite: this.add.sprite(0, 0, "sprBike00"),
            roll: Math.PI * -0.5,
            spd: 0.25
        }*/

        this.standings = [];

        this.ui = new Ui(this);

        this.player.sndEngine.play();
        this.sndNewRecord = this.sound.add("sndNewRecord", { volume: OPTIONS.sound.speech});
        this.sndCountdownGo = this.sound.add("sndCountdownGo", { volume: OPTIONS.sound.speech});
        this.sndCountdownOne = this.sound.add("sndCountdownOne", { volume: OPTIONS.sound.speech});
        this.sndCountdownTwo = this.sound.add("sndCountdownTwo", { volume: OPTIONS.sound.speech});
        this.sndCountdownThree = this.sound.add("sndCountdownThree", { volume: OPTIONS.sound.speech});

        this.countdown = null
        this.currentTrack = 0;

        this.jumpToWaitTunnel();

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
            this.playersData = _data.playersData;

            this.synchronize();
        });
        
        socket.on("switchTrack", (_data) => {
            this.switchToTrack(_data.track);
            if (this.ui.btnScore.active === true) {
                this.ui.btnScore.simulateClick();
            }
        });

        socket.on("kickPlayer", (_data) => {
            for(let i = this.otherPlayers.length - 1 ; i >= 0 ; i--){
                if(this.otherPlayers[i].id === _data.id){
                    this.otherPlayers[i].sndEngine.stop();
                    this.otherPlayers[i].sprite.destroy();
                    this.otherPlayers.splice(i, 1);
                }
            }
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

        //this.cameras.main.setRenderToTexture(greenscalePipeline);
    }

    update(_time, _delta){
        //greenscalePipeline.setFloat1('time', _time * 0.01);
        //console.log(_time);

        this.hand.update();
        this.fillInputs();

        this.delta.current += _delta;
        while (this.delta.current >= this.delta.treshold){
            this.delta.current -= this.delta.treshold;

            this.player.lapTime.current = new Date().getTime();

            switch(this.player.controls){
                case SHIPCONTROLS.free:
                    if (this.hand.pressed === false) {
                        //KEYBOARD CONTROLS
                        //gas gas gas
                        if (INPUTS.stickLeft.vertical < -0.3) {//if (this.cursors.up.isDown) {
                            if (this.player.spd < this.player.spdMax) {
                                this.player.spd = Math.min(this.player.spdMax, this.player.spd + this.player.stats.acceleration);
                            }
                        } else if (INPUTS.stickLeft.vertical > 0.3) {//} else if (this.cursors.down.isDown) {
                            if (this.player.spd > 0) {
                                this.player.spd = Math.max(0, this.player.spd - this.player.stats.brake);
                            }
                            this.player.spd = Math.max(0, this.player.spd);
                        } else {
                            if (this.player.spd > 0) {
                                this.player.spd = Math.max(0, this.player.spd - this.player.stats.friction);
                            }
                        }
                        if (this.player.spd > this.player.spdMax) {
                            this.player.spd = Math.max(0, this.player.spd - this.player.stats.speedDeg);
                        }

                        //roll around the tunnel
                        this.player.roll += this.player.stats.roll * Math.max(-1, Math.min(1, Math.abs(INPUTS.stickLeft.horizontal) > 0.3 ? INPUTS.stickLeft.horizontal : 0));
                    
                        //pitch nose up or down
                        this.player.pitch += INPUTS.stickRight.vertical;
                        this.player.pitch = Math.max(this.player.stats.pitchMin, Math.min(this.player.stats.pitchMax, this.player.pitch));
                        this.player.radius = this.player.stats.rideHeight + this.player.pitch;
                        if(Math.abs(INPUTS.stickRight.vertical <= 0.3)){
                            this.player.pitch += this.player.pitch < 0 ? 0.1 : -0.1;
                            if (this.player.pitch <= 0.1 && this.player.pitch >= -0.1){
                                this.player.pitch = 0;
                            }
                        }
                    } else {
                        //MOUSE CONTROLS
                        if (this.hand.pos.y < this.game.config.height * 0.25) {
                            if (this.player.spd < this.player.spdMax) {
                                this.player.spd = Math.min(this.player.spdMax, this.player.spd + this.player.stats.acceleration);
                            }
                        } else {
                            if (this.player.spd > 0) {
                                this.player.spd = Math.max(0, this.player.spd - this.player.stats.brake);
                            }
                            this.player.spd = Math.max(0, this.player.spd);
                        }

                        if (this.player.spd > this.player.spdMax) {
                            this.player.spd = Math.max(0, this.player.spd - this.player.stats.speedDeg);
                        }

                        let amt = this.hand.start.x - this.hand.pos.x;
                        //console.log(amt);
                        if (Math.abs(amt) > 8) {
                            let modAmt = (this.hand.start.x - this.hand.pos.x) - (Math.sign(amt) * 8);
                            this.player.roll -= Math.max(-this.player.stats.roll, Math.min(this.player.stats.roll, modAmt * 0.001));
                        }
                    }
                    break;
                case SHIPCONTROLS.jump:
                    if (this.player.spd < this.player.spdMax) {
                        this.player.spd = Math.min(this.player.spdMax, this.player.spd + this.player.stats.acceleration);
                    }

                    if (this.player.roll > 0) {
                        this.player.roll -= Math.min(this.player.stats.roll, this.player.roll);
                    }
                    if (this.player.roll < 0) {
                        this.player.roll += Math.min(this.player.stats.roll, this.player.roll);
                    }
                    break;
                case SHIPCONTROLS.autopilot:
                    break;
                case SHIPCONTROLS.autoZero:
                    //autostart
                    if (this.player.spd < this.player.spdMax) {
                        this.player.spd = Math.min(this.player.spdMax, this.player.spd + this.player.stats.acceleration);
                    }
                    if (this.player.spd > this.player.spdMax) {
                        this.player.spd = Math.max(0, this.player.spd - this.player.stats.speedDeg * 10);
                    }

                    //TODO CHECK IF THIS LEADS TO PLAYER COLLISIONS maybe fan out in standings order
                    if (this.player.roll > 0) {
                        this.player.roll -= Math.min(this.player.stats.roll, this.player.roll);
                    }
                    if (this.player.roll < 0) {
                        this.player.roll += Math.min(this.player.stats.roll, this.player.roll);
                    }
                    break;
                case SHIPCONTROLS.stopZero:
                    break;
                default:
                    break;
            }

            //keep roll within PI
            if (this.player.roll > Math.PI) {
                this.player.roll -= Math.PI * 2;
            }else if(this.player.roll <= Math.PI * -1){
                this.player.roll += Math.PI * 2;
            }



            let root = {
                x: 0,
                y: 0,
                z: 0
            }
            //move spawner
            if (this.segments.length > 0) {
                root = {
                    x: this.segments[0].pos.x,
                    y: this.segments[0].pos.y,
                    z: this.segments[0].pos.z
                }

                //OLD SPAWN MOVE
                let overZero = this.spawner.pos.x > 0 ? true : false;
                this.spawner.pos.x -= (root.x * (root.z + 64)) * this.player.spd;
                if ((this.spawner.pos.x < 0 && overZero === true) || (this.spawner.pos.x > 0 && overZero === false)){
                    this.spawner.pos.x = 0;
                }

                overZero = this.spawner.pos.y > 0 ? true : false;
                this.spawner.pos.y -= (root.y * (root.z + 64)) * this.player.spd;
                if ((this.spawner.pos.y < 0 && overZero === true) || (this.spawner.pos.y > 0 && overZero === false)) {
                    this.spawner.pos.y = 0;
                }
                

                //CHECK MAX SPEED
                let checkY = this.segments[16].screenPos.y + (24 * this.zoom);
                let modify = Math.round(checkY * -0.01);
                if(modify < 0){//curve down
                    if(this.player.radius < this.player.stats.rideHeight){
                        
                    }else{
                        //heat up
                        console.log("HEATING UP");
                    }
                } else if (modify > 0){//curve up
                    if (this.player.radius > this.player.stats.rideHeight) {
                        //heat up
                        console.log("SCRAPING FLOOR")
                    } else {
                        //cool
                    }
                }

                //adaptivespeed
                this.player.spdMax = Math.max(0.05, Math.min(0.9, this.player.stats.spd + this.player.slipstream + ((modify * this.player.stats.curveMod) * 0.1)));

                this.ui.tacho.setReticleTunnelPos(this.segments[this.segments.length - 2].sprite.x, this.segments[this.segments.length - 2].sprite.y, 16 - Math.floor(this.player.spd * 16));
            }

            //UPDATE THE REST
            for(let i = this.segments.length-1 ; i >= 0 ; i--){
                let s = this.segments[i];

                //OLD SPAWN MOVE
                let overZero = s.pos.x > 0 ? true : false;
                s.pos.x -= (root.x * s.pos.z) * this.player.spd;
                if ((s.pos.x < 0 && overZero === true) || (s.pos.x > 0 && overZero === false)) {
                    s.pos.x = 0;
                }

                overZero = s.pos.y > 0 ? true : false;
                s.pos.y -= (root.y * s.pos.z) * this.player.spd;
                if ((s.y < 0 && overZero === true) || (s.pos.y > 0 && overZero === false)) {
                    s.pos.y = 0;
                }

                s.pos.z -= this.player.spd;
                s.update();

                if(s.toKill === true){
                    //MOVE SPAWNER
                    let dif = Math.abs(this.spawner.roll - this.spawner.toRoll);
                    if (this.spawner.roll < this.spawner.toRoll) {
                        this.spawner.roll += Math.min(0.025, dif);//0.025
                    }
                    if (this.spawner.roll > this.spawner.toRoll) {
                        this.spawner.roll -= Math.min(0.025, dif);//0.025
                    }
                    //correct roll
                    if (this.spawner.roll > Math.PI) {
                        this.spawner.roll -= Math.PI * 2;
                        this.spawner.toRoll -= Math.PI * 2;
                    }
                    if (this.spawner.roll <= Math.PI * -1) {
                        this.spawner.roll += Math.PI * 2;
                        this.spawner.toRoll += Math.PI * 2;
                    }

                    //OLD SPAWN MOVE
                    this.spawner.yaw += this.spawner.curve.x;
                    this.spawner.pitch += this.spawner.curve.y;

                    this.spawner.pos.x += this.spawner.yaw.toFixed(2) * 100;
                    this.spawner.pos.y += this.spawner.pitch.toFixed(2) * 100;

                    this.spawner.sprite.x = this.spawner.pos.x;
                    this.spawner.sprite.y = this.spawner.pos.y;

                    //feed spawener data to segment and jump it to the far end
                    s.pos.x = this.spawner.pos.x;//this.segments[this.segments.length-1].pos.x + (this.spawner.yaw * 100)//this.spawner.pos.x;
                    s.pos.y = this.spawner.pos.y;//this.segments[this.segments.length-1].pos.y + (this.spawner.pitch * 100)//this.spawner.pos.y;
                    s.pos.z += 64;
                    s.curve.x = this.spawner.yaw;
                    s.curve.y = this.spawner.pitch;
                    s.dir = this.spawner.roll;
                    s.toKill = false;

                    if(s.sprite.texture.key !== this.spawner.asset){
                        s.sprite.setTexture(this.spawner.asset);
                    }
                    s.sprite.setFrame(this.spawner.subimage);
                    //s.sprite.setTexture(this.spawner.asset, this.spawner.subimage);
                    if(this.spawner.imgSpd !== -1){
                        this.spawner.subimgJumper += this.spawner.imgSpd;
                        if(this.spawner.subimgJumper >= 1){
                            this.spawner.subimgJumper = 0;
                            this.spawner.subimgArrPos += 1;
                            if(this.spawner.subimgArrPos >= this.spawner.subimgArr.length){
                                this.spawner.subimgArrPos = 0;
                            }
                            this.spawner.subimage = this.spawner.subimgArr[this.spawner.subimgArrPos];
                        }
                    }else{
                        this.spawner.subimage = Math.floor(Math.random() * this.spawner.subimgArr.length);
                    }                  
                    

                    //advance player and check if new lap
                    this.player.trackPos += 1;
                    if (this.player.trackPos >= this.trackLength && this.player.waitingTunnel === false) {
                        console.log("new LAP");
                        this.player.trackPos = 0;
                        this.player.laps += 1;

                        if (this.player.lapTime.best !== -1) {
                            if (this.player.lapTime.current - this.player.lapTime.start < this.player.lapTime.best) {
                                //set a new record
                                this.player.lapTime.best = this.player.lapTime.current - this.player.lapTime.start;
                                this.ui.tacho.setBestTime(this.player.lapTime.best);
                                this.sndNewRecord.play();
                            }
                        } else {
                            if (this.player.lapTime.start !== -1) {
                                //set first lap delta
                                this.player.lapTime.best = this.player.lapTime.current - this.player.lapTime.start;
                                this.ui.tacho.setBestTime(this.player.lapTime.best);
                            }
                        }
                        this.player.lapTime.start = new Date().getTime();

                        //finished? reset evrything to a waaiting start tunnel
                        if (this.player.laps > this.lapsMax) {
                            this.jumpToWaitTunnel();
                            if(this.ui.btnScore.active === false){
                                this.ui.btnScore.simulateClick();
                            }
                        }
                    }

                    
                    this.spawner.trackPos += 1;
                    if (this.spawner.trackPos >= this.trackData[this.spawner.sector.arrPos].segments[this.spawner.sector.segmentArrPos].units){
                        //jump to next segment
                        this.spawner.trackPos = 0;
                        this.spawner.sector.segmentArrPos += 1;
                        this.spawner.subimgArrPos = 0;
                        this.spawner.subimage = this.spawner.subimgArr[this.spawner.subimgArrPos];
                        
                        //next section of segments
                        if (this.spawner.sector.segmentArrPos >= this.trackData[this.spawner.sector.arrPos].segments.length) {
                            this.spawner.sector.segmentArrPos = 0;
                            /*this.spawner.sector.arrPos += 1;
                            if (this.spawner.sector.arrPos >= this.trackData.length){
                                this.spawner.sector.arrPos = 0;
                            }*/
                            this.spawner.sector.arrPos = this.trackData[this.spawner.sector.arrPos].jumpTo;
                            /*if(this.spawner.sector.arrPos === 0){
                                //new lap
                            }*/
                            //console.log(this.trackData[this.spawner.sector.arrPos].name);
                        }
                    }
                    if (this.spawner.trackPos === 0) {
                        //console.log("arrPos" + this.spawner.sector.arrPos);
                        //console.log("segmentArrPos" + this.spawner.sector.segmentArrPos);

                        this.spawner.asset = this.trackData[this.spawner.sector.arrPos].segments[this.spawner.sector.segmentArrPos].asset;
                        this.spawner.subimgArr = this.trackData[this.spawner.sector.arrPos].segments[this.spawner.sector.segmentArrPos].subimgArr;
                        this.spawner.subimgArrPos = 0;
                        this.spawner.subimage = this.spawner.subimgArr[this.spawner.subimgArrPos];
                        this.spawner.imgSpd = this.trackData[this.spawner.sector.arrPos].segments[this.spawner.sector.segmentArrPos].imgSpd;
                        //absolute curving
                        this.spawner.curve.x = this.trackData[this.spawner.sector.arrPos].segments[this.spawner.sector.segmentArrPos].curve.x;
                        this.spawner.curve.y = this.trackData[this.spawner.sector.arrPos].segments[this.spawner.sector.segmentArrPos].curve.y;
                        this.spawner.toRoll = this.trackData[this.spawner.sector.arrPos].segments[this.spawner.sector.segmentArrPos].roll;
                    }
                }
            }

            this.segments = this.segments.sort((a, b) => a.pos.z - b.pos.z);

            if(this.playersData !== null){
                socket.emit("updatePlayer", {
                    id: this.you.id,
                    spd: this.player.spd,
                    roll: this.player.roll,
                    trackPos: this.player.trackPos,
                    laps: this.player.laps,
                    lapTime: this.player.lapTime.start !== -1 ? this.player.lapTime.current - this.player.lapTime.start : 0,
                    bestLapTime: this.player.lapTime.best !== -1 ? this.player.lapTime.best : 0
                });
            }

        }

        //UPDATE OTHER PLAYERRS and STUFF
        let adjPlayerTrackPos = this.player.trackPos;
        if (adjPlayerTrackPos + 64 > this.trackLength) {
            adjPlayerTrackPos -= this.trackLength;
        }
        this.updateOtherPlayers(adjPlayerTrackPos);
        this.updateObstacles(adjPlayerTrackPos);

        //UPDATE START FINISH TEXT
        if (this.countdown === null) {
            if (this.startFinishTxt.trackPos < adjPlayerTrackPos + 64 && this.startFinishTxt.trackPos > adjPlayerTrackPos) {
                if (this.player.waitingTunnel === false) {
                    this.startFinishTxt.txt.setText((Math.max(1, this.player.laps)) + "/" + String(this.lapsMax) + " LAPS");
                } else {
                    this.startFinishTxt.txt.setText("");
                }
                let parent = this.segments[this.startFinishTxt.trackPos - adjPlayerTrackPos];
                let pos = {
                    x: parent.pos.x,
                    y: parent.pos.y,
                    z: this.startFinishTxt.trackPos - adjPlayerTrackPos
                }
                let dz = 1 / pos.z;
                let shade = Math.max(0, 255 - (pos.z * 4));

                this.startFinishTxt.roll -= ((this.startFinishTxt.roll - this.player.roll) * 0.05);

                this.startFinishTxt.txt.x = (parent.screenPos.x + Math.cos((this.startFinishTxt.roll * -1) + (Math.PI * 0.5) + this.player.roll) * (this.startFinishTxt.len * this.zoom)) * dz;
                this.startFinishTxt.txt.y = (parent.screenPos.y + Math.sin((this.startFinishTxt.roll * -1) + (Math.PI * 0.5) + this.player.roll) * (this.startFinishTxt.len * this.zoom)) * dz;

                this.startFinishTxt.txt.rotation = this.player.roll - this.startFinishTxt.roll;

                this.startFinishTxt.txt.setFontSize((dz * this.zoom) * 8);
                this.startFinishTxt.txt.setTint(Phaser.Display.Color.GetColor(shade, shade, shade));
                this.startFinishTxt.txt.depth = dz;
                this.startFinishTxt.txt.alpha = 1;
            } else {
                this.startFinishTxt.txt.alpha = 0;
            }
        } else {
            //this.startFinishTxt.trackPos = this.player.trackPos;
            if (this.segments.length > 0) {
                let parent = this.segments[16];
                let pos = {
                    x: parent.pos.x,
                    y: parent.pos.y,
                    z: 16
                }
                let dz = 1 / pos.z;
                let shade = Math.max(0, 255 - (pos.z * 4));

                this.startFinishTxt.roll -= ((this.startFinishTxt.roll - this.player.roll) * 0.25);

                this.startFinishTxt.txt.x = (parent.screenPos.x + Math.cos((this.startFinishTxt.roll * -1) + (Math.PI * 0.5) + this.player.roll) * (this.startFinishTxt.len * this.zoom)) * dz;
                this.startFinishTxt.txt.y = (parent.screenPos.y + Math.sin((this.startFinishTxt.roll * -1) + (Math.PI * 0.5) + this.player.roll) * (this.startFinishTxt.len * this.zoom)) * dz;

                this.startFinishTxt.txt.rotation = this.player.roll - this.startFinishTxt.roll;

                this.startFinishTxt.txt.setFontSize((dz * this.zoom) * 8);
                this.startFinishTxt.txt.setTint(Phaser.Display.Color.GetColor(shade, shade, shade));
                this.startFinishTxt.txt.depth = dz;
                this.startFinishTxt.txt.alpha = 1;
            }
        }

        //engine sounds
        
        let newRate = (this.player.spd * 0.25) + 0.5;//Math.max(0, Math.min((this.player.spd * 0.25) + 0.5), 1);
        this.player.sndEngine.rate += (newRate - this.player.sndEngine.rate) * 0.5;
        //this.player.sndEngine.rate = newRate;

        this.ui.update();
    }

    updateOtherPlayers(_adjPlayerPosition){
        let target = null;
        for (let o of this.otherPlayers) {
            if(o.id !== this.you.id){
                let rec = 9999999;

                o.trackPos += o.spd;
                if (o.trackPos >= this.trackLength) {
                    o.trackPos = 0;
                }
                let adjTrackPos = o.trackPos;
                if (adjTrackPos + 64 > this.trackLength) {
                    adjTrackPos -= this.trackLength;
                }

                let difAdj = Math.max(-1, Math.min(1, (adjTrackPos - _adjPlayerPosition + 1) / 64));
                let newRate = Math.max(0, Math.min((o.spd * 0.25) + 0.5 + ((difAdj) * -1)), 1);
                o.sndEngine.rate += (newRate - o.sndEngine.rate) * 0.1;
                let newVolume = (1 - Math.abs(difAdj)) * OPTIONS.sound.sfx;
                o.sndEngine.volume += (newVolume - o.sndEngine.volume) * 0.1;

                let flPos = Math.floor(adjTrackPos);
                if (flPos < _adjPlayerPosition + 64 && flPos >= _adjPlayerPosition) {
                    let parent = this.segments[flPos - _adjPlayerPosition];
                    let pos = {
                        x: parent.pos.x,
                        y: parent.pos.y,
                        z: flPos - _adjPlayerPosition
                    }
                    let dz = 1 / pos.z;
                    let shade = Math.max(0, 255 - (pos.z * 4));

                    o.sprite.x = (parent.screenPos.x + Math.cos((o.roll * -1) + (Math.PI * 0.5) + this.player.roll) * (24 * this.zoom)) * dz;
                    o.sprite.y = (parent.screenPos.y + Math.sin((o.roll * -1) + (Math.PI * 0.5) + this.player.roll) * (24 * this.zoom)) * dz;
                    o.sprite.rotation = this.player.roll - o.roll;
                    o.sprite.setScale(dz * this.zoom);
                    o.sprite.setTint(Phaser.Display.Color.GetColor(shade, shade, shade));
                    o.sprite.depth = dz;
                    o.sprite.alpha = 1;

                    if (this.player.waitingTunnel === false) {
                        //get nearest enemy that is in front and player is in its slipstream
                        let rollDif = (this.player.roll - o.roll);
                        if (pos.z < rec) {
                            if (adjTrackPos > _adjPlayerPosition) {
                                rec = pos.z;
                                if (rollDif > Math.PI) {
                                    rollDif -= Math.PI * 2;
                                } else if (rollDif < Math.PI * -1) {
                                    rollDif += Math.PI * 2;
                                }
                                if (Math.abs(rollDif) < this.player.stats.slipZone) {
                                    target = o;
                                }
                                if (Math.abs(rollDif) < o.data.collisionZone) {
                                    //slow down and avoid other player
                                    if (adjTrackPos < _adjPlayerPosition + 3) {
                                        this.cameras.main.shake(250, (this.player.spd * 0.1) * OPTIONS.effects.screenshake, false, (_cam, _pct) => {
                                            if (OPTIONS.effects.shader === true){
                                                greenscalePipeline.setFloat1('time', _pct * 2);
                                                if (this.cameras.main.renderToTexture === false) {
                                                    this.cameras.main.setRenderToTexture(greenscalePipeline);
                                                }
                                                if (_pct >= 1) {
                                                    this.cameras.main.clearRenderToTexture();
                                                }
                                            }
                                        }, this);
                                        this.player.spd *= 0.25;
                                        this.player.roll += (rollDif) * 0.25;
                                        this.ui.flashWarning(325);
                                    }
                                }
                            }
                        }
                    }

                    if (o.sndEngine.isPlaying === false) {
                        o.sndEngine.play();
                    }
                } else {
                    o.sprite.alpha = 0;
                    if (flPos < _adjPlayerPosition && flPos >= _adjPlayerPosition - 64) {
                        this.ui.tacho.follower.push(o.roll);
                        if(o.sndEngine.isPlaying === false){
                            o.sndEngine.play();
                        }
                    }else{
                        o.sndEngine.stop();
                    }
                }
            }
        }

        if (target !== null) {
            this.ui.tacho.setReticlePos(target.sprite.x, target.sprite.y, 1 / (Math.floor(target.trackPos) - _adjPlayerPosition));
            this.player.slipstream = this.player.stats.slipMax;
        } else {
            this.player.slipstream = 0;
            this.ui.tacho.setReticlePos(99999, 9999, 0);
        }
    }

    updateObstacles(_adjPlayerPosition) {
        for (let o of this.obstacles) {
            o.trackPos += o.spd;
            if (o.trackPos >= this.trackLength) {
                o.trackPos = 0;
            }
            let adjTrackPos = o.trackPos;
            if (adjTrackPos + 64 > this.trackLength) {
                adjTrackPos -= this.trackLength;
            }
            
            o.roll += o.rollSpd;
            if(o.roll > Math.PI){
                o.roll -= Math.PI * 2;
            }else if (o.roll <= Math.PI * -1){
                o.roll += Math.PI * 2;
            }

            let flPos = Math.floor(adjTrackPos);
            if (flPos < _adjPlayerPosition + 64 && flPos > _adjPlayerPosition) {
                let parent = this.segments[flPos - _adjPlayerPosition];
                let pos = {
                    x: parent.pos.x,
                    y: parent.pos.y,
                    z: adjTrackPos - _adjPlayerPosition
                }
                let dz = 1 / pos.z;
                let shade = Math.max(0, 255 - (pos.z * 4));

                if(o.imgSpd !== -1){
                    o.subimgArrPos += o.imgSpd;
                    if(o.subimgArrPos >= o.subimgArr.length){
                        o.subimgArrPos = 0;
                    }
                    o.sprite.setTexture(o.asset + String(o.subimgArr[Math.floor(o.subimgArrPos)]));
                }else{
                    o.sprite.setTexture(o.asset + String(o.subimgArr[Math.floor(Math.random() * o.subimgArr.length)]));
                }
                o.sprite.x = (parent.screenPos.x + Math.cos((o.roll * -1) + (Math.PI * 0.5) + this.player.roll) * (o.len * this.zoom)) * dz;
                o.sprite.y = (parent.screenPos.y + Math.sin((o.roll * -1) + (Math.PI * 0.5) + this.player.roll) * (o.len * this.zoom)) * dz;
                o.sprite.rotation = this.player.roll - o.roll;
                o.sprite.setScale(dz * this.zoom);
                o.sprite.setTint(Phaser.Display.Color.GetColor(shade, shade, shade));
                o.sprite.depth = dz;
                o.sprite.alpha = 1;

                if (this.player.waitingTunnel === false) {
                    if (adjTrackPos > _adjPlayerPosition) {
                        let rollDif = (this.player.roll - o.roll);// + Math.PI;
                        if(rollDif > Math.PI){
                            rollDif -= Math.PI * 2;
                        }else if(rollDif < Math.PI * -1){
                            rollDif += Math.PI * 2;
                        }
                        if (adjTrackPos < _adjPlayerPosition + 3) {
                            if(o.trigger === false){
                                //trigger is false by default and means the object is collidable
                                if (Math.abs(rollDif) < o.collisionZone) {   
                                    //slow down and avoid obstacle
                                    this.cameras.main.shake(250, (this.player.spd * 0.1) * OPTIONS.effects.screenshake, false, (_cam, _pct) => {
                                        if (OPTIONS.effects.shader === true){
                                            greenscalePipeline.setFloat1('time', _pct * 0.01);
                                            if (this.cameras.main.renderToTexture === false) {
                                                this.cameras.main.setRenderToTexture(greenscalePipeline);
                                            }
                                            if (_pct >= 1) {
                                                this.cameras.main.clearRenderToTexture();
                                            }
                                        }
                                    }, this);
                                    this.player.spd *= 0.25;
                                    this.player.roll += (rollDif) * 0.25;
                                    o.collisionFunc();
                                    this.ui.flashWarning(325);
                                }else if(Math.abs(rollDif) < o.collisionZone + (Math.PI * 0.25)) {
                                    //near miss
                                    this.cameras.main.shake(250, (this.player.spd * 0.01) * OPTIONS.effects.screenshake, false, () => { }, this);
                                    this.player.spd = Math.min(this.player.spd * 1.035, 0.9);
                                    if (o.sndTriggered !== undefined) {
                                        if (o.sndTriggered === false) {
                                            o.sndTriggered = true;
                                            o.snd.rate = Math.max(0.01, Math.min(1, this.player.spd));
                                            o.snd.volume = Math.max(0, Math.min(1, this.player.spd)) * OPTIONS.sound.sfx;
                                            o.snd.play();
                                        }
                                    }
                                }
                            }else{
                                //if trigger === true only fire collisionFunc as a trigger visible or not
                                if (Math.abs(rollDif) < o.collisionZone) {
                                    o.collisionFunc();
                                }
                            }
                        }
                    }
                }
            } else {
                o.sprite.alpha = 0;
                if (o.sndTriggered !== undefined) {
                    o.sndTriggered = false;
                }
            }
        }
    }

    synchronize(){
        for(let d of this.playersData){
            if(d.id !== this.you.id){
                let found = false;
                for(let op of this.otherPlayers){
                    if(op.id === d.id){
                        found = true;

                        op.data = d.data;
                        op.spd = d.spd;
                        op.roll = d.roll;
                        op.trackPos = d.trackPos;
                        op.laps = d.laps;
                    }
                }

                if(found === false){
                    this.otherPlayers.push({
                        data: d.data,
                        id: d.id,
                        spd: d.spd,
                        roll: d.roll,
                        trackPos: d.trackPos,
                        sprite: this.add.sprite(0, 0, d.data.asset),
                        sndEngine: this.sound.add("sndEngine00", { loop: true, volume: OPTIONS.sound.sfx })
                    });
                }
            }
        }

        this.standings = this.playersData.sort((a, b) => (b.trackPos + (this.scene.trackLength * b.laps)) - (a.trackPos + (this.scene.trackLength * a.laps)));
        this.player.position = this.getStanding(this.you.id);
    }

    getStanding(_id){
        for(let [i, p] of this.standings.entries()){
            if (p.id === _id){
                return i+1;
            }
        }
        return -1;
    }


    createTrack(){
        this.segments.push(new Segment(this, { x: 0, y: 0, z: 0 }, 0, "sprSegStartTunnel00", 0));
        for(let i = 1 ; i < 64 ; i++){
            this.segments.push(new Segment(this, { x: 0, y: 0, z: (i * 1) }, 0, "sprSegStartTunnel00", (i % 4 === 0 ? 0 : 1)));
        }
    }

    resetTrack() {
        for (let [i, s] of this.segments.entries()) {
            s.pos.x = 0;
            s.pos.y = 0;
            s.pos.z = i;
            s.dir = 0;
            s.sprite.setTexture("sprSegStartTunnel00", (i % 4 === 0 ? 0 : 1));
        }

        for (let o of this.obstacles) {
            o.snd.stop();
            o.sprite.destroy();
        }
        this.obstacles = [];
    }

    resetSpawner() {
        this.spawner.trackPos = 0;
        this.spawner.trackArrPos = 0;
        this.spawner.sector = {
            id: 0,
            pos: 0,
            arrPos: 0,
            segmentArrPos: 0,
        },
        this.spawner.yaw = 0;
        this.spawner.pitch = 0;
        this.spawner.roll = 0;
        this.spawner.toRoll = 0;
        this.spawner.asset = "sprSegStartTunnel00",
        this.spawner.curve.x = 0;
        this.spawner.curve.y = 0;
        this.spawner.pos.x = 0;
        this.spawner.pos.y = 0;
        this.spawner.pos.z = 0;
        this.spawner.subimgArrPos = 0;
        this.spawner.subimgJumper = 0;
        this.spawner.subimgArr = [0];
        this.spawner.subimage = 0;
        this.spawner.subimageMax = 1;
        this.spawner.imgSpd = 0;
    }

    resetPlayer() {
        this.player.trackPos = this.trackLength - 64,
        this.player.laps = 0;
        this.player.lapTime.current = 0;
        this.player.lapTime.best = -1;
        this.player.lapTime.start = -1;
    }

    jumpToWaitTunnel() {
        this.player.waitingTunnel = true;
        this.player.controls = SHIPCONTROLS.autoZero;
        this.resetTrack();
        this.resetSpawner();
        this.trackGenerator.createTrackData(-1);
        this.startFinishTxt.txt.setText("please\nwait");
    }

    switchToTrack(_no){
        console.log("switchting to track " + _no);
        this.currentTrack = _no;
        this.player.waitingTunnel = false;
        this.player.controls = SHIPCONTROLS.autoZero;
        this.resetTrack();
        this.resetSpawner();
        this.trackGenerator.createTrackData(_no);
        this.resetPlayer();
        this.startFinishTxt.txt.setText("please\nwait");
        this.startCountdown();
    }

    startCountdown(){
        if (this.countdown !== null) {
            clearInterval(this.countdown.timer);
            this.countdown = null;
        }
        this.countdown = {
            count: 3,
            timer: setInterval(() => {
                switch (this.countdown.count) {
                    case 3:
                        this.sndCountdownThree.play();
                        this.startFinishTxt.txt.setText("THREE");
                        break;
                    case 2:
                        this.sndCountdownTwo.play();
                        this.startFinishTxt.txt.setText("TWO");
                        break;
                    case 1:
                        this.sndCountdownOne.play();
                        this.startFinishTxt.txt.setText("ONE");
                        break;
                    case 0:
                        this.sndCountdownGo.play();
                        this.startFinishTxt.txt.setText("GO!");
                        break;
                    default:
                        break;
                }
                this.countdown.count -= 1;
                if (this.countdown.count === -1) {
                    this.player.controls = SHIPCONTROLS.free;
                    clearInterval(this.countdown.timer);
                    this.countdown = null;
                }
            }, 1000)
        }
    }

    gotoMenu(){
        if(this.countdown !== null){
            clearInterval(this.countdown.timer);
        }
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
        INPUTS.stickLeft.vertical = 0;
        INPUTS.stickLeft.horizontal = 0;
        //UP-DOWN
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
        INPUTS.stickRight.vertical = 0;
        INPUTS.stickRight.horizontal = 0;
        //UP-DOWN
        if (this.cursors.up.isDown) {
            INPUTS.stickRight.vertical = -1;
        } else if (this.cursors.down.isDown) {
            INPUTS.stickRight.vertical = 1;
        } else {
            if (gamepad !== null) {
                INPUTS.stickRight.vertical = gamepad.axes[3];
            }
        }
        /*//LEFT-RIGHT
        if (this.cursors.left.isDown) {
            INPUTS.stickRight.horizontal = -1;
        } else if (this.cursors.right.isDown) {
            INPUTS.stickRight.horizontal = 1;
        } else {
            if (gamepad !== null) {
                INPUTS.stickRight.horizontal = gamepad.axes[2];
            }
        }*/
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
        if (this.keys.end.isDown || (gamepad !== null ? gamepad.buttons[0].pressed : false)) {
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