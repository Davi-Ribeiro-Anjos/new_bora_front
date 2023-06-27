import { createContext, useContext, useEffect, useState } from "react";

import { ApiContext } from './apiProviders';

export const ChoicesClientesContext = createContext({});

export const ChoicesClientesProvider = ({ children }) => {
    const { api } = useContext(ApiContext)

    const [choicesClientes, setChoicesClientes] = useState([])
    const [updateClientes, setUpdateClientes] = useState([])

    const inverteUpdateClientes = () => {
        setUpdateClientes(!updateClientes)
    }

    useEffect(() => {
        getChoicesClientes()
        // eslint-disable-next-line
    }, [updateClientes]);

    const getChoicesClientes = async () => {
        await api.get('clientes/choices/').then((response) => {
            let choices = response.data

            setChoicesClientes(choices[0].clientes.map(item => ({ label: item.razao_social_motorista, value: item.id })))

        }).catch((error) => console.log(error))
    }

    return (
        <ChoicesClientesContext.Provider value={{ choicesClientes, inverteUpdateClientes }}>
            {children}
        </ChoicesClientesContext.Provider>
    );
};