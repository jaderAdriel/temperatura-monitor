import React from 'react'
import temperatura from  '../assets/icons/temperature-quarter.svg'
import heart from  '../assets/icons/heart-pulse.svg'

import './HistoryRecord.scss'

function HistoryRecord({data}) {
  
  return (
    <div className="record">
      <div className="header">
          <h3 className="title">{ data.date } às {data.time}</h3>
      </div>
      <div className="body">
        
          <div className="insight">
              <img src={heart} alt="" className="icon" />
              <span className="value">{ !data.batimento ? 'Não informado' : data.batimento + " bpm" } </span> 
          </div>
          <div className="insight">
              <img src={temperatura} alt="" className="icon" />
              <span className="value">{ !data.temperatura ? 'Não informado' : data.temperatura + " ºC" }</span> 
          </div>
      </div>
  </div>
  )
}

export default HistoryRecord