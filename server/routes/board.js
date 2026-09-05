const express = require('express');
const router = express.Router();
const { createBoard, getBoards, getBoard, updateBoard, deleteBoard } = require('../controllers/boardController');
const auth = require('../middleware/authMiddleware');

router.route('/').post(auth, createBoard).get(auth, getBoards);
router.route('/:boardId').get(auth, getBoard).put(auth, updateBoard).delete(auth, deleteBoard);

module.exports = router;