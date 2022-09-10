import * as Heros from "./heros.dao.js"

export const createHero = function (req, res, next) {
    var hero = {
        name: req.body.name,
        description: req.body.description
    };

    Heros.create(hero, function(err, hero) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Hero created successfully"
        })
    })
}

export const getHeros = function(req, res, next) {
    Heros.get({}, function(err, heros) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            heros: heros
        })
    })
}

export const getHero = function(req, res, next) {
    Heros.get({name: req.params.name}, function(err, heros) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            heros: heros
        })
    })
}

export const updateHero = function(req, res, next) {
    var hero = {
        name: req.body.name,
        description: req.body.description
    }
    // using updateOne() instead of update()
    Heros.updateOne({_id: req.params.id}, hero, function(err, hero) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Hero updated successfully"
        })
    })
}

export const removeHero = function(req, res, next) {
    Heros.delete({_id: req.params.id}, function(err, hero) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Hero deleted successfully"
        })
    })
}