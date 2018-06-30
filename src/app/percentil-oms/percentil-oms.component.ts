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
  chartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          stepSize: 2
        },
        scaleLabel: {
          display: true,
          labelString: 'Peso (Kg)'
        }
      }],
      xAxes: [{
        id: 'xAxis1',
        ticks: {
        },
        scaleLabel: {
          display: true,
          labelString: 'Edad (Días)'
        }
      }],
    },
    title: {
      display: true,
      text: 'Curva de Crecimiento'
    }
  };
  chartData = [
    {
      data: [],
      label: 'Percentil 3',
      fill: false,
      borderWidth: 1,
      pointRadius: 0,
    },
    {
      data: [],
      label: 'Percentil 15',
      fill: false,
      borderWidth: 1.5,
      pointRadius: 0
    },
    {
      data: [],
      label: 'Percentil 50',
      fill: false,
      pointRadius: 0,
      borderWidth: 1.5
    },
    {
      data: [],
      label: 'Percentil 85',
      fill: false,
      borderWidth: 1.5,
      pointRadius: 0
    },
    {
      data: [],
      label: 'Percentil 97 |',
      fill: false,
      pointRadius: 0,
      borderWidth: 1.5
    },
    {
      data: [],
      label: 'Nin@',
      fill: false,
      showLine: false,
      pointRadius: 7.5
    }
  ];

  chartColors = [
    {
      backgroundColor: 'rgba(255,0,0,.6)',
      borderColor: 'rgb(255,0,0)',
      pointBackgroundColor: 'rgb(255,0,0',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,0,0,.8)'
    },
    {
      backgroundColor: 'rgba(202, 111, 30, .1)',
      borderColor: 'rgb(202, 111, 30)',
      pointBackgroundColor: 'rgb(202, 111, 30)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(202, 111, 30,.8)'
    },
    {
      backgroundColor: 'rgba(138,221,45,0.2)',
      borderColor: 'rgb(138,221,45)',
      pointBackgroundColor: 'rgb(138,221,45)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(138,221,45,0.2)'
    },

    {
      backgroundColor: 'rgba(202, 111, 30, .1)',
      borderColor: 'rgb(202, 111, 30)',
      pointBackgroundColor: 'rgb(202, 111, 30)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(202, 111, 30,.8)'
    },
    {
      backgroundColor: 'rgba(255,0,0,.6)',
      borderColor: 'rgb(255,0,0)',
      pointBackgroundColor: 'rgb(255,0,0',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,0,0,.8)'
    },
    {
      backgroundColor: 'rgba(33, 33, 33,.1)',
      borderColor: 'rgb(33, 33, 33)',
      pointBackgroundColor: 'rgb(33, 33, 33)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(33, 33, 33, .8)'
    },
  ];

  chartLabels = [];
  constructor(private percentilOmsService: PercentilOmsService) {

  }

  ngOnInit() {

  }

  sincronizarData(controlesCrecimineto, persona, tipo) {
    //Ordena la lista de asc
    controlesCrecimineto.sort((a, b) => {
      return a.id - b.id;
    });
    let pivote = 0;
    this.chartData[5].data = [];
    const valoresX = [];
    const valoresY = [];

    if (tipo.value === 'P') {
      this.chartOptions.scales.yAxes[0].scaleLabel.labelString = 'Peso (Kg)';
      for (let i = 0; i < controlesCrecimineto.length; ++i) {
        valoresX[i] = (controlesCrecimineto[i].edad);
        valoresY[i] = (controlesCrecimineto[i].peso);
      }

    } else if (tipo.value === 'T') {
      this.chartOptions.scales.yAxes[0].scaleLabel.labelString = 'Talla (cm)';
      for (let i = 0; i < controlesCrecimineto.length; ++i) {
        valoresX[i] = (controlesCrecimineto[i].edad);
        valoresY[i] = (controlesCrecimineto[i].talla);
      }
    }

    this.percentilOmsService.getListaPercentilesOms(persona.genero, tipo.value, persona.edadDias).subscribe(
      percentil => {
        this.chartData[0].data = percentil.map(per => per.percentil3);
        this.chartData[1].data = percentil.map(per => per.percentil15);
        this.chartData[2].data = percentil.map(per => per.percentil50);
        this.chartData[3].data = percentil.map(per => per.percentil85);
        this.chartData[4].data = percentil.map(per => per.percentil97);
        this.chartLabels = percentil.map(per => per.edad.toString());
        for (let i = 0; i < valoresX.length; ++i) {
          for (let index = pivote; index < this.chartLabels.length; ++index) {
            if (this.chartLabels[index] === valoresX[i].toString()) {
              this.chartData[5].data.push(valoresY[i]);
              pivote++;
              break;
            }
            this.chartData[5].data.push(null);
            pivote++;
          }
        }
        this.chartData[5].label = persona.nombre;
      });
  }
  onChartClick(event) {
    console.log(event);
  }

}
