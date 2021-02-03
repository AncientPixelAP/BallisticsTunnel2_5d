export default function() {

    // Preloader scene
    return new Phaser.Class({
        Extends: Phaser.Scene,
        initialize: function Preloader() {
            Phaser.Scene.call(this, { key: "Preloader" })
        },

        preload: function() {
            this.load.setBaseURL("./assets/");
            this.load.bitmapFont("pixelmix", "fonts/pixelmix.png", "fonts/pixelmix.xml");
            this.load.bitmapFont("pixochrome", "fonts/pixochrome_8.png", "fonts/pixochrome_8.xml");

            this.load.bitmapFont("bravenewEra_16", "fonts/bravenewEra_16.png", "fonts/bravenewEra_16.xml");
            this.load.bitmapFont("empire_16", "fonts/empire_16.png", "fonts/empire_16.xml");
            this.load.bitmapFont("omikron_16", "fonts/omikron_16.png", "fonts/omikron_16.xml");
            this.load.bitmapFont("racer_16", "fonts/racer_16.png", "fonts/racer_16.xml");
            this.load.bitmapFont("radar_16", "fonts/radar_16.png", "fonts/radar_16.xml");

            this.load.image("sprPixelMan", "sprites/splashscreen/sprPixelMan.png");
            this.load.spritesheet("sprPixelTurn", "sprites/splashscreen/sprPixelTurn.png", {frameWidth: 32, frameHeight: 32});
        },

        create: function() {
            this.cameras.main.setBackgroundColor(0x000000);
            this.load.off("progress", this.update_progress_display, this);

            this.cache.bitmapFont.get("pixelmix").data.lineHeight = 40;
            this.scene.start("ScnLoad");
        }
    })

}