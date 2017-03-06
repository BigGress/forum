export interface Schema {
    require: boolean,
    type: string,
    key: string,
    max?: number,
    min?: number,

}

export const SchemaBase: Schema[] = [{
    key: "ctime",
    type: "number",
    require: false
}, {
    key: "utime",
    type: "number",
    require: false
}, {
    key: "id",
    type: "string",
    require: true
}]