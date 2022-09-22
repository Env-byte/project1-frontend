import {ChampionFilter, FilterDispatches} from "../../Hooks/ChampionFilter";
import {Collapse} from "react-bootstrap";
import {ChangeEvent, useEffect, useMemo, useState} from "react";
import {useStaticDataSet} from "../../Contexts/StaticDataContext";
import {Trait} from "../../Types/Api/Trait";
import FilterCheckbox from "./FilterCheckbox";

interface ChampionFiltersProps {
    filter: ChampionFilter;
    dispatches: FilterDispatches;
    tftSet: string
}

const ChampionFilters = (props: ChampionFiltersProps) => {
    const setData = useStaticDataSet(props.tftSet)

    const origins: Trait[] = useMemo<Trait[]>(() => setData.getTraits().filter((item => item.type === 'origin')), [setData]);
    const classes = useMemo<Trait[]>(() => setData.getTraits().filter((item => item.type === 'class')), [setData]);

    const [collapseClass, setCollapseClass] = useState<boolean>(false);
    const [collapseOrigin, setCollapseOrigin] = useState<boolean>(false);
    const [collapseCost, setCollapseCost] = useState<boolean>(true);

    const [originCheckbox, setOriginCheckbox] = useState<JSX.Element[]>([]);
    const [classCheckbox, setClassCheckbox] = useState<JSX.Element[]>([]);
    const [costCheckbox, setCostCheckbox] = useState<JSX.Element[]>([]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>, type: string, val: number | string) => {
        if (event.currentTarget.checked) {
            props.dispatches.add(type, val);
        } else {
            props.dispatches.remove(type, val);
        }
    }

    useEffect(() => {
        setOriginCheckbox(origins.map(item => {
            const found = props.filter.origin.includes(item.name);
            return <FilterCheckbox key={item.name}
                                   found={found}
                                   onChange={(event) => {
                                       handleChange(event, item.type, item.name)
                                   }}
                                   value={item.key}
                                   name={item.name}
            />
        }))
        setClassCheckbox(classes.map(item => {
            const found = props.filter.class.includes(item.name);
            return <FilterCheckbox key={item.name}
                                   found={found}
                                   onChange={(event) => {
                                       handleChange(event, item.type, item.name)
                                   }}
                                   value={item.key}
                                   name={item.name}
            />
        }))
        setCostCheckbox([1, 2, 3, 4, 5].map((i) => {
            const found = props.filter.cost.includes(i);
            return <FilterCheckbox key={i + 'Cost'}
                                   found={found}
                                   onChange={(event) => {
                                       handleChange(event, 'cost', i)
                                   }}
                                   value={i + 'Cost'}
                                   name={i}
            />
        }))
    }, [classes, origins, props])

    return <>
        <h4 onClick={() => {
            setCollapseCost(!collapseCost)
        }}>
            Cost
        </h4>
        <Collapse in={collapseCost}>
            <div>{costCheckbox}</div>
        </Collapse>

        <h4 onClick={() => {
            setCollapseClass(!collapseClass)
        }}>
            Classes
        </h4>
        <Collapse in={collapseClass}>
            <div>{classCheckbox}</div>
        </Collapse>

        <h4 onClick={() => {
            setCollapseOrigin(!collapseOrigin)
        }}>
            Origins
        </h4>
        <Collapse in={collapseOrigin}>
            <div>{originCheckbox}</div>
        </Collapse>
    </>;
}
export default ChampionFilters;
