import { createClient, print } from "redis";
import { green, red } from "chalk";
import * as bluebird from "bluebird";
import { Schema, SchemaBase } from "./util";

const Port = 6379;
const Host = "127.0.0.1";
const Options = {};
const client = createClient(Port, Host, Options);

client.on("ready",() => {
    console.log(green("数据库启动成功"));
});

client.on("error", (err) => {
    console.error("Error:" + err);
});

let connect = new Promise((resolve, reject) => {
    client.on("connect", () => {
        resolve();
    })
});

export const redis = {
    set: function(table, value) {
        return connect.then(() => {
            return new Promise((resolve, reject) => {
                client.set(table, value, (error, value) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(value)
                })
            })
        })
    },
    get: function(table) {
        return connect.then(() => {
            return new Promise((resolve,reject) => {
                client.get(table, function(error, value) {
                    if (error) {
                        reject(error)
                    }
                    resolve(value)
                })
            })
        })
    },
    hmset: function(...args) {
        return connect.then(() => {
            return new Promise((resolve, reject) => {
                client.hmset(...args, (error, value) => {
                    if (error) {
                        reject(error)
                    }

                    resolve(value)
                })
            })
        })
    },
    hgetall: function(...args) {
        return connect.then(() => {
            return new Promise((resolve, reject) => {
                client.hgetall(...args, (error, value) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(value);
                })
            })
        })
    },
    sadd: function(...args) {
        return connect.then(() => {
            return new Promise((resolve, reject) => {
                client.sadd(...args, (error, value) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(value);
                })
            })
        })
    },
    multi: function(...args) {
        return connect.then(() => {
            return new Promise((resolve, reject) => {
                client.multi().smembers(args[0])
                      .exec((error, value) => {
                            if (error) {
                                reject(error)
                            }
                            console.log(value[0]);
                            
                            resolve(value[0].map(e => JSON.parse(e)));
                     });
            })
        })
    },
    del: function(...args) {
        return connect.then(() => {
            return new Promise((resolve, reject) => {
                client.del(args[0], ...args.slice(1, args.length), (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                })
            })
        })
    }
}


export function SchemaMaker(source, schema: Schema[]) {
    return new Promise((resolve, reject) => {
        for(let i = schema.length; i--;) {
            let e = schema[i];
            if (e.require && !source[e.key]) {
                reject(`${e.key}必填`);
            } else if (typeof source[e.key] !== e.type) {
                reject(`'${e.key}'的类型错误,该类型应为${e.type}`)
            } else {
                resolve(source)
            };
        }
    })
}

// export class SchemaExtend {
//     schema: Schema[] = SchemaBase

//     constructor(moreSchema) {
//         this.schema = this.schema.concat(moreSchema);

//         Object.defineProperty(this, "schema", {
//             enumerable: false,
//         })
//     }

//     checkData(data) {
//         return new Promise((resolve, reject) => {
//             console.log(this.schema);
            
//             this.schema.forEach((e) => {
//                 if (e.require) {
//                     reject(red(`${e.key}必填`))
//                 };

//                 if (typeof this[e.key] !== e.type) {
//                     reject(red(`'${e.key}'的类型错误,该类型应为${e.type}`))
//                 }
//                 resolve(this)
//             });
//         })
//         .catch(err => {
//             console.error(err);
//         })
//     }
// }