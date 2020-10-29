import Hand from "./hand.js";
import Segment from "./segment.js";

export default class ScnMain extends Phaser.Scene {

    constructor() {
        super("ScnMain");
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

        this.hand = new Hand(this);
        
        //Phaser.Math.RND.sow(["seed"]);
        //console.log(Phaser.Math.RND);
        
        this.bsp = this.add.bitmapText(-124, -124, "pixelmix", "", 8, 1);//.setOrigin(0.5);
        this.bsp.depth = 10000;
        this.deb = this.add.bitmapText(-124, -100, "pixelmix", "", 8, 1);//.setOrigin(0.5);
        this.deb.depth = 10000;
        this.deb.setTint(0xff0000)
        this.debugArrow = this.add.sprite(-124, -50, "sprDebugArrow00");
        this.debugArrow.depth = 10000;

        
        this.you = null;
        this.playersData = null;
        this.segments = [];
        this.trackData = [
            this.createSegment(0, 0, 0, "sprSegDebug03", 64),
            this.createSegment(0, 0, 0, "sprSegDebug01", 1),
            this.createSegment(0, 0, 0, "sprSegDebug00", 63),
            this.createSegment(0.05, 0, Math.PI * -0.5, "sprSegDebug02", 64),
            this.createSegment(-0.05, 0.025, Math.PI * -1, "sprSegDebug01", 64),
            this.createSegment(0, 0, Math.PI * -1, "sprSegDebug01", 64),
            this.createSegment(0.05, -0.025, 0, "sprSegDebug02", 64),
            this.createSegment(-0.05, 0, 0, "sprSegDebug00", 64),
        ];
        this.trackLength = 0;
        for(let s of this.trackData){
            this.trackLength += s.units;
        }

        this.spawner = {
            trackPos: 0,
            trackArrPos: 0,
            strength: 0,
            yaw: 0,
            pitch: 0,
            roll: Math.PI * -0.5,
            toRoll: Math.PI * -0.5,
            asset: "sprSegDebug02",
            curve: {
                x: 0,
                y: 0
            },
            pos: {
                x: 0,
                y: 0,
                z: 0
            }
        }
        
        this.zoom = 16;
        this.player = {
            spd: 0,
            spdMax: 0.25,
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
            trackPos: 0
        }

        this.otherPlayers = [];
        /*{
            trackPos: 128,
            sprite: this.add.sprite(0, 0, "sprBike00"),
            roll: Math.PI * -0.5,
            spd: 0.25
        }*/
        

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

        socket.emit("joinPlayer", {});
    }

