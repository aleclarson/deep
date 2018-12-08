"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isArray = Array.isArray;
var objectRE = /^(function|object)$/;
/** Split strings by period, pass arrays thru, and wrap numbers/symbols in an array */
var split = function (prop) {
    return isArray(prop) ? prop : typeof prop == 'string' ? prop.split('.') : [prop];
};
/** This namespace helps you avoid "* as" syntax (if you prefer) */
exports.default = { get: get, set: set, unset: unset, delete: unset };
function get(obj, prop, def, i) {
    if (i === void 0) { i = 0; }
    var path = split(prop), len = path.length;
    while (obj && i < len)
        obj = obj[path[i++]];
    return obj === undefined || i < len ? def : obj;
}
exports.get = get;
function set(obj, prop, val, i) {
    if (i === void 0) { i = 0; }
    var path = split(prop), last = path.length - 1;
    while (i < last) {
        var child = obj[path[i]];
        obj = child == null ? (obj[path[i]] = {}) : child;
        if (objectRE.test(typeof obj))
            i++;
        else
            throw Error("Expected \"" + path
                .slice(0, i + 1)
                .join('.') + "\" to be an object or nullish");
    }
    if (obj && i == last)
        obj[path[i]] = val;
    return val;
}
exports.set = set;
function unset(obj, prop, def, i) {
    if (i === void 0) { i = 0; }
    var path = split(prop), last = path.length - 1;
    while (obj && i < last)
        obj = obj[path[i++]];
    if (obj && i == last) {
        var val = obj[path[i]];
        delete obj[path[i]];
        if (val !== undefined)
            return val;
    }
    return def;
}
exports.unset = unset;
exports.delete = unset;
