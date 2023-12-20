    import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button, Card, Modal, FormGroup } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import http from '../../../http';
import AuthUser from '../../../components/AuthUser';



const ProfesseurListGroupes = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const [notes, setNotes] = useState([]);
    const { niveau, classe, evaluation, userid } = useParams();

    const { user, http } = AuthUser();
    const etab = user.etablissement;
    const id_user = userid;
    const iduser = user.id;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const coefficient = 1;

    console.log(niveau);

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

     const getAppreciationForNote = (note) => {
        if (note > 0 && note < 10) {
            return 'Non acquis';
        } else if (note >= 11 && note < 14) {
            return "En cours d'acquisition";
        } else if (note >= 15 && note < 20) {
            return 'Acquis';
        }
        return '';
    };

    const [eleves_classe, seteleves_classe] = useState([]);
    useEffect(() => {
        fetchAlleleves_classe();
    }, []);

    const fetchAlleleves_classe = () => {
        http.get('/fetch_eleves_in_classe/' + etab + '/' + classe).then(res => {
            seteleves_classe(res.data);
        })
    }


    const [indices, setindices] = useState([]);
    useEffect(() => {
        fetchAllIndices();
    }, []);

    const fetchAllIndices = () => {
        http.get("/get_indices/" + etab).then((res) => {
            setindices(res.data);
        });
    };

    const [noteseleves, setnoteseleves] = useState([]);
    useEffect(() => {
        fetchAllNoteseleves();
    }, []);

    const fetchAllNoteseleves = () => {
        http.get("/get_notes_elevesprim/" + etab + '/' + classe + '/' + evaluation + '/' + userid).then((res) => {
            setnoteseleves(res.data);
        });
    };
    console.log(noteseleves);

    const [groupes, setgroupes] = useState([]);
    useEffect(() => {
        fetchAllGroupes();
    }, []);

    const fetchAllGroupes = () => {
        http.get("/get_groupes/" + etab).then((res) => {
            setgroupes(res.data);
        });
    };

    // useEffect(()=>{
    //     fetchAllClasses();
    // },[]);

    // const fetchAllClasses = () => {
    //     http.get('/classe').then(res=>{
    //         setClasses(res.data);
    //     })
    // }




    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value, etab, classe, evaluation, coefficient, id_user }))

    }

    const submitForm = () => {
        http.post('/notes', inputs).then((res) => {
            window.location.reload(false);
        })

        
    }


    const submitFormprim = () => {
        http.post('/add_notes', inputs).then((res) => {
            window.location.reload(false);
        })

        
    }

    const [matieres, setmatieres] = useState([]);
    useEffect(() => {
        fetchAllmatieres();
    }, []);

    const fetchAllmatieres = () => {
        http.get('/get_matieres_enseignant/' + etab + '/' + iduser).then(res => {
            setmatieres(res.data);
        })
    }

    const [groupesclasse, setgroupesclasse] = useState([]);
    useEffect(() => {
        fetchAllGroupesClasse();
    }, []);

    const fetchAllGroupesClasse = () => {
        http.get("/get_groupes_for_classe/" + etab + "/" + classe).then((res) => {
            setgroupesclasse(res.data);
        });

        console.log(groupesclasse.id);
    };





    return (

        <div>
            <Row>
                <Col sm="12" lg="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                            <h4 className="card-title">Notes</h4>

                            <div>
                                <Button className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3" onClick={handleShow}>
                                    <i className="btn-inner">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </i>

                                    <span>{user.langue === "en" ? (<div> Add note </div>):(<div>Ajouter la note</div>)}</span>
                                </Button>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Ajouter une note</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>

                                            {niveau == 'PRE NUSERY' || niveau == 'NUSERY ONE' || niveau == 'NUSERY TWO' || niveau == 'MATERNELLE' ? <div>

                                                {etab == 24 ? <div>
                                                    <Form.Group className="form-group">

                                                        <Form.Label htmlFor="exampleFormControlSelect1">{user.langue === "en" ? (<div> Select material </div>):(<div>Sélectionner la matière</div>)}</Form.Label>
                                                        <select className="form-select" id="matiere" name="matiere" onChange={handleChange}>
                                                            <option> </option>
                                                            {matieres.map((item) => (<option value={item.matiere_cp}>{item.matiere_cp}</option>))}
                                                        </select>
                                                    </Form.Group>
                                                    <Form.Group className='form-group'>
                                                        <Form.Label>Note</Form.Label>
                                                        <Form.Control type="number" id="valeur_note" name="valeur_note"
                                                            value={inputs.valeur_note || ''}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>


                                                    <Form.Group className='form-group'>
                                                        <Form.Label>Appreciation</Form.Label>

                                                        <select className="form-select mb-3 shadow-none" name="appreciation" onChange={handleChange}>
                                                            <option> </option>
                                                            <option value="Non acquis">{user.langue === "en" ? (<div> Not acquired </div>):(<div>Non acquis</div>)}</option>
                                                            <option value="En cours d'acquisition">{user.langue === "en" ? (<div> In progress </div>):(<div>En cours d'acquisition</div>)}</option>
                                                            <option value="Acquis">{user.langue === "en" ? (<div> Acquired </div>):(<div>Acquis</div>)}</option>
                                                            <option value="Expert">Expert</option>
                                                        </select>
                                                    </Form.Group>

                                                    <Form.Group className='form-group'>
                                                        <Form.Label>{user.langue === "en" ? (<div> Target skill </div>):(<div>Compétence visée</div>)}</Form.Label>
                                                        <Form.Control type="text" id="competence_visee" name="competence_visee"
                                                            value={inputs.competence_visee || ''}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>

                                                    <Button variant="primary" onClick={submitForm}>
                                                   {user.langue === "en" ? (<div> Add </div>):(<div>Ajouter</div>)}
                                                </Button>
        
                                                </div> : <div>

       
                                                    <Form.Group className='form-group'>
                                                        <Form.Label>Groupes</Form.Label>

                                                        <select className="form-select mb-3 shadow-none" name="matiere" onChange={handleChange}>
                                                            <option> </option>

                                                            {groupesclasse.map((item) => (
                                                                <option key={item.id} value={item.groupe_cg}>{item.groupe_cg}(/ {item.marks_cg})</option>
                                                            ))}
                                                        </select>
                                                    </Form.Group>
                                                                
                                                 
                                                                
                                                     <Form.Group className='form-group'>
                                                        <Form.Label>Note</Form.Label>
                                                        <Form.Control type="number" id="valeur_note" name="valeur_note"
                                                            value={inputs.valeur_note || ''}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>

                                                    <Form.Group className='form-group'>
                                                        <Form.Label>Emoji</Form.Label>
                                            
                                                        <select className="form-select mb-3 shadow-none" id="emoji" name="emoji" onChange={handleChange}>
                                                            <option> </option>
                                                            <option value="10">☹️</option>
                                                            <option value="15">😐</option>
                                                            <option value="20">😃</option>

                                                        </select>
                                                    </Form.Group>
                                                                
                                                    <Form.Group className='form-group'>
                                                        <Form.Label>coefficient</Form.Label>
                                                        <Form.Control type="number" id="coef" name="coef"
                                                            value={coefficient}

                                                            disabled
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className='form-group'>
                                                        <Form.Label>{user.langue === "en" ? (<div>Evaluation index</div>):(<div>Indice d'évaluation</div>)}</Form.Label>

                                                        <select className="form-select mb-3 shadow-none" name="competence_visee" onChange={handleChange}>
                                                            <option> </option>
                                                            <option value="Ecrit">{user.langue === "en" ? (<div> Written </div>):(<div>Ecrit</div>)}</option>
                                                            <option value="Oral">{user.langue === "en" ? (<div> Oral </div>):(<div>Oral</div>)}</option>
                                                            <option value="Pratique">{user.langue === "en" ? (<div>Practice</div>):(<div>Pratique</div>)}</option>
                                                            {indices.map((item) => (
                                                                <option key={item.id} value={item.intitule_indice}>{item.intitule_indice}</option>
                                                            ))}
                                                        </select>
                                                    </Form.Group>
                                                                
                                                    <Form.Group className='form-group'>
                                                        <Form.Label>Appreciation</Form.Label>

                                                        <select className="form-select mb-3 shadow-none" name="appreciation" placeholder="[0-10]-NA [11-14]-ECA [15-20]-A" onChange={handleChange}>
                                                            <option> </option>
                                                            <option value="Non acquis">Non acquis</option>
                                                            <option value="En cours d'acquisition">En cours d'acquisition</option>
                                                            <option value="Acquis">Acquis</option>
                                                           
                                                            <option value="Not Acquired">Not Acquired</option>
                                                            <option value="Currently Being Acquired">Currently Being Acquired</option>
                                                            <option value="Acquired">Acquired</option> 
                                                            <option value="Expert">Expert</option>
                                                        </select>
                                                    </Form.Group>

                                                 <Button variant="primary" onClick={submitFormprim}>
                                                    Ajouter
                                                </Button>
                                                </div>}

                                                

                                            </div> : <div>
                                                {etab == 24 ? <div>
                                                    <Form.Group className="form-group">

                                                        <Form.Label htmlFor="exampleFormControlSelect1">{user.langue === "en" ? (<div> Select material </div>):(<div>Sélectionner la matière</div>)}</Form.Label>
                                                        <select className="form-select" id="matiere" name="matiere" onChange={handleChange}>
                                                            <option> </option>
                                                            {matieres.map((item) => (<option value={item.matiere_cp}>{item.matiere_cp}</option>))}
                                                        </select>
                                                    </Form.Group>
                                                    <Form.Group className='form-group'>
                                                        <Form.Label>Note </Form.Label>
                                                        <Form.Control type="number" id="valeur_note" name="valeur_note"
                                                            value={inputs.valeur_note || ''}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>


                                                    <Form.Group className='form-group'>
                                                        <Form.Label>Appreciation</Form.Label>

                                                        <select className="form-select mb-3 shadow-none" name="appreciation" onChange={handleChange}>
                                                            <option> </option>
                                                            <option value="Non acquis">Non acquis</option>
                                                            <option value="En cours d'acquisition">En cours d'acquisition</option>
                                                            <option value="Acquis">Acquis</option>
                                                              <option value="Not Acquired">Not Acquired</option>
                                                            <option value="Currently Being Acquired">Currently Being Acquired</option>
                                                            <option value="Acquired">Acquired</option> 
                                                            <option value="Expert">Expert</option>
                                                        </select>
                                                    </Form.Group>

                                                    <Form.Group className='form-group'>
                                                        <Form.Label>{user.langue === "en" ? (<div> Target skill </div>):(<div>Compétence visée</div>)}</Form.Label>
                                                        <Form.Control type="text" id="competence_visee" name="competence_visee"
                                                            value={inputs.competence_visee || ''}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>

                                                    <Button variant="primary" onClick={submitForm}>
                                                        {user.langue === "en" ? (<div>Add</div>):(<div>Ajouter</div>)}
                                                    </Button>
                                                </div> : <div>
                                                    <Form.Group className='form-group'>
                                                        <Form.Label>Groupes</Form.Label>

                                                        <select className="form-select mb-3 shadow-none" name="matiere" onChange={handleChange}>
                                                            <option> </option>

                                                            {groupesclasse.map((item) => (
                                                                <option key={item.id} value={item.groupe_cg}>{item.groupe_cg}(/ {item.marks_cg})</option>
                                                            ))}
                                                        </select>
                                                    </Form.Group>

                                                    <Form.Group className='form-group'>
                                                        <Form.Label>{user.langue === "en" ? (<div> Evaluation index </div>):(<div>Indice d'évaluation</div>)}</Form.Label>

                                                        <select className="form-select mb-3 shadow-none" name="competence_visee" onChange={handleChange}>
                                                            <option> </option>
                                                            <option value="Ecrit">{user.langue === "en" ? (<div> Written </div>):(<div>Ecrit</div>)}</option>
                                                            <option value="Oral">{user.langue === "en" ? (<div> Oral </div>):(<div>Oral</div>)}</option>
                                                            <option value="Pratique">{user.langue === "en" ? (<div>Practice</div>):(<div>Pratique</div>)}</option>
                                                            {indices.map((item) => (
                                                                <option key={item.id} value={item.intitule_indice}>{item.intitule_indice}</option>
                                                            ))}
                                                        </select>
                                                    </Form.Group>

                                                    <Form.Group className='form-group'>
                                                        <Form.Label>Note</Form.Label>
                                                        <Form.Control type="number" id="valeur_note" name="valeur_note"
                                                            value={inputs.valeur_note || ''}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>

                                                    <Form.Group className='form-group'>
                                                        <Form.Label>Appreciation</Form.Label>

                                                        <select className="form-select mb-3 shadow-none" name="appreciation" onChange={handleChange}>
                                                            <option> </option>
                                                            <option value="Non acquis">Non acquis</option>
                                                            <option value="En cours d'acquisition">En cours d'acquisition</option>
                                                            <option value="Acquis">Acquis</option>
                                                             <option value="Not Acquired">Not Acquired</option>
                                                            <option value="Currently Being Acquired">Currently Being Acquired</option>
                                                            <option value="Acquired">Acquired</option> 
                                                            <option value="Expert">Expert</option>
                                                        </select>
                                                    </Form.Group>
                                                    <Button variant="primary" onClick={submitFormprim}>
                                                        {user.langue === "en" ? (<div> Add </div>):(<div>Ajouter</div>)}
                                                    </Button>
                                                </div>}

                                            </div>}


                                            
                                        </Form>
                                    </Modal.Body>
                                </Modal>

                            </div>
                        </Card.Header>

                        <Card.Body>

                            {niveau == 'PRE NUSERY' || niveau == 'NUSERY ONE' || niveau == 'NUSERY TWO' || niveau == 'MATERNELLE' ? <div>

                                {etab == 24 ? <div>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Sno.</th>
                                                <th>{user.langue === "en" ? (<div> Name </div>):(<div>Nom</div>)}</th>
                                                <th>{user.langue === "en" ? (<div> First name </div>):(<div>Prénom</div>)}</th>
                                                <th>{user.langue === "en" ? (<div> Group </div>):(<div>Groupe</div>)}</th>
                                                <th>Note</th>
                                                <th>{user.langue === "en" ? (<div> Index </div>):(<div>Indices</div>)}</th>
                                                <th>Appreciation</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {noteseleves.sort((a, b) => a.nom.localeCompare(b.nom)).map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{++index}</td>
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
                                </div> : <div>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Sno. </th>
                                                 <th>{user.langue === "en" ? (<div> Name </div>):(<div>Nom</div>)}</th>
                                                <th>{user.langue === "en" ? (<div> First name </div>):(<div>Prénom</div>)}</th>
                                                <th>{user.langue === "en" ? (<div> Group </div>):(<div>Groupe</div>)}</th>
                                                <th>Note</th>
                                                <th>Emoji</th>
                                                <th>{user.langue === "en" ? (<div> Index </div>):(<div>Indices</div>)}</th>
                                                <th>Appreciation</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {noteseleves.sort((a, b) => a.nom.localeCompare(b.nom)).map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{++index}</td>
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
                                </div>}


                            </div> : <div>

                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Sno.</th>
                                            <th>{user.langue === "en" ? (<div> Name </div>):(<div>Nom</div>)}</th>
                                                <th>{user.langue === "en" ? (<div> First name </div>):(<div>Prénom</div>)}</th>
                                                <th>{user.langue === "en" ? (<div> Group </div>):(<div>Groupe</div>)}</th>
                                                <th>Note</th>
                                                <th>{user.langue === "en" ? (<div> Index </div>):(<div>Indices</div>)}</th>
                                            <th>Appreciation</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {noteseleves.sort((a, b) => a.nom.localeCompare(b.nom)).map((item, index) => (
                                            <tr key={item.id}>
                                                <td>{++index}</td>
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
                            </div>}

                        </Card.Body>
                    </Card>
                </Col>
            </Row>


        </div>
    )

}

export default ProfesseurListGroupes
