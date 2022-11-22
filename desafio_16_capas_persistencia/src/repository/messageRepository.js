const MessageDto = require('../dtos/messageDto');
class MessageRepository{
    constructor(optionDao){
        this.dao = optionDao;
    }

    save = async(obj) =>{
        let objMessageDto = new MessageDto(obj);
        await this.dao.save(objMessageDto);
    }

    getById = async(id) =>{
        let data = await this.dao.getById(id);
        return data;
    }

    getAll = async() => {
        let data = await this.dao.getAll();
        return data;
    }

    deleteById = async(id) =>{
        let info = await this.dao.deleteById(id);
        return info;
    }

    deleteAll = async()=>{
        let info = await this.dao.deleteAll();
        return info;
    }

    updateById = async(id, obj)=>{
        let data = await this.dao.updateById(id, obj);
        return data;
    }
}

module.exports = MessageRepository;