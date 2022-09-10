
import * as mongoose from "mongoose";
import herosSchema from "./heros.model.js"

herosSchema.statics = {
    create : function(data, cb) {
        var hero = new this(data);
        hero.save(cb);
    },

    get: function(query, cb) {
        this.find(query, cb);
    },

    getByName: function(query, cb) {
        this.find(query, cb);
    },

    update: function(query, updateData, cb) {
        this.findOneAndUpdate(query, {$set: updateData},{new: true}, cb);
    },

    delete: function(query, cb) {
        this.findOneAndDelete(query,cb);
    }
}

var herosModel = mongoose.model('Heros', herosSchema);
export const herosMOdel = herosModel;