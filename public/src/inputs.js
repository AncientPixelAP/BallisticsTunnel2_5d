let INPUTS = {
    stickLeft: {
        name: "stickLeft",
        horizontal: 0,
        vertical: 0,
        asKey: {
            up: createMyKey("stickLeftUp"),
            down: createMyKey("stickLeftDown"),
            right: createMyKey("stickLeftRight"),
            left: createMyKey("stickLeftLeft"),
        }
    }, stickRight: {
        name: "stickRight",
        horizontal: 0,
        vertical: 0,
        asKey: {
            up: createMyKey("stickRightUp"),
            down: createMyKey("stickRightDown"),
            right: createMyKey("stickRightRight"),
            left: createMyKey("stickRightLeft"),
        }
    },
    btnA: createMyKey("btnA"),
    btnB: createMyKey("btnB"),
    btnX: createMyKey("btnX"),
    btnY: createMyKey("btnY"),
    btnStart: createMyKey("btnStart"),
    btnPause: createMyKey("btnPause"),
    btnShoulderLeft: createMyKey("btnShoulderLeft"),
    btnShoulderRight: createMyKey("btnShoulderRight"),
    btnTriggerLeft: createMyKey("btnTriggerLeft"),
    btnTriggerRight: createMyKey("btnTriggerRight"),
    btnUp: createMyKey("btnUp"),
    btnDown: createMyKey("btnDown"),
    btnLeft: createMyKey("btnLeft"),
    btnRight: createMyKey("btnRight"),
}

function createMyKey(_name){
    return {
        name: _name,
        pressed: false,
        justPressed: false,
        justReleased: false,
        pressedTime: 0,
        value: 0
    }
}