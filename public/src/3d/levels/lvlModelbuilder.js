export default class LevelModelbuilder{
    constructor(_scene){
        this.scene = _scene;

        this.ref = this.scene.geometryController.loadModel("ref", "modMetroCarriageEnd", {
            x: 0,
            y: 0,
            z: 0
        });
        this.ref.flags.draw = true;



        /*this.ref = this.scene.geometryController.loadModel("debug Tile", "modDebugTile", {
            x: 16,
            y: 0,
            z: 180
        });

        this.hooman = this.scene.geometryController.loadModel("turnAroundTest", "modCharacterTurnaroundTest", {
            x: 16,
            y: 0,
            z: 180
        });
        this.hooman.setDrawMode(DRAWMODE.BILLBOARD);
        this.hooman.flags.draw = true;
        this.hooman.flags.is8way = true;

        this.elevator = this.scene.geometryController.loadModel("ElevatorBase", "modElevatorBase", {
            x: 0,
            y: 0,
            z: -16
        });
        this.elevator.flags.draw = true;*/

        /*this.ships = [];
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
        }*/
    }

    update(){
        //this.hooman.lookDir.yaw += 0.05;
    }

    destroy() {

    }
}