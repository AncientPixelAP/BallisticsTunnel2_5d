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
    }

    update(){
        
    }

    destroy() {

    }
}