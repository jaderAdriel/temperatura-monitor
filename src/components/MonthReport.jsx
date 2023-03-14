import React, { useState } from 'react'
import temperatura from  '../assets/icons/temperature-quarter.svg'
import heart from  '../assets/icons/heart-pulse.svg'
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import HistoryRecord from './HistoryRecord';
import './MonthReport.scss'

function MonthReport({data}) {
    
    const [isExpanded, setIsExpanded] = useState(false)
    const statistics = useStatistics(data);
    
    const handleExpande = () => {
        setIsExpanded(!isExpanded);
    }

    return (

        <div className="month_report" onClick={(e) => { handleExpande() }}>
            <h2>{statistics.date}</h2>

            <div className="statistics">
                { isExpanded ? <MdExpandLess className='action' size={20}/> : <MdExpandMore className='action' size={20}/>}
                <div className="card">
                    <div className="header">
                        <img src={heart} alt="" className="icon" />
                        <h3 className="title">  Frequencia Cardiaca</h3>
                    </div>
                    <div className="body">
                        <div className="insight">
                            <h4 className='label'>Minímo</h4>
                            <span className="value">{statistics.batMin} bpm</span> 
                        </div>
                        <div className="insight">
                            <h4 className='label'>Média</h4>
                            <span className="value">{statistics.batMedia} bpm</span> 
                        </div>
                        <div className="insight">
                            <h4 className='label'>Maxímo</h4>
                            <span className="value">{statistics.batMax} bpm</span> 
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="header">
                        <img src={temperatura} alt="" className="icon" />
                        <h3 className="title">Temperatura</h3>
                    </div>
                    <div className="body">
                        <div className="insight">
                            <h4 className='label'>Minímo</h4>
                            <span className="value">{statistics.tempMin} ºC</span> 
                        </div>
                        <div className="insight">
                            <h4 className='label'>Média</h4>
                            <span className="value">{statistics.tempMedia} ºC</span> 
                        </div>
                        <div className="insight">
                            <h4 className='label'>Maxímo</h4>
                            <span className="value">{statistics.tempMax} ºC</span> 
                        </div>
                    </div>
                </div>
            </div>
            { !isExpanded ? '' : 

                data.map((record, index) => {
                    return (
                        <HistoryRecord data={record} key={index}/>
                    )
                })
            
            }
        </div>

    )
}

export default MonthReport;


function useStatistics(data) {
        let info = {
            countTemp : 0,
            countBat : 0,
            tempMax: 0,
            tempMin: data[0].temperatura,
            tempMedia: 0,
            batMax : 0,
            batMin : data[0].batimento,
            batMedia: 0,
            date: data[0].date
        }

        for (let index = 0; index < data.length; index++) {
            const {temperatura, batimento} = data[index];

            info.countBat = batimento ? info.countBat + 1: info.countBat;
            info.countTemp = temperatura ? info.countTemp + 1: info.countTemp;

            info.batMedia = info.batMedia ? info.batMedia + batimento : batimento;
            info.tempMedia = info.tempMedia ? info.tempMedia + temperatura : temperatura;

            

            if (temperatura >= info.tempMax ) info.tempMax = temperatura;
            if (temperatura < info.tempMin ) info.tempMin = temperatura;

            if (batimento >= info.batMax )    info.batMax  = batimento;
            if (batimento < info.batMin )    info.batMin  = batimento;
        }

        info.batMedia = info.batMedia / info.countBat;
        info.tempMedia = info.tempMedia / info.countTemp;
        
        const meses = new Map([  
            [1, 'Janeiro'],
            [2, 'Fevereiro'],
            [3, 'Março'],
            [4, 'Abril'],
            [5, 'Maio'],
            [6, 'Junho'],
            [7, 'Julho'],
            [8, 'Agosto'],
            [9, 'Setembro'],
            [10, 'Outubro'],
            [11, 'Novembro'],
            [12, 'Dezembro']
        ]);

          

        const [day, month, year] = info.date.split('-');

        info.date = `${meses.get(Number(month))} de ${year}`

        return info
}