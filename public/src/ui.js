import Button from "./button.js";

export default class Ui{
    constructor(_scene){
        this.scene = _scene;

        this.colors = {
            default: 0x00e436,//0xd1d15b 0x29adff
            alert: 0xff004d,
            warning: 0xffa300
        }

        this.btnMenu = new Button(this.scene, { x: this.scene.right - 16, y: this.scene.top + 16 }, "sprUiMenu", "", false, () => {
            this.scene.gotoMenu();
        });

        this.btnFullscreen = new Button(this.scene, { x: this.scene.right - 16, y: this.scene.top + 48 }, "sprUiFullscreen", "", false, () => {
            if (this.scene.scale.isFullscreen) {
                this.scene.scale.stopFullscreen();
            } else {
                this.scene.scale.startFullscreen();
            }
        });

        this.btnScore = new Button(this.scene, { x: this.scene.right - 16, y: this.scene.top + 80 }, "sprUiScore", "", true, () => {
            this.tacho.move(this.positions.tacho.out.x, this.positions.tacho.out.y);
            this.minimap.move(this.positions.minimap.out.x, this.positions.minimap.out.y);
            this.standings.move(this.positions.standings.in.x, this.positions.standings.in.y);
        });
        this.btnScore.toggleOffFunc = () => {
            this.tacho.move(this.positions.tacho.in.x, this.positions.tacho.in.y);
            this.minimap.move(this.positions.minimap.in.x, this.positions.minimap.in.y);
            this.standings.move(this.positions.standings.out.x, this.positions.standings.out.y);
        }

        this.positions = {
            tacho: {
                in: {
                    x: this.scene.left + 56,
                    y: 0
                },
                out: {
                    x: this.scene.left - 100,
                    y: 0
                }
            },
            minimap: {
                in: {
                    x: this.scene.right - 56,
                    y: 0
                },
                out: {
                    x: this.scene.right + 100,
                    y: 0
                }
            },
            standings: {
                in: {
                    x: 0,
                    y: 0
                },
                out: {
                    x: 0,
                    y: this.scene.game.config.height
                }
            }
        }

        this.tacho = new Tacho(this.scene, this, this.positions.tacho.out.x, this.positions.tacho.out.y);
        this.minimap = new Minimap(this.scene, this, this.positions.minimap.out.x, this.positions.minimap.out.y);
        this.standings = new Standings(this.scene, this, this.positions.standings.out.x, this.positions.standings.out.y);

        this.tacho.move(this.positions.tacho.in.x, this.positions.tacho.in.y);
        this.minimap.move(this.positions.minimap.in.x, this.positions.minimap.in.y);
    }

    update(){
        this.btnFullscreen.update();
        this.btnMenu.update();
        this.btnScore.update();

        this.tacho.update();
        this.minimap.update();
        this.standings.update();
    }
}

class Minimap{
    constructor(_scene, _parent, _x, _y){
        this.scene = _scene;
        this.parent = _parent;
        this.pos = {
            x: _x,
            y: _y
        }
        this.target = {
            x: _x,
            y: _y
        }

        this.screenHeightModified = this.scene.game.config.height * 0.8;
        this.magnifier = this.scene.trackLength / this.screenHeightModified;
        this.lapLineRoot = {
            x: this.pos.x,//this.scene.right - 56,
            y: this.pos.y + (this.screenHeightModified * 0.5),
        }

        this.lapLine = this.scene.add.graphics({ x: this.lapLineRoot.x + 0.5, y: this.lapLineRoot.y });
        this.sectors = [];

        this.playerLine = this.scene.add.sprite(this.lapLineRoot.x, this.lapLineRoot.y, "sprUiTrackLinePlayer").setOrigin(1, 0.5);
        this.playerLine.depth = 10000;
        this.playerLine.setTintFill(this.parent.colors.default);
        this.otherLines = [];


        this.tween = this.scene.tweens.add({
            targets: this.pos,
            x: { value: () => this.target.x },
            y: { value: () => this.target.y },
            ease: "Sine.easeInOut",
            duration: 500,
            callbackScope: this
        });
    }

