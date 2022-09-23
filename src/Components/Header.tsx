import {Link, useNavigate} from "react-router-dom";
import React, {useRef} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    IconDefinition,
    findIconDefinition,
} from '@fortawesome/fontawesome-svg-core'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {Container, Nav, Navbar} from "react-bootstrap";
import {TFTSets, useTFTSet} from "../Contexts/TFTSetContext";
import Auth from "./User/Auth";
import {ToastError} from "../Classes/SwalMixin";
import {useRegion} from "../Hooks/Region";

library.add(faSearch)

const searchIconDefinition: IconDefinition = findIconDefinition({prefix: 'fas', iconName: 'search'})

const Header = () => {
    let navigate = useNavigate();
    const {setTFTSet} = useTFTSet();
    const {region, setRegion} = useRegion();

    const searchSummoner = useRef<HTMLFormElement>(null)

    const handleSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const form = searchSummoner.current
        if (null !== form) {
            const name = form['summonerName'].value.trim();
            if (name === '') {
                ToastError.fire('Invalid Name')
                return;
            }
            navigate("/summoner/" + region + "/" + encodeURIComponent(name));
        }
    }

    const handleSetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.stopPropagation();
        event.preventDefault();
        const val = event.currentTarget.value
        const set = TFTSets.find(item => item.id === val);
        if (set) {
            setTFTSet(set)
        } else {
            throw new Error('set: ' + val + ' not found')
        }
    };

    const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.stopPropagation();
        event.preventDefault();
        const val = event.currentTarget.value
        setRegion(val)
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container fluid={true}>
                <Navbar.Brand>
                    <Link style={{color: "white", textDecoration: "none"}} to='/'>
                        Project 1
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Item>
                            <Link className="nav-link active" to='/'>Home</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link className="nav-link active" to='/champions'>Champions</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link className="nav-link active" to='/teams'>Team Builder</Link>
                        </Nav.Item>

                    </Nav>
                    <Nav className="m-auto">
                        <select onChange={handleSetChange} className="form-control">
                            {TFTSets.map((set => {
                                return <option key={set.id} value={set.id}>{set.name}</option>
                            }))}
                        </select>
                    </Nav>
                    <Nav className="m-auto">
                        <form ref={searchSummoner} className="d-flex" style={{margin: "auto", marginTop: "5px"}}>
                            <div className="input-group">
                                <select onChange={handleRegionChange} value={region} name="region"
                                        className="form-control" id="regionSelect">
                                    <option value="EUW1">EUW1</option>
                                    <option value="NA1">NA1</option>
                                    <option value="EUN1">EUN1</option>
                                </select>
                                <input style={{flex: 4}} className="form-control"
                                       type="search"
                                       name={'summonerName'}
                                       placeholder="Search Player Name"
                                       aria-label="Search"/>
                                <button className="btn btn-outline-success"
                                        onClick={handleSearch}
                                        type="submit">
                                    <FontAwesomeIcon icon={searchIconDefinition}/> Search
                                </button>
                            </div>
                        </form>
                    </Nav>
                    <Nav className="ms-auto">
                        <Navbar.Text>
                            <Auth/>
                        </Navbar.Text>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;