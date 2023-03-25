import express from "express"
import { getBooks, getBook, addBook, updateBook, createBook, deleteBook, removeBook } from "../controller/bookController.js"
import { authenticateToken, authenticateAdmin } from "../middleware.js"

const router = express.Router()

// GET all books
router.post('/', authenticateToken, getBooks)
// GET one book
router.post('/getOne', authenticateToken, getBook)
// CREATE book
router.post('/create', authenticateAdmin, createBook)
// DELETE book
router.delete('/delete', authenticateAdmin, deleteBook)
// REMOVE one book
router.put('/remove', authenticateAdmin, removeBook)
// ADD one book
router.put('/add', authenticateAdmin, addBook)
// UPDATE book
router.put('/update', authenticateAdmin, updateBook)

export default router