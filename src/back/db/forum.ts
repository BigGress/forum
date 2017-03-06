import { redis, SchemaMaker } from "./redis";
import { v4 } from "node-uuid";
import { Schema, SchemaBase } from "./util";

import {table as mongoose} from "./module/db";
var formsSchema = new mongoose.Schema({
    ctime: {type: Number, default: Date.now},
    utime: {type: Number},
    title: {type: String },
    content: {type: String},
    ceator: mongoose.Schema.Types.ObjectId,
    id: {type: String, default: v4()}
});

formsSchema.pre("save", function(next) {
    if (this.get("ctime")) {
        this.set("utime", Date.now());
    } else {
        this.set("ctime", Date.now());
    }
    next();
})
formsSchema.statics = {
    fetch: function(cb) {
        return this.find({}).exec(cb);
    },
    findById: function(id, cb) {
        return this.findOne({_id: id})
                    .exec(cb)
    }
}

let formsModel = mongoose.model("Forms", formsSchema);

// let formsData = new formsModel();


export const forums = {
    save: (...args) => {
        // let forum = SchemaMaker(new Forum(args[0]),SchemaBase.concat(schemaArr));
        let forum = new formsModel(args[0]);
        return new Promise((resolve, reject) => {
            forum.save((err, data) => {
                if (err) {
                    reject(err)
                }
                resolve(data)
            })
        });
        // return redis.sadd(table, JSON.stringify(data) ,...args.slice(1, args.length))
        //             .then(res => {
        //                 return data;
        //             })
    },

    fetch: () => {
        // return redis.multi(table);
        return formsModel.find({})
    },

    findById: function (id) {
        return formsModel.findById(id)
    },
    findByIdAndUpdate: (id, data) => {
        return formsModel.findByIdAndUpdate(id, data);
    },
    
    delete: (id: number) => {
        return formsModel.findByIdAndRemove(id)
    },
    
    model: formsModel
}
export class Forum {
    ctime: number;
    utime: number;
    title: string;
    content: number;
    ceator: number = 1;
    id = v4();
    constructor(data) {
        Object.assign(this, data);

        if (this.ctime) {
            this.utime = Date.now();
        } else {
            this.ctime = Date.now();
        }
        
    }
}