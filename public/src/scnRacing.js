import Hand from "./ui/hand.js";
import MusicPlayer from "./musicPlayer.js";
import Segment from "./racing/segment.js";
import CamRacing from "./racing/cam.js";
import Player from "./racing/player.js";
import Track from "./racing/track.js";

export default class ScnRacing extends Phaser.Scene {

   constructor() {
      super("ScnRacing");
   }

   init(_data) {
      this.bikeData = _data.bikeData;
      this.bikeData.asset += _data.livery;
   }

   create() {
      //console.log(this);
      this.cameras.main.setScroll(-this.game.config.width * 0.5, -this.game.config.height * 0.5);
      this.cameras.main.setBackgroundColor(0x000000);

      this.cameras.main.fadeFrom(500, 0, 0, 0, false, (_cam, _pct) => {

      }, this);

      this.left = this.game.config.width * -0.5;
      this.right = this.game.config.width * 0.5;
      this.top = this.game.config.height * -0.5;
      this.bottom = this.game.config.height * 0.5;

      this.cursors = this.input.keyboard.createCursorKeys();
      this.keys = {
         e: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
         q: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
         w: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
         a: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
         s: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
         d: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
         space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
         end: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.END),
         one: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE),
         two: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO),
         three: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE),
         four: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR),
         five: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE),
         six: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX),
         seven: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEVEN),
         eight: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.EIGHT),
         nine: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NINE),
         zero: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO),
         tab: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB),
         plus: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ADD),
         minus: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_SUBSTRACT),
      }

      this.hand = new Hand(this);
      //this.musicPlayer = new MusicPlayer(this);
      this.cam = new CamRacing(this, {x: 0, y: 0, z: 0}, {yaw: 0, pitch: 0, roll: 0});
      this.player = new Player(this, this.cam, {x: 0, y: 0, z: 0});
      
      this.delta = {
         current: 0,
         treshold: 16,
      }

      this.track = {
         points: [],
      }



      this.track = new Track(this);
      
      
      

      this.segments = [];
      for(let i = 0 ; i < Math.min(this.track.points.length, 128) ; i++){
         //this.segments.push(new Segment(this, { x: 0, y: 0, z: i }, rot, "sprSegLabRoad00", Math.floor(i*1) % 5/* % 4 === 0 ? 0 : 1*/));
         this.segments.push(new Segment(this, { x: this.track.points[i].pos.x, y: this.track.points[i].pos.y, z: this.track.points[i].pos.z }, 0, this.track.points[i].asset, this.track.points[i].frame/* % 4 === 0 ? 0 : 1*/));
      }

      //sppawn player at the correct position and orientation
      this.player.jumpToTrackPoint(0);
   }

   update(_time, _delta) {
      //greenscalePipeline.setFloat1('time', _time * 0.01);
      //console.log(_time);

      this.hand.update();
      this.fillInputs();

      this.player.update();
      this.cam.update();

      this.delta.current += _delta;
      /*while (this.delta.current >= this.delta.treshold) {
         this.delta.current -= this.delta.treshold;
         //do stuff
      }*/

      for(let s of this.segments){
         s.update();
         s.calculate3d(this.cam.pos, this.cam.dir);
         s.draw();
      }
   }

   fillInputs() {
      let gamepad = null;
      gamepad = navigator.getGamepads()[Math.max(0, gamepadsConnected - 1)];
      if (gamepad === undefined) {
         gamepad = null;
      }

      //GAS-BREAK
      INPUTS.stickLeft.vertical = 0;
      INPUTS.stickLeft.horizontal = 0;
      if (this.keys.w.isDown || (gamepad !== null ? gamepad.buttons[7].pressed : false)) {
         INPUTS.stickLeft.vertical = -1;
      } else if (this.keys.s.isDown || (gamepad !== null ? gamepad.buttons[6].pressed : false)) {
         INPUTS.stickLeft.vertical = 1;
      } else {
         if (gamepad !== null) {
            //INPUTS.stickLeft.vertical = gamepad.axes[1];
         }
      }
      //LEFT-RIGHT
      if (this.keys.a.isDown || this.cursors.left.isDown) {
         INPUTS.stickLeft.horizontal = -1;
      } else if (this.keys.d.isDown || this.cursors.right.isDown) {
         INPUTS.stickLeft.horizontal = 1;
      } else {
         if (gamepad !== null) {
            INPUTS.stickLeft.horizontal = gamepad.axes[0];
         }
      }
      //PITCH UP-DOWN
      INPUTS.stickRight.vertical = 0;
      INPUTS.stickRight.horizontal = 0;
      if (this.cursors.up.isDown) {
         INPUTS.stickRight.vertical = -1;
      } else if (this.cursors.down.isDown) {
         INPUTS.stickRight.vertical = 1;
      } else {
         if (gamepad !== null) {
            INPUTS.stickRight.vertical = gamepad.axes[3];
         }
      }
      //LOOK LEFT-RIGHT
      if (this.keys.q.isDown) {
         INPUTS.stickRight.horizontal = -1;
      } else if (this.keys.e.isDown) {
         INPUTS.stickRight.horizontal = 1;
      } else {
         if (gamepad !== null) {
            INPUTS.stickRight.horizontal = gamepad.axes[2];
         }
      }
      //TAB
      if (this.keys.tab.isDown || (gamepad !== null ? gamepad.buttons[4].pressed : false)) {
         if (INPUTS.btnShoulderLeft.pressed === false) {
            INPUTS.btnShoulderLeft.justPressed = true;
            INPUTS.btnShoulderLeft.pressed = true;
            INPUTS.btnShoulderLeft.justReleased = false;
         } else {
            INPUTS.btnShoulderLeft.justPressed = false;
         }
      } else {
         if (INPUTS.btnShoulderLeft.pressed === true) {
            INPUTS.btnShoulderLeft.pressed = false;
            INPUTS.btnShoulderLeft.justReleased = true;
            INPUTS.btnShoulderLeft.justPressed = false;
         } else {
            INPUTS.btnShoulderLeft.justReleased = false;
         }
      }
      //A
      if (this.keys.end.isDown || (gamepad !== null ? gamepad.buttons[1].pressed : false)) {
         if (INPUTS.btnA.pressed === false) {
            INPUTS.btnA.justPressed = true;
            INPUTS.btnA.pressed = true;
            INPUTS.btnA.justReleased = false;
         } else {
            INPUTS.btnA.justPressed = false;
         }
      } else {
         if (INPUTS.btnA.pressed === true) {
            INPUTS.btnA.pressed = false;
            INPUTS.btnA.justReleased = true;
            INPUTS.btnA.justPressed = false;
         } else {
            INPUTS.btnA.justReleased = false;
         }
      }
   }
}