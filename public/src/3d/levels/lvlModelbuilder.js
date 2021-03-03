export default class LevelModelbuilder{
    constructor(_scene){
        this.scene = _scene;

        this.objects = [];
        /*this.objects.push(this.scene.geometryController.loadModel("ElevatorBase", "modElevatorBase", {
            x: 0,
            y: 0,
            z: 0
        }));*/
        this.model = this.scene.geometryController.loadModel("MetroPlatform", "modMetroPlatform", {
            x: 0,
            y: 0,
            z: 0
        });
        this.model1 = this.scene.geometryController.loadModel("MetroPlatform", "modMetroPlatform", {
            x: 0,
            y: 0,
            z: 416
        })

        this.train = this.scene.geometryController.loadModel("MetroCarriage", "modMetroCarriage", {
            x: -64,
            y: 0,
            z: 0
        });
        this.train2 = this.scene.geometryController.loadModel("MetroCarriage", "modMetroCarriage", {
            x: -64,
            y: 0,
            z: 300
        });
        this.train3 = this.scene.geometryController.loadModel("MetroCarriage", "modMetroCarriage", {
            x: -64,
            y: 0,
            z: 600
        });
    }

    update(){
        
    }

    destroy() {

    }
}