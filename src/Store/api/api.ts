import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL: string = "http://localhost:4200";

export const api = createApi({
    reducerPath: "api",
    tagTypes: ["figurePos"],
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
    }),
    endpoints: () => ({})
})

