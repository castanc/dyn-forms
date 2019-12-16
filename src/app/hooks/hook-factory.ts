import { IPostInput } from './post-input-interface'
import { FoodCantidad } from './food-cantidad';
import { FoodItemUrl } from './fooditem-url';

export class HookFactory{

    GetHook(key:string):IPostInput{
        key = key.toLowerCase();
        if ( key == "food-cantidad")
            return new FoodCantidad();
        else if (key == "fooditem-url")
            return new FoodItemUrl();
        return null;
    }
}
