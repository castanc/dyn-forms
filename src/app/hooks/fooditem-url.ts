import { IPostInput } from './post-input-interface'
import { DTOField } from '../models/DTOField'
import { Form } from '../models/form'


export class FoodItemUrl implements IPostInput{

    PostInput(fieldName: string,value: any, f:Form)
    {
        let fUI = f.UI.filter(x=>x.Name== fieldName)[0];
        if( fUI )
        {
            f.Fields[fUI.ImageFieldId].Value = f.bs.AddImageList(f.DTOFields[fUI.Id].Value);
            console.log("url saved:",f.bs.ImageList.length);
            //this.fUI.ImageSource = this.DTOField.Value;
            f.DTOFields[fUI.Id].Value = "";
        }

    }

}
