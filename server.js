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

    for(let p of gameData.players){
        //get sector update
        /*io.to(p.id).emit("sectorUpdate", {
            sectorData: p.sector, 
            playersAtLocation: getPlayersAtLocation(p.locationId),
            npcsAtLocation: getNPCsAtLocation(p.locationId),
            groupData: gameData.group
        });*/
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
        gameData.addPlayer(id);
        io.to(id).emit("getPlayers", {
            you: gameData.players[gameData.players.length-1],
            playersData: gameData.players
        });
    });

    socket.on("updatePlayer", (_data) => {
        let p = getPlayerById(_data.id);
        if(p !== null){
            p.spd = _data.spd;
            p.roll = _data.roll;
            p.trackPos = _data.trackPos;
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