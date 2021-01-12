export default class DataQuad{
    constructor(_scene, _pos, _points, _texture, _frame){
        this.scene = _scene;
        this.pos = _pos;
        this.points = _points; //array of 4 xyz coords
        this.texture = _texture;
        this.quad = null; // to be filled by a phaser quad if it should be rendered
        this.frame = _frame;
        this.depth = 0;

        this.screenCoords = [
            { x: 0, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: 0 }
        ];
    }

    update(){

    }

    draw(){
        if(this.quad === null){
            this.quad = this.scene.add.quad(0, 0, this.texture);
        }else{
            this.quad.setTopLeft(this.screenCoords[0].x, this.screenCoords[0].y);
            this.quad.setTopRight(this.screenCoords[1].x, this.screenCoords[1].y);
            this.quad.setBottomRight(this.screenCoords[2].x, this.screenCoords[2].y);
            this.quad.setBottomLeft(this.screenCoords[3].x, this.screenCoords[3].y);
            this.quad.depth = this.depth;
        }
    }

    calculate3d(_from, _dir) {
        let yaw = {
            cos: Math.cos(_dir.yaw),
            sin: Math.sin(_dir.yaw)
        }
        let pitch = {
            cos: Math.cos(_dir.pitch),
            sin: Math.sin(_dir.pitch)
        }

        let recZ = 9999;
        for(let [i, p] of this.points.entries()){
            let pts = {
                x: p.x + this.pos.x - _from.x,
                y: p.y + this.pos.y - _from.y,
                z: p.z + this.pos.z - _from.z
            }

            let outXZ = rti.rotateY([0, 0, 0], [pts.x, pts.y, pts.z], [0, 0, 0], _dir.yaw);
            let nx = outXZ[0];
            let ny = outXZ[1];
            let nz = outXZ[2];
            let outYZ = rti.rotateX([0, 0, 0], [nx, ny, nz], [0, 0, 0], _dir.pitch);
            nx = outYZ[0];
            ny = outYZ[1];
            nz = outYZ[2];

            let dz = (16 / Math.max(0.0001, nz)) * 16;
            this.screenCoords[i].x = nx * dz;
            this.screenCoords[i].y = ny * dz;

            if (dz < recZ){
                recZ = dz;
            }
        }
        this.depth = recZ;
    }

    getIntersect(_x, _y, _z, _toX, _toY, _toZ) {
        // probe first tri of quad
        let tri = [
            [this.points[0].x + this.pos.x, this.points[0].y + this.pos.y, this.points[0].z + this.pos.z], 
            [this.points[1].x + this.pos.x, this.points[1].y + this.pos.y, this.points[1].z + this.pos.z], 
            [this.points[2].x + this.pos.x, this.points[2].y + this.pos.y, this.points[2].z + this.pos.z],
        ];
        let pt = [_x, _y, _z];
        let dir = [_toX, _toY, _toZ];
        let odir = [_toX * -1, _toY * -1, _toZ * -1];
        let hit = rti.intersect([], pt, dir, tri);
        let ohit = rti.intersect([], pt, odir, tri);
        if (hit === null && ohit === null) {
            // probe 2nd tri part of quad
            tri = [
                [this.points[0].x + this.pos.x, this.points[0].y + this.pos.y, this.points[0].z + this.pos.z],
                [this.points[2].x + this.pos.x, this.points[2].y + this.pos.y, this.points[2].z + this.pos.z],
                [this.points[3].x + this.pos.x, this.points[3].y + this.pos.y, this.points[3].z + this.pos.z],
            ];
            hit = rti.intersect([], pt, dir, tri);
            ohit = rti.intersect([], pt, odir, tri);
        }
        if (hit !== null) {
            return hit;
        }
        if (ohit !== null) {
            return ohit;
        }
        return null;
    }
}