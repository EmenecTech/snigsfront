import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button, Card, Modal, FormGroup } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import http from '../../../../http';
import AuthUser from '../../../../components/AuthUser';



const ParentsListNotesEval = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({}); 

    const {evaluation} = useParams();

    const { user, http } = AuthUser();
    const etab = user.etablissement;
    const userid = user.second_id;
    const classe = user.other_in_user;
    const niveau = user.fonction_in_user;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [eleves_classe, seteleves_classe] = useState([]);
    useEffect(() => {
        fetchAlleleves_classe();
    }, []);

    const fetchAlleleves_classe = () => {
        http.get('/fetch_eleves_in_classe/' + etab + '/' + classe).then(res => {
            seteleves_classe(res.data);
        })
    }
       const [classes, setclasses] = useState([]);
    useEffect(() => {
        fetchAllclasses();
    }, []);

    const fetchAllclasses = () => {
        http.get('/classe_bull/' + classe + '/' + etab).then(res => {
            setclasses(res.data);
        })
    }

   

    // useEffect(()=>{
    //     fetchAllClasses();
    // },[]);

    // const fetchAllClasses = () => {
    //     http.get('/classe').then(res=>{
    //         setClasses(res.data);
    //     })
    // }

    const [notes, setNotes] = useState([]);
    useEffect(() => {
        fetchAllNotes();
    }, []);

    const fetchAllNotes = () => {
        http.get('/notes_eleve/' + etab + '/' + classe + "/" + evaluation + '/' + userid).then(res => {
            setNotes(res.data);

        })

    }
   const [noteseleves, setnoteseleves] = useState([]);
    useEffect(() => {
        fetchAllNoteseleves();
    }, []);

    const fetchAllNoteseleves = () => {
        http.get("/get_notes_elevesprim/" + etab + '/' + classe + '/' + evaluation + '/' + userid).then((res) => {
            setnoteseleves(res.data);
        });
    };

       const getEmojiForNote = (note) => {
        if (note == 10) {
            return '☹️';
        } else if (note == 15) {
            return '😐';
        } else if (note == 20) {
            return '😃';
        }
        return '';
    };


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value, etab, classe, evaluation}))

    }

    const submitForm = () => {
        http.post('/notes', inputs).then((res) => { })

        window.location.reload(false);
        console.log(inputs)
    }



    return (

        <div>
            <Row>
                <Col sm="12" lg="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                            <h4 className="card-title">Notess</h4>

    {/* <div>
                                <Button className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3" onClick={handleShow}>
                                    <i className="btn-inner">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </i>

                                    <span>Ajouter la Note</span>
                                </Button>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>{matiere}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="exampleFormControlSelect1">Selectionner l'élève</Form.Label>
                                                <select className="form-select" id="id_user" name="id_user" onChange={handleChange}>
                                                    <option> </option>
                                                    {eleves_classe.map((user) => (

                                                        <option
                                                            value={user.id}
                                                        >{user.nom} {user.prenom}</option>

                                                    ))}

                                                </select>

                                            </Form.Group>
                                            <Form.Group className='form-group'>
                                                <Form.Label>Note /20</Form.Label>
                                                <Form.Control type="number" id="valeur_note" name="valeur_note"
                                                    value={inputs.valeur_note || ''}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>

                                            <Form.Group className='form-group'>
                                                <Form.Label>coefficient</Form.Label>
                                                <Form.Control type="number" id="coef" name="coef"
                                                    value={matiere_classe_info.coefficient_cm}
                                                    onChange={handleChange}
                                                    disabled
                                                />
                                            </Form.Group>
                                            <Form.Group className='form-group'>
                                                <Form.Label>Appréciation</Form.Label>
                                                <select className="form-select mb-3 shadow-none" name="appreciation" onChange={handleChange}>
                                                    <option> </option>
                                                    <option value="Non acquis">Non acquis</option>
                                                    <option value="En cours d'acquisition">En cours d'acquisition</option>
                                                    <option value="Acquis">Acquis</option>
                                                </select>
                                            </Form.Group>
                                            <Form.Group className='form-group'>
                                                <Form.Label>Compétence visée</Form.Label>
                                                <Form.Control type="text" id="competence_visee" name="competence_visee"
                                                    value={inputs.competence_visee || ''}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>

                                        </Form>

                                        <Button variant="primary" onClick={submitForm}>
                                            Ajouter
                                        </Button>
                                    </Modal.Body>
                                </Modal>

                            </div> */}
                        </Card.Header>

                        <Card.Body>

    {classes.cycle_niveau === "Secondaire" || classes.cycle_niveau === "Secondary" ? <div>
                         <table className="table">
                                <thead>
                                    <tr>
                                        
                                        <th>Nom</th>
                                        <th>Prénom</th>
                                        <th>Matiere</th>
                                        <th>Note</th>
                                        <th>NxC</th>
                                       
                                        <th>Appreciation</th>
                                        <th>Compétence visée</th>
                                        <th> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {notes.map((item, index) => (
                                        <tr key={item.id}>
                                           
                                            <td>
                                                {item.nom}
                                            </td>
                                            <td>
                                                {item.prenom}
                                            </td>
                                            <td>
                                                {item.matiere_note}
                                            </td>
                                            <td>
                                                {item.valeur_note}
                                            </td>
                                            <td>
                                                {item.note_finale}
                                            </td>
                                           
                                            <td>
                                                {item.appreciation_note}
                                            </td>
                                            <td>{item.competence_visee_note} </td>
                                            <td>


                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div> : <div></div>}

                     {classes.cycle_niveau === "Primaire" || classes.cycle_niveau === "Primary" ? <div>
                         <table className="table">
                                <thead>
                                    <tr>
                                        
                                        <th>Nom</th>
                                        <th>Prénom</th>
                                        <th>Groupe</th>
                                        <th>Note</th>
                                        <th>Indices d'evaluation</th>
                                        <th>Appreciation</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {noteseleves.map((item, index) => (
                                        <tr key={item.id}>
                                          
                                           <td>{item.nom}</td>
                                                <td>{item.prenom}</td>
                                                <td>{item.matiere_note}</td>
                                                <td>{item.valeur_note}</td>
                                                <td>{item.competence_visee_note}</td>
                                                <td>{item.appreciation_note}</td>
                                           
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div> : <div></div>}

                 {classes.cycle_niveau === "Maternelle" || classes.cycle_niveau === "Nursery" ? <div>
                         <table className="table">
                                <thead>
                                    <tr>
                                        
                                                <th>Nom(s)</th>
                                                <th>Prénom(s)</th>
                                                <th>Groupes</th>
                                                <th>Note</th>
                                                <th>Emoji</th>
                                                <th>Indices</th>
                                                <th>Appreciation</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {noteseleves.map((item, index) => (
                                        <tr key={item.id}>
                                          
                                             
                                                    <td>{item.nom}</td>
                                                    <td>{item.prenom}</td>
                                                    <td>{item.matiere_note}</td>
                                                    <td>{item.valeur_note}</td>
                                                    <td>{getEmojiForNote(item.emoji)}</td>
                                                    <td>{item.competence_visee_note}</td>
                                                    <td>{item.appreciation_note}</td>
                                           
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div> : <div></div>}

                     {classes.cycle_niveau === "Licence" ? <div>
                         <table className="table">
                                <thead>
                                    <tr>
                                        
                                            <th>Sno.</th>
                                            <th>Nom(s)</th>
                                            <th>Prénom(s)</th>
                                            <th>Matière</th>
                                           
                                    
                                            <th>CC</th>
                                            <th>SN</th>
                                            <th>Note finale</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {notes.map((item, index) => (
                                        <tr key={item.id}>
                                          
                                             
                                             <td>{++index}</td>
                                            <td>{item.nom}</td>
                                            <td>{item.prenom} </td>
                                            <td>{item.matiere_note} </td>
                                          
                                            <td>{item.note_cc}</td>
                                            <td>{item.note_sn}</td>
                                            <td>{item.note_finale}</td>
                                           
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div> : <div></div>}
                            
                        </Card.Body>
                    </Card>
                </Col>
            </Row>


        </div>
    )

}

export default ParentsListNotesEval
