import Button from "./button.js";

export default class Ui{
    constructor(_scene){
        this.scene = _scene;

        this.colors = {
            default: 0x00e436,//0xd1d15b 0x29adff
            alert: 0xff004d,
            warning: 0xffa300
        }

        this.btnFullscreen = new Button(this.scene, { x: this.scene.right - 16, y: this.scene.top + 16 }, "sprUiFullscreen", "", false, () => {
            if (this.scene.scale.isFullscreen) {
                this.scene.scale.stopFullscreen();
            } else {
                this.scene.scale.startFullscreen();
            }
        });

        this.btnMenu = new Button(this.scene, { x: this.scene.right - 16, y: this.scene.top + 48 }, "sprUiMenu", "", false, () => {
            this.scene.gotoMenu();
        });

        this.bstTxt = this.scene.add.bitmapText(this.scene.left + 32, -80, "pixelmix", "00:00:000", 8, 1).setOrigin(0, 0.5);
        this.bstTxt.depth = 10000;
        this.bstTxt.setTint(this.colors.default);

        this.lapTxt = this.scene.add.bitmapText(this.scene.left + 32, -64, "pixelmix", "00:00:000", 8, 1).setOrigin(0, 0.5);
        this.lapTxt.depth = 10000;
        this.lapTxt.setTint(this.colors.default);

        this.spdTxt = this.scene.add.bitmapText(this.scene.left + 32, -32, "pixelmix", "SPD ", 8, 1).setOrigin(0, 0.5);
        this.spdTxt.depth = 10000;
        this.spdTxt.setTint(this.colors.default);

        this.slpTxt = this.scene.add.bitmapText(this.scene.left + 32, 0, "pixelmix", "SLP ", 8, 1).setOrigin(0, 0.5);
        this.slpTxt.depth = 10000;
        this.slpTxt.setTint(this.colors.default);

        this.resTxt = this.scene.add.bitmapText(this.scene.left + 32, 32, "pixelmix", "RES ", 8, 1).setOrigin(0, 0.5);
        this.resTxt.depth = 10000;
        this.resTxt.setTint(this.colors.default);

        this.alertTxt = this.scene.add.bitmapText(0, -64, "pixelmix", "SLIPSTREAMED", 8, 1).setOrigin(0, 0.5);
        this.alertTxt.depth = 10000;
        this.alertTxt.setTint(this.colors.alert);
        this.alertTxt.alpha = 0;

        this.textWrap = {
            bst: this.scene.add.sprite(this.scene.left + 56, -80, "sprUiTextWrap"),
            lap: this.scene.add.sprite(this.scene.left + 56, -64, "sprUiTextWrap"),
            spd: this.scene.add.sprite(this.scene.left + 56, -32, "sprUiTextWrap"),
            slp: this.scene.add.sprite(this.scene.left + 56, 0, "sprUiTextWrap"),
            res: this.scene.add.sprite(this.scene.left + 56, 32, "sprUiTextWrap"),
        }
        this.textWrap.bst.depth = 9999;
        this.textWrap.bst.setTintFill(this.colors.default);
        this.textWrap.lap.depth = 9999;
        this.textWrap.lap.setTintFill(this.colors.default);
        this.textWrap.spd.depth = 9999;
        this.textWrap.spd.setTintFill(this.colors.default);
        this.textWrap.slp.depth = 9999;
        this.textWrap.slp.setTintFill(this.colors.default);
        this.textWrap.res.depth = 9999;
        this.textWrap.res.setTintFill(this.colors.default);

        //create grav meter
        this.grav = {
            circle: this.scene.add.sprite(this.scene.left + 56, 64, "sprUiCircle").setTintFill(this.colors.default),
            roll: this.scene.add.sprite(this.scene.left + 56, 64, "sprUiRoll").setTintFill(this.colors.default),
            yaw: this.scene.add.sprite(this.scene.left + 56, 64, "sprUiSpawnerRoll").setTintFill(this.colors.default),
            pitch: this.scene.add.sprite(this.scene.left + 56, 64, "sprUiSpawnerRoll").setTintFill(this.colors.default),
            enemies: [
                this.scene.add.sprite(this.scene.left + 56, 64, "sprUiRoll"),
                this.scene.add.sprite(this.scene.left + 56, 64, "sprUiRoll"),
                this.scene.add.sprite(this.scene.left + 56, 64, "sprUiRoll"),
                this.scene.add.sprite(this.scene.left + 56, 64, "sprUiRoll")
            ],
        }
        this.grav.circle.depth = 9999;
        this.grav.roll.depth = 10000;
        this.grav.yaw.depth = 10000;
        this.grav.pitch.depth = 10000;
        for(let e of this.grav.enemies){
            e.setTintFill(this.colors.alert)
            e.depth = 9999;
        }
        this.follower = [];

        this.target = {
            graph: this.scene.add.graphics({x: 0.5, y: 0}),
            rot: 0
        }
        this.target.graph.lineStyle(1, this.colors.default);
        this.target.graph.strokeRect(-16, -16, 32, 32);
        this.target.graph.depth = 10000;

        this.screenHeightModified = this.scene.game.config.height * 0.8;
        this.magnifier = this.scene.trackLength / this.screenHeightModified;
        this.lapLineRoot = {
            x: this.scene.right - 56,
            y: this.screenHeightModified * 0.5,
        }

        this.lapLine = this.scene.add.graphics({ x: this.lapLineRoot.x + 0.5, y: this.lapLineRoot.y});
        this.sectors = [];

        this.playerLine = this.scene.add.sprite(this.lapLineRoot.x, this.lapLineRoot.y, "sprUiTrackLinePlayer").setOrigin(1, 0.5);
        this.playerLine.depth = 10000;
        this.playerLine.setTintFill(this.colors.default);
        this.otherLines = [];

        this.overSpd = false;
        this.overSlp = false;
        this.overRes = false;
    }

