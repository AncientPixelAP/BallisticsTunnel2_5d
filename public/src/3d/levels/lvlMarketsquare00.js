import ElevatorGroup from "../modelGroups/elevator.js";

export default class LevelMarketsquare00{
    constructor(_scene){
        this.scene = _scene;

        this.elevator = new ElevatorGroup(this.scene, this, {x: 256, y: 16, z: -96});
        this.elevator.setDraw(true);

        this.marketsquare = this.scene.geometryController.loadModel("Marketsquare Apartements", "modMarketsquareApartements", {
            x: 0,
            y: 0,
            z: 0
        });
        this.marketsquare.flags.draw = true;

        this.lounge = this.scene.geometryController.loadModel("Drivers Lounge", "modLounge", {
            x: 176,
            y: -60,
            z: 192
        });
        this.lounge.flags.draw = true;

        this.barbara = this.scene.geometryController.loadModel("Saint Barbara", "modCharacterStBarbara", {
            x: 192,
            y: 0,
            z: -96
        });
        this.barbara.setDrawMode(DRAWMODE.BILLBOARD);
        this.barbara.interactable = true;
        this.barbara.interact = () => {
            this.scene.player.jumpToPosition({ x: 0, y: 0, z: 0 });
            this.scene.loadLevel("dream01");
        }
        this.barbara.flags.draw = true;

        this.ship = this.scene.geometryController.loadModel("ShipHamptonAegis", "modShipHamptonAegis", {
            x: -16,
            y: 0,
            z: 168
        });
        this.ship.flags.draw = true;
        this.ship.translateAndRotate({ x: 0, y: 0, z: 0 }, { yaw: 0, pitch: Math.PI * 0.5, roll: 0});

        //TRIGGER
        
    }

    update(){
        
    }

    destroy() {

    }
}