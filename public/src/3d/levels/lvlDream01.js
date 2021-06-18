import ElevatorGroup from "../modelGroups/elevator.js";

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
        this.model = this.scene.geometryController.loadModel("MetroPlatform0", "modMetroPlatformToHallway", {
            x: 0,
            y: 0,
            z: 0
        });
        this.model.flags.draw = true;
        this.model1 = this.scene.geometryController.loadModel("MetroPlatform1", "modMetroPlatform", {
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
            this.exitTunnels.push(this.scene.geometryController.loadModel("MetroTunnel"+String(i), "modMetroTunnel", {
                x: -68,
                y: 0,
                z: -288 - (128 * i)
            }));
            this.exitTunnels[this.exitTunnels.length-1].flags.draw = true;
        }

        this.trainMoving = [];
        for (let i = -1; i < 4; i++) {
            this.trainMoving.push(this.scene.geometryController.loadModel("MetroCarriageOutside"+String(i+1), "modMetroCarriageOutside", {
                x: -68,
                y: 0,
                z: -300 + (i * 300)
            }));
            this.trainMoving[this.trainMoving.length - 1].flags.draw = true;
        }
        this.trainMoving.push(this.scene.geometryController.loadModel("Tunnel Block Train", "modMetroCarriageEnd", {
            x: -100,
            y: 0,
            z: -600
        }));
        this.trainMoving[this.trainMoving.length-1].translateAndRotate({
            x: 0,
            y: 0,
            z: 0
        }, {
            yaw: Math.PI,
            pitch: 0,
            roll: 0
        });
        this.trainMoving[this.trainMoving.length - 1].flags.draw = true;

        //tunnel block off
        this.blockedTunnel = []
        for (let i = 0; i < 4; i++) {
            this.blockedTunnel.push(this.scene.geometryController.loadModel("blocked Tunnel " + String(i), "modMetroTunnel", {
                x: -68,
                y: 0,
                z: 800 + (128 * i)
            }));
            this.blockedTunnel[i].flags.draw = true;
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
        /*this.stairsT = this.scene.geometryController.loadModel("stairs behind bars", "modMetroPlatform01", {
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
        });*/
        this.elevator = new ElevatorGroup(this.scene, this, {x: 108, y: 0, z: -256});
        this.elevator.setDraw(true);

        //uppper level of fake moving train
        this.stairTrainTransition = this.scene.geometryController.loadModel("MetroStairCarriageTransition", "modMetroStairCarriageTransition", {
            x: 16,
            y: -48,
            z: 1024
        });
        this.stairTrainTransition.flags.draw = true;

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

            if (this.trainMovingSpd !== 0){
                this.trainMovingSpd = 0;
                this.tunnelMovingSpd = 0;

                //shorten the train in the middle
                this.scene.geometryController.destroyModelById("MetroCarriageOutside1");
                this.scene.geometryController.destroyModelById("MetroCarriageOutside2");
                this.scene.geometryController.destroyModelById("MetroCarriageOutside3");
                this.trainMoving.splice(1, 3);

                //move the train out of the way, so that the player can jump off the platform
                this.trainMoving[0].jumpToPosition({ x: this.trainMoving[0].pos.x, y: 0, z: 800})
                for (let[i,t] of this.trainMoving.entries()){
                    t.jumpToPosition({x: t.pos.x, y: t.pos.y, z: this.trainMoving[0].pos.z + (i * 300)})
                }
                //move train end back in front of train[0]
                this.trainMoving[this.trainMoving.length - 1].jumpToPosition({ x: this.trainMoving[this.trainMoving.length-1].pos.x, y: this.trainMoving[0].pos.y, z: this.trainMoving[0].pos.z - 112})
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

        this.ships = [];

        //inital text tips
        this.mrTutorial = this.scene.geometryController.loadModel("Mister Tutorial", "modCharacterBeggar", {
            x: 0,
            y: 1024,
            z: 0
        });
        this.mrTutorial.data = {
            conversation: {
                fileName: "diaMisterTutorial00",
                treePosition: 0
            }
        }
        this.mrTutorial.interact = () => {
            this.scene.player.setMode(PLAYERMODE.DIALOGUE);
            this.scene.player.conversationManager.setNPC(this.mrTutorial);
            this.scene.player.conversationManager.setConversation(this.mrTutorial.data.conversation.fileName, this.mrTutorial.data.conversation.treePosition);
        }
        this.mrTutorial.interact();
        this.scene.hand.setMouseLock(false);

        //CHARACTERS
        this.beggar = this.scene.geometryController.loadModel("Old poor man", "modCharacterBeggar", {
            x: 16,
            y: 0,
            z: 144//76
        });
        this.beggar.setDrawMode(DRAWMODE.BILLBOARD);
        this.beggar.data = {
            conversation: {
                fileName: "diaDreamBeggar01",
                treePosition: 0
            }
        }
        this.beggar.interactable = true;
        this.beggar.interact = () => {
            this.scene.player.setMode(PLAYERMODE.DIALOGUE);
            this.scene.player.conversationManager.setNPC(this.beggar);
            this.scene.player.conversationManager.setConversation(this.beggar.data.conversation.fileName, this.beggar.data.conversation.treePosition);
        }

        this.barbara = this.scene.geometryController.loadModel("Saint Barbara", "modCharacterStBarbara", {
            x: 128,
            y: -12,
            z: 44//76
        });
        this.barbara.setDrawMode(DRAWMODE.BILLBOARD);
        this.barbara.data = {
            conversation: {
                fileName: "diaDreamBarbara01",
                treePosition: 0
            }
        }
        this.barbara.interactable = true;
        this.barbara.interact = () => {
            //this.scene.player.jumpToPosition({ x: 0, y: 0, z: 0 });
            //this.scene.loadLevel("hangar00");

            this.scene.player.setMode(PLAYERMODE.DIALOGUE);
            this.scene.player.conversationManager.setNPC(this.barbara);
            this.scene.player.conversationManager.setConversation(this.barbara.data.conversation.fileName, this.barbara.data.conversation.treePosition);
        }

        /*this.hooman = this.scene.geometryController.loadModel("turnAroundTest", "modCharacterTurnaroundTest", {
            x: 16,
            y: 0,
            z: 180
        });
        this.hooman.setDrawMode(DRAWMODE.BILLBOARD);
        this.hooman.flags.draw = true;
        this.hooman.flags.is8way = true;
        //this.hooman.lookDir.yaw = 0;

        this.lara = this.scene.geometryController.loadModel("Lara", "modCharacterTurnaroundLara", {
            x: -8,
            y: 0,
            z: 274
        });
        this.lara.setDrawMode(DRAWMODE.BILLBOARD);
        this.lara.flags.draw = true;
        this.lara.flags.is8way = true;
        this.lara.lookDir.yaw = Math.PI;

        this.moritz = this.scene.geometryController.loadModel("Moritz", "modCharacterTurnaroundMoritz", {
            x: 10,
            y: 0,
            z: 274
        });
        this.moritz.setDrawMode(DRAWMODE.BILLBOARD);
        this.moritz.flags.draw = true;
        this.moritz.flags.is8way = true;
        this.moritz.lookDir.yaw = Math.PI;*/

        //TRIGGERS
        this.barbara.flags.draw = true;
        this.beggar.flags.draw = true;
        this.model.flags.draw = true;
        this.model1.flags.draw = true;



        this.triggerInit = this.scene.geometryController.loadModel("doorTrigger", "modTriggerWall1x1", {
            x: -38,
            y: 16,
            z: 64
        });
        this.triggerInit.scale({x: 96, y: 64, z: 1})
        this.triggerInit.trigger.isTrigger = true;
        this.triggerInit.trigger.onEnter = () => {
            this.otherPlatform.flags.draw = !this.otherPlatform.flags.draw;
            this.otherTunnelEntry.flags.draw = !this.otherTunnelEntry.flags.draw;
            //this.stairsT.flags.draw = !this.stairsT.flags.draw;
            /*for(let e of this.elevator){
                e.flags.draw = !e.flags.draw;
            }*/
            this.elevator.setDraw(!this.elevator.flags.draw);
        }
        //this.triggerInit.flags.draw = true;



        this.triggerStairsBottom = this.scene.geometryController.loadModel("doorTrigger", "modTriggerWall1x1", {
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
            for (let b of this.blockedTunnel){
                b.flags.draw = !b.flags.draw;
            }
            this.trainControls.flags.draw = !this.trainControls.flags.draw;
        }


        this.triggerStairsTop = this.scene.geometryController.loadModel("doorTrigger", "modTriggerWall1x1", {
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
        //this.triggerTrainRun.flags.draw = true;
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
                    //this.trainEnd.translateAndRotate({ x: 0, y: 0, z: 256 }, { yaw: 0, pitch: 0, roll: 0 });
                    for(let t of this.trainMoving){
                        t.translateAndRotate({ x: 0, y: 0, z: 256 }, { yaw: 0, pitch: 0, roll: 0 });
                    }
                    this.triggerTrainRun.translateAndRotate({ x: 0, y: 0, z: 256 }, { yaw: 0, pitch: 0, roll: 0 });
                    this.scene.player.jumpToPosition({x: this.scene.player.pos.x, y: this.scene.player.pos.y, z: this.scene.player.pos.z + 256});
                }
            }
        }

        this.triggerShips = this.scene.geometryController.loadModel("doorTrigger", "modTriggerWall1x1", {
            x: -82,
            y: 16,
            z: -800
        });
        //this.triggerShips.flags.draw = true;
        this.triggerShips.scale({ x: 36, y: 32, z: 1 })
        this.triggerShips.trigger.isTrigger = true;
        this.triggerShips.trigger.onEnter = () => {
            if(this.state !== 2){
                this.state = 2;

                //add ships that rush down the tunnel
                this.ships.push(this.scene.geometryController.loadModel("Ship A", "modShipHamptonAegis", {
                    x: -82,
                    y: 16,
                    z: -2200
                }));
                this.ships[0].data = {
                    pivot: {
                        x: -82,
                        y: -24,
                        z: -2200
                    },
                    radius: 40,
                    angle: Math.PI * 0.5
                }
                this.ships[0].flags.draw = true;
                this.ships[0].flags.collision = false;
                
                this.ships.push(this.scene.geometryController.loadModel("Ship B", "modShipArashiDart", {
                    x: -82,
                    y: 16,
                    z: -2300
                }));
                this.ships[1].data = {
                    pivot: {
                        x: -82,
                        y: -24,
                        z: -2300
                    },
                    radius: 48,
                    angle: Math.PI * -0.5
                }
                this.ships[1].flags.draw = true;
                this.ships[1].flags.collision = false;
                this.ships[1].translateAndRotate({ x: 0, y: 0, z: 0 }, { yaw: 0, pitch: 0, roll: Math.PI });
            }
        }

        this.triggerForest = this.scene.geometryController.loadModel("doorTrigger", "modTriggerWall1x1", {
            x: -82,
            y: 16,
            z: -1188
        });
        //this.triggerForest.flags.draw = true;
        this.triggerForest.scale({ x: 36, y: 32, z: 1 })
        this.triggerForest.trigger.isTrigger = true;
        this.triggerForest.trigger.onEnter = () => {
            this.state = 2;
            this.scene.player.jumpToPosition({ x: -135, y: 0, z: 156 });
            this.scene.loadLevel("quarters01");
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
                if(this.trainMovingSpd != 0){
                    if(this.trainMoving[0].pos.z >= -300){
                        for(let t of this.trainMoving){
                            t.translateAndRotate({x: 0, y: 0, z: -300}, {yaw: 0, pitch: 0, roll: 0});
                        }
                    }
                }

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
                //this.trainEnd.translateAndRotate({ x: 0, y: 0, z: this.trainEnd.pos.z - this.triggerTrainRun.pos.z > 128 ? -4 : 0 }, { yaw: 0, pitch: 0, roll: 0});
                for(let t of this.trainMoving){
                    t.translateAndRotate({ x: 0, y: 0, z: this.trainMoving[0].pos.z - this.triggerTrainRun.pos.z > 256 ? -4 : 0 }, { yaw: 0, pitch: 0, roll: 0 });
                }
            break;
            case 2:
                //ships rushing down the tunnel
                //move and rotate ships
                for (let s of this.ships) {
                    s.data.angle += 0.01;
                    s.data.pivot.z += 10;
                    s.translateAndRotate({ x: 0, y: 0, z: 0 }, { yaw: 0, pitch: 0, roll: 0.01 });
                    s.jumpToPosition({ x: s.data.pivot.x + (Math.cos(s.data.angle) * s.data.radius), y: s.data.pivot.y + (Math.sin(s.data.angle) * s.data.radius), z: s.data.pivot.z });
                }
            break;
            case 3:
                //forest turnign in onto player
            break;
            default:
            break;
        }
        
    }

    destroy() {

    }
}