import { createSlice } from "@reduxjs/toolkit"

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    resetInputs: false,
  },
  reducers: {
    triggerResetInputs: (state) => {
      state.resetInputs = true
    },
    clearResetInputs: (state) => {
      state.resetInputs = false
    },
  },
})

export const { triggerResetInputs, clearResetInputs } = uiSlice.actions
export default uiSlice.reducer
