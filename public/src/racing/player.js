export default class Player{
   constructor(_scene, _pos, _config = null){
      this.scene = _scene;
      this.pos = _pos;
      this.dir = {
         yaw: 0,
         pitch: 0,
         roll: 0
      }
      this.radius = 2;

      this.spd = 1;
      this.spdMax = 1;
      this.spdAcc = 0.1;
      this.isSlipstreaming = false;

      this.segmentId = 0;
      this.segmentDistance = 0;
      this.segmentCurrent = null;
      this.segmentNext = null;
   }

   update(){

   }
}