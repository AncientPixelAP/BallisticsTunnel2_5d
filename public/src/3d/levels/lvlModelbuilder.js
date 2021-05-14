export default class LevelModelbuilder{
    constructor(_scene){
        this.scene = _scene;

        /*this.ref = this.scene.geometryController.loadModel("Player Apartement", "modPlayerApartement", {
            x: 0,
            y: 0,
            z: 0
        });*/

        /*this.ref = this.scene.geometryController.loadModel("MetroCarriage", "modMetroCarriageOutside", {
            x: 0,
            y: 0,
            z: 0
        });
        this.ref.flags.draw = true;*/

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
            s.flag.draw = true;
        }
    }

    update(){
        
    }

    destroy() {

    }
}