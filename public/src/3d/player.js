export class Player3d{
    constructor(_scene) {
        this.scene = _scene;
        this.pos = {
            x: 0,
            y: 0,
            z: 0
        }
        this.dir = {
            yaw: 0,
            pitch: 0,
            roll: 0,
            spd: {
                yaw: 0.04,
                pitch: 0.04,
                roll: 0.04
            }
        }
        this.eyeHeight = 24;
        this.stepHeight = 9;
        this.collisionRadius = 12;

        this.modes = {
            LOOK: 0,
            INTERACT: 1
        }
        this.mode = this.modes.LOOK;
    }
}