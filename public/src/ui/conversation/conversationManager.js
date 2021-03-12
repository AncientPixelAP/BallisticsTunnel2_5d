export default class ConversationManager{
    constructor(_scene){

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
                valid = true;
            }
            if (a.checkPlayerInventory !== undefined) {
                valid = false;
                for (let i of this.scene.playerData.inventory) {
                    if (i.type === a.checkPlayerInventory.type && i.data.id === a.checkPlayerInventory.dataId) {
                        valid = true;
                    }
                }
            }
            //push conversation option
            if (valid === true) {
                this.btnOptions.push({
                    data: a,
                    btn: new ListButton(this.scene, { x: this.pos.x - 150, y: this.pos.y - 8 + (i * 18) }, a.text, false, () => {
                        this.interpret(a.actions.split(" "));
                        socket.emit("talkToNPC", {
                            npcName: this.npcName,
                            npcTreePosition: this.conversation.treePosition,
                            playerId: this.scene.playerData.id,
                            playerName: this.scene.playerData.name
                        });
                    })
                });
            }
        }
    }

    interpret(_actions) {
        let arr = _actions;
        switch (arr[0]) {
            case "GOTO":
                this.goto(Number(arr[1]));
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

        if (this.npcSprite !== null) {
            this.npcSprite.destroy();
        }
        this.npcSprite = this.scene.add.sprite(this.pos.x - 142, this.pos.y - 85, elem.sprite);

        if (_id === 0 && this.npc.conversation.speakingTo.id !== null) {
            socket.emit("stopTalkToNPC", {
                npcName: this.npc.name
            })
        }
        this.createOptions(elem);
    }

    replaceCheck(_str) {
        if (this.npc !== null) {
            _str = _str.replace("PLAYERNAME", this.npc.conversation.speakingTo.name !== null ? this.npc.conversation.speakingTo.name : this.scene.playerData.name);
        } else {
            _str = _str.replace("PLAYERNAME", this.scene.playerData.name);
        }
        return _str;
    }

    setConversation(_fileName, _startId) {
        this.conversation.file = this.scene.cache.json.get(_fileName);
        this.conversation.treePosition = _startId;
        this.goto(_startId);
    }
}