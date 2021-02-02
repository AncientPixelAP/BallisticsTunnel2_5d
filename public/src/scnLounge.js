import Hand from "./ui/hand.js";
import Button from "./ui/button.js";
import Cam from "./3d/cam.js";
import GeometryController from "./3d/geometryController.js";
import Editor from "./3d/editor.js";

export default class ScnLounge extends Phaser.Scene {

    constructor() {
        super("ScnLounge");
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
        this.editor.toggleEditor();


        this.cam = new Cam(this);
        this.geometryController = new GeometryController(this);

        //add debug grid
        /*
        this.geometryController.loadModel("DebugTile", "modDebugTile", {
            x: 0,
            y: 8,
            z: 0
        });
        */

        

        this.geometryController.loadModel("ElevatorBase", "modElevatorBase", {
            x: 0,
            y: 0,
            z: 0
        });

        this.geometryController.loadModel("ElevatorDoorRight", "modElevatorDoor", {
            x: -16,
            y: 0,
            z: -32
        });
        this.geometryController.loadModel("ElevatorDoorLeft", "modElevatorDoor", {
            x: 16,
            y: 0,
            z: -32
        });

        this.geometryController.loadModel("HangarHallway", "modHangarHallway", {
            x: 0,
            y: 0,
            z: -52
        });
        this.geometryController.loadModel("HangarMain", "modHangarMain", {
            x: -48,
            y: -56,
            z: -276
        });

        this.geometryController.loadModel("ShipHamptonAegis", "modShipHamptonAegis", {
            x: -256,
            y: -56,
            z: -256
        });

        this.geometryController.loadModel("ShipArashiDart", "modShipArashiDart", {
            x: -256,
            y: -56,
            z: -56
        });

        /*this.geometryController.loadModel("DebugWallTest", "modDebugWallTest", {
            x: 0,
            y: 0,
            z: -96
        });*/

        this.debugTxt = this.add.bitmapText((this.game.config.width * -0.5) + 16, (this.game.config.height * -0.5) + 16, "pixochrome", "TEST Test test 00 gbqrSX5s", 32, 1).setOrigin(0).setLetterSpacing(-2);
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
            this.gameControls();

            let hits = [];
            hits = this.geometryController.getQuadsFromScreenspaceAt(this.input.activePointer.worldX, this.input.activePointer.worldY, false);
            if (hits.length > 0) {
                hits = hits.sort((a, b) => a.depth - b.depth);
                this.debugTxt.setText(hits[hits.length - 1].modelId);
            }
        }

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

