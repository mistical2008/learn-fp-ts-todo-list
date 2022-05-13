import { faker } from '@faker-js/faker'
import { nanoid } from 'nanoid'
import type { NanoId } from 'shared/api/types'

faker.locale = 'en'
const phoneFormat = '+7 (###) ###-##-##'

type Student = {
    id: NanoId
    name: {
        first: string
        last: string
        middle: string
    }
    email: string
    phone: string
}

/**
 * @param length - number of elements to generate
 * @param generator - function to generate element
 * @returns array of generated unique elements
 */
function generateUniqueArraValues(
    length: number,
    generator?: () => any
): any[] {
    return [
        // Strip from dubplicates
        ...new Set(
            Array.from({ length: length }, () =>
                // if generator is not provided, return undefined as array element
                generator ? generator() : undefined
            )
        ),
    ]
}

function generateStudent(id: NanoId): Student {
    return {
        id,
        name: {
            first: faker.name.firstName(),
            last: faker.name.lastName(),
            middle: faker.name.firstName(),
        },
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(phoneFormat),
    }
}

function generateStudentsList(length: number): Student[] {
    return Array.from({ length: length }, () => generateStudent(nanoid()))
}

const me = generateStudent(nanoid())

const students = generateStudentsList(10)

export default { me, students }
