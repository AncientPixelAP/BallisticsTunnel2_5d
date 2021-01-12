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
        /*if (h !== null) {
            _collChecker.hit.push({
                pt: h,
                quad: _quad
            });
        }else{

        }*/
        return h;
    }

    loadData(_data){
        
    }

    loadModel(_id, _modelDataJson, _pos){
        this.models.push(
            new Model(this.scene, this, _id, _modelDataJson, _pos)
        );
    }
}