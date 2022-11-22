const UserDto = require('../dtos/userDto');
class UserRepository{
    constructor(optionDao){
        this.dao = optionDao;
    }

    save = async(obj) =>{
        let objUserDto = new UserDto(obj);
        await this.dao.save(objUserDto);
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

module.exports = UserRepository;