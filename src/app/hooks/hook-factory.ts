import { IHook } from './hook-interface'
import { FoodCantidad } from './food-cantidad';
import { SaveImage } from './save-image';
import { RefreshImage } from './refresh-images'
import { IHookForm } from './hook-form-interface';

export class HookFactory{

    GetHook(key:string):IHook{
        key = key.toLowerCase();
        if ( key == "food-cantidad")
            return new FoodCantidad();
        else if ( key == "refresh-image")
            return new RefreshImage();
        return null;
    }

    GetHookForm(key:string):IHookForm{
        key = key.toLowerCase();
        if (key == "save-image")
            return new SaveImage();
        return null;

    }
}
