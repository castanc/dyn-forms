import { Field } from './field'
import { FieldUI } from './fieldUI'
import { ComboItem } from './combo-item'
import { ListItem } from './list-item'
import { DTORecord } from './DTORecord'
import { DTOField } from './DTOField'
import { TypeofExpr } from '@angular/compiler'

export class Form{
    Id: number = 0;
    Code: string;
    IsTabular: boolean = false;
    Title: string = "";
    private fields: Array<Field<any>>;
    private DTOFields: Array<DTOField<any>>
    private RawDTO: Array<any>;
    private ui: Array<FieldUI>;
    get Fields(){ return this.fields;}
    get UI() { return this.ui;}

    ChildForm: string;


    constructor(){
        this.fields = new Array<Field<any>>();
        this.DTOFields = new Array<DTOField<any>>();
        this.ui = new Array<FieldUI>();
    }

    GetField(id:number):Field<any>{
        return this.fields.filter(x => x.Id == id)[0];
    }

    /*
    AddField(f: Field<any>)
    {
        f.Id = this.Fields.length;
        this.Fields.push(f);
    }
    */

    //TODO: Verify if this is better that casting fron any
    AddFieldTyped<T>(f: Field<T>){
        f.Id = this.Fields.length;
        this.Fields.push(f);

        let dtoField = new DTOField<T>();
        dtoField.Id = f.Id;
        dtoField.Value = f.Value;
        this.DTOFields.push(dtoField);
        
    }

    AddFieldUI(f: FieldUI){
        f.Id = this.UI.length;
        this.UI.push(f);

    }

    UpdateDTO()
    {
        this.RawDTO = new Array<any>();
        for (let index = 0; index < this.fields.length; index++)
        {
          let dtoField = this.DTOFields.filter(x=>x.Id==this.fields[index].Id)[0];
          dtoField.Value = this.fields[index].Value;
          this.RawDTO.push(this.fields[index].Value);
        }
        console.log("UpdateDTO", this.DTOFields);
        console.log("RawDTO",this.RawDTO);
    
    }

  
}
