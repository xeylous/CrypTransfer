export function getExplorerBase(chainIdHexOrNum) {
  const hex = typeof chainIdHexOrNum === 'number'
    ? '0x' + chainIdHexOrNum.toString(16)
    : chainIdHexOrNum?.toLowerCase();

  const map = {
    '0x1': 'https://etherscan.io', // Ethereum mainnet
    '0xaa36a7': 'https://sepolia.etherscan.io', // Sepolia
    '0x89': 'https://polygonscan.com', // Polygon mainnet
    '0x13882': 'https://amoy.polygonscan.com', // Polygon Amoy
    '0x5': 'https://goerli.etherscan.io', // Goerli (legacy)
  };
  return map[hex] || null;
}