export default class Segment{
    constructor(_scene, _pos, _dir, _asset, _frame){
        this.scene = _scene;
        this.pos = _pos;
        this.screenPos = {
            x: 0,
            y: 0
        }
        this.dir = _dir;
        this.curve = {
            x: 0,
            y: 0
        }
        this.resistance = 0;
        this.asset = _asset;
        this.frame = _frame;
        this.toKill = false;

        this.sprite = this.scene.add.sprite(this.pos.x, this.pos.y, this.asset, this.frame);
    }

    update3d(){
        this.screenPos.x = (this.pos.x / (Math.abs(Math.max(0.1, this.pos.z)) * 1)) * this.scene.zoom;
        this.screenPos.y = (this.pos.y / (Math.abs(Math.max(0.1, this.pos.z)) * 1)) * this.scene.zoom;

        let len = Phaser.Math.Distance.Between(0, 0, this.pos.x, this.pos.y);
        let ang = Phaser.Math.Angle.Between(0, 0, this.pos.x, this.pos.y) + this.scene.player.roll;

        let dz = 1 / this.pos.z;
        let shade = Math.max(0, 255 - ((this.pos.z * 4) + this.pos.z));

        this.sprite.rotation = this.scene.player.roll - this.dir;

        this.sprite.x = this.screenPos.x + (Math.cos(ang) * len); //* dz;
        this.sprite.y = this.screenPos.y + (Math.sin(ang) * len) - ((24 * this.scene.zoom) * dz); //* dz;

        this.sprite.setScale(dz * this.scene.zoom);
        this.sprite.setTint(Phaser.Display.Color.GetColor(shade, shade, shade));
        this.sprite.depth = dz;
    }

    update(){

        let len = Phaser.Math.Distance.Between(0, 0, this.pos.x, this.pos.y);
        let ang = Phaser.Math.Angle.Between(0, 0, this.pos.x, this.pos.y) + this.scene.player.roll;

        this.screenPos = {
            x: (Math.cos(ang) * len) - ((this.scene.player.yaw * this.pos.z) * this.scene.zoom),
            y: (Math.sin(ang) * len) - ((this.scene.player.stats.rideHeight + (this.scene.player.pitch * this.pos.z)) * this.scene.zoom)
        }
        this.resistance = (Math.sin(ang) * len);// - (this.scene.player.radius * this.scene.zoom);

        if(this.pos.z > 0){
            let dz = 1/this.pos.z;
            let shade = Math.max(0, 255 - ((this.pos.z * 4) + this.pos.z));

            this.sprite.rotation = this.scene.player.roll - this.dir;

            this.sprite.x = this.screenPos.x * dz;
            this.sprite.y = this.screenPos.y * dz;

            this.sprite.setScale(dz * this.scene.zoom);
            this.sprite.setTint(Phaser.Display.Color.GetColor(shade, shade, shade));
            this.sprite.depth = dz;
            this.sprite.alpha = 1;
        }else{
            this.sprite.alpha = 0;
            this.toKill = true;
        }
    }

    destroy(){
        this.sprite.destroy();
    }
}