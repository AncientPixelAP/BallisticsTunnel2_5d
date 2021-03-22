export default class LevelModelbuilder{
    constructor(_scene){
        this.scene = _scene;

        this.objects = [];
        /*this.objects.push(this.scene.geometryController.loadModel("ElevatorBase", "modElevatorBase", {
            x: 0,
            y: 0,
            z: 0
        }));*/

        this.ref = this.scene.geometryController.loadModel("MetroCarriage", "modMetroCarriage", {
            x: 0,
            y: 0,
            z: 0
        });
        this.end = this.scene.geometryController.loadModel("MetroCarriageEnd", "modMetroCarriageEnd", {
            x: 0,
            y: 0,
            z: 300
        });
        
    }

    update(){
        
    }

    destroy() {

    }
}