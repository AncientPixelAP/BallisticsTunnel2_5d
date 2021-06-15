export default class Hand{
    constructor(_scene){
        this.scene = _scene;

        this.justPressed = false;
        this.pressed = false;
        this.justReleased = false;

        this.mouselock = false;
        this.mouseMoved = false;

        this.sensitivity = window.innerHeight / 512;

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
            y: 0,
            limit: Math.round(10 / this.sensitivity),
        }

        this.movementPrev = {
            x: 0,
            y: 0
        }

        this.prev = {
            x: 0,
            y: 0
        }

        //is set in game config, but maybe needs to be reset by a player in the options
        //this.scene.input.activePointer.smoothFactor = 0.2;
    }

    update(){
        this.pos.x = this.scene.input.activePointer.worldX;
        this.pos.y = this.scene.input.activePointer.worldY;

        if (this.scene.input.mouse.locked === true) {
            //if (this.scene.input.activePointer.moveTime+60 >= this.scene.data.systems.time.now) {
            if (this.scene.input.activePointer.movementX - this.movementPrev.x != 0 || this.scene.input.activePointer.movementY - this.movementPrev.y != 0){
                //this.vel.x = Math.max(-this.vel.limit, Math.min(this.vel.limit, this.scene.input.activePointer.movementX));
                //this.vel.y = Math.max(-this.vel.limit, Math.min(this.vel.limit, this.scene.input.activePointer.movementY));
                this.vel.x = Math.max(-8, Math.min(8, this.scene.input.activePointer.movementX));
                this.vel.y = Math.max(-8, Math.min(8, this.scene.input.activePointer.movementY));
            }else{
                if (gamepadsConnected > 0) {
                    this.vel.x = Math.abs(INPUTS.stickRight.horizontal) > 0.1 ? INPUTS.stickRight.horizontal * 4 : 0;
                    this.vel.y = Math.abs(INPUTS.stickRight.vertical) > 0.1 ? INPUTS.stickRight.vertical * 2 : 0;
                }
            }
        }

        if (this.scene.input.activePointer.isDown || INPUTS.btnA.pressed){
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

        if (this.pos.x - this.prev.x != 0 || this.pos.y - this.prev.y != 0){
            this.mouseMoved = true;
        }
    }

    lateUpdate(){
        this.vel.x = 0;
        this.vel.y = 0;
        this.prev.x = this.scene.input.activePointer.worldX;
        this.prev.y = this.scene.input.activePointer.worldY;
        this.movementPrev.x = this.scene.input.activePointer.movementX;
        this.movementPrev.y = this.scene.input.activePointer.movementY;
        this.mouseMoved = false;
    }

    reset(){
        this.pressed = false;
        this.justReleased = false;
        this.justPressed = false;
        this.mouseMoved = false;
    }

    setMouseLock(_bool){
        this.mouselock = _bool;
        if(this.mouselock === true){
            this.scene.input.mouse.requestPointerLock();
            this.reset();
        }else{
            if (this.scene.input.mouse.locked){
                this.scene.input.mouse.releasePointerLock();
                this.reset();
            }
        }
    }
}