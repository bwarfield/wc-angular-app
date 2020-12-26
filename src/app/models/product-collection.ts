import { Product } from './product';
import { PageInfo } from './page-info';
import { Observable } from 'rxjs';

export interface ProductCollection {
    products: Observable<Product[]>;
    pagingInfo: PageInfo;
}