    update(){

        if(this.tween.hasStarted === true){
            this.lapLineRoot.x = this.pos.x + 0.5;
            this.lapLineRoot.y = this.pos.y + (this.screenHeightModified * 0.5);

            this.lapLine.x = this.lapLineRoot.x;
            this.lapLine.y = this.lapLineRoot.y

            this.playerLine.x = this.lapLineRoot.x;

            for (let s of this.sectors) {
                s.x = this.lapLineRoot.x;
            }
        }

        this.playerLine.y = this.lapLineRoot.y - ((this.scene.player.trackPos) / this.magnifier);

        //clear other players lines if amount of players change to stay consistent with other players
        if (this.scene.otherPlayers.length !== this.otherLines.length) {
            for (let l of this.otherLines) {
                l.destroy();
            }
            this.otherLines = [];
        }
        //add other player lines if not already existign and draw them where they are
        for (let [i, op] of this.scene.otherPlayers.entries()) {
            if (i > this.otherLines.length - 1) {
                this.otherLines.push(this.scene.add.sprite(this.lapLineRoot.x, this.lapLineRoot.y, "sprUiTrackLineBike").setOrigin(1, 0.5));
                this.otherLines[this.otherLines.length - 1].depth = 10000;
                this.otherLines[this.otherLines.length - 1].setTintFill(this.parent.colors.default);
            }
            this.otherLines[i].x = this.lapLineRoot.x;
            this.otherLines[i].y = this.lapLineRoot.y - ((op.trackPos) / this.magnifier);
        }
    }

    move(_x, _y){
        this.target.x = _x;
        this.target.y = _y;
        this.tween.updateTo("x", this.target.x, true);
        this.tween.updateTo("y", this.target.y, true);
        this.tween.restart();
    }

    createMiniMap() {
        this.lapLine.clear();
        for (let s of this.sectors) {
            s.destroy();
        }

        this.screenHeightModified = this.scene.game.config.height * 0.8;
        this.magnifier = this.scene.trackLength / this.screenHeightModified;
        this.lapLineRoot = {
            x: this.scene.right - 56,
            y: this.screenHeightModified * 0.5,
        }

        this.lapLine = this.scene.add.graphics({ x: this.lapLineRoot.x + 0.5, y: this.lapLineRoot.y });
        this.lapLine.lineStyle(1, this.parent.colors.default);
        this.lapLine.beginPath();
        this.lapLine.moveTo(0, 0);
        this.lapLine.lineTo(0, (this.scene.trackLength / this.magnifier) * -1);
        this.lapLine.strokePath();
        this.lapLine.depth = 10000;

        this.sectors = [];
        let prev = {
            x: this.lapLineRoot.x,
            y: this.lapLineRoot.y
        }
        for (let d of this.scene.trackData) {
            let amt = d.units / this.magnifier;
            this.sectors.push(this.scene.add.sprite(prev.x, prev.y - amt, "sprUiTrackLine").setOrigin(0, 0.5));
            this.sectors[this.sectors.length - 1].setTintFill(this.parent.colors.default);
            prev.y -= amt;
        }
        for (let s of this.sectors) {
            s.depth = 10000;
        }
    }
}

