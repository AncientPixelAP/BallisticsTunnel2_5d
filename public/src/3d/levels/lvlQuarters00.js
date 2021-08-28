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
            z: 233
        });
        this.pc.scale({x: 12, y: 32, z: 6});
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

        //CHARACTERS
        this.mirrorSelf = this.scene.geometryController.loadModel("mirrorSelf", "modCharacterTurnaroundMoritz", {
            x: 0,
            y: 0,
            z: 0
        });
        this.mirrorSelf.setDrawMode(DRAWMODE.BILLBOARD);
        //this.mirrorSelf.flags.draw = true;
        this.mirrorSelf.flags.is8way = true;
        this.mirrorSelf.lookDir.yaw = Math.PI;
        this.mirrorSelf.data = {
            conversation: {
                fileName: "diaInfogrunts00",
                treePosition: 3
            }
        }
        this.mirrorSelf.interactable = true;
        this.mirrorSelf.interact = () => {
            this.scene.player.setMode(PLAYERMODE.DIALOGUE);
            this.scene.player.conversationManager.setNPC(this.mirrorSelf);
            this.scene.player.conversationManager.setConversation(this.mirrorSelf.data.conversation.fileName, this.mirrorSelf.data.conversation.treePosition);
        }
        this.mirrorSelf.flags.draw = true;
    }

    update(){
        let mirrorPoint = {
            x: -332,
            y: 0,
            z: 90
        }

        this.mirrorSelf.jumpToPosition({x: (this.scene.player.pos.x * -1) + mirrorPoint.x, y: this.scene.player.pos.y, z: this.scene.player.pos.z});
        this.mirrorSelf.lookDir.yaw = this.scene.player.dir.yaw * -1;
        //this.mirrorSelf.translateAndRotate({ x: 0, y: 0, z: 0 }, { yaw: 0.01, pitch: 0, roll: 0 });
    }

    destroy() {

    }
}