import React, {useEffect, useState} from 'react'
import './App.css'
import axios from 'axios'

const App = () => {
  const [covidData, setCovidData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [value, setValue] = useState("")
  useEffect(()=>{
   axios.get("https://india-covid19vaccine.github.io/api/state_timeline.json").then(response=>{
    setCovidData([...response.data]);
    setFilteredData([...response.data])
  }).catch(err=>console.log(err))
  },[])
  useEffect(()=>{
    let filterValue = covidData.filter((data)=>(
      data.state.toLowerCase().includes(value.toLowerCase())
    ))
    setFilteredData([...filterValue])
  },[value])
  const getColor=(item)=>{
    return item.data[107].total_fully_vaccinated>100000?'green':'red'
  }
  const handleclick=()=>{
    let filterValue = covidData.filter((data)=>(
      data.state.toLowerCase().includes(value.toLowerCase())
    ))
    setFilteredData([...filterValue])
  }
  return (
    <div className='myOwnHeader'>
      <center>
        <h1>INDIA COVID-19 DASHBOARD</h1>
        <input type='text' placeholder='search' defaultValue={value} style={{marginBottom:"10px"}} onChange={(e)=>setValue(e.target.value)}/>
        <button onClick={handleclick}>Search</button>
      <table className='table'>
        <thead className='header orange'>
          <tr>
            <th>State</th>
            <th>Total doses</th>
            <th>Total vaccinated</th>
            <th>Total fully vaccinated</th>
          </tr>
        </thead>
        <tbody className='main-body'>
          {filteredData.map((item)=>{
            return (
              <tr className={getColor(item)}>
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

