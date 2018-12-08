const { isArray } = Array
const objectRE = /^(function|object)$/

type Prop = (keyof any) | (keyof any)[]
type Default<T, U> = undefined extends U
  ? T
  : T extends undefined
  ? Exclude<T, undefined> | U
  : T

/** Split strings by period, pass arrays thru, and wrap numbers/symbols in an array */
const split = (prop: Prop) =>
  isArray(prop) ? prop : typeof prop == 'string' ? prop.split('.') : [prop]

/** This namespace helps you avoid "* as" syntax (if you prefer) */
export default { get, set, unset, delete: unset }

/**
 * Access any property in an object tree.
 *
 * You may provide a default value as the 3rd argument, if you wish.
 *
 * Taken from: https://github.com/developit/dlv
 */
export function get<T, P extends keyof T, U = undefined>(
  obj: T,
  prop: P,
  def?: U,
  i?: number
): Default<T[P], U>

export function get(obj: any, prop: Prop, def?: any, i?: number): any

export function get(obj: any, prop: any, def?: any, i: number = 0) {
  let path = split(prop),
    len = path.length
  while (obj && i < len) obj = obj[path[i++]]
  return obj === undefined || i < len ? def : obj
}

/**
 * Assign a value to any property in an object tree.
 *
 * The new value is returned.
 *
 * Taken from: https://github.com/lukeed/dset
 */
export function set<T, P extends keyof T>(
  obj: T,
  prop: P,
  val: T[P],
  i?: number
): T[P]

export function set(obj: any, prop: Prop, val: any, i?: number): any

export function set(obj: any, prop: any, val: any, i: number = 0) {
  let path = split(prop),
    last = path.length - 1
  while (i < last) {
    let child = obj[path[i]]
    obj = child == null ? (obj[path[i]] = {}) : child
    if (objectRE.test(typeof obj)) i++
    else
      throw Error(
        `Expected "${path
          .slice(0, i + 1)
          .join('.')}" to be an object or nullish`
      )
  }
  if (obj && i == last) obj[path[i]] = val
  return val
}

/**
 * Delete any property in an object tree.
 *
 * The property value is returned.
 */
export function unset<T, P extends keyof T, U = undefined>(
  obj: T,
  prop: T[P] extends undefined ? P : never,
  def?: U,
  i?: number
): undefined extends U ? T[P] : Exclude<T[P], undefined> | U

export function unset(obj: any, prop: Prop, def?: any, i?: number): any

export function unset(obj: any, prop: any, def?: any, i: number = 0): any {
  let path = split(prop),
    last = path.length - 1
  while (obj && i < last) obj = obj[path[i++]]
  if (obj && i == last) {
    let val = obj[path[i]]
    delete obj[path[i]]
    if (val !== undefined) return val
  }
  return def
}

export { unset as delete }
