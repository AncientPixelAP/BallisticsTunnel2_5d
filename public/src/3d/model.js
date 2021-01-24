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
            this.addQuadFromData(q);
        }

        this.collisionData = [];
        for (let q of this.modelData.collisionData) {
            let pos = {
                x: q.position.x - this.pos.x,
                y: q.position.y - this.pos.y,
                z: q.position.z - this.pos.z
            }
            this.collisionData.push(
                new DataQuad(this.scene, this.id, q.type, pos, q.points, "none", 0)
            );
        }

        this.debug = {
            drawCollisions: false,
            collisionGraphics: this.scene.add.graphics()
        }
        this.debug.collisionGraphics.depth = 10000;
    }

    update(){

    }

    draw(_from, _dir){
        for (let q of this.quadData){
            q.calculate3d(_from, _dir);
            q.draw();
        }
        if(this.debug.drawCollisions === true){
            this.debug.collisionGraphics.clear();
            this.debug.collisionGraphics.lineStyle(1, 0x00e436);
            for(let q of this.collisionData){
                q.calculate3d(_from, _dir);
                this.debug.collisionGraphics.beginPath();
                
                this.debug.collisionGraphics.moveTo(q.screenCoords[0].x, q.screenCoords[0].y);
                this.debug.collisionGraphics.lineTo(q.screenCoords[1].x, q.screenCoords[1].y);
                this.debug.collisionGraphics.moveTo(q.screenCoords[1].x, q.screenCoords[1].y);
                this.debug.collisionGraphics.lineTo(q.screenCoords[2].x, q.screenCoords[2].y);
                this.debug.collisionGraphics.moveTo(q.screenCoords[2].x, q.screenCoords[2].y);
                this.debug.collisionGraphics.lineTo(q.screenCoords[0].x, q.screenCoords[0].y);
                this.debug.collisionGraphics.moveTo(q.screenCoords[0].x, q.screenCoords[0].y);
                this.debug.collisionGraphics.lineTo(q.screenCoords[3].x, q.screenCoords[3].y);
                this.debug.collisionGraphics.moveTo(q.screenCoords[3].x, q.screenCoords[3].y);
                this.debug.collisionGraphics.lineTo(q.screenCoords[2].x, q.screenCoords[2].y);

                //this.debug.collisionGraphics.closePath();
                this.debug.collisionGraphics.strokePath();
            }
        }
    }

    addQuadFromData(_q){
        let pos = {
            x: _q.position.x - this.pos.x,
            y: _q.position.y - this.pos.y,
            z: _q.position.z - this.pos.z
        }
        this.quadData.push(
            new DataQuad(this.scene, this.id, _q.type, pos, _q.points, _q.texture, _q.frame)
        );
    }

    toggleDrawCollisions(){
        this.debug.drawCollisions = !this.debug.drawCollisions;
        if (this.debug.drawCollisions === false) {
            this.debug.collisionGraphics.clear();
        }
    }

    log(){
        console.log(this);
    }
}