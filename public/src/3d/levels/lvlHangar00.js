import ShipManager from "../../shipManager.js";
import PanelShipselector from "../../ui/panelShipselector.js";
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

        for(let o of this.objects){
            o.flags.draw = true;
        }

        this.ship = this.scene.geometryController.loadModel("ShipHamptonAegis", "modShipHamptonAegis", {
            x: 192,
            y: 56,
            z: 256
        });
        this.ship.flags.draw = true;
        this.ship.interactable = true;
        this.ship.interact = () => {
            this.scene.hand.setMouseLock(false);
            //localStorage.setItem(SAVEGAMENAME, JSON.stringify(this.saveGame));
            this.scene.scene.start("ScnRacing", { 
                bikeData: this.shipStats[this.shipSelect.currentBike],
                livery: this.shipSelect.currentLivery
            });
        }

        this.shipSelector = this.scene.geometryController.loadModel("Ship Seletor", "modHangarComputer", {
            x: 48,
            y: 0,
            z: 308
        });
        this.shipSelector.flags.draw = true;
        this.shipSelector.interactable = true;
        this.shipSelector.interact = () => {
            this.scene.player.setMode(PLAYERMODE.INTERACT);
            this.scene.player.panel = new PanelShipselector(this.scene);
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
        this.engineer.flags.draw = true;
        this.engineer.data = {
            conversation: {
                fileName: "diaHangarMechanic00",
                treePosition: 0
            }
        }
        this.engineer.interactable = true;
        this.engineer.interact = () => {this.scene.player.setMode(PLAYERMODE.DIALOGUE);
            this.scene.player.conversationManager.setNPC(this.engineer);
            this.scene.player.conversationManager.setConversation(this.engineer.data.conversation.fileName, this.engineer.data.conversation.treePosition);
        }

        //TRIGGER
        
    }

    update(){
        
    }

    juggleShip(){

    }

    destroy() {
        /*for (let o of this.objects) {
            o.destroy();
        }
        this.ship.destroy();
        this.engineer.destroy();*/
    }
}