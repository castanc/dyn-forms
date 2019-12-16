import { IPostInput } from './post-input-interface'
import { DTOField } from '../models/DTOField'
import { Form } from '../models/form'

export class FoodCantidad implements IPostInput {
    
    PostInput(fieldName: string,value: any,  f: Form)
    {
        f.DTOFields[f.FieldsMap.get("Calories")].Value = f.DTOFields[f.FieldsMap.get("Calories")].Value * f.DTOFields[f.FieldsMap.get("Cantidad")].Value / value ;
        f.DTOFields[f.FieldsMap.get("Fat")].Value = f.DTOFields[f.FieldsMap.get("Fat")].Value * f.DTOFields[f.FieldsMap.get("Cantidad")].Value / value ;
        f.DTOFields[f.FieldsMap.get("Sugar")].Value = f.DTOFields[f.FieldsMap.get("Sugar")].Value * f.DTOFields[f.FieldsMap.get("Cantidad")].Value / value ;
        f.DTOFields[f.FieldsMap.get("Sodium")].Value = f.DTOFields[f.FieldsMap.get("Sodium")].Value * f.DTOFields[f.FieldsMap.get("Cantidad")].Value / value ;
        return f.DTOFields;
    }

}
