import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button, Card, Modal, FormGroup } from 'react-bootstrap'
import { useNavigate, useParams, Link } from 'react-router-dom';

import AuthUser from "../../../components/AuthUser.js";



const AdminEditNotes = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const [notes, setNotes] = useState([]);
    const {niveau, classe, evaluation, userid} = useParams();

    const { user, http } = AuthUser();
    const etab = user.etablissement;
    const id_user = userid;
    const iduser = user.id;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const coefficient = 1;
    
    
 
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
    http.get("/get_notes_elevesprim/" + etab + '/' + classe + '/' + evaluation + '/' + userid ).then((res) => {
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
        http.post('/notes/update', inputs).then((res) => {
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

      
  };

   {/* const deleteNotes = (id) => {
        http.delete('/delete_note/' + id).then(res => {
            fetchAllNoteseleves();
        })
    } */}
    
    const deleteNotes = (matiere, indice) => {
       if(window.confirm("Voulez-vous supprimer cet élément?") == true){
    http.delete('/delete_note/' + etab + "/" + classe + "/" + matiere + "/" + evaluation + "/" + indice + "/" + userid).then((res) => {
      fetchAllNoteseleves();
    });
      alert('Supprimé!');
  };
  }

    
    return (

        <div>
            <Row>
                <Col sm="12" lg="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                            <h4 className="card-title"> {user.langue === "en" ? (<div>Note</div>):(<div>Notes</div>)}</h4>

                            <div>
                                <Button className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3" onClick={handleShow}>
                                    <i className="btn-inner">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </i>

                                    <span> {user.langue === "en" ? (<div>Edit a note</div>):(<div>Modifier une note</div>)}</span>
                                </Button>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Modifier une note</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>

                                            {niveau == 'PRE NUSERY' || niveau == 'NUSERY ONE' || niveau == 'NUSERY TWO' || niveau == 'MATERNELLE' ? <div>

                                                {etab == 24 ? <div>
                                                    <Form.Group className="form-group">

                                                        <Form.Label htmlFor="exampleFormControlSelect1">Selectionner la matière</Form.Label>
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
                                                            <option value="Non acquis"> {user.langue === "en" ? (<div>Not acquired</div>):(<div>Non acquis</div>)}</option>
                                                            <option value="En cours d'acquisition"> {user.langue === "en" ? (<div>In progress</div>):(<div>En cours d'acquisition</div>)}</option>
                                                            <option value="Acquis"> {user.langue === "en" ? (<div>Acquired</div>):(<div>Acquis</div>)}</option>
                                                            <option value="Expert">Expert</option>
                                                        </select>
                                                    </Form.Group>

                                                    <Form.Group className='form-group'>
                                                        <Form.Label> {user.langue === "en" ? (<div>Target skill</div>):(<div>Compétence visée</div>)}</Form.Label>
                                                        <Form.Control type="text" id="competence_visee" name="competence_visee"
                                                            value={inputs.competence_visee || ''}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>
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
                                                        <Form.Label> {user.langue === "en" ? (<div>Note</div>):(<div>Note</div>)}</Form.Label>
                                                        <Form.Control type="number" id="valeur_note" name="valeur_note"
                                                            value={inputs.valeur_note || ''}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>

                                                    <Form.Group className='form-group'>
                                                        <Form.Label> {user.langue === "en" ? (<div>Emoji</div>):(<div>Emoji</div>)}</Form.Label>
                                            
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
                                                        <Form.Label> {user.langue === "en" ? (<div>Evaluation index</div>):(<div>Indices d'évaluation</div>)}</Form.Label>

                                                        <select className="form-select mb-3 shadow-none" name="competence_visee" onChange={handleChange}>
                                                            <option> </option>
                                                            <option value="Ecrit">{user.langue === "en" ? (<div>Written</div>):(<div>Ecrit</div>)}</option>
                                                            <option value="Oral">{user.langue === "en" ? (<div>Oral</div>):(<div>Oral</div>)}</option>
                                                            <option value="Pratique">{user.langue === "en" ? (<div>Practical</div>):(<div>Pratique</div>)}</option>
                                                            {indices.map((item) => (
                                                                <option key={item.id} value={item.intitule_indice}>{item.intitule_indice}</option>
                                                            ))}
                                                        </select>
                                                    </Form.Group>
                                                                
                                                    <Form.Group className='form-group'>
                                                        <Form.Label>Appreciation</Form.Label>

                                                        <select className="form-select mb-3 shadow-none" name="appreciation" onChange={handleChange}>
                                                            <option> </option>
                                                             <option value="Non acquis"> {user.langue === "en" ? (<div>Not acquired</div>):(<div>Non acquis</div>)}</option>
                                                            <option value="En cours d'acquisition"> {user.langue === "en" ? (<div>In progress</div>):(<div>En cours d'acquisition</div>)}</option>
                                                            <option value="Acquis"> {user.langue === "en" ? (<div>Acquired</div>):(<div>Acquis</div>)}</option>
                                                            <option value="Expert">Expert</option>
                                                        </select>
                                                    </Form.Group>
         
                                                </div>}


                                            </div> : <div>
                                                {etab == 24 ? <div>
                                                    <Form.Group className="form-group">

                                                        <Form.Label htmlFor="exampleFormControlSelect1">{user.langue === "en" ? (<div>Select material</div>):(<div>Sélectionner la matière</div>)}</Form.Label>
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
                                                            <option value="Non acquis"> {user.langue === "en" ? (<div>Not acquired</div>):(<div>Non acquis</div>)}</option>
                                                            <option value="En cours d'acquisition"> {user.langue === "en" ? (<div>In progress</div>):(<div>En cours d'acquisition</div>)}</option>
                                                            <option value="Acquis"> {user.langue === "en" ? (<div>Acquired</div>):(<div>Acquis</div>)}</option>
                                                            <option value="Expert">Expert</option>
                                                        </select>
                                                    </Form.Group>

                                                    <Form.Group className='form-group'>
                                                        <Form.Label>{user.langue === "en" ? (<div>Target skill</div>):(<div>Compétence visée</div>)}</Form.Label>
                                                        <Form.Control type="text" id="competence_visee" name="competence_visee"
                                                            value={inputs.competence_visee || ''}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                </div> : <div>
                                                    <Form.Group className='form-group'>
                                                        <Form.Label>{user.langue === "en" ? (<div>Groups</div>):(<div>Groupes</div>)}</Form.Label>

                                                        <select className="form-select mb-3 shadow-none" name="matiere" onChange={handleChange}>
                                                            <option> </option>

                                                            {groupesclasse.map((item) => (
                                                                <option key={item.id} value={item.groupe_cg}>{item.groupe_cg}(/ {item.marks_cg})</option>
                                                            ))}
                                                        </select>
                                                    </Form.Group>

                                                    <Form.Group className='form-group'>
                                                        <Form.Label>{user.langue === "en" ? (<div>Evaluation index</div>):(<div>Indice d'évaluation</div>)}</Form.Label>

                                                        <select className="form-select mb-3 shadow-none" name="competence_visee" onChange={handleChange}>
                                                            <option> </option>
                                                            <option value="Ecrit">{user.langue === "en" ? (<div>Written</div>):(<div>Ecrit</div>)}</option>
                                                            <option value="Oral">{user.langue === "en" ? (<div>Oral</div>):(<div>Oral</div>)}</option>
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
                                                            <option value="Non acquis"> {user.langue === "en" ? (<div>Not acquired</div>):(<div>Non acquis</div>)}</option>
                                                            <option value="En cours d'acquisition"> {user.langue === "en" ? (<div>In progress</div>):(<div>En cours d'acquisition</div>)}</option>
                                                            <option value="Acquis"> {user.langue === "en" ? (<div>Acquired</div>):(<div>Acquis</div>)}</option>
                                                            <option value="Expert">Expert</option>
                                                        </select>
                                                    </Form.Group>
                                                </div>}

                                            </div>}


                                            <Button variant="primary" onClick={submitForm}>
                                                {user.langue === "en" ? (<div>Modify</div>):(<div>Modifier</div>)}
                                            </Button>
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
                                        <th>{user.langue === "en" ? (<div>Name(s)</div>):(<div>Noms(s)</div>)}</th>
                                        <th>{user.langue === "en" ? (<div>First name</div>):(<div>Prénom(s)</div>)}</th>     
                                        <th>{user.langue === "en" ? (<div>Groups</div>):(<div>Groupes</div>)}</th>
                                        <th>{user.langue === "en" ? (<div>Note</div>):(<div>Note</div>)}</th>
                                        <th>{user.langue === "en" ? (<div>Index</div>):(<div>Indices</div>)}</th>
                                        <th>{user.langue === "en" ? (<div>Coef</div>):(<div>Coef</div>)}</th>
                                        <th>Appreciation</th>
                           <th>Action</th>
                                          
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
                                            <td>{item.coefficient_note}</td>
                                            <td>{item.appreciation_note}</td>
                                        <td>
                                            <div className="flex align-items-center list-user-action">

                                                                 
                                        <Link
                                                                          className="btn btn-sm btn-icon btn-danger"
                                                                          data-toggle="tooltip"
                                                                          data-placement="top"
                                                                          title="Delete"
                                                                          data-original-title="Delete"
                                                                          to="#"
                                                                          onClick={() => {
                                                                            deleteNotes(item.matiere_note , item.competence_visee_note)
                                                                          }}
                                                                   >
                                                                    <span className="btn-inner">
                                                                        <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                                                                            <path d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                            <path d="M20.708 6.23975H3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                            <path d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                        </svg>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                    </td>
                                            
                                        </tr>
                                    ))}
                                      </tbody>      
                                     </table>
                        </div> : <div>
                          <table className="table">
                                    <thead>              
                                    <tr>
                                        <th>Sno.</th>
                                        <th>{user.langue === "en" ? (<div>Name(s)</div>):(<div>Noms(s)</div>)}</th>
                                        <th>{user.langue === "en" ? (<div>First name</div>):(<div>Prénom(s)</div>)}</th>     
                                        <th>{user.langue === "en" ? (<div>Groups</div>):(<div>Groupes</div>)}</th>
                                        <th>Note</th>
                                        <th>Emoji</th>
                                        <th>{user.langue === "en" ? (<div>Index</div>):(<div>Indices</div>)}</th>
                                        <th>Coef</th>
                                        <th>Appreciation</th>
                                        <th>Action</th>
                                          
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
                                            <td>{item.coefficient_note}</td>
                                            <td>{item.appreciation_note}</td>
                                            <td>
                                            <div className="flex align-items-center list-user-action">
                                                                

                                                                  <Link className="btn btn-sm btn-icon btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" data-original-title="Delete" onClick={() => { deleteNotes(item.matiere_note , item.competence_visee_note) }} >
                                                                    <span className="btn-inner">
                                                                        <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                                                                            <path d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                            <path d="M20.708 6.23975H3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                            <path d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                        </svg>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                    </td>
                                            
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
                                        <th>{user.langue === "en" ? (<div>Name(s)</div>):(<div>Noms(s)</div>)}</th>
                                        <th>{user.langue === "en" ? (<div>First name</div>):(<div>Prénom(s)</div>)}</th>     
                                        <th>{user.langue === "en" ? (<div>Groups</div>):(<div>Groupes</div>)}</th>
                                        <th>{user.langue === "en" ? (<div>Note</div>):(<div>Note</div>)}</th>
                                        <th>{user.langue === "en" ? (<div>Index</div>):(<div>Indices</div>)}</th>
                                        <th>{user.langue === "en" ? (<div>Coef</div>):(<div>Coef</div>)}</th>
                                        <th>Appreciation</th>
                                        <th>Action</th>
                                          
                                  </tr>
                                 </thead>
                                    <tbody>
                                    {noteseleves.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{++index}</td>
                                            <td>{item.nom}</td>
                                            <td>{item.prenom}</td>
                                            <td>{item.matiere_note}</td> 
                                            <td>{item.valeur_note}</td>
                                            <td>{item.competence_visee_note}</td>
                                            <td>{item.coefficient_note}</td>
                                            <td>{item.appreciation_note}</td>
                                        <td>
                                            <div className="flex align-items-center list-user-action">

                                                          
                                                                  <Link className="btn btn-sm btn-icon btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" data-original-title="Delete" onClick={() => { deleteNotes(item.matiere_note , item.competence_visee_note) }} >
                                                                    <span className="btn-inner">
                                                                        <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                                                                            <path d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                            <path d="M20.708 6.23975H3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                            <path d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                        </svg>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                    </td>
                                            
                                        </tr>
                                    ))}
                                      </tbody>      
                                     </table>                
                      </div> }
                        
                        </Card.Body>
                    </Card>
                </Col>
            </Row>


        </div>
    )

}

export default AdminEditNotes
