import { createContext } from "react";

import axios from "axios";


export const ApiContext = createContext({});

export const ApiProvider = ({ children }) => {
    const urlBase = 'http://127.0.0.1:8000/'

    const api = axios.create({
        baseURL: `${urlBase}api/`,
        timeout: 8000,
        headers: { 'Content-Type': 'multipart/form-data' }
    })

    const apiMedia = axios.create({
        baseURL: urlBase,
        timeout: 8000,
        headers: { 'Content-Type': 'multipart/form-data' }
    })


    return (
        <ApiContext.Provider value={{ urlBase, api, apiMedia }}>
            {children}
        </ApiContext.Provider>
    );
};