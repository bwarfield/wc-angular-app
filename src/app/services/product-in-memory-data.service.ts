import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { RequestInfo, ResponseOptions } from 'node_modules/angular-in-memory-web-api/interfaces';
 import {STATUS, getStatusText} from 'node_modules/angular-in-memory-web-api/http-status-codes';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { ProductCollection } from '../models/product-collection';

@Injectable({
  providedIn: 'root',
})
export class ProductMemoryDataService implements InMemoryDbService {
  createDb() {
    const products = [
      {
        id: 1,
        name: 'Starter',
        price: 1.00,
        description: 'Starter features for your business to grow.'
      },
      {
        id: 2,
        name: 'Regular',
        price: 25.00,
        description: 'Regular features for your business to grow.'
      },
      {
        id: 3,
        name: 'Professional',
        price: 75.00,
        description: 'Professional features for your business to grow.'
      },
      {
        id: 4,
        name: 'Ultimate',
        price: 115.00,
        description: 'The ultimate set of features for your business to grow.'
      },
    ];
    return {
      products
    };
  }

  //Override get requests
  //Modified from: https://stackoverflow.com/questions/49155920/simple-pagination-for-angular-in-memory-web-api
  get(reqInfo: RequestInfo) {
    if (reqInfo.query.has('page') && reqInfo.query.has('count') && reqInfo.collection) {
      const page = +reqInfo.query.get('page')[0];
      const count = +reqInfo.query.get('count')[0];

      // Remove offset and limit from query parameters so they're not considered as filtering parameters for the
      // collection later on.
      reqInfo.query.delete('page');
      reqInfo.query.delete('count');

      return reqInfo.utils.createResponse$(() => {
        const collection = reqInfo.collection as Array<{id: any}>;

        let meta: any;
        let data: any;
        if (reqInfo.id) {
          data = reqInfo.utils.findById(collection, reqInfo.id);
        } else {
          const filteredCollection = ProductMemoryDataService.applyQuery(collection, reqInfo.query);
          const totalPages = Math.ceil(filteredCollection.length/count);
          meta = { totalPages, currentPage: page };
          console.log(`page: ${page}, count: ${count}`);
          console.log(filteredCollection);
          data = ProductMemoryDataService.paginate(filteredCollection, page, count);
          console.log(`Total pages: ${totalPages}, and returned data count: ${data.length}`);
        }

        const options: ResponseOptions = data ?
        {
          body: { meta, data },
          status: STATUS.OK
        } :
        {
          body: { error: `'${reqInfo.collectionName}' with id='${reqInfo.id}' not found` },
          status: STATUS.NOT_FOUND
        };
        return ProductMemoryDataService.finishOptions(options, reqInfo);
      });
    } else {
      return undefined;
    }
  }

  private static finishOptions(options: ResponseOptions, {headers, url}: RequestInfo) {
    options.statusText = getStatusText(options.status);
    options.headers = headers;
    options.url = url;

    return options;
  }

  private static applyQuery(collection: Array<object>, query: Map<string, string[]>) {
    // extract filtering conditions - {propertyName, RegExps) - from query/search parameters
    const conditions = [];
    query.forEach((values, key) => {
        values.forEach(value => { conditions.push({ key, rx: new RegExp(decodeURI(value), 'i') }); });
    });
    const len = conditions.length;
    if (!len) {
        return collection;
    }
    // AND the RegExp conditions
    return collection.filter(row => {
        let ok = true;
        let i = len;
        while (ok && i) {
            i -= 1;
            const cond = conditions[i];
            ok = cond.rx.test(row[cond.name]);
        }
        return ok;
    });
  }

  private static paginate(array, page, count) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page - 1) * count, page * count);
  }
}
