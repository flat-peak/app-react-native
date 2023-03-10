import { createSlice } from "@reduxjs/toolkit";
import { Actions } from "../sagas/actions";
import { InputScenarios } from "../../data/input-scenarios";

export const inputDataSlice = createSlice({
  name: "inputData",
  initialState: /** @type {App.InputState} */ {
    macAddress: "",
    customerId: "",
    productId: "",
    deviceId: "",
    timezone: "",
    postalAddress: {
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      post_code: "",
      country_code: "",
    },
  },
  reducers: {
    setInputData: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
    setInputParam: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    setAddressField: (state, action) => {
      let { key, value } = action.payload;
      if (state.postalAddress.hasOwnProperty(key)) {
        state.postalAddress[key] = value;
      }
    },
    setAddress: (state, action) => {
      state.postalAddress = action.payload;
    },
  },
});

export const initInputParams = (payload) => {
  return {
    type: Actions.initSession,
    payload: payload,
  };
};

export const { setInputData, setInputParam, setAddressField, setAddress } =
  inputDataSlice.actions;

export const initDefaultSession = (payload) => {
  return {
    type: Actions.initDefaultSession,
    payload: payload,
  };
};

export const initDeveloperSession = (payload) => {
  return {
    type: Actions.initDeveloperSession,
    payload: payload,
  };
};

export const selectInputData = (state) => state.inputData;
export const selectMacAddress = (state) => state.inputData.macAddress;
export const selectProductId = (state) => state.inputData.productId;
export const selectCustomerId = (state) => state.inputData.customerId;
export const selectDeviceId = (state) => state.inputData.deviceId;
export const selectTimezone = (state) => state.inputData.timezone;
export const selectAddress = (state) => state.inputData.postalAddress;
export const selectCountryCode = (state) =>
  String(state.inputData.postalAddress.country_code);

export default inputDataSlice.reducer;
