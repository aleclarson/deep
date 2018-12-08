import deep, { get, set, unset } from '../src/deep'

test('string key', () => {
  let obj = { a: 1 }

  // get
  expect(get(obj, 'a')).toBe(1)
  expect(get(obj, 'a', 2)).toBe(1)

  // set
  expect(set(obj, 'a', 2)).toBe(2)
  expect(obj.a).toBe(2)

  // unset
  expect(unset(obj, 'a')).toBe(2)
  expect('a' in obj).toBeFalsy()
})

test('number key', () => {
  let arr = [1]

  // get
  expect(get(arr, 0)).toBe(1)
  expect(get(arr, 0, 2)).toBe(1)

  // set
  // unset
})

test('symbol key', () => {
  let key: any = Symbol()
  let obj = { [key]: 1 }

  // get
  expect(get(obj, key)).toBe(1)
  expect(get(obj, key, 2)).toBe(1)
  expect(get(obj, Symbol(), 2)).toBe(2)

  // set
  expect(set(obj, key, 2)).toBe(2)
  expect(obj[key]).toBe(2)

  // unset
  expect(unset(obj, key)).toBe(2)
  expect(key in obj).toBeFalsy()
})

test('dot-notated key', () => {
  let obj = { a: { b: { c: 1 } } }
  let key = 'a.b.c'

  // get
  expect(get(obj, key)).toBe(1)

  // set
  expect(set(obj, key, 2)).toBe(2)
  expect(obj.a.b.c).toBe(2)

  // unset
  expect(unset(obj, key)).toBe(2)
  expect('c' in obj.a.b).toBeFalsy()
})

test('array key', () => {
  let obj = { a: { b: { c: 1 } } }
  let key = ['a', 'b', 'c']

  // get
  expect(get(obj, key)).toBe(1)
  expect(get(obj, key, 2)).toBe(1)

  // set
  expect(set(obj, key, 2)).toBe(2)
  expect(obj.a.b.c).toBe(2)

  // unset
  expect(unset(obj, key)).toBe(2)
  expect('c' in obj.a.b).toBeFalsy()
})

test('mixed array key', () => {
  let sym: any = Symbol()
  let obj = { [sym]: [{ a: 1 }] }
  let key = [sym, 0, 'a']

  // get
  expect(get(obj, key)).toBe(1)
  expect(get(obj, key, 2)).toBe(1)

  // set
  expect(set(obj, key, 2)).toBe(2)
  expect(obj[sym][0].a).toBe(2)

  // unset
  expect(unset(obj, key)).toBe(2)
  expect('a' in obj[sym][0]).toBeFalsy()
})

test('empty array key', () => {
  let obj = {}

  // get
  expect(get(obj, [])).toBe(obj)
  expect(get(obj, [], 2)).toBe(obj)
  expect(get(void 0, [], 2)).toBe(2)

  // set
  expect(set(obj, [], 2)).toBe(2)
  expect(obj).toEqual({})

  // unset
  expect(unset(obj, [])).toBeUndefined()
  expect(unset(obj, [], 2)).toBe(2)
})

test('undefined parent', () => {
  let obj: any = { a: { b: {} } }
  let key = ['a', 'b', 'wat', 'wat']

  // get
  expect(get(obj, key)).toBeUndefined()
  expect(get(obj, key, 2)).toBe(2)

  // unset
  expect(unset(obj, key)).toBeUndefined()
  expect(unset(obj, key, 2)).toBe(2)

  // set
  expect(set(obj, key, 2)).toBe(2)
  expect(obj.a.b.wat.wat).toBe(2)
})

test('parent exists, but is not an object', () => {
  let obj = { a: { b: 1 } }
  let key = ['a', 'b', 'wat']

  // get
  expect(get(obj, key)).toBeUndefined()
  expect(get(obj, key, 2)).toBe(2)

  // unset
  expect(unset(obj, key)).toBeUndefined()
  expect(unset(obj, key, 2)).toBe(2)

  // set
  expect(() => set(obj, key, 2)).toThrowError(/^Expected "a.b"/)
})

test('last key does not exist', () => {
  let obj: any = { a: { b: {} } }
  let key = ['a', 'b', 'wat']

  // get
  expect(get(obj, key)).toBeUndefined()
  expect(get(obj, key, 2)).toBe(2)

  // unset
  expect(unset(obj, key)).toBeUndefined()
  expect(unset(obj, key, 2)).toBe(2)

  // set
  expect(set(obj, key, 2)).toBe(2)
  expect(obj.a.b.wat).toBe(2)
})
