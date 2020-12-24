import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {ProductService } from '../services/product.service';
import { NavOption } from '../models/nav-option';
import { ProductCollection } from '../models/product-collection';
import { Product } from '../models/product';
import { NavOptionFactory } from '../models/nav-option-factory';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  title: string = 'My App';
  page: number;
  countPerPage: number = 2;
  productOptions: Product[];
  selectedProduct: Product;
  navigationOptions: NavOption[];

  getProductCollection(page: number, count: number): void{
    this.productService.getProductCollection(page,count)
        .subscribe(productsCollection => this.receiveProductCollection(productsCollection));
  }

  receiveProductCollection(productCollection: ProductCollection): void{
    this.productOptions = productCollection.products;

    this.navigationOptions = NavOptionFactory.CreatePagingNavOptions("/products/", productCollection.pagingInfo.totalPages);
  }

  onSelect(product: any){
    this.selectedProduct = product;
  }

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.page = parseInt(params.get('id'));
      this.getProductCollection(this.page,2);
    })
  }
}
