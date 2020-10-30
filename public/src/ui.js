export default class Ui{
    constructor(_scene){
        this.scene = _scene;

        
        //create stats text
        this.spdTxt = this.scene.add.bitmapText(this.scene.left + 32, -32, "pixelmix", "SPD ", 8, 1).setOrigin(0, 0.5);
        this.spdTxt.depth = 10000;
        this.spdTxt.setTint(0xffffff);

        this.slpTxt = this.scene.add.bitmapText(this.scene.left + 32, 0, "pixelmix", "SLP ", 8, 1).setOrigin(0, 0.5);
        this.slpTxt.depth = 10000;
        this.slpTxt.setTint(0xffffff);

        this.resTxt = this.scene.add.bitmapText(this.scene.left + 32, 32, "pixelmix", "RES ", 8, 1).setOrigin(0, 0.5);
        this.resTxt.depth = 10000;
        this.resTxt.setTint(0xffffff);

        this.textWrap = {
            spd: this.scene.add.sprite(this.scene.left + 56, -32, "sprUiTextWrap"),
            slp: this.scene.add.sprite(this.scene.left + 56, 0, "sprUiTextWrap"),
            res: this.scene.add.sprite(this.scene.left + 56, 32, "sprUiTextWrap"),
        }
        this.textWrap.spd.depth = 10000;
        this.textWrap.slp.depth = 10000;
        this.textWrap.res.depth = 10000;

        //create grav meter
        this.grav = {
            circle: this.scene.add.sprite(this.scene.left + 56, 64, "sprUiCircle"),
            roll: this.scene.add.sprite(this.scene.left + 56, 64, "sprUiRoll"),
            yaw: this.scene.add.sprite(this.scene.left + 56, 64, "sprUiSpawnerRoll"),
            pitch: this.scene.add.sprite(this.scene.left + 56, 64, "sprUiSpawnerRoll")
        }
        this.grav.circle.depth = 10000;
        this.grav.roll.depth = 10000;
        this.grav.yaw.depth = 10000;
        this.grav.pitch.depth = 10000;

        this.target = {
            graph: this.scene.add.graphics({x: 0.5, y: 0}),
            rot: 0
        }
        this.target.graph.lineStyle(1, 0xffffff);
        this.target.graph.strokeRect(-16, -16, 32, 32);
        this.target.graph.depth = 10000;

        //create Lap Line
        /*this.graphTxt = this.scene.add.graphics(0, 0);
        this.graphTxt.lineStyle(2, 0xffffff);
        this.graphTxt.strokeRect(this.spdTxt.x - 8, this.spdTxt.y - 8, 64, 16);
        this.graphTxt.strokeRect(this.slpTxt.x - 8, this.slpTxt.y - 8, 64, 16);
        this.graphTxt.strokeRect(this.resTxt.x - 8, this.resTxt.y - 8, 64, 16);
        this.graphTxt.depth = 10000;*/

        this.screenHeightModified = this.scene.game.config.height * 0.8;
        this.magnifier = this.scene.trackLength / this.screenHeightModified;
        this.lapLineRoot = {
            x: this.scene.right - 56,
            y: this.screenHeightModified * 0.5,
        }

        this.lapLine = this.scene.add.graphics({ x: this.lapLineRoot.x + 0.5, y: this.lapLineRoot.y});
        this.lapLine.lineStyle(1, 0xffffff);
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
        for(let d of this.scene.trackData){
            let amt = d.units / this.magnifier;
            this.sectors.push(this.scene.add.sprite(prev.x, prev.y - amt, "sprUiTrackLine").setOrigin(0, 0.5));
            prev.y -= amt;
        }
        for(let s of this.sectors){
            s.depth = 10000;
        }

        this.playerLine = this.scene.add.sprite(this.lapLineRoot.x, this.lapLineRoot.y, "sprUiTrackLinePlayer").setOrigin(1, 0.5);
        this.playerLine.depth = 10000;
        this.otherLines = [];

        /*this.playersLine = this.scene.add.graphics({ x: 0.5, y: this.screenHeightModified * 0.5 });
        this.playersLine.lineStyle(1, 0xffffff);
        this.playersLine.depth = 10000;*/
        
        //console.log(this.scene.trackLength / this.scene.game.config.height);
        //console.log(this.scene.trackLength, this.scene.game.config.height * 0.8);
    }

    update(){
        this.spdTxt.setText("SPD " + String(Math.floor(this.scene.player.spd * 900)));
        this.slpTxt.setText("SLP " + String(this.scene.player.slipstream.toFixed(2)));
        this.resTxt.setText("RES " + String((1 - this.scene.player.spdMax).toFixed(2)));

        this.grav.roll.rotation = this.scene.player.roll * -1;
        this.grav.yaw.rotation = this.scene.spawner.yaw;
        this.grav.pitch.rotation = this.scene.spawner.pitch;

        this.target.rot += 0.01;
        this.target.graph.rotation = this.target.rot;

        /*this.playersLine.clear();
        this.playersLine.lineStyle(1, 0xffffff);
        this.playersLine.beginPath();
        this.playersLine.moveTo(-4.5, (this.scene.player.trackPos / this.magnifier) * -1);
        this.playersLine.lineTo(0.5, (this.scene.player.trackPos / this.magnifier) * -1);
        this.playersLine.strokePath();*/

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
            }
            this.otherLines[i].y = this.lapLineRoot.y - ((op.trackPos) / this.magnifier);
        }
    }

    setTargetPos(_x, _y, _dz){
        this.target.graph.clear();

        this.target.graph.lineStyle(1, 0xffffff);
        this.target.graph.strokeRect(-16 * (_dz * this.scene.zoom), -16 * (_dz * this.scene.zoom), 32 * (_dz * this.scene.zoom), 32 * (_dz * this.scene.zoom));

        this.target.graph.x = _x + 0.5;
        this.target.graph.y = _y;

    }
}