declare interface ObjectConstructor {
  assign(...objects: any[]): any
}

interface Array<T> {
  clear(): T[]
  unique(): T[]
  find(predicate: (element: T) => boolean): T
  contains(object: T): boolean
  remove(object: T): T[]
  removeAll(objects: T[]): T[]
  checkSizeAndType(size: number, type: string): boolean
  addAtIndex(element: T, index: number): T[]
  findIndexByProperty(propertyName: string, value: any, nonStrict?: boolean): number
  findByProperty(propertyName: string, value: any): T | undefined
  removeByProperty(propertyName: string, value: any, nonStrict?: boolean): T[]
}

if (!Array.prototype.find) {
  Array.prototype.find = function <T>(predicate: any) {
    if (this == null) {
      throw new TypeError("Array.prototype.find called on null or undefined")
    }
    if (typeof predicate !== "function") {
      throw new TypeError("predicate must be a function")
    }
    const list = Object(this)
    const length = list.length
    const thisArg = arguments[1]
    for (let i = 0; i < length; i++) {
      if (predicate.call(thisArg, list[i], i, list)) {
        return list[i]
      }
    }
    return undefined
  }
}

Array.prototype.unique = function() {
  const a = this.concat()
  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) {
        a.splice(j--, 1)
      }
    }
  }
  return a
}

Array.prototype.clear = function <T>(): T[] {
  while (this.length > 0) {
    this.remove(this[0])
  }
  return this
}

Array.prototype.remove = function <T>(object: T): T[] {
  let currentIndex = this.indexOf(object)
  while (currentIndex !== -1) {
    this.splice(currentIndex, 1)
    currentIndex = this.indexOf(object)
  }
  return this
}

Array.prototype.removeAll = function <T>(objects: T[]): T[] {
  if (!objects && !Array.isArray(objects)) {
    console.error("objects is undefined or not an array")
    return this
  }
  objects.forEach((object: T) => {
    let currentIndex = this.indexOf(object)
    while (currentIndex !== -1) {
      this.splice(currentIndex, 1)
      currentIndex = this.indexOf(object)
    }
  })
  return this
}

Array.prototype.checkSizeAndType = function(size: number, type: string) {
  if (this == null) {
    return false
  }
  if (typeof type !== "string") {
    return false
  }
  type = type.toLowerCase()
  const list = Object(this)
  const length = list.length
  if (length !== size) {
    return false
  }
  for (let i = 0; i < length; i++) {
    if (typeof list[i] !== type || (type === "number" && isNaN(list[i]))) {
      return false
    }
  }
  return true
}

Array.prototype.contains = function <T>(object: T): boolean {
  return this.indexOf(object) !== -1
}

Array.prototype.addAtIndex = function <T>(element: T, index: number): T[] {
  this.splice(index, 0, element)
  return this
}

Array.prototype.findByProperty = function <T>(propertyName: string, value: any): T | undefined {
  for (const element of this) {
    if (element[propertyName] === value) {
      return element
    }
  }
  return
}

Array.prototype.findIndexByProperty = function <T>(propertyName: string, value: any, nonStrict?: boolean): number {
  if (nonStrict) {
    for (let i = 0; i < this.length; i += 1) {
      // tslint:disable-next-line:triple-equals
      if (this[i][propertyName] == value) {
        return i
      }
    }
  } else {
    for (let i = 0; i < this.length; i += 1) {
      if (this[i][propertyName] === value) {
        return i
      }
    }
  }
  return -1
}

Array.prototype.removeByProperty = function <T>(propertyName: string, value: any, nonStrict?: boolean): T[] {
  const index = this.findIndexByProperty(propertyName, value, nonStrict)
  if (index > -1) {
    this.splice(index, 1)
  }
  return this
}
