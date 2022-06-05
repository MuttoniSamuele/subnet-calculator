export interface Subnet {
  network: number[];
  firstHost: number[];
  lastHost: number[];
  broadcast: number[];
}

// Returns the given address as a string in decimal dot notation.
export function addrToStr(addr: number[]): string {
  return `${addr[0]}.${addr[1]}.${addr[2]}.${addr[3]}`;
}

// Adds a given number to an address and returns an acceptable address.
export function addrSum(addr: number[], n: number): number[] {
  addr = [...addr];
  let i = 3;
  while (true) {
    addr[i] += n;
    if (addr[i] <= 255) {
      break;
    }
    addr[i] = n % 256;
    n = Math.floor(n / 256);
    i--;
  }
  return addr;
}

// Calculates a single subnet.
// netAddr is the address of the network that contains the subnet at subnetIndex position.
export function calcSubnet(netAddr: number[], hostId: number, subnetIndex: number): Subnet {
  const addressesCnt = Math.pow(2, hostId);
  const subnetAddr = addrSum(netAddr, addressesCnt*subnetIndex);
  return {
    network: subnetAddr,
    firstHost: addrSum(subnetAddr, 1),
    lastHost: addrSum(subnetAddr, addressesCnt-2),
    broadcast: addrSum(subnetAddr, addressesCnt-1)
  }
}
