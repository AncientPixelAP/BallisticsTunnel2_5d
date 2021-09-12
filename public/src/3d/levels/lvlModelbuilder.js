export default class LevelModelbuilder{
    constructor(_scene){
        this.scene = _scene;

        /*
        this.ref = this.scene.geometryController.loadModel("ref", "modTree00", {
            x: 0,
            y: 0,
            z: 0
        });
        this.ref.setDrawMode(DRAWMODE.BILLBOARD);
        this.ref.flags.draw = true;
        */

        /*
        this.ships = [];
        this.ships.push(this.scene.geometryController.loadModel("Ship A", "modShipHamptonAegis", {
            x: 0,
            y: 0,
            z: 0
        }));
        this.ships.push(this.scene.geometryController.loadModel("Ship B", "modShipArashiDart", {
            x: 128,
            y: 0,
            z: 0
        }));
        this.ships.push(this.scene.geometryController.loadModel("Ship C", "modShipFormulaE", {
            x: 256,
            y: 0,
            z: 0
        }));
        this.ships.push(this.scene.geometryController.loadModel("Ship D", "modShipFormulaOne", {
            x: 384,
            y: 0,
            z: 0
        }));
        
        for(let s of this.ships){
            s.flags.draw = true;
        }
        */

        this.trees = [];
        for(let y = -10 ; y <= 10 ; y++){
            for (let x = -10; x <= 10; x++) {
                this.trees.push(this.scene.geometryController.loadModel("ref", "modTree00", {
                    x: (x * 64) + (Math.random() * 48) - 24,
                    y: 0,
                    z: (y * 64) + (Math.random() * 48) - 24
                }));
                this.trees[this.trees.length - 1].quadData[0].setTexture("texTree0"+Math.floor(Math.random() * 2));
                this.trees[this.trees.length - 1].setDrawMode(DRAWMODE.BILLBOARD);
                //this.trees[this.trees.length - 1].translateAndRotate({x: 0, y: 0, z: 0}, {yaw: Math.random()*Math.PI, pitch: 0, roll: 0});
                this.trees[this.trees.length - 1].flags.draw = true;
            }
        }
    }

    update(){
        //this.hooman.lookDir.yaw += 0.05;

        /*
        for(let t of this.trees){
            let h = Math.hypot(t.pos.x - this.scene.player.pos.x, t.pos.z - this.scene.player.pos.z);

            //t.jumpToRotation({ yaw: 0, pitch: 0.01, roll: 0 });
            //t.translateAndRotate({x: 0,y: 0,z: 0}, {yaw: 0,pitch: (h * -0.01) - t.dir.pitch,roll: (h * -0.01) - t.dir.roll,});

            //t.jumpToPosition({ x: t.pos.x, y: h, z: t.pos.z });
        }
        */
        
        //infinite forest
        for (let t of this.trees) {
            if (t.pos.x - this.scene.player.pos.x > 704){
                t.jumpToPosition({ x: t.pos.x - 1280, y: t.pos.y, z: t.pos.z });
            } else if (t.pos.x - this.scene.player.pos.x < -704){
                t.jumpToPosition({ x: t.pos.x + 1280, y: t.pos.y, z: t.pos.z });
            }
            if (t.pos.z - this.scene.player.pos.z > 704) {
                t.jumpToPosition({ x: t.pos.x, y: t.pos.y, z: t.pos.z - 1280 });
            } else if (t.pos.z - this.scene.player.pos.z < -704) {
                t.jumpToPosition({ x: t.pos.x, y: t.pos.y, z: t.pos.z + 1280 });
            }
        }
    }

    destroy() {

    }
}