class Tacho{
    constructor(_scene, _parent, _x, _y){
        this.scene = _scene;
        this.parent = _parent;
        this.pos = {
            x: _x,
            y: _y
        }
        this.target = {
            x: _x,
            y: _y
        }

        this.bstTxt = this.scene.add.bitmapText(this.pos.x - 24, this.pos.y - 80, "pixelmix", "00:00:000", 8, 1).setOrigin(0, 0.5);
        this.bstTxt.depth = 10000;
        this.bstTxt.setTint(this.parent.colors.default);

        this.lapTxt = this.scene.add.bitmapText(this.pos.x - 24, this.pos.y - 64, "pixelmix", "00:00:000", 8, 1).setOrigin(0, 0.5);
        this.lapTxt.depth = 10000;
        this.lapTxt.setTint(this.parent.colors.default);

        this.spdTxt = this.scene.add.bitmapText(this.pos.x - 24, this.pos.y - 32, "pixelmix", "SPD ", 8, 1).setOrigin(0, 0.5);
        this.spdTxt.depth = 10000;
        this.spdTxt.setTint(this.parent.colors.default);

        this.slpTxt = this.scene.add.bitmapText(this.pos.x - 24, this.pos.y, "pixelmix", "SLP ", 8, 1).setOrigin(0, 0.5);
        this.slpTxt.depth = 10000;
        this.slpTxt.setTint(this.parent.colors.default);

        this.resTxt = this.scene.add.bitmapText(this.pos.x - 24, this.pos.y + 32, "pixelmix", "RES ", 8, 1).setOrigin(0, 0.5);
        this.resTxt.depth = 10000;
        this.resTxt.setTint(this.parent.colors.default);

        this.textWrap = {
            bst: this.scene.add.sprite(this.pos.x, this.pos.y - 80, "sprUiTextWrap"),
            lap: this.scene.add.sprite(this.pos.x, this.pos.y - 64, "sprUiTextWrap"),
            spd: this.scene.add.sprite(this.pos.x, this.pos.y - 32, "sprUiTextWrap"),
            slp: this.scene.add.sprite(this.pos.x, this.pos.y, "sprUiTextWrap"),
            res: this.scene.add.sprite(this.pos.x, this.pos.y + 32, "sprUiTextWrap"),
        }
        this.textWrap.bst.depth = 9999;
        this.textWrap.bst.setTintFill(this.parent.colors.default);
        this.textWrap.lap.depth = 9999;
        this.textWrap.lap.setTintFill(this.parent.colors.default);
        this.textWrap.spd.depth = 9999;
        this.textWrap.spd.setTintFill(this.parent.colors.default);
        this.textWrap.slp.depth = 9999;
        this.textWrap.slp.setTintFill(this.parent.colors.default);
        this.textWrap.res.depth = 9999;
        this.textWrap.res.setTintFill(this.parent.colors.default);

        //create grav meter
        this.grav = {
            circle: this.scene.add.sprite(this.pos.x, this.pos.y + 64, "sprUiCircle").setTintFill(this.parent.colors.default),
            roll: this.scene.add.sprite(this.pos.x, this.pos.y + 64, "sprUiRoll").setTintFill(this.parent.colors.default),
            yaw: this.scene.add.sprite(this.pos.x, this.pos.y + 64, "sprUiSpawnerRoll").setTintFill(this.parent.colors.default),
            pitch: this.scene.add.sprite(this.pos.x, this.pos.y + 64, "sprUiSpawnerRoll").setTintFill(this.parent.colors.default),
            enemies: [
                this.scene.add.sprite(this.pos.x, this.pos.y + 64, "sprUiRoll"),
                this.scene.add.sprite(this.pos.x, this.pos.y + 64, "sprUiRoll"),
                this.scene.add.sprite(this.pos.x, this.pos.y + 64, "sprUiRoll"),
                this.scene.add.sprite(this.pos.x, this.pos.y + 64, "sprUiRoll")
            ],
        }
        this.grav.circle.depth = 9999;
        this.grav.roll.depth = 10000;
        this.grav.yaw.depth = 10000;
        this.grav.pitch.depth = 10000;
        for (let e of this.grav.enemies) {
            e.setTintFill(this.parent.colors.alert)
            e.depth = 9999;
        }
        this.follower = [];

        this.reticle = {
            graph: this.scene.add.graphics({ x: 0.5, y: 0 }),
            rot: 0
        }
        this.reticle.graph.lineStyle(1, this.parent.colors.default);
        this.reticle.graph.strokeRect(-16, -16, 32, 32);
        this.reticle.graph.depth = 10000;

        this.overSpd = false;
        this.overSlp = false;
        this.overRes = false;

        this.tween = this.scene.tweens.add({
            targets: this.pos,
            x: { value: () => this.target.x },
            y: { value: () => this.target.y },
            ease: "Sine.easeInOut",
            duration: 500,
            callbackScope: this
        });
    }

