# address-parser

## Installation

`$ yarn add @crossroadscx/address-parser`

## Usage

```
import parse from '@crossroadscx/address-parser'

const addressString = '...'

const {
  street_address,
  street_address2,
} = parse(addressString)

console.log(street_address, street_address2)

```
