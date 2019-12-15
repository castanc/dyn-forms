export class Field<T>{
    Id: number;
    Name: string;
    Value: T;
    Required : boolean = false;
    Max: T;
    Min: T;

    constructor(name:string,required:boolean = false,value: T =null,max: T = null, min: T = null,id:number=0){
        this.Id = id;
        this.Name = name;
        this.Required = required;
        this.Min = min;
        this.Max = max;
        this.Value = value;
    }
}
