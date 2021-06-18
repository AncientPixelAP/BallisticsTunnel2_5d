import ElevatorGroup from "../modelGroups/elevator.js";

export default class LevelMarketsquare00{
    constructor(_scene){
        this.scene = _scene;

        this.elevator = new ElevatorGroup(this.scene, this, {x: 256, y: 16, z: -96});
        this.elevator.setDraw(true);

        this.elevator2 = new ElevatorGroup(this.scene, this, {x: 256, y: -60, z: -96});
        this.elevator2.setDraw(true);

        this.elevatorRoom = this.scene.geometryController.loadModel("Elevator Room", "modElevatorRoom", {
            x: 256,
            y: 16,
            z: 0
        });
        this.elevatorRoom.flags.draw = true;

        this.marketsquare = this.scene.geometryController.loadModel("Marketsquare Apartements", "modMarketsquareApartements", {
            x: 0,
            y: 0,
            z: 0
        });
        //this.marketsquare.flags.draw = true;

        this.marketStaircase = this.scene.geometryController.loadModel("Marketsquare Staircase", "modMarketStaircase", {
            x: -128,
            y: 0,
            z: 400
        });
        //this.marketStaircase.flags.draw = true;

        this.lounge = this.scene.geometryController.loadModel("Drivers Lounge", "modLounge", {
            x: 176,
            y: -60,
            z: 192
        });
        //this.lounge.flags.draw = true;

        /*this.barbara = this.scene.geometryController.loadModel("Saint Barbara", "modCharacterStBarbara", {
            x: 192,
            y: 0,
            z: -96
        });
        this.barbara.setDrawMode(DRAWMODE.BILLBOARD);
        this.barbara.interactable = true;
        this.barbara.interact = () => {
            this.scene.player.jumpToPosition({ x: 0, y: 0, z: 0 });
            this.scene.loadLevel("dream01");
        }
        this.barbara.flags.draw = true;*/

        this.ship = this.scene.geometryController.loadModel("ShipHamptonAegis", "modShipHamptonAegis", {
            x: -16,
            y: 0,
            z: 168
        });
        //this.ship.flags.draw = true;
        this.ship.translateAndRotate({ x: 0, y: 0, z: 0 }, { yaw: 0, pitch: Math.PI * 0.5, roll: 0});

        //CHARACTERS
        this.vendor = this.scene.geometryController.loadModel("Vendor", "modCharacterTurnaroundTest", {
            x: -44,
            y: 0,
            z: 348
        });
        this.vendor.setDrawMode(DRAWMODE.BILLBOARD);
        //this.vendor.flags.draw = true;
        this.vendor.flags.is8way = true;
        this.vendor.lookDir.yaw = Math.PI;
        this.vendor.data = {
            conversation: {
                fileName: "diaInfogrunts00",
                treePosition: 5
            }
        }
        this.vendor.interactable = true;
        this.vendor.interact = () => {this.scene.player.setMode(PLAYERMODE.DIALOGUE);
            this.scene.player.conversationManager.setNPC(this.vendor);
            this.scene.player.conversationManager.setConversation(this.vendor.data.conversation.fileName, this.vendor.data.conversation.treePosition);
        }

        this.lara = this.scene.geometryController.loadModel("Lara", "modCharacterTurnaroundLara", {
            x: 212,
            y: -60,
            z: 250
        });
        this.lara.setDrawMode(DRAWMODE.BILLBOARD);
        //this.lara.flags.draw = true;
        this.lara.flags.is8way = true;
        this.lara.lookDir.yaw = Math.PI * -0.75;
        this.lara.data = {
            conversation: {
                fileName: "diaInfogrunts00",
                treePosition: 0
            }
        }
        this.lara.interactable = true;
        this.lara.interact = () => {this.scene.player.setMode(PLAYERMODE.DIALOGUE);
            this.scene.player.conversationManager.setNPC(this.lara);
            this.scene.player.conversationManager.setConversation(this.lara.data.conversation.fileName, this.lara.data.conversation.treePosition);
        }

        this.moritz = this.scene.geometryController.loadModel("Moritz", "modCharacterTurnaroundMoritz", {
            x: 230,
            y: -60,
            z: 250
        });
        this.moritz.setDrawMode(DRAWMODE.BILLBOARD);
        //this.moritz.flags.draw = true;
        this.moritz.flags.is8way = true;
        this.moritz.lookDir.yaw = Math.PI * 0.5;
        this.moritz.data = {
            conversation: {
                fileName: "diaInfogrunts00",
                treePosition: 3
            }
        }
        this.moritz.interactable = true;
        this.moritz.interact = () => {this.scene.player.setMode(PLAYERMODE.DIALOGUE);
            this.scene.player.conversationManager.setNPC(this.moritz);
            this.scene.player.conversationManager.setConversation(this.moritz.data.conversation.fileName, this.moritz.data.conversation.treePosition);
        }

        this.josef = this.scene.geometryController.loadModel("Josef", "modCharacterTurnaroundTest", {
            x: 318,
            y: -60,
            z: 222
        });
        this.josef.setDrawMode(DRAWMODE.BILLBOARD);
        //this.josef.flags.draw = true;
        this.josef.flags.is8way = true;
        this.josef.lookDir.yaw = Math.PI * 0.5;
        this.josef.data = {
            conversation: {
                fileName: "diaInfogrunts00",
                treePosition: 1
            }
        }
        this.josef.interactable = true;
        this.josef.interact = () => {this.scene.player.setMode(PLAYERMODE.DIALOGUE);
            this.scene.player.conversationManager.setNPC(this.josef);
            this.scene.player.conversationManager.setConversation(this.josef.data.conversation.fileName, this.josef.data.conversation.treePosition);
        }




        //TRIGGERS
        this.triggerToMarket = this.scene.geometryController.loadModel("doorTrigger", "modTriggerWall1x1", {
            x: 220,
            y: 16,
            z: -8
        });
        this.triggerToMarket.scale({x: 96, y: 32, z: 1});
        this.triggerToMarket.translateAndRotate({ x: 0, y: 0, z: 0 }, { yaw: Math.PI * 0.5, pitch: 0, roll: 0});
        this.triggerToMarket.trigger.isTrigger = true;
        this.triggerToMarket.trigger.onEnter = () => {
            this.elevator.setDraw(!this.elevator.flags.draw);
            this.elevator2.setDraw(!this.elevator2.flags.draw);
            this.marketsquare.flags.draw = !this.marketsquare.flags.draw;
            this.ship.flags.draw = !this.ship.flags.draw;
            this.vendor.flags.draw = !this.vendor.flags.draw;
        }
        //this.triggerToMarket.flags.draw = true;

        this.triggerInMarket = this.scene.geometryController.loadModel("doorTrigger", "modTriggerWall1x1", {
            x: 64,
            y: 0,
            z: -64
        });
        this.triggerInMarket.scale({x: 20, y: 32, z: 1});
        this.triggerInMarket.translateAndRotate({ x: 0, y: 0, z: 0 }, { yaw: Math.PI * 0.75, pitch: 0, roll: 0});
        this.triggerInMarket.trigger.isTrigger = true;
        this.triggerInMarket.trigger.onEnter = () => {
            this.elevatorRoom.flags.draw = !this.elevatorRoom.flags.draw;
        }
        //this.triggerInMarket.flags.draw = true;

        this.triggerStaircaseLower = this.scene.geometryController.loadModel("doorTrigger", "modTriggerWall1x1", {
            x: -32,
            y: 0,
            z: 302
        });
        this.triggerStaircaseLower.scale({x: 96, y: 32, z: 1});
        this.triggerStaircaseLower.trigger.isTrigger = true;
        this.triggerStaircaseLower.trigger.onEnter = () => {
            this.marketStaircase.flags.draw = !this.marketStaircase.flags.draw;
        }
        //this.triggerStaircaseLower.flags.draw = true;

        this.triggerStaircaseUpper = this.scene.geometryController.loadModel("doorTrigger", "modTriggerWall1x1", {
            x: 74,
            y: -40,
            z: 207
        });
        this.triggerStaircaseUpper.scale({x: 32, y: 32, z: 1});
        this.triggerStaircaseUpper.translateAndRotate({ x: 0, y: 0, z: 0 }, { yaw: Math.PI * 0.5, pitch: 0, roll: 0});
        this.triggerStaircaseUpper.trigger.isTrigger = true;
        this.triggerStaircaseUpper.trigger.onEnter = () => {
            this.marketStaircase.flags.draw = !this.marketStaircase.flags.draw;
            this.elevatorRoom.flags.draw = !this.elevatorRoom.flags.draw;
            this.elevator.setDraw(!this.elevator.flags.draw);
            this.elevator2.setDraw(!this.elevator2.flags.draw);
        }
        //this.triggerStaircaseUpper.flags.draw = true;

        this.triggerStaircaseLounge = this.scene.geometryController.loadModel("doorTrigger", "modTriggerWall1x1", {
            x: -160,
            y: -40,
            z: 242
        });
        this.triggerStaircaseLounge.scale({x: 32, y: 32, z: 1});
        this.triggerStaircaseLounge.trigger.isTrigger = true;
        this.triggerStaircaseLounge.trigger.onEnter = () => {
            this.lounge.flags.draw = !this.lounge.flags.draw;
            this.josef.flags.draw = !this.josef.flags.draw;
            this.lara.flags.draw = !this.lara.flags.draw;
            this.moritz.flags.draw = !this.moritz.flags.draw;

            this.vendor.flags.draw = !this.vendor.flags.draw;
        }
        //this.triggerStaircaseLounge.flags.draw = true;
    }

    update(){
        
    }

    destroy() {

    }
}