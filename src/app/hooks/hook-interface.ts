import {DTOField } from '../models/DTOField'
import { Form } from '../models/form'

export interface IHook {

    //PostInput(fieldName: string,value: any, fieldsMap: Map<string,number>, dtoFields: Array<DTOField<any>>)
    Form: Form;

    Process(uiFieldId: number)


}
