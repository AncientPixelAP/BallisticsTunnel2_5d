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
            update: () => { }
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
                    this.createSegment(0, 0, 0, "sprSegStartTunnel_", [0], 0, 256),
                ]
                break;
            case 0: //TESTTRACK
                this.scene.trackData = [
                    this.createSegment(0, 0, 0, "sprSegFinishLineClamp_", [0], 0, 1),
                    this.createSegment(0, 0, 0, "sprSegFinishLine_", [0, 1], 0.25, 16),
                    this.createSegment(0, 0, 0, "sprSegFinishLineClamp_", [0], 0, 1),

                    this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                    this.createSegment(0, 0, 0, "sprSegMetalRoad00_", [0], 0, 64),
                    this.createSegment(0.05, 0, Math.PI * -0.5, "sprSegMetalRoad01_", [0], 0, 64),
                    this.createSegment(-0.05, 0.025, Math.PI * -1, "sprSegMetalRoad02_", [0, 1], 1, 64),
                    this.createSegment(0, -0.025, Math.PI * -1, "sprSegMetalRoad02_", [0, 1], 1, 64),
                    this.createSegment(0.05, -0.025, 0, "sprSegMetalRoad01_", [0], 0, 64),
                    this.createSegment(-0.05, 0.025, 0, "sprSegMetalRoad00_", [0], 0, 64),

                    this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                    this.createSegment(0, 0, 0, "sprSegMetalRoad04_", [0, 1, 2, 3, 4, 5], 1, 60),
                    this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),

                    this.createSegment(0, 0, Math.PI * 2, "sprSegTreeRoad00_", [0, 1, 2, 3, 4, 5, 6, 7], -1, 64),
                    this.createSegment(0, 0.1, 0, "sprSegTreeRoad00_", [0, 1, 2, 3, 4, 5, 6, 7], -1, 64),
                    this.createSegment(0, -0.1, 0, "sprSegTreeRoad00_", [0, 1, 2, 3, 4, 5, 6, 7], -1, 64),
                    this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),

                    this.createSegment(-0.05, 0, Math.PI * 0.25, "sprSegMetalRoad02_", [0, 1], 1, 64),
                    this.createSegment(0.05, 0, Math.PI * 0.25, "sprSegMetalRoad02_", [0, 1], 1, 64),
                    this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 0, 2),
                    this.createSegment(0, 0, 0, "sprSegMetalRoad01_", [0], 0, 30),
                    this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                    this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),

                    this.createSegment(0, 0, 0, "sprSegMetroPlatform01_", [0], 0, 2),
                    this.createSegment(-0.01, 0, 0, "sprSegMetroPlatform00_", [0, 1, 2, 3, 4, 5, 6, 7], 1, 64),
                    this.createSegment(0.01, 0, 0, "sprSegMetroPlatform01_", [0], 0, 2),
                    this.createSegment(0.01, 0, 0, "sprSegMetroLine00_", [0, 0, 0, 3], 0.5, 62),

                    this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                    this.createSegment(0, 0, 0, "sprSegMetalRoad00_", [0], 0, 64),
                    this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),

                    this.createSegment(0.01, -0.025, Math.PI, "sprSegAirVent00_", [0], 0, 64),
                    this.createSegment(0, 0.025, 0, "sprSegAirVent00_", [0], 0, 64),//x-0.01
                    this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),//8
                    this.createSegment(0, 0, 0, "sprSegMetalRoad00_", [0], 0, 56),//88
                    this.createSegment(-0.01, 0, 0, "sprSegMetalRoad00_", [0], 0, 64),

                    this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                    this.createSegment(0, 0, 0, "sprSegMetalRoad00_", [0], 0, 64),
                    this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
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
                    this.createSegment(0, 0, 0, "sprSegFinishLineClamp_", [0], 0, 1),
                    this.createSegment(0, 0, 0, "sprSegFinishLine_", [0, 1], 0.25, 16),
                    this.createSegment(0, 0, 0, "sprSegFinishLineClamp_", [0], 0, 1),

                    this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                    this.createSegment(0, 0, 0, "sprSegLabRoad00_", [4, 3, 2, 1, 0, 0, 1, 2, 3], 1, 64),
                    this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),

                    this.createSegment(-0.05, 0, 0, "sprSegLabRoad00_", [4, 3, 2, 1, 0, 0, 1, 2, 3], 1, 64),
                    this.createSegment(0.05, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                    this.createSegment(0.05, 0, 0, "sprSegTreeRoad00_", [0, 1, 2, 3, 4, 5, 6, 7], -1, 56),//56

                    this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                    this.createSegment(0, 0.02, 0, "sprSegMetalRoad00_", [0], 0, 64),
                    this.createSegment(0, -0.02, Math.PI * 0.5, "sprSegMetalRoad00_", [0], 0, 64),

                    this.createSegment(-0.01, 0, Math.PI * 0.5, "sprSegMetalRoad01_", [0], 0, 72),
                    this.createSegment(0.01, 0, 0, "sprSegMetalRoad00_", [0], 0, 72),

                    this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),

                    this.createSegment(0, -0.02, 0, "sprSegTreeRoad00_", [0, 1, 2, 3, 4, 5, 6, 7], -1, 64),
                    this.createSegment(0.05, 0.02, 0, "sprSegLabRoad00_", [4, 3, 2, 1, 0, 0, 1, 2, 3], 1, 64),
                    this.createSegment(-0.05, 0, 0, "sprSegLabRoad00_", [4, 3, 2, 1, 0, 0, 1, 2, 3], 1, 64),
                    this.createSegment(0, -0.02, 0, "sprSegTreeRoad00_", [0, 1, 2, 3, 4, 5, 6, 7], -1, 64),
                    this.createSegment(-0.02, 0.02, 0, "sprSegTreeRoad00_", [0, 1, 2, 3, 4, 5, 6, 7], -1, 64),
                    this.createSegment(0.02, 0, 0, "sprSegLabRoad00_", [4, 3, 2, 1, 0, 0, 1, 2, 3], 1, 64),

                    this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),

                    this.createSegment(-0.01, -0.025, 0, "sprSegAirVent00_", [0], 0, 128),
                    this.createSegment(0.01, 0.025, 0, "sprSegAirVent00_", [0], 0, 128),

                    this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),

                    this.createSegment(0, 0, Math.PI * 2, "sprSegTreeRoad00_", [0, 1, 2, 3, 4, 5, 6, 7], -1, 128),

                    this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),

                    this.createSegment(0, -0.05, 0, "sprSegLabRoad00_", [4, 3, 2, 1, 0, 0, 1, 2, 3], 1, 64),
                    this.createSegment(0.01, 0.05, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                    this.createSegment(0.01, 0.05, 0, "sprSegTreeRoad00_", [0, 1, 2, 3, 4, 5, 6, 7], -1, 56),
                    this.createSegment(-0.01, 0, 0, "sprSegTreeRoad00_", [0, 1, 2, 3, 4, 5, 6, 7], -1, 64),

                    this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                    this.createSegment(0, 0, 0, "sprSegLabRoad00_", [4, 3, 2, 1, 0, 0, 1, 2, 3], 1, 72),
                    this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
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
                    this.createSegment(0, 0, 0, "sprSegFinishLineClamp_", [0], 0, 1),
                    this.createSegment(0, 0, 0, "sprSegFinishLine_", [0, 1], 0.25, 16),
                    this.createSegment(0, 0, 0, "sprSegFinishLineClamp_", [0], 0, 1),

                    this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),

                    this.createSegment(0.01, -0.01, Math.PI * -0.15, "sprSegMetroLine00_", [0, 0, 0, 3], 0.5, 64),
                    this.createSegment(-0.01, 0.01, Math.PI * -0.15, "sprSegMetroLine00_", [0, 0, 0, 3], 0.5, 64),
                    this.createSegment(0, 0, 0, "sprSegMetroLine00_", [0, 0, 0, 3], 0.5, 62),

                    this.createSegment(0, 0, Math.PI * -0.15, "sprSegMetroLine00_", [0, 0, 0, 3], 0.5, 64),

                    this.createSegment(0, 0, 0, "sprSegMetroPlatform01_", [0], 0, 2),
                    this.createSegment(-0.02, 0, 0, "sprSegMetroPlatform00_", [0, 1, 2, 3, 4, 5, 6, 7], 1, 64),
                    this.createSegment(0.02, 0.01, 0, "sprSegMetroPlatform01_", [0], 0, 2),
                    this.createSegment(0.02, 0.01, 0, "sprSegMetroLine00_", [0, 0, 0, 3], 0.5, 62),
                    this.createSegment(0, -0.01, 0, "sprSegMetroLine00_", [0, 0, 0, 3], 0.5, 64),
                    this.createSegment(0, 0, 0, "sprSegMetroLine00_", [0, 0, 0, 3], 0.5, 32),

                    this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),

                    this.createSegment(0, 0, Math.PI * -1, "sprSegMetalRoad02_", [0, 1], 1, 64),
                    this.createSegment(0.05, 0, Math.PI * -1, "sprSegMetalRoad02_", [0, 1], 1, 64),
                    this.createSegment(-0.05, 0.025, Math.PI * -1, "sprSegMetalRoad00_", [0], 0, 64),
                    this.createSegment(0, -0.025, 0, "sprSegMetalRoad00_", [0], 0, 64),

                    this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
                    this.createSegment(0, 0, 0, "sprSegTreeRoad00_", [0, 1, 2, 3, 4, 5, 6, 7], -1, 64),
                    this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),

                    this.createSegment(0, 0, 0, "sprSegMetroPlatform01_", [0], 0, 2),
                    this.createSegment(-0.02, 0, Math.PI * 0.075, "sprSegMetroPlatform00_", [0, 1, 2, 3, 4, 5, 6, 7], 1, 64),
                    this.createSegment(0.02, 0, Math.PI * 0.15, "sprSegMetroPlatform01_", [0], 0, 2),
                    this.createSegment(0.02, 0, Math.PI * 0.15, "sprSegMetroLine00_", [0, 0, 0, 3], 0.5, 62),
                    this.createSegment(0, 0, Math.PI * 0.015, "sprSegMetroLine00_", [0, 0, 0, 3], 0.5, 64),

                    this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),

                    this.createSegment(0.02, 0.05, Math.PI * 1.5, "sprSegMetalRoad02_", [0, 1], 1, 64),
                    this.createSegment(0.01, -0.05, Math.PI * 1.5, "sprSegMetalRoad02_", [0, 1], 1, 64),
                    this.createSegment(-0.01, 0, 0, "sprSegMetalRoad00_", [0], 0, 17),
                    this.createSegment(-0.01, 0, 0, "sprSegAirVent00_", [0], 0, 40),
                    this.createSegment(-0.01, 0, 0, "sprSegMetalRoad00_", [0], 0, 7),
                    this.createSegment(-0.02, 0, 0, "sprSegMetalRoad00_", [0], 0, 64),

                    this.createSegment(0, 0, 0, "sprSegMetalRoad05_", [0, 1, 2, 3, 3, 2, 0, 0], 1, 8),
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
            default:
                break;
        }

        //sum up track length
        this.scene.trackLength = 0;
        for (let s of this.scene.trackData) {
            this.scene.trackLength += s.units;
        }

        this.scene.ui.minimap.createMiniMap();
    }
}