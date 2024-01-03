import { api } from "./api.ts";

export const figurePosApi = api.injectEndpoints({
    endpoints: builder => ({
        getFigurePos: builder.query({
            query: () => `/figurePos`,
        }),
        sendFigurePos: builder.mutation({
            query: (pos) => ({
                body: pos,
                url: "/figurePos",
                method: "POST",
            })
        })
    })
})

export const { useGetFigurePosQuery, useSendFigurePosMutation } = figurePosApi;