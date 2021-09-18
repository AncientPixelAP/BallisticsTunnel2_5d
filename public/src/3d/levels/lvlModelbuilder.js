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

        this.trees = [];
        for(let y = -10 ; y <= 10 ; y++){
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
        }
    }

    update(){
        //this.hooman.lookDir.yaw += 0.05;
        
        if(this.state === 0){
            for(let t of this.trees){
                let d = 512 - this.scene.player.pos.z;
                let a = (Math.PI * 0.5) * (d/512);
                t.jumpToRotation({ yaw: 0, pitch: a, roll: 0 });
                t.jumpToPosition({ x: t.pos.x, y: Math.cos(a + (Math.PI * 0.5)) * t.data.radius, z: 512 + Math.sin(a + (Math.PI * 0.5)) * t.data.radius });
                if(d <= 0){
                    this.state = 1;
                }
            }
        }else{
            //infinite forest
            for (let t of this.trees) {
                if (t.pos.x - this.scene.player.pos.x > 704) {
                    t.jumpToPosition({ x: t.pos.x - 1280, y: t.pos.y, z: t.pos.z });
                } else if (t.pos.x - this.scene.player.pos.x < -704) {
                    t.jumpToPosition({ x: t.pos.x + 1280, y: t.pos.y, z: t.pos.z });
                }
                if (t.pos.z - this.scene.player.pos.z > 704) {
                    t.jumpToPosition({ x: t.pos.x, y: t.pos.y, z: t.pos.z - 1280 });
                } else if (t.pos.z - this.scene.player.pos.z < -704) {
                    t.jumpToPosition({ x: t.pos.x, y: t.pos.y, z: t.pos.z + 1280 });
                }
            }
        }
        
    }

    destroy() {

    }
}