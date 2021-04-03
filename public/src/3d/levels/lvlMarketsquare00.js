export default class LevelMarketsquare00{
    constructor(_scene){
        this.scene = _scene;

        this.ref = this.scene.geometryController.loadModel("Marketsquare Apartements", "modMarketsquareApartements", {
            x: 0,
            y: 0,
            z: 0
        });

        this.barbara = this.scene.geometryController.loadModel("Saint Barbara", "modCharacterStBarbara", {
            x: 192,
            y: 0,
            z: -96
        });
        this.barbara.setDrawMode(DRAWMODE.BILLBOARD);
        this.barbara.interactable = true;
        this.barbara.interact = () => {
            this.scene.player.jumpToPosition({ x: 0, y: 0, z: 0 });
            this.scene.loadLevel("dream01");
        }
        
    }

    update(){
        
    }

    destroy() {

    }
}