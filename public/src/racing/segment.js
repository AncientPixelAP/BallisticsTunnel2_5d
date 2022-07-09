export default class Segment {
   constructor(_scene, _pos, _dir, _asset, _frame) {
      this.scene = _scene;
      this.pos = _pos;
      this.screenCoords = {
         x: 0,
         y: 0
      }
      this.dir = _dir;
      this.asset = _asset;
      this.frame = _frame;
      this.toKill = false;
      this.depth = 0;
      this.shade = 0;
      this.scale = {
         x: 1,
         y: 1,
      }
      this.zDepth = 0;
      this.cull = false;

      this.sprite = this.scene.add.sprite(this.pos.x, this.pos.y, this.asset, this.frame);
   }

   update(){
      
   }

   draw(){
      if(this.cull === false){
         this.sprite.alpha = 1;
         this.sprite.x = this.screenCoords.x;
         this.sprite.y = this.screenCoords.y;
         this.sprite.setScale(this.scale.x, this.scale.y);
         this.sprite.depth = this.zDepth;
         this.sprite.rotation = this.dir + (this.scene.cam.dir.roll * 1);
      }else{
         this.sprite.alpha = 0;
      }
      
   }

   calculate3d(_from, _dir, _mipmap = true){
      let pts = {
         x: this.pos.x - _from.x,
         y: this.pos.y - _from.y,
         z: this.pos.z - _from.z
      }

      let nx = pts.x;
      let ny = pts.y;
      let nz = pts.z;
      let outXZ = rti.rotateY([0, 0, 0], [nx, ny, nz], [0, 0, 0], _dir.yaw);
      nx = outXZ[0];
      ny = outXZ[1];
      nz = outXZ[2];
      let outYZ = rti.rotateX([0, 0, 0], [nx, ny, nz], [0, 0, 0], _dir.pitch);
      nx = outYZ[0];
      ny = outYZ[1];
      nz = outYZ[2];
      let outXY = rti.rotateZ([0, 0, 0], [nx, ny, nz], [0, 0, 0], _dir.roll);
      nx = outXY[0];
      ny = outXY[1];
      nz = outXY[2];

      nz *= this.scene.cam.fov;

      let nzMod = nz + this.scene.cam.zOffset;
      let zoom = this.scene.cam.zoom;
      this.screenCoords.x = (nx / (Math.abs(Math.max(0.1, nzMod)) * 1)) * zoom;
      this.screenCoords.y = (ny / (Math.abs(Math.max(0.1, nzMod)) * 1)) * zoom;

      //this.zDepth = (1 / Math.abs(nzMod)) * zoom;
      this.zDepth = nzMod * -1;
      if(nzMod < 1){
         this.cull = true;
      }else{
         this.cull = false;
      }

      this.scale.x = 64 / nzMod;
      this.scale.y = 64 / nzMod;
      this.shade = Math.max(0, 255 - ((nzMod + 0) * 0.125));
   }

   setTexture(_tex, _frame = 0) {
      this.texture = _tex;
      this.frame = _frame;
      this.sprite.setTexture(this.texture, this.frame);
   }

   destroy() {
      this.toKill = true;
      this.sprite.destroy();
   }
}