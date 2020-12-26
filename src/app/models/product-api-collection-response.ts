import { Product } from '../models/product';
import { PageInfo } from './page-info';

export interface ProductApiCollectionResponse {
    data: Product[];
    meta: PageInfo;
}
