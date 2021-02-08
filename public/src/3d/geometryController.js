import PIP from "../additionalMath/pointInPolygon.js";
import Model from "./model.js";

export default class GeometryController{
    constructor(_scene) {
        this.scene = _scene;
        this.geometryData = null;
        this.geometry = [];
        this.models = [];
    }

    update(_collCheckArr){
        for (let m of this.models) {
            m.update();

            for (let q of m.collisionData){
                for(let c of _collCheckArr){
                    let hitData = this.collide(q, c);
                    if(hitData.pt !== null){
                        c.hit.push(hitData);
                        //c.hit = hitData;
                        //console.log(c);
                    }
                }
            }
        }
        return _collCheckArr;
    }

    draw(_from, _dir){
        for(let m of this.models){
            m.draw(_from, _dir);
        }
    }

    collide(_quad, _collChecker){
        /*
        {//check ground
            pos: {
                x: this.pos.x * -1,
                y: this.pos.y * -1,
                z: this.pos.z * -1
            },
            dir: {
                x: 0,
                y: 1,
                z: 0
            },
            hit: []
        }
        */
        let h = {
            pt: _quad.getIntersect(_collChecker.pos.x, _collChecker.pos.y, _collChecker.pos.z, _collChecker.dir.x, _collChecker.dir.y, _collChecker.dir.z),
            quad: _quad
        }
        return h;
    }

    getQuadsFromScreenspaceAt(_x, _y, _checkCollisionMask){
        let hits = [];
        for (let m of this.models) {
            if(_checkCollisionMask === false){
                for (let q of m.quadData) {
                    if(q.depth < 0){
                        if (pip.pointInPolygon(
                            [_x, _y], 
                            [
                                [q.screenCoords[0].x, q.screenCoords[0].y],
                                [q.screenCoords[1].x, q.screenCoords[1].y],
                                [q.screenCoords[2].x, q.screenCoords[2].y]
                            ]
                        )){
                            hits.push(q);
                        }else if(pip.pointInPolygon(
                            [_x, _y],
                            [
                                [q.screenCoords[0].x, q.screenCoords[0].y],
                                [q.screenCoords[2].x, q.screenCoords[2].y],
                                [q.screenCoords[3].x, q.screenCoords[3].y]
                            ]
                        )){
                            hits.push(q);
                        }
                    }
                }
            }else{
                for (let q of m.collisionData) {
                    if (q.depth < 0) {
                        if (pip.pointInPolygon(
                            [_x, _y],
                            [
                                [q.screenCoords[0].x, q.screenCoords[0].y],
                                [q.screenCoords[1].x, q.screenCoords[1].y],
                                [q.screenCoords[2].x, q.screenCoords[2].y]
                            ]
                        )) {
                            hits.push(q);
                        } else if (pip.pointInPolygon(
                            [_x, _y],
                            [
                                [q.screenCoords[0].x, q.screenCoords[0].y],
                                [q.screenCoords[2].x, q.screenCoords[2].y],
                                [q.screenCoords[3].x, q.screenCoords[3].y]
                            ]
                        )) {
                            hits.push(q);
                        }
                    }
                }
            }
        }
        return hits;
    }

    getModelById(_id){
        let arr = this.models.filter((m) => m.id === _id);
        if(arr !== null || arr.length > 0){
            return arr[0];
        }else{
            console.error("no model with id " + _id + " found");
            return null;
        }
    }

    logLevel() {
        //TODO make object and array of each model and its quads
        /*for (let m of this.models) {
            m.draw(_from, _dir);
        }*/
    }

    loadData(_data){
        
    }

    loadModel(_id, _modelDataJson, _pos){
        this.models.push(
            new Model(this.scene, this, _id, _modelDataJson, _pos)
        );
        return this.models[this.models.length-1];
    }
}