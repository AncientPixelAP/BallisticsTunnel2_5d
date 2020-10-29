export default class ScnLoad extends Phaser.Scene {

    constructor() {
        super("ScnLoad");
        this.loadTxt = null;
    }

    preload(){
        this.cameras.main.setBackgroundColor(0x000000);
        this.cameras.main.setScroll(-this.game.config.width * 0.5, -this.game.config.height * 0.5);

        this.load.setBaseURL("./assets/");

        //this.load.image('image0', '0.png');
        //this.load.json("story1", "storyjson/story1.json");
        //this.load.text("locDE", "languageData/deutsch.txt");
        //this.load.audio('decisionLeft', 'audio/decision.wav');
        //this.load.atlas("tilesGrass", "sprites/tiles/grassDirt.png", "sprites/tiles/tilesGround_atlas.json");

        this.load.image("sprBtn00", "sprites/sprBtn00.png");

        this.load.image("sprSegDebug00", "sprites/sprSegDebug00.png");
        this.load.image("sprSegDebug01", "sprites/sprSegDebug01.png");
        this.load.image("sprSegDebug02", "sprites/sprSegDebug02.png");
        this.load.image("sprSegDebug03", "sprites/sprSegDebug03.png");

        this.load.image("sprBike00", "sprites/sprBike00Big.png");
        this.load.image("sprDebugTarget00", "sprites/sprDebugTarget00.png");
        this.load.image("sprDebugArrow00", "sprites/sprDebugArrow00.png");

        this.loadTxt = this.add.bitmapText(0, 0, "pixelmix", "LOADING: 0%", 8, 1).setOrigin(0.5);

        this.load.on('progress', this.update_progress_display, this);
    }

    create(){
        this.load.off("progress", this.update_progress_display, this);

        this.cache.bitmapFont.get("pixelmix").data.lineHeight = 40;
        this.scene.start("ScnLogin");
    }

    update(){

    }

    update_progress_display(_pct) {
        this.loadTxt.setText("LOADING: " + String(Math.floor(_pct * 100)) + "%");
    }
}
