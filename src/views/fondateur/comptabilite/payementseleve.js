import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Col, Modal, Form, Image, Row } from "react-bootstrap";
import Card from "../../../components/Card";

import { Link, useNavigate, useParams } from "react-router-dom";
//img
import avatars1 from "../../../assets/images/avatars/01.png";
import avatars2 from "../../../assets/images/avatars/avtar_1.png";
import avatars3 from "../../../assets/images/avatars/avtar_2.png";
import avatars4 from "../../../assets/images/avatars/avtar_3.png";
import avatars5 from "../../../assets/images/avatars/avtar_4.png";
import avatars6 from "../../../assets/images/avatars/avtar_5.png";

import http from "../../../http";
import AuthUser from "../../../components/AuthUser";
import Axios from 'axios';

const PayementsListEleve = (props) => {
    const [imagedata, setImagedata] = useState("");
    const { niveau, classe, ideleve, idpension } = useParams();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();
    const { user } = AuthUser();

    const [message, setMessage] = useState("");
    const [inputs, setInputs] = useState({});

    const etab = user.etablissement;




    const [infopayement, setinfopayement] = useState([]);

    useEffect(() => {
        fetchAllinfopayement()
    }, []);

    const fetchAllinfopayement = () => {
        http.get('/info/payement/classe/' + etab + '/' + classe).then((res) => {
            setinfopayement(res.data);
        });
    }



    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({ ...values, [name]: value, etab, classe, ideleve, idpension }))
    }


    const handleChange2 = (file) => {
        setImagedata(file[0]);
    };

    const submitForm = () => {

        http.post('/payement/save', inputs).then((res) => {
            navigate('/Payements/List/Eleve/Classes/' + niveau + '/' + classe + '/' + ideleve + '/' + idpension)
            window.location.reload(false);

        })

        console.log(inputs);

    }







    const [detailpayement, setdetailpayement] = useState([]);

    useEffect(() => {
        fetchAlldetailpayement()
    }, []);

    const fetchAlldetailpayement = () => {
        http.get('/list/payements/classe/' + etab + '/' + classe).then((res) => {
            setdetailpayement(res.data);
        });
    }



    const [payementsum, setpayementsum] = useState([]);

    useEffect(() => {
        fetchAllpayementsum()
    }, []);

    const fetchAllpayementsum = () => {
        http.get('/info/payement/sum/eleve/' + etab + '/' + classe + '/' + ideleve).then((res) => {
            setpayementsum(res.data);
        });
    }









    const [image, setImage] = useState("");
    const imageRef = useRef(null);

    const fetchProductImage = useCallback(() => {
        // annuler la requête précédente si elle existe
        if (imageRef.current) {
            imageRef.current.cancel();
        }
        // créer un token d'annulation
        imageRef.current = Axios.CancelToken.source();
        // envoyer une requête GET avec le token et le responseType
        http.get(
            "/avatar/images/" + user.profile_photo_path,
            {
                cancelToken: imageRef.current.token,
                responseType: "arraybuffer",
            }
        )
            .then((response) => {
                // convertir l'image en base64
                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ""
                    )
                );
                // mettre à jour l'état de l'image
                setImage(`data:image/png;base64,${base64}`);
            })
            .catch((error) => {
                // ignorer l'erreur si la requête a été annulée

            });
    }, []);

    useEffect(() => {
        fetchProductImage();
        // nettoyer la référence à l'image quand le composant est démonté
        return () => {
            imageRef.current = null;
        };
    }, [fetchProductImage]);


    const [listpayements, setlistpayements] = useState([]);

    useEffect(() => {
        fetchAlllistpayements()
    }, []);

    const fetchAlllistpayements = () => {
        http.get("/info/payement/details/eleve/" + etab + "/" + classe + "/" + ideleve).then((res) => {
            setlistpayements(res.data);
        });
    }



    return (
        <>
            <div>
                <Row>
                    <Col xl="12" lg="12" className="">
                        <Row>
                            <Card>
                                <Card.Header className="d-flex justify-content-between">
                                    <div className="header-title">
                                        <h4 className="card-title"></h4>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <Col xl="12" lg="12" className="">
                                        <Row>
                                            <Col sm="4" lg="4">
                                                <Form>



                                                    <button
                                                        type="button"
                                                        onClick={handleShow}
                                                        className="btn btn-info mt-2"
                                                    >
                                                        Ajouter un payement
                                                    </button>



                                                    <Modal show={show} onHide={handleClose}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title as="h5">Ajouter une nouvelle filière</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <Form>
                                                                <Row>
                                                                    <Col>
                                                                        <Form.Group as={Row} className="form-group">
                                                                            <Form.Group className="form-group">
                                                                                <Form.Label htmlFor="exampleInputText1">Intitulé </Form.Label>
                                                                                <Form.Control type="text" defaultValue="" name="int" onChange={handleChange} required />
                                                                            </Form.Group>
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col>
                                                                        <Form.Group as={Row} className="form-group">
                                                                            <Form.Group className="form-group">
                                                                                <Form.Label htmlFor="exampleInputText1">Montant </Form.Label>
                                                                                <Form.Control type="number" defaultValue="" name="montant" onChange={handleChange} required />
                                                                            </Form.Group>
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>

                                                                <Row>
                                                                    <Col>
                                                                        <Form.Group as={Row} className="form-group">
                                                                            <Form.Group className="form-group">
                                                                                <Form.Label htmlFor="exampleInputText1">Date de payement </Form.Label>
                                                                                <Form.Control type="date" defaultValue="" name="date" onChange={handleChange} required />
                                                                            </Form.Group>
                                                                        </Form.Group>
                                                                    </Col>

                                                                </Row>







                                                                <div className="text-center">
                                                                    <Button type="button" variant="primary" onClick={submitForm} >Confirmer</Button>
                                                                </div>
                                                            </Form>
                                                        </Modal.Body>

                                                    </Modal>

                                                </Form>

                                            </Col>
                                            <Col sm="4" lg="4">
                                                <h3>Frais de scolarités</h3>
                                                <h5 className="mb-4">{infopayement.montant_pension} XAF</h5>

                                                <h4 className="mb-3">Détails</h4>
                                                {detailpayement.map((item) => (
                                                    <div className="mt-2" key={item.id}>
                                                        <h6 className="mb-0">{item.montant_detailpayement} XAF</h6>
                                                        <p>{item.intitule_detailpayement} <br />
                                                            ({item.debut_detailpayement} / {item.fin_detailpayement})
                                                        </p>
                                                    </div>
                                                ))}



                                            </Col>
                                            <Col sm="4" lg="4">
                                                <h3>Payements</h3>
                                                <h5 className="mb-4" style={{ color: "blue" }}>{payementsum.montant_payementsum} XAF</h5>


                                                {listpayements.map((item2) => (
                                                    <div className="mt-2" key={item2.id}>
                                                        <h6 className="mb-0">{item2.montant_payementsave} XAF</h6>
                                                        <p>{item2.intitule_payementsave} <br />
                                                            ({item2.date_payementsave})
                                                        </p>
                                                    </div>
                                                ))
                                                }



                                            </Col>

                                        </Row>


                                    </Col>
                                </Card.Body>
                            </Card>
                        </Row>

                    </Col>

                </Row>
            </div >
        </>
    );
};

export default PayementsListEleve;
