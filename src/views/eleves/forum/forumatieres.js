import React, { useEffect, useState } from 'react'
import { Row, Col, Image, Form, Button } from 'react-bootstrap'
import Card from '../../../components/Card'

import { Link, useNavigate, useParams } from 'react-router-dom'

import http from '../../../http'
import AuthUser from '../../../components/AuthUser'
const EleveForumsMatieres = (props) => {
    const navigate = useNavigate();
    const { user, http } = AuthUser();
    const [inputs, setInputs] = useState({});
    const { chapitre, matiere } = useParams();

    const etab = user.etablissement;
    //listLecons
    const classe = user.other_in_user;
    const [Lecons, setLecons] = useState([]);

    useEffect(() => {
        fetchAllLecons()
    }, []);

    const fetchAllLecons = () => {
        http.get('/lecons_in_chapitre/' + etab + '/' + classe + '/' + matiere + '/' + chapitre).then((res) => {
            setLecons(res.data);
        });
    }

    //addLecons

    const handlechange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value, etab, chapitre, classe, matiere }))
    }

    const submitForm = () => {
        http.post('/lecons', inputs).then((res) => {
            window.location.reload(false);
        })

        console.log(inputs)
    }

    const deleteLecons = (id) => {
          if(window.confirm("Voulez-vous supprimer cet élément?") == true){
        http.delete('/lecons/' + id).then(res => {
            fetchAllLecons();
        })
              alert('supprimé!');
    }
    }
    return (
        <>
            <div>
                <Row>

                    <Col xl="12" lg="12">
                        <Card>
                            <Card.Header className="d-flex justify-content-between mb-4">
                                <div className="header-title">
                                    <h4 className="card-title">{user.langue === "en" ? (<div> Choice a material </div>):(<div> Choisissez une matière </div>)}</h4>
                                </div>
                            </Card.Header>

                            <div className="bd-example ">
                                <div className="container">
                                    <Link className="btn btn-primary mb-2" to="/Eleve/Forum/Discussion/Mathématiques">Mathématiques</Link>
                                    {" "}
                                    <Link className="btn btn-primary mb-2" to="ok">Informatique</Link>
                                    {" "}
                                    <Link className="btn btn-primary mb-2" to="ok">Physique</Link>
                                    {" "}

                                    <Link className="btn btn-primary mb-2" to="ok">Chimie</Link>
                                    {" "}
                                    <Link className="btn btn-primary mb-2" to="ok">Technologie</Link>
                                    {" "}

                                    <Link className="btn btn-primary mb-2" to="ok">Français</Link>
                                    {" "}
                                    <Link className="btn btn-primary mb-2" to="ok">Anglais</Link>
                                    {" "}
                                    <Link className="btn btn-primary mb-2" to="ok">Histoire</Link >
                                    {" "}
                                    < Link className="btn btn-primary mb-2" to="ok" > Géographie</Link >
                                    {" "}

                                    < Link className="btn btn-primary mb-2" to="ok" > Allemand</Link >

                                    {" "}
                                    < Link className="btn btn-primary mb-2" to="ok" > Education Civique et Morale</Link >
                                    {" "}


                                    < Link className="btn btn-primary mb-2" to="ok" > Espagnol</Link >
                                    {" "}
                                    < Link className="btn btn-primary mb-2" to="ok" > Latin</Link >
                                    {" "}
                                </div>
                            </div >
                        </Card >
                    </Col >
                </Row >
            </div >
        </>
    )

}

export default EleveForumsMatieres;
