import Hand from "./ui/hand.js";
import Button from "./ui/button.js";
import Cam from "./3d/cam.js";
import GeometryController from "./3d/geometryController.js";

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
            space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
            ctrl: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL),
            alt: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ALT),
            end: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.END),
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
            minus: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_SUBSTRACT), 
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

        this.keys.e.on("down", (_key, _event) => {
            _event.stopPropagation();
            if(this.keys.space.isDown){
                this.toggleEditor();
            }
        }, this);

        this.hand = new Hand(this);
        /*

        this.btnBack = new Button(this, { x: -160, y: - 66 }, "sprBtn00", "BACK", false, () => {
            this.cameras.main.fade(500, 0, 0, 0, false, (_cam, _pct) => {
                if (_pct >= 1) {
                    this.gotoMenu();
                }
            }, this);
        });
        */

        this.editor = {
            enabled: true,
            points: [
                this.add.sprite(0, 0, "sprDebugQuadPoint1"),
                this.add.sprite(0, 0, "sprDebugQuadPoint2"),
                this.add.sprite(0, 0, "sprDebugQuadPoint3"),
                this.add.sprite(0, 0, "sprDebugQuadPoint4")//,
                //this.add.sprite(0, 0, "sprDebugQuadPoint4"),
                //this.add.sprite(0, 0, "sprDebugQuadPointCenter")
            ],
            editPointsEnabled: [false, false, false, false],
            quad: null,
            pressed: false,
        }
        this.toggleEditor();

        //setup Editor key grabs
        this.keys.one.on("up", (_key, _event) => {
            this.toggleEditPoint(0);
        }, this);
        this.keys.two.on("up", (_key, _event) => {
            this.toggleEditPoint(1);
        }, this);
        this.keys.three.on("up", (_key, _event) => {
            this.toggleEditPoint(2);
        }, this);
        this.keys.four.on("up", (_key, _event) => {
            this.toggleEditPoint(3);
        }, this);
        this.keys.five.on("up", (_key, _event) => {
            this.toggleEditPoint(0);
            this.toggleEditPoint(1);
            this.toggleEditPoint(2);
            this.toggleEditPoint(3);
        }, this);

        
        this.numkeys.eight.on("up", (_key, _event) => {
            for(let [i, e] of this.editor.editPointsEnabled.entries()){
                if(e === true){
                    this.moveToolPoint(i, { x: Math.sin(this.cam.dir.yaw) * -4, y: 0, z: Math.cos(this.cam.dir.yaw) * 4 });
                }
            }
        }, this);
        this.numkeys.two.on("up", (_key, _event) => {
            for (let [i, e] of this.editor.editPointsEnabled.entries()) {
                if (e === true) {
                    this.moveToolPoint(i, { x: Math.sin(this.cam.dir.yaw) * 4, y: 0, z: Math.cos(this.cam.dir.yaw) * -4 });
                }
            }
        }, this);
        this.numkeys.four.on("up", (_key, _event) => {
            for (let [i, e] of this.editor.editPointsEnabled.entries()) {
                if (e === true) {
                    this.moveToolPoint(i, { x: Math.sin(this.cam.dir.yaw - HALFPI) * 4, y: 0, z: Math.cos(this.cam.dir.yaw - HALFPI) * -4 });
                }
            }
        }, this);
        this.numkeys.six.on("up", (_key, _event) => {
            for (let [i, e] of this.editor.editPointsEnabled.entries()) {
                if (e === true) {
                    this.moveToolPoint(i, { x: Math.sin(this.cam.dir.yaw + HALFPI) * 4, y: 0, z: Math.cos(this.cam.dir.yaw + HALFPI) * -4 });
                }
            }
        }, this);
        this.numkeys.nine.on("up", (_key, _event) => {
            for (let [i, e] of this.editor.editPointsEnabled.entries()) {
                if (e === true) {
                    this.moveToolPoint(i, { x: 0, y: -4, z: 0 });
                }
            }
        }, this);
        this.numkeys.three.on("up", (_key, _event) => {
            for (let [i, e] of this.editor.editPointsEnabled.entries()) {
                if (e === true) {
                    this.moveToolPoint(i, { x: 0, y: 4, z: 0 });
                }
            }
        }, this);



        this.cam = new Cam(this);
        this.geometryController = new GeometryController(this);

        //add debug grid
        /*for(let z = 0 ; z < 5 ; z++){
            for(let x = -2 ; x < 2 ; x++){
                let yy = z * 2;
                if(x != 0){
                    yy = 0;
                }
                this.geometryController.loadModel("DebugTile", "modDebugTile", {
                    x: x * 32,
                    y: yy,
                    z: z * -32
                });
            }
        }
        this.geometryController.loadModel("DebugTile", "modDebugTile", {
            x: 0,
            y: 8,
            z: 0
        });*/

        this.geometryController.loadModel("ElevatorBase", "modElevatorBase", {
            x: 0,
            y: 0,
            z: 0
        });
    }

    update(){
        this.hand.update();
        /*
        this.btnBack.update();
        */

        if(this.editor.enabled === true){
            this.editorControls();

            //mark quad points
            if (this.editor.quad !== null) {
                for (let [i, p] of this.editor.quad.screenCoords.entries()) {
                    this.editor.points[i].x = p.x;
                    this.editor.points[i].y = p.y;
                }
            }
        }else{
            this.gameControls();
        }

       this.geometryController.draw(this.cam.pos, this.cam.dir);
    }

    editorControls(){
        if(this.hand.justReleased){
            let hits = this.geometryController.getQuadsFromScreenspaceAt(this.input.activePointer.worldX, this.input.activePointer.worldY);
            if(hits.length > 0){
                hits = hits.sort((a, b) => a.depth - b.depth);
                this.editor.quad = hits[hits.length-1];
            }
        }

        //camera controls
        if (this.cursors.up.isDown) {
            this.cam.dir.pitch += 0.05;
        }
        if (this.cursors.down.isDown) {
            this.cam.dir.pitch -= 0.05;
        }
        if (this.cursors.right.isDown) {
            this.cam.dir.yaw -= 0.05;
        }
        if (this.cursors.left.isDown) {
            this.cam.dir.yaw += 0.05;
        }

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
        if (this.keys.ctrl.isDown) {
            this.cam.pos.y += 1;
        }
    }

    gameControls(){
        if (this.cursors.up.isDown) {
            this.cam.dir.pitch += 0.01;//0.05
        }
        if (this.cursors.down.isDown) {
            this.cam.dir.pitch -= 0.01;
        }
        if (this.cursors.right.isDown) {
            this.cam.dir.yaw -= 0.01;
        }
        if (this.cursors.left.isDown) {
            this.cam.dir.yaw += 0.01;
        }

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
        if (this.keys.ctrl.isDown) {
            this.cam.pos.y += 1;
        }

        let returnColl = [];
        returnColl = this.geometryController.update(
            [{//check ground at player position
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
            }]
        );
        //console.log(returnColl);
        if (returnColl[0].hit.length > 0) {
            //teleport to ground
            this.cam.pos.y = returnColl[0].hit[0].pt[1] - this.cam.eyeHeight;
        }
    }

    gotoMenu(){
        this.scene.start("ScnLogin");
    }

    toggleEditor(){
        this.editor.enabled = !this.editor.enabled;
        if(this.editor.enabled === true){
            for(let p of this.editor.points){
                p.alpha = 1;
            }
        }else{
            for (let p of this.editor.points) {
                p.alpha = 0;
            }
        }
        console.log("EDITOR " + (this.editor.enabled ? "ENABLED": "DISABLED"));
    }

    toggleEditPoint(_ptNum){
        this.editor.editPointsEnabled[_ptNum] = !this.editor.editPointsEnabled[_ptNum];
        if (this.editor.editPointsEnabled[_ptNum] === true){
            this.editor.points[_ptNum].setTint(0x00e436);
        }else{
            this.editor.points[_ptNum].setTint(0xff77a8);
        }
    }

    moveToolPoint(_pt, _pos){
        this.editor.quad.points[_pt].x += _pos.x;
        this.editor.quad.points[_pt].y += _pos.y;
        this.editor.quad.points[_pt].z += _pos.z;

        this.editor.quad.points[_pt].x = Math.round(this.editor.quad.points[_pt].x / 4) * 4;
        this.editor.quad.points[_pt].y = Math.round(this.editor.quad.points[_pt].y / 4) * 4;
        this.editor.quad.points[_pt].z = Math.round(this.editor.quad.points[_pt].z / 4) * 4;
    }
}
