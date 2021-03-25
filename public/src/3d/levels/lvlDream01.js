import PanelElevator from "../../ui/panelElevator.js";

export default class LevelDream01{
    constructor(_scene){
        this.scene = _scene;

        this.trainMovingSpd = 5;
        this.tunnelMovingSpd = -8;

        this.objects = [];
        /*this.objects.push(this.scene.geometryController.loadModel("ElevatorBase", "modElevatorBase", {
            x: 0,
            y: 0,
            z: 0
        }));*/
        this.model = this.scene.geometryController.loadModel("MetroPlatform", "modMetroPlatformToHallway", {
            x: 0,
            y: 0,
            z: 0
        });
        this.model1 = this.scene.geometryController.loadModel("MetroPlatform", "modMetroPlatform", {
            x: 0,
            y: 0,
            z: 416
        });
        this.stairs = this.scene.geometryController.loadModel("modMetroPlatform01", "modMetroPlatform01", {
            x: 0,
            y: 0,
            z: 832
        });

        this.hallwayT = this.scene.geometryController.loadModel("Metro Hallway T", "modMetroHallwayT", {
            x: 48,
            y: 0,
            z: 0
        });

        this.stairTrainTransition = this.scene.geometryController.loadModel("MetroStairCarriageTransition", "modMetroStairCarriageTransition", {
            x: 16,
            y: -48,
            z: 1024
        });

        this.trainMoving = [];
        for(let i = -1 ; i < 3 ; i++){
            this.trainMoving.push(this.scene.geometryController.loadModel("MetroCarriage", "modMetroCarriage", {
                x: -168,
                y: 0,
                z: i * 300
            }));
        }

        this.tunnelEntry = this.scene.geometryController.loadModel("Tunnel Entry", "modMetroTunnelEntry", {
            x: -68,
            y: 0,
            z: -160
        });

        this.trainEnd = this.scene.geometryController.loadModel("Tunnel Block Train", "modMetroCarriageEnd", {
            x: -100,
            y: 0,
            z: 800
        });
        this.trainEnd.translateAndRotate({
            x: 0,
            y: 0,
            z: 0
        }, {
            yaw: Math.PI,
            pitch: 0,
            roll: 0
        });

        this.trainStationary = [];
        for(let i = 0 ; i < 3 ; i++){
            this.trainStationary.push(this.scene.geometryController.loadModel("MetroCarriage", "modMetroCarriage", {
                x: 16,
                y: -48,
                z: 1324 + (i * 300)
            }));
        }
        this.trainStationary.push(this.scene.geometryController.loadModel("Stationary Train End", "modMetroCarriageEnd", {
            x: 16,
            y: -48,
            z: 2224
        }));
        this.trainControls = this.scene.geometryController.loadModel("MetroCarriageControls", "modMetroCarriageControls", {
            x: 16,
            y: -48,
            z: 2224
        });
        this.trainControls.interact = () => {
            //this.scene.player.setMode(PLAYERMODE.INTERACT);
            //this.scene.player.panel = new PanelElevator(this.scene);
            this.trainMovingSpd = 0;
            this.tunnelMovingSpd = 0;

            for (let t of this.trainMoving){
                t.translateAndRotate({
                    x: -128,
                    y: 0,
                    z: 0
                }, {
                    yaw: 0,
                    pitch: 0,
                    roll: 0
                });
            }
        }

        this.tunnelMoving = [];
        for (let i = 0; i < 16; i++) {
            this.tunnelMoving.push(this.scene.geometryController.loadModel("MetroTunnel", "modMetroTunnel", {
                x: 16,
                y: -48,
                z: 1024 + (128*i)
            }));
        }

        //CHARACTERS
        this.beggar = this.scene.geometryController.loadModel("texCharBeggar", "modCharacterBeggar", {
            x: 16,
            y: 0,
            z: 144//76
        });
        this.beggar.setDrawMode(DRAWMODE.BILLBOARD);
        this.beggar.interact = () => {
            this.scene.player.setMode(PLAYERMODE.INTERACT);
            this.scene.player.panel = new PanelElevator(this.scene);
        }

    }

    update(){
        for(let t of this.trainMoving){
            t.translateAndRotate({x: 0, y: 0, z: this.trainMovingSpd}, {yaw: 0, pitch: 0, roll: 0});
        }
        if(this.trainMoving[0].pos.z >= 0){
            for(let t of this.trainMoving){
                t.translateAndRotate({x: 0, y: 0, z: -300}, {yaw: 0, pitch: 0, roll: 0});
            }
        }

        //TODO segemnet the level with triggers to skip unnecessary calculations
        for (let t of this.tunnelMoving) {
            t.translateAndRotate({ x: 0, y: 0, z: this.tunnelMovingSpd }, { yaw: 0, pitch: 0, roll: 0 });
        }
        if (this.tunnelMoving[0].pos.z <= 1024) {
            for (let t of this.tunnelMoving) {
                t.translateAndRotate({ x: 0, y: 0, z: 128 }, { yaw: 0, pitch: 0, roll: 0 });
            }
        }
        
    }

    destroy() {

    }
}