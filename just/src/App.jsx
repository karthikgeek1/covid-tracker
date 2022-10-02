import React, {useEffect, useState} from 'react'
import './App.css'
import axios from 'axios'

const App = () => {
  const [covidData, setCovidData] = useState([])
  // const [color, setColor] = useState(white)
  useEffect(()=>{
   axios.get("https://india-covid19vaccine.github.io/api/state_timeline.json").then(response=>{
    setCovidData([...response.data]);
  }).catch(err=>err)
  },[])
  return (
    <div>
      <center>
        <h1>INDIA COVID-19 DASHBOARD</h1>
      <table className='table'>
        <thead className='header'>
          <tr>
            <th>State</th>
            <th>Total doses</th>
            <th>Total vaccinated</th>
            <th>Total fully vaccinated</th>
          </tr>
        </thead>
        <tbody className='main-body'>
          {covidData.map((item)=>{
            return (
              <tr>
                <td>{item.state}</td>
                <td>{item.data[107].total_doses}</td>
                <td>{item.data[107].total_vaccinated}</td>
                <td>{item.data[107].total_fully_vaccinated}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      </center>
    </div>
  )
}

export default App

