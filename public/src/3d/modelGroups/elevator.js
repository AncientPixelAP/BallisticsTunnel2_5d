import PanelElevator from "../../ui/panelElevator.js";

export default class ElevatorGroup{
    constructor(_scene, _level, _pos){
        this.scene = _scene;
        this.level = _level;

        this.elevatorBase = this.scene.geometryController.loadModel("ElevatorBase", "modElevatorBase", {
            x: _pos.x,
            y: _pos.y,
            z: _pos.z
        });
        this.elevatorDoorRight = this.scene.geometryController.loadModel("ElevatorDoorRight", "modElevatorDoor", {
            x: _pos.x + 8,
            y: _pos.y,
            z: _pos.z + 30
        });
        this.elevatorDoorLeft = this.scene.geometryController.loadModel("ElevatorDoorLeft", "modElevatorDoor", {
            x: _pos.x - 8,
            y: _pos.y,
            z: _pos.z + 30
        });
        this.elevatorBtn = this.scene.geometryController.loadModel("ElevatorButton", "modElevatorButton", {
            x: _pos.x + 22,
            y: _pos.y - 22,
            z: _pos.z + 31
        });
        /*for (let e of this.elevator) {
            e.flags.draw = !e.flags.draw;
        }*/
        //TODO maybe make own elevator class with context to level that manages all the sub objects
        //trains could work like that too
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
        this.elevatorBtn.data = {
            open: true
        }
        this.elevatorBtn.interactable = true;
        this.elevatorBtn.interact = () => {
            this.scene.player.setMode(PLAYERMODE.INTERACT);
            this.scene.player.panel = new PanelElevator(this.scene);
        }

        this.flags = {
            draw: false
        }
    }

    setDraw(_bool){
        this.elevatorBase.flags.draw = _bool;
        this.elevatorDoorRight.flags.draw = _bool;
        this.elevatorDoorLeft.flags.draw = _bool;
        this.elevatorBtn.flags.draw = _bool;

        this.flags.draw = _bool;
    }

    setDoor(_bool){
        let p = 0;
        if(_bool === true){
            p = 1;
        }
        this.elevatorDoorRight.action = () => {
            this.elevatorDoorRight.mover.isMoving = true;
            this.elevatorDoorRight.mover.target.pos.spd = 0.1;
            this.elevatorDoorRight.mover.target.pos.x = _this.elevatorDoorRight.data.positions[p];
            this.elevatorDoorLeft.mover.isMoving = true;
            this.elevatorDoorLeft.mover.target.pos.spd = 0.1;
            this.elevatorDoorLeft.mover.target.pos.x = _this.elevatorDoorLeft.data.positions[p];
        };
        this.elevatorDoorLeft.action = () => {
            this.elevatorDoorRight.action();
        }
    }

    update(){

    }

    destroy(){

    }
}