import DataQuad from "./dataQuad.js";

export default class Model{
    constructor(_scene, _geometryController, _id, _modelDataJson, _pos){
        this.scene = _scene;
        this.geometryController = _geometryController;
        this.id = _id;
        this.modelData = this.scene.cache.json.get(_modelDataJson);
        this.pos = _pos;

        this.quadData = [];
        for (let q of this.modelData.quadData) {
            let pos = {
                x: q.position.x - this.pos.x,
                y: q.position.y - this.pos.y,
                z: q.position.z - this.pos.z
            }
            this.quadData.push(
                new DataQuad(this.scene, pos, q.points, q.texture, q.frame)
            );
        }

        this.collisionData = [];
        for (let q of this.modelData.collisionData) {
            let pos = {
                x: q.position.x - this.pos.x,
                y: q.position.y - this.pos.y,
                z: q.position.z - this.pos.z
            }
            this.collisionData.push(
                new DataQuad(this.scene, pos, q.points, "none", 0)
            );
        }
    }

    update(){

    }

    draw(_from, _dir){
        for (let q of this.quadData){
            q.calculate3d(_from, _dir);
            q.draw();
        }
    }
}