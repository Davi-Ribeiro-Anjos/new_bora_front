import { createContext, useEffect, useState } from "react";

import { api } from "../services/api";

export const UsuarioContext = createContext({});

export const UsuarioProvider = ({ children }) => {
    const [usuarios, setUsuarios] = useState([])
    const [choiceUser, setChoiceUser] = useState([])
    const [auth, setAuth] = useState(false)

    useEffect(() => {
        getUsuarios()
        getChoiceUser()
    }, []);

    const getUsuarios = async () => {
        await api.get('usuarios/').then((response) => {
            let usuarios = response.data

            setUsuarios(usuarios)
        }).catch((error) => console.log(error))
    }

    const getChoiceUser = async () => {
        await api.get('usuarios/').then((response) => {
            let res = response.data

            setChoiceUser(res.map((item) => ({
                label: item.username,
                value: item.username
            })))
        }).catch((error) => console.log(error))
    }

    return (
        <UsuarioContext.Provider value={{ usuarios, choiceUser, auth }}>
            {children}
        </UsuarioContext.Provider>
    );
};