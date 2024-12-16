import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import { extractTokenProperties } from "@polkadot-api/known-chains/chain-utils"

// Type for the token properties
type TokenProperties = {
  symbol: string
  decimals: number
}

// Default value for the context
export const TokenProvider = createContext<TokenProperties>({
  symbol: "",
  decimals: 0,
})

// Hook to use token context
export const useToken = () => useContext(TokenProvider)

// Props for the TokenProviderComponent
type TokenProviderProps = {
  chainName: string // Use lowercase 'string'
  children: ReactNode
}

// TokenProviderComponent
export const TokenProviderComponent: React.FC<TokenProviderProps> = ({
  children,
  chainName,
}) => {
  const [tokenProperties, setTokenProperties] = useState<TokenProperties>({
    symbol: "",
    decimals: 0,
  })

  useEffect(() => {
    const fetchTokenProperties = async () => {
      try {
        const properties = extractTokenProperties(chainName)

        setTokenProperties({
          symbol: properties.tokenName,
          decimals: properties.tokenDecimals,
        })
      } catch (error) {
        console.error("Failed to fetch token properties:", error)
      }
    }

    fetchTokenProperties()
  }, [chainName])

  return (
    <TokenProvider.Provider value={tokenProperties}>
      {children}
    </TokenProvider.Provider>
  )
}
