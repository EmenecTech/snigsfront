import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Col, Form, Image, Row } from "react-bootstrap";
import QRCode from "react-qr-code";
import AuthUser from "../../../components/AuthUser";

const Badge_p = () => {
  const { user } = AuthUser();

  return (
    <div className="Badge">
      <Row>
        <Col sm="8">
          <Card>
            <Col
              sm="12"
              className="d-flex align-items-center justify-content-center mt-2 mb-3"
            >
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
                  </div>
                </Col>
                <Col
                  sm="6"
                  className="mt-4
                                
                                
                                
                                
                                
                                "
                >
                  {" "}
                  <div className="col-sm-12 justify-content-center">
                    <h6 className="text-center">
                     LES ROSSIGLOS MAJORS   
                    </h6>
                  </div>
                  <div className="col-sm-12 justify-content-center">
                    <h6 className="text-center">
                     THE MAJOR ROSSIGLOS
                    </h6>
                  </div>{" "}
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
                              Nom:
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
export default Badge_p;
