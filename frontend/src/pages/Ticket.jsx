import React from 'react'
import {useEffect, useState} from 'react'
import {toast} from 'react-toastify'
import Modal from 'react-modal'
import { FaPlusCircle } from "react-icons/fa";
import {useSelector, useDispatch} from 'react-redux'
import {useParams, useNavigate} from 'react-router-dom'
import { getTicket, closeTicket, reset } from '../features/ticket/ticketSlice'
import {getTicketNotes, createTicketNote, reset as notesReset} from '../features/notes/noteSlice' 
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import NoteItem from '../components/NoteItem'

const customStyles = {
  content: {
    width:'600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position:'relative'
    
  },
};
Modal.setAppElement('#root');



function Ticket() {
  
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [noteText, setNoteText] = useState(' ');
// open or close modal
  const openModal =()=> setModalIsOpen(true)
  const closeModal =()=> setModalIsOpen(false)
  
  const {ticket, isLoading, isSuccess,isError, message} =useSelector((state)=>state.tickets)
  const {notes, isLoading:noteIsLoading} =useSelector((state)=>state.notes)
  const params = useParams()
  const {ticketId} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  


  useEffect(()=>{
    if(isError){
      toast.error(message)
    }

    dispatch(getTicket(ticketId))
    dispatch(getTicketNotes(ticketId))
  
    //eslint-disable-next-line
  },[ticketId,isError, message])

  const onTicketClose=()=>{
    dispatch(closeTicket(ticketId))
    toast.success('Ticket Closed')
    navigate('/tickets')
  }

  if(isLoading || noteIsLoading){
    return <Spinner />
  }
  if(isError){
    return <h3>Something went wrong</h3>
  }

// create note submit

  const onNoteSubmit=(e)=>{
     e.preventDefault()
     dispatch(createTicketNote({noteText, ticketId}))
     closeModal()
     
  }
  return (
    <div className='ticket-page'>
      <header className="ticket-header">
        <BackButton url='/tickets'/>
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
          {ticket.status}
          </span>
        </h2>
        <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
        <h3>Product : {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {ticket.status !=='closed' && (
        <button onClick={openModal} className='btn '><FaPlusCircle />Add Note</button>
      )}
      <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Add Note"
        >
            <h2 >Add Note</h2>
            <button onClick={closeModal} className="btn-close"> X </button>
            <form onSubmit={onNoteSubmit} >
              <div className="form-group">
                <textarea 
                name="noteText" 
                id="noteText" 
                className='form-control' 
                placeholder='add note' 
                value={noteText}
                onChange={(e)=>setNoteText(e.target.value)}>
                </textarea>
              </div>
              <div className="form-group">
                <button className="btn" type='submit'>Submit</button>
              </div>
            </form>
      </Modal>


      {notes.map((note)=>(
       <NoteItem key={note._id} note={note}/>
      ))}


     {ticket.status !== 'closed' &&(
      <button onClick={onTicketClose}  type='submit' className='btn btn-block status-closed'>close ticket</button>
     )}
      
    </div>
  )
}

export default Ticket
