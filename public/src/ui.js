export default class Ui{
    constructor(_scene){
        this.scene = _scene;

        this.spdTxt = this.scene.add.bitmapText(this.scene.left + 32, -32, "pixelmix", "SPD ", 8, 1).setOrigin(0, 0.5);
        this.spdTxt.depth = 10000;
        this.spdTxt.setTint(0xffffff);

        this.slpTxt = this.scene.add.bitmapText(this.scene.left + 32, 0, "pixelmix", "SLP ", 8, 1).setOrigin(0, 0.5);
        this.slpTxt.depth = 10000;
        this.slpTxt.setTint(0xffffff);

        this.resTxt = this.scene.add.bitmapText(this.scene.left + 32, 32, "pixelmix", "RES ", 8, 1).setOrigin(0, 0.5);
        this.resTxt.depth = 10000;
        this.resTxt.setTint(0xffffff);

        /*this.graphTxt = this.scene.add.graphics(0, 0);
        this.graphTxt.lineStyle(2, 0xffffff);
        this.graphTxt.strokeRect(this.spdTxt.x - 8, this.spdTxt.y - 8, 64, 16);
        this.graphTxt.strokeRect(this.slpTxt.x - 8, this.slpTxt.y - 8, 64, 16);
        this.graphTxt.strokeRect(this.resTxt.x - 8, this.resTxt.y - 8, 64, 16);
        this.graphTxt.depth = 10000;*/

        this.textWrap = {
            spd: this.scene.add.sprite(this.scene.left + 56, -32, "sprUiTextWrap"),
            slp: this.scene.add.sprite(this.scene.left + 56, 0, "sprUiTextWrap"),
            res: this.scene.add.sprite(this.scene.left + 56, 32, "sprUiTextWrap"),
        }
        this.textWrap.spd.depth = 10000;
        this.textWrap.slp.depth = 10000;
        this.textWrap.res.depth = 10000;

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
            graph: this.scene.add.graphics(),
            rot: 0
        }
        this.target.graph.lineStyle(1, 0xffffff);
        this.target.graph.strokeRect(-16, -16, 32, 32);
        this.target.graph.depth = 10000;
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
    }

    setTargetPos(_x, _y, _dz){
        this.target.graph.clear();

        this.target.graph.lineStyle(1, 0xffffff);
        this.target.graph.strokeRect(-16 * (_dz * this.scene.zoom), -16 * (_dz * this.scene.zoom), 32 * (_dz * this.scene.zoom), 32 * (_dz * this.scene.zoom));

        this.target.graph.x = _x;
        this.target.graph.y = _y;

    }
}