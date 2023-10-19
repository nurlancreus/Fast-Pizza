import { type CartItemType } from "@/features/cart/cartSlice";

// MENU TYPE
export interface MenuItemType {
  id: number;
  imageUrl: string;
  ingredients: Array<string>;
  name: string;
  soldOut: boolean;
  unitPrice: number;
}

// GEOLOCATION TYPE
export interface GetAddressType {
  latitude: number;
  longitude: number;
}

interface AdministrativeDataType {
  adminLevel: number;
  description: string;
  geonameId: number;
  isoCode: string;
  isoName: string;
  name: string;
  order: number;
  wikidataId: string;
}

type InformativeDataType = Omit<AdministrativeDataType, "adminLevel">;

export interface GetAdressDataType {
  city: string;
  continentCode: string;
  countryCode: string;
  countryName: string;
  latitude: number;
  longitude: number;
  locality: string;
  localityInfo: {
    administrative: Array<AdministrativeDataType>;
    informative: Array<InformativeDataType>;
  };
  localityLanguageRequested: string;
  lookupSource: string;
  plusCode: string;
  postCode: string;
  principalSubdivision: string;
  principalSubdivisionCode: string;
}

// ORDER TYPE
export interface NewOrderType {
  cart: CartItemType[];
  priority: boolean;
  customer: string;
  phone: string;
  address: string;
}

export interface OrderType {
  status: string;
  data: Pick<NewOrderType, "customer" | "priority" | "cart"> & {
    id: string;
    orderPrice: number;
    priorityPrice: number;
    status: string;
    estimatedDelivery: string;
  };
}
