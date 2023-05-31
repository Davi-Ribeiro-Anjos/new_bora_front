import { createContext, useEffect, useState } from "react";

import { api } from "../services/api";

export const ChoicesContext = createContext({});

export const ChoicesProvider = ({ children }) => {
    const [status, setStatus] = useState([])
    const [categorias, setCategorias] = useState([])
    const [departamentos, setDepartamentos] = useState([])
    const [formasPgt, setFormasPgt] = useState([])
    const [filiais, setFiliais] = useState([])
    const [choicesFiliais, setChoicesFiliais] = useState([])

    useEffect(() => {
        getChoices()
        selectFilial()
    }, []);

    const getChoices = async () => {
        await api.get('solicitacoes-compras/choices/').then((response) => {
            let choices = response.data

            setStatus(choices[0].status.map(item => ({ label: item[0], value: item[0] })))
            setCategorias(choices[1].categorias.map(item => ({ label: item[0], value: item[0] })))
            setDepartamentos(choices[2].departamentos.map(item => ({ label: item[0], value: item[0] })))
            setFormasPgt(choices[3].formas_pgt.map(item => ({ label: item[0], value: item[0] })))
        }).catch((error) => console.log(error))
    }

    const selectFilial = async () => {
        await api.get('filiais/').then((response) => {
            let res = response.data

            setFiliais(res.map((item) => ({
                label: item.sigla,
                value: item.id
            })))

            setChoicesFiliais(res.map((item) => ({
                label: item.sigla,
                value: item.sigla
            })))
        })
    }

    return (
        <ChoicesContext.Provider value={{ status, categorias, departamentos, formasPgt, filiais, choicesFiliais }}>
            {children}
        </ChoicesContext.Provider>
    );
};