    update(){
        this.bstTxt.x = this.pos.x - 24;
        this.textWrap.bst.x = this.pos.x;

        if (this.scene.player.lapTime.start !== -1) {
            let time = dateToLapTime(this.scene.player.lapTime.current - this.scene.player.lapTime.start);
            this.lapTxt.setText(zeroPad(time.min, 2) + ":" + zeroPad(time.sec, 2) + ":" + zeroPad(time.mil, 3));
        } else {
            this.lapTxt.setText("00:00:000");
        }
        this.lapTxt.x = this.pos.x - 24;
        this.textWrap.lap.x = this.pos.x;

        this.spdTxt.setText("SPD " + String(Math.floor(this.scene.player.spd * 900)));
        this.spdTxt.x = this.pos.x - 24;
        this.textWrap.spd.x = this.pos.x;

        this.slpTxt.setText("SLP " + String(this.scene.player.slipstream.toFixed(2)));
        if (this.scene.player.slipstream > 0) {
            if (this.overSlp === false) {
                this.overSlp = true;
                this.slpTxt.setTintFill(this.parent.colors.alert);
                this.textWrap.slp.setTintFill(this.parent.colors.alert);
            }
        } else {
            if (this.overSlp === true) {
                this.overSlp = false;
                this.slpTxt.setTintFill(this.parent.colors.default);
                this.textWrap.slp.setTintFill(this.parent.colors.default);
            }
        }
        this.slpTxt.x = this.pos.x - 24;
        this.textWrap.slp.x = this.pos.x;

        let res = 1 - this.scene.player.spdMax;
        this.resTxt.setText("RES " + String(res.toFixed(2)));
        if (res >= 0.85) {
            if (this.overRes === false) {
                this.overRes = true;
                this.resTxt.setTintFill(this.parent.colors.alert);
                this.textWrap.res.setTintFill(this.parent.colors.alert);
                this.grav.roll.setTintFill(this.parent.colors.alert);
            }
        } else {
            if (this.overRes === true) {
                this.overRes = false;
                this.resTxt.setTintFill(this.parent.colors.default);
                this.textWrap.res.setTintFill(this.parent.colors.default);
                this.grav.roll.setTintFill(this.parent.colors.default);
            }
        }
        this.resTxt.x = this.pos.x - 24;
        this.textWrap.res.x = this.pos.x;

        this.grav.circle.x = this.pos.x;
        this.grav.roll.rotation = this.scene.player.roll * -1;
        this.grav.roll.x = this.pos.x;
        this.grav.yaw.rotation = this.scene.spawner.yaw;
        this.grav.yaw.x = this.pos.x;
        this.grav.pitch.rotation = this.scene.spawner.pitch;
        this.grav.pitch.x = this.pos.x;
        for (let [i, e] of this.grav.enemies.entries()) {
            if (i < this.follower.length) {
                e.alpha = 1;
                e.rotation = this.follower[i] * -1;
                e.x = this.pos.x;
            } else {
                e.alpha = 0;
            }
        }
        this.follower = [];

        this.reticle.rot += 0.01;
        this.reticle.graph.rotation = this.reticle.rot;
        this.reticle.graph.alpha = 1;
        /*if(this.target.x > this.scene.right){
        }else{
            this.reticle.graph.alpha = 0;
        }*/
    }

    move(_x, _y) {
        this.target.x = _x;
        this.target.y = _y;
        this.tween.updateTo("x", this.target.x, true);
        this.tween.updateTo("y", this.target.y, true);
        this.tween.restart();
    }

