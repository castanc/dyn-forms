import { Field } from './field'
import { FieldUI } from './fieldUI'
import { ComboItem } from './combo-item'
import { ListItem } from './list-item'

export class Form{
    Id: number = 0;
    Code: string;
    IsTabular: boolean = false;
    Title: string = "";
    private fields: Array<Field<any>>;
    private ui: Array<FieldUI>;
    get Fields(){ return this.fields;}
    get UI() { return this.ui;}

    ChildForm: string;


    constructor(){
        this.fields = new Array<any>();
        this.ui = new Array<FieldUI>();
    }

    AddField(f: Field<any>)
    {
        f.Id = this.Fields.length;
        this.Fields.push(f);
    }

    AddFieldUI(f: FieldUI){
        f.IdField = this.UI.length;
        this.UI.push(f);

    }

   
}
