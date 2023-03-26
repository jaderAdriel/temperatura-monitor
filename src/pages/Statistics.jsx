import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import Panel from '../components/Panel'
import LineChartFC from '../components/LineChartFC'

import './Statistics.scss'
import temperaturaIcon from  '../assets/icons/temperature-quarter.svg'
import heart from  '../assets/icons/heart-pulse.svg'

function Statistics() {
  return (
    <>
        <Sidebar active={ '/estatisticas' }/>
        <main className="content">
            <Navbar />

            <Panel name={"Temperatura"} unity={"ºC"} firebasePath={"/temperatura"} icon={temperaturaIcon}  />

            <Panel name={"Batimentos"} unity={"BPM"} firebasePath={"/batimento"} icon={heart}  />

        </main>
    </>
)
}

export default Statistics