declare type Prop = (keyof any) | (keyof any)[];
declare type Default<T, U> = undefined extends U ? T : T extends undefined ? Exclude<T, undefined> | U : T;
declare const _default: {
    get: typeof get;
    set: typeof set;
    unset: typeof unset;
    delete: typeof unset;
};
/** This namespace helps you avoid "* as" syntax (if you prefer) */
export default _default;
/**
 * Access any property in an object tree.
 *
 * You may provide a default value as the 3rd argument, if you wish.
 *
 * Taken from: https://github.com/developit/dlv
 */
export declare function get<T, P extends keyof T, U = undefined>(obj: T, prop: P, def?: U, i?: number): Default<T[P], U>;
export declare function get(obj: any, prop: Prop, def?: any, i?: number): any;
/**
 * Assign a value to any property in an object tree.
 *
 * The new value is returned.
 *
 * Taken from: https://github.com/lukeed/dset
 */
export declare function set<T, P extends keyof T>(obj: T, prop: P, val: T[P], i?: number): T[P];
export declare function set(obj: any, prop: Prop, val: any, i?: number): any;
/**
 * Delete any property in an object tree.
 *
 * The property value is returned.
 */
export declare function unset<T, P extends keyof T, U = undefined>(obj: T, prop: T[P] extends undefined ? P : never, def?: U, i?: number): undefined extends U ? T[P] : Exclude<T[P], undefined> | U;
export declare function unset(obj: any, prop: Prop, def?: any, i?: number): any;
export { unset as delete };
