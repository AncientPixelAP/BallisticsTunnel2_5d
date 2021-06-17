import ElevatorGroup from "../modelGroups/elevator.js";

export default class LevelQuarters00{
    constructor(_scene){
        this.scene = _scene;

        this.elevator = new ElevatorGroup(this.scene, this, {x: 0, y: 0, z: 0});
        this.elevator.setDraw(true);

        this.room = this.scene.geometryController.loadModel("Player Apartement", "modPlayerApartement", {
            x: -48,
            y: 0,
            z: 128
        });
        this.room.flags.draw = true;

        this.pc = this.scene.geometryController.loadModel("my pc", "modTriggerWall1x1", {
            x: -76,
            y: -13,
            z: 232
        });
        this.pc.scale({x: 12, y: 32, z: 4});
        this.pc.data = {
            conversation: {
                fileName: "diaInfogrunts00",
                treePosition: 6
            }
        }
        this.pc.interactable = true;
        this.pc.interact = () => {
            this.scene.player.setMode(PLAYERMODE.DIALOGUE);
            this.scene.player.conversationManager.setNPC(this.pc);
            this.scene.player.conversationManager.setConversation(this.pc.data.conversation.fileName, this.pc.data.conversation.treePosition);
        }
        //this.pc.flags.draw = true;
    }

    update(){
        
    }

    destroy() {

    }
}