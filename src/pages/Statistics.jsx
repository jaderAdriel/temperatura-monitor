import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import Panel from '../components/Panel'
import LineChartFC from '../components/LineChartFC'

import './Statistics.scss'

function Statistics() {
  return (
    <>
        <Sidebar active={ '/estatisticas' }/>
        <main className="content">
            <Navbar />
            <Panel />
            <LineChartFC />
        </main>
    </>
)
}

export default Statistics