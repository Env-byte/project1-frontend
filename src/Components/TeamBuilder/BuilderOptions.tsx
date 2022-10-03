import OptionsBar from "../OptionsBar";
import {TeamSave, TeamSaveOptions} from "../../Hooks/TeamBuilder";
import {Button, Form, Modal} from "react-bootstrap";
import {findIconDefinition, IconDefinition, library} from "@fortawesome/fontawesome-svg-core";
import {faCog} from "@fortawesome/free-solid-svg-icons/faCog";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import TeamPublicBadge from "../Teams/TeamPublicBadge";

interface BuilderOptionsProps {
    saveDispatch: TeamSave
    saveOptionsDispatch: TeamSaveOptions
    guuid: string | null
    canSave: boolean
    name: string
    isPublic: boolean
}

library.add(faCog)
const cogIconDefinition: IconDefinition = findIconDefinition({prefix: 'fas', iconName: 'cog'})
const BuilderOptions = (props: BuilderOptionsProps) => {
    const [modal, setModal] = useState(false);
    const [formName, setFormName] = useState('');
    const [formIsPublic, setFormIsPublic] = useState(false);
    let navigate = useNavigate();
    useEffect(() => {
        setFormName(props.name)
    }, [props.name])
    useEffect(() => {
        setFormIsPublic(props.isPublic)
    }, [props.isPublic])
    const saveHandle = () => {
        if (props.name === '') {
            setModal(true);
            return;
        }
        props.saveDispatch();
    }
    const closeModal = (save: boolean) => {
        setModal(false);
        if (save) {

            if (props.guuid === null) {
                props.saveDispatch((guuid: string) => {
                    //redirect to page using url param
                    navigate("/teams/builder/" + encodeURIComponent(guuid), {replace: true});
                }, formName, formIsPublic)
            } else {
                console.log('here')
                props.saveOptionsDispatch(formName, formIsPublic);
            }
        } else {
            setFormName(props.name)
            setFormIsPublic(props.isPublic)
        }
    }
    const hideRow = (props.guuid === null ? {'display': 'none'} : {})
    return <>
        <div style={hideRow} className="row mb-2">
            <div className="col-6">
                <h4>{formName === '' ? 'TFT Team Builder' : 'Editing \'' + props.name + '\''} <TeamPublicBadge
                    isPublic={props.isPublic}/>
                </h4>
            </div>
            <div className="col-6 text-end">
                <Button onClick={() => {
                    setModal(true)
                }} variant="primary"><FontAwesomeIcon size="lg" icon={cogIconDefinition}/> Settings</Button>
            </div>
        </div>
        <Modal
            show={modal}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={() => {
                closeModal(false)
            }}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Team Settings
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="forTeamName">
                        <Form.Label>Team Name</Form.Label>
                        <Form.Control value={formName} onChange={(event) => {
                            setFormName(event.target.value);
                        }} type="text" placeholder="Enter a name"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formIsPublic">
                        <Form.Check checked={formIsPublic} onChange={(event) => {
                            setFormIsPublic(event.target.checked);
                        }} type="checkbox" label="Public Team"/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => {
                    closeModal(false)
                }}>
                    Close
                </Button>
                <Button variant="success" onClick={() => {
                    closeModal(true)
                }}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
        <OptionsBar onSave={saveHandle} showSave={props.canSave} saveText={props.guuid === null ? 'Create' : undefined}/>
    </>
}
export default BuilderOptions;