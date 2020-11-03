export default class MusicPlayer{
    constructor(_scene){
        this.scene = _scene;

        this.tracks = [];
        this.tracks.push(this.scene.sound.add("musTrack0", { volume: OPTIONS.sound.music }));
        this.tracks.push(this.scene.sound.add("musTrack1", { volume: OPTIONS.sound.music }));
        this.tracks.push(this.scene.sound.add("musTrack2", { volume: OPTIONS.sound.music }));
        this.tracks.push(this.scene.sound.add("musTrack3", { volume: OPTIONS.sound.music }));
        this.tracks.push(this.scene.sound.add("musTrack4", { volume: OPTIONS.sound.music }));
        this.tracks.push(this.scene.sound.add("musTrack5", { volume: OPTIONS.sound.music }));
        this.tracks.push(this.scene.sound.add("musTrack6", { volume: OPTIONS.sound.music }));

        for(let t of this.tracks){
            t.on("complete", () => this.playTrackRandom());
        }

        this.currentTrack = 0;
    }

    update(){

    }

    playTrack(_no = 0) {
        if(_no >= this.tracks.length){
            _no = 0;
        }
        this.currentTrack = Math.max(0, Math.min(this.tracks.length-1, _no));
        for(let t of this.tracks){
            t.stop();
        }
        this.tracks[this.currentTrack].play();
    }

    playTrackRandom(){
        this.currentTrack = Math.floor(Math.random() * this.tracks.length);
        for (let t of this.tracks) {
            t.stop();
        }
        this.tracks[this.currentTrack].play();
    }
}