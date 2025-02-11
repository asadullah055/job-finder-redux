import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    sort:'',
    filter: '',
    search: ''
}


const filterSlice = createSlice({
    name:'filter',
    initialState,
    reducers:{
        updateFilter: (state, action)=>{
            state = {...state, ...action.payload}
            return  state
        }
    }
})

export const {updateFilter} = filterSlice.actions 
export default filterSlice.reducer