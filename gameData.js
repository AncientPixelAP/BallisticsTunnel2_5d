let Player = require("./player");

class GameData {
    constructor() {
        this.players = [];
        this.lapsToFinish = 5;
        this.currentTrack = 0;
        this.maxTracks = 3;
        this.allFinished = false;
    }

    update(){
        this.allFinished = true;
        for(let p of this.players){
            if (p.laps <= this.lapsToFinish){
                this.allFinished = false;
            }
        }
    }

    switchToNextTrack(){
        this.currentTrack += 1;
        if(this.currentTrack >= this.maxTracks){
            this.currentTrack = 0;
        }
    }

    switchToTrack(_no){
        this.currentTrack = _no;
    }

    addPlayer(_id, _data){
        this.players.push(new Player(_id, _data));
    }

    removePlayer(_id) {
        for (let i = this.players.length - 1; i >= 0; i--) {
            if (this.players[i].id === _id) {
                this.players.splice(i, 1);
            }
        }
    }
}
module.exports = GameData;