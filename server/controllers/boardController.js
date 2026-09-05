const Board = require('../models/Board');
const createBoard = async (req, res) => {
    try {
        const { title } = req.body;
        const owner = req.user.id;
        const board = await Board.create({ title, owner });
        console.log('Board created successfully');
        return res.status(201).json({ message: 'Board created successfully', board });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', details: error.message });
        }
        console.error('Error creating board:', error);
        return res.status(500).json({ message: 'Error creating board' });
    }

}

const getBoards = async (req, res) => {
    try {
        const boards = await Board.find({
            $or: [
                { owner: req.user.id },
                { members: req.user.id }
            ]
        });
        return res.status(200).json({ message: 'Boards retrieved successfully', boards });
    } catch (error) {
        console.error('Error retrieving boards:', error);
        return res.status(500).json({ message: 'Error retrieving boards' });
    }
}

const getBoard = async (req, res) => {
    try {
        const board = await Board.findById(req.params.boardId);
        if (!board) {
            return res.status(404).json({ message: 'Board not found' })
        }
        if (board.owner.toString() !== req.user.id && !board.members.some(memberId => memberId.toString() === req.user.id)) {
            return res.status(403).json({ message: 'Access denied. You are not a member of this board.' });
        }
        return res.status(200).json(board);

    } catch (error) {
        console.error('Error retrieving board:', error);
        return res.status(500).json({ message: 'Error retrieving board' });
    }

}

const updateBoard = async (req, res) => {
    try {
        const board = await Board.findById(req.params.boardId);
        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }
        if (board.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied. You are not the owner of this board.' });
        }
        board.title = req.body.title || board.title;
        board.members = req.body.members || board.members;
        await board.save();
        return res.status(200).json({ message: 'Board updated successfully', board });
    } catch (error) {
        console.error('Error updating board:', error);
        return res.status(500).json({ message: 'Error updating board' });
    }



}

const deleteBoard = async (req, res) => {
    try {
        const board = await Board.findById(req.params.boardId);
        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }
        if (board.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied. You are not the owner of this board.' });
        }
        await board.deleteOne();
        return res.status(200).json({ message: 'Board deleted successfully' });
    } catch (error) {
        console.error('Error deleting board:', error);
        return res.status(500).json({ message: 'Error deleting board' });
    }
}
module.exports = { createBoard, getBoards, getBoard, updateBoard, deleteBoard };