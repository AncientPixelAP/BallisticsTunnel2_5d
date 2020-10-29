class Player {
    constructor(_id) {
        this.id = _id;

        this.trackPos = 128;
        this.sprite = "sprBike00";
        this.roll = Math.PI * -0.5;
        this.spd = 0;
    }
}
module.exports = Player;