export default class LevelDream01{
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
        });
        this.stairs = this.scene.geometryController.loadModel("modMetroPlatform01", "modMetroPlatform01", {
            x: 0,
            y: 0,
            z: 832
        });

        this.stairTrainTransition = this.scene.geometryController.loadModel("MetroStairCarriageTransition", "modMetroStairCarriageTransition", {
            x: 16,
            y: -48,
            z: 1024
        });

        this.trainMoving = [];
        for(let i = -1 ; i < 3 ; i++){
            this.trainMoving.push(this.scene.geometryController.loadModel("MetroCarriage", "modMetroCarriage", {
                x: -64,
                y: 0,
                z: i * 300
            }));
        }

        this.trainStationary = [];
        for(let i = 0 ; i < 3 ; i++){
            this.trainStationary.push(this.scene.geometryController.loadModel("MetroCarriage", "modMetroCarriage", {
                x: 16,
                y: -48,
                z: 1324 + (i * 300)
            }));
        }

    }

    update(){
        for(let t of this.trainMoving){
            t.translateAndRotate({x: 0, y: 0, z: 5}, {yaw: 0, pitch: 0, roll: 0});
        }
        if(this.trainMoving[0].pos.z === 0){
            for(let t of this.trainMoving){
                t.translateAndRotate({x: 0, y: 0, z: -300}, {yaw: 0, pitch: 0, roll: 0});
            }
        }
    }

    destroy() {

    }
}