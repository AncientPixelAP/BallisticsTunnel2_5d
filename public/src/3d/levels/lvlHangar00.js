import ShipManager from "../../shipManager.js";
import ElevatorGroup from "../modelGroups/elevator.js";

export default class LevelHangar00{
    constructor(_scene){
        this.scene = _scene;

        this.shipManager = new ShipManager();
        this.shipStats = this.shipManager.shipStats;
        this.shipSelect = {
            currentBike: 0,
            currentLivery: 0
        }

        this.objects = [];
        this.objects.push(this.scene.geometryController.loadModel("HangarHallway", "modHangarHallway", {
            x: 0,
            y: 0,
            z: 52
        }));
        this.objects.push(this.scene.geometryController.loadModel("HangarMain", "modHangarMain", {
            x: 48,
            y: 56,
            z: 276
        }));

        this.objects.push(this.scene.geometryController.loadModel("ShipArashiDart", "modShipArashiDart", {
            x: 256,
            y: 56,
            z: 56
        }));

        this.ship = this.scene.geometryController.loadModel("ShipHamptonAegis", "modShipHamptonAegis", {
            x: 192,
            y: 56,
            z: 256
        });
        this.ship.interactable = true;
        this.ship.interact = () => {
            this.scene.hand.setMouseLock(false);
            //localStorage.setItem(SAVEGAMENAME, JSON.stringify(this.saveGame));
            this.scene.scene.start("ScnMain", { 
                bikeData: this.shipStats[this.shipSelect.currentBike],
                livery: this.shipSelect.currentLivery
            });
        }

        /*this.btnRacing = this.scene.geometryController.loadModel("btnRacing", "modDebugTile", {
            x: 192,
            y: 56,
            z: 256
        });*/

        this.elevator = new ElevatorGroup(this.scene, this, {x: 0, y: 0, z: 0});
        this.elevator.setDraw(true);

        //CHARACTERS
        this.engineer = this.scene.geometryController.loadModel("engineer", "modCharacterEngineer", {
            x: 13,
            y: 60,
            z: 196
        });
        this.engineer.setDrawMode(DRAWMODE.BILLBOARD);

        //TRIGGER
        this.engineer.flags.draw = true;
        this.ship.flags.draw = true;
        this.ship.flags.draw = true;
        for(let o of this.objects){
            o.flags.draw = true;
        }
    }

    update(){
        
    }

    destroy() {
        /*for (let o of this.objects) {
            o.destroy();
        }
        this.ship.destroy();
        this.engineer.destroy();*/
    }
}