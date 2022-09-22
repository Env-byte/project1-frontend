import React, {useContext, useMemo} from "react";
import Loading from "../Components/Loading";
import {StaticDataWrapper, useStaticDataWrapper} from "../Hooks/StaticDataWrapper";
import {StaticData} from "../Classes/StaticData";

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
    const staticData = useContext(StaticDataContext)
    return {staticData}
}
export const useStaticDataSet = (tftSet:string) =>{
    const {staticData} = useStaticData();
    return useMemo<StaticData>(() => {
        return staticData[tftSet];
    }, [staticData, tftSet]);
}
