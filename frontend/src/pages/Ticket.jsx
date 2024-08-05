import React from 'react'
import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useParams, useNavigate} from 'react-router-dom'
import { getTicket, reset, closeTicket } from '../features/ticket/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import TicketItem from '../components/TicketItem'
import {toast} from 'react-toastify'





function Ticket() {
  const {ticket, isLoading, isSuccess,isError, message} =useSelector((state)=>state.tickets)
  // const params = useParams()
  const dispatch = useDispatch()
  const {ticketId} = useParams()
  const navigate = useNavigate()
  

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    dispatch(getTicket(ticketId))
  },[ticketId,isError, message])

  if(isLoading){
    return <Spinner />
  }
  if(isError){
    return <h3>Something went wrong</h3>
  }

  const onTicketClose=()=>{
    dispatch(closeTicket(ticketId))
    toast.success('Ticket Closed')
    navigate('/tickets')
  }
  return (
    <div className='ticket-page'>
      <header className="ticket-header">
        <BackButton url='/tickets'/>
        <h2>
          Ticket ID: {ticket._id}
          <span className='{`status status-${ticket.status}'>
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
      </header>
     {ticket.status !== 'closed' &&(
      <button onClick={onTicketClose}  type='submit' className='btn btn-block'>close ticket</button>
     )}
      
    </div>
  )
}

export default Ticket
