import axios, { Axios, AxiosError, AxiosResponse } from 'axios'
import { pipe } from 'fp-ts/function'
import { QueryFunction, QueryKey, useQuery, UseQueryOptions } from 'react-query'

import { getAxiosError, selectAxiosResponse } from 'shared/lib'

const api: Axios = axios.create({
    baseURL: '/',
})

// Хук useQuery из react-query с дефолтными опциями и модификацией ответа
const useCustomQuery = <
    T extends AxiosResponse<Record<string, unknown>>,
    E extends AxiosError<unknown, unknown>,
    S extends AxiosResponse['data']
>(
    keys: QueryKey[],
    queryFn: QueryFunction<T, QueryKey>,
    options?: UseQueryOptions<T, E, S>
) =>
    useQuery<T, E, S>(keys, queryFn, {
        // filter axios response to only contain data
        select: selectAxiosResponse,
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error) => {
            pipe(getAxiosError(error), console.error)
        },
        ...options,
    })

export { api, useCustomQuery as useQuery }
