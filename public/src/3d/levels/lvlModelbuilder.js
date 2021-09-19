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

        this.state = 0;
        let treeAngle = Math.PI * 0.5;
        this.initDist = 720;

        this.trees = [];
        this.pts = [{ "x": 14, "y": 0 }, { "x": 22, "y": 2 }, { "x": 38, "y": 2 }, { "x": 54, "y": 2 }, { "x": 56, "y": 2 }, { "x": 62, "y": 2 }, { "x": 64, "y": 3 }, { "x": 70, "y": 3 }, { "x": 14, "y": 4 }, { "x": 18, "y": 6 }, { "x": 27, "y": 7 }, { "x": 30, "y": 7 }, { "x": 32, "y": 7 }, { "x": 47, "y": 7 }, { "x": 51, "y": 7 }, { "x": 54, "y": 4 }, { "x": 62, "y": 4 }, { "x": 64, "y": 7 }, { "x": 68, "y": 6 }, { "x": 72, "y": 6 }, { "x": 82, "y": 6 }, { "x": 15, "y": 8 }, { "x": 18, "y": 8 }, { "x": 26, "y": 10 }, { "x": 28, "y": 10 }, { "x": 34, "y": 10 }, { "x": 47, "y": 10 }, { "x": 50, "y": 10 }, { "x": 52, "y": 8 }, { "x": 62, "y": 10 }, { "x": 66, "y": 10 }, { "x": 68, "y": 8 }, { "x": 72, "y": 8 }, { "x": 15, "y": 12 }, { "x": 19, "y": 12 }, { "x": 22, "y": 14 }, { "x": 38, "y": 14 }, { "x": 59, "y": 14 }, { "x": 63, "y": 12 }, { "x": 66, "y": 14 }, { "x": 68, "y": 15 }, { "x": 2, "y": 18 }, { "x": 19, "y": 16 }, { "x": 22, "y": 16 }, { "x": 24, "y": 18 }, { "x": 34, "y": 19 }, { "x": 46, "y": 19 }, { "x": 48, "y": 19 }, { "x": 55, "y": 18 }, { "x": 59, "y": 16 }, { "x": 62, "y": 16 }, { "x": 66, "y": 16 }, { "x": 68, "y": 18 }, { "x": 78, "y": 18 }, { "x": 2, "y": 20 }, { "x": 10, "y": 22 }, { "x": 12, "y": 23 }, { "x": 19, "y": 23 }, { "x": 22, "y": 23 }, { "x": 24, "y": 23 }, { "x": 34, "y": 22 }, { "x": 36, "y": 22 }, { "x": 47, "y": 22 }, { "x": 50, "y": 22 }, { "x": 52, "y": 23 }, { "x": 59, "y": 23 }, { "x": 62, "y": 23 }, { "x": 64, "y": 20 }, { "x": 68, "y": 20 }, { "x": 72, "y": 22 }, { "x": 2, "y": 26 }, { "x": 10, "y": 24 }, { "x": 12, "y": 27 }, { "x": 19, "y": 27 }, { "x": 22, "y": 27 }, { "x": 27, "y": 27 }, { "x": 30, "y": 27 }, { "x": 32, "y": 24 }, { "x": 36, "y": 27 }, { "x": 47, "y": 27 }, { "x": 50, "y": 24 }, { "x": 52, "y": 27 }, { "x": 59, "y": 27 }, { "x": 62, "y": 27 }, { "x": 64, "y": 26 }, { "x": 68, "y": 27 }, { "x": 2, "y": 28 }, { "x": 10, "y": 28 }, { "x": 12, "y": 31 }, { "x": 16, "y": 31 }, { "x": 22, "y": 30 }, { "x": 27, "y": 31 }, { "x": 30, "y": 30 }, { "x": 32, "y": 28 }, { "x": 39, "y": 30 }, { "x": 43, "y": 30 }, { "x": 46, "y": 30 }, { "x": 48, "y": 28 }, { "x": 55, "y": 31 }, { "x": 59, "y": 31 }, { "x": 62, "y": 30 }, { "x": 64, "y": 31 }, { "x": 70, "y": 30 }, { "x": 3, "y": 34 }, { "x": 6, "y": 35 }, { "x": 14, "y": 35 }, { "x": 16, "y": 34 }, { "x": 23, "y": 32 }, { "x": 27, "y": 34 }, { "x": 30, "y": 32 }, { "x": 32, "y": 35 }, { "x": 43, "y": 35 }, { "x": 46, "y": 35 }, { "x": 51, "y": 32 }, { "x": 55, "y": 35 }, { "x": 59, "y": 35 }, { "x": 62, "y": 35 }, { "x": 64, "y": 35 }, { "x": 68, "y": 32 }, { "x": 3, "y": 36 }, { "x": 6, "y": 38 }, { "x": 14, "y": 38 }, { "x": 16, "y": 39 }, { "x": 22, "y": 39 }, { "x": 27, "y": 36 }, { "x": 31, "y": 36 }, { "x": 35, "y": 39 }, { "x": 38, "y": 38 }, { "x": 42, "y": 38 }, { "x": 46, "y": 38 }, { "x": 48, "y": 39 }, { "x": 55, "y": 39 }, { "x": 59, "y": 39 }, { "x": 62, "y": 39 }, { "x": 64, "y": 38 }, { "x": 68, "y": 36 }, { "x": 7, "y": 40 }, { "x": 10, "y": 43 }, { "x": 18, "y": 42 }, { "x": 20, "y": 43 }, { "x": 27, "y": 43 }, { "x": 31, "y": 43 }, { "x": 34, "y": 42 }, { "x": 50, "y": 43 }, { "x": 55, "y": 43 }, { "x": 59, "y": 42 }, { "x": 62, "y": 42 }, { "x": 64, "y": 40 }, { "x": 68, "y": 42 }, { "x": 2, "y": 46 }, { "x": 6, "y": 47 }, { "x": 10, "y": 46 }, { "x": 18, "y": 44 }, { "x": 20, "y": 46 }, { "x": 27, "y": 46 }, { "x": 31, "y": 46 }, { "x": 34, "y": 46 }, { "x": 50, "y": 46 }, { "x": 52, "y": 47 }, { "x": 59, "y": 44 }, { "x": 62, "y": 44 }, { "x": 3, "y": 50 }, { "x": 6, "y": 50 }, { "x": 8, "y": 48 }, { "x": 14, "y": 50 }, { "x": 23, "y": 48 }, { "x": 27, "y": 51 }, { "x": 31, "y": 48 }, { "x": 34, "y": 50 }, { "x": 50, "y": 50 }, { "x": 52, "y": 50 }, { "x": 59, "y": 51 }, { "x": 62, "y": 48 }, { "x": 70, "y": 50 }, { "x": 72, "y": 50 }, { "x": 82, "y": 51 }, { "x": 7, "y": 52 }, { "x": 10, "y": 54 }, { "x": 12, "y": 52 }, { "x": 26, "y": 55 }, { "x": 31, "y": 55 }, { "x": 35, "y": 52 }, { "x": 38, "y": 54 }, { "x": 40, "y": 55 }, { "x": 46, "y": 54 }, { "x": 48, "y": 52 }, { "x": 55, "y": 52 }, { "x": 58, "y": 54 }, { "x": 60, "y": 54 }, { "x": 70, "y": 52 }, { "x": 72, "y": 55 }, { "x": 79, "y": 55 }, { "x": 83, "y": 55 }, { "x": 3, "y": 59 }, { "x": 6, "y": 58 }, { "x": 8, "y": 56 }, { "x": 15, "y": 59 }, { "x": 18, "y": 58 }, { "x": 26, "y": 58 }, { "x": 28, "y": 58 }, { "x": 35, "y": 59 }, { "x": 38, "y": 58 }, { "x": 42, "y": 58 }, { "x": 46, "y": 58 }, { "x": 48, "y": 58 }, { "x": 55, "y": 59 }, { "x": 58, "y": 56 }, { "x": 60, "y": 56 }, { "x": 66, "y": 59 }, { "x": 68, "y": 59 }, { "x": 72, "y": 59 }, { "x": 79, "y": 59 }, { "x": 82, "y": 59 }, { "x": 3, "y": 63 }, { "x": 6, "y": 60 }, { "x": 8, "y": 63 }, { "x": 14, "y": 63 }, { "x": 16, "y": 60 }, { "x": 26, "y": 60 }, { "x": 28, "y": 63 }, { "x": 35, "y": 62 }, { "x": 39, "y": 60 }, { "x": 42, "y": 60 }, { "x": 44, "y": 60 }, { "x": 51, "y": 60 }, { "x": 55, "y": 63 }, { "x": 58, "y": 62 }, { "x": 66, "y": 62 }, { "x": 70, "y": 63 }, { "x": 72, "y": 62 }, { "x": 79, "y": 63 }, { "x": 82, "y": 62 }, { "x": 3, "y": 66 }, { "x": 6, "y": 66 }, { "x": 8, "y": 66 }, { "x": 14, "y": 66 }, { "x": 22, "y": 66 }, { "x": 30, "y": 66 }, { "x": 35, "y": 67 }, { "x": 39, "y": 67 }, { "x": 42, "y": 67 }, { "x": 44, "y": 67 }, { "x": 51, "y": 67 }, { "x": 54, "y": 67 }, { "x": 62, "y": 66 }, { "x": 67, "y": 64 }, { "x": 70, "y": 66 }, { "x": 72, "y": 64 }, { "x": 79, "y": 66 }, { "x": 82, "y": 64 }, { "x": 6, "y": 68 }, { "x": 18, "y": 70 }, { "x": 35, "y": 70 }, { "x": 38, "y": 70 }, { "x": 43, "y": 71 }, { "x": 46, "y": 70 }, { "x": 48, "y": 71 }, { "x": 52, "y": 71 }, { "x": 56, "y": 71 }, { "x": 60, "y": 68 }, { "x": 66, "y": 68 }, { "x": 74, "y": 70 }, { "x": 3, "y": 74 }, { "x": 6, "y": 74 }, { "x": 18, "y": 72 }, { "x": 20, "y": 75 }, { "x": 39, "y": 72 }, { "x": 42, "y": 74 }, { "x": 47, "y": 72 }, { "x": 50, "y": 74 }, { "x": 52, "y": 75 }, { "x": 58, "y": 74 }, { "x": 60, "y": 74 }, { "x": 64, "y": 72 }, { "x": 2, "y": 76 }, { "x": 14, "y": 78 }, { "x": 16, "y": 78 }, { "x": 20, "y": 78 }, { "x": 24, "y": 78 }, { "x": 47, "y": 76 }, { "x": 51, "y": 76 }, { "x": 54, "y": 78 }, { "x": 56, "y": 76 }, { "x": 60, "y": 79 }, { "x": 64, "y": 76 }, { "x": 68, "y": 78 }, { "x": 82, "y": 78 }, { "x": 2, "y": 82 }, { "x": 14, "y": 80 }, { "x": 16, "y": 80 }, { "x": 22, "y": 83 }, { "x": 51, "y": 80 }, { "x": 54, "y": 83 }, { "x": 56, "y": 80 }, { "x": 62, "y": 83 }, { "x": 64, "y": 80 }, { "x": 68, "y": 83 }];
        /*for(let y = -10 ; y <= 10 ; y++){
            for (let x = -10; x <= 10; x++) {
                this.trees.push(this.scene.geometryController.loadModel("ref", "modTree00", {
                    x: (x * 64) + (Math.random() * 48) - 24,
                    y: (y * 64) + (Math.random() * 48) - 24,
                    z: 512
                }));
                this.trees[this.trees.length - 1].data.radius = this.trees[this.trees.length - 1].pos.y;
                this.trees[this.trees.length - 1].quadData[0].setTexture("texTree0"+Math.floor(Math.random() * 2));
                this.trees[this.trees.length - 1].jumpToRotation({ yaw: 0, pitch: treeAngle, roll: 0 });
                this.trees[this.trees.length - 1].setDrawMode(DRAWMODE.BILLBOARD);
                this.trees[this.trees.length - 1].flags.draw = true;
            }
        }*/
        for(let p of this.pts){
            this.trees.push(this.scene.geometryController.loadModel("ref", "modTree00", {
                x: (p.x * 16) + (Math.random() * 12) - 6 - 672,
                y: (p.y * 16) + (Math.random() * 12) - 6 - 672,
                z: this.initDist
            }));
            this.trees[this.trees.length - 1].data.radius = this.trees[this.trees.length - 1].pos.y;
            this.trees[this.trees.length - 1].quadData[0].setTexture("texTree0" + Math.floor(Math.random() * 2));
            this.trees[this.trees.length - 1].jumpToRotation({ yaw: 0, pitch: treeAngle, roll: 0 });
            this.trees[this.trees.length - 1].setDrawMode(DRAWMODE.BILLBOARD);
            this.trees[this.trees.length - 1].flags.draw = true;
        }
    }

    update(){
        //this.hooman.lookDir.yaw += 0.05;
        
        if(this.state === 0){
            for(let t of this.trees){
                let d = this.initDist - this.scene.player.pos.z;
                let a = (Math.PI * 0.5) * (d / this.initDist);
                t.jumpToRotation({ yaw: 0, pitch: a, roll: 0 });
                t.jumpToPosition({ x: t.pos.x, y: Math.cos(a + (Math.PI * 0.5)) * t.data.radius, z: this.initDist + Math.sin(a + (Math.PI * 0.5)) * t.data.radius });
                if(d <= 0){
                    this.state = 1;
                }
            }
        }else{
            //infinite forest
            for (let t of this.trees) {
                if (t.pos.x - this.scene.player.pos.x > 672) {
                    t.jumpToPosition({ x: t.pos.x - 1344, y: t.pos.y, z: t.pos.z });
                } else if (t.pos.x - this.scene.player.pos.x < -672) {
                    t.jumpToPosition({ x: t.pos.x + 1344, y: t.pos.y, z: t.pos.z });
                }
                if (t.pos.z - this.scene.player.pos.z > 672) {
                    t.jumpToPosition({ x: t.pos.x, y: t.pos.y, z: t.pos.z - 1344 });
                } else if (t.pos.z - this.scene.player.pos.z < -672) {
                    t.jumpToPosition({ x: t.pos.x, y: t.pos.y, z: t.pos.z + 1344 });
                }
            }
        }
        
    }

    destroy() {

    }
}