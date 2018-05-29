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
      data: [],
      label: 'Percentil 97',
      fill: false,
      pointRadius: 0,
    },
    {
      data: [],
      label: 'Nino',
      fill: false,
      showLine: false,
      pointRadius: 10,
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
      ],
      hoverBackgroundColor: [
        '#000',
        '#36A2EB',
        '#FFCE56'
      ]
    }
  ];

  chartLabels = [];
  constructor(private percentilOmsService: PercentilOmsService) {

  }

  ngOnInit() {

  }

  sincronizarData(controlesCrecimineto, persona, tipo) {

    let pivote = 0;
    this.chartData[3].data = [];
    const valoresX = [];
    const valoresY = [];

    if (tipo.value === 'P') {
      for (let i = 0; i < controlesCrecimineto.length; ++i) {
        valoresX[i] = (controlesCrecimineto[i].edad);
        valoresY[i] = (controlesCrecimineto[i].peso);
      }

    } else if (tipo.value === 'T') {
      for (let i = 0; i < controlesCrecimineto.length; ++i) {
        valoresX[i] = (controlesCrecimineto[i].edad);
        valoresY[i] = (controlesCrecimineto[i].talla);
      }
    }

    this.percentilOmsService.getListaPercentilesOms(persona.genero, tipo.value, persona.edadDias).subscribe(
      percentil => {
        this.chartData[0].data = percentil.map(per => per.percentil3);
        this.chartData[1].data = percentil.map(per => per.percentil50);
        this.chartData[2].data = percentil.map(per => per.percentil97);
        this.chartLabels = percentil.map(per => per.edad.toString());
        for (let i = 0; i < valoresX.length; ++i) {
          for (let index = pivote; index < this.chartLabels.length; ++index) {
            if (this.chartLabels[index] === valoresX[i].toString()) {
              this.chartData[3].data.push(valoresY[i]);
              pivote++;
              break;
            }
            this.chartData[3].data.push(null);
            pivote++;
          }
        }
      });
  }

  onChartClick(event) {
    console.log(event);
  }

}
