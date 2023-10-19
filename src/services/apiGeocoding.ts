import { type GetAdressDataType, type GetAddressType } from "./model/types";

export async function getAddress({ latitude, longitude }: GetAddressType): Promise<GetAdressDataType> {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`,
  );
  if (!res.ok) throw Error("Failed getting address");

  const data = await res.json();
  return data;
}