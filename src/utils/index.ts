export const formatWallet = (wallet: string, cuttedChars: number) => {
  return wallet.slice(0, wallet.length - cuttedChars) + "...";
};
