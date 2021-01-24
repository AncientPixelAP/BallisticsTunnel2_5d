export default class Editor {
    constructor(_scene) {
        this.scene = _scene;

        this.enabled = true;
        this.points = [
            this.scene.add.sprite(0, 0, "sprDebugQuadPoint1"),
            this.scene.add.sprite(0, 0, "sprDebugQuadPoint2"),
            this.scene.add.sprite(0, 0, "sprDebugQuadPoint3"),
            this.scene.add.sprite(0, 0, "sprDebugQuadPoint4")//,
            //this.add.sprite(0, 0, "sprDebugQuadPoint4"),
            //this.add.sprite(0, 0, "sprDebugQuadPointCenter")
        ];
        this.editPointsEnabled = [false, false, false, false];
        this.quad = null;
        this.model = null;
        this.pressed = false;

        //setup Editor key grabs
        //grab quads edge points
        this.scene.keys.one.on("up", (_key, _event) => {
            this.toggleEditPoint(0);
        }, this);
        this.scene.keys.two.on("up", (_key, _event) => {
            this.toggleEditPoint(1);
        }, this);
        this.scene.keys.three.on("up", (_key, _event) => {
            this.toggleEditPoint(2);
        }, this);
        this.scene.keys.four.on("up", (_key, _event) => {
            this.toggleEditPoint(3);
        }, this);
        this.scene.keys.five.on("up", (_key, _event) => {
            this.toggleEditPoint(0);
            this.toggleEditPoint(1);
            this.toggleEditPoint(2);
            this.toggleEditPoint(3);
        }, this);

        //move quad keys
        this.scene.numkeys.eight.on("up", (_key, _event) => {
            for (let [i, e] of this.editPointsEnabled.entries()) {
                if (e === true) {
                    this.moveToolPoint(i, { x: Math.sin(this.scene.cam.dir.yaw) * -4, y: 0, z: Math.cos(this.scene.cam.dir.yaw) * 4 });
                }
            }
        }, this);
        this.scene.numkeys.two.on("up", (_key, _event) => {
            for (let [i, e] of this.editPointsEnabled.entries()) {
                if (e === true) {
                    this.moveToolPoint(i, { x: Math.sin(this.scene.cam.dir.yaw) * 4, y: 0, z: Math.cos(this.scene.cam.dir.yaw) * -4 });
                }
            }
        }, this);
        this.scene.numkeys.four.on("up", (_key, _event) => {
            for (let [i, e] of this.editPointsEnabled.entries()) {
                if (e === true) {
                    this.moveToolPoint(i, { x: Math.sin(this.scene.cam.dir.yaw - HALFPI) * 4, y: 0, z: Math.cos(this.scene.cam.dir.yaw - HALFPI) * -4 });
                }
            }
        }, this);
        this.scene.numkeys.six.on("up", (_key, _event) => {
            for (let [i, e] of this.editPointsEnabled.entries()) {
                if (e === true) {
                    this.moveToolPoint(i, { x: Math.sin(this.scene.cam.dir.yaw + HALFPI) * 4, y: 0, z: Math.cos(this.scene.cam.dir.yaw + HALFPI) * -4 });
                }
            }
        }, this);
        this.scene.numkeys.nine.on("up", (_key, _event) => {
            for (let [i, e] of this.editPointsEnabled.entries()) {
                if (e === true) {
                    this.moveToolPoint(i, { x: 0, y: -4, z: 0 });
                }
            }
        }, this);
        this.scene.numkeys.three.on("up", (_key, _event) => {
            for (let [i, e] of this.editPointsEnabled.entries()) {
                if (e === true) {
                    this.moveToolPoint(i, { x: 0, y: 4, z: 0 });
                }
            }
        }, this);

        //duplicate quad
        this.scene.keys.n.on("up", (_key, _event) => {
            if(this.quad != null){
                this.duplicateQuad(this.quad.pos);
            }else{
                this.duplicateQuad({x: 0, y: 0, z: 0});
            }
        }, this);

        //log model
        this.scene.keys.end.on("up", (_key, _event) => {
            if(this.model != null){
                this.model.log();
            }
        }, this);
    }

    update() {
        //mark quad points
        if (this.quad !== null) {
            for (let [i, p] of this.quad.screenCoords.entries()) {
                this.points[i].x = p.x;
                this.points[i].y = p.y;
            }
        }
    }

    toggleEditor() {
        this.enabled = !this.enabled;
        if (this.enabled === true) {
            for (let p of this.points) {
                p.alpha = 1;
            }
        } else {
            for (let p of this.points) {
                p.alpha = 0;
            }
        }
        console.log("EDITOR " + (this.enabled ? "ENABLED" : "DISABLED"));
    }

    toggleEditPoint(_ptNum) {
        this.editPointsEnabled[_ptNum] = !this.editPointsEnabled[_ptNum];
        if (this.editPointsEnabled[_ptNum] === true) {
            this.points[_ptNum].setTint(0x00e436);
        } else {
            this.points[_ptNum].setTint(0xff77a8);
        }
    }

    moveToolPoint(_pt, _pos) {
        this.quad.points[_pt].x += _pos.x;
        this.quad.points[_pt].y += _pos.y;
        this.quad.points[_pt].z += _pos.z;

        this.quad.points[_pt].x = Math.round(this.quad.points[_pt].x / 4) * 4;
        this.quad.points[_pt].y = Math.round(this.quad.points[_pt].y / 4) * 4;
        this.quad.points[_pt].z = Math.round(this.quad.points[_pt].z / 4) * 4;
    }

    duplicateQuad(_pos){
        let model = this.scene.geometryController.getModelById(this.quad.modelId);
        if(model.length > 0){
            model[0].addQuadFromData({
                type: "quad",
                texture: this.quad.texture,
                frame: this.quad.frame,
                position: {
                    x: this.quad.pos.x,
                    y: this.quad.pos.y,
                    z: this.quad.pos.z,
                },
                points: [
                    {
                        x: this.quad.points[0].x,
                        y: this.quad.points[0].y,
                        z: this.quad.points[0].z
                    }, {
                        x: this.quad.points[1].x,
                        y: this.quad.points[1].y,
                        z: this.quad.points[1].z
                    }, {
                        x: this.quad.points[2].x,
                        y: this.quad.points[2].y,
                        z: this.quad.points[2].z
                    }, {
                        x: this.quad.points[3].x,
                        y: this.quad.points[3].y,
                        z: this.quad.points[3].z
                    }
                ]
            });

            this.quad = model[0].quadData[model[0].quadData.length-1];
        }else{
            console.log("couldnt find model!");
        }
        //console.log(model);
    }
}