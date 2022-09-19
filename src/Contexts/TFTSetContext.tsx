import React, {Dispatch, useContext, useState} from 'react'

interface TFTSetObj {
    name: string
    id: string
}

interface TftSetContextObj {
    tftSet: TFTSetObj
    setTFTSet: Dispatch<TFTSetObj>
}

interface TFTSetProviderProps {
    children: JSX.Element[]
}

export const TFTSets: TFTSetObj[] = [{"name": 'TFT Set 7', 'id': 'TFTSet7'}, {"name": "TFT Set 7.5", "id": 'TFTSet7_2'}]
const TFTSetContext = React.createContext<TftSetContextObj>({} as TftSetContextObj);
export const TFTSetProvider = (props: TFTSetProviderProps) => {
    const [tftSet, setTFTSet] = useState<TFTSetObj>(TFTSets[0])
    return <TFTSetContext.Provider value={{tftSet, setTFTSet}}>
        {props.children}
    </TFTSetContext.Provider>
}
export const useTFTSet = () => {
    const {tftSet, setTFTSet} = useContext(TFTSetContext)
    return {tftSet, setTFTSet}
}