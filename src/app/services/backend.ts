import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { IDataProvider } from '../data-access/da-interface'

import { Form } from '../models/form'
import { Mock } from '../data-access/da-mock';
import { ComboItem } from '../models/combo-item'
import { ListItem } from '../models/list-item'
import { Time } from '@angular/common';
import { DTOTable } from '../models/DTOTable'
import { DTOField } from '../models/DTOField'
import { FieldUI } from '../models/fieldui'
import { HookFactory } from '../hooks/hook-factory'
import { IHook } from '../hooks/hook-interface'

@Injectable()
export class BackEndService {
    Form: Form;
    Child: Form;
    FormName: string = "";
    FormId: number = 0;
    FormNames: Array<ListItem>;
    InfrastructureNames: Array<ListItem>;
    Provider: string; //mock, localstorage, remote
    Combos: Array<ComboItem>;
    Aux: Array<ListItem>;
    private userDate: Date = new Date();
    DateString = "";
    TimeString = "";
    TotalRows: number = 0;
    ImageList: Array<ListItem> = [];
    Rows: Array<Array<DTOField<any>>> = [];
    Factory: HookFactory = new HookFactory();
   
    Message : string = "";

    da: IDataProvider;
    get DA()
    {
        if ( ! this.da)
            this.da = this.dataProviderFactory(this.dp);
        return this.da;
    }

    set DA(value){
        this.da = value;
    }
    dp: string;

    get UserDate(){
        return this.userDate;
    }

    OnInit(){
        //todo: load infrastructure data. imagelist, items, etc
        this.ImageList = this.DA.Load<Array<ListItem>>("image-list",this.ImageList);
        if ( !this.ImageList  )
           this.ImageList = new Array<ListItem>();

        this.Rows = this.DA.Load<Array<Array<DTOField<any>>>>("data",this.Rows);
        if ( !this.Rows)
            this.Rows = new  Array<Array<DTOField<any>>>();
        
    }

    public ClearData()
    {
    }

    OnDestroy(){
        this.DA.Save<Array<ListItem>>("image-list",this.ImageList);
        this.DA.Save< Array<Array<DTOField<any>>>>("data",this.Rows);
    }

    SaveForm():number
    {
        let result = 0;
        //if ( !this.Rows )
        //    this.Rows = new  Array<Array<DTOField<any>>>();

        if ( this.Form.Rows.length > 0)
        {
            if ( this.Form.Infrastructure)
            {
                let ri = new Array<Array<DTOField<any>>>();
                ri = this.DA.Load<Array<Array<DTOField<any>>>>(`infrastructure.${this.Form.Name}`,ri);
                if ( !ri )
                    ri = new Array<Array<DTOField<any>>>();

                //assigns ids    
                let i = ri.length;
                for(let r in this.Form.Rows)
                {
                    this.Form.Rows[r][0].Value= i;
                    i++;
                    ri.push(this.Form.Rows[r]);
                }
                //console.log("ri after save:",ri);
                this.DA.Save<Array<Array<DTOField<any>>>>(`infrastructure.${this.Form.Name}`, ri);
            }
            else
            {
                let i = this.Rows.length;
                for(let r in this.Form.Rows)
                {
                    this.Form.Rows[r][0].Value= i;
                    i++;
                    this.Rows.push(this.Form.Rows[r]);
                }
                result = this.DA.Save<Array<Array<DTOField<any>>>>("data",this.Rows);
                //console.log("data after save:",this.Rows);
            }
        }
        this.Form.Rows = new  Array<Array<DTOField<any>>>();
        this.Form.AddFirstRow();
        console.log("form saved:",this.Form);
        return result;
    } 

    public SetUserDate(d: string, t: string )
    {
        this.DateString = d;
        this.TimeString = t;

        this.userDate= new Date(`${d} ${t}`);
        console.log("date from string:", d,t,this.userDate);

    }

    public AddImageList(url:string):number
    {
        let id = this.ImageList.length;
        this.ImageList.push(new ListItem(id,url));
        return id;
    }



    public LoadForm():void {
        this.FormName = this.FormNames.filter(x=>x.Id == this.FormId)[0].Value;
        console.log("Load Form, formName:"  , this.FormName, this.FormId);
        this.Form = this.DA.LoadForm(this.FormName);
        if ( this.Form)
        {
            this.Form.bs = this;
            this.Form.DTOFields[0].Value = this.Form.Rows.length;
            this.Form.DTOFields[1].Value = this.userDate;
            this.Form.DTOFields[2].Value = this.FormId;
        }
    }

    public LoadInfrastructureForm():void {
        this.FormName = this.InfrastructureNames.filter(x=>x.Id == this.FormId)[0].Value;
        console.log("Load Infrastructure Form,formName:"  , this.FormName, this.FormId);
        this.Form = this.DA.LoadForm(this.FormName);
        if ( this.Form)
        {
            this.Form.bs = this;
            this.Form.DTOFields[0].Value = this.Form.Rows.length;
            //this.Form.DTOFields[1].Value = this.userDate;
            //this.Form.DTOFields[2].Value = this.FormId;
        }
    }

    public FieldOnExit(uiFieldId: number):void{
        if ( this.Form.UI[uiFieldId].OnExit)
        {
            let pi = this.Factory.GetHook(this.Form.UI[uiFieldId].OnExit);
            if( pi )
            {
                pi.Form = this.Form;
                pi.Process(uiFieldId);
            }
        }
    }

    private dataProviderFactory(name:string):IDataProvider{
        let da = null;
        if ( name.toUpperCase() == "MOCK")
            da = new Mock();

        return da;
    }

    constructor() {
        //todo: get this from configuration
        this.dp = "MOCK";
        this.DA = this.dataProviderFactory(this.dp);
        this.FormNames = this.DA.LoadFormList();
        this.InfrastructureNames = this.DA.LoadInfrastructureList();
    }

    Load<T>(key:string, obj: T):T{
        return this.DA.Load<T>(key,obj);
    }

}
