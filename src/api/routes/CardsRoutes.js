const express = require('express');
const CardsController = require('../controllers/CardsControllers');

const cardsController = new CardsController();

const cardAPI = (api) => {
  const router = express.Router();
  api.use('/api/v1/cards', router);

  // Create A Card
  router.post('/', cardsController.createCard);

  // List All Cards
  router.get('/', cardsController.listCards);

  // List A Card
  router.get('/:cardId', cardsController.listCardById);

  // List All Cards By User

  // Update A Card
  router.put('/:cardId', cardsController.updateCard);

  // Delete A Card
  router.delete('/:cardId', cardsController.deleteCard);
}

module.exports = cardAPI;