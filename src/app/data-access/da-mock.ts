import {IDataProvider } from './da-interface'
import { Form } from '../models/form';
import { Field } from '../models/field'
import { FieldUI } from '../models/fieldUI'
//import { findStaticQueryIds } from '@angular/compiler';
import { Time } from '@angular/common';
import { ListItem } from '../models/list-item';
import { DTOField} from '../models/DTOField'
import { RelatedMap } from '../models/related-map';
import { format } from 'url';

export class Mock implements IDataProvider{

    TotalStorage: number = 10*1024*1024;
    FreeStorage: number = this.TotalStorage;
    form: Form;

    Save<T>(key:string, obj: T):number{
        let serialized = JSON.stringify(obj);
        this.FreeStorage -= serialized.length;
        localStorage.setItem(key,serialized);
        console.log("Save:",key,"Length:",serialized.length, "Free:",this.FreeStorage);
        return this.FreeStorage;
    }

    Load<T>(key:string, obj: T):T{
        let serialized = localStorage.getItem(key);
        if ( serialized )
            obj = JSON.parse(serialized);
        else obj = null;
        return obj;
   }


   Remove(key:string):number{
       let result = 0;
       let serialized = localStorage.getItem(key);
       if ( serialized )
       {
            this.FreeStorage += serialized.length;
            localStorage.removeItem(key);
       }
       return result;
   }

    LoadFormList(): Array<ListItem> {
        let arr = new Array<ListItem>();
        arr.push(new ListItem(0,"Food"));
        arr.push(new ListItem(1,"Exercise"));
        arr.push(new ListItem(2,"Drug"));
        return arr; 
    }   

    loadRelatedRows(relatedFormName: string ):Array<Array<DTOField<any>>>{
        let rrows = new Array<Array<DTOField<any>>>();
        console.log("loadRelatedRows() RRows:",relatedFormName);
        rrows= new Array<Array<DTOField<any>>>();
        rrows = this.Load<Array<Array<DTOField<any>>>>(`infrastructure.${relatedFormName}`, rrows);
        if(!rrows)
            rrows= new Array<Array<DTOField<any>>>();

        return rrows;
    }

    public LoadRelatedFields(relatedFormName: string):Array<Field<any>>{
        let rf = this.LoadForm(relatedFormName);
        console.log("load related form:",rf)    ;
        return rf.Fields;
    }



    LoadInfrastructureList():Array<ListItem>{
        let arr = new Array<ListItem>();
        arr.push(new ListItem(0,"FoodItem"));
        return arr; 

    }


    LoadRecord(tableName:string,id:number):Array<DTOField<any>>{
        let arr = new Array<DTOField<any>>();
        let res = this.Load<Array<DTOField<any>>>(tableName, arr)
        return res;
    }


    private initFields():Form
    {
        let f = new Form();
        let fId = new Field<number>("Id",false,0);
        f.AddFieldTyped<number>(fId)    ;

        let fFecha = new Field<Date>("Fecha",false,new Date());
        f.AddFieldTyped<Date>(fFecha);

        let fRecordType = new Field<number>("RecordType",true,0);
        f.AddFieldTyped<number>(fRecordType);

        return f;

    }

    private createFoodItemsForm():Form {
        let f = this.initFields();
        f.Title = "Food Record";
       
        return f;
    }

    getRelatedMap(relatedName: string):Array<Map<number,any>>
    {
        let map = new Array<Map<number,any>>();
        let f = new Form();
        f = this.LoadForm(relatedName);
        if ( f )
        {
            f.RelatedList = new Array<ListItem>();
            let rd =  new Array<Array<DTOField<any>>>();
            rd = this.Load<Array<Array<DTOField<any>>>>(`infrastructure.${relatedName}`, rd);
            if ( rd )
            {
                for( let i = 0; i< rd.length; i++ ){
                    let m = new Map();
                    for( let j=0; j<f.Fields.length; j++){
                        m.set(f.Fields[j].Name,rd[i][j].Value);
                    }
                    map.push(m);
                    f.RelatedList.push(new  ListItem(i,rd[i][1].Value));
                }
            }
        }
        return map;
    }

