export default class MovingGrid{
    constructor(_scene, _sizeX, _sizeY, _cellSize){
        this.scene = _scene;
        this.size = {
            x: _sizeX,
            y: _sizeY
        }
        this.cellSize = _cellSize;

        this.points = [];
        for (let yy = 0; yy < this.size.y; yy += this.cellSize){
            for (let xx = 0; xx < this.size.x; xx += this.cellSize) {
                this.points.push({
                    id: this.points.length,
                    x: xx - this.scene.game.config.width * 0.5,
                    y: yy - this.scene.game.config.height * 0.5,
                    sprite: this.scene.add.sprite(xx, yy, "sprUiMenuBg")
                });
            }
        }

        this.pointers = [];
    }

    update(){
        for(let m of this.pointers){
            for(let p of this.points){
                let a = Phaser.Math.Angle.Between(p.x, p.y, m.x, m.y);
                let d = Phaser.Math.Distance.Between(m.x, m.y, p.x, p.y);
                if (d < m.influence) {
                    p.sprite.x = p.x + Math.cos(a) * Math.min(d * 0.25, ((m.influence * 2) / d));
                    p.sprite.y = p.y + Math.sin(a) * Math.min(d * 0.25, ((m.influence * 2) / d));
                } else {
                    p.sprite.x = p.x;
                    p.sprite.y = p.y;
                }
            }
        }
    }

    addPointer(_id, _x, _y, _influence){
        this.pointers.push({
            id: _id,
            influence: _influence,
            pos: {
                x: _x,
                y: _y
            }
        });
    }

    updatePointer(_id, _x, _y, _influence){
        let m = this.pointers.filter(el => el.id === _id)[0];
        m.x = _x;
        m.y = _y;
        m.influence = _influence;
    }

    removePointerById(_id){
        for(let i = this.pointers.length-1 ; i >= 0 ; i--){
            if(this.pointers[i].id === _id){
                this.pointers.splice(i, 1);
            }
        }
    }

    destroy(){
        for(let p of this.points){
            p.sprite.destroy();
        }
    }
}