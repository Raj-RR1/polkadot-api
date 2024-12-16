import fs from "fs"
import path from "path"

const loadChainSpec = (chainName: string) => {
  const chainspecDir = path.resolve(__dirname, "specs")

  const chainspecPath = path.join(chainspecDir, `${chainName}.json`)

  if (!fs.existsSync(chainspecPath)) {
    throw new Error(`Chainspec file for ${chainName} not found!`)
  }

  const chainspec = JSON.parse(fs.readFileSync(chainspecPath, "utf-8"))
  return chainspec
}

const extractTokenProperties = (chainName: string) => {
  const chainspec = loadChainSpec(chainName)
  const tokenName = chainspec.token?.name ?? "Unknown"
  const tokenDecimals = chainspec.token?.decimals ?? 12

  return { tokenName, tokenDecimals }
}

export { extractTokenProperties }
