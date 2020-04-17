import parser from 'parse-address'

const unlabeledRegex = /.*(\d{1,2}[A-E])$/

const parsePOBox = (parsed) => ({
  post_office_box_number: `PO BOX ${parsed.sec_unit_num}`
})

// Parse street_address for each function
const parseStreetAddress = ({ number, prefix, street, type }) => {
  let streetAddress = ''

  if (number) {
    streetAddress += `${number} `
  }

  if (prefix) {
    streetAddress += `${prefix} `
  }

  if (street) {
    streetAddress += `${street} `
  }

  if (type) {
    streetAddress += `${type} `
  }

  streetAddress = streetAddress.toUpperCase().trim()

  return streetAddress
}

// sec_unit_type = '#'
const parseNumberedApartment = (parsed) => {
  const {
    number,
    sec_unit_num,
    sec_unit_type,
    street,
    type
  } = parsed

  return {
    street_address: parseStreetAddress(parsed),
    street_address2: `${sec_unit_type}${sec_unit_num}`,
  }
}

// sec_unit_type = 'UNIT'
const parseUnit = (parsed) => {
  return {
    street_address: parseStreetAddress(parsed),
    street_address2: `${parsed.sec_unit_type} ${parsed.sec_unit_num}`.toUpperCase(),
  }
}

// Unlabeled Units
const parseUnlabeledUnit = (addressString) => {
  const match = addressString.match(unlabeledRegex)

  const updatedAddressString = addressString.replace(/\d{1,2}[A-E]$/, '')
  const updatedParsed = parser.parseLocation(updatedAddressString)

  return {
    street_address: parseStreetAddress(updatedParsed),
    street_address2: match[1].toUpperCase(),
  }
}

const parseNormalAddress = (parsed) => {
  return {
    street_address: parseStreetAddress(parsed),
    street_address2: '',
  }
}

export default (addressString) => {
  const parsed = parser.parseLocation(addressString)
  let output = parsed

  const match = addressString.match(unlabeledRegex)

  // Eg. 1234 Ace Street 4A
  // "Unlabeled Secondary Units"
  if (match && !parsed.sec_unit_type) {
    parsed.sec_unit_type = parsed.sec_unit_type ? parsed.sec_unit_type : 'UNLABELED'
    parsed.sec_unit_num = match[1]
  }

  if (parsed.sec_unit_type) {
    switch(parsed.sec_unit_type.toUpperCase()) {
      case 'PO BOX':
        output = parsePOBox(parsed)
        break
      case '#':
        output = parseNumberedApartment(parsed)
        break
      case 'APT':
      case 'STE':
      case 'SUITE':
      case 'UNIT':
        output = parseUnit(parsed)
        break
      case 'UNLABELED':
        output = parseUnlabeledUnit(addressString)
        break
      default:
        console.log(parsed)
        throw new Error(`Unknown address type: ${addressString}`)
    }
  } else {
    output = parseNormalAddress(parsed)
  }

  return output
}
