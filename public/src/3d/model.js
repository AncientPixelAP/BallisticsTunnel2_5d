import DataQuad from "./dataQuad.js";

export default class Model{
    constructor(_scene, _geometryController, _id, _modelDataJson, _pos){
        this.scene = _scene;
        this.geometryController = _geometryController;
        this.id = _id;
        this.modelData = this.scene.cache.json.get(_modelDataJson);
        this.pos = _pos;

        this.quadData = [];
        for (let [i, q] of this.modelData.quadData.entries()) {
            this.addQuadFromData(q);
        }

        this.collisionData = [];
        for (let [i, q] of this.modelData.collisionData.entries()) {
            let pos = {
                x: q.position.x - this.pos.x,
                y: q.position.y - this.pos.y,
                z: q.position.z - this.pos.z
            }
            this.collisionData.push(
                new DataQuad(this.scene, this.id, i, q.type, pos, q.points, "none", 0)
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

    translate(_x, _y, _z){

    }

    rotate(_x, _y, _z){
        
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
        if(_q.type !== "collisionQuad"){
            let no = this.quadData.length;
            this.quadData.push(
                new DataQuad(this.scene, this.id, no, _q.type, pos, _q.points, _q.texture, _q.frame)
            );
        }else{
            let no = this.collisionData.length;
            this.collisionData.push(
                new DataQuad(this.scene, this.id, no, _q.type, pos, _q.points, "none", 0)
            );
        }
    }

    deleteQuad(_q, _isCollisionQuad){
        if(_isCollisionQuad === true){
            for(let i = this.collisionData.length-1 ; i >= 0 ; i--){
                if (this.collisionData[i].runNo === _q.runNo){
                    this.collisionData[i].destroy();
                    this.collisionData.splice(i, 1);
                }
            }
            //this.collisionData[_q.runNo].destroy();
            //this.collisionData.splice(_q.runNo, 1);
        }else{
            for (let i = this.quadData.length - 1; i >= 0; i--) {
                if (this.quadData[i].runNo === _q.runNo) {
                    this.quadData[i].destroy();
                    this.quadData.splice(i, 1);
                }
            }
            //this.quadData[_q.runNo].destroy();
            //this.quadData.splice(_q.runNo, 1);
        }
    }

    toggleDrawCollisions(){
        this.debug.drawCollisions = !this.debug.drawCollisions;
        if (this.debug.drawCollisions === false) {
            this.debug.collisionGraphics.clear();
        }
    }

    log(){
        let logobj = {
            name: this.modelData.name,
            quadData: [],
            collisionData: []
        }
        //add quad Data from model
        for(let q of this.quadData){
            let pts = [];
            for(let p of q.points){
                pts.push({
                    x: p.x,// + this.pos.x,
                    y: p.y,// + this.pos.y,
                    z: p.z,// + this.pos.z
                });
            }
            logobj.quadData.push({
                type: q.type,
                texture: q.texture,
                frame: q.frame,
                position: {
                    x: q.pos.x + this.pos.x,
                    y: q.pos.y + this.pos.y,
                    z: q.pos.z + this.pos.z,
                },
                points: pts
            });
        }
        //add collision Data from model
        for (let q of this.collisionData) {
            let pts = [];
            for (let p of q.points) {
                pts.push({
                    x: p.x,// + this.pos.x,
                    y: p.y,// + this.pos.y,
                    z: p.z,// + this.pos.z
                });
            }
            logobj.collisionData.push({
                type: "collisionQuad",
                position: {
                    x: q.pos.x + this.pos.x,
                    y: q.pos.y + this.pos.y,
                    z: q.pos.z + this.pos.z,
                },
                points: pts
            });
        }
        //log model for saving
        console.log(JSON.stringify(logobj));
    }
}