import * as fs from 'fs'
import * as path from 'path'

import data from './data'

const mockDb = {
    ...data,
}

function writeToFile(fileName: string, data: string) {
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            console.log(err)
        }
    })
}

function stringifyObject<T extends object>(obj: T) {
    return JSON.stringify(obj, null, 2)
}

function printArray(items: any[]) {
    items.forEach((obj: object) => {
        console.log(stringifyObject(obj))
    })
}

function main() {
    const filePath = path.resolve(process.cwd(), 'src', 'mocks', 'db.json')
    const data = stringifyObject(mockDb)
    writeToFile(filePath, data)
    printArray(Object.values(mockDb))
}

main()
