import ElevatorGroup from "../modelGroups/elevator.js";

export default class LevelQuarters00{
    constructor(_scene){
        this.scene = _scene;

        this.elevator = new ElevatorGroup(this.scene, this, {x: 0, y: 0, z: 0});
        this.elevator.setDraw(true);
    }

    update(){
        
    }

    destroy() {

    }
}