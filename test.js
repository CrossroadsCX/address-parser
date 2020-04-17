import parseAddress from './index'

describe('Address Parser', () => {
  test('It should handle PO Boxes', () => {
    const inputs = [
      'PO BOX 1234',
      'PO Box 986',
      'po box 37213',
      'P.O. Box 5432',
      'P O Box 8769',
    ]

    const expectedOutputs = [
      { post_office_box_number: 'PO BOX 1234' },
      { post_office_box_number: 'PO BOX 986' },
      { post_office_box_number: 'PO BOX 37213' },
      { post_office_box_number: 'PO BOX 5432' },
      { post_office_box_number: 'PO BOX 8769' },
    ]

    inputs.map(( input, index ) => {
      const output = parseAddress(input)

      expect(output).toEqual(expectedOutputs[index])
    })
  })

  test('It should handle apartments', () => {
    const inputs = [
      '7209 J EAST WT PARK BLVD #119',
      '1120 Tinley Place #102',

    ]

    const expectedOutputs = [
      {
        street_address: '7209 J EAST WT PARK BLVD',
        street_address2: '#119',
      },
      {
        street_address: '1120 TINLEY PL',
        street_address2: '#102'
      },
    ]

    inputs.map(( input, index ) => {
      const output = parseAddress(input)

      expect(output).toEqual(expectedOutputs[index])
    })
  })

  test('It should handle unit / apartment / suite numbers', () => {
    const inputs = [
      '123 W Simon Ave Unit 2D',
      '345 N Ace Drive 4A',
      '11201 OAK LAKE DR 1E',
      '703 YELLOW VALLEY ROAD STE 201',
      '434 FAYETTEVILLE ST. SUITE 2020',
      '506 FALLING ROCKS CT APT 3112',
    ]

    const expectedOutputs = [
      {
        street_address: '123 W SIMON AVE',
        street_address2: 'UNIT 2D',
      },
      {
        street_address: '345 N ACE DR',
        street_address2: '4A',
      },
      {
        street_address: '11201 OAK LAKE DR',
        street_address2: '1E',
      },
      {
        street_address: '703 YELLOW VALLEY RD',
        street_address2: 'STE 201',
      },
      {
        street_address: '434 FAYETTEVILLE ST',
        street_address2: 'SUITE 2020',
      },
      {
        street_address: '506 FALLING ROCKS CT',
        street_address2: 'APT 3112',
      },
    ]

    inputs.map(( input, index ) => {
      const output = parseAddress(input)

      expect(output).toEqual(expectedOutputs[index])
    })
  })

  // test('It should handle numbered highway addresses', () => {
  //   const inputs = [
  //     '104 NC HWY 305',
  //   ]

  //   const expectedOutputs = [
  //     {
  //       street_address: '104 NC HWY 305',
  //       street_address2: ''
  //     }
  //   ]

  //   inputs.map(( input, index ) => {
  //     const output = parseAddress(input)

  //     expect(output).toEqual(expectedOutputs[index])
  //   })
  // })

  test('It should handle directional suffixes', () => {
    const inputs = [
      '515 6TH ST NW',
    ]
  })
})
