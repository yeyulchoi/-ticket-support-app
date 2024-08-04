const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')


// get user tickets  // route:GET req /api/tickets/ access private

const getTickets = asyncHandler(async (req, res)=>{
        //Get user using the id in the JWT
        const user = await User.findById(req.user.id)

        if(!user){
            res.status(401)
            throw new Error('User not found')
        }

        const tickets = await Ticket.find({user: req.user.id})


    res.status(200).json(tickets)
})


//create new ticket  / //route: POST req,,/api/tickets  // access: private

const createTicket = asyncHandler(async(req, res)=>{
    const{product, description} = req.body

    if(!product || !description){
        res.status(400)
        throw new Error('Please add a product and a description')
    }

    const ticket = await Ticket.create({product,
                                        description,
                                        user:req.user.id, 
                                        status:'new'})
    res.status(201).json(ticket)
})

//get single ticket  /api/tickets/:id
const getSingleTicket =asyncHandler(async(req,res)=>{
    //Get user using the id in the JWT
    const user= await User.findById(req.user.id)

    if(!user){
        res.status(404)
        throw new Error('User not found')
    }

    const singleTicket = await Ticket.findById(req.params.id) // ticket from url
    if(!singleTicket){
        res.status(404)
        throw new Error('Ticket not found')
    }
// limit the ticket to a user
    if(singleTicket.user.toString() !== req.user.id) {// if I want to use use.id, then use.id.toString()should be used.
        res.status(401)
        throw new Error('Not Authorized')
    }
    res.status(200).json(singleTicket)
   
})

const deleteTicket = asyncHandler(async(req,res)=>{
    //get user using the id in the JWT
    const user= await User.findById(req.user.id)

    if(!user){
        res.status(404)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)
    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found')
    }
    if (ticket.user.toString()!==req.user.id){
        res.status(404)
        throw new Error('Not Authorized')
    }

    await Ticket.findByIdAndDelete(req.params.id);   //ATTENTION NOTE: ticket.remove() doesn't work. probably deprecated at this point of time
    res.status(200).json({success: true})
})

const updateTicket = asyncHandler(async(req,res)=>{
    //get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const ticket =await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found')
    }

    if (ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Not Authorized')
    }

    const updatedTicket =await Ticket.findByIdAndUpdate(req.params.id, req.body,{new:true})
   res.status(200).json(updatedTicket)
})


module.exports={
    getTickets,
    createTicket,
    getSingleTicket,
    updateTicket,
    deleteTicket,
}
