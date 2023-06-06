import { createContext } from "react";
import { ThemeProvider } from "./themeProviders";
import { UsuarioProvider } from "./usuarioProviders";
import { ChoicesProvider } from "./choicesProviders";


export const IndexContext = createContext({});

export const IndexProvider = ({ children }) => {
    return (
        <IndexContext.Provider value={{}}>
            <ThemeProvider>
                <UsuarioProvider>
                    <ChoicesProvider>
                        {children}
                    </ChoicesProvider>
                </UsuarioProvider>
            </ThemeProvider>
        </IndexContext.Provider>
    );
};