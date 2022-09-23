
class HandlerDB {
    constructor(configKnex, tableName) {
        this.knex = configKnex
        this.tableName = tableName
    }

    // add(Object) : Number

    async add(obj) {
        try {
            await this.knex(this.tableName).insert(obj)  // Le podemos pasar un obj o un array
            return { message: 'Producto agregado' }
        } catch (error) {
            console.log(error);
        }
    }

    // getByID(Number) : Object

    async getById(id) {
        try {
            let item = await this.knex.from(this.tableName).select('*').where({ id: id })
            return item[0]
        } catch (error) {
            console.log(error);
        }
    }

    // getAll() : Object[]

    async getAll() {
        try {
            let items = await this.knex.from(this.tableName).select('*')
            return items
        } catch (error) {
            console.log(error);
        }
    }

    // updateById

    async updateById(id, product) {
        try {
            console.log(product); 
            await this.knex.from(this.tableName).where({id:id}).update({...product})
            return {message: 'Producto actualizado'}
        } catch (error) {
            console.log(error);
        }
    }

    // deleteById(Number) : void

    async deleteById(id) {
        try {
            await this.knex.from(this.tableName).where({ id: id }).del()
            return { message: 'Item eliminado' }
        } catch (error) {
            console.log(error);
        }
    }

    // deleteAll() : void

    async deleteAll() {
        await this.knex.from(this.tableName).del()
        return { message: 'Todos los items eliminados' }
    }
}

module.exports = HandlerDB;