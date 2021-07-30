import { Component, Input, OnInit } from '@angular/core';
import { GraficaSimple } from '../../models/GraficaSimple';

@Component({
  selector: 'app-grafica-barras',
  templateUrl: './grafica-barras.component.html',
  styleUrls: ['./grafica-barras.component.scss'],
})
export class GraficaBarrasComponent implements OnInit {
  @Input() dataChart: GraficaSimple | any;
  chart: any;

  constructor() {}

  ngOnInit(): void {}
}
