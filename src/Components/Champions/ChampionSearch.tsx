import React, {useEffect, useState} from "react";
import {findIconDefinition, IconDefinition, library} from "@fortawesome/fontawesome-svg-core";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ChampionFilter, FilterDispatches} from "../../Hooks/ChampionFilter";
import {Simulate} from "react-dom/test-utils";
import keyUp = Simulate.keyUp;

library.add(faSearch)

interface ChampionSearchProps {
    filter: ChampionFilter;
    onSearch: (search: string) => void;
    tftSet: string
}

const searchIconDefinition: IconDefinition = findIconDefinition({prefix: 'fas', iconName: 'search'})

const ChampionSearch = (props: ChampionSearchProps) => {
    const [search, setSearch] = useState('')

    useEffect(() => {
        console.log('set change', props.tftSet)
        setSearch('')
    }, [props.tftSet])

    const handleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        event.stopPropagation();
        const val = event.currentTarget.value;
        props.onSearch(val.trim());
    };
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }
    return <>
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
                <FontAwesomeIcon icon={searchIconDefinition}/>
            </span>
            <input onKeyUp={handleOnKeyUp}
                   type="text"
                   className="form-control"
                   placeholder="Search Champion name, Origin, Class, Cost"
                   aria-label="Username"
                   value={search}
                   onChange={handleOnChange}
                   aria-describedby="basic-addon1"/>
        </div>
    </>
}
export default ChampionSearch;