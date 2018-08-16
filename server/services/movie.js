const mongoose = require('mongoose')

class Movie {

   static async getAllMovie(){
        const MovieModel = mongoose.model('MovieModel')
        const movie = await MovieModel.find({}).sort({'meta.updatedAt':-1})
        return movie
    }
}

module.exports = Movie