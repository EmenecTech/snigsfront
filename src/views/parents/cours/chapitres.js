import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Card from "../../../components/Card";

import { Link, useNavigate, useParams } from "react-router-dom";

import AuthUser from "../../../components/AuthUser";

const Parents_list_Chapitre = (props) => {
  const navigate = useNavigate();
  const { user, http } = AuthUser();
  const usersecond_id = user.second_id;

  const [inputs, setInputs] = useState({});
  const { matiere } = useParams();

  const etab = user.etablissement;
  const classe = user.other_in_user;

  //listChapitres
  const [Chapitres, setChapitres] = useState([]);

  useEffect(() => {
    fetchAllChapitres();
  }, []);

  const fetchAllChapitres = () => {
    http
      .get("/get_chapitres_classe/" + etab + "/" + classe + "/" + matiere)
      .then((res) => {
        setChapitres(res.data);
      });
  };

  //addLecons

  const handlechange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({
      ...values,
      [name]: value,
      etab,
      classe,
      matiere,
    }));
  };

  const submitForm = () => {
    http.post("/chapitres", inputs).then((res) => {
      window.location.reload(false);
    });
    console.log(inputs);
  };

  const deleteChapitres = (id) => {
      if(window.confirm("Voulez-vous supprimer cet élément?") == true){
    http.delete("/chapitres/" + id).then((res) => {
      fetchAllChapitres();
    });
        alert('Supprimé!');
  };
  }
  return (
    <>
      <div>
        <Row>
          <Col xl="12" lg="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">{user.langue === "en" ? (<div> Chapters </div>):(<div> Chapitres </div>)}</h4>
                </div>
              </Card.Header>
              <div className="table-responsive">
                <table
                  id="user-list-table"
                  className="table table-striped"
                  role="grid"
                  data-toggle="data-table"
                >
                  <thead>
                    <tr className="ligth">
                      <th>{user.langue === "en" ? (<div> Title </div>):(<div> intitulé </div>)}</th>
                      <th>{user.langue === "en" ? (<div> Number of hours  </div>):(<div> nombre d'heures </div>)}</th>
                      <th>{user.langue === "en" ? (<div> Start date </div>):(<div> date de début </div>)}</th>
                      <th>{user.langue === "en" ? (<div> End date </div>):(<div> date de fin </div>)}</th>
                      <th>{user.langue === "en" ? (<div> Description </div>):(<div> description </div>)}</th>
                      <th min-width="100px">{user.langue === "en" ? (<div> Action </div>):(<div> action </div>)}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Chapitres.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.intitule_chapitre}</td>
                        <td>{item.nombre_heure_chapitre} h</td>
                        <td>{item.date_debut_chapitre}</td>
                        <td>{item.date_fin_chapitre}</td>
                        <td>{item.description_chapitre}</td>

                        <td>
                          <div className="flex align-items-center list-user-action">
                            <Link
                              className="btn btn-sm btn-icon btn-info"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Edit"
                              data-original-title="Edit"
                              to={
                                "/Eleve/List/Lecons/Chapitres/Cours/" +
                                item.intitule_chapitre +
                                "/" +
                                matiere
                              }
                            >
                              {user.langue === "en" ? (<div> Consult </div>):(<div> consulter </div>)}
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Parents_list_Chapitre;