    private createFoodForm(formName: string):Form {
        let f = this.initFields();
        f.Route = "create";
        f.Title = "Food Record";
        f.RelatedFormName = "FoodItem"
        
        f.IgnoreFields = true;
        f.Map= this.getRelatedMap(f.RelatedFormName)

        let fFoodItemId = new Field<number>("FoodItemId",false,0);
        fFoodItemId.RelatedMap = "Id";
        f.AddFieldTyped<number>(fFoodItemId);

        let fDescr = new Field<string>("Description",true,"");
        fDescr.RelatedMap = fDescr.Name;
        f.AddFieldTyped<string>(fDescr);
        let fUIDescr = new FieldUI(fDescr.Id,fDescr.Name,"text");
        f.AddFieldUI(fUIDescr);

        let fCant = new Field<number>("Cantidad",true,0,1,1000);
        fCant.RelatedMap = fCant.Name;
        f.AddFieldTyped<number>(fCant);
        let fUICant = new FieldUI(fCant.Id,fCant.Name,"input","number",4);
        f.AddFieldUI(fUICant);

        //todo define fields to be populated from related record
        //in this case is foodItem: calories,fat,sugar,sodium,cant
        //calculation= cant*(r.cant/r.calories, ... fat sugar doium)

        let fCalories = new Field<number>("Calories");
        fCalories.RelatedMap = fCalories.Name;
        f.AddFieldTyped<number>(fCalories);
        let fUICalories = new FieldUI(fCalories.Id,fCalories.Name,"input","number",4);
        f.AddFieldUI(fUICalories);

        let fFat = new Field<number>("Fat");
        fFat.RelatedMap = fFat.Name;
        f.AddFieldTyped<number>(fFat);
        let fUIFat = new FieldUI(fFat.Id,fFat.Name,"input","number",4);
        f.AddFieldUI(fUIFat);

        let fSugar = new Field<number>("Sugar");
        fSugar.RelatedMap = fSugar.Name;
        f.AddFieldTyped<number>(fSugar);
        let fUISugar =  new FieldUI(fSugar.Id,fSugar.Name,"input","number",4);
        f.AddFieldUI(fUISugar);

        let fSodium = new Field<number>("Sodium");
        fSodium.RelatedMap = fSodium.Name;
        f.AddFieldTyped<number>(fSodium);

        let fUISodium =  new FieldUI(fSodium.Id,fSodium.Name,"input","number",4);
        f.AddFieldUI(fUISodium);


        let fImageID = new Field<number>("ImageID",false,0);
        fImageID.RelatedMap = fImageID.Name;
        f.AddFieldTyped<number>(fImageID);

        let fUIImageId = new FieldUI(fImageID.Id,fImageID.Name,"input","hidden",4);
        f.AddFieldUI(fUIImageId);
        f.AddFirstRow();

        return f;
    }

    private createFoodItemForm(formName: string){
        let f = new Form();
        f.Name = formName;
        f.Infrastructure = true;
        f.Title = "Food Items";

        let fId = new Field<number>("Id");
        f.AddFieldTyped<number>(fId);

        let fDescr = new Field<string>("Description",true," ");
        f.AddFieldTyped<string>(fDescr);
        f.AddFieldUI(new FieldUI(fDescr.Id,fDescr.Name,"input","text"));

        let fCant = new Field<number>("Cantidad",true,1,1,10000);
        f.AddFieldTyped<number>(fCant);
        f.AddFieldUI(new FieldUI(fCant.Id,fCant.Name,"input","number",4));

        let fUnidad = new Field<number>("Unidad",false,0);
        f.AddFieldTyped<number>(fUnidad);
        let fUIUnidad = new FieldUI(fUnidad.Id,fUnidad.Name,"select");
        fUIUnidad.AddListItem(new ListItem(0,"ml"));
        fUIUnidad.AddListItem(new ListItem(1,"mg"));
        fUIUnidad.AddListItem(new ListItem(2,"oz"));
        fUIUnidad.AddListItem(new ListItem(3,"gr"));
        fUIUnidad.AddListItem(new ListItem(4,"lb"));
        fUIUnidad.AddListItem(new ListItem(2,"kg"));
        fUIUnidad.SelectedValue = 0;
        f.AddFieldUI(fUIUnidad);

        let fCalories = new Field<number>("Calories",false,0);
        f.AddFieldTyped<number>(fCalories);
        f.AddFieldUI(new FieldUI(fCalories.Id,fCalories.Name,"input","number",4));

        let fFat = new Field<number>("Fat",false,0);
        f.AddFieldTyped<number>(fFat);
        f.AddFieldUI(new FieldUI(fFat.Id,fFat.Name,"input","number",4));

        let fSugar = new Field<number>("Sugar",false,0);
        f.AddFieldTyped<number>(fSugar);
        f.AddFieldUI(new FieldUI(fSugar.Id,fSugar.Name,"input","number",4));

        let fSodium = new Field<number>("Sodium",false,0);
        f.AddFieldTyped<number>(fSodium);
        f.AddFieldUI(new FieldUI(fSodium.Id,fSodium.Name,"input","number",4));

        let fImageCatalogID = new Field<number>("ImageID",false,null);
        f.AddFieldTyped<number>(fImageCatalogID);

        let fUrl = new Field<string>("Url",true," ");
        f.AddFieldTyped<string>(fUrl);
        let fUIUrl = new FieldUI(fUrl.Id,fUrl.Name,"input","url",32767);
        fUIUrl.ImageCatalogId = fImageCatalogID.Id;
        fUIUrl.OnExit = "refresh-image";
        f.AddFieldUI(fUIUrl);

        let fImage = new Field<string>("Image",true,"");
        f.AddFieldTyped<string>(fImage);
        let fUIImage = new FieldUI(fImage.Id,fImage.Name,"img");
        fUIImage.ImageCatalogId = fImageCatalogID.Id;
        fUIImage.ImageSourceFieldId = fUIUrl.Id;
        f.AddFieldUI(fUIImage);

        f.AddFirstRow();
        return f;

    }

