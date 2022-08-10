import { decToBin } from "./binary";

export type IpAddr = [number, number, number, number];
export type IpClass = "A" | "B" | "C";

export interface Subnet {
  network: IpAddr;
  firstHost: IpAddr;
  lastHost: IpAddr;
  broadcast: IpAddr;
}

// Returns the IpClass of the given address.
// Returns null if the class is not acceptable.
export function getAddrClass(addr: IpAddr): IpClass | null {
  const octect = decToBin(addr[0], 8);
  if (octect[0] === 0) {
    return "A";
  } else if (octect[1] === 0) {
    return "B";
  } else if (octect[2] === 0) {
    return "C";
  }
  return null;
}

// Returns the given address as a string in decimal dot notation.
export function addrToStr(addr: IpAddr): string {
  return `${addr[0]}.${addr[1]}.${addr[2]}.${addr[3]}`;
}

// Adds a given number to an address and returns an acceptable address.
export function addrSum(addr: IpAddr, n: number): IpAddr {
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
export function calcSubnet(netAddr: IpAddr, hostId: number, subnetIndex: number): Subnet {
  const addressesCnt = Math.pow(2, hostId);
  const subnetAddr = addrSum(netAddr, addressesCnt*subnetIndex);
  return {
    network: subnetAddr,
    firstHost: addrSum(subnetAddr, 1),
    lastHost: addrSum(subnetAddr, addressesCnt-2),
    broadcast: addrSum(subnetAddr, addressesCnt-1)
  }
}
