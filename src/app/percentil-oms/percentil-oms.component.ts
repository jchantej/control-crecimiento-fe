import { Component, OnInit, Input } from '@angular/core';
import { PercentilOms } from './percentil-oms.model';
import { PercentilOmsService } from './percentil-oms.service';

@Component({
  selector: 'app-percentil-oms',
  templateUrl: './percentil-oms.component.html',
  styleUrls: ['./percentil-oms.component.css']
})
export class PercentilOmsComponent implements OnInit {

  controlesCrecimiento: any[];
  percentilesOms: PercentilOms[];
  genero = 'M';  //TODO: debe variar segun el genero de la persona
  tipo = 'T'; //TODO: debe varia segun la selccion de la grafica a mostrar

  chartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
            stepValue: 5,
        }
    }],
      xAxes: [{
        ticks: {
          steps: 100,
          stepSize: 100
        }
      }]
    }
  };
  chartData = [
    {
      data: [],
      label: 'Percentil 3',
      fill: false,
      pointRadius: 0
    },
    {
      data: [],
      label: 'Percentil 50',
      fill: false,
      pointRadius: 0
    },
    {
      data: [2],
      label: 'Percentil 97',
      fill: false,
      pointRadius: 0
    },
    {
      data: [],
      label: 'Nino',
      fill: false,
      showLine: false,
      pointRadius: 20


    }
  ];
  chartLabels = [];
  constructor(private percentilOmsService: PercentilOmsService) {

  }

  ngOnInit() {
      this.sincronizarData();
  }




  sincronizarData() {
    let pivote = 0;
    const valoresX = [1, 20, 40]; //TODO: se dene reemplazar por la data que llega d persona
    const valoresY = [10, 30, 40];//TODO: se dene reemplazar por la data que llega d persona

    this.percentilOmsService.getListaPercentilesOms(this.genero, this.tipo).subscribe(
      percentil => {
        this.chartData[0].data = percentil.map(per => per.percentil3);
        this.chartData[1].data = percentil.map(per => per.percentil50);
        this.chartData[2].data = percentil.map(per => per.percentil97);
        this.chartLabels = percentil.map(per => per.edad.toString());
        for (let i = 0; i < valoresX.length; ++i) {
          for (let index = pivote; index < this.chartLabels.length; ++index) {
            if (this.chartLabels[index] === valoresX[i].toString()) {
              this.chartData[3].data.push(valoresY[pivote]);
              pivote++;
              break;
            }
            this.chartData[3].data.push(valoresY[pivote]);
            pivote++;
          }
        }
      });
  }

  graficarControlesPersona(value) {
    // this.controlesCrecimiento = value;
  }
  onChartClick(event) {
    console.log(event);
  }

}