                let model = this.geometryController.getModelById(this.editor.quad.modelId);
                if (model.length > 0) {
                    this.editor.model = model[0];
                }
            }
        }

        //camera controls
        this.keyboardLook();

        if (this.keys.a.isDown) {
            this.cam.pos.z -= Math.cos(this.cam.dir.yaw - HALFPI) * 1;
            this.cam.pos.x += Math.sin(this.cam.dir.yaw - HALFPI) * 1;
        }
        if (this.keys.d.isDown) {
            this.cam.pos.z -= Math.cos(this.cam.dir.yaw + HALFPI) * 1;
            this.cam.pos.x += Math.sin(this.cam.dir.yaw + HALFPI) * 1;
        }
        if (this.keys.s.isDown) {
            this.cam.pos.z -= Math.cos(this.cam.dir.yaw) * 1;
            this.cam.pos.x += Math.sin(this.cam.dir.yaw) * 1;
        }
        if (this.keys.w.isDown) {
            this.cam.pos.z += Math.cos(this.cam.dir.yaw) * 1;
            this.cam.pos.x -= Math.sin(this.cam.dir.yaw) * 1;
        }

        if (this.keys.space.isDown) {
            this.cam.pos.y -= 1;
        }
        if (this.keys.c.isDown) {
            this.cam.pos.y += 1;
        }
    }

    gameControls(){
        this.keyboardLook();
        this.mouseLook();

        this.cam.dir.pitch = Math.max(-HALFPI, Math.min(HALFPI ,this.cam.dir.pitch));

        let toPos = {
            x: this.cam.pos.x,
            y: this.cam.pos.y,
            z: this.cam.pos.z
        }

        if (this.keys.a.isDown) {
            toPos.z -= Math.cos(this.cam.dir.yaw - HALFPI) * 1;
            toPos.x += Math.sin(this.cam.dir.yaw - HALFPI) * 1;
            //this.cam.pos.z -= Math.cos(this.cam.dir.yaw - HALFPI) * 1;
            //this.cam.pos.x += Math.sin(this.cam.dir.yaw - HALFPI) * 1;
        }
        if (this.keys.d.isDown) {
            toPos.z -= Math.cos(this.cam.dir.yaw + HALFPI) * 1;
            toPos.x += Math.sin(this.cam.dir.yaw + HALFPI) * 1;
            //this.cam.pos.z -= Math.cos(this.cam.dir.yaw + HALFPI) * 1;
            //this.cam.pos.x += Math.sin(this.cam.dir.yaw + HALFPI) * 1;
        }
        if (this.keys.s.isDown) {
            toPos.z -= Math.cos(this.cam.dir.yaw) * 1;
            toPos.x += Math.sin(this.cam.dir.yaw) * 1;
            //this.cam.pos.z -= Math.cos(this.cam.dir.yaw) * 1;
            //this.cam.pos.x += Math.sin(this.cam.dir.yaw) * 1;
        }
        if (this.keys.w.isDown) {
            toPos.z += Math.cos(this.cam.dir.yaw) * 1;
            toPos.x -= Math.sin(this.cam.dir.yaw) * 1;
            //this.cam.pos.z += Math.cos(this.cam.dir.yaw) * 1;
            //this.cam.pos.x -= Math.sin(this.cam.dir.yaw) * 1;
        }

        if (this.keys.space.isDown) {
            this.cam.pos.y -= 1;
        }
        if (this.keys.c.isDown) {
            this.cam.pos.y += 1;
        }

        let returnColl = [];
        returnColl = this.geometryController.update(
            [
                {//check ground at player position
                    pos: {
                        x: this.cam.pos.x,
                        y: this.cam.pos.y,
                        z: this.cam.pos.z
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
                        y: toPos.y + this.cam.eyeHeight - this.cam.stepHeight,
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
                        y: toPos.y + this.cam.eyeHeight - this.cam.stepHeight,
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
                let d = Phaser.Math.Distance.Between(0, this.cam.pos.y + (this.cam.eyeHeight - this.cam.stepHeight), 0, returnColl[0].hit[i].pt[1]);
                if (d < dist) {
                    dist = d;
                    nearestHit = returnColl[0].hit[i];
                }
            }
            //returnColl[input point and direction].hit[nearest = 0].pt[coord x,y,z]
            //teleport to ground
            //if (this.cam.pos.y - this.cam.stepHeight < nearestHit.pt[1] - this.cam.eyeHeight){
                this.cam.pos.y = nearestHit.pt[1] - this.cam.eyeHeight;
            //}
        }

        //resolve hit in global x axis
        if(returnColl[1].hit.length > 0){
            //filter relevant = nearest hit
            let dist = 9999;
            let nearestHit = returnColl[1].hit[0];
            for(let [i, n] of returnColl[1].hit.entries()){
                let d = Phaser.Math.Distance.Between(this.cam.pos.x, this.cam.pos.z, returnColl[1].hit[i].pt[0], returnColl[1].hit[i].pt[2]);
                if(d < dist){
                    dist = d;
                    nearestHit = returnColl[1].hit[i];
                }
            }
            if(dist < this.cam.collisionRadius){
                //only move if you move away from the wall
                if ((toPos.x < this.cam.pos.x && this.cam.pos.x < nearestHit.pt[0]) || (toPos.x > this.cam.pos.x && this.cam.pos.x > nearestHit.pt[0])){
                    this.cam.pos.x = toPos.x;
                }
            }else{
                //be free to move cause yoou are far away from wall
                this.cam.pos.x = toPos.x;
            }
        }else{
            //move because there is nothing out there
            this.cam.pos.x = toPos.x;
        }

        if (returnColl[2].hit.length > 0) {
            //filter relevant = nearest hit
            let dist = 9999;
            let nearestHit = returnColl[2].hit[0];
            for (let [i, n] of returnColl[2].hit.entries()) {
                let d = Phaser.Math.Distance.Between(this.cam.pos.x, this.cam.pos.z, returnColl[2].hit[i].pt[0], returnColl[2].hit[i].pt[2]);
                if (d < dist) {
                    dist = d;
                    nearestHit = returnColl[2].hit[i];
                }
            }
            if (dist < this.cam.collisionRadius) {
                //only move if you move away from the wall
                if ((toPos.z < this.cam.pos.z && this.cam.pos.z < nearestHit.pt[2]) || (toPos.z > this.cam.pos.z && this.cam.pos.z > nearestHit.pt[2])) {
                    this.cam.pos.z = toPos.z;
                }
            }else{
                //be free to move cause yoou are far away from wall
                this.cam.pos.z = toPos.z;
            }
        }else{
            //move because there is nothing out there
            this.cam.pos.z = toPos.z;
        }
    }

    keyboardLook(){
        if (this.cursors.up.isDown) {
            this.cam.dir.pitch += this.cam.dir.spd.pitch;
        }
        if (this.cursors.down.isDown) {
            this.cam.dir.pitch -= this.cam.dir.spd.pitch;
        }
        if (this.cursors.right.isDown) {
            this.cam.dir.yaw -= this.cam.dir.spd.yaw;
        }
        if (this.cursors.left.isDown) {
            this.cam.dir.yaw += this.cam.dir.spd.yaw;
        }
    }

    mouseLook(){
        if(this.hand.vel.x !== 0){
            //this.cam.dir.yaw = prevCamDir.yaw;
            this.cam.dir.yaw -= ((this.hand.vel.x * 0.25) * this.cam.dir.spd.yaw);
        }
        if(this.hand.vel.y !== 0){
            //this.cam.dir.pitch = prevCamDir.pitch;
            this.cam.dir.pitch += ((this.hand.vel.y * 0.25) * this.cam.dir.spd.pitch);
        }
    }

    gotoMenu(){
        this.scene.start("ScnLogin");
    }

}
