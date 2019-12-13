import {IDataProvider } from './da-interface'
import { Form } from '../models/form';
import { Field } from '../models/field'
import { FieldUI } from '../models/fieldUI'
import { findStaticQueryIds } from '@angular/compiler';
import { Time } from '@angular/common';
import { ListItem } from '../models/list-item';
import { DTOField} from '../models/DTOField'

export class Mock implements IDataProvider{
    LoadFormList(): Array<ListItem> {
        let arr = new Array<ListItem>();
        arr.push(new ListItem(0,"Food"));
        arr.push(new ListItem(1,"Exercise"));
        arr.push(new ListItem(2,"Drug"));

        return arr; 
    }   
    
    private createFoodForm():Form {
        let f = new Form();

        return f;
    }

    private createExeForm():Form {
        let f = new Form();
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

        return f;
    }

    private createDrugForm():Form {
        let f = new Form();
        f.Title = "Drug Record";

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
        return null;
    }
    
    SaveForm(formName: string): number {
        throw new Error("Method not implemented.");
    }
    
    SaveAll(): number {
        throw new Error("Method not implemented.");
    }

    
}
