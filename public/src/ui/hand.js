export default class Hand{
    constructor(_scene){
        this.scene = _scene;

        this.justPressed = false;
        this.pressed = false;
        this.justReleased = false;

        this.mouselock = false;

        this.pos = {
            x: 0,
            y: 0
        }

        this.start = {
            x: 0,
            y: 0
        }

        this.vel = {
            x: 0,
            y: 0
        }

        this.scene.input.on('pointermove', function (_pointer) {
            if (this.scene.input.mouse.locked === true){
                this.vel.x = Math.max(-10, Math.min(10, _pointer.movementX));
                this.vel.y = Math.max(-10, Math.min(10, _pointer.movementY));
                this.vel.x = Math.round(this.vel.x);
                this.vel.y = Math.round(this.vel.y);
                //this.vel.x = Math.floor(_pointer.movementX);
                //this.vel.y = Math.floor(_pointer.movementY);
                //console.log(this.vel.x);
            }
        }, this);
    }

    update(){
        this.pos.x = this.scene.input.activePointer.worldX;
        this.pos.y = this.scene.input.activePointer.worldY;

        //this.mouselock = this.scene.input.mouse.locked;
        /*if (this.scene.input.mouse.locked === false) {
            if(this.mouselock === true){
                this.mouselock = false;
                this.scene.input.mouse.releasePointerLock();
            }
        }*/

        if(this.scene.input.activePointer.isDown){
            if(this.pressed === false){
                this.justPressed = true;
                this.pressed = true;
                this.justReleased = false;

                this.start.x = this.pos.x;
                this.start.y = this.pos.y;
            }else{
                this.justPressed = false;
            }
        }else{
            if(this.pressed === true){
                this.pressed = false;
                this.justReleased = true;
                this.justPressed = false;

                this.start.x = this.pos.x;
                this.start.y = this.pos.y;
            }else{
                this.justReleased = false;
            }
        }
    }

    lateUpdate(){
        this.vel.x = 0;
        this.vel.y = 0;
    }

    setMouseLock(_bool){
        this.mouselock = _bool;
        if(this.mouselock === true){
            this.scene.input.mouse.requestPointerLock();
        }else{
            if (this.scene.input.mouse.locked){
                this.scene.input.mouse.releasePointerLock();
            }
        }
        //console.log("mouselock: " + this.mouselock );
    }
}