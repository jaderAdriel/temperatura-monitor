import React from 'react'
import temperaturaIcon from  '../assets/icons/temperature-quarter.svg'
import heart from  '../assets/icons/heart-pulse.svg'
import useGetDataFirebase from '../hooks/getDataFirebase'

import './Panel.scss'

function Panel() {

    const temperatura = useGetDataFirebase('/temperatura');

    return (
        <div className="statistics">
              
            <div className="card">
                <div className="header">
                    <img src={temperaturaIcon} alt="" className="icon" />
                    <h3 className="title">Temperatura</h3>
                </div>
                <div className="body">
                    <div className="insight">
                        <h4 className='label'>Minímo</h4>
                        <span className="value">{temperatura.minima} ºC</span> 
                    </div>
                    <div className="insight">
                        <h4 className='label'>Ideal</h4>
                        <span className="value">{temperatura.ideal} ºC</span> 
                    </div>
                    <div className="insight">
                        <h4 className='label'>Maxímo</h4>
                        <span className="value">{temperatura.maxima} ºC</span> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Panel


