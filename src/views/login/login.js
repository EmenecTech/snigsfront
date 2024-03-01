import React from 'react'
import { Row, Col, Image, Form, Button, ListGroup, } from 'react-bootstrap'
import { Link, Routes, Route, useNavigate } from 'react-router-dom'
import Card from '../../components/Card'


import auth1 from '../../assets/images/auth/01.png'
import logo from '../../assets/logos/logo.png'


import { useState } from 'react'
import AuthUser from '../../components/AuthUser'
import { HttpStatusCode } from 'axios'

export default function LoginSnigs() {
   const { http, setToken } = AuthUser();
   const [email, setEmail] = useState();
   const [password, setPassword] = useState();
   const [status, setStatus] = useState(null);
   const submitForm = () => {
      http.post('login', { email: email, password: password }).then((res) => {
         /* console.log(res.data); */
         setToken(res.data.user, res.data.access_token);
      })
       http.post('login', { email: email, password: password }).then(response => {
         console.log(response.status);
         setStatus(response.status); 
         setToken(response.data.user, response.data.access_token);
     }).catch(error => {
         console.error(error);
         
   if (error.response.status === 401) {
 
     alert('Vous n\'êtes pas autorisé à accéder à cette page.');

   } else if (error.response.status === 404) {

     alert('La page que vous recherchez est introuvable.');

   } else if (error.response.status === 500) {

     alert ( 'Vous avez des problèmes de connexion ');

   } else if (error.response.status === 504) {

     alert ('Vous avez des problèmes de connexion ');

   } else {

     alert ('Problème de connexion');
     
   }     
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
                                   
                                 </Row>
                                 <br/>
                                 <div className="d-flex justify-content-center">
                                    <Button onClick={submitForm} type="button" variant="btn btn-primary">Sign In</Button>
                                 </div>
                                 <br/>
         
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

