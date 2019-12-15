import { Field } from './field'
import { FieldUI } from './fieldUI'
import { ComboItem } from './combo-item'
import { ListItem } from './list-item'
import { DTORecord } from './DTORecord'
import { DTOField } from './DTOField'
import { TypeofExpr } from '@angular/compiler'
import { RelatedMap } from './related-map'

export class Form{
    Id: number = 0;
    RecordType: number = 0;
    Fecha: Date;
    IsTabular: boolean = false;
    Title: string = "";
    private fields: Array<Field<any>>;
    private dtoFields: Array<DTOField<any>> = [];
    Rows: Array<Array<DTOField<any>>> = [];
    private ui: Array<FieldUI>;
    CurrentRow: number = 0;
    ChildForm: string;
    IgnoreFields = false;

    get Fields(){ return this.fields;}
    get UI() { return this.ui;}
    get DTOFields() { return this.Rows[this.CurrentRow];}

    public Maps: Array<RelatedMap> = [];


    constructor(){
        this.fields = new Array<Field<any>>();
        this.ui = new Array<FieldUI>();
    }

    AddFirstRow(){
        this.Rows.push(this.dtoFields);
    }

    GetField(id:number):Field<any>{
        return this.fields.filter(x => x.Id == id)[0];
    }

    AddFieldTyped<T>(f: Field<T>){
        f.Id = this.Fields.length;
        this.Fields.push(f);

        let dtoField = new DTOField<T>();
        dtoField.Value = f.Value;
        this.dtoFields.push(dtoField);
        
    }
   
    AddFieldUI(f: FieldUI){
        f.Id = this.UI.length;
        this.UI.push(f);

    }

    UpdateDTO( )
    {
        this.fields[1].Value = this.Fecha;
        this.fields[2].Value = this.RecordType;
        for (let index = 0; index < this.fields.length; index++)
        {
          console.log("Field type:",this.fields[index].Name, this.fields[index].Value, typeof(this.fields[index].Value));
        }
    
    }

  
}
