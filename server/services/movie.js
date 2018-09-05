const mongoose = require('mongoose')

class Movie {

   static async getAllMovie(pageSize=20,pageNum=0){
        const MovieModel = mongoose.model('MovieModel')
        const movie = await MovieModel.find({}).sort({'meta.updatedAt':-1}).skip(pageSize*pageNum).limit(pageSize)
        return movie
    }
}

module.exports = Movie