import {IDataProvider } from './da-interface'
import { Form } from '../models/form';
import { Field } from '../models/field'
import { FieldUI } from '../models/fieldUI'
import { findStaticQueryIds } from '@angular/compiler';

export class Mock implements IDataProvider{
    LoadFormList(): string[] {
        return ['Food','Drug','Exercise']
    }   
    
    private createFoodForm():Form {
        let f = new Form();
            f.AddField(new Field<Date>());

        return f;
    }

    private createExeForm():Form {
        let f = new Form();
        let fui = new FieldUI();
        let fl = new Field<Date>();

        fl.Max = new Date();
        fl.Min = new Date(2015,1,1);
        f.AddField(fl);
        fui.Label = "Date";
        f.AddFieldUI(fui);

        let f2 = new Field<string>();
        fui = new FieldUI();
        fui.Label = "Time";
        fui.HtmlInputType = "text";
        fui.HtmlType = "input";
        fui.PlaceHolder = "Time";
        f.AddFieldUI(fui);

        let distance = new Field<number>();
        distance.Max = 10000;
        distance.Min = 0;
        distance.Value = 2000;
        f.AddField(distance);

        fui = new FieldUI();
        fui.Label = "Distance";
        fui.PlaceHolder = fui.Label;
        f.AddFieldUI(fui);

        return f;
    }
    
    LoadForm(formName: string): import("../models/form").Form {
        return this.createExeForm();
    }
    
    SaveForm(formName: string): number {
        throw new Error("Method not implemented.");
    }
    
    SaveAll(): number {
        throw new Error("Method not implemented.");
    }

    
}
