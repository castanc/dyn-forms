import { IHookForm } from './hook-form-interface'
import { DTOField } from '../models/DTOField'
import { Form } from '../models/form'


export class SaveImage implements IHookForm{
    Form: Form;

    Process()
    {
        let url = this.Form.DTOFields[this.Form.GetUIFieldByname('Url').IdField].Value;
        this.Form.DTOFields[this.Form.GetUIFieldByname('ImageiID').IdField].Value =  this.Form.bs.AddImageList(url);
        console.log("PostInout.ImageSave()",url,)

    }

}
