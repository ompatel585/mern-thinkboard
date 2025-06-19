import express from 'express';
import { getAllNotes, createNote, deleteNote, updateNote, getNotesById } from '../controllers/notesController.js';

const router = express.Router();

router.get('/', getAllNotes);
router.get('/:id', getNotesById);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;