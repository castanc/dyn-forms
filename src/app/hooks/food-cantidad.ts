import { IHook } from './hook-interface'
import { DTOField } from '../models/DTOField'
import { Form } from '../models/form'

export class FoodCantidad implements IHook {
    
    Form: Form;
    Process(uiFieldId:number)
    {
        /*
        f.DTOFields[f.FieldsMap.get("Calories")].Value = f.DTOFields[f.FieldsMap.get("Calories")].Value * f.DTOFields[f.FieldsMap.get("Cantidad")].Value / value ;
        f.DTOFields[f.FieldsMap.get("Fat")].Value = f.DTOFields[f.FieldsMap.get("Fat")].Value * f.DTOFields[f.FieldsMap.get("Cantidad")].Value / value ;
        f.DTOFields[f.FieldsMap.get("Sugar")].Value = f.DTOFields[f.FieldsMap.get("Sugar")].Value * f.DTOFields[f.FieldsMap.get("Cantidad")].Value / value ;
        f.DTOFields[f.FieldsMap.get("Sodium")].Value = f.DTOFields[f.FieldsMap.get("Sodium")].Value * f.DTOFields[f.FieldsMap.get("Cantidad")].Value / value ;
        return f.DTOFields;
        */
    }

}
