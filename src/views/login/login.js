import React from 'react'
import { Row, Col, Image, Form, Button, ListGroup, } from 'react-bootstrap'
import { Link, Routes, Route, useNavigate } from 'react-router-dom'
import Card from '../../components/Card'

import facebook from '../../assets/images/brands/fb.svg'
import google from '../../assets/images/brands/gm.svg'
import instagram from '../../assets/images/brands/im.svg'
import linkedin from '../../assets/images/brands/li.svg'
import auth1 from '../../assets/images/auth/01.png'
import logo from '../../assets/logos/logo.png'


import { useState } from 'react'
import AuthUser from '../../components/AuthUser'
import { HttpStatusCode } from 'axios'

export default function LoginSnigs() {
   const { http, setToken } = AuthUser();
   const [email, setEmail] = useState();

   const [password, setPassword] = useState();
   const [status, setStatus] = useState(null)
   const submitForm = () => {
      http.post('login', { email: email, password: password }).then((res) => {
         /* console.log(res.data); */
         setToken(res.data.user, res.data.access_token);
      })
      http.post('login', { email: email, password: password }).then(response => {
            console.log(response.status);
            setStatus(response.status);
            if (!response.status){
                alert('ok');
            }
            alert(`HTTP status: ${response.status}`);
            setToken(response.data.user, response.data.access_token);
            navigate('/Main');
        }).catch(error => {
            console.error(error);
            });
   }
   let history = useNavigate()
   return (
      <>
         <section className="login-content">
            <Row className="m-0 align-items-center bg-white vh-100">
               <Col md="6">
                  <Row className="justify-content-center">
                     <Col md="10">
                        <Card className="card-transparent shadow-none d-flex justify-content-center mb-0 auth-card">
                           <Card.Body>
                              <Link to="/dashboard" className="navbar-brand d-flex align-items-center mb-3">

                              </Link>
                              <h2 className="mb-2 text-center"> <Image src={logo} height="100" /> <br />  <br /> Connexion</h2>

                              <Form>
                                 <Row>
                                    <Col lg="12">
                                       <Form.Group className="form-group">
                                          <Form.Label htmlFor="email" className="">Email</Form.Label>
                                          <Form.Control type="email" className="" aria-describedby="email" placeholder=" " onChange={e => setEmail(e.target.value)} id="email" />
                                       </Form.Group >
                                    </Col>
                                    <Col lg="12" className="">
                                       <Form.Group className="form-group">
                                          <Form.Label htmlFor="password" className="">Password</Form.Label>
                                          <Form.Control type="password" className="" aria-describedby="password" placeholder=" " onChange={e => setPassword(e.target.value)} id="password" />
                                       </Form.Group>
                                    </Col>
                                    <Col lg="12" className="d-flex justify-content-between">
                                       <Form.Check className="form-check mb-3">
                                          <Form.Check.Input type="checkbox" id="customCheck1" />
                                          <Form.Check.Label htmlFor="customCheck1">Remember Me</Form.Check.Label>
                                       </Form.Check>
                                       <Link to="/auth/recoverpw">Forgot Password?</Link>
                                    </Col>
                                 </Row>
                                 <div className="d-flex justify-content-center">
                                    <Button onClick={submitForm} type="button" variant="btn btn-primary">Sign In</Button>
                                 </div>
                                 <p className="text-center my-3">or sign in with other accounts?</p>
                                 <div className="d-flex justify-content-center">
                                    <ListGroup as="ul" className="list-group-horizontal list-group-flush">
                                       <ListGroup.Item as="li" className="border-0 pb-0">
                                          <Link to="#"><Image src={facebook} alt="fb" /></Link>
                                       </ListGroup.Item>
                                       <ListGroup.Item as="li" className="border-0 pb-0">
                                          <Link to="#"><Image src={google} alt="gm" /></Link>
                                       </ListGroup.Item>
                                       <ListGroup.Item as="li" className="border-0 pb-0">
                                          <Link to="#"><Image src={instagram} alt="im" /></Link>
                                       </ListGroup.Item>
                                       <ListGroup.Item as="li" className="border-0 pb-0">
                                          <Link to="#"><Image src={linkedin} alt="li" /></Link>
                                       </ListGroup.Item>
                                    </ListGroup>
                                 </div>

                              </Form>
                           </Card.Body>
                        </Card>
                     </Col>
                  </Row>
                  <div className="sign-bg">
                     <svg width="280" height="230" viewBox="0 0 431 398" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.05">
                           <rect x="-157.085" y="193.773" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 -157.085 193.773)" fill="#3B8AFF" />
                           <rect x="7.46875" y="358.327" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 7.46875 358.327)" fill="#3B8AFF" />
                           <rect x="61.9355" y="138.545" width="310.286" height="77.5714" rx="38.7857" transform="rotate(45 61.9355 138.545)" fill="#3B8AFF" />
                           <rect x="62.3154" y="-190.173" width="543" height="77.5714" rx="38.7857" transform="rotate(45 62.3154 -190.173)" fill="#3B8AFF" />
                        </g>
                     </svg>
                  </div>
               </Col>
               <Col md="6" className="d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
                  <Image src={auth1} className="Image-fluid gradient-main animated-scaleX" alt="images" />
               </Col>
            </Row>
         </section>

      </>
   )


}

