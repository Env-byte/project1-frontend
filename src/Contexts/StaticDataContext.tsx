import React, {useContext} from "react";
import Loading from "../Components/Loading";
import {StaticDataWrapper, useStaticDataWrapper} from "../Hooks/StaticDataWrapper";

const StaticDataContext = React.createContext<StaticDataWrapper>({});

interface StaticDataProviderProps {
    children: JSX.Element
}

export const StaticDataProvider = (props: StaticDataProviderProps) => {
    const {TFTSetData, loaded} = useStaticDataWrapper()

    if (!TFTSetData) {
        return <p>Error Loading Page</p>
    }

    if (!loaded) {
        return <Loading size={'4x'} screen={true}/>
    }

    return <StaticDataContext.Provider value={TFTSetData}>
        {props.children}
    </StaticDataContext.Provider>
}

export const useStaticData = () => {
    const StaticData = useContext(StaticDataContext)
    return {StaticData}
}
