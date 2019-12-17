import { OnInit, OnDestroy } from '@angular/core';
import { Field } from './field'
import { FieldUI } from './fieldUI'
import { ComboItem } from './combo-item'
import { ListItem } from './list-item'
import { DTORecord } from './DTORecord'
import { DTOField } from './DTOField'
import { TypeofExpr } from '@angular/compiler'
import { RelatedMap } from './related-map'
import { HookFactory } from '../hooks/hook-factory'
import { IPostInput } from '../hooks/post-input-interface'
import { BackEndService } from '../services/backend'

export class Form{
    Id: number = 0;
    RecordType: number = 0;
    Name = "";
    Fecha: Date;
    IsTabular: boolean = false;
    Title: string = "";
    private fields: Array<Field<any>>;
    public rFields:Array<Field<any>>;
    private dtoFields: Array<DTOField<any>> = [];
    private ui: Array<FieldUI>;
    Rows: Array<Array<DTOField<any>>> = [];
    RRows: Array<Array<DTOField<any>>> = [];
    FieldsMap: Map<string,number>;
    RFieldsMap:Map<string,number>;

    CurrentRow: number = 0;
    private currentRRow: number = 0;
    CurrentRRId : number = 0; 
    set CurrentRRow(value)
    {
       this.currentRRow = value;
       this.CurrentRRId = this.RRows[this.currentRRow][0].Value;


       console.log("rFielkds",this.rFields);
       if ( this.RFieldsMap.size == 0 ){
            this.RFieldsMap = new Map<string,number>();
            for(let f in this.rFields){
                this.RFieldsMap.set(this.rFields[f].Name, this.rFields[f].Id);
            }
       }
       for( let f in this.UI)
       {
           console.log("ui[f]",f,this.ui[f],this.RRows[this.currentRRow][this.RFieldsMap.get(this.ui[f].RelatedMap)].Value);
            if ( this.ui[f].RelatedMap && this.ui[f].RelatedMap != "" )
                this.DTOFields[this.FieldsMap.get(this.ui[f].Name)].Value = 
                    this.RRows[this.currentRRow][this.RFieldsMap.get(this.ui[f].RelatedMap)].Value;
       }
    }

    Infrastructure = false;
    RelatedFormName: string = ""; 

    ChildForm: string;
    IgnoreFields = false;
    Factory: HookFactory = new HookFactory();
    RelatedList: Array<ListItem>;
    //bs: BackEndService;
    Route: string = "create";


    get Fields(){ return this.fields;}
    get UI() { return this.ui;}
    get DTOFields() { return this.Rows[this.CurrentRow];}
    set DTOFields(value:Array<DTOField<any>>){
        this.Rows[this.CurrentRow] = value;
    }


    OnInit(){
    }

    OnDestroy(){
    }

    //todo: little fuzzy
    //maps the dtofield position to the field name
    public CreateFieldsMap():Map<string,number>{
        this.FieldsMap = new Map<string,number>();

        //todo: use array to map
        for(let i=0;i < this.ui.length; i++)
        {
            let f = this.fields.filter(x=>x.Id==this.ui[i].IdField)[0];
            if( f )
                this.FieldsMap.set(f.Name,i);
        }
        return this.FieldsMap;
    }


    public CreateRFieldsMap():Map<string,number>{
        this.RFieldsMap = new Map<string,number>();

        //todo: use array to map
        for(let f in this.rFields)
        {
            this.RFieldsMap.set(this.rFields[f].Name,this.rFields[f].Id);
        }
        console.log("rfieldsMap created", this.RFieldsMap);
        return this.RFieldsMap;
    }


    public Map: Array<Map<number,any>> = [];


    constructor(){
        this.fields = new Array<Field<any>>();
        this.ui = new Array<FieldUI>();
    }

    AddFirstRow(){
        this.Rows.push(this.dtoFields);
        this.CreateFieldsMap();
        this.CreateRFieldsMap();
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

    public AddImageList(url:string):number
    {
        return 
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

    public FieldPostInput(fieldName: string,value:any):void{
        let pi = this.Factory.GetHook(`${this.Name}-${fieldName}`);
        if( pi )
            this.DTOFields = pi.PostInput(fieldName,value, this);
    }
  
}
