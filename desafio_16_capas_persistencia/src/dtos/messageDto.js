class MessageDto{
    constructor(message){
        this.author = {
            id : message.author.id,
            nombre : message.author.firstName,
            apellido : message.author.lastName,
            edad : message.author.age,
            alias : message.author.alias,
            avatar : message.author.avatar
        },
        this.date = message.date,
        this.text = message.text
    }
}

module.exports=MessageDto;