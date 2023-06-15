import { createContext } from "react";
import { ThemeProvider } from "./themeProviders";
import { UsuarioProvider } from "./usuarioProviders";
import { ChoicesProvider } from "./choicesProviders";
import { ApiProvider } from "./apiProviders";


export const IndexContext = createContext({});

export const IndexProvider = ({ children }) => {
    return (
        <IndexContext.Provider value={{}}>
            <ThemeProvider>
                <ApiProvider>
                    <UsuarioProvider>
                        <ChoicesProvider>
                            {children}
                        </ChoicesProvider>
                    </UsuarioProvider>
                </ApiProvider>
            </ThemeProvider>
        </IndexContext.Provider>
    );
};