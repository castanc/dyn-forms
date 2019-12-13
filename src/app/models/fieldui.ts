import { ListItem } from '../models/list-item'

export class FieldUI{
    IdField: number;
    Id: number;
    Name: string;
    Label: string;
    HtmlType: string;   //input,textarea,select,checkbox,radio button
    HtmlInputType: string; //text,number,email,url,date
    HtmlSelectId: string;
    PlaceHolder: string;
    LabelMode: string;  //floating, left, placeholder 
    MaxLength: number;
    Mask: string;
    ImageId: number;    
    List: Array<ListItem> = null;
    SelectedValue: number = 0;

    constructor(idField:number,
        name:string,
        htmlType:string="input",
        htmlInputType:string="text",
        maxLength:number = 32,
        label:string=name,
        placeholder:string=label,
        htmlSelectId:string = "",
        labelMode:string="top",
        )
    {
        this.IdField = idField;
        this.Name = name;
        this.HtmlType = htmlType;
        this.HtmlInputType = htmlInputType;
        this.HtmlSelectId = htmlSelectId;
        this.IdField = idField;
        this.Label = label;
        this.PlaceHolder = placeholder;
        this.LabelMode = labelMode;
    }

    AddListItem(item: ListItem):void
    {
        if ( this.List == null )
            this.List = new Array<ListItem>();
        this.List.push(item);
    }
}
