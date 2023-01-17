class verification{
    constructor(select,rule){
        this.input = $(select);
        this.p = this.input.nextElementSibling;
        this.rule = rule;
        this.input.onblur = ()=>{
            this.yz();
        }
    }
    async yz(){
       const result = await this.rule(this.input.value);
       if(result){
        this.p.innerText = result;
        return false;
       }else{
        this.p.innerText = '';
        return true;
       }
    }

    static async yz(...items){
        const itemarr = items.map(item => item.yz());
        const resultarr = await Promise.all(itemarr);
        return  resultarr.every(r => r);
    }
}
