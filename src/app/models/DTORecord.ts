import { DTOField } from './DTOField'
import { Field } from './field'

export class DTORecord{
    F: Array<DTOField<any>>
    

    public AddFieldTyped<T>(f: Field<T>){
        let dtoField = new DTOField<T>();
        //TODO: vERIFY IF ID INDEX IS REQUIRED, TO REDUCE JSON DATA COULD BE ASSUMED AS ITS POSITION IN THE ARRAY
        dtoField.Value = f.Value;
        this.F.push(dtoField);
    }

    UpdateDTORow(fields: Array<Field<any>>){
        //this.Values = new Array<any>();
    }
}
