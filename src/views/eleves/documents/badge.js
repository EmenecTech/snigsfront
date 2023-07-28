import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect, useCallback, useRef } from "react";
import { Card, Col, Form, Image, Row, } from "react-bootstrap";
import AuthUser from "../../../components/AuthUser";
import QRCode from "react-qr-code";
import Axios from "axios";


const Badge = () => {
    const { http, user } = AuthUser();
    const etab = user.etablissement;


    //27/07/2023
    const [image2, setImage2] = useState("");
    const imageRef2 = useRef(null);

    const fetchProductImage2 = useCallback(() => {
        // annuler la requête précédente si elle existe
        if (imageRef2.current) {
            imageRef2.current.cancel();
        }
        // créer un token d'annulation
        imageRef2.current = Axios.CancelToken.source();
        // envoyer une requête GET avec le token et le responseType
        http.get(
            "/avatar/images/" + etab + ".png",

            {
                cancelToken: imageRef2.current.token,
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
                setImage2(`data:image/png;base64,${base64}`);
            })
            .catch((error) => {
                // ignorer l'erreur si la requête a été annulée
                if (!Axios.isCancel(error)) {
                    console.error(error);
                }
            });
    }, []);

    useEffect(() => {
        fetchProductImage2();
        // nettoyer la référence à l'image quand le composant est démonté
        return () => {
            imageRef2.current = null;
        };
    }, [fetchProductImage2]);




    

    return (
        <div className="Badge">
            <Row>
                <Col sm="8">
                    <Card>
                        <Col sm="12" className="d-flex align-items-center justify-content-center mt-2 mb-3">
                            <Row>
                                <Col sm="3">

                                    <div className="d-flex justify-content-between align-items-between">
                                        {" "}
                                        <Image
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                borderRadius: "50%",
                                                objectFit: "cover",
                                                border: "2px solid black",
                                            }}
                                        />
                                    <img src={"https://snigsbackend.com/logo_etab/" + etab + ".png"} alt="User-Profile" className="theme-color-default-img img-fluid avatar avatar-50 avatar-rounded" />
                                    <img src={"https://snigsbackend.com/logo_etab/" + etab + ".png"}  alt="User-Profile" className="theme-color-purple-img img-fluid avatar avatar-50 avatar-rounded" />
                                    <img src={"https://snigsbackend.com/logo_etab/" + etab + ".png"}  alt="User-Profile" className="theme-color-blue-img img-fluid avatar avatar-50 avatar-rounded" />
                                    <img src={"https://snigsbackend.com/logo_etab/" + etab + ".png"}  alt="User-Profile" className="theme-color-green-img img-fluid avatar avatar-50 avatar-rounded" />
                                    <img src={"https://snigsbackend.com/logo_etab/" + etab + ".png"} alt="User-Profile" className="theme-color-yellow-img img-fluid avatar avatar-50 avatar-rounded" />
                                    <img src={"https://snigsbackend.com/logo_etab/" + etab + ".png"}  alt="User-Profile" className="theme-color-pink-img img-fluid avatar avatar-50 avatar-rounded" />
                                    </div>
                                </Col>
                                <Col sm="6" className="mt-4
                                
                                
                                
                                
                                
                                ">
                                    {" "}
                                    <div className="col-sm-12 justify-content-center">
                                        <h6 className="text-center">
                                            Institut Africain D'informatique
                                        </h6>
                                    </div>
                                    <div className="col-sm-12 justify-content-center">
                                        <h6 className="text-center">
                                            Africain Institute of computer science
                                        </h6>
                                    </div>
                                    {" "}
                                </Col>
                                <Col sm="3">
                                    {" "}
                                    <div className="flex flex-column justify-content-center align-items-center">
                                        <Image
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                borderRadius: "50%",
                                                objectFit: "cover",
                                                border: "2px solid black",
                                            }}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <div className="profile-img-edit position-relative">

                            <Row>
                                <div className="container">
                                    <hr />
                                </div>
                            </Row>
                            <div>
                                <Row>
                                    <Col sm="12">
                                        <Row>
                                            <Col sm="3" className="d-flex justify-content-center">
                                                <Image
                                                    style={{
                                                        width: "100px",
                                                        height: "100px",
                                                        borderRadius: "10%",
                                                        objectFit: "cover",
                                                        border: "2px solid black",
                                                    }}
                                                />
                                            </Col>
                                            <Col sm="5">
                                                <div className="col-sm-10 justify-content-center">
                                                    <Form as={Row} className="form-group">
                                                        <Form
                                                            column
                                                            sm="3"
                                                            className="control-label align-self-center mb-0"
                                                            htmlFor="name"
                                                        >
                                                            Nom: {user.nom}
                                                        </Form>
                                                        <Col sm="9">
                                                            <Form type="name" placeholder="" />
                                                        </Col>
                                                    </Form> 
                                                </div>
                                                <div className="col-sm-10 justify-content-center">
                                                    <Form as={Row} className="form-group">
                                                        <Form
                                                            column
                                                            sm="3"
                                                            className="control-label align-self-center mb-0"
                                                            htmlFor="name"
                                                        >
                                                            Prenom:
                                                        </Form>
                                                        <Col sm="9">
                                                            <Form type="name" placeholder="" />
                                                        </Col>
                                                    </Form>
                                                </div>
                                                <div className="col-sm-10 justify-content-center">
                                                    <Form as={Row} className="form-group">
                                                        <Form
                                                            column
                                                            sm="3"
                                                            className="control-label align-self-center mb-0"
                                                            htmlFor="date"
                                                        >
                                                            Date de naissance:
                                                        </Form>
                                                        <Col sm="9">
                                                            <Form type="date" placeholder="" />
                                                        </Col>
                                                    </Form>
                                                </div>
                                                <div className="col-sm-10 justify-content-center">
                                                    <Form as={Row} className="form-group">
                                                        <Form
                                                            column
                                                            sm="3"
                                                            className="control-label align-self-center mb-0"
                                                            htmlFor="string"
                                                        >
                                                            Lieu de naissance:
                                                        </Form>
                                                        <Col sm="9">
                                                            <Form type="string" placeholder="" />
                                                        </Col>
                                                    </Form>
                                                </div>
                                                <div className="col-sm-10 justify-content-center">
                                                    <Form as={Row} className="form-group">
                                                        <Form
                                                            column
                                                            sm="3"
                                                            className="control-label align-self-center mb-0"
                                                            htmlFor="string"
                                                        >
                                                            Matricule:
                                                        </Form>
                                                        <Col sm="9">
                                                            <Form type="string" placeholder="" />
                                                        </Col>
                                                    </Form>
                                                </div>
                                            </Col>
                                            <Col sm="2">
                                                <div>
                                                    <QRCode value={user.nom} size={110} />
                                                </div>
                                            </Col>

                                            <Col sm="12">
                                                <div className="col-sm-10 justify-content-center">
                                                    <div className="header-title">
                                                        <p className="text-center">
                                                            <i> Année Scolaire 2022-2023</i>
                                                        </p>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
export default Badge;
