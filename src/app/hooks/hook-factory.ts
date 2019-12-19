import { IHook } from './hook-interface'
import { FoodCantidad } from './food-cantidad';
import { SaveImage } from './save-image';
import { RefreshImage } from './refresh-image'

export class HookFactory{

    GetHook(key:string):IHook{
        key = key.toLowerCase();
        if ( key == "food-cantidad")
            return new FoodCantidad();
        else if (key == "save-image")
            return new SaveImage();
        else if ( key == "refresh-image")
            return new RefreshImage();
        return null;
    }
}
