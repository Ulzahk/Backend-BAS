const CardsService = require('../services/CardsService');

const cardsService = new CardsService();

class CardsController{
  async createCard(req, res, next){
    const { body: card } = req;
    try {
      const createdCard = await cardsService.createCard({ card })
      res.status(201).json({
        message: 'Card created',
        card: createdCard
      })
    } catch (err) {
      next(err)
    }
  }

  async listCards(req, res, next){
    try {
      const cards = await cardsService.getCards();
      const totalRecords = cards.length.toString();
      res.status(200).json({
        message: 'Cards listed',
        totalRecords: totalRecords,
        cards: cards
      })
    } catch (err) {
      next(err)
    }
  }

  async listCardById(req, res, next){
    const { cardId } = req.params;
    try {
      const card = await cardsService.getCardById({ cardId });
      res.status(200).json({
        message: `Card listed`,
        card: card
      })
    } catch (err) {
      next(err)
    }
  }

  async updateCard(req, res, next){
    const { cardId } = req.params;
    const { body: card } = req;
    try {
      const cardUpdated = await cardsService.updateCard({ cardId, card });
      if (cardUpdated !== 0) {
        res.status(200).json({
          message: `Card with ID:${cardId} updated`
        })
      } else {
        res.status(406).json({
          message: `Error updating card with ID:${cardId}`
        })
      }
    } catch (err) {
      next(err)
    }
  }

  async deleteCard(req, res, next){
    const { cardId } = req.params;
    try {
      const cardDeleted = await cardsService.deleteCard({ cardId });
      if (cardDeleted !== 0) {
        res.status(200).json({
          message: `Card ${cardId} deleted`
        })
      } else {
        res.status(406).json({
          message: `Error deleting card with ID:${cardId}`
        })
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = CardsController;