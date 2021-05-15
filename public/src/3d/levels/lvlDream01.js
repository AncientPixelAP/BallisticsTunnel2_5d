import PanelElevator from "../../ui/panelElevator.js";

export default class LevelDream01{
    constructor(_scene){
        this.scene = _scene;

        this.trainMovingSpd = 5;
        this.tunnelMovingSpd = -8;

        this.state = 0;

        this.objects = [];
        /*this.objects.push(this.scene.geometryController.loadModel("ElevatorBase", "modElevatorBase", {
            x: 0,
            y: 0,
            z: 0
        }));*/
        //player starts on this platform
        this.model = this.scene.geometryController.loadModel("MetroPlatform", "modMetroPlatformToHallway", {
            x: 0,
            y: 0,
            z: 0
        });
        this.model.flags.draw = true;
        this.model1 = this.scene.geometryController.loadModel("MetroPlatform", "modMetroPlatform", {
            x: 0,
            y: 0,
            z: 416
        });
        this.model1.flags.draw = true;
        this.stairs = this.scene.geometryController.loadModel("modMetroPlatform01", "modMetroPlatform01", {
            x: 0,
            y: 0,
            z: 832
        });
        this.stairs.flags.draw = true;

        this.tunnelEntry = this.scene.geometryController.loadModel("Tunnel Entry", "modMetroTunnelEntry", {
            x: -68,
            y: 0,
            z: -160
        });
        this.tunnelEntry.flags.draw = true;
        this.exitTunnels = [];
        for (let i = 0; i < 8; i++) {
            this.exitTunnels.push(this.scene.geometryController.loadModel("MetroTunnel", "modMetroTunnel", {
                x: -68,
                y: 0,
                z: -288 - (128 * i)
            }));
            this.exitTunnels[this.exitTunnels.length-1].flags.draw = true;
        }

        this.trainMoving = [];
        for (let i = -1; i < 4; i++) {
            this.trainMoving.push(this.scene.geometryController.loadModel("MetroCarriageOutside", "modMetroCarriageOutside", {
                x: -68,
                y: 0,
                z: -300 + (i * 300)
            }));
            this.trainMoving[this.trainMoving.length - 1].flags.draw = true;
        }

        //tunnel block off
        this.blockedTunnel = []
        for (let i = 0; i < 4; i++) {
            this.blockedTunnel.push(this.scene.geometryController.loadModel("blocked Tunnel " + String(i), "modMetroTunnel", {
                x: -68,
                y: 0,
                z: 800 + (128 * i)
            }));
        }

        //T crossing as entry with st barbara
        this.hallwayT = this.scene.geometryController.loadModel("Metro Hallway T", "modMetroHallwayT", {
            x: 48,
            y: 0,
            z: 0
        });
        this.hallwayT.flags.draw = true;
        this.otherPlatform = this.scene.geometryController.loadModel("other MetroPlatform", "modMetroPlatformToHallway", {
            x: 256,
            y: 0,
            z: 8
        });
        this.otherPlatform.flags.draw = true;
        this.otherPlatform.translateAndRotate({
            x: 0,
            y: 0,
            z: 0
        }, {
            yaw: Math.PI,
            pitch: 0,
            roll: 0
        });
        this.otherTunnelEntry = this.scene.geometryController.loadModel("other Tunnel Entry", "modMetroTunnelEntry", {
            x: 324,
            y: 0,
            z: 168
        });
        this.otherTunnelEntry.flags.draw = true;
        this.otherTunnelEntry.translateAndRotate({
            x: 0,
            y: 0,
            z: 0
        }, {
            yaw: Math.PI,
            pitch: 0,
            roll: 0
        });
        this.stairsT = this.scene.geometryController.loadModel("stairs behind bars", "modMetroPlatform01", {
            x: 108,
            y: 0,
            z: -236
        });
        this.stairsT.flags.draw = true;
        this.stairsT.translateAndRotate({
            x: 0,
            y: 0,
            z: 0
        }, {
            yaw: Math.PI,
            pitch: 0,
            roll: 0
        });

        //uppper level of fake moving train
        this.stairTrainTransition = this.scene.geometryController.loadModel("MetroStairCarriageTransition", "modMetroStairCarriageTransition", {
            x: 16,
            y: -48,
            z: 1024
        });
        this.stairTrainTransition.flags.draw = true;

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
        this.trainControls.interactable = true;
        this.trainControls.interact = () => {
            //this.scene.player.setMode(PLAYERMODE.INTERACT);
            //this.scene.player.panel = new PanelElevator(this.scene);
            this.trainEnd.flags.draw = true;

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
        this.beggar = this.scene.geometryController.loadModel("John Hobo", "modCharacterBeggar", {
            x: 16,
            y: 0,
            z: 144//76
        });
        this.beggar.setDrawMode(DRAWMODE.BILLBOARD);
        this.beggar.interactable = true;
        this.beggar.interact = () => {
            this.scene.player.setMode(PLAYERMODE.INTERACT);
            this.scene.player.panel = new PanelElevator(this.scene);
        }

        this.barbara = this.scene.geometryController.loadModel("Saint Barbara", "modCharacterStBarbara", {
            x: 128,
            y: -12,
            z: 44//76
        });
        this.barbara.setDrawMode(DRAWMODE.BILLBOARD);
        this.barbara.interactable = true;
        this.barbara.interact = () => {
            //this.scene.player.setMode(PLAYERMODE.INTERACT);
            //this.scene.player.panel = new PanelElevator(this.scene);
            this.scene.player.jumpToPosition({ x: 0, y: 0, z: 0 });
            this.scene.loadLevel("hangar00");
        }

        //TRIGGERS
        this.barbara.flags.draw = true;
        this.beggar.flags.draw = true;
        this.model.flags.draw = true;
        this.model1.flags.draw = true;



        this.triggerInit = this.scene.geometryController.loadModel("doorTrigger", "modTrigger1x1", {
            x: 0,
            y: 0,
            z: 64
        });
        this.triggerInit.scale({x: 36, y: 32, z: 1})
        this.triggerInit.trigger.isTrigger = true;
        this.triggerInit.trigger.onEnter = () => {
            this.otherPlatform.flags.draw = !this.otherPlatform.flags.draw;
            this.otherTunnelEntry.flags.draw = !this.otherTunnelEntry.flags.draw;
            this.stairsT.flags.draw = !this.stairsT.flags.draw;
        }
        this.triggerInit.flags.draw = true;



        this.triggerStairsBottom = this.scene.geometryController.loadModel("doorTrigger", "modTrigger1x1", {
            x: 0,
            y: 0,
            z: 768
        });
        this.triggerStairsBottom.scale({x: 36, y: 32, z: 1})
        this.triggerStairsBottom.trigger.isTrigger = true;
        this.triggerStairsBottom.trigger.onEnter = () => {
            for(let t of this.tunnelMoving){
                t.flags.draw = !t.flags.draw;
            }
            for(let s of this.trainStationary){
                s.flags.draw = !s.flags.draw;
            }
            this.trainControls.flags.draw = !this.trainControls.flags.draw;
        }


        this.triggerStairsTop = this.scene.geometryController.loadModel("doorTrigger", "modTrigger1x1", {
            x: 0,
            y: -48,
            z: 1243
        });
        this.triggerStairsTop.scale({ x: 36, y: 32, z: 1 })
        this.triggerStairsTop.trigger.isTrigger = true;
        this.triggerStairsTop.trigger.onEnter = () => {
            this.model.flags.draw = !this.model.flags.draw;
            this.model1.flags.draw = !this.model1.flags.draw;
            for(let t of this.trainMoving){
                t.flags.draw = !t.flags.draw;
            }
            this.hallwayT.flags.draw = !this.hallwayT.flags.draw;
            this.tunnelEntry.flags.draw = !this.tunnelEntry.flags.draw;
            for(let t of this.exitTunnels){
                t.flags.draw = !t.flags.draw;
            }
        }

        this.triggerTrainRun = this.scene.geometryController.loadModel("doorTrigger", "modTrigger1x1", {
            x: -82,
            y: 16,
            z: -208
        });
        this.triggerTrainRun.flags.draw = true;
        this.triggerTrainRun.scale({ x: 36, y: 32, z: 4 })
        this.triggerTrainRun.trigger.isTrigger = true;
        this.triggerTrainRun.trigger.onEnter = () => {
            if(this.state === 0){
                this.state = 1;
            }
        }
        this.triggerTrainRun.trigger.onOverlap = () => {
            if (this.scene.player.dir.yaw > Math.PI * 0.5 || this.scene.player.dir.yaw < Math.PI * -0.5) {
                this.triggerTrainRun.translateAndRotate({ x: 0, y: 0, z: -64 }, { yaw: 0, pitch: 0, roll: 0 });
                if(this.triggerTrainRun.pos.z < -464){
                    this.trainEnd.translateAndRotate({ x: 0, y: 0, z: 256 }, { yaw: 0, pitch: 0, roll: 0 });
                    this.triggerTrainRun.translateAndRotate({ x: 0, y: 0, z: 256 }, { yaw: 0, pitch: 0, roll: 0 });
                    this.scene.player.jumpToPosition({x: this.scene.player.pos.x, y: this.scene.player.pos.y, z: this.scene.player.pos.z + 256});
                }
            }
        }



        this.triggerWood = this.scene.geometryController.loadModel("doorTrigger", "modTrigger1x1", {
            x: -82,
            y: 16,
            z: 1188
        });
        this.triggerWood.flags.draw = true;
        this.triggerWood.scale({ x: 36, y: 32, z: 8 })
        this.triggerWood.trigger.isTrigger = true;
        this.triggerWood.trigger.onEnter = () => {
            this.state = 2;
        }

        /*this.levelTrigger = this.scene.geometryController.loadModel("levelTrigger", "modTrigger64x64", {
            x: -32,
            y: 0,
            z: 1100
        });
        this.levelTrigger.trigger.isTrigger = true;
        this.levelTrigger.trigger.onEnter = () => {
            this.scene.player.jumpToPosition({ x: 0, y: 0, z: 0 });
            this.scene.loadLevel("hangar00");
        }*/

    }

    update(){
        switch(this.state){
            case 0:
                for(let t of this.trainMoving){
                    t.translateAndRotate({x: 0, y: 0, z: this.trainMovingSpd}, {yaw: 0, pitch: 0, roll: 0});
                }
                if(this.trainMoving[0].pos.z >= -300){
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
            break;
            case 1:
                this.trainEnd.translateAndRotate({ x: 0, y: 0, z: this.trainEnd.pos.z - this.triggerTrainRun.pos.z > 128 ? -4 : 0 }, { yaw: 0, pitch: 0, roll: 0});
            break;
            case 2:
                //wood turing in onto the player
            break;
            default:
            break;
        }
        
    }

    destroy() {

    }
}