export default class Cam{
    constructor(_scene){
        this.scene = _scene;
        this.pos = {
            x: 0,
            y: -24,
            z: 0
        }
        this.dir = {
            yaw: 0,
            pitch: 0,
            roll: 0
        }
        this.eyeHeight = 24;
    }

    update(){

    }
}