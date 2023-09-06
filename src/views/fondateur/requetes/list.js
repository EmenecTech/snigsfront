import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import http from "../../../http";
import AuthUser from "../../../components/AuthUser";


const AdminListRequest = () => {
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
             alert('Supprimé!');
    };
    };

    return (
        <Card>
            <div>


                <Card.Header className="d-flex justify-content-between">
                    <div className="header-title">
                        <h4 className="card-title"> {user.langue === "en" ? (<div>Requests </div>):(<div>Requêtes</div>)}</h4>
                    </div>

                </Card.Header>
                <Card.Body>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>{user.langue === "en" ? (<div>Object </div>):(<div>Objet </div>)}</th>
                                <th> {user.langue === "en" ? (<div>State</div>):(<div>Etat</div>)}</th>
                                <th>{user.langue === "en" ? (<div>Sending date</div>):(<div>Date d'envoi</div>)}</th>
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
export default AdminListRequest;
