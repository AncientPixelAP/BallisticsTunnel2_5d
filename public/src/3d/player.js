export class Player3d{
    constructor(_scene) {
        this.scene = _scene;
        this.pos = {
            x: 0,
            y: 0,
            z: 0,
            to: {
                jump: false,
                x: 0,
                y: 0,
                z: 0,
            }
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

    update(){
        if(this.pos.to.jump === true){
            this.pos.x = this.pos.to.x;
            this.pos.y = this.pos.to.y;
            this.pos.z = this.pos.to.z;
            this.pos.to.jump = false;
        }
    }

    jumpToPosition(_pos){
        //use this to set a neew position even if the collision checks have moved the position around differently
        //eg if a collision in x resolves in a trigger jumping the player, but collision resolve in z afterwards would reset that
        this.pos.to.jump = true;
        this.pos.to.x = _pos.x;
        this.pos.to.y = _pos.y;
        this.pos.to.z = _pos.z;
    }
}