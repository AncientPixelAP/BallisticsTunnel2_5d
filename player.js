class Player {
    constructor(_id, _data) {
        this.id = _id;

        this.trackPos = 128;
        this.sprite = "sprBike00";
        this.roll = Math.PI * -0.5;
        this.radius = 24;
        this.spd = 0;
        this.laps = 0;

        this.lapTime = 0;
        this.bestLapTime = 0;

        this.lounge = {
            in: true,
            pos: {
                x: 0,
                y: 0,
                z: 0
            }
        }

        this.data = _data;
    }
}
module.exports = Player;