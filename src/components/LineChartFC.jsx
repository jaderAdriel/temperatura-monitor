import React, { useRef} from 'react'
import { database as db } from './../utils/firebase';
import { onValue, ref } from 'firebase/database';
import { Line } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto';
import moment from 'moment/moment';
import { MdOutlineUpdate } from 'react-icons/md'
import { FiThermometer } from 'react-icons/fi'


import './LineChartFC.scss'

let data = {
    datasets: [{
        data: [],
    }],
};

function LineChartFC() {
    const history = useRef();
    const lastChecked = useRef();
    const valorAtual = useRef();

    const query = ref(db, '/temperatura/valor');
    (function () {
        onValue(query, (firebaseData) => {
            const value = firebaseData.val() || '';
            
            if (!data || !history.current) return
            updateChart(value)
    
        })
    })();

    (function () {
      onValue(ref(db, '/temperatura/'), (firebaseData) => {
          const value = firebaseData.val() || '';
          lastChecked.current.innerText = value.horario;
          
          if (!valorAtual.current) {
            valorAtual.current.innerText = value.valor;
            updateChart(valorAtual)
          }

      })
    })();

    function updateChart(value) {
      const chart = history.current;
      valorAtual.current.innerText = value;

      let dataset = [...chart.data.datasets[0].data]
      dataset.push({
        x: moment().format('YYYY/MM/DD HH:mm:ss'),
        y: value
      })
      
      chart.data.datasets[0].data = dataset;
      
      chart.update()
    }

    return (
      <div className='chart-container'>
         <Line ref={history}  data={data} options={{
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Temperatura (ºC)'
              },
              legend: {
                display: false
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return ' ' + context.parsed.y + '°C';
                  }
                }
              }
            },
            scales: {
              y: {
                min: 10,
                max: 50,
                ticks: {
                  callback: function(value, index, values) {
                    return value + '°C';
                  }
                }
              },
              x: {
                ticks: {
                  display: false
                }
              }
            },
            responsive: true,
            interaction: {
              intersect: false,
            },
            parsing: {
              xAxisKey: 'x',
              yAxisKey: 'y',
            },
            
          }}
          />
         
          <p className='info'> <MdOutlineUpdate size={20}/> <small ref={lastChecked}></small></p>
          <p className='info'> <FiThermometer size={20}/> <small ref={valorAtual}></small> °C</p>
          
      </div>
    )
}

export default LineChartFC

