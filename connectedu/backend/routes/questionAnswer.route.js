const express = require('express');
const { askQuestion, respondToQuestion, getQuestionAndAnswer, getQuestions } = require('../controller/questionAnswer.controller.js');
const { verifyToken } = require("../middleware/jwt");

const router = express.Router();

router.post('/', verifyToken, askQuestion);
router.post('/:questionId', verifyToken, respondToQuestion);
router.get('/:questionId/answer', verifyToken, getQuestionAndAnswer);
router.get('/', verifyToken, getQuestions);

module.exports = router;
