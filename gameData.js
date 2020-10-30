let Player = require("./player");

class GameData {
    constructor() {
        this.players = [];
    }

    update(){
        
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