import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useState } from "react"

export const GlobalContext = createContext({} as any);

export function GlobalContextProvider(props: any) {
    const [loader, setLoader] = useState<boolean>(false);
    return (
        <GlobalContext.Provider value={{
            loader,
            setLoader
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}