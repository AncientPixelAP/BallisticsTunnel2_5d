export default class ConversationOption{
    constructor(_scene, _pos, _text, _func){
        this.scene = _scene;
        this.pos = _pos;
        this.func = _func;
        this.toggleOffFunc = () => {};

        this.colors = {
            out: 0xfff1e8,
            over: 0x29adff,
            on: 0x00e436
        }

        this.states = {
            out: 0,
            over: 1,
            on: 2
        }
        this.state = this.states.out;
        this.active = false;
        
        this.txt = this.scene.add.bitmapText(_pos.x, _pos.y, "pixelmix", _text, 8, 1).setOrigin(0.5);

        this.colorInState(this.state);

        let tb = this.txt.getTextBounds();
        //console.log(tb);
        this.rect = new Phaser.GameObjects.Rectangle(this.scene, tb.local.x, tb.local.y + this.txt.y, tb.local.width, tb.local.height);
    }

    update(){
        
        if(this.rect.getBounds().contains(this.scene.input.activePointer.worldX, this.scene.input.activePointer.worldY)){
            if(this.scene.hand.pressed === false){
                if(this.active === false){
                    this.switchState(this.states.over);
                }else{
                    this.switchState(this.states.out);
                }
            }
            if(this.scene.hand.justPressed === true){
                if(this.active === true){
                    this.switchState(this.states.over);
                }else{
                    this.switchState(this.states.on);
                }
            }
            if(this.scene.hand.justReleased === true){
                this.func();
            }
        }else{
            if(this.active === false){
                this.switchState(this.states.out);
            }else{
                this.switchState(this.states.on);
            }
        }
    }

    simulateClick(){
        this.func();
    }

    switchState(_state){
        if (this.state !== _state) {
            this.state = _state;
            this.colorInState(this.state);
        }
    }

    colorInState(_state){
        switch(this.state){
            case this.states.out:
                this.txt.setTintFill(this.colors.out);
            break;
            case this.states.over:
                this.txt.setTintFill(this.colors.over);
            break;
            case this.states.on:
                this.txt.setTintFill(this.colors.out);
            break;
            default:
            break;
        }
    }

    move(_x, _y){
        this.txt.x = _x;
        this.txt.y = _y;
    }

    destroy(){
        this.txt.destroy();
    }

    setDepth(_depth){
        this.txt.depth = _depth;
    }
}