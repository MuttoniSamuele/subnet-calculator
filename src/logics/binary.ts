export type byte = (0 | 1)[];

// Converts a given number to binary as a byte type.
// If the minBits parameter is specified fills the byte with minBits zeros.
export function decToBin(dec: number, minBits?: number): byte {
  if (minBits === undefined) {
    minBits = 0;
  }
  const bin: byte = [];
  do {
    bin.push((dec % 2) as (0 | 1));
    dec = Math.floor(dec / 2);
    minBits--;
  } while (dec !== 0 || minBits > 0);
  return bin.reverse();
}

// Converts a given number of type byte to decimal.
export function binToDec(bin: byte): number {
  let dec = 0;
  bin.forEach((bit, i) => {
    dec += bit * Math.pow(2, bin.length-i-1);
  })
  return dec;
}
