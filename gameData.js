let Player = require("./player");

class GameData {
    constructor() {
        this.players = [];
        this.lapsToFinish = 5;
        this.currentTrack = 0;
        this.maxTracks = 4;
        this.allFinished = false;
        this.finishTimer = null;

        this.states = {
            racing: 0,
            waitToFinish: 1,
            finished: 2,
        }

        this.state = this.states.racing;
    }

    update(){


        switch(this.state){
            case this.states.racing:
                this.allFinished = false;
                for (let p of this.players) {
                    if (p.laps <= this.lapsToFinish) {
                    } else {
                        if (this.finishTimer === null) {
                            this.state = this.states.waitToFinish;
                            this.finishTimer = setInterval(() => {
                                this.allFinished = true;
                                this.state = this.states.finished;
                            }, this.players.length > 1 ? p.bestLapTime : 5000);
                        }
                    }
                }
                break;
            case this.states.waitToFinish:
                break;
            case this.states.finished:
                //this.allFinished = false;
                break;
            default:
                break;
        }
    }

    goRacing(){
        this.state = this.states.racing;
        this.allFinished = false;
        clearInterval(this.finishTimer);
        this.finishTimer = null;
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