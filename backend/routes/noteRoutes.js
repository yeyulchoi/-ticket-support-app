const express = express()
const router=express.Router({mergeParams : true})
const {addNote, getNotes} =require('../controller/noteController')
const {protect} = required('../middleware/authMiddleware.js')

router.route('/').get(protect,getNotes).post(protect, addNote)



module.exports = router

