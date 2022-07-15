export default class Track{
   constructor(_scene){
      this.scene = _scene;

      this.spawner = {
         pos: {
            x: 0,
            y: 0,
            z: 0
         },
         dir: {
            yaw: 0,
            pitch: 0,
            roll: 0
         }
      }

      this.points = [];

      this.points.push({
         pos: { x: this.spawner.pos.x, y: this.spawner.pos.y, z: this.spawner.pos.z },
         asset: "sprSegLabRoad00",
         frame: 0,//Math.floor(i * 1) % 5,
         dir: 0
      });
      this.points.push({
         pos: { x: this.spawner.pos.x, y: this.spawner.pos.y, z: this.spawner.pos.z + 1 },
         asset: "sprSegLabRoad00",
         frame: 0,//Math.floor(i * 1) % 5,
         dir: 0
      });
   }

   
}