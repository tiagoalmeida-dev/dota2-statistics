import * as React from 'react'
import ReactCountryFlag from 'react-country-flag'

const CountryCell: React.FC<any> = ({ row: { original } }) => {
  return (
    <>{original.loccountrycode && <ReactCountryFlag countryCode={original.loccountrycode} svg aria-label={original.loccountrycode} />}</>
  )
}

export default CountryCell
