import { Component, Input, OnInit } from '@angular/core';
import {NavOption} from '../models/nav-option';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Input() title: string;
  @Input() navigationOptions: NavOption[];

  constructor() { }

  ngOnInit(): void {
  }
}
