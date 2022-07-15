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

      this.trackPointId = 0;
      this.trackPointDistance = 0;
      this.trackPointCurrent = null;
      this.trackPointNext = null;
   }

   update(){
      if (INPUTS.stickLeft.vertical < -0.3) {
         if (this.trackPointDistance = eud.distance([this.pos.x, this.pos.y, this.pos.z], [this.trackPointCurrent.pos.x, this.trackPointCurrent.pos.y, this.trackPointCurrent.pos.z]) > this.trackPointDistance){
            this.trackPointId += 1;
            if(this.trackPointId >= this.scene.track.points.length){
               this.trackPointId = 0;
            }
            this.trackPointCurrent = this.scene.track.points[this.trackPointId];
            if (this.trackPointId + 1 >= this.scene.track.points.length){
               this.trackPointNext = this.scene.track.points[0];
            }else{
               this.trackPointNext = this.scene.track.points[this.trackPointId + 1];
            }

            this.pos.x = this.trackPointCurrent.pos.x;
            this.pos.y = this.trackPointCurrent.pos.y;
            this.pos.z = this.trackPointCurrent.pos.z;

            this.trackPointDistance = eud.distance([this.trackPointCurrent.pos.x, this.trackPointCurrent.pos.y, this.trackPointCurrent.pos.z], [this.trackPointNext.pos.x, this.trackPointNext.pos.y, this.trackPointNext.pos.z]);
            this.dir.yaw = Phaser.Math.Angle.Between(this.pos.x, this.pos.z, this.trackPointNext.pos.x, this.trackPointNext.pos.z);
            //this.dir.yaw = normAngle(this.dir.yaw);
            this.dir.pitch = Phaser.Math.Angle.Between(this.pos.y, this.pos.z, this.trackPointNext.pos.y, this.trackPointNext.pos.z);
            //this.dir.pitch = normAngle(this.dir.pitch);
            if(this.dir.yaw < 0){
               this.dir.pitch += Math.PI;
               //this.dir.roll += Math.PI;
            }
            console.log(this.dir.yaw, this.dir.pitch);
         }

         //this.pos.x += (Math.cos(this.dir.yaw)) * 1;
         //this.pos.y += (Math.cos(this.dir.yaw) + Math.cos(this.dir.pitch) ) * 1;
         //this.pos.z += (Math.sin(this.dir.yaw) + Math.cos(this.dir.pitch) ) * 1;

         this.pos.x += (Math.cos(this.dir.yaw)) * 0.1;
         this.pos.z += (Math.sin(this.dir.yaw)) * 0.1;

         this.pos.y += (Math.cos(this.dir.pitch)) * 0.1;
         this.pos.z += (Math.cos(this.dir.pitch)) * 0.1;
      } else if (INPUTS.stickLeft.vertical > 0.3) {

      } else {

      }

      if (INPUTS.stickLeft.horizontal < -0.3) {
         //this.dir.roll -= 0.05;
         //this.scene.cam.dir.roll -= 0.05;
         //this.scene.cam.dir.yaw += 0.1;
      } else if (INPUTS.stickLeft.horizontal > 0.3) {
         //this.dir.roll += 0.05;
         //this.scene.cam.dir.roll += 0.05;
         //this.scene.cam.dir.yaw -= 0.1;
      } else {

      }

      if (INPUTS.stickRight.horizontal < -0.3) {

      } else if (INPUTS.stickRight.horizontal > 0.3) {

      } else {

      }

      if (INPUTS.stickRight.vertical < -0.3) {
         //this.scene.cam.dir.yaw = Math.sin(this.scene.cam.dir.roll) * 0.1;
         //this.scene.cam.dir.pitch = Math.cos(this.scene.cam.dir.roll) * -0.1;
         //this.radius -= 0.1;
      } else if (INPUTS.stickRight.vertical > 0.3) {
         //this.scene.cam.dir.yaw = Math.sin(this.scene.cam.dir.roll) * -0.1;
         //this.scene.cam.dir.pitch = Math.cos(this.scene.cam.dir.roll) * 0.1;
         //this.radius += 0.1;
      } else {
         //this.scene.cam.dir.yaw = 0;
         //this.scene.cam.dir.pitch = 0;
      }

      this.scene.cam.pos.x = this.pos.x;// + Math.sin(this.dir.roll) * this.radius;
      this.scene.cam.pos.y = this.pos.y;// + Math.cos(this.dir.roll) * this.radius;
      this.scene.cam.pos.z = this.pos.z;

      //this.scene.cam.dir.yaw = this.dir.yaw - (Math.PI * 0.5);
      //this.scene.cam.dir.pitch = (this.dir.pitch - (Math.PI * 0.5)) * -1;
      //this.scene.cam.dir.pitch = (this.dir.pitch - (Math.PI * 0.5));

      if (this.scene.cursors.up.isDown) {
         this.scene.cam.dir.pitch += this.scene.cam.dir.spd.pitch;
      }
      if (this.scene.cursors.down.isDown) {
         this.scene.cam.dir.pitch -= this.scene.cam.dir.spd.pitch;
      }
      if (this.scene.cursors.right.isDown) {
         this.scene.cam.dir.yaw -= this.scene.cam.dir.spd.yaw;
      }
      if (this.scene.cursors.left.isDown) {
         this.scene.cam.dir.yaw += this.scene.cam.dir.spd.yaw;
      }
   }

   jumpToTrackPoint(_trackPointId){
      this.trackPointId = _trackPointId;
      this.trackPointCurrent = this.scene.track.points[this.trackPointId];
      this.trackPointNext = this.scene.track.points[this.trackPointId + 1];

      this.pos.x = this.trackPointCurrent.pos.x;
      this.pos.y = this.trackPointCurrent.pos.y;
      this.pos.z = this.trackPointCurrent.pos.z;

      this.trackPointDistance = eud.distance([this.trackPointCurrent.pos.x, this.trackPointCurrent.pos.y, this.trackPointCurrent.pos.z], [this.trackPointNext.pos.x, this.trackPointNext.pos.y, this.trackPointNext.pos.z]);
      this.dir.yaw = Phaser.Math.Angle.Between(this.trackPointCurrent.pos.x, this.trackPointCurrent.pos.z, this.trackPointNext.pos.x, this.trackPointNext.pos.z);
      this.dir.pitch = Phaser.Math.Angle.Between(this.pos.y, this.pos.z, this.trackPointNext.pos.y, this.trackPointNext.pos.z);
   }
}