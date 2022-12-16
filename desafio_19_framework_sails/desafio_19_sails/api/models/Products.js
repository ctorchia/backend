/**
 * Products.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    // id: { type: 'number', required: true},
    name: { type: 'string', required: true},
    description: { type: 'string'},
    code: { type: 'number', required: true},
    thumbnail: { type: 'string'},
    price: { type: 'number', required: true},
    stock: { type: 'number', required: true},
  },

};

