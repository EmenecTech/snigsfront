import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
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

const EleveRegularite = (props) => {
    const { user } = AuthUser();
    const navigate = useNavigate();

    const userid = user.id;
    const [imagedata, setImagedata] = useState("");

    const handleChange2 = (file) => {
        setImagedata(file[0]);
    };

    const submitData = (e) => {
        e.preventDefault();
        const fData = new FormData();

        fData.append("image", imagedata);

        Axios.post("http://localhost:8000/api/postimage/" + id, fData)
            .then((res) => {
                console.log("response", res);
                alert("Photo de profil ajoutée avec succès !")
            })
            .catch((e) => {
                console.error("Faillure", e);
            });
    };


    const [message, setMessage] = useState("");
    const [inputs, setInputs] = useState({});
    const id = user.id;
    const etab = user.etablissement;
    const classe = user.other_in_user;



    const [detailpayement, setdetailpayement] = useState([]);

    useEffect(() => {
        fetchAlldetailpayement()
    }, []);

    const fetchAlldetailpayement = () => {
        http.get('/list/payements/classe/' + etab + '/' + classe).then((res) => {
            setdetailpayement(res.data);
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
                if (!Axios.isCancel(error)) {
                    console.error(error);
                }
            });
    }, []);

    useEffect(() => {
        fetchProductImage();
        // nettoyer la référence à l'image quand le composant est démonté
        return () => {
            imageRef.current = null;
        };
    }, [fetchProductImage]);





    const [infopayement, setinfopayement] = useState([]);

    useEffect(() => {
        fetchAllinfopayement()
    }, []);

    const fetchAllinfopayement = () => {
        http.get('/info/payement/classe/' + etab + '/' + classe).then((res) => {
            setinfopayement(res.data);
        });
    }




    const submitFormPassword = (event) => {



        const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#?!@$%^&*-])[a-zA-Z0-9#?!@$%^&*-]{10,}$/
        if (inputs.password === "") {
            setMessage("Entrez un mot de passe")
        }
        else if (regExp.test(inputs.password)) {

            /*      http.post('/adduser', inputs).then((res) => {
                      navigate('/');
                  })

                  */
            setMessage("")
            alert("Mot de passe modifié avec succès !")

        }

        else if (!regExp.test(inputs.password)) {
            setMessage("Mot de passe non valide")
        }
        else {
            setMessage("")
        }


        console.log(inputs);
    }



    const [listpayements, setlistpayements] = useState([]);

    useEffect(() => {
        fetchAlllistpayements()
    }, []);

    const fetchAlllistpayements = () => {
        http.get("/info/payement/details/eleve/" + etab + "/" + classe + "/" + userid).then((res) => {
            setlistpayements(res.data);
        });
    }

    const [payementsum, setpayementsum] = useState([]);

    useEffect(() => {
        fetchAllpayementsum()
    }, []);

    const fetchAllpayementsum = () => {
        http.get('/info/payement/sum/eleve/' + etab + '/' + classe + '/' + userid).then((res) => {
            setpayementsum(res.data);
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
                                            <Col sm="3" lg="3">
                                                <Form onSubmit={submitData}>
                                                    <Form.Group className="form-group">
                                                        <div className="profile-img-edit position-relative">
                                                            <Image
                                                                className="theme-color-default-img  profile-pic rounded avatar-100"
                                                                src={image}
                                                                alt="profile-pic"
                                                            />


                                                        </div>
                                                    </Form.Group>


                                                </Form>
                                                <div className="mt-2">
                                                    <h6 className="mb-0">{user.nom} {user.prenom}</h6>
                                                    <p>{user.other_in_user}</p>
                                                </div>


                                            </Col>
                                            <Col sm="5" lg="5">
                                                <h3>Frais de scolarités</h3>
                                                <h5 className="mb-4">{infopayement.montant_pension} XAF</h5>


                                                <h4 className="mb-3">Détails</h4>
                                                {detailpayement.map((item) => (
                                                    <div className="mt-2">
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
            </div>
        </>
    );
};

export default EleveRegularite;
