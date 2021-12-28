import React, { useState } from 'react'
import { isMobile } from 'react-device-detect'
import {
  Container,
  Button,
  Image,
  Menu,
  Grid,
  Table,
  Message,
} from 'semantic-ui-react'
// import Country from './Country'
import HeaderNav from '../components/Header'
import countriesApiData from '../all-countries'
import countriesBasicInfo from '../countriesList'
import regions from '../regions'

const Countries = () => {
  const [input, setInput] = useState('')
  const [activeRegion, setActiveRegion] = useState('All')
  const [activeSubregion, setActiveSubregion] = useState('')
  const [region, setRegion] = useState('All')
  const [subregion, setSubRegion] = useState('')
  const [, setCountry] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // get static lists of regions & subregions for labels on tabs
  const getSubregions = regions.filter((r) => {
    return r.region === activeRegion ? r : ''
  })

  const filteredCountries = countriesBasicInfo.filter((c) => {
    return c.name.toLowerCase().startsWith(input.toLowerCase())
  })

  const filterByRegion =
    region === 'All'
      ? filteredCountries
      : filteredCountries.filter(
          (c) => c.region.toLowerCase() === region.toLowerCase()
        )

  const filterBySubregion =
    subregion === ''
      ? filterByRegion
      : filterByRegion.filter((r) => r.subregion === subregion)

  // full response from restcountries api
  const getCountryData = countriesApiData.filter((c) => {
    return c.name.toLowerCase().startsWith(input.toLowerCase())
  })

  // handle click of "Details" button
  const handleClick = (c) => {
    // pass full country details from api data
    const countryData = getCountryData.filter((cd) => {
      return cd.name.toLowerCase().startsWith(c.name.toLowerCase())
    })
    setIsLoading(true)
    setCountry(countryData[0].name)
    setInput(c.name)
  }

  // handle click of a region tab
  const handleRegionClick = (e, { name }) => {
    setCountry(null)
    setSubRegion('')
    setActiveSubregion('')
    setRegion(name)
    setActiveRegion(name)
  }

  // handle click of a subregion tab
  const handleSubregionClick = (e, { name }) => {
    setCountry(null)
    setSubRegion(name)
    setActiveSubregion(name)
  }

  // when input returns no match
  const reset = () => {
    setCountry(null)
    setInput('')
    setRegion('All')
    setActiveRegion('All')
    setSubRegion('')
    setActiveSubregion('')
  }

  const NoMatches = () => (
    <Container>
      <Message compact info>
        <Message.Header>No matches, please try again.</Message.Header>
        <Button basic color="teal" onClick={reset}>
          OK
        </Button>
      </Message>
    </Container>
  )
  const marg1 = activeRegion === 'All' ? 14 : 38

  const CountriesTable = () => (
    <>
      <Table
        style={isMobile ? { marginTop: 0 } : { marginTop: marg1 }}
        selectable
        stackable
      >
        <Table.Body>
          {filterBySubregion.map((c) => {
            return (
              <>
                <Table.Row key={c.id} onClick={() => handleClick(c)}>
                  <Table.Cell width="two">
                    <Image
                      size="tiny"
                      src={c.flag}
                      alt="country flag"
                      bordered
                    />
                  </Table.Cell>
                  <Table.Cell>{c.name}</Table.Cell>
                </Table.Row>
              </>
            )
          })}
        </Table.Body>
      </Table>
    </>
  )

  return (
    <>
      <HeaderNav
        input={input}
        setInput={setInput}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        countries={filterBySubregion}
        setRegion={setRegion}
        setSubRegion={setSubRegion}
        setActiveRegion={setActiveRegion}
        setActiveSubregion={setActiveSubregion}
      />
    </>
  )
}

export default Countries
