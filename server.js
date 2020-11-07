var port = process.env.PORT || 3000;
var express = require('express');
var app = express();
let server = app.listen(port, () => {
    console.log("running on port " + String(port));
});

app.use(express.static(__dirname  + "/public"));

let socket = require("socket.io");
let io = socket(server);

let GameData = require("./gameData");
let gameData = new GameData();

let tick = setInterval(() => { 
    gameData.update();

    if (gameData.allFinished === true && gameData.players.length > 0) {
        gameData.switchToNextTrack();
        console.log("players finished");
    }

    for(let p of gameData.players){
        if(gameData.allFinished === true){
            io.to(p.id).emit("switchTrack", {
                track: gameData.currentTrack
            });
        }

        io.to(p.id).emit("synchUpdate", {
            playersData: gameData.players
        })
    }
}, 100);

io.on("connection", socket => {
    console.log(socket.id);
    let id = socket.id;

    //TEST
    socket.on("pingTest", (_data) => {
        console.log("ping!");
        io.emit("pongTest", _data);
    });
    socket.on("foo", () => {
        console.log("foobar!");
        io.emit("bar", {text: "bar"});
    });


    //PLAYERS
    socket.on("joinPlayer", (_data) => {
        gameData.addPlayer(id, _data.bikeData);
        io.to(id).emit("getPlayers", {
            you: gameData.players[gameData.players.length-1],
            playersData: gameData.players,
            track: gameData.currentTrack
        });
    });

    socket.on("leavePlayer", () => {
        gameData.removePlayer(id);
        io.emit("kickPlayer", {
            id: id
        })
    });

    socket.on("updatePlayer", (_data) => {
        let p = getPlayerById(_data.id);
        if(p !== null){
            p.spd = _data.spd;
            p.roll = _data.roll;
            p.trackPos = _data.trackPos;
            p.laps = _data.laps;
            p.lapTime = _data.lapTime;
            p.bestLapTime = _data.bestLapTime;
        }
    })

    socket.on("quickMessage", (_data) => {
        for(let p of gameData.players){
            if(p.locationId === _data.locationId){
                io.to(p.id).emit("quickMessage", {
                    txt: _data.txt
                });
            }
        }
    });

    //ORDERS
    socket.on("forceSwitchTrack", (_data) => {
        gameData.switchToTrack(_data.track);

        for (let p of gameData.players) {
            io.to(p.id).emit("switchTrack", {
                track: gameData.currentTrack
            });
        }
    });

    //DISCONNECT
    socket.on("disconnect", () => {
        console.log("disconnected a client "+ id);

        gameData.removePlayer(id);
        io.emit("kickPlayer", {
            id: id
        })
    })
});


function getPlayerById(_id){
    let arr = gameData.players.filter((p) => {return p.id === _id});
    if(arr.length > 0){
        return arr[0];
    }else{
        return null;
    }
}