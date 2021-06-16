import ElevatorGroup from "../modelGroups/elevator.js";

export default class LevelQuarters00{
    constructor(_scene){
        this.scene = _scene;

        this.elevator = new ElevatorGroup(this.scene, this, {x: 0, y: 0, z: 0});
        this.elevator.setDraw(true);

        this.room = this.scene.geometryController.loadModel("Player Apartement", "modPlayerApartement", {
            x: 0,
            y: 0,
            z: 0
        });
        this.room.flags.draw = true;
    }

    update(){
        
    }

    destroy() {

    }
}