import { Injectable } from '@angular/core';
import { IDataProvider } from '../data-access/da-interface'

import { Form } from '../models/form'
import { Mock } from '../data-access/da-mock';
import { ComboItem } from '../models/combo-item'
import { ListItem } from '../models/list-item'

@Injectable()
export class BackEndService {
    Form: Form;
    Child: Form;
    FormName: string = "";
    FormNames: Array<string>;
    Provider: string; //mock, localstorage, remote
    Combos: Array<ComboItem>;
    Aux: Array<ListItem>;

    DA: IDataProvider;
    dp: string;

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
        console.log("Backendservice.constructor() Form Names:",this.FormNames);
    }

}
