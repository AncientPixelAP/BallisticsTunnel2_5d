export default class LevelDream00{
    constructor(_scene){
        this.scene = _scene;

        this.objects = [];
        this.objects.push(this.scene.geometryController.loadModel("DreamBloodLine", "modDreamBloodLine", {
            x: 0,
            y: 0,
            z: 0
        }));

        this.smokes = [];
        for(let d = 64 ; d < 256 ; d+= 64){
            for(let i = 0 ; i < Math.PI * 2; i += Math.PI * 0.1){
                this.smokes.push(this.scene.geometryController.loadModel("Smoke", "modSmoke", {
                    x: Math.cos(i) * d,
                    y: -16,
                    z: Math.sin(i) * d
                }));
                this.smokes[this.smokes.length - 1].debug.mode = this.smokes[this.smokes.length - 1].debug.modes.d2d;
            }
        }

        this.ship = this.scene.geometryController.loadModel("ShipArashiDart", "modShipArashiDart", {
            x: 128,
            y: 0,
            z: 0
        });

        this.door = this.scene.geometryController.loadModel("DreamDoor", "modDreamDoor", {
            x: -24,
            y: 0,
            z: 868
        });
        this.doorFrame = this.scene.geometryController.loadModel("DreamDoorFrame", "modDreamDoorFrame", {
            x: -24,
            y: 0,
            z: 868
        });
    }

    update(){
        /*this.ship.translateAndRotate({
            x: Math.sin(this.ship.dir.yaw) * 16,
            y: 0,
            z: Math.cos(this.ship.dir.yaw) * 16
        }, {
            yaw: -0.05,
            pitch: 0,
            roll: 0
        });*/
        let toDir = (this.scene.player.dir.yaw * -1) - this.ship.dir.yaw;
        this.ship.translateAndRotate({
            x: 0,
            y: 0,
            z: 0
        }, {
            yaw: toDir,
            pitch: 0,
            roll: 0
        });
    }
}