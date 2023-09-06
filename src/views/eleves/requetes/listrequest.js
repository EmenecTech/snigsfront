import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import http from "../../../http";
import AuthUser from "../../../components/AuthUser";


const EleveListRequest = () => {
    const { user, http } = AuthUser();

    const userid = user.id;
    const [requete, setRequete] = useState([]);
    useEffect(() => {
        fetchAllUsers();
    }, []);

    const fetchAllUsers = () => {
        http.get("/eleve_get_requetes/" + userid).then((res) => {
            setRequete(res.data);
        });
    };




    const deleteUser = (id) => {
          if(window.confirm("Voulez-vous supprimer cet élément?") == true){
        http.delete("/eleve_requetes/" + id).then((res) => {
            fetchAllUsers();
        });
              alert('supprimé!');
    };
    };

    return (
        <Card>
            <div>


                <Card.Header className="d-flex justify-content-between">

                    {user.langue === "en" ? (<div>
        

                        <div className="header-title">
                            <h4 className="card-title">Requests</h4>
                        </div>
                        <Link to="/Eleve/Request/Add/">
                            <Button className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3">
                                <i className="btn-inner">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                            values="Requete"
                                        />
                                    </svg>
                                </i>
                                <span>New Request</span>
                            </Button>
        
                            </Link>
                        </div>):(<div>


                        <div className="header-title">
                            <h4 className="card-title">Requêtes</h4>
                        </div>
                        <Link to="/Eleve/Request/Add/">
                            <Button className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3">
                                <i className="btn-inner">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                            values="Requete"
                                        />
                                    </svg>
                                </i>
                                <span>Nouvelle Requete</span>
                            </Button>
                            </Link>
                    </div>)}
                    
                
                </Card.Header>
                <Card.Body>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Objet</th>
                                <th>Etat</th>
                                <th>Date d'envoi</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requete.map((requete, index) => (
                                <tr key={requete.id}>
                                    <td>{++index}</td>
                                    <td>{requete.motif_requete}</td>

                                    <td>{requete.etat_requete === "wait" ? (<div><span className="badge rounded-pill bg-info ">En attente</span></div>) : ""} </td>
                                    <td>{requete.objet_requete}</td>
                                    <td>
                                        {requete.date_envoi}
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => {
                                                deleteUser(requete.id);
                                            }}
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card.Body>
            </div>
        </Card >
    );
};
export default EleveListRequest;
