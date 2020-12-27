import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {ProductService } from '../services/product.service';
import { NavOption } from '../models/nav-option';
import { ProductCollection } from '../models/product-collection';
import { Product } from '../models/product';
import { NavOptionFactory } from '../models/nav-option-factory';
import { ProductApiCollectionResponse } from '../models/product-api-collection-response';

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
    this.productService.getProducts(page,count).subscribe(productResponse => this.receiveProductCollection(productResponse));
  }

  receiveProductCollection(productResponse: ProductApiCollectionResponse): void{
    this.productOptions = productResponse.data;

    this.navigationOptions = NavOptionFactory.CreatePagingNavOptions("/products/", productResponse.meta.totalPages);
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
      this.getProductCollection(this.page,this.countPerPage);
    })
  }
}
