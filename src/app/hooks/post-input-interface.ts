import {DTOField } from '../models/DTOField'
import { Form } from '../models/form'

export interface IPostInput {

    //PostInput(fieldName: string,value: any, fieldsMap: Map<string,number>, dtoFields: Array<DTOField<any>>)
    PostInput(fieldName: string,value: any, form: Form)


}