    update(){

        this.hand.update();

        if(this.hand.pressed === false){
            //KEYBOARD CONTROLS
            if(this.cursors.up.isDown){
                if(this.player.spd < this.player.spdMax){
                    this.player.spd = Math.min(this.player.spdMax, this.player.spd + 0.01);
                }
            } else if (this.cursors.down.isDown) {
                if (this.player.spd > 0) {
                    this.player.spd = Math.max(0, this.player.spd - 0.1);
                }
                this.player.spd = Math.max(0, this.player.spd);
            }else{
                if(this.player.spd > 0){
                    this.player.spd = Math.max(0, this.player.spd - 0.01);
                }
            }
            if(this.player.spd > this.player.spdMax){
                this.player.spd = Math.max(0, this.player.spd-0.001);
            }

            if(this.cursors.left.isDown){
                this.player.roll -= 0.05;
            }
            if (this.cursors.right.isDown) {
                this.player.roll += 0.05;
            }

            if(this.keys.w.isDown){

            }else if(this.keys.s.isDown){

            }else{

            }

            if (this.keys.a.isDown) {

            } else if (this.keys.d.isDown) {

            } else {

            }
        }else{
            //MOUSE CONTROLS
            if (this.hand.pos.y < this.game.config.height * 0.25) {
                if (this.player.spd < this.player.spdMax) {
                    this.player.spd = Math.min(this.player.spdMax, this.player.spd + 0.01);
                }
            } else{
                if (this.player.spd > 0) {
                    this.player.spd = Math.max(0, this.player.spd - 0.1);
                }
                this.player.spd = Math.max(0, this.player.spd);
            }

            if (this.player.spd > this.player.spdMax) {
                this.player.spd = Math.max(0, this.player.spd - 0.001);
            }

            let amt = this.hand.start.x - this.hand.pos.x;
            //console.log(amt);
            if (Math.abs(amt) > 2) {
                this.player.roll -= Math.max(-0.05, Math.min(0.05, amt * 0.001));
            }
            /*if (this.hand.pos.x < this.hand.start.x - 8) {
                this.player.roll -= 0.05;
            }
            if (this.hand.pos.x > this.hand.start.x + 8) {
                this.player.roll += 0.05;
            }*/
        }

        if (this.segments.length > 0) {
            let overZero = this.spawner.pos.x > 0 ? true : false;
            this.spawner.pos.x -= (this.segments[0].pos.x * 65) * 1;
            if ((this.spawner.pos.x < 0 && overZero === true) || (this.spawner.pos.x > 0 && overZero === false)){
                this.spawner.pos.x = 0;
            }

            overZero = this.spawner.pos.y > 0 ? true : false;
            this.spawner.pos.y -= (this.segments[0].pos.y * 65) * 1;
            if ((this.spawner.pos.y < 0 && overZero === true) || (this.spawner.pos.y > 0 && overZero === false)) {
                this.spawner.pos.y = 0;
            }

            //this.deb.setText(this.player.roll - this.segments[0].dir);

            //CHECK MAX SPEED
            let checkY = this.segments[this.segments.length - 2].screenPos.y
            if ((checkY / 100) < -10){
                this.player.spdMax = 0.9;
            }else if ((checkY / 100) > 10){
                this.player.spdMax = 0.1;
            }else{
                this.player.spdMax = 0.25;
            }
            //this.player.spdMax = (50 + (checkY/100)) * 0.01;

            this.deb.setText(this.player.spd.toFixed(2) + "\n" + this.player.trackPos + "/" + this.trackLength);
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

                s.pos.x = this.spawner.pos.x;
                s.pos.y = this.spawner.pos.y;
                s.pos.z += 64;
                s.curve.x = this.spawner.yaw;
                s.curve.y = this.spawner.pitch;
                s.dir = this.spawner.roll;
                s.toKill = false;
                s.sprite.setTexture(this.spawner.asset);


                this.player.trackPos += 1;
                this.spawner.trackPos += 1;
                if(this.spawner.trackPos >= this.trackData[this.spawner.trackArrPos].units){
                    this.spawner.trackPos = 0;
                    this.spawner.trackArrPos += 1;
                    if(this.spawner.trackArrPos >= this.trackData.length){
                        this.spawner.trackArrPos = 0;
                        console.log("new LAP");
                        this.player.trackPos = 0;
                    }
                }

                this.spawner.asset = this.trackData[this.spawner.trackArrPos].asset;
                //absolute curving
                this.spawner.curve.x = this.trackData[this.spawner.trackArrPos].curve.x;
                this.spawner.curve.y = this.trackData[this.spawner.trackArrPos].curve.y;
                this.spawner.toRoll = this.trackData[this.spawner.trackArrPos].roll;

                let dif = Math.abs(this.spawner.roll - this.spawner.toRoll);
                if (this.spawner.roll < this.spawner.toRoll) {
                    this.spawner.roll += Math.min(0.1, dif);
                }
                if (this.spawner.roll > this.spawner.toRoll) {
                    this.spawner.roll -= Math.min(0.1, dif);
                }

                this.spawner.yaw += this.spawner.curve.x;
                this.spawner.pitch += this.spawner.curve.y;

                this.spawner.pos.x += this.spawner.yaw * 100;
                this.spawner.pos.y += this.spawner.pitch * 100;


                /*socket.emit("updatePlayer", {
                    id: this.you.id,
                    spd: this.player.spd,
                    roll: this.player.roll,
                    trackPos: this.player.trackPos
                });*/
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

        for(let o of this.otherPlayers){

            o.trackPos += o.spd;
            if(o.trackPos >= this.trackLength){
                o.trackPos = 0;
            }

            let flPos = Math.floor(o.trackPos);

            if (flPos < this.player.trackPos + 64 && flPos > this.player.trackPos){
                //console.log(o.trackPos - this.player.trackPos);
                
                let parent = this.segments[flPos - this.player.trackPos];

                let pos = {
                    x: parent.pos.x,
                    y: parent.pos.y,
                    z: flPos - this.player.trackPos
                }
                let dz = 1 / pos.z;
                let shade = Math.max(0, 255 - (pos.z * 4));

                o.sprite.x = (parent.screenPos.x) * dz;
                o.sprite.y = (parent.screenPos.y) * dz;

                o.sprite.rotation = this.player.roll - o.roll - (Math.PI * -0.5);

                o.sprite.setScale(dz * this.zoom);
                o.sprite.setTint(Phaser.Display.Color.GetColor(shade, shade, shade));
                o.sprite.depth = dz;
                o.sprite.alpha = 1;
            }else{
                o.sprite.alpha = 0;
            }
        }
        
        this.segments = this.segments.sort((a, b) => a.pos.z - b.pos.z);

        this.debugArrow.rotation = this.spawner.yaw;

        
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
                        rol: d.roll,
                        trackPos: d.trackPos,
                        sprite: this.add.sprite(0, 0, "sprBike00")
                    })
                }
            }
        }
    }

    createTrack(){

        this.segments.push(new Segment(this, { x: 0, y: 0, z: 0 }, Math.PI * -0.5, "sprSegDebug02"));

        for(let i = 1 ; i < 64 ; i++){
            this.segments.push(new Segment(this, { x: 0, y: 0, z: (i * 1) }, Math.PI * -0.5, "sprSegDebug02"));
        }
    }

    createSegment(_curveX, _curveY, _roll, _asset, _units){
        return {
            curve: {
                x: _curveX,
                y: _curveY
            },
            roll: _roll + ( Math.PI * -0.5),
            asset: _asset,
            units: _units
        }
    }
}