import PanelElevator from "../../ui/panelElevator.js";

export default class LevelHangar00{
    constructor(_scene){
        this.scene = _scene;

        this.objects = [];
        this.objects.push(this.scene.geometryController.loadModel("ElevatorBase", "modElevatorBase", {
            x: 0,
            y: 0,
            z: 0
        }));
        this.objects.push(this.scene.geometryController.loadModel("ElevatorDoorRight", "modElevatorDoor", {
            x: 8,
            y: 0,
            z: 30
        }));
        this.objects.push(this.scene.geometryController.loadModel("ElevatorDoorLeft", "modElevatorDoor", {
            x: -8,
            y: 0,
            z: 30
        }));
        this.objects.push(this.scene.geometryController.loadModel("ElevatorButton", "modElevatorButton", {
            x: 22,
            y: -22,
            z: 31.9
        }));
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

        this.elevatorDoorRight = this.objects[1];
        this.elevatorDoorLeft = this.objects[2];
        this.btnElevator = this.objects[3];

        let _this = this;

        this.elevatorDoorRight.data = {
            positions: [
                _this.elevatorDoorRight.pos.x,
                _this.elevatorDoorRight.pos.x + 12
            ],
            currentPosition: 1
        }
        this.elevatorDoorLeft.data = {
            positions: [
                _this.elevatorDoorLeft.pos.x,
                _this.elevatorDoorLeft.pos.x - 12
            ],
            currentPosition: 1
        }
        this.elevatorDoorRight.action = () => {
            _this.elevatorDoorRight.mover.isMoving = true;
            _this.elevatorDoorRight.mover.target.pos.spd = 0.1;
            _this.elevatorDoorRight.mover.target.pos.x = _this.elevatorDoorRight.data.positions[_this.elevatorDoorRight.data.currentPosition];
            _this.elevatorDoorLeft.mover.isMoving = true;
            _this.elevatorDoorLeft.mover.target.pos.spd = 0.1;
            _this.elevatorDoorLeft.mover.target.pos.x = _this.elevatorDoorLeft.data.positions[_this.elevatorDoorLeft.data.currentPosition];
        };
        this.elevatorDoorLeft.action = () => {
            _this.elevatorDoorRight.action();
        }
        this.elevatorDoorRight.action();

        
        this.btnElevator.data = {
            open: true
        }
        this.btnElevator.interact = () => {
            /*_this.btnElevator.data.open = !_this.btnElevator.data.open;
            if (_this.btnElevator.data.open === true) {
                _this.elevatorDoorRight.data.currentPosition = 1;
                _this.elevatorDoorLeft.data.currentPosition = 1;
            } else {
                _this.elevatorDoorRight.data.currentPosition = 0;
                _this.elevatorDoorLeft.data.currentPosition = 0;
            }
            _this.elevatorDoorRight.action();*/
            this.scene.player.setMode(PLAYERMODE.INTERACT);
            this.scene.player.panel = new PanelElevator(this.scene);
        }

        //CHARACTERS
        this.engineer = this.scene.geometryController.loadModel("engineer", "modCharacterEngineer", {
            x: 13,
            y: 60,
            z: 196
        });
        this.engineer.setDrawMode(DRAWMODE.BILLBOARD);
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