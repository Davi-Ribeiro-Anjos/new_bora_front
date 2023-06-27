import { createContext, useContext, useEffect, useState } from "react";

import { ApiContext } from './apiProviders';

export const ChoicesFuncionariosContext = createContext({});

export const ChoicesFuncionariosProvider = ({ children }) => {
    const { api } = useContext(ApiContext)

    const [choicesFuncionarios, setChoicesFuncionarios] = useState([])
    const [updateFuncionarios, setUpdateFuncionarios] = useState([])

    const inverteUpdateFuncionarios = () => {
        setUpdateFuncionarios(!updateFuncionarios)
    }

    useEffect(() => {
        getChoicesFuncionarios()
        // eslint-disable-next-line
    }, [updateFuncionarios]);

    const getChoicesFuncionarios = async () => {
        await api.get('funcionarios/choices/').then((response) => {
            let choices = response.data

            setChoicesFuncionarios(choices[0].funcionarios.map(item => ({ label: item.nome, value: item.id })))

        }).catch((error) => console.log(error))
    }

    return (
        <ChoicesFuncionariosContext.Provider value={{ choicesFuncionarios, inverteUpdateFuncionarios }}>
            {children}
        </ChoicesFuncionariosContext.Provider>
    );
};