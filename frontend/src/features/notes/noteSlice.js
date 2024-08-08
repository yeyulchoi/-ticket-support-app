import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import noteService from './noteService'


const initialState={
    notes:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}

export const createTicketNote = createAsyncThunk(
    'notes/create', 
    async ({noteText,ticketId}, thunkAPI)=>{    
        try{
            const token = thunkAPI.getState().auth.user.token
            return await noteService.createNote(noteText,ticketId,token)
        }catch(error) {
            const message= (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    })

export const getTicketNotes = createAsyncThunk(
    'notes/getAll', 
    async ( ticketId, thunkAPI)=>{    // not going to pass in here so._, but still want to use thunkAPI to get a token
        try{
            const token = thunkAPI.getState().auth.user.token
            return await noteService.getNotes(ticketId,token)
        }catch(error) {
            const message= (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    })

export const noteSlice = createSlice({
    name:'note',
    initialState,
    reducers:{
        reset:(state)=>initialState
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getTicketNotes.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getTicketNotes.fulfilled,(state,action)=>{
            state.isLoading =false
            state.isSuccess =true
            state.notes =action.payload   //not array but single ticket
        })
        .addCase(getTicketNotes.rejected, (state, action)=>{
            state.isLoading =false
            state.isError =true
            state.message=action.payload
        })
        .addCase(createTicketNote.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createTicketNote.fulfilled,(state,action)=>{
            state.isLoading =false
            state.isSuccess =true
            state.notes.push(action.payload)   
        })
        .addCase(createTicketNote.rejected, (state, action)=>{
            state.isLoading =false
            state.isError =true
            state.message=action.payload
        })
    }
})

export const {reset} = noteSlice.actions
export default noteSlice.reducer