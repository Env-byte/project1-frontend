import React, {useContext, useMemo} from "react";
import Loading from "../Components/Loading";
import {StaticDataWrapper, useStaticDataWrapper} from "../Hooks/StaticDataWrapper";
import {StaticData} from "../Classes/StaticData";
import ContentServer from "../Components/ErrorStates/ContentServer";

const StaticDataContext = React.createContext<StaticDataWrapper>({});

interface StaticDataProviderProps {
    children: JSX.Element
}

export const StaticDataProvider = (props: StaticDataProviderProps) => {
    const {tftSetData, loaded} = useStaticDataWrapper()

    if (loaded === false) {
        return <Loading size={'4x'} screen={true}/>
    }

    if (loaded === null) {
        return <ContentServer/>
    }

    return <StaticDataContext.Provider value={tftSetData}>
        {props.children}
    </StaticDataContext.Provider>
}

export const useStaticData = () => {
    const staticData = useContext(StaticDataContext)
    return {staticData}
}
export const useStaticDataSet = (tftSet: string) => {
    const {staticData} = useStaticData();
    return useMemo<StaticData>(() => {
        return staticData[tftSet];
    }, [staticData, tftSet]);
}

export const useStaticDataSets = () => {
    const {staticData} = useStaticData();
    return staticData;
}