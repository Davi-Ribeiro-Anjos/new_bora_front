import { createContext, useEffect, useState } from "react";

import { api } from "../services/api";

export const UsuarioContext = createContext({});

export const UsuarioProvider = ({ children }) => {
    const [usuarios, setUsuarios] = useState([])
    const [choiceUser, setChoiceUser] = useState([])
    const [auth, setAuth] = useState(true)

    useEffect(() => {
        getUsuarios()
    }, []);

    const getUsuarios = async () => {
        await api.get('usuarios/').then((response) => {
            let res = response.data

            setUsuarios(res)

            setChoiceUser(res.map((item) => ({
                label: item.username,
                value: item.username
            })))
        }).catch((error) => console.log(error))
    }

    return (
        <UsuarioContext.Provider value={{ usuarios, choiceUser, auth, setAuth }}>
            {children}
        </UsuarioContext.Provider>
    );
};