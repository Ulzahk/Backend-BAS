const { client } = require('../../config/database');
const { v4: uuid }  = require('uuid');

class CardsService{
  constructor(){
    this.table = 'cards'
    this.fields = 'id, card_name, card_image, description, price'
  }

  async createCard({ card }){
    const { cardName, cardImage, description, price } = card;
    try {
      const id = uuid();
      const cardCreated = await client.query(
        `INSERT INTO ${this.table}(${this.fields}) VALUES (
          '${id}'
          '${cardName}',
          '${cardImage}',
          '${description}',
          '${price}'
        )`
      );
      return cardCreated.rowCount;
    } catch (err) {
      console.error(err);
    }
  }

  async getCards(){
    try {
      const cards = await client.query(`SELECT * FROM ${this.table}`);
      return cards || [];
    } catch (err) {
      console.error(err)
    }
  }

  async getCardById({ cardId }){
    try {
      const card = await client.query(`SELECT * FROM ${this.table} WHERE id='${cardId}'`);
      return card.rows[0] || [];
    } catch (err) {
      console.error(err)
    }
  }

  async updateCard({ cardId, card }){
    const { cardName, cardImage, description, price } = card
    try {
      const cardUpdated = await client.query(
        `UPDATE ${this.table} SET
        card_name='${cardName}',
        card_image='${cardImage}',
        description='${description}',
        price='${price}'
        WHERE id='${cardId}'`
      );
      return cardUpdated.rowCount;
    } catch (err) {
      console.error(err);
    }
  }

  async deleteCard({ cardId }){
    try {
      const cardDeleted = await client.query(`DELETE FROM ${this.table} WHERE id='${cardId}'`);
      return cardDeleted
    } catch (error) {
      console.error(err);
    }
  }
}

module.exports = CardsService;