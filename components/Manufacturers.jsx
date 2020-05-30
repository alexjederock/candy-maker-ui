import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Search from './Search'
import Manufacturer from './Manufacturer'

export default () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [manufacturerList, setManufacturerList] = useState([])

  const [filteredManufacturerList, setFilteredManufacturerList] = useState([])
  useEffect(() => {
    async function pullData() {
      const { data } = await axios.get('http://localhost:1337/api/manufacturers')

      setManufacturerList(data)
      setFilteredManufacturerList(data)
    }

    pullData()
  }, [])

  useEffect(() => {
    const filtered = manufacturerList.filter(manufacturer => (
      manufacturer.name.toLowerCase().includes(searchTerm.toLowerCase())
    ))

    setFilteredManufacturerList(filtered)
  }, [searchTerm])

  return (
    <div className="page">
      <div className="title">Candy Makers</div>
      <Search term={searchTerm} setter={setSearchTerm} />
      <div className="output">{searchTerm}</div>
      {
        filteredManufacturerList.map(manufacturer => (
          <Manufacturer
            key={manufacturer.id}
            id={manufacturer.id}
            name={manufacturer.name}
            country={manufacturer.country}
          />
        ))
      }
    </div>
  )
}
