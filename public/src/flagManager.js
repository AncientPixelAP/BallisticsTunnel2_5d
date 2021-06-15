export default class Flagmanager{
    constructor(){
        this.flags = [];
    }

    setFlag(_flagId, _value = true){
        let f = this.getFlagById(_flagId);
        if(f === null){
            console.log("creating new flag: " + _flagId)
            this.flags.push({
                id: _flagId,
                value: _value
            });
        }else{
            f.value = _value;
        }
        console.log(this.flags);
    }

    getFlagById(_flagId){
        let r = this.flags.filter((e) => {return e.id === _flagId});
        if(r.length > 0){
            return r[0];
        }else{
            return null;
        }
    }

    removeFlag(_flagId){
        this.flags = this.flags.filter((e) => {return e.id !== _flagId});
    }
}