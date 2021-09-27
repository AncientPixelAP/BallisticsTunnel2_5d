export default class TrackGenerator{
    constructor(_scene){
        this.scene = _scene;
    }

    createSegment(_curveX, _curveY, _roll, _asset, _subimgArr, _imgSpd, _units) {
        return {
            curve: {
                x: _curveX,
                y: _curveY
            },
            roll: _roll,
            asset: _asset,
            subimgArr: _subimgArr,
            imgSpd: _imgSpd,
            units: _units
        }
    }

    createObstacle(_trackPos, _roll, _len, _asset, _subimgArr, _imgSpd, _collisionZone) {
        return {
            spd: 0,
            rollSpd: 0,
            roll: _roll,
            len: _len,
            trackPos: _trackPos,
            asset: _asset,
            sprite: this.scene.add.sprite(0, 0, _asset),
            imgSpd: _imgSpd,
            subimgArr: _subimgArr,
            subimgArrPos: 0,
            collisionZone: _collisionZone,
            snd: this.scene.sound.add("sndSwoosh01", { loop: false, volume: OPTIONS.sound.sfx }),
            sndTriggered: false,
            trigger: false,
            update: () => { },
            collisionFunc: () => { }
        }
    }

    createSpriteClutter(_trackPos, _roll, _len, _asset) {
        return {
            spd: 0,
            rollSpd: 0,
            roll: _roll,
            len: _len,
            trackPos: _trackPos,
            sprite: this.scene.add.sprite(0, 0, _asset),
            update: () => { }
        }
    }

    createTextClutter(_trackPos, _roll, _len, _text) {
        return {
            spd: 0,
            rollSpd: 0,
            roll: _roll,
            len: _len,
            trackPos: _trackPos,
            text: _text,
            txt: this.scene.add.bitmapText(0, 0, "pixelmix", _text, 8, 1).setOrigin(0.5),
            update: () => { }
        }
    }

    createTrackData(_no) {
        switch (_no) {
            case -1: //WAITINGTUNNEL
                this.scene.trackData = [
                    {
                        id: 0,
                        name: "Transfer Tunnel",
                        jumpTo: 0,
                        segments: [
                            this.createSegment(0, 0, 0, "sprSegStartTunnel00", [0, 1, 1, 1], 0, 256),
                        ]
                    }
                ]
                break;
            case 0: //TESTTRACK
                this.scene.trackData = [
                    {
                        id: 0,
                        name: "Start Finish",
                        jumpTo: 1,
                        segments: [
                            this.createSegment(0, 0, 0, "sprSegFinishLine00", [2], 0, 1),
                            this.createSegment(0, 0, 0, "sprSegFinishLine00", [0, 1], 0.25, 16),
                            this.createSegment(0, 0, 0, "sprSegFinishLine00", [2], 0, 1),

                            this.createSegment(0, 0, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                            this.createSegment(0, 0, 0, "sprSegMetalRoad00", [0], 0, 64),
                        ]
                    },{
                        id: 1,
                        name: "Curva Grande",
                        jumpTo: 2,
                        segments:[
                            this.createSegment(0.05, 0, Math.PI * -0.5, "sprSegMetalRoad01", [0], 0, 64),
                            this.createSegment(-0.05, 0.025, Math.PI * -1, "sprSegMetalRoad02", [0, 1], 1, 64),
                            this.createSegment(0, -0.025, Math.PI * -1, "sprSegMetalRoad02", [0, 1], 1, 64),
                            this.createSegment(0.05, -0.025, 0, "sprSegMetalRoad01", [0], 0, 64),
                            this.createSegment(-0.05, 0.025, 0, "sprSegMetalRoad00", [0], 0, 64),
                        ]
                    },{
                        id: 2,
                        name: "Harlequin",
                        jumpTo: 3,
                        segments:[
                            this.createSegment(0, 0, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                            this.createSegment(0, 0, 0, "sprSegMetalRoad04", [0, 1, 2, 3, 4, 5], 1, 60),
                            this.createSegment(0, 0, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                        ]
                    },{
                        id: 3,
                        name: "Treegarden",
                        jumpTo: 4,
                        segments: [
                            this.createSegment(0, 0, Math.PI * 2, "sprSegTreeRoad00", [0, 1, 2, 3, 4, 5, 6, 7], -1, 64),
                            this.createSegment(0, 0.1, 0, "sprSegTreeRoad00", [0, 1, 2, 3, 4, 5, 6, 7], -1, 64),
                            this.createSegment(0, -0.1, 0, "sprSegTreeRoad00", [0, 1, 2, 3, 4, 5, 6, 7], -1, 64),
                            this.createSegment(0, 0, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                        ]
                    },{
                        id: 4,
                        name: "",
                        jumpTo: 5,
                        segments: [
                            this.createSegment(-0.05, 0, Math.PI * 0.25, "sprSegMetalRoad02", [0, 1], 1, 64),
                            this.createSegment(0.05, 0, Math.PI * 0.25, "sprSegMetalRoad02", [0, 1], 1, 64),
                            this.createSegment(0, 0, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 0, 2),
                            this.createSegment(0, 0, 0, "sprSegMetalRoad01", [0], 0, 30),
                            this.createSegment(0, 0, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                        ]
                    },{
                        id: 5,
                        name: "Treegarden Station",
                        jumpTo: 6,
                        segments:[
                            this.createSegment(0, 0, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                            this.createSegment(0, 0, 0, "sprSegMetroPlatformEnd00", [0], 0, 2),
                            this.createSegment(-0.01, 0, 0, "sprSegMetroPlatform00", [0, 1, 2, 3, 4, 5, 6, 7], 1, 64),
                            this.createSegment(0.01, 0, 0, "sprSegMetroPlatformEnd00", [0], 0, 2),
                            this.createSegment(0.01, 0, 0, "sprSegMetroLine00", [0, 0, 0, 1], 0.5, 62),
                        ]
                    },{
                        id: 6,
                        name: "",
                        jumpTo: 7,
                        segments:[
                            this.createSegment(0, 0, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                            this.createSegment(0, 0, 0, "sprSegMetalRoad00", [0], 0, 64),
                            this.createSegment(0, 0, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                        ]
                    },{
                        id: 7,
                        name: "Maintenance",
                        jumpTo: 8,
                        segments:[
                            this.createSegment(0.01, -0.025, Math.PI, "sprSegAirVent00", [0], 0, 64),
                            this.createSegment(0, 0.025, 0, "sprSegAirVent00", [0], 0, 64),
                            this.createSegment(0, 0, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                            this.createSegment(0, 0, 0, "sprSegMetalRoad00", [0], 0, 56),
                            this.createSegment(-0.01, 0, 0, "sprSegMetalRoad00", [0], 0, 64),
                        ]
                    },{
                        id: 8,
                        name: "Finish Straight",
                        jumpTo: 0,
                        segments: [
                            this.createSegment(0, 0, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                            this.createSegment(0, 0, 0, "sprSegMetalRoad00", [0], 0, 64),
                            this.createSegment(0, 0, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                        ]
                    }
                ];

                this.scene.obstacles.push(this.createObstacle(78, Math.PI * 0.5, 42, "sprObsDoor00_", [0, 0, 0, 1, 2, 3, 4, 5], 0.1, Math.PI * 0.4));
                this.scene.obstacles.push(this.createObstacle(78, Math.PI * -0.5, 42, "sprObsDoor00_", [0, 0, 0, 1, 2, 3, 4, 5], 0.1, Math.PI * 0.4));

                this.scene.obstacles.push(this.createObstacle(486, Math.PI, 28, "sprObsBlade01_", [0], 0, 0.3));
                this.scene.obstacles.push(this.createObstacle(678, Math.PI, 28, "sprObsBlade01_", [0], 0, 0.3));

                this.scene.obstacles.push(this.createObstacle(854, Math.PI, 32, "sprObsBlade01_", [0], 0, 0.3));
                this.scene.obstacles.push(this.createObstacle(854, Math.PI * 0.33, 32, "sprObsBlade01_", [0], 0, 0.3));
                this.scene.obstacles.push(this.createObstacle(854, Math.PI * -0.33, 32, "sprObsBlade01_", [0], 0, 0.3));

                this.scene.obstacles.push(this.createObstacle(992, 0, 32, "sprObsDoor00_", [0, 0, 0, 1, 2, 3, 4, 5], 0.1, Math.PI * 0.5));

                this.scene.obstacles.push(this.createObstacle(1072, Math.PI, 24, "sprObsVentBlade00_", [0], 0, 0.3));
                this.scene.obstacles[this.scene.obstacles.length - 1].rollSpd = 0.045;
                this.scene.obstacles.push(this.createObstacle(1072, Math.PI * 0.33, 24, "sprObsVentBlade00_", [0], 0, 0.3));
                this.scene.obstacles[this.scene.obstacles.length - 1].rollSpd = 0.045;
                this.scene.obstacles.push(this.createObstacle(1072, Math.PI * -0.33, 24, "sprObsVentBlade00_", [0], 0, 0.3));
                this.scene.obstacles[this.scene.obstacles.length - 1].rollSpd = 0.045;

                this.scene.obstacles.push(this.createObstacle(1136, Math.PI, 24, "sprObsVentBlade00_", [0], 0, 0.3));
                this.scene.obstacles[this.scene.obstacles.length - 1].rollSpd = -0.025;
                this.scene.obstacles.push(this.createObstacle(1136, Math.PI * 0.33, 24, "sprObsVentBlade00_", [0], 0, 0.3));
                this.scene.obstacles[this.scene.obstacles.length - 1].rollSpd = -0.025;
                this.scene.obstacles.push(this.createObstacle(1136, Math.PI * -0.33, 24, "sprObsVentBlade00_", [0], 0, 0.3));
                this.scene.obstacles[this.scene.obstacles.length - 1].rollSpd = -0.025;

                this.scene.obstacles.push(this.createObstacle(1200, Math.PI, 24, "sprObsVentBlade00_", [0], 0, 0.3));
                this.scene.obstacles[this.scene.obstacles.length - 1].rollSpd = 0.045;
                this.scene.obstacles.push(this.createObstacle(1200, Math.PI * 0.33, 24, "sprObsVentBlade00_", [0], 0, 0.3));
                this.scene.obstacles[this.scene.obstacles.length - 1].rollSpd = 0.045;
                this.scene.obstacles.push(this.createObstacle(1200, Math.PI * -0.33, 24, "sprObsVentBlade00_", [0], 0, 0.3));
                this.scene.obstacles[this.scene.obstacles.length - 1].rollSpd = 0.045;

                this.scene.obstacles.push(this.createObstacle(1304, 0, 42, "sprObsDoor00_", [0, 0, 0, 1, 2, 3, 4, 5], 0.1, Math.PI * 0.4));
                this.scene.obstacles.push(this.createObstacle(1304, Math.PI, 42, "sprObsDoor00_", [0, 0, 0, 1, 2, 3, 4, 5], 0.1, Math.PI * 0.4));
                break;
            case 1: //LABORATORY AND ORATORY
                this.scene.trackData = [
                    {
                        id: 0,
                        name: "Start Finish",
                        jumpTo: 1,
                        segments: [
                            this.createSegment(0, 0, 0, "sprSegFinishLine00", [0], 0, 1),
                            this.createSegment(0, 0, 0, "sprSegFinishLine00", [0, 1], 0.25, 16),
                            this.createSegment(0, 0, 0, "sprSegFinishLine00", [0], 0, 1),

                            this.createSegment(0, 0, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                            this.createSegment(0, 0, 0, "sprSegLabRoad00", [4, 3, 2, 1, 0, 0, 1, 2, 3], 1, 64),
                            this.createSegment(0, 0, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                        ]
                    },{
                        id: 1,
                        name: "Garden 170",
                        jumpTo: 2,
                        segments:[
                            this.createSegment(-0.05, 0, 0, "sprSegLabRoad00", [4, 3, 2, 1, 0, 0, 1, 2, 3], 1, 64),
                            this.createSegment(0.05, 0, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                            this.createSegment(0.05, 0, 0, "sprSegTreeRoad00", [0, 1, 2, 3, 4, 5, 6, 7], -1, 56),//56
                        ]
                    },{
                        id: 2,
                        name: "Bridge",
                        jumpTo: 3,
                        segments:[
                            this.createSegment(0, 0, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                            this.createSegment(0, 0.02, 0, "sprSegMetalRoad00", [0], 0, 64),
                            this.createSegment(0, -0.02, Math.PI * 0.5, "sprSegMetalRoad00", [0], 0, 64),

                            this.createSegment(-0.01, 0, Math.PI * 0.5, "sprSegMetalRoad01", [0], 0, 72),
                            this.createSegment(0.01, 0, 0, "sprSegMetalRoad00", [0], 0, 72),

                            this.createSegment(0, 0, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                        ]
                    },{
                        id: 3,
                        name: "Garden 171",
                        jumpTo: 4,
                        segments:[
                            this.createSegment(0, -0.02, 0, "sprSegTreeRoad00", [0, 1, 2, 3, 4, 5, 6, 7], -1, 64),
                            this.createSegment(0.05, 0.02, 0, "sprSegLabRoad00", [4, 3, 2, 1, 0, 0, 1, 2, 3], 1, 64),
                            this.createSegment(-0.05, 0, 0, "sprSegLabRoad00", [4, 3, 2, 1, 0, 0, 1, 2, 3], 1, 64),
                            this.createSegment(0, -0.02, 0, "sprSegTreeRoad00", [0, 1, 2, 3, 4, 5, 6, 7], -1, 64),
                            this.createSegment(-0.02, 0.02, 0, "sprSegTreeRoad00", [0, 1, 2, 3, 4, 5, 6, 7], -1, 64),
                            this.createSegment(0.02, 0, 0, "sprSegLabRoad00", [4, 3, 2, 1, 0, 0, 1, 2, 3], 1, 64),
                        ]
                    },{
                        id: 4,
                        name: "Ventilation Shaft",
                        jumpTo: 5,
                        segments:[
                            this.createSegment(0, 0, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                            this.createSegment(-0.01, -0.025, 0, "sprSegAirVent00", [0], 0, 128),
                            this.createSegment(0.01, 0.025, 0, "sprSegAirVent00", [0], 0, 128),
                        ]
                    },{
                        id: 5,
                        name: "Garden 172",
                        jumpTo: 6,
                        segments:[
                            this.createSegment(0, 0, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                            this.createSegment(0, 0, Math.PI * 2, "sprSegTreeRoad00", [0, 1, 2, 3, 4, 5, 6, 7], -1, 128),
                            this.createSegment(0, 0, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                            this.createSegment(0, -0.05, 0, "sprSegLabRoad00", [4, 3, 2, 1, 0, 0, 1, 2, 3], 1, 64),
                            this.createSegment(0.01, 0.05, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                            this.createSegment(0.01, 0.05, 0, "sprSegTreeRoad00", [0, 1, 2, 3, 4, 5, 6, 7], -1, 56),
                            this.createSegment(-0.01, 0, 0, "sprSegTreeRoad00", [0, 1, 2, 3, 4, 5, 6, 7], -1, 64),
                        ]
                    },{
                        id: 6,
                        name: "Finish Straight",
                        jumpTo: 0,
                        segments:[
                            this.createSegment(0, 0, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                            this.createSegment(0, 0, 0, "sprSegLabRoad00", [4, 3, 2, 1, 0, 0, 1, 2, 3], 1, 72),
                            this.createSegment(0, 0, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                        ]
                    }
                ];

                this.scene.obstacles.push(this.createObstacle(98, 0, 42, "sprObsDoor00_", [0, 0, 0, 1, 2, 3, 4, 5], 0.1, Math.PI * 0.4));

                this.scene.obstacles.push(this.createObstacle(170, Math.PI, 28, "sprObsBlade01_", [0], 0, 0.3));
                this.scene.obstacles.push(this.createObstacle(226, Math.PI, 28, "sprObsBlade01_", [0], 0, 0.3));

                this.scene.obstacles.push(this.createObstacle(298, 0, 28, "sprObsBlade01_", [0], 0, 0.3));
                this.scene.obstacles.push(this.createObstacle(298, Math.PI, 28, "sprObsBlade01_", [0], 0, 0.3));
                this.scene.obstacles.push(this.createObstacle(330, Math.PI * 0.25, 28, "sprObsBlade01_", [0], 0, 0.3));
                this.scene.obstacles.push(this.createObstacle(330, Math.PI * -0.75, 28, "sprObsBlade01_", [0], 0, 0.3));
                this.scene.obstacles.push(this.createObstacle(346, Math.PI * -0.25, 28, "sprObsBlade01_", [0], 0, 0.3));
                this.scene.obstacles.push(this.createObstacle(346, Math.PI * 0.75, 28, "sprObsBlade01_", [0], 0, 0.3));

                this.scene.obstacles.push(this.createObstacle(362, Math.PI * 0.5, 42, "sprObsDoor00_", [0, 0, 0, 1, 2, 3, 4, 5], 0.1, Math.PI * 0.4));
                this.scene.obstacles.push(this.createObstacle(362, Math.PI * -0.5, 42, "sprObsDoor00_", [0, 0, 0, 1, 2, 3, 4, 5], 0.1, Math.PI * 0.4));

                this.scene.obstacles.push(this.createObstacle(432, Math.PI * 0.5, 36, "sprObsDoor00_", [0, 0, 0, 1, 2, 3, 4, 5], 0.1, Math.PI * 0.5));

                this.scene.obstacles.push(this.createObstacle(514, Math.PI, 28, "sprObsBlade01_", [0], 0, 0.3));
                this.scene.obstacles.push(this.createObstacle(578, Math.PI, 28, "sprObsBlade01_", [0], 0, 0.3));

                this.scene.obstacles.push(this.createObstacle(706, Math.PI, 28, "sprObsBlade01_", [0], 0, 0.3));
                this.scene.obstacles.push(this.createObstacle(834, Math.PI, 28, "sprObsBlade01_", [0], 0, 0.3));

                this.scene.obstacles.push(this.createObstacle(906, Math.PI, 24, "sprObsVentBlade00_", [0], 0, 0.3));
                this.scene.obstacles[this.scene.obstacles.length - 1].rollSpd = 0.045;
                this.scene.obstacles.push(this.createObstacle(906, Math.PI * 0.33, 24, "sprObsVentBlade00_", [0], 0, 0.3));
                this.scene.obstacles[this.scene.obstacles.length - 1].rollSpd = 0.045;
                this.scene.obstacles.push(this.createObstacle(906, Math.PI * -0.33, 24, "sprObsVentBlade00_", [0], 0, 0.3));
                this.scene.obstacles[this.scene.obstacles.length - 1].rollSpd = 0.045;

                this.scene.obstacles.push(this.createObstacle(1162, Math.PI, 24, "sprObsVentBlade00_", [0], 0, 0.3));
                this.scene.obstacles[this.scene.obstacles.length - 1].rollSpd = 0.065;
                this.scene.obstacles.push(this.createObstacle(1162, Math.PI * 0.33, 24, "sprObsVentBlade00_", [0], 0, 0.3));
                this.scene.obstacles[this.scene.obstacles.length - 1].rollSpd = 0.065;
                this.scene.obstacles.push(this.createObstacle(1162, Math.PI * -0.33, 24, "sprObsVentBlade00_", [0], 0, 0.3));
                this.scene.obstacles[this.scene.obstacles.length - 1].rollSpd = 0.065;

                this.scene.obstacles.push(this.createObstacle(1170, Math.PI, 28, "sprObsBlade01_", [0], 0, 0.3));
                this.scene.obstacles.push(this.createObstacle(1298, Math.PI, 28, "sprObsBlade01_", [0], 0, 0.3));

                this.scene.obstacles.push(this.createObstacle(1378, Math.PI, 28, "sprObsBlade01_", [0], 0, 0.3));
                this.scene.obstacles.push(this.createObstacle(1498, Math.PI, 28, "sprObsBlade01_", [0], 0, 0.3));
                break;
            case 2:
                this.scene.trackData = [
                    {
                        id: 0,
                        name: "Start Finish",
                        jumpTo: 1,
                        segments: [
                            this.createSegment(0, 0, 0, "sprSegFinishLine00", [0], 0, 1),
                            this.createSegment(0, 0, 0, "sprSegFinishLine00", [0, 1], 0.25, 16),
                            this.createSegment(0, 0, 0, "sprSegFinishLine00", [0], 0, 1),
                            this.createSegment(0, 0, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                        ]
                    },{
                        id: 1,
                        name: "",
                        jumpTo: 2,
                        segments: [
                            this.createSegment(0.01, -0.01, Math.PI * -0.15, "sprSegMetroLine00", [0, 0, 0, 1], 0.5, 64),
                            this.createSegment(-0.01, 0.01, Math.PI * -0.15, "sprSegMetroLine00", [0, 0, 0, 1], 0.5, 64),
                            this.createSegment(0, 0, 0, "sprSegMetroLine00", [0, 0, 0, 1], 0.5, 62),

                            this.createSegment(0, 0, Math.PI * -0.15, "sprSegMetroLine00", [0, 0, 0, 1], 0.5, 64),
                        ]
                    },{
                        id: 2,
                        name: "Green Station",
                        jumpTo: 3,
                        segments:[
                            this.createSegment(0, 0, 0, "sprSegMetroPlatformEnd00", [0], 0, 2),
                            this.createSegment(-0.02, 0, 0, "sprSegMetroPlatform00", [0, 1, 2, 3, 4, 5, 6, 7], 1, 64),
                            this.createSegment(0.02, 0.01, 0, "sprSegMetroPlatformEnd00", [0], 0, 2),
                            this.createSegment(0.02, 0.01, 0, "sprSegMetroLine00", [0, 0, 0, 1], 0.5, 62),
                            this.createSegment(0, -0.01, 0, "sprSegMetroLine00", [0, 0, 0, 1], 0.5, 64),
                            this.createSegment(0, 0, 0, "sprSegMetroLine00", [0, 0, 0, 1], 0.5, 32),
                        ]
                    },{
                        id: 3,
                        name: "",
                        jumpTo: 4,
                        segments:[
                            this.createSegment(0, 0, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                            
                            /*this.createSegment(0, 0, Math.PI * -1, "sprSegMetalRoad02", [0, 1], 1, 64),
                            this.createSegment(0.05, 0, Math.PI * -1, "sprSegMetalRoad02", [0, 1], 1, 64),
                            this.createSegment(-0.05, 0.025, Math.PI * -1, "sprSegMetalRoad00", [0], 0, 64),
                            this.createSegment(0, -0.025, 0, "sprSegMetalRoad00", [0], 0, 64),*/
                            this.createSegment(0, 0, Math.PI * -1, "sprSegCanalRoad00", [0, 1, 2, 3], -1, 64),
                            this.createSegment(0.05, 0, Math.PI * -1, "sprSegCanalRoad00", [0, 1, 2, 3], -1, 64),
                            this.createSegment(-0.05, 0.025, Math.PI * -1, "sprSegCanalRoad00", [0, 1, 2, 3], -1, 64),
                            this.createSegment(0, -0.025, 0, "sprSegCanalRoad00", [0, 1, 2, 3], -1, 64),
                        ]
                    },{
                        id: 4,
                        name: "Garden",
                        jumpTo: 5,
                        segments: [
                            this.createSegment(0, 0, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                            this.createSegment(0, 0, 0, "sprSegTreeRoad00", [0, 1, 2, 3, 4, 5, 6, 7], -1, 64),
                            this.createSegment(0, 0, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                        ]
                    },{
                        id: 5,
                        name: "Red Station",
                        jumpTo: 6,
                        segments:[
                            this.createSegment(0, 0, 0, "sprSegMetroPlatformEnd01", [0], 0, 2),
                            this.createSegment(-0.02, 0, Math.PI * 0.075, "sprSegMetroPlatform01", [0, 1, 2, 3, 4, 5, 6, 7], 1, 64),
                            this.createSegment(0.02, 0, Math.PI * 0.15, "sprSegMetroPlatformEnd01", [0], 0, 2),
                            this.createSegment(0.02, 0, Math.PI * 0.15, "sprSegMetroLine01", [0, 0, 0, 1], 0.5, 62),
                            this.createSegment(0, 0, Math.PI * 0.015, "sprSegMetroLine01", [0, 0, 0, 1], 0.5, 64),
                        ]
                    },{
                        id: 6,
                        name: "",
                        jumpTo: 0,
                        segments:[
                            this.createSegment(0, 0, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),

                            this.createSegment(0.02, 0.05, Math.PI * 1.5, "sprSegMetalRoad02", [0, 1], 1, 64),
                            this.createSegment(0.01, -0.05, Math.PI * 1.5, "sprSegMetalRoad02", [0, 1], 1, 64),
                            this.createSegment(-0.01, 0, 0, "sprSegMetalRoad00", [0], 0, 17),
                            this.createSegment(-0.01, 0, 0, "sprSegAirVent00", [0], 0, 40),
                            this.createSegment(-0.01, 0, 0, "sprSegMetalRoad00", [0], 0, 7),
                            this.createSegment(-0.02, 0, 0, "sprSegMetalRoad00", [0], 0, 64),

                            this.createSegment(0, 0, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                        ]
                    }
                ];

                this.scene.obstacles.push(this.createObstacle(24, Math.PI * 0.5, 50, "sprObsDoor00_", [0, 0, 0, 1, 2, 3, 4, 5], 0.1, Math.PI * 0.35));
                this.scene.obstacles.push(this.createObstacle(24, Math.PI * -0.5, 50, "sprObsDoor00_", [0, 0, 0, 1, 2, 3, 4, 5], 0.1, Math.PI * 0.35));

                this.scene.obstacles.push(this.createObstacle(121, 0, 28, "sprObsBlade01_", [0], 0, 0.3));

                this.scene.obstacles.push(this.createObstacle(169, Math.PI * 0.21, 28, "sprObsBlade01_", [0], 0, 0.3));

                this.scene.obstacles.push(this.createObstacle(244, 0, 28, "sprObsBlade01_", [0], 0, 0.3));
                this.scene.obstacles.push(this.createObstacle(244, Math.PI * 1, 28, "sprObsBlade01_", [0], 0, 0.3));
                this.scene.obstacles.push(this.createObstacle(260, Math.PI * 0.25, 28, "sprObsBlade01_", [0], 0, 0.3));
                this.scene.obstacles.push(this.createObstacle(260, Math.PI * 1.25, 28, "sprObsBlade01_", [0], 0, 0.3));
                this.scene.obstacles.push(this.createObstacle(276, Math.PI * 0.5, 28, "sprObsBlade01_", [0], 0, 0.3));
                this.scene.obstacles.push(this.createObstacle(276, Math.PI * 1.5, 28, "sprObsBlade01_", [0], 0, 0.3));

                this.scene.obstacles.push(this.createObstacle(433, Math.PI * 0.9, 42, "sprObsDoor00_", [0, 0, 0, 1, 2, 3, 4, 5], 0.1, Math.PI * 0.4));

                this.scene.obstacles.push(this.createObstacle(514, Math.PI * 0.55, 34, "sprObsDoor00_", [0, 0, 0, 1, 2, 3, 4, 5], 0.1, Math.PI * 0.45));
                this.scene.obstacles.push(this.createObstacle(514, Math.PI * -0.45, 50, "sprObsDoor00_", [0, 0, 0, 1, 2, 3, 4, 5], 0.1, Math.PI * 0.35));
                this.scene.obstacles.push(this.createObstacle(546, Math.PI * 0.4, 42, "sprObsDoor00_", [0, 0, 0, 1, 2, 3, 4, 5], 0.1, Math.PI * 0.4));
                this.scene.obstacles.push(this.createObstacle(546, Math.PI * -0.6, 42, "sprObsDoor00_", [0, 0, 0, 1, 2, 3, 4, 5], 0.1, Math.PI * 0.4));
                this.scene.obstacles.push(this.createObstacle(578, Math.PI * 0.1, 50, "sprObsDoor00_", [0, 0, 0, 1, 2, 3, 4, 5], 0.1, Math.PI * 0.35));
                this.scene.obstacles.push(this.createObstacle(578, Math.PI * -0.9, 34, "sprObsDoor00_", [0, 0, 0, 1, 2, 3, 4, 5], 0.1, Math.PI * 0.45));

                this.scene.obstacles.push(this.createObstacle(641, Math.PI * -0.05, 50, "sprObsDoor00_", [0, 0, 0, 1, 2, 3, 4, 5], 0.1, Math.PI * 0.35));
                this.scene.obstacles.push(this.createObstacle(641, Math.PI * 0.95, 50, "sprObsDoor00_", [0, 0, 0, 1, 2, 3, 4, 5], 0.1, Math.PI * 0.35));

                this.scene.obstacles.push(this.createObstacle(778, Math.PI, 28, "sprObsBlade01_", [0], 0, 0.3));
                this.scene.obstacles.push(this.createObstacle(842, Math.PI, 28, "sprObsBlade01_", [0], 0, 0.3));
                this.scene.obstacles.push(this.createObstacle(842, 0, 42, "sprObsDoor00_", [0, 0, 0, 1, 2, 3, 4, 5], 0.1, Math.PI * 0.4));

                this.scene.obstacles.push(this.createObstacle(1044, 0, 32, "sprObsDoor00_", [0, 0, 0, 1, 2, 3, 4, 5], 0.1, Math.PI * 0.5));

                this.scene.obstacles.push(this.createObstacle(1197, Math.PI, 24, "sprObsVentBlade00_", [0], 0, 0.3));
                this.scene.obstacles[this.scene.obstacles.length - 1].rollSpd = 0.035;
                this.scene.obstacles.push(this.createObstacle(1197, Math.PI * 0.33, 24, "sprObsVentBlade00_", [0], 0, 0.3));
                this.scene.obstacles[this.scene.obstacles.length - 1].rollSpd = 0.035;
                this.scene.obstacles.push(this.createObstacle(1197, Math.PI * -0.33, 24, "sprObsVentBlade00_", [0], 0, 0.3));
                this.scene.obstacles[this.scene.obstacles.length - 1].rollSpd = 0.035;

                this.scene.obstacles.push(this.createObstacle(1207, Math.PI, 24, "sprObsVentBlade00_", [0], 0, 0.3));
                this.scene.obstacles[this.scene.obstacles.length - 1].rollSpd = 0.035;
                this.scene.obstacles.push(this.createObstacle(1207, Math.PI * 0.33, 24, "sprObsVentBlade00_", [0], 0, 0.3));
                this.scene.obstacles[this.scene.obstacles.length - 1].rollSpd = 0.035;
                this.scene.obstacles.push(this.createObstacle(1207, Math.PI * -0.33, 24, "sprObsVentBlade00_", [0], 0, 0.3));
                this.scene.obstacles[this.scene.obstacles.length - 1].rollSpd = 0.035;

                this.scene.obstacles.push(this.createObstacle(1217, Math.PI, 24, "sprObsVentBlade00_", [0], 0, 0.3));
                this.scene.obstacles[this.scene.obstacles.length - 1].rollSpd = 0.035;
                this.scene.obstacles.push(this.createObstacle(1217, Math.PI * 0.33, 24, "sprObsVentBlade00_", [0], 0, 0.3));
                this.scene.obstacles[this.scene.obstacles.length - 1].rollSpd = 0.035;
                this.scene.obstacles.push(this.createObstacle(1217, Math.PI * -0.33, 24, "sprObsVentBlade00_", [0], 0, 0.3));
                this.scene.obstacles[this.scene.obstacles.length - 1].rollSpd = 0.035;

                this.scene.obstacles.push(this.createObstacle(1227, Math.PI, 24, "sprObsVentBlade00_", [0], 0, 0.3));
                this.scene.obstacles[this.scene.obstacles.length - 1].rollSpd = 0.035;
                this.scene.obstacles.push(this.createObstacle(1227, Math.PI * 0.33, 24, "sprObsVentBlade00_", [0], 0, 0.3));
                this.scene.obstacles[this.scene.obstacles.length - 1].rollSpd = 0.035;
                this.scene.obstacles.push(this.createObstacle(1227, Math.PI * -0.33, 24, "sprObsVentBlade00_", [0], 0, 0.3));
                this.scene.obstacles[this.scene.obstacles.length - 1].rollSpd = 0.035;

                this.scene.obstacles.push(this.createObstacle(1237, Math.PI, 24, "sprObsVentBlade00_", [0], 0, 0.3));
                this.scene.obstacles[this.scene.obstacles.length - 1].rollSpd = 0.035;
                this.scene.obstacles.push(this.createObstacle(1237, Math.PI * 0.33, 24, "sprObsVentBlade00_", [0], 0, 0.3));
                this.scene.obstacles[this.scene.obstacles.length - 1].rollSpd = 0.035;
                this.scene.obstacles.push(this.createObstacle(1237, Math.PI * -0.33, 24, "sprObsVentBlade00_", [0], 0, 0.3));
                this.scene.obstacles[this.scene.obstacles.length - 1].rollSpd = 0.035;

                break;
            case 3:
                this.scene.trackData = [
                    {
                        id: 0,
                        name: "Start Finish",
                        jumpTo: 1,
                        segments: [
                            this.createSegment(0, 0, 0, "sprSegFinishLine00", [0], 0, 1),
                            this.createSegment(0, 0, 0, "sprSegFinishLine00", [0, 1], 0.25, 16),
                            this.createSegment(0, 0, 0, "sprSegFinishLine00", [0], 0, 1),
                        ]
                    },{
                        id: 1,
                        name: "Nucular Road 001",
                        jumpTo: 2,
                        segments:[
                            this.createSegment(0, 0, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),

                            this.createSegment(0, 0, 0, "sprSegNuclearRoad00", [4], 0, 1),
                            this.createSegment(0, 0, 0, "sprSegNuclearRoad00", [0, 1, 2, 3], -1, 31),
                            this.createSegment(0, 0, 0, "sprSegNuclearRoad00", [4], 0, 1),
                            this.createSegment(0, 0, 0, "sprSegNuclearRoad00", [0, 1, 2, 3], -1, 31),
                            this.createSegment(0, 0, 0, "sprSegNuclearRoad00", [4], 0, 1),

                            this.createSegment(0.01, 0, 0, "sprSegNuclearRoad00", [0, 1, 2, 3], -1, 31),
                            this.createSegment(0.01, 0, 0, "sprSegNuclearRoad00", [4], 0, 1),
                            this.createSegment(0.01, 0, 0, "sprSegNuclearRoad00", [0, 1, 2, 3], -1, 31),
                            this.createSegment(0.01, 0, 0, "sprSegNuclearRoad00", [4], 0, 1),

                            this.createSegment(-0.01, 0, 0, "sprSegNuclearRoomEnd00", [0], 0, 1),
                            this.createSegment(-0.01, 0, 0, "sprSegNuclearRoom00", [0, 1, 0, 1, 0, 2, 0, 1, 0, 1, 0, 3], 1, 62),
                            this.createSegment(-0.01, 0, 0, "sprSegNuclearRoomEnd00", [0], 0, 1),
                        ]
                    },{
                        id: 2,
                        name: "Nucular Road 002",
                        jumpTo: 3,
                        segments: [
                            this.createSegment(0, 0, 0, "sprSegNuclearRoad00", [0, 1, 2, 3], -1, 15),
                            this.createSegment(0, 0, 0, "sprSegNuclearRoad00", [4], 0, 1),
                            this.createSegment(0, 0, 0, "sprSegNuclearRoad00", [0, 1, 2, 3], -1, 16),

                            this.createSegment(0, 0, 0, "sprSegNuclearRoomEnd00", [0], 0, 1),
                            this.createSegment(0, 0, 0, "sprSegNuclearRoom00", [0, 1, 0, 1, 0, 2, 0, 1, 0, 1, 0, 3], 1, 63),
                            this.createSegment(0.02, 0, 0, "sprSegNuclearRoom00", [0, 1, 0, 1, 0, 2, 0, 1, 0, 1, 0, 3], 1, 63),
                            this.createSegment(0.02, 0, 0, "sprSegNuclearRoomEnd00", [0], 0, 1),

                            this.createSegment(-0.02, 0, 0, "sprSegNuclearRoad00", [0, 1, 2, 3], -1, 31),
                            this.createSegment(-0.02, 0, 0, "sprSegNuclearRoad00", [4], 0, 1),
                            this.createSegment(-0.02, 0, 0, "sprSegNuclearRoad00", [0, 1, 2, 3], -1, 31),
                            this.createSegment(-0.02, 0, 0, "sprSegNuclearRoad00", [4], 0, 1),

                            this.createSegment(0, -0.025, 0, "sprSegNuclearRoad01", [0, 0, 1, 1, 0, 0, 1, 2], 0, 56),
                            this.createSegment(0, -0.025, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                        ]
                    },{
                        id: 3,
                        name: "Jump Landing",
                        jumpTo: 4,
                        segments:[
                            this.createSegment(0, 0, 0, "sprSegNothing00", [0], 0, 64),

                            this.createSegment(0, -0.025, 0, "sprSegStartTunnel00", [0, 1, 1, 1], 1, 16),
                            this.createSegment(0, -0.025, 0, "sprSegMetalRoad01", [0], 0, 48),
                            this.createSegment(0, 0.025, 0, "sprSegMetalRoad00", [0], 0, 64),
                        ]
                    },{
                        id: 4,
                        name: "Lost Shaft",
                        jumpTo: 5,
                        segments:[
                            this.createSegment(0, 0, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                            this.createSegment(0, 0.025, 0, "sprSegShaft01", [0], 0, 64),
                            this.createSegment(0.06, 0, 0, "sprSegShaft01", [0], 0, 64),
                            this.createSegment(0, 0, 0, "sprSegShaft01", [0], 0, 64),
                            this.createSegment(0, 0, 0, "sprSegShaft01", [0], 0, 64),
                            this.createSegment(-0.06, 0, 0, "sprSegShaft01", [0], 0, 64),

                            this.createSegment(0, 0, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                        ]
                    }, {
                        id: 5,
                        name: "Construction Site",
                        jumpTo: 0,
                        segments: [
                            
                            /*this.createSegment(0, 0, 0, "sprSegConstructionRoad00", [0, 1, 2, 3, 4, 5, 4, 3, 2, 1], 1, 64),
                            this.createSegment(0, 0.06, 0, "sprSegConstructionRoad00", [0, 1, 2, 3, 4, 5, 4, 3, 2, 1], 1, 64),
                            this.createSegment(0, -0.06, 0, "sprSegConstructionRoad00", [0, 1, 2, 3, 4, 5, 4, 3, 2, 1], 1, 64),
                            this.createSegment(0, 0, 0, "sprSegConstructionRoad00", [0, 1, 2, 3, 4, 5, 4, 3, 2, 1], 1, 64),
                            this.createSegment(0.02, 0, Math.PI * 2, "sprSegConstructionRoad00", [0, 1, 2, 3, 4, 5, 4, 3, 2, 1], 1, 128),
                            this.createSegment(-0.02, 0, 0, "sprSegConstructionRoad00", [0, 1, 2, 3, 4, 5, 4, 3, 2, 1], 1, 128),*/
                            /*this.createSegment(0, 0, 0, "sprSegIceRoad00", [0, 1, 2, 3, 4, 5, 4, 3, 2, 1], 1, 64),
                            this.createSegment(0, 0.06, 0, "sprSegIceRoad00", [0, 1, 2, 3, 4, 5, 4, 3, 2, 1], 1, 64),
                            this.createSegment(0, -0.06, 0, "sprSegIceRoad00", [0, 1, 2, 3, 4, 5, 4, 3, 2, 1], 1, 64),
                            this.createSegment(0, 0, 0, "sprSegIceRoad00", [0, 1, 2, 3, 4, 5, 4, 3, 2, 1], 1, 64),
                            this.createSegment(0.02, 0, Math.PI * 2, "sprSegIceRoad00", [0, 1, 2, 3, 4, 5, 4, 3, 2, 1], 1, 128),
                            this.createSegment(-0.02, 0, 0, "sprSegIceRoad00", [0, 1, 2, 3, 4, 5, 4, 3, 2, 1], 1, 128),*/
                            this.createSegment(0, 0, 0, "sprSegSaltmineRoad00", [0, 1, 2, 3, 4, 5], -1, 64),
                            this.createSegment(0, 0.06, 0, "sprSegSaltmineRoad00", [0, 1, 2, 3, 4, 5], -1, 64),
                            this.createSegment(0, -0.06, 0, "sprSegSaltmineRoad00", [0, 1, 2, 3, 4, 5], -1, 64),
                            this.createSegment(0, 0, 0, "sprSegSaltmineRoad00", [0, 1, 2, 3, 4, 5], -1, 64),
                            this.createSegment(0.02, 0, Math.PI * 2, "sprSegSaltmineRoad00", [0, 1, 2, 3, 4, 5], -1, 128),
                            this.createSegment(-0.02, 0, 0, "sprSegSaltmineRoad00", [0, 1, 2, 3, 4, 5], -1, 128),

                            this.createSegment(0, 0, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                        ]
                    }
                ];

                this.scene.obstacles.push(this.createObstacle(26, 0, 0, "sprRadioactive00_", [0], 0, -1));

                this.scene.obstacles.push(this.createObstacle(90, -0.2, 34, "sprObsBlade01_", [0], 0, 0.3));
                this.scene.obstacles.push(this.createObstacle(90, Math.PI * 1.2, 34, "sprObsBlade01_", [0], 0, 0.3));
                this.scene.obstacles.push(this.createObstacle(120, Math.PI * -1.2, 34, "sprObsBlade01_", [0], 0, 0.3)); 

                this.scene.obstacles.push(this.createObstacle(287, -0.2, 34, "sprObsBlade01_", [0], 0, 0.3));
                this.scene.obstacles.push(this.createObstacle(287, Math.PI * 1.2, 34, "sprObsBlade01_", [0], 0, 0.3));
                this.scene.obstacles.push(this.createObstacle(307, Math.PI * 1.8, 34, "sprObsBlade01_", [0], 0, 0.3));

                this.scene.obstacles.push(this.createObstacle(323, Math.PI * -0.5, 32, "sprRadioactive00_", [0], 0, -1));
                this.scene.obstacles.push(this.createObstacle(323, Math.PI * 0.5, 32, "sprRadioactive00_", [0], 0, -1));

                this.scene.obstacles.push(this.createObstacle(502, 0, 0, "sprObsDebugTrigger_", [0], 0, Math.PI * 2));
                this.scene.obstacles[this.scene.obstacles.length - 1].trigger = true;
                this.scene.obstacles[this.scene.obstacles.length - 1].collisionFunc = () => {
                    this.scene.player.controls = SHIPCONTROLS.jump;
                };

                this.scene.obstacles.push(this.createObstacle(571, 0, 0, "sprObsDebugTrigger_", [0], 0, Math.PI * 2));
                this.scene.obstacles[this.scene.obstacles.length - 1].trigger = true;
                this.scene.obstacles[this.scene.obstacles.length - 1].collisionFunc = () => {
                    this.scene.player.controls = SHIPCONTROLS.free;
                };

                this.scene.obstacles.push(this.createObstacle(571, Math.PI, 64, "sprNeonArrow00_", [0], 0, -1));
                this.scene.obstacles[this.scene.obstacles.length - 1].rollSpd = 0.02;
                this.scene.obstacles.push(this.createObstacle(571, Math.PI * 0.33, 64, "sprNeonArrow00_", [0], 0, -1));
                this.scene.obstacles[this.scene.obstacles.length - 1].rollSpd = 0.02;
                this.scene.obstacles.push(this.createObstacle(571, Math.PI * -0.33, 64, "sprNeonArrow00_", [0], 0, -1));
                this.scene.obstacles[this.scene.obstacles.length - 1].rollSpd = 0.02;

                this.scene.obstacles.push(this.createObstacle(571, 0, 64, "sprNeonArrow01_", [0], 0, -1));
                this.scene.obstacles[this.scene.obstacles.length - 1].rollSpd = 0.02;
                this.scene.obstacles.push(this.createObstacle(571, Math.PI * 0.66, 64, "sprNeonArrow01_", [0], 0, -1));
                this.scene.obstacles[this.scene.obstacles.length - 1].rollSpd = 0.02;
                this.scene.obstacles.push(this.createObstacle(571, Math.PI * -0.66, 64, "sprNeonArrow01_", [0], 0, -1));
                this.scene.obstacles[this.scene.obstacles.length - 1].rollSpd = 0.02;

                break;
                
            case 4:
                this.scene.trackData = [
                    {
                        id: 0,
                        name: "Start Finish",
                        jumpTo: 1,
                        segments: [
                            this.createSegment(0, 0, 0, "sprSegFinishLine00", [0], 0, 1),
                            this.createSegment(0, 0, 0, "sprSegFinishLine00", [0, 1], 0.25, 16),
                            this.createSegment(0, 0, 0, "sprSegFinishLine00", [0], 0, 1),
                        ]
                    }, {
                        id: 1,
                        name: "Light Ring 001",
                        jumpTo: 2,
                        segments: [
                            this.createSegment(0, 0, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                        ]
                    },{
                        id: 2,
                        name: "Test Road 00",
                        jumpTo: 3,
                        segments: [
                            this.createSegment(0, -0.04, 0, "sprSegMetalRoad00", [0], 0, 128),
                        ]
                    }, {
                        id: 3,
                        name: "Test Road 01",
                        jumpTo: 4,
                        segments: [
                            this.createSegment(0, 0.04, 0, "sprSegMetroLine00", [0, 0, 0, 1], 0.5, 128),
                        ]
                    }, {
                        id: 4,
                        name: "Test Road 02",
                        jumpTo: 5,
                        segments: [
                            this.createSegment(0, 0, 0, "sprSegShaft01", [0], 0, 64),
                        ]
                    }, {
                        id: 5,
                        name: "Test Road 03",
                        jumpTo: 6,
                        segments: [
                            this.createSegment(0, -0.04, 0, "sprSegMetroLine01", [0, 0, 0, 1], 0.5, 128),
                        ]
                    }, {
                        id: 6,
                        name: "Test Road 00",
                        jumpTo: 7,
                        segments: [
                            this.createSegment(0, 0.04, 0, "sprSegMetalRoad00", [0], 0, 128),
                        ]
                    }, {
                        id: 7,
                        name: "Light Ring 002",
                        jumpTo: 0,
                        segments: [
                            this.createSegment(0, 0, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                        ]
                    }
                ]   
                break;
            case 5:
                this.scene.trackData = [
                    this.createSegment(0, 0, 0, "sprSegFinishLine00", [0], 0, 1),
                    this.createSegment(0, 0, 0, "sprSegFinishLine00", [0, 1], 0.25, 16),
                    this.createSegment(0, 0, 0, "sprSegFinishLine00", [0], 0, 1),

                    this.createSegment(0, 0, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),

                    this.createSegment(0, -0.025, 0, "sprSegMetalRoad00", [0], 0, 64),

                    this.createSegment(0, -0.025, 0, "sprSegMetalRoad00", [0], 0, 56),
                    this.createSegment(0, -0.025, 0, "sprSegMetalRoad05", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                    this.createSegment(0, 0, 0, "sprSegNothing00", [0], 0, 64),

                    this.createSegment(0, -0.025, 0, "sprSegCircusRoad00", [2, 0, 0, 0, 1, 1, 1, 0, 0, 0, 2, 1, 1, 1, 0, 0, 0, 1, 1, 1], 1, 64),
                    this.createSegment(0, 0.025, 0, "sprSegCircusRoad00", [2, 0, 0, 0, 1, 1, 1, 0, 0, 0, 2, 1, 1, 1, 0, 0, 0, 1, 1, 1], 1, 64),
                    this.createSegment(0, 0.025, 0, "sprSegCircusRoad00", [2, 0, 0, 0, 1, 1, 1, 0, 0, 0, 2, 1, 1, 1, 0, 0, 0, 1, 1, 1], 1, 64),

                    this.createSegment(0.25, 0, 0, "sprSegCircusRoad00", [2, 0, 0, 0, 1, 1, 1, 0, 0, 0, 2, 1, 1, 1, 0, 0, 0, 1, 1, 1], 1, 64),
                    this.createSegment(-0.25, 0, 0, "sprSegCircusRoad00", [2, 0, 0, 0, 1, 1, 1, 0, 0, 0, 2, 1, 1, 1, 0, 0, 0, 1, 1, 1], 1, 64),
                ];

                this.scene.obstacles.push(this.createObstacle(72, 0, 0, "sprObsDebugTrigger_", [0], 0, Math.PI * 2));
                this.scene.obstacles[this.scene.obstacles.length - 1].trigger = true;
                this.scene.obstacles[this.scene.obstacles.length - 1].collisionFunc = () => {
                    this.scene.player.controls = SHIPCONTROLS.jump;
                };

                this.scene.obstacles.push(this.createObstacle(96, 0, 0, "sprObsDebugTrigger_", [0], 0, Math.PI * 2));
                this.scene.obstacles[this.scene.obstacles.length - 1].trigger = true;
                this.scene.obstacles[this.scene.obstacles.length - 1].collisionFunc = () => {
                    this.scene.player.controls = SHIPCONTROLS.free;
                };

                this.scene.obstacles.push(this.createObstacle(96, 0, 0, "sprClownFace00_", [0], 0, -1));
                break;
            default:
                break;
        }

        //sum up track length
        /*this.scene.trackLength = 0;
        for (let s of this.scene.trackData) {
            for(let seg of s.segments){
                this.scene.trackLength += seg.units;
            }
        }*/

        //this.scene.ui.minimap.createMiniMap();
    }
}