import ElevatorGroup from "../modelGroups/elevator.js";

export default class LevelOffice00{
    constructor(_scene){
        this.scene = _scene;

        this.elevator = new ElevatorGroup(this.scene, this, {x: 0, y: 0, z: 0});
        this.elevator.setDraw(true);

        this.baseRoom = this.scene.geometryController.loadModel("Office Room", "modOfficeRoom", {
            x: 0,
            y: 0,
            z: 64
        });
        this.baseRoom.flags.draw = true;

        this.chefsessel = this.scene.geometryController.loadModel("Chefsessel", "modChefsessel", {
            x: -16,
            y: 0,
            z: 286
        });
        this.chefsessel.setDrawMode(DRAWMODE.BILLBOARD);
        this.chefsessel.flags.draw = true;

        this.tschechowGun = this.scene.geometryController.loadModel("TschowGun", "modTschechowGun", {
            x: -32,
            y: -16,
            z: 316
        });
        this.tschechowGun.setDrawMode(DRAWMODE.BILLBOARD);
        this.tschechowGun.flags.draw = true;

        /*
        this.vendor = this.scene.geometryController.loadModel("Vendor", "modCharacterTurnaroundTest", {
            x: -44,
            y: 0,
            z: 348
        });
        this.vendor.setDrawMode(DRAWMODE.BILLBOARD);
        this.vendor.flags.draw = true;
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
        */
    }

    update(){
        
    }

    destroy() {

    }
}