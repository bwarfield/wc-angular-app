
import { NavOption } from "../models/nav-option";
import { UtilService } from "../services/util.service";


export class NavOptionFactory {
    static utils: UtilService = new UtilService();
    
    static CreatePagingNavOptions(route: string, numberOfPages: number) {
        var navOptions: NavOption[] = [];

        for(var i = 1; i <= numberOfPages; i++){
            navOptions.push(new NavOption(i, this.utils.convertNumberToText(i), (route+i.toString()), false));
        }
                
        return navOptions;
    }

}