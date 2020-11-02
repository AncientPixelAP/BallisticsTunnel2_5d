import Hand from "./hand.js";
import Segment from "./segment.js";
import Ui from "./ui.js";

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
        }

        this.keys.w.on('down', function (key, event) {
            // event.stopPropagation();
        }, this);

        this.keys.space.on('down', function (key, event) {
            console.log(this.player.trackPos);
        }, this);

        this.hand = new Hand(this);
        
        //Phaser.Math.RND.sow(["seed"]);
        //console.log(Phaser.Math.RND);
        
        //this.bsp = this.add.bitmapText(-124, -124, "pixelmix", "", 8, 1);//.setOrigin(0.5);
        //this.bsp.depth = 10000;
        /*this.deb = this.add.bitmapText(-124, -100, "pixelmix", "", 8, 1);//.setOrigin(0.5);
        this.deb.depth = 10000;
        this.deb.setTint(0xff0000);*/
        //this.debugArrow = this.add.sprite(-124, -50, "sprDebugArrow00");
        //this.debugArrow.depth = 10000;

        
        this.you = null;
        this.playersData = null;
        this.segments = [];
        this.obstacles = [];
        this.clutter = [];
        this.trackData = [
            this.createSegment(0, 0, 0, "sprSegFinishLineClamp_", [0], 0, 1),
            this.createSegment(0, 0, 0, "sprSegFinishLine_", [0, 1], 0.25, 16),
            this.createSegment(0, 0, 0, "sprSegFinishLineClamp_", [0], 0, 1),

            this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
            this.createSegment(0, 0, 0, "sprSegMetalRoad00_", [0], 0, 64),
            this.createSegment(0.05, 0, Math.PI * -0.5, "sprSegMetalRoad01_", [0], 0, 64),
            this.createSegment(-0.05, 0.025, Math.PI * -1, "sprSegMetalRoad02_", [0, 1], 1, 64),
            this.createSegment(0, 0, Math.PI * -1, "sprSegMetalRoad02_", [0, 1], 1, 64),
            this.createSegment(0.05, -0.025, 0, "sprSegMetalRoad01_", [0], 0, 64),
            this.createSegment(-0.05, 0, 0, "sprSegMetalRoad00_", [0], 0, 64),

            this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
            this.createSegment(0, 0, 0, "sprSegMetalRoad04_", [0, 1, 2, 3, 4, 5], 1, 60),
            this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),

            this.createSegment(0, 0, Math.PI * 2, "sprSegTreeRoad00_", [0, 1, 2, 3, 4, 5, 6, 7], -1, 64),
            this.createSegment(0, 0.1, 0, "sprSegTreeRoad00_", [0, 1, 2, 3, 4, 5, 6, 7], -1, 64),
            this.createSegment(0, -0.1, 0, "sprSegTreeRoad00_", [0, 1, 2, 3, 4, 5, 6, 7], -1, 64),
            this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),

            this.createSegment(-0.05, 0, Math.PI * 0.25, "sprSegMetalRoad02_", [0, 1], 1, 64),
            this.createSegment(0.05, 0, Math.PI * 0.25, "sprSegMetalRoad02_", [0, 1], 1, 64),
            this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 0, 2),
            this.createSegment(0, 0, 0, "sprSegMetalRoad01_", [0], 0, 30),
            this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
            this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),

            this.createSegment(0, 0, 0, "sprSegMetroPlatform01_", [0], 0, 2),
            this.createSegment(-0.01, 0, 0, "sprSegMetroPlatform00_", [0, 1, 2, 3, 4, 5, 6, 7], 1, 64),
            this.createSegment(0.01, 0, 0, "sprSegMetroPlatform01_", [0], 0, 2),
            this.createSegment(0.01, 0, 0, "sprSegMetroLine00_", [0, 0, 0, 3], 0.5, 62),

            this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
            this.createSegment(0, 0, 0, "sprSegMetalRoad00_", [0], 0, 64),
            this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8), 

            this.createSegment(0.01, -0.025, Math.PI, "sprSegAirVent00_", [0], 0, 96),
            this.createSegment(-0.01, 0, 0, "sprSegAirVent00_", [0], 0, 96),
            this.createSegment(0, 0.025, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
            this.createSegment(0, 0.025, 0, "sprSegMetalRoad00_", [0], 0, 88),

            this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
            this.createSegment(0, 0, 0, "sprSegMetalRoad00_", [0], 0, 64),
            this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8), 
        ];
        this.trackLength = 0;
        for(let s of this.trackData){
            this.trackLength += s.units;
        }

        this.obstacles.push(this.createObstacle(78, Math.PI * 0.5, 42, "sprObsDoor00_", [0, 0, 0, 1, 2, 3, 4, 5], 0.1, Math.PI * 0.4));
        this.obstacles.push(this.createObstacle(78, Math.PI * -0.5, 42, "sprObsDoor00_", [0, 0, 0, 1, 2, 3, 4, 5], 0.1, Math.PI * 0.4));

        /*this.obstacles.push(this.createObstacle(64, 0, 32, "sprObsBlade01_0", 0.3));
        this.obstacles.push(this.createObstacle(64, Math.PI * 0.66, 32, "sprObsBlade01_0", 0.3));
        this.obstacles.push(this.createObstacle(64, Math.PI * -0.66, 32, "sprObsBlade01_0", 0.3));*/

        this.obstacles.push(this.createObstacle(486, Math.PI, 28, "sprObsBlade01_", [0], 0, 0.3));
        this.obstacles.push(this.createObstacle(678, Math.PI, 28, "sprObsBlade01_", [0], 0, 0.3));

        this.obstacles.push(this.createObstacle(854, Math.PI, 32, "sprObsBlade01_", [0], 0, 0.3));
        this.obstacles.push(this.createObstacle(854, Math.PI * 0.33, 32, "sprObsBlade01_", [0], 0, 0.3));
        this.obstacles.push(this.createObstacle(854, Math.PI * -0.33, 32, "sprObsBlade01_", [0], 0, 0.3));

        this.obstacles.push(this.createObstacle(992, 0, 32, "sprObsDoor00_", [0, 0, 0, 1, 2, 3, 4, 5], 0.1, Math.PI * 0.5));

        this.obstacles.push(this.createObstacle(1072, Math.PI, 24, "sprObsVentBlade00_", [0], 0, 0.3));
        this.obstacles[this.obstacles.length-1].rollSpd = 0.045;
        this.obstacles.push(this.createObstacle(1072, Math.PI * 0.33, 24, "sprObsVentBlade00_", [0], 0, 0.3));
        this.obstacles[this.obstacles.length - 1].rollSpd = 0.045;
        this.obstacles.push(this.createObstacle(1072, Math.PI * -0.33, 24, "sprObsVentBlade00_", [0], 0, 0.3));
        this.obstacles[this.obstacles.length - 1].rollSpd = 0.045;

        //this.obstacles.push(this.createObstacle(1167, Math.PI * 0.25, 32, "sprObsVentDoor00_", [0], 0, Math.PI * 0.5));
        this.obstacles.push(this.createObstacle(1168, Math.PI, 24, "sprObsVentBlade00_", [0], 0, 0.3));
        this.obstacles[this.obstacles.length - 1].rollSpd = -0.025;
        this.obstacles.push(this.createObstacle(1168, Math.PI * 0.33, 24, "sprObsVentBlade00_", [0], 0, 0.3));
        this.obstacles[this.obstacles.length - 1].rollSpd = -0.025;
        this.obstacles.push(this.createObstacle(1168, Math.PI * -0.33, 24, "sprObsVentBlade00_", [0], 0, 0.3));
        this.obstacles[this.obstacles.length - 1].rollSpd = -0.025;

        this.obstacles.push(this.createObstacle(1264, Math.PI, 24, "sprObsVentBlade00_", [0], 0, 0.3));
        this.obstacles[this.obstacles.length - 1].rollSpd = 0.045;
        this.obstacles.push(this.createObstacle(1264, Math.PI * 0.33, 24, "sprObsVentBlade00_", [0], 0, 0.3));
        this.obstacles[this.obstacles.length - 1].rollSpd = 0.045;
        this.obstacles.push(this.createObstacle(1264, Math.PI * -0.33, 24, "sprObsVentBlade00_", [0], 0, 0.3));
        this.obstacles[this.obstacles.length - 1].rollSpd = 0.045;

        this.obstacles.push(this.createObstacle(1368, 0, 42, "sprObsDoor00_", [0, 0, 0, 1, 2, 3, 4, 5], 0.1, Math.PI * 0.4));
        this.obstacles.push(this.createObstacle(1368, Math.PI, 42, "sprObsDoor00_", [0, 0, 0, 1, 2, 3, 4, 5], 0.1, Math.PI * 0.4));
        
        this.startFinishTxt = this.createTextClutter(18, 0, 10, "NEW LAP");

        this.spawner = {
            trackPos: 0,
            trackArrPos: 0,
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
            imgSpd: 0
        }
        
        this.zoom = 16;
        this.player = {
            spd: 0,
            spdMax: 0.25,
            slipstream: 0,
            stats: this.bikeData,
            vel: {
                x: 0,
                y: 0,
                z: 0
            },
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
            laps: 0,
            lapTime: {
                current: 0,
                best: 0
            }
        }

        this.otherPlayers = [];
        /*{
            trackPos: 128,
            sprite: this.add.sprite(0, 0, "sprBike00"),
            roll: Math.PI * -0.5,
            spd: 0.25
        }*/

        /*this.skybox = this.add.sprite(0, 0, "sprSkybox00");
        this.skybox.depth = -10000;*/

        this.ui = new Ui(this);
        

        //console.log(socket);
        socket.on("pongTest", (_data) => {
            console.log(_data);
        });

        socket.on("getPlayers", (_data) => {
            console.log(_data);
            this.you = _data.you;
            this.playersData = _data.playersData;

            this.createTrack();

            this.synchronize();
        });

        socket.on("synchUpdate", (_data) => {
            //console.log(_data);
            this.playersData = _data.playersData;

            this.synchronize();
        });

        socket.on("kickPlayer", (_data) => {
            for(let i = this.otherPlayers.length - 1 ; i >= 0 ; i--){
                if(this.otherPlayers[i].id === _data.id){
                    this.otherPlayers[i].sprite.destroy();
                    this.otherPlayers.splice(i, 1);
                }
            }
        })

        socket.emit("joinPlayer", {
            bikeData: this.bikeData
        });

        this.delta = {
            current: 0,
            treshold: 16,
        }
    }

    update(_time, _delta){
        this.hand.update();

        this.delta.current += _delta;
        if (this.delta.current >= this.delta.treshold){
            this.delta.current -= this.delta.treshold;

            //this.ui.deltaTxt.setText("DEL " + String(_delta));

            if(this.hand.pressed === false){
                //KEYBOARD CONTROLS
                if(this.cursors.up.isDown){
                    if(this.player.spd < this.player.spdMax){
                        this.player.spd = Math.min(this.player.spdMax, this.player.spd + this.player.stats.acceleration);
                    }
                } else if (this.cursors.down.isDown) {
                    if (this.player.spd > 0) {
                        this.player.spd = Math.max(0, this.player.spd - this.player.stats.brake);
                    }
                    this.player.spd = Math.max(0, this.player.spd);
                }else{
                    if(this.player.spd > 0){
                        this.player.spd = Math.max(0, this.player.spd - this.player.stats.friction);
                    }
                }
                if(this.player.spd > this.player.spdMax){
                    this.player.spd = Math.max(0, this.player.spd - this.player.stats.speedDeg);
                }

                if(this.cursors.left.isDown){
                    this.player.roll -= this.player.stats.roll;
                }
                if (this.cursors.right.isDown) {
                    this.player.roll += this.player.stats.roll;
                }

                /*if(this.keys.w.isDown){

                }else if(this.keys.s.isDown){

                }else{

                }

                if (this.keys.a.isDown) {

                } else if (this.keys.d.isDown) {

                } else {

                }*/
            }else{
                //MOUSE CONTROLS
                if (this.hand.pos.y < this.game.config.height * 0.25) {
                    if (this.player.spd < this.player.spdMax) {
                        this.player.spd = Math.min(this.player.spdMax, this.player.spd + this.player.stats.acceleration);
                    }
                } else{
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

            //keep roll within PI
            if (this.player.roll > Math.PI) {
                this.player.roll -= Math.PI * 2;
            }else if(this.player.roll <= Math.PI * -1){
                this.player.roll += Math.PI * 2;
            }

            if (this.segments.length > 0) {
                let overZero = this.spawner.pos.x > 0 ? true : false;
                this.spawner.pos.x -= (this.segments[0].pos.x * (this.segments[0].pos.z + 64)) * 1;
                if ((this.spawner.pos.x < 0 && overZero === true) || (this.spawner.pos.x > 0 && overZero === false)){
                    this.spawner.pos.x = 0;
                }

                overZero = this.spawner.pos.y > 0 ? true : false;
                this.spawner.pos.y -= (this.segments[0].pos.y * (this.segments[0].pos.z + 64)) * 1;
                if ((this.spawner.pos.y < 0 && overZero === true) || (this.spawner.pos.y > 0 && overZero === false)) {
                    this.spawner.pos.y = 0;
                }

                //CHECK MAX SPEED
                let checkY = this.segments[16].screenPos.y + (24 * this.zoom);
                let modify = Math.round(checkY * -0.01);

                //adaptivespeed
                this.player.spdMax = Math.max(0.05, Math.min(0.9, this.player.stats.spd + this.player.slipstream + ((modify * this.player.stats.curveMod) * 0.1)));

                //this.deb.setText(this.player.spdMax.toFixed(2) + " | " + modify);


                /*this.skybox.x = 0;
                this.skybox.y = 0;
                this.skybox.rotation = this.player.roll;*/
            }

            //UPDATE
            for(let i = this.segments.length-1 ; i >= 0 ; i--){
                let s = this.segments[i];

                let overZero = s.pos.x > 0 ? true : false;
                s.pos.x -= (this.segments[0].pos.x * s.pos.z) * 1;
                if ((s.pos.x < 0 && overZero === true) || (s.pos.x > 0 && overZero === false)) {
                    s.pos.x = 0;
                }

                overZero = s.pos.y > 0 ? true : false;
                s.pos.y -= (this.segments[0].pos.y * s.pos.z) * 1;
                if ((s.y < 0 && overZero === true) || (s.pos.y > 0 && overZero === false)) {
                    s.pos.y = 0;
                }

                s.pos.z -= this.player.spd;
                s.update();

                if(s.toKill === true){
                    //feed spawener data to segment and jump it to the far end
                    s.pos.x = this.spawner.pos.x;
                    s.pos.y = this.spawner.pos.y;
                    s.pos.z += 64;
                    s.curve.x = this.spawner.yaw;
                    s.curve.y = this.spawner.pitch;
                    s.dir = this.spawner.roll;
                    s.toKill = false;

                    s.sprite.setTexture(this.spawner.asset + String(this.spawner.subimage));
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
                        /*this.spawner.subimgJumper += this.spawner.imgSpd;
                        if (this.spawner.subimgJumper >= 1) {
                            this.spawner.subimgJumper = 0;
                        }*/
                        this.spawner.subimage = Math.floor(Math.random() * this.spawner.subimgArr.length);
                    }

                    this.segments = this.segments.sort((a, b) => a.pos.z - b.pos.z);

                    this.player.trackPos += 1;
                    if (this.player.trackPos >= this.trackLength){
                        console.log("new LAP");
                        this.player.trackPos = 0;
                        this.player.laps += 1;
                    }

                    this.spawner.trackPos += 1;
                    if(this.spawner.trackPos >= this.trackData[this.spawner.trackArrPos].units){
                        this.spawner.trackPos = 0;
                        this.spawner.trackArrPos += 1;
                        this.spawner.subimage = 0;
                        this.spawner.subimgArrPos = 0;
                        if(this.spawner.trackArrPos >= this.trackData.length){
                            this.spawner.trackArrPos = 0;
                        }
                    }

                    this.spawner.asset = this.trackData[this.spawner.trackArrPos].asset;
                    this.spawner.subimgArr = this.trackData[this.spawner.trackArrPos].subimgArr;
                    this.spawner.imgSpd = this.trackData[this.spawner.trackArrPos].imgSpd;
                    //absolute curving
                    this.spawner.curve.x = this.trackData[this.spawner.trackArrPos].curve.x;
                    this.spawner.curve.y = this.trackData[this.spawner.trackArrPos].curve.y;
                    this.spawner.toRoll = this.trackData[this.spawner.trackArrPos].roll;

                    let dif = Math.abs(this.spawner.roll - this.spawner.toRoll);
                    if (this.spawner.roll < this.spawner.toRoll) {
                        this.spawner.roll += Math.min(0.025, dif);
                    }
                    if (this.spawner.roll > this.spawner.toRoll) {
                        this.spawner.roll -= Math.min(0.025, dif);
                    }

                    this.spawner.yaw += this.spawner.curve.x;
                    this.spawner.pitch += this.spawner.curve.y;

                    this.spawner.pos.x += this.spawner.yaw * 100;
                    this.spawner.pos.y += this.spawner.pitch * 100;
                }
            }

            if(this.playersData !== null){
                socket.emit("updatePlayer", {
                    id: this.you.id,
                    spd: this.player.spd,
                    roll: this.player.roll,
                    trackPos: this.player.trackPos
                });
            }

            //UPDATE OTHER PLAYERRS and STUFF
            let adjPlayerTrackPos = this.player.trackPos;
            if (adjPlayerTrackPos + 64 > this.trackLength) {
                adjPlayerTrackPos -= this.trackLength;
            }
            this.updateOtherPlayers(adjPlayerTrackPos);
            this.updateObstacles(adjPlayerTrackPos);

            //UPDATE START FINISH TEXT
            if (this.startFinishTxt.trackPos < adjPlayerTrackPos + 64 && this.startFinishTxt.trackPos > adjPlayerTrackPos) {
                this.startFinishTxt.txt.setText((Math.max(1, this.player.laps)) + "/5 LAPS");
                let parent = this.segments[this.startFinishTxt.trackPos - adjPlayerTrackPos];

                let pos = {
                    x: parent.pos.x,
                    y: parent.pos.y,
                    z: this.startFinishTxt.trackPos - adjPlayerTrackPos
                }

                let dz = 1 / pos.z;
                let shade = Math.max(0, 255 - (pos.z * 4));

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
        }

        this.ui.update();
    }

    updateOtherPlayers(_adjPlayerPosition){
        let target = null;
        for (let o of this.otherPlayers) {

            let rec = 9999999;

            o.trackPos += o.spd;
            if (o.trackPos >= this.trackLength) {
                o.trackPos = 0;
            }

            let flPos = Math.floor(o.trackPos);

            if (flPos < _adjPlayerPosition + 64 && flPos > _adjPlayerPosition) {
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

                //get nearest enemy that is in front and player is in its slipstream
                if (pos.z < rec) {
                    if (o.trackPos > _adjPlayerPosition) {
                        rec = pos.z;
                        let rollDif = (this.player.roll - o.roll);// + Math.PI;
                        if (rollDif > Math.PI) {
                            rollDif -= Math.PI * 2;
                        } else if (rollDif < Math.PI * -1) {
                            rollDif += Math.PI * 2;
                        }
                        if (Math.abs(rollDif) < this.player.stats.slipZone) {
                            target = o;

                            //slow down and avoid other player
                            if (o.trackPos < _adjPlayerPosition + 3) {
                                this.player.spd *= 0.5;
                                this.player.roll += (rollDif) * 0.25;
                            }
                        }
                    }
                }
            } else {
                o.sprite.alpha = 0;
            }
        }

        if (target !== null) {
            this.ui.setTargetPos(target.sprite.x, target.sprite.y, 1 / (Math.floor(target.trackPos) - _adjPlayerPosition));
            this.player.slipstream = this.player.stats.slipMax;
        } else {
            this.player.slipstream = 0;
            this.ui.setTargetPos(99999, 9999, 0);
        }
    }

    updateObstacles(_adjPlayerPosition) {
        for (let o of this.obstacles) {
            o.trackPos += o.spd;
            if (o.trackPos >= this.trackLength) {
                o.trackPos = 0;
            }
            
            o.roll += o.rollSpd;
            if(o.roll > Math.PI){
                o.roll -= Math.PI * 2;
            }else if (o.roll <= Math.PI * -1){
                o.roll += Math.PI * 2;
            }

            let flPos = Math.floor(o.trackPos);
            if (flPos < _adjPlayerPosition + 64 && flPos > _adjPlayerPosition) {
                let parent = this.segments[flPos - _adjPlayerPosition];
                let pos = {
                    x: parent.pos.x,
                    y: parent.pos.y,
                    z: o.trackPos - _adjPlayerPosition
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

                if (o.trackPos > _adjPlayerPosition) {
                    let rollDif = (this.player.roll - o.roll);// + Math.PI;
                    if(rollDif > Math.PI){
                        rollDif -= Math.PI * 2;
                    }else if(rollDif < Math.PI * -1){
                        rollDif += Math.PI * 2;
                    }
                    /*if (o.trackPos < _adjPlayerPosition + 16) {
                        //console.log(Math.abs(rollDif));
                        if(Math.abs(rollDif) < o.collisionZone){
                            console.log("collision warning")
                        }else{
                            //console.log(Math.PI - Math.abs(rollDif));
                        }
                    }*/
                    if (Math.abs(rollDif) < o.collisionZone) {   
                        //slow down and avoid obstacle
                        if (o.trackPos < _adjPlayerPosition + 3) {
                            this.player.spd *= 0.5;
                            this.player.roll += (rollDif) * 0.25;
                        }
                    }
                }
            } else {
                o.sprite.alpha = 0;
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

                        op.spd = d.spd;
                        op.roll = d.roll;
                        op.trackPos = d.trackPos;
                    }
                }

                if(found === false){
                    this.otherPlayers.push({
                        id: d.id,
                        spd: d.spd,
                        roll: d.roll,
                        trackPos: d.trackPos,
                        sprite: this.add.sprite(0, 0, d.data.asset)
                    })
                }
            }
        }
    }

    createTrack(){

        this.segments.push(new Segment(this, { x: 0, y: 0, z: 0 }, 0, "sprSegStartTunnel_0"));

        for(let i = 1 ; i < 64 ; i++){
            this.segments.push(new Segment(this, { x: 0, y: 0, z: (i * 1) }, 0, "sprSegStartTunnel_0"));
        }
    }

    createSegment(_curveX, _curveY, _roll, _asset, _subimgArr, _imgSpd, _units){
        return {
            curve: {
                x: _curveX,
                y: _curveY
            },
            roll: _roll,
            asset: _asset,
            subimgArr: _subimgArr,
            imgSpd: _imgSpd,
            units: _units
        }
    }

    createObstacle(_trackPos, _roll, _len, _asset, _subimgArr, _imgSpd, _collisionZone){
        return {
            spd: 0,
            rollSpd: 0,
            roll: _roll,
            len: _len,
            trackPos: _trackPos,
            asset: _asset,
            sprite: this.add.sprite(0, 0, _asset),
            imgSpd: _imgSpd,
            subimgArr: _subimgArr,
            subimgArrPos: 0,
            collisionZone: _collisionZone,
            update: () => { }
        }
    }

    createSpriteClutter(_trackPos, _roll, _len, _asset) {
        return {
            spd: 0,
            rollSpd: 0,
            roll: _roll,
            len: _len,
            trackPos: _trackPos,
            sprite: this.add.sprite(0, 0, _asset),
            update: () => {}
        }
    }

    createTextClutter(_trackPos, _roll, _len, _text) {
        return {
            spd: 0,
            rollSpd: 0,
            roll: _roll,
            len: _len,
            trackPos: _trackPos,
            text: _text,
            txt: this.add.bitmapText(0, 0, "pixelmix", _text, 8, 1).setOrigin(0.5),
            update: () => { }
        }
    }
}