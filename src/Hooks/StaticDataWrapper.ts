import {StaticData} from "../Classes/StaticData";
import {useEffect, useState} from "react";
import ErrorHandler from "../Classes/ErrorHandler";
import {TFTSetData} from "../Types/TFTSetData";
import StaticClient from "../api/StaticClient";

const setNumbers: string[] = ['TFTSet7', 'TFTSet7_2']
export type StaticDataWrapper = Record<string, StaticData>;

export function useStaticDataWrapper() {
    const [loaded, setLoaded] = useState<boolean | null>(false);
    const [tftSetData, setTFTSetData] = useState<StaticDataWrapper>({});
    useEffect(() => {
        if (!loaded) {
            loadAll()
                .then((TFTSets) => {
                    setTFTSetData(TFTSets)
                    setLoaded(true);
                })
                .catch((e) => {
                    setLoaded(null);
                    ErrorHandler.Catch(e)
                })
        }
    })
    return {tftSetData, loaded};
}

function loadAll(): Promise<Record<string, StaticData>> {
    const sets: StaticDataWrapper = {};
    return new Promise((resolve) => {
        Promise.all<TFTSetData>(queuePromises())
            .then((values) => {
                values.forEach(set => {
                    sets[set.id] = StaticData.Create(set);
                });
                resolve(sets);
            })
            .catch(ErrorHandler.Catch)
    })
}

function queuePromises(): Promise<TFTSetData>[] {
    let promises: Promise<TFTSetData>[] = [];
    setNumbers.forEach(id => {
        promises.push(
            new Promise<TFTSetData>((resolve) => {
                let set: TFTSetData = {id: '', traits: [], items: [], champions: []};
                set.id = id;
                StaticClient.GetTraits(id)
                    .then((traits) => {
                        set.traits = traits;
                        return StaticClient.GetChampions(id)
                    })
                    .then((champions) => {
                        set.champions = champions;
                        return StaticClient.GetItems(id)
                    })
                    .then((items) => {
                        set.items = items;
                        resolve(set);
                    })
                    .catch(ErrorHandler.Catch)
            })
        )
    })
    return promises;
}
