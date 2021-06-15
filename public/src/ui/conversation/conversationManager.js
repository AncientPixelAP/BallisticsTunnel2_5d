import ConversationOption from "./conversationOption.js"

export default class ConversationManager{
    constructor(_scene){
        this.scene = _scene;
        this.btnOptions = [];
        this.npc = null;
        this.npcSprite = null;
        this.npcText = this.scene.add.bitmapText(0, -32, "pixelmix", "", 8, 1).setOrigin(0.5);
        this.npcText.maxWidth = 480;
        this.conversation = {
            file: null,
            treePosition: 0,
            speakingTo: {
                name: ""
            }
        }

        this.highlightedAnswer = 0;
        this.usedKeyboard = false;
        this.cooldown = {
            current: 0,
            max: 10
        }

        this.bg = this.scene.add.graphics();
    }

    update(){
        if(this.cooldown.current <= 0){
            let lit = null;
            for (let b of this.btnOptions) {
                b.btn.update();
                if(b.btn.state === b.btn.states.over){
                    lit = b;
                }
            }

            if(this.btnOptions.length > 0){
                if(INPUTS.btnUp.justPressed === true || INPUTS.stickLeft.asKey.up.justPressed === true){
                    this.usedKeyboard = true;
                    if(lit !== null){
                        lit.btn.state = lit.btn.states.out;
                    }
                    this.btnOptions[this.highlightedAnswer].btn.switchState(this.btnOptions[this.highlightedAnswer].btn.states.out);
                    this.highlightedAnswer -= 1;
                }
                if(INPUTS.btnDown.justPressed === true || INPUTS.stickLeft.asKey.down.justPressed === true){
                    this.usedKeyboard = true;
                    if(lit !== null){
                        lit.btn.state = lit.btn.states.out;
                    }
                    this.btnOptions[this.highlightedAnswer].btn.switchState(this.btnOptions[this.highlightedAnswer].btn.states.out);
                    this.highlightedAnswer += 1;
                }
                
                if(this.scene.hand.mouseMoved === true){
                    if(lit !== this.btnOptions[this.highlightedAnswer]){
                        this.btnOptions[this.highlightedAnswer].btn.switchState(this.btnOptions[this.highlightedAnswer].btn.states.out);
                    }
                    this.usedKeyboard = false;
                }

                if(this.usedKeyboard === true){
                    if(lit !== null){
                        lit.btn.switchState(lit.btn.states.out);
                    }
                    this.highlightedAnswer = Math.max(0, Math.min(this.highlightedAnswer, this.btnOptions.length-1));
                    this.btnOptions[this.highlightedAnswer].btn.switchState(this.btnOptions[this.highlightedAnswer].btn.states.over);
                }

                if(INPUTS.btnA.justReleased === true){
                    this.btnOptions[this.highlightedAnswer].btn.simulateClick();
                }
            }
        }else{
            this.cooldown.current -= 1;
        }
    }
    
    createOptions(_elem) {
        for (let b of this.btnOptions) {
            b.btn.destroy();
        }
        this.btnOptions = [];

        for (let [i, a] of _elem.answers.entries()) {
            let valid = true;
            //check if option is valid
            if (a.checkFlag !== undefined) {
                valid = false;
                //todo check if flag is set
                if (flagManager.getFlagById(a.checkFlag) !== null){
                    valid = true;
                }
            }
            /*if (a.checkPlayerInventory !== undefined) {
                valid = false;
                for (let i of this.scene.playerData.inventory) {
                    if (i.type === a.checkPlayerInventory.type && i.data.id === a.checkPlayerInventory.dataId) {
                        valid = true;
                    }
                }
            }*/
            //push conversation option
            if (valid === true) {
                this.btnOptions.push({
                    data: a,
                    btn: new ConversationOption(this.scene, { x: 0, y: (i * 18) }, a.text, () => {
                        this.interpret(a.actions.split(" "));
                    })
                });
            }
        }

        this.highlightedAnswer = Math.max(0, Math.min(this.highlightedAnswer, this.btnOptions.length-1));
        this.cooldown.current = this.cooldown.max;
    }

    interpret(_actions) {
        let arr = _actions;
        switch (arr[0]) {
            case "GOTO":
                this.goto(Number(arr[1]));
                arr.splice(0, 2);
            break;
            case "SETFILE":
                this.setConversation(arr[1], Number(arr[2]));
                arr.splice(0, 3);
            break;
            case "EXIT":
                arr.splice(0, 1);
                //save latest position in conversation for reentry
                if (this.npc != null) {
                    this.npc.data.conversation.treePosition = this.conversation.treePosition;
                }
                this.clearConversation();
                this.scene.player.setMode(PLAYERMODE.LOOK);
            break;
            case "SETFLAG":
                flagManager.setFlag(arr[1], arr[2]);
                arr.splice(0, 3);
            break;
            case "REMOVEFLAG":
                flagManager.removeFlag(arr[1]);
                arr.splice(0, 2);
            break;
            default:
                arr.splice(0, 1);
            break;
        }
        if (arr.length > 0) {
            this.interpret(arr);
        }
    }

    goto(_id) {
        this.conversation.treePosition = _id;
        let elem = this.conversation.file.cards.filter((e) => e.id === _id)[0];
        if (elem === undefined) {
            elem = this.conversation.file.cards[0];
        }
        this.npcText.setText(this.replaceCheck(elem.text));

        let tb = this.npcText.getTextBounds();
        this.bg.clear();
        this.bg.fillStyle(0x000000, 1);
        this.bg.fillRect(tb.local.x - (tb.local.width * 0.5) - 3, tb.local.y + this.npcText.y - (tb.local.height * 0.5) - 3, tb.local.width + 6, tb.local.height + 6);
        this.bg.depth = this.npcText.depth - 1;

        if (this.npcSprite !== null) {
            this.npcSprite.destroy();
        }
        if(elem.sprite !== undefined){
            //TODO eventually adding a sprite for people who speak to you
            //this.npcSprite = this.scene.add.sprite(-142, -85, elem.sprite);
        }

        this.createOptions(elem);
    }

    replaceCheck(_str) {
        /*if (this.npc !== null) {
            _str = _str.replace("PLAYERNAME", this.npc.conversation.speakingTo.name !== null ? this.npc.conversation.speakingTo.name : this.scene.playerData.name);
        } else {
            _str = _str.replace("PLAYERNAME", this.scene.playerData.name);
        }*/
        return _str;
    }

    setNPC(_npc){
        this.npc = _npc;
    }

    setConversation(_fileName, _startId) {
        this.conversation.file = this.scene.cache.json.get(_fileName);
        //save current fileName in NPC if possible for reentry purpose
        if (this.npc != null) {
            this.npc.data.conversation.fileName = _fileName;
        }
        this.conversation.treePosition = _startId;
        this.goto(_startId);
    }

    clearConversation(){
        this.npcText.setText("");
        for (let b of this.btnOptions) {
            b.btn.destroy();
        }
        this.btnOptions = [];
        if (this.npcSprite !== null) {
            this.npcSprite.destroy();
        }
        this.bg.clear();
    }

    destroy(){
        this.npcText.destroy();
        for (let b of this.btnOptions) {
            b.btn.destroy();
        }
        this.btnOptions = [];
        if (this.npcSprite !== null) {
            this.npcSprite.destroy();
        }
        this.bg.clear();
        this.bg.destroy();
    }
}