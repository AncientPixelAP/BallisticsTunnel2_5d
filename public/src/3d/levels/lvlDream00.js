export default class LevelDream00{
    constructor(_scene){
        this.scene = _scene;

        this.states = {
            MAZE: 0,
            ROOM: 1
        }
        this.state = this.states.MAZE;

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
                this.smokes[this.smokes.length - 1].debug.mode = DRAWMODE.D2D;
            }
        }

        this.ship = this.scene.geometryController.loadModel("ShipArashiDart", "modShipArashiDart", {
            x: 128,
            y: 0,
            z: 0
        });

        this.door = this.scene.geometryController.loadModel("DreamDoor", "modDreamDoor", {
            x: -22,
            y: 0,
            z: 868
        });
        this.doorFrame = this.scene.geometryController.loadModel("DreamDoorFrame", "modDreamDoorFrame", {
            x: -22,
            y: 0,
            z: 868
        });
        this.doorTrigger = this.scene.geometryController.loadModel("doorTrigger", "modTrigger64x64", {
            x: -32,
            y: 0,
            z: 836
        });
        this.doorTrigger.trigger.isTrigger = true;
        this.doorTrigger.trigger.onEnter = () => {
            this.door.mover.isMoving = true;
            this.door.mover.target.dir.yaw = 2.1;
            this.door.mover.target.dir.spd = 2.1 * 0.05;

            if(this.state === this.states.MAZE){
                this.state = this.states.ROOM;
                for (let o of this.objects) {
                    o.destroy();
                }
                for (let s of this.smokes) {
                    s.destroy();
                }
                this.ship.destroy();
            }
        }
        this.doorTrigger.trigger.onExit = () => {
            this.door.mover.isMoving = true;
            this.door.mover.target.dir.yaw = 0;
            this.door.mover.target.dir.spd = 2.1 * -0.05;
        }

        this.levelTrigger = this.scene.geometryController.loadModel("levelTrigger", "modTrigger64x64", {
            x: -32,
            y: 0,
            z: 1100
        });
        this.levelTrigger.trigger.isTrigger = true;
        this.levelTrigger.trigger.onEnter = () => {
            this.scene.player.jumpToPosition({x: 0, y: 0, z: 0});
            this.scene.loadLevel("hangar00");
        }

        //TODO rain that flows upwards and create level trigger only if door is open

        this.room = this.scene.geometryController.loadModel("dreamRoom", "modDreamRoom", {
            x: -32,
            y: 0,
            z: 880
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

    destroy(){
        /*for(let o of this.objects){
            o.destroy();
        }
        for(let s of this.smokes){
            s.destroy();
        }
        this.ship.destroy();
        this.door.destroy();
        this.doorFrame.destroy();
        this.doorTrigger.destroy();
        this.levelTrigger.destroy();*/
    }
}