    update(){
        this.btnFullscreen.update();
        this.btnMenu.update();
    
        if(this.scene.player.lapTime.start !== -1){
            let dif = this.scene.player.lapTime.current - this.scene.player.lapTime.start;
            let min = Math.floor(dif / (1000 * 60));
            dif -= min * 60;
            let sec = Math.floor(dif / (1000)) - (min * 60);
            dif -= sec * 1000;
            let mil = dif - (min * 60000);
            this.lapTxt.setText(zeroPad(min, 2) + ":" + zeroPad(sec, 2) + ":" + zeroPad(mil, 3));
        }else{
            this.lapTxt.setText("00:00:000");
        }

        this.spdTxt.setText("SPD " + String(Math.floor(this.scene.player.spd * 900)));
        
        this.slpTxt.setText("SLP " + String(this.scene.player.slipstream.toFixed(2)));
        if (this.scene.player.slipstream > 0) {
            if(this.overSlp === false){
                this.overSlp = true;
                this.slpTxt.setTintFill(this.colors.alert);
                this.textWrap.slp.setTintFill(this.colors.alert);
            }
        }else{
            if (this.overSlp === true) {
                this.overSlp = false;
                this.slpTxt.setTintFill(this.colors.default);
                this.textWrap.slp.setTintFill(this.colors.default);
            }
        }

        let res = 1 - this.scene.player.spdMax;
        this.resTxt.setText("RES " + String(res.toFixed(2)));
        if(res >= 0.85){
            if(this.overRes === false){
                this.overRes = true;
                this.resTxt.setTintFill(this.colors.alert);
                this.textWrap.res.setTintFill(this.colors.alert);
                this.grav.roll.setTintFill(this.colors.alert);
            }
        }else{
            if (this.overRes === true) {
                this.overRes = false;
                this.resTxt.setTintFill(this.colors.default);
                this.textWrap.res.setTintFill(this.colors.default);
                this.grav.roll.setTintFill(this.colors.default);
            }
        }

        this.grav.roll.rotation = this.scene.player.roll * -1;
        this.grav.yaw.rotation = this.scene.spawner.yaw;
        this.grav.pitch.rotation = this.scene.spawner.pitch;
        for(let [i, e] of this.grav.enemies.entries()){
            if(i < this.follower.length){
                e.alpha = 1;
                e.rotation = this.follower[i] *-1;
            }else{
                e.alpha = 0;
            }
        }
        this.follower = [];

        this.target.rot += 0.01;
        this.target.graph.rotation = this.target.rot;

        this.playerLine.y = this.lapLineRoot.y - ((this.scene.player.trackPos) / this.magnifier);

        //clear other players lines if amount of players change to stay consistent with other players
        if(this.scene.otherPlayers.length !== this.otherLines.length){
            for(let l of this.otherLines){
                l.destroy();
            }
            this.otherLines = [];
        }
        //add other player lines if not already existign and draw them where they are
        for(let [i, op] of this.scene.otherPlayers.entries()){
            if(i > this.otherLines.length-1){
                this.otherLines.push(this.scene.add.sprite(this.lapLineRoot.x, this.lapLineRoot.y, "sprUiTrackLineBike").setOrigin(1, 0.5));
                this.otherLines[this.otherLines.length-1].depth = 10000;
                this.otherLines[this.otherLines.length - 1].setTintFill(this.colors.default);
            }
            this.otherLines[i].y = this.lapLineRoot.y - ((op.trackPos) / this.magnifier);
        }
    }

    setTargetPos(_x, _y, _dz){
        this.target.graph.clear();

        this.target.graph.lineStyle(1, this.colors.default);
        this.target.graph.strokeRect(-16 * (_dz * this.scene.zoom), -16 * (_dz * this.scene.zoom), 32 * (_dz * this.scene.zoom), 32 * (_dz * this.scene.zoom));

        this.target.graph.x = _x + 0.5;
        this.target.graph.y = _y;

    }

    setBestTime(_time){
        let dif = _time;
        let min = Math.floor(dif / (1000 * 60));
        dif -= min * 60;
        let sec = Math.floor(dif / (1000)) - (min * 60);
        dif -= sec * 1000;
        let mil = dif - (min * 60000);
        this.bstTxt.setText(zeroPad(min, 2) + ":" + zeroPad(sec, 2) + ":" + zeroPad(mil, 3));
    }

    getSlipstreamed(){

    }

    createMiniMap(){
        this.lapLine.clear();
        for(let s of this.sectors){
            s.destroy();
        }

        this.screenHeightModified = this.scene.game.config.height * 0.8;
        this.magnifier = this.scene.trackLength / this.screenHeightModified;
        this.lapLineRoot = {
            x: this.scene.right - 56,
            y: this.screenHeightModified * 0.5,
        }

        this.lapLine = this.scene.add.graphics({ x: this.lapLineRoot.x + 0.5, y: this.lapLineRoot.y });
        this.lapLine.lineStyle(1, this.colors.default);
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
            this.sectors[this.sectors.length - 1].setTintFill(this.colors.default);
            prev.y -= amt;
        }
        for (let s of this.sectors) {
            s.depth = 10000;
        }
    }
}