import { IHookForm } from './hook-form-interface'
import { DTOField } from '../models/DTOField'
import { Form } from '../models/form'


export class SaveImage implements IHookForm{
    Form: Form;

    Process()
    {
        
        /*
        let fUI = f.UI.filter(x=>x.Name== fieldName)[0];
        if( fUI && fUI.ImageFieldId)
        {
            f.Fields[fUI.ImageFieldId].Value = f.bs.AddImageList(f.DTOFields[fUI.IdField].Value);
            console.log("url saved:",f.bs.ImageList.length,f.bs.ImageList);
            fUI.ImageSource = f.DTOFields[fUI.IdField].Value;
            f.DTOFields[fUI.IdField].Value = "";
        }
        */

    }

}
