import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { IDataProvider } from '../data-access/da-interface'

import { Form } from '../models/form'
import { Mock } from '../data-access/da-mock';
import { ComboItem } from '../models/combo-item'
import { ListItem } from '../models/list-item'
import { Time } from '@angular/common';
import { DTOTable } from '../models/DTOTable'
import { DTOField } from '../models/DTOField'

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
    Message : string = "";

    DA: IDataProvider;
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

    OnDestroy(){
        this.DA.Save<Array<ListItem>>("image-list",this.ImageList);
        this.DA.Save< Array<Array<DTOField<any>>>>("data",this.Rows);
    }

    SaveForm(f: Form):number
    {
        let result = 0;
        this.Form = f;
        if ( !this.Rows )
            this.Rows = new  Array<Array<DTOField<any>>>();

        if ( f.Rows.length > 0)
        {
            if ( f.Infrastructure)
            {
                let ri = new Array<Array<DTOField<any>>>();
                ri = this.DA.Load<Array<Array<DTOField<any>>>>(`infrastructure.${f.Name}`,ri);
                if ( !ri )
                    ri = new Array<Array<DTOField<any>>>();

                //asigns ids    
                for( let i = 0; i++; i< f.Rows.length){
                    f.Rows[i][0].Value = ri.length + i;
                }
                ri.concat(f.Rows);
                this.DA.Save<Array<Array<DTOField<any>>>>(`infrastructure.${f.Name}`, ri);
            }
            else
            {
                //asigns ids    
                for( let i = 0; i++; i< f.Rows.length){
                    f.Rows[i][0].Value = this.Rows.length + i;
                }
                this.Rows = this.Rows.concat(f.Rows);
                result = this.DA.Save<Array<Array<DTOField<any>>>>("data",this.Rows);
            }
            f.Rows = new  Array<Array<DTOField<any>>>();
            f.AddFirstRow();
    }
        return result;
    }

    public SetUserDate(d: string, t: string )
    {
        this.DateString = d;
        this.TimeString = t;

        this.userDate= new Date(`${d} ${t}`);
        console.log("date from string:", this.userDate);

    }

    public AddImageList(url:string):number
    {
        let id = this.ImageList.length;
        this.ImageList.push(new ListItem(id,url));
        return id;
    }



    public LoadForm():void {
        this.FormName = this.FormNames.filter(x=>x.Id == this.FormId)[0].Value;
        console.log("Load Form,formName:"  , this.FormName, this.FormId);
        this.Form = this.DA.LoadForm(this.FormName);
        if ( this.Form)
        {
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
            this.Form.DTOFields[0].Value = this.Form.Rows.length;
            //this.Form.DTOFields[1].Value = this.userDate;
            //this.Form.DTOFields[2].Value = this.FormId;
        }
    }

    private dataProviderFactory(name:string):IDataProvider{
        let da = null;
        if ( name.toUpperCase() == "MOCK")
            da = new Mock();

        return da;
    }

    constructor() {
        this.dp = "MOCK";
        if ( ! this.DA)
            this.DA = this.dataProviderFactory(this.dp);
        this.FormNames = this.DA.LoadFormList();
        this.InfrastructureNames = this.DA.LoadInfrastructureList();
    }

}
