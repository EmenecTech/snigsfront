import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import AuthUser from "../../../components/AuthUser";

import { Row, Col, Form, Button, Card, Modal, FormGroup } from 'react-bootstrap'
import http from "../../../http";



export default function Enseignant_Edit_CahierTexte() {
    const [inputs, setInputs] = useState({});
    const [Cahiertextes, setCahierTextes] = useState([]);
    const [Lecons, setLecons] = useState([]);
    const { user, http } = AuthUser();
    const { classe, matiere, chapitre, idperiode } = useParams();



    const etab = user.etablissement;



    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // const [cours, setCours] = useState([]);

    useEffect(() => {
        fetchAllCahiertextes();
    }, []);


    const fetchAllCahiertextes = () => {
        http.get('/get_cahiertexte/' + classe + '/' + matiere + '/' + chapitre + '/' + etab + '/' + idperiode).then(res => {
            setCahierTextes(res.data);
        })
    }

    console.log(Cahiertextes);


    useEffect(() => {
        fetchAllLecons();
    }, []);


    const fetchAllLecons = () => {
        http.get('/lecons_in_chapitre/' + etab + '/' + classe + '/' + matiere + '/' + chapitre).then((res) => {
            setLecons(res.data);
        });
    }

    const deleteCahiertexte = (id) => {
         if(window.confirm("Voulez-vous supprimer cet élément?")==true){
        http.delete('/cahiertexte/' + id).then(res => {
            fetchAllCahiertextes();
        })
             alert('Supprimé!');
    }
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value, etab, idperiode, classe, matiere, chapitre }))

    }

    const submitForm = () => {
        http.post('/cahier_texte', inputs).then((res) => {
            window.location.reload(false);
        })
        console.log(inputs);


    }

    return (
        <div>
            <Row>
                <Col sm="12" lg="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between flex-wrap">
                            <div className="header-title"><h4 className="card-title mb-0">{user.langue === "en" ? (<div> TEXTBOOK </div>):(<div> CAHIER DE TEXTE </div>)}</h4></div>





                            <div>


                                <Button className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3" onClick={handleShow}>
                                    <i className="btn-inner">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </i>

                                    <span>{user.langue === "en" ? (<div> complete </div>):(<div> Remplir </div>)}</span>
                                </Button>

                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>{user.langue === "en" ? (<div> add notes </div>):(<div> ajouter des notes </div>)}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>

                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="exampleFormControlSelect1">{user.langue === "en" ? (<div> lesson </div>):(<div> leçon </div>)}</Form.Label>
                                                <select className="form-select" id="lecon_cahier_texte" name="lecon_cahier_texte" onChange={handleChange}>
                                                    {Lecons.map((item) => (
                                                        <><option> </option>
                                                            <option value={item.intitule_lecon}>{item.intitule_lecon}</option></>

                                                    ))}

                                                </select>
                                            </Form.Group>
                                            <Form.Group className='form-group'>
                                                <Form.Label>{user.langue === "en" ? (<div> filling date </div>):(<div> date de remplissage </div>)}</Form.Label>
                                                <Form.Control type="date" id="date_cahier_texte" name="date_cahier_texte"
                                                    value={inputs.date_cahier_texte || ''}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>

                                            <Form.Group className='form-group'>
                                                <Form.Label>details</Form.Label>
                                                <Form.Control as="textarea" id="detail_cahier_texte" name="detail_cahier_texte" rows="5"
                                                    value={inputs.detail_cahier_texte || ''}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>

                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="exampleFormControlSelect1">{user.langue === "en" ? (<div> level of progress </div>):(<div> Niveau d'avancement </div>)}</Form.Label>
                                                <select className="form-select" id="niveau_avancement" name="niveau_avancement" onChange={handleChange}>
                                                    <option> </option>
                                                    <option value='Début'>{user.langue === "en" ? (<div> start </div>):(<div> Début </div>)}</option>
                                                    <option value='En cours'>{user.langue === "en" ? (<div> in progress </div>):(<div> En cours </div>)}</option>
                                                    <option value='Terminé'>{user.langue === "en" ? (<div> completed </div>):(<div> Terminé </div>)}</option>

                                                </select>
                                            </Form.Group>

                                        </Form>

                                        <Button variant="primary" onClick={submitForm}>
                                            {user.langue === "en" ? (<div> add </div>):(<div> ajouter </div>)}
                                        </Button>
                                    </Modal.Body>
                                </Modal>

                            </div>
                        </Card.Header>
                        <Card.Body>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>{user.langue === "en" ? (<div> date </div>):(<div> Date </div>)}</th>

                                        <th>{user.langue === "en" ? (<div> chapter </div>):(<div> Chapitre </div>)}</th>
                                        <th>{user.langue === "en" ? (<div> lesson </div>):(<div> leçon </div>)}</th>
                                        <th>{user.langue === "en" ? (<div> details </div>):(<div> Détails </div>)}</th>
                                        <th>{user.langue === "en" ? (<div> progress level </div>):(<div> Niveau d'avancement </div>)}</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Cahiertextes.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.date_cahier_texte}</td>
                                            <td>{item.chapitre_cahier_texte}</td>
                                            <td>{item.lecon_cahier_texte}</td>
                                            <td>{item.detail_cahier_texte}</td>
                                            <td>{item.niveau_avancement_cahier_texte}</td>
                                            <td>

                                                <Link className="btn btn-info btn-icon" data-bs-toggle="tooltip" title="Delete User" to={"/Enseignant/Appel/Text/Book/" + classe + "/" + matiere + "/" + chapitre + "/" + idperiode + "/" + item.id} >
                                                    Appel

                                                </Link>{' '}
                                                <Link className="btn btn-sm btn-icon text-danger" data-bs-toggle="tooltip" title="Delete User" to="#" onClick={() => { deleteCahiertexte(item.id) }}>
                                                    <span className="btn-inner">
                                                        <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                                                            <path d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                            <path d="M20.708 6.23975H3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                            <path d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                        </svg>
                                                    </span>
                                                </Link>


                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div >

    )
}
