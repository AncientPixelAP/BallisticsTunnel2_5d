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
        this.editCollisions = false;

        this.textures = {
            palette:  [[
                "texElevatorWall00",
                "texElevatorWall01",
                "texElevatorDoor00",
                "texElevatorDoor01",
                "texMetalDark00",
                "texMetalDark01",
                "texElevatorLight00",
                "texElevatorLight01",
                "texAirVentRotor00",
                "texTrasseYellow00"
            ],[
                "texMetalHangar00",
                "texMetalHangar01",
                "texMetalHangar02",
                "texMetalHangarLineEnd",
                "texMetalHangarLineStraight",
                "texMetalHangarLineCurve",
                "texMetalHangarLineT",
                "texMetalHangar03",
                "texMetalHangar04",
                "texWallGrind01"
            ],[
                "sprDebugTexture",
                "sprLogoArashi",
                "sprAdvertTeamArashi",
                "texPainting16x16Dart",
                "texSegStartTunnel00",
                "texSegStartTunnel02",
                "mechanic"
            ], [
                "texPlatingRed00",
                "texPlatingRed01",
                "texPlatingRed02",
                "texPlatingRed03",
                "texPlatingRed04",
                "texPlatingRed05",
                "texPlatingRed06",
                "texPlatingRed07",
                "texPlatingRed08",
                "texPlatingRed09",
            ], [
                "texPlatingYellow00",
                "texPlatingYellow01"
            ],[
                "texGlass00",
                "texGlass01",
                "texGlass02",
                "texGrating00",
                "texGrating01",
                "texGrating02",
                "texPadding00",
                "texPadding01",
                "texPadding02"
            ]],
            position: 0,
            bank: 0
        }
        

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
        this.scene.numkeys.five.on("up", (_key, _event) => {
            if(this.quad !== null){
                this.quad.recalculatePosition();
            }
        }, this);

        this.scene.numkeys.plus.on("up", (_key, _event) => {
            if (this.quad !== null) {
                this.quad.cyclePoints(true);
            }
        }, this);
        this.scene.numkeys.minus.on("up", (_key, _event) => {
            if (this.quad !== null) {
                this.quad.cyclePoints(false);
            }
        }, this);

        //texture bank and palette
        this.scene.input.on("wheel", (_pointer, _gameObjs, _deltaX, _deltaY, _deltaZ) => {
            //change texture bank
            if (this.scene.keys.z.isDown) {
                if (_deltaY > 0) {
                    this.textures.bank -= 1;
                } else if (_deltaY < 0) {
                    this.textures.bank += 1;
                }
                this.textures.bank = Math.max(0, Math.min(this.textures.bank, this.textures.palette.length-1));

                this.textures.position = Math.max(0, Math.min(this.textures.position, this.textures.palette[this.textures.bank].length-1));
                if(this.quad !== null){
                    this.quad.setTexture(this.textures.palette[this.textures.bank][this.textures.position], 0);
                }
            }
            //flip through texture
            if (this.scene.keys.t.isDown) {
                //console.log(_deltaY); //-100 to 100
                if(_deltaY > 0){
                    this.textures.position -= 1;
                }else if(_deltaY < 0){
                    this.textures.position += 1;
                }
                this.textures.position = Math.max(0, Math.min(this.textures.position, this.textures.palette[this.textures.bank].length-1));
                if(this.quad !== null){
                    this.quad.setTexture(this.textures.palette[this.textures.bank][this.textures.position], 0);
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

        //delete selected quad
        this.scene.keys.del.on("up", (_key, _event) => {
            if (this.model != null) {
                this.model.deleteQuad(this.quad, this.editCollisions);
            }
        }, this);

        //log model
        this.scene.keys.end.on("up", (_key, _event) => {
            if(this.model != null){
                this.model.log();
            }
        }, this);

        //flick current model in debug mode - this is ONLY drawing the collision boxes
        this.scene.keys.m.on("up", (_key, _event) => {
            if (this.model != null) {
                this.model.toggleDrawCollisions();
                //press spacbar too to edit collision boxes
                if (this.scene.keys.q.isDown) {
                    this.toggleEditCollisions();
                    if (this.model.debug.drawCollisions === false){
                        this.model.toggleDrawCollisions();
                    }
                }
            }
        }, this);

        //toggle editor
        this.scene.keys.e.on("down", (_key, _event) => {
            _event.stopPropagation();
            if (this.scene.keys.q.isDown) {
                this.toggleEditor();
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
            this.scene.hand.setMouseLock(false);
        } else {
            for (let p of this.points) {
                p.alpha = 0;
            }
            this.scene.hand.setMouseLock(true);
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
                type: this.quad.type,
                texture: this.quad.texture,
                frame: this.quad.frame,
                position: {
                    x: this.quad.pos.x + this.model.pos.x,
                    y: this.quad.pos.y + this.model.pos.y,
                    z: this.quad.pos.z + this.model.pos.z,
                },
                points: [
                    {
                        x: this.quad.points[0].x,
                        y: this.quad.points[0].y,
                        z: this.quad.points[0].z,
                    }, {
                        x: this.quad.points[1].x,
                        y: this.quad.points[1].y,
                        z: this.quad.points[1].z,
                    }, {
                        x: this.quad.points[2].x,
                        y: this.quad.points[2].y,
                        z: this.quad.points[2].z,
                    }, {
                        x: this.quad.points[3].x,
                        y: this.quad.points[3].y,
                        z: this.quad.points[3].z,
                    }
                ]
            });

            this.quad = this.editCollisions ? model[0].collisionData[model[0].collisionData.length - 1] : model[0].quadData[model[0].quadData.length-1];
        }else{
            console.log("couldnt find model!");
        }
        //console.log(model);
    }

    toggleEditCollisions(){
        this.editCollisions = !this.editCollisions;
        if(this.editCollisions === true){
            console.log("edit collisions enabled");
        }else{
            console.log("edit collisions disabled");
        }
    }
}