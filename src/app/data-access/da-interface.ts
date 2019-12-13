import {Form} from '../models/form'
import { ListItem } from '../models/list-item'

export interface IDataProvider {

    LoadFormList():Array<ListItem>;
    LoadForm(formName: string):Form;
    SaveForm(formName: string):number;
    SaveAll():number;
}
