const CardsService = require('../services/CardsService');

const cardsService = new CardsService();

class CardsController{
  async createCard(req, res, next){
    const { card } = req.body
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
      const totalRecords = users.length.toString();
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
    try {
      
    } catch (err) {
      
    }
  }

  async updateCard(req, res, next){
    try {
      
    } catch (err) {
      
    }
  }

  async deleteCard(req, res, next){
    try {
      
    } catch (err) {
      
    }
  }
}

module.exports = CardsController;