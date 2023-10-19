import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";
import { type RootState } from "@/app/store";

function getPosition(): Promise<GeolocationPosition> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk("user/fetchAddress", async () => {
  // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postCode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  // case Fulfilled PAYLOAD
  return { position, address };
});

type InitialStateType = {
  userName: string;
  status: "idle" | "loading" | "error";
  position: {
    latitude: void | number;
    longitude: void | number;
  };
  address: string;
  error: null | string;
};

const initialState: InitialStateType = {
  userName: "",
  status: "idle",
  position: {
    latitude: 0,
    longitude: 0,
  },
  address: "",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    logoutUser: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        const { position, address } = action.payload;
        state.position = position;
        state.address = address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? null;
      });
  },
});

export const selectUser = (state: RootState) => state.user;

export const { updateName, logoutUser } = userSlice.actions;
export default userSlice.reducer;