    private createExeForm(formName: string):Form {
        let f = this.initFields();
        f.Name = formName;
        f.Title = "Exercise Record";

        let fDistance = new Field<number>("Distance",true,2000,100,10000);
        f.AddFieldTyped<number>(fDistance);
        f.AddFieldUI(new FieldUI(fDistance.Id,fDistance.Name,"input","number",4));

        let fTime = new Field<Time>("Duration",true);
        f.AddFieldTyped<Time>(fTime);
        f.AddFieldUI(new FieldUI(fTime.Id,fTime.Name,"input","time"));

        let fCalories = new Field<number>("Calories",false,0);
        f.AddFieldTyped<number>(fCalories);
        f.AddFieldUI(new FieldUI(fCalories.Id,fCalories.Name,"input","number",3));

        let fMood = new Field<number>("Mood",false,0);
        f.AddFieldTyped<number>(fMood);
        let fUIMood = new FieldUI(fMood.Id,fMood.Name,"select");
        fUIMood.AddListItem(new ListItem(0,"Easy"));
        fUIMood.AddListItem(new ListItem(1,"Normal"));
        fUIMood.AddListItem(new ListItem(2,"Hard"));
        fUIMood.SelectedValue = 0;
        f.AddFieldUI(fUIMood);

        f.AddFirstRow();

        return f;
    }

    private createDrugForm(formName: string):Form {
        let f = new Form();
        f.Name = formName;
        f.Title = "Drug Record";

        let fId = new Field<number>("Id",false,0);
        f.AddFieldTyped<number>(fId)    ;

        let fFecha = new Field<Date>("Fecha");
        f.AddFieldTyped<Date>(fFecha);

        let fRecordType = new Field<number>("RecordType",true,0);
        f.AddFieldTyped<number>(fRecordType);


        let fDrug = new Field<number>("Drug",false,0);
        f.AddFieldTyped<number>(fDrug);
        let fUIDrug = new FieldUI(fDrug.Id,fDrug.Name,"select");
        fUIDrug.AddListItem(new ListItem(0,"Diaformina LP"));
        fUIDrug.AddListItem(new ListItem(1,"Glimepirida"));
        fUIDrug.AddListItem(new ListItem(2,"Crestor"));
        fUIDrug.AddListItem(new ListItem(3,"Diaris"));
        fUIDrug.AddListItem(new ListItem(3,"Micardis"));
        fUIDrug.SelectedValue = 0;
        f.AddFieldUI(fUIDrug);



        return f;
    }



    LoadForm(formName: string): import("../models/form").Form {
        if ( formName.toLowerCase() == "exercise")
        {
            this.form = this.createExeForm(formName);
            return this.form;
        }
        else if ( formName.toLowerCase() == "drug")
            return this.createDrugForm(formName);
        else if ( formName.toLowerCase()=="food")
        {
            this.form = this.createFoodForm(formName);
            console.log("loading food. related form:",this.form.RelatedFormName);
            if ( this.form.RelatedFormName != "" )
            {
                this.form.RRows = this.loadRelatedRows(this.form.RelatedFormName);
                this.form.rFields = this.LoadRelatedFields(this.form.RelatedFormName);
                //console.log("rfields:", this.form.rFields);
            }
            return this.form;
        }
        else if ( formName.toLowerCase()=="fooditem")
            return this.createFoodItemForm(formName);
        return null;
    }
    
    SaveForm(formName: string): number {
        throw new Error("Method not implemented.");
    }
    
    SaveAll(): number {
        throw new Error("Method not implemented.");
    }

    
}
