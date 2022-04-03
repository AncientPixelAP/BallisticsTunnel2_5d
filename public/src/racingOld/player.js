export class Player{
    constructor(_scene, _bikeData){
        this.scene = _scene;
        this.stats = _bikeData;

        this.waitingTunnel = false;
        this.inSlipstream = false;
        this.justOutOfSlipstream = false;
        this.controls = SHIPCONTROLS.free;
        this.energy = 100;
        this.heat = 0;
        this.spd = 0;
        this.spdMax = 0.25;
        this.slipstreamBoost = 0;
        this.vel = {
            x: 0,
            y: 0,
            z: 0
        };
        this.radius = 24;
        this.yaw = 0;
        this.pitch = 0;
        this.roll = 0;
        this.pos = {
            x: 0,
            y: 0,
            z: 0,
            to: {
                x: 0,
                y: 0,
                z: 0
            }
        };
        this.trackPos = this.trackLength-64;
        this.position = -1;
        this.laps = 0;
        this.lapTime = {
            current: 0,
            best: -1,
            start: -1
        };

        this.antigravs = [];

        this.sndEngine = this.scene.sound.add("sndEngine00", { loop: true, volume: OPTIONS.sound.sfx});
    }

    update(){

    }
}