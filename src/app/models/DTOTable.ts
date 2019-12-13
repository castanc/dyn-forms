import { DTORecord } from './DTORecord'
import { Field } from './field'

export class DTOTable {
    Name: string = "";
    Fields: Array<Field<any>>
    Rows: Array<DTORecord>
}
