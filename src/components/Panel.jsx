import React, { useRef } from 'react'
import useGetDataFirebase from '../hooks/getDataFirebase'
import LineChartFC from './LineChartFC';

import './Panel.scss'

function Panel({firebasePath, icon, unity, name}) {
    const valorAtual = useRef();

    const data = useGetDataFirebase(firebasePath);

    return (
        <div className="statistics">
              
            <div className="card">
                <div className="header">
                    <img src={icon} alt="" className="icon" />
                    <h3 className="title">{name}</h3>
                </div>
                <div className="body">
                    <div className="insight">
                        <h4 className='label'>Minímo</h4>
                        <span className="value">{data.minima} {unity}</span> 
                    </div>
                    <div className="insight">
                        <h4 className='label'>Ideal</h4>
                        <span className="value">{data.ideal} {unity}</span> 
                    </div>
                    <div className="insight">
                        <h4 className='label'>Maxímo</h4>
                        <span className="value">{data.maxima} {unity}</span> 
                    </div>
                    <div className="insight">
                        <h4 className='label'>Atual</h4>
                        <span className="value"> <span ref={valorAtual}></span> {unity}</span> 
                    </div>
                </div>
            </div>

            <LineChartFC name={name} unity={unity} firebasePath={firebasePath} valorAtual={valorAtual}/>

        </div>
    )
}

export default Panel


