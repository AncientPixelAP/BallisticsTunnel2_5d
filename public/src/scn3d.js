import Hand from "./ui/hand.js";
import Button from "./ui/button.js";
import Cam from "./3d/cam.js";
import GeometryController from "./3d/geometryController.js";
import Editor from "./3d/editor.js";
import { Player3d } from "./3d/player.js";
import LevelHangar00 from "./3d/levels/lvlHangar00.js"
import LevelDream00 from "./3d/levels/lvlDream00.js"
import LevelDream01 from "./3d/levels/lvlDream01.js";
import LevelQuarters00 from "./3d/levels/lvlQuarters00.js"
import LevelModelbuilder from "./3d/levels/lvlModelbuilder.js";

export default class Scn3d extends Phaser.Scene {

    constructor() {
        super("Scn3d");
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
            tab: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB)
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
        this.hand.setMouseLock(true);

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
        this.loadLevel("dream01");//modelBuilder dream01

        this.modelName = "";
        this.debugTxt = this.add.bitmapText((this.game.config.width * -0.5) + 16, (this.game.config.height * -0.5) + 16, "bravenewEra_16", "TEST Test test 00 gbqrSX5s", 16, 1).setOrigin(0).setLetterSpacing(1);
    }

    update(){
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

                    if (this.hand.justReleased) {
                        let model = this.geometryController.getModelById(this.modelName = hits[hits.length - 1].modelId);
                        model.interact();
                    }
                }

                if (this.hand.justReleased) {
                    if(this.input.mouse.locked === false){
                        this.hand.setMouseLock(true);
                    }
                    //log the playre  position as a helper for manual object positioning in level files
                    if(this.keys.q.isDown){
                        console.log(this.player.pos);
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

        if (this.keys.a.isDown) {
            toPos.z -= Math.cos(this.player.dir.yaw - HALFPI) * 1;
            toPos.x += Math.sin(this.player.dir.yaw - HALFPI) * 1;
        }
        if (this.keys.d.isDown) {
            toPos.z -= Math.cos(this.player.dir.yaw + HALFPI) * 1;
            toPos.x += Math.sin(this.player.dir.yaw + HALFPI) * 1;
        }
        if (this.keys.s.isDown) {
            toPos.z -= Math.cos(this.player.dir.yaw) * 1;
            toPos.x += Math.sin(this.player.dir.yaw) * 1;
        }
        if (this.keys.w.isDown) {
            toPos.z += Math.cos(this.player.dir.yaw) * 1;
            toPos.x -= Math.sin(this.player.dir.yaw) * 1;
        }else{
            //mouse movement TODO! better and creative solutioned mouse movement
            /*if (this.hand.pressed === true) {
                toPos.z += Math.cos(this.player.dir.yaw) * 1;
                toPos.x -= Math.sin(this.player.dir.yaw) * 1;
            }*/
        }


        if (this.keys.space.isDown) {
            this.player.pos.y -= 1;
        }
        if (this.keys.c.isDown) {
            this.player.pos.y += 1;
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
            if(nearestHit.model.trigger.isTrigger === false){
                if(dist <= this.player.stepHeight){
                    this.player.vel.y = 0;
                    this.player.pos.y = nearestHit.pt[1];
                }else{
                    if (this.player.vel.y < this.player.gravity.terminal) {
                        this.player.vel.y += this.player.gravity.y;
                    }
                    this.player.pos.y += this.player.vel.y;
                }
            }else{
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
            this.player.dir.yaw -= this.player.dir.spd.yaw;
        }
        if (this.cursors.left.isDown) {
            this.player.dir.yaw += this.player.dir.spd.yaw;
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
        this.scene.start("ScnLogin");
    }

}
