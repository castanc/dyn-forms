import { DTOField } from './DTOField'
import { Field } from './field'

export class DTORecord{
    Fields: Array<DTOField<any>>
    Values: Array<any>

    public AddFieldTyped<T>(f: Field<T>){
        let dtoField = new DTOField<T>();
        //TODO: vERIFY IF ID INDEX IS REQUIRED, TO REDUCE JSON DATA COULD BE ASSUMED AS ITS POSITION IN THE ARRAY
        dtoField.Id = f.Id;
        dtoField.Value = f.Value;
        this.Fields.push(dtoField);
    }

    UpdateDTORow(fields: Array<Field<any>>){
        //this.Values = new Array<any>();
    }
}
