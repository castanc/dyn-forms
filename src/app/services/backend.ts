import { Injectable } from '@angular/core';
import { IDataProvider } from '../data-access/da-interface'

import { Form } from '../models/form'
import { Mock } from '../data-access/da-mock';
import { ComboItem } from '../models/combo-item'
import { ListItem } from '../models/list-item'
import { Time } from '@angular/common';
import { DTOTable } from '../models/DTOTable'

@Injectable()
export class BackEndService {
    Form: Form;
    Child: Form;
    FormName: string = "";
    FormId: number = 0;
    FormNames: Array<ListItem>;
    Provider: string; //mock, localstorage, remote
    Combos: Array<ComboItem>;
    Aux: Array<ListItem>;
    private userDate: Date = new Date();
    DateString = "";
    TimeString = "";
    TotalRows: number = 0;

    DA: IDataProvider;
    dp: string;

    get UserDate(){
        return this.userDate;
    }

    public SetUserDate(d: string, t: string )
    {
        this.DateString = d;
        this.TimeString = t;

        this.userDate= new Date(`${d} ${t}`);
        console.log("date from string:", this.userDate);

    }



    public LoadForm():void {
        this.FormName = this.FormNames.filter(x=>x.Id == this.FormId)[0].Value;
        console.log("Load Form,f ormName:"  , this.FormName, this.FormId);
        this.Form = this.DA.LoadForm(this.FormName);
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
    }

}
