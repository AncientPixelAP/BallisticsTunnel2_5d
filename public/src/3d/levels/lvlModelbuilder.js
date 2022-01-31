export default class LevelModelbuilder{
    constructor(_scene){
        this.scene = _scene;

        this.waters = [];
        for(let xx = -5 ; xx < 5 ; xx++){
            for(let yy = -5 ; yy < 5 ; yy++){
                this.waters.push(this.scene.geometryController.loadModel("water", "modGraswater", {
                    x: xx * 160,
                    y: 0,
                    z: yy * 160
                }));
                this.waters[this.waters.length - 1].flags.draw = true;
            }
        }

        this.shiffchen = this.scene.geometryController.loadModel("schiffchen", "modSchiffchen", {
            x: 0,
            y: 0,
            z: 0
        });
        this.shiffchen.flags.draw = true;

        this.tower = this.scene.geometryController.loadModel("tower", "modTower", {
            x: -428,
            y: 0,
            z: -356
        });
        this.tower.flags.draw = true;

        this.trees = [];
        this.trees.push(this.scene.geometryController.loadModel("ref", "modTree00", {
            x: 16,
            y: 0,
            z: 32
        }));
        this.trees.push(this.scene.geometryController.loadModel("ref", "modTree00", {
            x: -16,
            y: 0,
            z: -128
        }));
        this.trees.push(this.scene.geometryController.loadModel("ref", "modTree00", {
            x: -32,
            y: 0,
            z: 96
        }));
        this.trees.push(this.scene.geometryController.loadModel("ref", "modTree00", {
            x: 48,
            y: 0,
            z: -256
        }));
        for(let t of this.trees){
            t.setDrawMode(DRAWMODE.BILLBOARD);
            t.flags.draw = true;
        }

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
    }

    update(){
        //this.hooman.lookDir.yaw += 0.05;
    }

    destroy() {

    }
}