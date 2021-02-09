export default class LevelDream00{
    constructor(_scene){
        this.scene = _scene;

        this.objects = [];
        this.objects.push(this.scene.geometryController.loadModel("DreamBloodLine", "modDreamBloodLine", {
            x: 0,
            y: 0,
            z: 0
        }));
    }
}