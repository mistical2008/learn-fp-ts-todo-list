/*
* NOTE: to be deprecated
*/
import axios, { AxiosResponse, AxiosError } from 'axios'

async function getAxiosError<E extends Error>(error: E) {
    if (axios.isAxiosError(error)) {
        await handleAxiosError(error)
    }
    await handleUnexpectedError(error)
}

function handleAxiosError<E extends AxiosError>(error: E) {
    const serverError = error
    console.error(serverError.config)

    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (serverError.response) {
        return Promise.reject(serverError.response)

        // The request was made but no response was received
    } else if (serverError.request) {
        return Promise.reject(serverError.request)

        // Something happened in setting up the request that triggered an Error
    } else {
        return Promise.reject(serverError.message)
    }
}

function handleUnexpectedError(error: unknown) {
    return Promise.reject({ error })
}

function selectAxiosResponse(
    response: AxiosResponse<Record<string, unknown>>
): AxiosResponse['data'] {
    return response.data
}

export { getAxiosError, selectAxiosResponse }
