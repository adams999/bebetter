import { Component, Input, OnInit } from '@angular/core';
import { GraficaSimple } from '../../models/GraficaSimple';

@Component({
  selector: 'app-grafica-torta',
  templateUrl: './grafica-torta.component.html',
  styleUrls: ['./grafica-torta.component.scss'],
})
export class GraficaTortaComponent implements OnInit {
  @Input() dataChart: GraficaSimple | any;
  constructor() {}

  ngOnInit(): void {}

  renderChart() {}
}
