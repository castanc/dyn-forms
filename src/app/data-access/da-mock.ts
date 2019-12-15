import {IDataProvider } from './da-interface'
import { Form } from '../models/form';
import { Field } from '../models/field'
import { FieldUI } from '../models/fieldUI'
import { findStaticQueryIds } from '@angular/compiler';
import { Time } from '@angular/common';
import { ListItem } from '../models/list-item';
import { DTOField} from '../models/DTOField'
import { RelatedMap } from '../models/related-map';

export class Mock implements IDataProvider{
    LoadFormList(): Array<ListItem> {
        let arr = new Array<ListItem>();
        arr.push(new ListItem(0,"Food"));
        arr.push(new ListItem(1,"Exercise"));
        arr.push(new ListItem(2,"Drug"));
        return arr; 
    }   

    LoadInfrastructureList():Array<ListItem>{
        let arr = new Array<ListItem>();
        arr.push(new ListItem(0,"FoodItem"));
        return arr; 

    }


    private initFields(f: Form)
    {
        let fId = new Field<number>("Id",false,0);
        f.AddFieldTyped<number>(fId)    ;

        let fFecha = new Field<Date>("Fecha",false,new Date());
        f.AddFieldTyped<Date>(fFecha);

        let fRecordType = new Field<number>("RecordType",true,0);
        f.AddFieldTyped<number>(fRecordType);

    }
    private loadFoodItemsMap(key:string):RelatedMap {
        let rm = new RelatedMap(key);

        return rm;
    }

    private loadFoodItems():Array<ListItem> {
        let arr = new Array<ListItem>();
        arr.push(new ListItem(0,"Arroz"));
        arr.push(new ListItem(1,"Carne"));
        arr.push(new ListItem(2,"Leche"));
        return arr;
    }

    private createFoodItemsForm():Form {
        let f = new Form();
        f.Title = "Food Record";
        this.initFields(f);
        return f;
    }

    private createFoodForm():Form {
        let f = new Form();
        f.Title = "Food Record";
        this.initFields(f);
        f.IgnoreFields = true;

        let fFoodItem = new Field<number>("FoodItem",false,0);
        f.AddFieldTyped<number>(fFoodItem);
        let fUIMood = new FieldUI(fFoodItem.Id,fFoodItem.Name,"select");
        fUIMood.RelatedMap = "food-items";
        f.Maps.push(this.loadFoodItemsMap(fUIMood.RelatedMap));

        fUIMood.List = this.loadFoodItems();
        f.AddFieldUI(fUIMood);

        f.AddFirstRow();

        /*
            food item selector
            mao with related data

            child tabular form of
                fooditemid
                cant
                plus related data
        */

        return f;
    }

    private createFoodItemForm(){
        let f = new Form();
        f.Title = "Food Items";
        //this.initFields(f);

        let fId = new Field<number>("Id");
        f.AddFieldTyped<number>(fId);

        let fDescr = new Field<string>("Description",true,"");
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

        let fCalories = new Field<number>("Calories");
        f.AddFieldTyped<number>(fCalories);
        f.AddFieldUI(new FieldUI(fCalories.Id,fCalories.Name,"input","number",4));

        let fFat = new Field<number>("Fat");
        f.AddFieldTyped<number>(fFat);
        f.AddFieldUI(new FieldUI(fFat.Id,fFat.Name,"input","number",4));

        let fSugar = new Field<number>("Sugar");
        f.AddFieldTyped<number>(fSugar);
        f.AddFieldUI(new FieldUI(fSugar.Id,fSugar.Name,"input","number",4));

        let fSodium = new Field<number>("Sodium");
        f.AddFieldTyped<number>(fSodium);
        f.AddFieldUI(new FieldUI(fSodium.Id,fSodium.Name,"input","number",4));

        


        let fImageID = new Field<number>("ImageID",false,0);
        f.AddFieldTyped<number>(fImageID);

        let fUrl = new Field<string>("Url",true,"");
        f.AddFieldTyped<string>(fUrl);
        let fUIUrl = new FieldUI(fUrl.Id,fUrl.Name,"input","url");
        f.AddFieldUI(fUIUrl);

        let fImage = new Field<string>("Image",true,"");
        f.AddFieldTyped<string>(fImage);
        let fUIImage = new FieldUI(fImage.Id,fImage.Name,"img");
        fUIImage.ImageFieldId = fUIUrl.Id;
        f.AddFieldUI(fUIImage);

        f.AddFirstRow();
        return f;

    }

    private createExeForm():Form {
        let f = new Form();
        f.Title = "Exercise Record";
        this.initFields(f);

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

    private createDrugForm():Form {
        let f = new Form();
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
            return this.createExeForm();
        else if ( formName.toLowerCase() == "drug")
            return this.createDrugForm();
        else if ( formName.toLocaleLowerCase()=="fooditem")
            return this.createFoodItemForm();
        return null;
    }
    
    SaveForm(formName: string): number {
        throw new Error("Method not implemented.");
    }
    
    SaveAll(): number {
        throw new Error("Method not implemented.");
    }

    
}
