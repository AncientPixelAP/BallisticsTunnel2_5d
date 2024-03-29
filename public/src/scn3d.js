import Hand from "./ui/hand.js";
import Button from "./ui/button.js";
import Cam from "./3d/cam.js";
import GeometryController from "./3d/geometryController.js";
import Editor from "./3d/editor.js";
import { Player3d } from "./3d/player.js";
import LevelHangar00 from "./3d/levels/lvlHangar00.js"
import LevelDream00 from "./3d/levels/lvlDream00.js"
import LevelDream01 from "./3d/levels/lvlDream01.js";
import LevelMarketsquare00 from "./3d/levels/lvlMarketsquare00.js"
//import LevelPlayerApartement00 from "./3d/levels/lvlPlayerApartement00.js"
import LevelQuarters00 from "./3d/levels/lvlQuarters00.js"
import LevelQuarters01 from "./3d/levels/lvlQuarters01.js";
import LevelModelbuilder from "./3d/levels/lvlModelbuilder.js";
import LevelOffice00 from "./3d/levels/lvlOffice00.js";

export default class Scn3d extends Phaser.Scene {

    constructor() {
        super("Scn3d");
        this.initData = null;
    }

    init(_initData){
        this.initData = _initData;
    }

    create() {
        console.log(this);
        this.cameras.main.setScroll(-this.game.config.width * 0.5, -this.game.config.height * 0.5);
        this.cameras.main.setBackgroundColor(0x000000);

        this.cameras.main.fadeFrom(500, 0, 0, 0, false, (_cam, _pct) => {

        }, this);

        this.left = this.game.config.width * -0.5;
        this.right = this.game.config.width * 0.5;
        this.top = this.game.config.height * -0.5;
        this.bottom = this.game.config.height * 0.5;

        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = {
            e: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
            q: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
            w: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            a: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            s: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            d: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            g: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G),
            n: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N),
            m: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M),
            t: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T),
            c: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C),
            v: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V),
            z: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
            space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
            ctrl: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL),
            shift: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT),
            alt: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ALT),
            end: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.END),
            del: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DELETE),
            one: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE),
            two: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO),
            three: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE),
            four: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR),
            five: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE),
            six: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX),
            seven: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEVEN),
            eight: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.EIGHT),
            nine: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NINE),
            zero: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO),
            tab: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB),
            enter: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER),
            escape: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESCAPE),
            backspace: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE),
        }
        this.numkeys = {
            plus: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ADD),
            minus: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_SUBTRACT),
            one: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE),
            two: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO),
            three: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_THREE),
            four: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FOUR),
            five: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FIVE),
            six: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_SIX),
            seven: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_SEVEN),
            eight: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_EIGHT),
            nine: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_NINE),
            zero: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO)
        }

        this.hand = new Hand(this);
        //this.hand.setMouseLock(true);

        this.player = new Player3d(this);

        /*
        this.btnBack = new Button(this, { x: -160, y: - 66 }, "sprBtn00", "BACK", false, () => {
            this.cameras.main.fade(500, 0, 0, 0, false, (_cam, _pct) => {
                if (_pct >= 1) {
                    this.gotoMenu();
                }
            }, this);
        });
        */

        this.editor = new Editor(this);
        //this.editor.toggleEditor();

        this.cam = new Cam(this);
        this.geometryController = new GeometryController(this);

        //add debug grid
        /*
        this.geometryController.loadModel("DebugTile", "modDebugTile", {
            x: 0,
            y: 8,
            z: 0
        });
        this.geometryController.loadModel("DebugWallTest", "modDebugWallTest", {
           x: 0,
           y: 0,
           z: -96
        });
        */

        this.level = null;
        this.loadLevel(this.initData.scene);//modelBuilder dream01 marketsquare00
        this.player.jumpToPosition(this.initData.pos);

        this.modelName = "";
        this.debugTxt = this.add.bitmapText((this.game.config.width * -0.5) + 16, (this.game.config.height * -0.5) + 16, "bravenewEra_16", "", 16, 1).setOrigin(0).setLetterSpacing(1);
        this.debugTxt.alpha = 0;
    }

    update(){
        this.fillInputs();
        this.hand.update();
        /*
        this.btnBack.update();
        */

        if(this.editor.enabled === true){
            this.editorControls();
            this.editor.update();
        }else{

            if(this.player.mode === PLAYERMODE.LOOK){

                this.gameControls();

                //look for models to interact with at center of screen if player click the mouse
                let hits = [];
                //hits = this.geometryController.getQuadsFromScreenspaceAt(this.input.activePointer.worldX, this.input.activePointer.worldY, false);
                hits = this.geometryController.getQuadsFromScreenspaceAt(0, 0, false);
                if (hits.length > 0) {
                    hits = hits.sort((a, b) => a.depth - b.depth);
                    this.modelName = hits[hits.length - 1].modelId;
                    
                    this.debugTxt.setText(this.modelName);

                    this.player.setHintText("");
                    this.player.clearUseBox();

                    let model = this.geometryController.getModelById(this.modelName = hits[hits.length - 1].modelId);
                    if (model.interactable === true){
                        if (eud.distance([this.player.pos.x, this.player.pos.y, this.player.pos.z], [model.pos.x, model.pos.y, model.pos.z]) < 48) {
                            this.player.setHintText("click to use/talk");
                            this.player.setUseBox(model.getScreenBounds());
                        }

                        if (this.hand.justReleased || INPUTS.btnA.justReleased) {
                            //let model = this.geometryController.getModelById(this.modelName = hits[hits.length - 1].modelId);
                            model.interact();
                            this.player.setHintText("");
                            this.player.clearUseBox();
                        }
                    }
                }else{
                    this.debugTxt.setText("");
                    this.player.clearUseBox();
                }

                if (this.hand.justReleased) {
                    if(this.input.mouse.locked === false){
                        this.hand.setMouseLock(true);
                    }
                    //log the playre  position as a helper for manual object positioning in level files
                    if(this.keys.q.isDown){
                        console.log({playerPos: this.player.pos, playerDir: this.player.dir});
                    }
                }
            }

        }

        this.cam.setPositionAndRotation({ x: this.player.pos.x, y: this.player.pos.y - this.player.eyeHeight, z: this.player.pos.z}, this.player.dir);

        this.player.update();
        this.level.update();

        this.geometryController.draw(this.cam.pos, this.cam.dir);

        this.hand.lateUpdate();
    }

    editorControls(){
        if(this.hand.justReleased){
            let hits = [];
            hits = this.geometryController.getQuadsFromScreenspaceAt(this.input.activePointer.worldX, this.input.activePointer.worldY, this.editor.editCollisions);
            if(hits.length > 0){
                hits = hits.sort((a, b) => a.depth - b.depth);
                this.editor.quad = hits[hits.length-1];

                this.editor.model = this.geometryController.getModelById(this.editor.quad.modelId);
                //console.log(this.editor.model);
            }
        }

        //camera controls
        this.keyboardLook();

        if (this.keys.a.isDown) {
            this.player.pos.z -= Math.cos(this.player.dir.yaw - HALFPI) * 2;//all move was spd 1
            this.player.pos.x += Math.sin(this.player.dir.yaw - HALFPI) * 2;
        }
        if (this.keys.d.isDown) {
            this.player.pos.z -= Math.cos(this.player.dir.yaw + HALFPI) * 2;
            this.player.pos.x += Math.sin(this.player.dir.yaw + HALFPI) * 2;
        }
        if (this.keys.s.isDown) {
            this.player.pos.z -= Math.cos(this.player.dir.yaw) * 3;
            this.player.pos.x += Math.sin(this.player.dir.yaw) * 3;
        }
        if (this.keys.w.isDown) {
            this.player.pos.z += Math.cos(this.player.dir.yaw) * 3;
            this.player.pos.x -= Math.sin(this.player.dir.yaw) * 3;
        }

        if (this.keys.space.isDown) {
            this.player.pos.y -= 1;
        }
        if (this.keys.c.isDown) {
            this.player.pos.y += 1;
        }
    }

    gameControls(){
        let isMoving = false;
        
        this.keyboardLook();
        if(this.player.mode === PLAYERMODE.LOOK){
            if(this.hand.mouselock === false){
                this.hand.setMouseLock(true);
            }
            this.mouseLook();
        }

        this.player.dir.pitch = Math.max(-HALFPI, Math.min(HALFPI ,this.player.dir.pitch));

        let toPos = {
            x: this.player.pos.x,
            y: this.player.pos.y,
            z: this.player.pos.z
        }

        if (Math.abs(INPUTS.stickLeft.horizontal) > 0.1) {
            toPos.z -= (Math.cos(this.player.dir.yaw + HALFPI) * INPUTS.stickLeft.horizontal) * this.player.spd.normal;
            toPos.x += (Math.sin(this.player.dir.yaw + HALFPI) * INPUTS.stickLeft.horizontal) * this.player.spd.normal;
            isMoving = true;
        }
        if (Math.abs(INPUTS.stickLeft.vertical) > 0.1) {
            //toPos.z -= (Math.cos(this.player.dir.yaw) * INPUTS.stickLeft.vertical) * (INPUTS.btnTriggerLeft.pressed ? this.player.spd.sprint : this.player.spd.normal);
            //toPos.x += (Math.sin(this.player.dir.yaw) * INPUTS.stickLeft.vertical) * (INPUTS.btnTriggerLeft.pressed ? this.player.spd.sprint : this.player.spd.normal);
            toPos.z -= (Math.cos(this.player.dir.yaw) * INPUTS.stickLeft.vertical) * this.player.spd.normal;
            toPos.x += (Math.sin(this.player.dir.yaw) * INPUTS.stickLeft.vertical) * this.player.spd.normal;
            isMoving = true;
        }

        //JUMP
        if (INPUTS.btnShoulderRight.pressed) {
            /*if (this.player.vel.y === 0) {
                this.player.vel.y = -2;
                this.player.pos.y += this.player.vel.y;
            }*/
        }
        if (INPUTS.btnShoulderLeft.pressed) {
            //this.player.pos.y += 1;
        }

        let returnColl = [];
        returnColl = this.geometryController.update(
            [
                {//check ground at player position
                    pos: {
                        x: this.player.pos.x,
                        y: this.player.pos.y + this.player.eyeHeight,
                        z: this.player.pos.z
                    },
                    dir: {
                        x: 0,
                        y: 1,
                        z: 0
                    },
                    hit: []
                }, {//check wall colllision global x axis
                    pos: {
                        x: toPos.x,
                        y: toPos.y - this.player.stepHeight,
                        z: toPos.z
                    },
                    dir: {
                        x: 1,
                        y: 0,
                        z: 0
                    },
                    hit: []
                }, {//check wall colllision global z axis
                    pos: {
                        x: toPos.x,
                        y: toPos.y - this.player.stepHeight,
                        z: toPos.z
                    },
                    dir: {
                        x: 0,
                        y: 0,
                        z: 1
                    },
                    hit: []
                }
            ]
        );
        /*if(this.input.activePointer.isDown){
            console.log(returnColl);
        }*/

        //resolve collision with ground
        if (returnColl[0].hit.length > 0) {
            //filter relevant = nearest hit
            let dist = 9999;
            let nearestHit = returnColl[0].hit[0];
            for (let [i, n] of returnColl[0].hit.entries()) {
                let d = Phaser.Math.Distance.Between(0, this.player.pos.y - this.player.stepHeight, 0, returnColl[0].hit[i].pt[1]);
                if (d < dist) {
                    dist = d;
                    nearestHit = returnColl[0].hit[i];
                }
            }
            //returnColl[input point and direction].hit[nearest = 0].pt[coord x,y,z]
            //teleport to ground
            if (nearestHit.model.trigger.isTrigger === false) {
                if (dist <= this.player.stepHeight) {
                    this.player.vel.y = 0;
                    this.player.pos.y = nearestHit.pt[1];
                    this.player.gravity.grounded = true;
                    //this.player.asset = "sprTroglodyte00";
                } else {
                    if (this.player.vel.y < this.player.gravity.terminal) {
                        this.player.vel.y += this.player.gravity.y;
                    }
                    this.player.pos.y += this.player.vel.y;
                    this.player.gravity.grounded = false;
                    //this.player.asset = "sprTroglodyte02";
                }
            } else {
                nearestHit.model.updateTrigger();
            }
        }

        //resolve hit in global x axis
        if(returnColl[1].hit.length > 0){
            //filter relevant = nearest hit
            let dist = 9999;
            let nearestHit = returnColl[1].hit[0];
            for(let [i, n] of returnColl[1].hit.entries()){
                let d = Phaser.Math.Distance.Between(this.player.pos.x, this.player.pos.z, returnColl[1].hit[i].pt[0], returnColl[1].hit[i].pt[2]);
                if(d < dist){
                    dist = d;
                    nearestHit = returnColl[1].hit[i];
                }
            }
            if(dist < this.player.collisionRadius){
                //only move if you move away from the wall
                if ((toPos.x < this.player.pos.x && this.player.pos.x < nearestHit.pt[0]) || (toPos.x > this.player.pos.x && this.player.pos.x > nearestHit.pt[0]) || nearestHit.model.trigger.isTrigger === true){
                    this.player.pos.x = toPos.x;
                    if (nearestHit.model.trigger.isTrigger === true){
                        nearestHit.model.updateTrigger();
                    }
                }
            }else{
                //be free to move cause yoou are far away from wall
                this.player.pos.x = toPos.x;
            }
        }else{
            //move because there is nothing out there
            this.player.pos.x = toPos.x;
        }

        if (returnColl[2].hit.length > 0) {
            //filter relevant = nearest hit
            let dist = 9999;
            let nearestHit = returnColl[2].hit[0];
            for (let [i, n] of returnColl[2].hit.entries()) {
                let d = Phaser.Math.Distance.Between(this.player.pos.x, this.player.pos.z, returnColl[2].hit[i].pt[0], returnColl[2].hit[i].pt[2]);
                if (d < dist) {
                    dist = d;
                    nearestHit = returnColl[2].hit[i];
                }
            }
            if (dist < this.player.collisionRadius) {
                //only move if you move away from the wall
                if ((toPos.z < this.player.pos.z && this.player.pos.z < nearestHit.pt[2]) || (toPos.z > this.player.pos.z && this.player.pos.z > nearestHit.pt[2]) || nearestHit.model.trigger.isTrigger === true) {
                    this.player.pos.z = toPos.z;
                    if (nearestHit.model.trigger.isTrigger === true) {
                        nearestHit.model.updateTrigger();
                    }
                }
            }else{
                //be free to move cause yoou are far away from wall
                this.player.pos.z = toPos.z;
            }
        }else{
            //move because there is nothing out there
            this.player.pos.z = toPos.z;
        }
    }

    keyboardLook(){
        if (this.cursors.up.isDown) {
            this.player.dir.pitch += this.player.dir.spd.pitch;
        }
        if (this.cursors.down.isDown) {
            this.player.dir.pitch -= this.player.dir.spd.pitch;
        }
        if (this.cursors.right.isDown) {
            if(this.keys.q.isDown){
                this.player.dir.roll -= this.player.dir.spd.roll;
            }else{
                this.player.dir.yaw -= this.player.dir.spd.yaw;
            }
        }
        if (this.cursors.left.isDown) {
            if (this.keys.q.isDown) {
                this.player.dir.roll += this.player.dir.spd.roll;
            } else {
                this.player.dir.yaw += this.player.dir.spd.yaw;
            }
        }
    }

    mouseLook(){
        if(this.hand.vel.x !== 0){
            //this.player.dir.yaw = prevCamDir.yaw;
            this.player.dir.yaw -= ((this.hand.vel.x * 0.4) * this.player.dir.spd.yaw);
        }
        if(this.hand.vel.y !== 0){
            //this.player.dir.pitch = prevCamDir.pitch;
            this.player.dir.pitch += ((this.hand.vel.y * 0.4) * this.player.dir.spd.pitch);
        }
    }

    loadLevel(_name){
        this.unloadLevel();
        switch(_name){
            case "modelBuilder":
                this.level = new LevelModelbuilder(this);
            break;
            case "dream00":
                this.level = new LevelDream00(this);
            break;
            case "dream01":
                this.level = new LevelDream01(this);
            break;
            case "hangar00":
                this.level = new LevelHangar00(this);
            break;
            case "quarters00":
                this.level = new LevelQuarters00(this);
            break;
            case "quarters01":
                this.level = new LevelQuarters01(this);
            break;
            case "marketsquare00":
                this.level = new LevelMarketsquare00(this);
            break;
            case "office00":
                this.level = new LevelOffice00(this);
            break;
            default:
            break;
        }
    }

    unloadLevel(){
        if(this.level !== null){
            this.geometryController.destroyModels();
            this.level.destroy();
            this.level = null;
        }
    }

    gotoMenu(){
        this.hand.setMouseLock(false);
        this.scene.start("ScnLogin");
    }

    fillInputs() {
        let gamepad = null;
        gamepad = navigator.getGamepads()[Math.max(0, gamepadsConnected - 1)];
        if (gamepad === undefined) {
            gamepad = null;
        }

        //FORWARDS-BACKWARDDS
        INPUTS.stickLeft.vertical = 0;
        INPUTS.stickLeft.horizontal = 0;
        if (this.keys.w.isDown) {// || this.hand.pressed === true) {
            INPUTS.stickLeft.vertical = -1;
        } else if (this.keys.s.isDown) {
            INPUTS.stickLeft.vertical = 1;
        } else {
            if (gamepad !== null) {
                INPUTS.stickLeft.vertical = gamepad.axes[1];
            }
        }
        //STRAFE
        if (this.keys.a.isDown) {
            INPUTS.stickLeft.horizontal = -1;
        } else if (this.keys.d.isDown) {
            INPUTS.stickLeft.horizontal = 1;
        } else {
            if (gamepad !== null) {
                INPUTS.stickLeft.horizontal = gamepad.axes[0];
            }
        }
        //LOOK UP-DOWN
        INPUTS.stickRight.vertical = 0;
        INPUTS.stickRight.horizontal = 0;
        if (this.cursors.up.isDown) {
            INPUTS.stickRight.vertical = -1;
        } else if (this.cursors.down.isDown) {
            INPUTS.stickRight.vertical = 1;
        } else {
            if (gamepad !== null) {
                INPUTS.stickRight.vertical = gamepad.axes[3];
            }
        }
        //LOOK LEFT-RIGHT
        if (this.cursors.left.isDown) {
            INPUTS.stickRight.horizontal = -1;
        } else if (this.cursors.right.isDown) {
            INPUTS.stickRight.horizontal = 1;
        } else {
            if (gamepad !== null) {
                INPUTS.stickRight.horizontal = gamepad.axes[2];
            }
        }
        //CROUCH
        if (this.keys.tab.isDown || (gamepad !== null ? gamepad.buttons[4].pressed : false)) {
            if (INPUTS.btnShoulderLeft.pressed === false) {
                INPUTS.btnShoulderLeft.justPressed = true;
                INPUTS.btnShoulderLeft.pressed = true;
                INPUTS.btnShoulderLeft.justReleased = false;
            } else {
                INPUTS.btnShoulderLeft.justPressed = false;
            }
        } else {
            if (INPUTS.btnShoulderLeft.pressed === true) {
                INPUTS.btnShoulderLeft.pressed = false;
                INPUTS.btnShoulderLeft.justReleased = true;
                INPUTS.btnShoulderLeft.justPressed = false;
            } else {
                INPUTS.btnShoulderLeft.justReleased = false;
            }
        }
        //JUMP
        if (this.keys.space.isDown || (gamepad !== null ? gamepad.buttons[5].pressed : false)) {
            if (INPUTS.btnShoulderRight.pressed === false) {
                INPUTS.btnShoulderRight.justPressed = true;
                INPUTS.btnShoulderRight.pressed = true;
                INPUTS.btnShoulderRight.justReleased = false;
            } else {
                INPUTS.btnShoulderRight.justPressed = false;
            }
        } else {
            if (INPUTS.btnShoulderRight.pressed === true) {
                INPUTS.btnShoulderRight.pressed = false;
                INPUTS.btnShoulderRight.justReleased = true;
                INPUTS.btnShoulderRight.justPressed = false;
            } else {
                INPUTS.btnShoulderRight.justReleased = false;
            }
        }
        //SPRINT
        if (this.keys.shift.isDown || (gamepad !== null ? gamepad.buttons[6].pressed : false)) {
            if (INPUTS.btnTriggerLeft.pressed === false) {
                INPUTS.btnTriggerLeft.justPressed = true;
                INPUTS.btnTriggerLeft.pressed = true;
                INPUTS.btnTriggerLeft.justReleased = false;
            } else {
                INPUTS.btnTriggerLeft.justPressed = false;
            }
        } else {
            if (INPUTS.btnTriggerLeft.pressed === true) {
                INPUTS.btnTriggerLeft.pressed = false;
                INPUTS.btnTriggerLeft.justReleased = true;
                INPUTS.btnTriggerLeft.justPressed = false;
            } else {
                INPUTS.btnTriggerLeft.justReleased = false;
            }
        }
        //A
        if (this.keys.enter.isDown || (gamepad !== null ? gamepad.buttons[0].pressed : false)) {
            if (INPUTS.btnA.pressed === false) {
                INPUTS.btnA.justPressed = true;
                INPUTS.btnA.pressed = true;
                INPUTS.btnA.justReleased = false;
            } else {
                INPUTS.btnA.justPressed = false;
            }
        } else {
            if (INPUTS.btnA.pressed === true) {
                INPUTS.btnA.pressed = false;
                INPUTS.btnA.justReleased = true;
                INPUTS.btnA.justPressed = false;
            } else {
                INPUTS.btnA.justReleased = false;
            }
        }
        //B
        if (this.keys.backspace.isDown || (gamepad !== null ? gamepad.buttons[1].pressed : false)) {
            if (INPUTS.btnB.pressed === false) {
                INPUTS.btnB.justPressed = true;
                INPUTS.btnB.pressed = true;
                INPUTS.btnB.justReleased = false;
            } else {
                INPUTS.btnB.justPressed = false;
            }
        } else {
            if (INPUTS.btnB.pressed === true) {
                INPUTS.btnB.pressed = false;
                INPUTS.btnB.justReleased = true;
                INPUTS.btnB.justPressed = false;
            } else {
                INPUTS.btnB.justReleased = false;
            }
        }
        //DPAD UP
        if (this.cursors.up.isDown || (gamepad !== null ? gamepad.buttons[12].pressed : false)) {
            if (INPUTS.btnUp.pressed === false) {
                INPUTS.btnUp.justPressed = true;
                INPUTS.btnUp.pressed = true;
                INPUTS.btnUp.justReleased = false;
            } else {
                INPUTS.btnUp.justPressed = false;
            }
        } else {
            if (INPUTS.btnUp.pressed === true) {
                INPUTS.btnUp.pressed = false;
                INPUTS.btnUp.justReleased = true;
                INPUTS.btnUp.justPressed = false;
            } else {
                INPUTS.btnUp.justReleased = false;
            }
        }
        //LEFT STICK AS KEY UP
        if (gamepad !== null) {
            if (gamepad.axes[1] < -0.5) {
                if (INPUTS.stickLeft.asKey.up.pressed === false) {
                    INPUTS.stickLeft.asKey.up.justPressed = true;
                    INPUTS.stickLeft.asKey.up.pressed = true;
                    INPUTS.stickLeft.asKey.up.justReleased = false;
                } else {
                    INPUTS.stickLeft.asKey.up.justPressed = false;
                }
            } else {
                if (INPUTS.stickLeft.asKey.up.pressed === true) {
                    INPUTS.stickLeft.asKey.up.pressed = false;
                    INPUTS.stickLeft.asKey.up.justReleased = true;
                    INPUTS.stickLeft.asKey.up.justPressed = false;
                } else {
                    INPUTS.stickLeft.asKey.up.justReleased = false;
                }
            }
        }
        //DPAD DOWN
        if (this.cursors.down.isDown || (gamepad !== null ? gamepad.buttons[13].pressed : false)) {
            if (INPUTS.btnDown.pressed === false) {
                INPUTS.btnDown.justPressed = true;
                INPUTS.btnDown.pressed = true;
                INPUTS.btnDown.justReleased = false;
            } else {
                INPUTS.btnDown.justPressed = false;
            }
        } else {
            if (INPUTS.btnDown.pressed === true) {
                INPUTS.btnDown.pressed = false;
                INPUTS.btnDown.justReleased = true;
                INPUTS.btnDown.justPressed = false;
            } else {
                INPUTS.btnDown.justReleased = false;
            }
        }
        //LEFT STICK AS KEY DOWN
        if (gamepad !== null) {
            if (gamepad.axes[1] > 0.5) {
                if (INPUTS.stickLeft.asKey.down.pressed === false) {
                    INPUTS.stickLeft.asKey.down.justPressed = true;
                    INPUTS.stickLeft.asKey.down.pressed = true;
                    INPUTS.stickLeft.asKey.down.justReleased = false;
                } else {
                    INPUTS.stickLeft.asKey.down.justPressed = false;
                }
            } else {
                if (INPUTS.stickLeft.asKey.down.pressed === true) {
                    INPUTS.stickLeft.asKey.down.pressed = false;
                    INPUTS.stickLeft.asKey.down.justReleased = true;
                    INPUTS.stickLeft.asKey.down.justPressed = false;
                } else {
                    INPUTS.stickLeft.asKey.down.justReleased = false;
                }
            }
        }
    }

}
