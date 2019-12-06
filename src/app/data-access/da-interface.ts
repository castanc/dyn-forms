import {Form} from '../models/form'

export interface IDataProvider {

    LoadFormList():Array<string>;
    LoadForm(formName: string):Form;
    SaveForm(formName: string):number;
    SaveAll():number;
}
