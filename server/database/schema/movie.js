const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    float: String,
    href: String,
    poster: String,
    info: String,
    title: String,
    score: String,
    hasplay: String,
    starrings: Array,
    meta: {
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updatedAt: {
            type: Date,
            default: Date.now()
        }
    }
},{collection:"movie_qq"})

movieSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        this.updatedAt = Date.now()
    }
    next()
})

mongoose.model("MovieModel", movieSchema)