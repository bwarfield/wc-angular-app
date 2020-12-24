import { Product } from './product';
import { PageInfo } from './page-info';

export interface ProductCollection {
    products: Product[];
    pagingInfo: PageInfo;
}
