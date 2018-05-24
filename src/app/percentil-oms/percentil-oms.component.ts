import { Component, OnInit } from '@angular/core';
import { PercentilOms } from './percentil-oms.model';
import { PercentilOmsService } from './percentil-oms.service';

@Component({
  selector: 'app-percentil-oms',
  templateUrl: './percentil-oms.component.html',
  styleUrls: ['./percentil-oms.component.css']
})
export class PercentilOmsComponent implements OnInit {


  percentilesOms: PercentilOms[];
  genero = 'M';  //TODO: debe variar segun el genero de la persona
  tipo = 'T'; //TODO: debe varia segun la selccion de la grafica a mostrar

  chartOptions = {
    responsive: true
  };

  chartData = [
    {
      data: [], label: 'Percentil 3'
    },
    {
      data: [], label: 'Percentil 50'
    },
    {
      data: [], label: 'Percentil 97'
    }
  ];
  chartLabels = [];

  constructor(private percentilOmsService: PercentilOmsService) { }

  ngOnInit() {

    this.sincronizarData();
  }

  sincronizarData() {
    this.percentilOmsService.getListaPercentilesOms(this.genero, this.tipo).subscribe(
      percentil => {
        this.chartData[0].data = percentil.map(per => per.percentil3);
        this.chartData[1].data = percentil.map(per => per.percentil50);
        this.chartData[2].data = percentil.map(per => per.percentil97);
        this.chartLabels = percentil.map(per => per.edad.toString());
      }
    );

  }

  onChartClick(event) {
    console.log(event);
  }

}
