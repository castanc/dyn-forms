import { IHook } from './hook-interface'
import { DTOField } from '../models/DTOField'
import { Form } from '../models/form'


export class RefreshImage implements IHook{
    Form: Form;

    Process(uiFieldId: number)
    {
        this.Form.UI[8].ImageSource = this.Form.DTOFields[7].Value;
        this.Form.DTOFields[10]
        /*
        console.log("IHook.RefreshImage()",uiFieldId, this.Form);
        if( this.Form.UI[uiFieldId].ImageField)
        {
            this.Form.DTOFields[this.Form.UI[uiFieldId].ImageFieldId].Value = this.Form.DTOFields[fUI.IdField].Value;
        }
        */

    } 
}
