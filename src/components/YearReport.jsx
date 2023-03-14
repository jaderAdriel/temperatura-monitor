import React from 'react'
import MonthReport from './MonthReport'

function YearReport({month}) {
  return (
    <>
        {
            month.map((data, index) => {
                return (
                    <MonthReport data={data} key={index}/>
                )
            })
        }
    </>
  )
}

export default YearReport