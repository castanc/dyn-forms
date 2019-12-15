export class RelatedMap {
    Name: string ;
    Data: Map<number,Map<string,any>>;

    constructor(name:string)
    {
        this.Name = name;
        this.Data = new Map<number,Map<string,any>>();
    }
}