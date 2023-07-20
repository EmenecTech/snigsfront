import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button, Card, Modal, FormGroup, Table } from 'react-bootstrap'
import { useNavigate, useParams, Link } from 'react-router-dom';
import http from '../../../http';
import AuthUser from '../../../components/AuthUser';




const EnseignantAppel_cd_texte = () => {

    const [inputs, setInputs] = useState({});
    const [absences, setAbsences] = useState([])
    const [eleves, setEleves] = useState([]);
    const { user, http } = AuthUser();
    const { classe, matiere, idperiode, idtexte } = useParams();

    const etab = user.etablissement;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false);
    const handleShow1 = () => setShow1(true);
    const handleClose1 = () => setShow1(false);


    useEffect(() => {
        fetchAllEleves();
    }, []);

    const fetchAllEleves = () => {
        http.get('/eleve/' + classe).then(res => {
            setEleves(res.data);
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

    useEffect(() => {
        fetchAllAbsences();
    }, []);

    const fetchAllAbsences = () => {
        http.get('/get_absence/' + etab + "/" + classe + "/" + matiere + "/" + idperiode + "/" + idtexte).then(res => {
            setAbsences(res.data);

        })


    }

    const [eleves_classe, seteleves_classe] = useState([]);
    useEffect(() => {
        fetchAlleleves_classe();
    }, []);

    const fetchAlleleves_classe = () => {
        http.get('/fetch_eleves_in_classe/' + etab + '/' + classe).then(res => {
            seteleves_classe(res.data);
        })
    }




    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value, etab, classe, matiere, idperiode, idtexte }))

    }

    const submitForm = () => {
        http.post('/absence', inputs).then((res) => {
            window.location.reload(false);
        })

        console.log(inputs);

    }



    return (

        <div>
            <Row>
                <Col sm="12" lg="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                            <h4 className="card-title">{user.langue === "en" ? (<div> list of absentees </div>):(<div> liste des absents </div>)}</h4>

                            <div>
                                <Button className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3" onClick={handleShow1}>


                                    <span>{user.langue === "en" ? (<div> list of students </div>):(<div> liste des élèves </div>)}</span>
                                </Button>
                                <Modal show={show1} onHide={handleClose1}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>{user.langue === "en" ? (<div> list </div>):(<div> liste </div>)}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className="table-responsive border-bottom my-3">
                                            <Table
                                                responsive
                                                striped
                                                id="datatable"
                                                className=""
                                                data-toggle="data-table"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th>{user.langue === "en" ? (<div> last name </div>):(<div> Nom </div>)}</th>                                                        <th>Nom</th>
                                                        <th>{user.langue === "en" ? (<div> first name </div>):(<div> Prénom</div>)}</th>
                                                        <th>{user.langue === "en" ? (<div> gender </div>):(<div> Genre </div>)}</th>
                                                        <th>{user.langue === "en" ? (<div> date of birth </div>):(<div> Date de naissance </div>)}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {eleves_classe.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <td>{index}</td>
                                                            <td>{item.nom}</td>
                                                            <td>{item.prenom}</td>
                                                            <td>{item.sexe}</td>
                                                            <td>{item.date_naissance}</td>


                                                        </tr>
                                                    ))}
                                                </tbody>
                                                <tfoot>

                                                </tfoot>
                                            </Table>

                                        </div>
                                    </Modal.Body>
                                </Modal>
                                <Button className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3" onClick={handleShow}>
                                    <i className="btn-inner">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </i>

                                    <span>{user.langue === "en" ? (<div> mark absences </div>):(<div> marquer l'absence </div>)}</span>
                                </Button>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>{user.langue === "en" ? (<div> mark absences </div>):(<div> marquer les absences </div>)}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="exampleFormControlSelect1">{user.langue === "en" ? (<div> select student </div>):(<div> sélectionner l'élève </div>)}</Form.Label>
                                                <select className="form-select" id="user_absence" name="user_absence" onChange={handleChange}>
                                                    <option></option>
                                                    {eleves_classe.map((item, index) => (
                                                        <option value={item.id}>{item.nom} {item.prenom}</option>
                                                    ))}
                                                </select>

                                            </Form.Group>



                                        </Form>

                                        <Button variant="primary" onClick={submitForm}>
                                            {user.langue === "en" ? (<div> Absent </div>):(<div> Absent(e) </div>)}
                                        </Button>
                                    </Modal.Body>
                                </Modal>

                            </div>
                        </Card.Header>

                        <Card.Body>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Sno.</th>
                                        <th>{user.langue === "en" ? (<div> student's name </div>):(<div> nom de l'élève </div>)}</th>
                                        <th>{user.langue === "en" ? (<div> date </div>):(<div> Date </div>)}</th>
                                        <th> </th>

                                        <th> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {absences.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{++index}</td>
                                            <td>
                                                {item.nom} {item.prenom}
                                            </td>
                                            <td>{item.date_cahier_texte}</td>
                                            <td>
                                                <span className="badge rounded-pill bg-info ms-3">{user.langue === "en" ? (<div> absent </div>):(<div> absent </div>)}</span>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>


        </div>
    )

}

export default EnseignantAppel_cd_texte