    setReticlePos(_x, _y, _dz) {
        this.reticle.graph.clear();

        this.reticle.graph.lineStyle(1, this.parent.colors.default);
        this.reticle.graph.strokeRect(-16 * (_dz * this.scene.zoom), -16 * (_dz * this.scene.zoom), 32 * (_dz * this.scene.zoom), 32 * (_dz * this.scene.zoom));

        this.reticle.graph.x = _x + 0.5;
        this.reticle.graph.y = _y;
    }

    setBestTime(_time) {
        let time = dateToLapTime(_time);
        this.bstTxt.setText(zeroPad(time.min, 2) + ":" + zeroPad(time.sec, 2) + ":" + zeroPad(time.mil, 3));
    }
}

class Standings {
    constructor(_scene, _parent, _x, _y) {
        this.scene = _scene;
        this.parent = _parent;
        this.pos = {
            x: _x,
            y: _y
        }
        this.target = {
            x: _x,
            y: _y
        }

        this.list = [];

        this.tween = this.scene.tweens.add({
            targets: this.pos,
            x: { value: () => this.target.x },
            y: { value: () => this.target.y },
            ease: "Sine.easeInOut",
            duration: 500,
            callbackScope: this
        });
    }

    update() {
        this.list = this.list.sort((a, b) => (b.data.trackPos + (this.scene.trackLength * b.data.laps)) - (a.data.trackPos + (this.scene.trackLength * a.data.laps)));

        if(this.scene.playersData !== null){
            if (this.list.length > this.scene.playersData.length){
                this.cleanList();
            }

            for (let op of this.scene.playersData){
                let found = false;
                for(let [i, l] of this.list.entries()){
                    if(op.id === l.data.id){
                        found = true;
                        l.data = op;
                        l.posTxt.setText(String(i+1) + ".");
                        l.lapsTxt.setText(String(Math.min(op.laps, this.scene.lapsMax)) + "/" + String(this.scene.lapsMax));

                        let time = dateToLapTime(op.lapTime);
                        l.lapTxt.setText(zeroPad(time.min, 2) + ":" + zeroPad(time.sec, 2) + ":" + zeroPad(time.mil, 3));
                        time = dateToLapTime(op.bestLapTime);
                        l.bstTxt.setText(zeroPad(time.min, 2) + ":" + zeroPad(time.sec, 2) + ":" + zeroPad(time.mil, 3));

                        let yy = this.pos.y - (this.scene.game.config.height * 0.4) + (i * 24)
                        l.posTxt.x = this.pos.x - 96;
                        l.posTxt.y = yy;
                        l.posWrap.x = this.pos.x - 96;
                        l.posWrap.y = yy;

                        l.sprite.x = this.pos.x - 64;
                        l.sprite.y = yy;

                        l.lapsTxt.x = this.pos.x - 40;
                        l.lapsTxt.y = yy;
                        l.lapsWrap.x = this.pos.x - 48;
                        l.lapsWrap.y = yy;

                        l.lapTxt.x = this.pos.x + 16;
                        l.lapTxt.y = yy;
                        l.lapWrap.x = this.pos.x + 16;
                        l.lapWrap.y = yy;
                        l.bstTxt.x = this.pos.x + 80;
                        l.bstTxt.y = yy;
                        l.bstWrap.x = this.pos.x + 80;
                        l.bstWrap.y = yy;
                    }
                }
                if(found === false){
                    this.list.push({
                        data: op,
                        //nameTxt: this.scene.add.bitmapText(this.pos.x - 24, this.pos.y - 80, "pixelmix", op.name, 8, 1).setOrigin(0.5), 
                        sprite: this.scene.add.sprite(this.pos.x, this.pos.y, op.data.asset),
                        posTxt: this.scene.add.bitmapText(this.pos.x, this.pos.y, "pixelmix", "0.", 8, 1).setOrigin(0, 0.5),
                        lapsTxt: this.scene.add.bitmapText(this.pos.x, this.pos.y, "pixelmix", op.laps, 8, 1).setOrigin(0.5),
                        lapTxt: this.scene.add.bitmapText(this.pos.x, this.pos.y, "pixelmix", "00:00:000", 8, 1).setOrigin(0.5),
                        bstTxt: this.scene.add.bitmapText(this.pos.x, this.pos.y, "pixelmix", "00:00:000", 8, 1).setOrigin(0.5),
                        lapWrap: this.scene.add.sprite(this.pos.x, this.pos.y, "sprUiTextWrap"),
                        bstWrap: this.scene.add.sprite(this.pos.x, this.pos.y, "sprUiTextWrap"), 
                        lapsWrap: this.scene.add.sprite(this.pos.x, this.pos.y, "sprUiTextWrap"),
                        posWrap: this.scene.add.sprite(this.pos.x, this.pos.y, "sprUiShortWrap"),
                    });
                    let col = this.parent.colors.default;
                    if(op.id === this.scene.you.id){
                        col = this.parent.colors.warning;

                        this.list[this.list.length - 1].posTxt.alpha = 0.75;
                        this.list[this.list.length - 1].posWrap.alpha = 0.5;
                        this.list[this.list.length - 1].lapsTxt.alpha = 0.75;
                        this.list[this.list.length - 1].lapsWrap.alpha = 0.5;
                        this.list[this.list.length - 1].lapTxt.alpha = 0.75;
                        this.list[this.list.length - 1].lapWrap.alpha = 0.5;
                        this.list[this.list.length - 1].bstTxt.alpha = 0.75;
                        this.list[this.list.length - 1].bstWrap.alpha = 0.5;
                    }
                    this.list[this.list.length - 1].sprite.depth = 10000;
                    this.list[this.list.length - 1].sprite.setTint(this.parent.colors.default);

                    this.list[this.list.length - 1].posTxt.depth = 10000;
                    this.list[this.list.length - 1].posTxt.setTint(this.parent.colors.default);
                    this.list[this.list.length - 1].posWrap.depth = 9999;
                    this.list[this.list.length - 1].posWrap.setTint(this.parent.colors.default);
                    this.list[this.list.length - 1].lapsTxt.depth = 10000;   

                    this.list[this.list.length - 1].lapsTxt.setTint(this.parent.colors.default);
                    this.list[this.list.length - 1].lapsWrap.depth = 9999;
                    this.list[this.list.length - 1].lapsWrap.setTint(this.parent.colors.default);
                    this.list[this.list.length - 1].lapTxt.depth = 10000;                
                    this.list[this.list.length - 1].lapTxt.setTint(this.parent.colors.default);
                    this.list[this.list.length - 1].lapWrap.depth = 9999;
                    this.list[this.list.length - 1].lapWrap.setTint(this.parent.colors.default);
                    this.list[this.list.length - 1].bstTxt.depth = 10000;                
                    this.list[this.list.length - 1].bstTxt.setTint(this.parent.colors.default);
                    this.list[this.list.length - 1].bstWrap.depth = 9999;
                    this.list[this.list.length - 1].bstWrap.setTint(this.parent.colors.default);
                }
            }
        }
    }

    move(_x, _y) {
        this.target.x = _x;
        this.target.y = _y;
        this.tween.updateTo("x", this.target.x, true);
        this.tween.updateTo("y", this.target.y, true);
        this.tween.restart();
    }

    cleanList(){
        for(let i = this.list.length-1 ; i >= 0 ; i--){
            let l = this.list[i];
            let found = false;
            for (let op of this.scene.playersData){
                if(l.data.id === op.id){
                    found = true;
                }
            }
            if(found === false){
                this.list[i].sprite.destroy();
                this.list[i].posTxt.destroy();
                this.list[i].posWrap.destroy();
                this.list[i].lapsTxt.destroy();
                this.list[i].lapsWrap.destroy();
                this.list[i].lapTxt.destroy();
                this.list[i].lapWrap.destroy();
                this.list[i].bstTxt.destroy();
                this.list[i].bstWrap.destroy();
                this.list.splice(i, 1);
            }
        }
    }
}