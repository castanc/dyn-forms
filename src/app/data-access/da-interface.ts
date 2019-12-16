import {Form} from '../models/form'
import { ListItem } from '../models/list-item'

export interface IDataProvider {

    TotalStorage: number;
    FreeStorage: number;

    Save<T>(key: string, obj: T ):number;
    Load<T>(key: string, obj: T):T
    Remove(key:string):number;


    LoadFormList():Array<ListItem>;
    LoadInfrastructureList():Array<ListItem>;
    LoadForm(formName: string):Form;
    SaveForm(formName: string):number;
    SaveAll():number;
}
