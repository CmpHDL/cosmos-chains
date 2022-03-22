export interface AssetListModel {
  $schema: string
  chain_id: string
  assets: Asset[]
}

export interface Asset {
  description: string
  denom_units: DenomUnit[]
  base: string
  name: string
  display: string
  symbol: string
  logo_URIs: LogoUris
  coingecko_id: string
  kind?: string
  address?: string
}

export interface DenomUnit {
  denom: string
  exponent: number
}

export interface LogoUris {
  png: string
  svg?: string
}
