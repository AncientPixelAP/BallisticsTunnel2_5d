export default class LevelModelbuilder{
    constructor(_scene){
        this.scene = _scene;

        this.ref = this.scene.geometryController.loadModel("PowerGenerator", "modPowerGeneratorTurbine", {
            x: 0,
            y: 0,
            z: 0
        });
        
    }

    update(){
        
    }

    destroy() {

    }
}