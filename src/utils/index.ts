const PEER_ID_LENGTH = 53;

export const formatWallet = (wallet: string, cuttedChars: number) => {
  return wallet.slice(0, wallet.length - cuttedChars) + "...";
};

export const isValidPeerId = (v: string): boolean => {
  return (
    v.startsWith("16Uiu2HA") &&
    v.length === PEER_ID_LENGTH &&
    /[a-zA-Z0-9]*/.test(v)
  );
};
