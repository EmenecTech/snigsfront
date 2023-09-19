import React from 'react'
import Index from '../views/dashboard/index'
// import { Switch, Route } from 'react-router-dom'
// user
import UserProfile from '../views/dashboard/app/user-profile';
import UserAdd from '../views/dashboard/app/user-add';
import UserList from '../views/dashboard/app/user-list';
// import userProfileEdit from '../views/dashboard/app/user-privacy-setting';
// widget
import Widgetbasic from '../views/dashboard/widget/widgetbasic';
import Widgetcard from '../views/dashboard/widget/widgetcard';
import Widgetchart from '../views/dashboard/widget/widgetchart';
// icon
import Solid from '../views/dashboard/icons/solid';
import Outline from '../views/dashboard/icons/outline';
import DualTone from '../views/dashboard/icons/dual-tone';
// Form
import FormElement from '../views/dashboard/from/form-element';
import FormValidation from '../views/dashboard/from/form-validation';
import FormWizard from '../views/dashboard/from/form-wizard';
// table
import BootstrapTable from '../views/dashboard/table/bootstrap-table';
import TableData from '../views/dashboard/table/table-data';

// map
import Vector from '../views/dashboard/maps/vector';
import Google from '../views/dashboard/maps/google';

//extra
// import PrivacyPolicy from '../views/dashboard/extra/privacy-policy';
// import TermsofService from '../views/dashboard/extra/terms-of-service';

//TransitionGroup
// import { TransitionGroup, CSSTransition } from "react-transition-group";
//Special Pages
import Billing from '../views/dashboard/special-pages/billing';
import Kanban from '../views/dashboard/special-pages/kanban';
import Pricing from '../views/dashboard/special-pages/pricing';
import Timeline from '../views/dashboard/special-pages/timeline';
import Calender from '../views/dashboard/special-pages/calender';
import RtlSupport from '../views/dashboard/special-pages/RtlSupport'

//admin
import Admin from '../views/dashboard/admin/admin';
import Default from '../layouts/dashboard/default';
import Dashboard_superadmin from '../views/super_admin/dashboard';
import Gestuser_superadmin from '../views/super_admin/utilisateurs/gestionusers';
import ListConfigurations from '../views/super_admin/etablissements/lis_configurations';
import AddConfiguration from '../views/super_admin/etablissements/add_configuration';
import ListEtablissements from '../views/super_admin/etablissements/list_etablissement';
import AddEtablissement from '../views/super_admin/etablissements/add_etablissement ';
import ListUtilisateurs from '../views/super_admin/utilisateurs/gestionusers';
import UtilisateursListe from '../views/super_admin/utilisateurs/gestionusers';
import AddUtilisateurs from '../views/super_admin/utilisateurs/add_user';
import ListPrivileges from '../views/super_admin/privileges/list_privileges';
import ListPrivilegesFondateur from '../views/fondateur/roles/privileges';
import RolesAdmin from '../views/fondateur/roles/roles';
import AddRole from '../views/fondateur/roles/add_roles';
import RolesPrivilegesAdmin from '../views/fondateur/roles/roles_privileges';
import MembreAdministration from '../views/fondateur/administration/list_membres';
import MembresAdministration from '../views/fondateur/administration/list_membres';
import AddMembreAdministration from '../views/fondateur/administration/add_membre';
import EntryData from '../views/data';
import ListNiveaux from '../views/fondateur/niveaux/listniveaux';
import ListClasses from '../views/fondateur/classes/listclasses';
import ListFilieres from '../views/fondateur/filieres/filieres';
import UniClasse from '../views/fondateur/classes/classe';
import ListMatieres from '../views/fondateur/matieres/matieres';
import NiveauxMatieres from '../views/fondateur/niveaux/niveaux_matieres';
import EnseignantsListe from '../views/fondateur/enseignants/listenseignants';
import AddEnseignant from '../views/fondateur/enseignants/addenseignant';
import ListPreinscriptions from '../views/fondateur/eleves/preinscriptions';
import InscriptionEleve from '../views/fondateur/eleves/inscrire_eleve';
import ListEvaluations from '../views/fondateur/evaluations/list_evaluations';
import ListProgramme from '../views/fondateur/programme/programme_list';
import ClassesProgrammes from '../views/fondateur/programme/classes_programme';
import EditClasseProgramme from '../views/fondateur/programme/edit_programme_classe';
import BulletinEleve from '../views/fondateur/bulletins/bulletin_eleve';
import EleveEditProfil from '../views/eleves/profil/edit';
import EleveListRequest from '../views/eleves/requetes/listrequest';
import EleveAddRequest from '../views/eleves/requetes/addrequest';
import ElevePlanningDetail from '../views/eleves/pedagogie/planning';
import EleveListPlanning from '../views/eleves/pedagogie/listplanning';
import EleveListEvaluations from '../views/eleves/bulletin_notes/evaluations';
import EleveBulletinNotes from '../views/eleves/bulletin_notes/marknotes';
import AdminListRequest from '../views/fondateur/requetes/list';
import Enseignant_matieres_chapitres from '../views/enseignant/chapitres/matieres';
import Enseignant_list_Chapitre from '../views/enseignant/chapitres/listchapitres';
import EnseignantLeconChapitre from '../views/enseignant/chapitres/lecons_chapitres';
import Enseignant_matieres_notes from '../views/enseignant/notes/listmatiere';
import EnseignantAddNote from '../views/enseignant/notes/noteseleves';
import EnseignantListEvaluations from '../views/enseignant/notes/notesevalutions';
import ElevesListEvaluationsNotes from '../views/eleves/pedagogie/notes/lisevaluations';
import EleveListNotesEval from '../views/eleves/pedagogie/notes/noteseleve';
import AdminListClassesNotes from '../views/fondateur/notes/listclasses';
import AdminListEvaluationsNotes from '../views/fondateur/notes/evaluations';
import AdminMatieresNotesEleves from '../views/fondateur/notes/matieres';
import AdminEditNotes from '../views/fondateur/notes/notes';
import EleveMatieresClasse from '../views/eleves/cours/matieres';
import Eleve_list_Chapitre from '../views/eleves/cours/chapitres';
import EleveLeconChapitre from '../views/eleves/cours/lecons';
import AdminListClassesCours from '../views/fondateur/cours/classes';
import AdminListMatieresCours from '../views/fondateur/cours/matieres';
import Admin_list_Chapitre from '../views/fondateur/cours/chapitres';
import AdminLeconsChapitre from '../views/fondateur/cours/lecons';
import Enseignant_cdtexte_periodesmatieres from '../views/enseignant/cdtexte/periodesmatieres';
import Enseignant_cdtexte_matieres from '../views/enseignant/cdtexte/listmatieresprof';
import Enseignant_cdtextes_Chapitres from '../views/enseignant/cdtexte/chapitres';
import Enseignant_Edit_CahierTexte from '../views/enseignant/cdtexte/remplissage';
import EnseignantAppel_cd_texte from '../views/enseignant/cdtexte/appel';
import Enseignant_planning from '../views/enseignant/pedagogie/planning';
import Enseignant_planning_periodesmatieres from '../views/enseignant/pedagogie/periodesmatieres';
import AdminlistdocumentsEleves from '../views/fondateur/documents/eleveslistdocuments';
import ElevelistdocumentsEleves from '../views/eleves/documents/listdocumentseleves';
import Mestests from '../views/mestest';
import EditEtablissement from '../views/fondateur/etablissement/edit_etablissement';
import EditMatieres from '../views/fondateur/matieres/edit_matieres';
import EditFilieres from "../views/fondateur/filieres/edit_filieres";
import Badge from '../views/eleves/documents/badge';
import Print from '../views/eleves/documents/print';
import ElevelistdocumentsElevesLoad from '../views/eleves/documents/documentload';
import ListPensions from '../views/fondateur/comptabilite/listpayements';
import EditPensions from '../views/fondateur/comptabilite/editpayements';
import EleveRegularite from '../views/eleves/regularite/ficheregularite';
import PayementsListNiveaux from '../views/fondateur/comptabilite/payementniveaux';
import PayementsListNiveauClasses from '../views/fondateur/comptabilite/payementclasse';
import PayementsListNiveauClasseEleves from '../views/fondateur/comptabilite/payementclasseeleves';
import PayementsListEleve from '../views/fondateur/comptabilite/payementseleve';
import AllNotes from '../views/enseignant/notes/allnotes';
import EditUsers from "../views/super_admin/utilisateurs/edit";
import EleveForumsMatieres from '../views/eleves/forum/forumatieres';
import EleveForumDiscussion from '../views/eleves/forum/forumdiscussion';


import ParentsBulletinNotes from "../views/parents/bulletin_notes/marknotes";
import Parents_list_Chapitre from "../views/parents/cours/chapitres";
import ParentsLeconChapitre from "../views/parents/cours/lecons";
import ParentsMatieresClasse from "../views/parents/cours/matieres";
import Badge_p from "../views/parents/documents/badge";
import ParentslistdocumentsElevesLoad from "../views/parents/documents/documentload";
import ParentslistdocumentsEleves from "../views/parents/documents/listdocumentseleves";
import Print_parent from "../views/parents/documents/print";
import ParentsListPlanning from "../views/parents/pedagogie/listplanning";
import ParentsListEvaluationsNotes from "../views/parents/pedagogie/notes/lisevaluations";
import ParentsListNotesEval from "../views/parents/pedagogie/notes/noteseleve";
import ParentsPlanningDetail from "../views/parents/pedagogie/planning";
import ParentsEditProfil from "../views/parents/profil/edit";
import ParentsAddRequest from "../views/parents/requetes/addrequest";
import ParentsListRequest from "../views/parents/requetes/listrequest";

import DisciplineListClasses from '../views/fondateur/discipline/classesdisicplines';
import DisciplineListClassesEleves from '../views/fondateur/discipline/classesdisicplineselevesclasse';
import DisciplineEleveInfo from '../views/fondateur/discipline/classesdisicplineselevesinfo';
import DisciplineInfoForEleve from '../views/eleves/discipline/infodiscipline';

import EditMembresAdministration from '../views/fondateur/administration/edit_membre';


import AdminlistdocumentsElevesClasses from '../views/fondateur/documents/elevesclassesdocuments';
import AdminlistdocumentsElevesLoad from '../views/fondateur/documents/eleveslistdocumentsload';
import DocumentsListNiveauClasseEleves from '../views/fondateur/documents/doumentsclasseeleves';
import AdminlistdocumentsOfEleves from '../views/fondateur/documents/documentsofelevesload';

//21/07/2023
import EditEleve from '../views/fondateur/classes/editeleves';
import EditEnseignants from '../views/fondateur/enseignants/editenseignants';
import ListSansclasse from '../views/fondateur/eleves/sans_classe';
//27/07/2023
import EditPrivilege from '../views/super_admin/privileges/edit_privileges';
import DisciplineInfoForParent from '../views/parents/discipline/discipline';

import AdminBulletinListEvaluations from '../views/fondateur/bulletins/evaluations';
import AdminEvaluationListClasses from '../views/fondateur/bulletins/classes';
import AdminEvaluationListClassesEleves from '../views/fondateur/bulletins/eleves';
import BulletinByEleve from '../views/fondateur/bulletins/bulletin_eleve';

import ListGroupes from '../views/fondateur/groupes_matieres/groupes_matieres';




export const DefaultRouter = [
    {
        path: '/',
        element: <Default />,
        children: [

            {
                path: 'Dashboard/',
                element: <Dashboard_superadmin />
            },
            {
                path: 'Mes tests/',
                element: <Mestests />
            },

            {
                path: 'dashboard/loadata',
                element: <EntryData />
            },
            {
                path: 'gestion/users/super/admin',
                element: <Gestuser_superadmin />
            },

            /////////////////////////////////////////////////super admin
            {
                path: 'etablissement/configurations/list/super/admin',
                element: <ListConfigurations />
            },

            {
                path: 'etablissement/configurations/add/super/admin',
                element: <AddConfiguration />
            },
            {
                path: 'etablissement/list/super/admin',
                element: <ListEtablissements />
            },
            {
                path: 'etablissement/add/super/admin',
                element: <AddEtablissement />
            },
            {
                path: 'etablissement/edit/super/admin',
                element: <EditEtablissement />
            },
            {
                path: 'superAdmin/list/privileges',
                element: <ListPrivileges />
            },
            {
                path: 'utilisateurs/list/super/admin',
                element: <UtilisateursListe />
            },
            {
                path: 'utilisateurs/add/super/admin',
                element: <AddUtilisateurs />
            },

    //27/07/2023
            {
                path: 'superAdmin/edit/privileges/:id',
                element: <EditPrivilege />

            },

            //////////////////////////////////////////////Fondateur
            {
                path: 'Admin/Evaluation/Marks/Notes/',
                element: <AdminBulletinListEvaluations />
            },
            {
                path: '/Admin/Classes/Bulletin/Notes/:evaluation',
                element: <AdminEvaluationListClasses />
            },
            {
                path: '/Admin/Bulletin/:evaluation/:classe/Eleve',
                element: <AdminEvaluationListClassesEleves />
            },
            {
                path: '/Admin/Bulletin/:evaluation/:classe/:userid/Notes',
                element: < BulletinByEleve/>
            },
    
            //////
            {
                path: 'Admin/list/privileges',
                element: <ListPrivilegesFondateur />
            },
            ///////
            {
                path: 'Admin/list/roles',
                element: <RolesAdmin />
            },
            {
                path: 'Admin/add/role',
                element: <AddRole />
            },
            {
                path: 'Admin/list/privileges/roles/:role/:id_role',
                element: <RolesPrivilegesAdmin />
            },
            ///////
            {
                path: 'Admin/list/',
                element: <MembresAdministration />
            },
            {
                path: 'Admin/add/',
                element: <AddMembreAdministration />
            },
            ///////20/07/2023
            {
                path: '/Admin/edit/membres_administration/:id',
                element: <EditMembresAdministration />,
            },
            ///20/07/2023
            {
                path: '/Admin/edit/enseignants/:id',
                element: <EditEnseignants />,
            },
            ///////
            {
                path: 'List/niveaux/',
                element: <ListNiveaux />
            },
            {
                path: 'List/matieres/niveaux/:niveau',
                element: <NiveauxMatieres />
            },
            ///////
            {
                path: 'List/classes/',
                element: <ListClasses />
            },
            {
                path: 'List/filieres/',
                element: <ListFilieres />
            },
            {
                path: 'Details/classe/:niveau/:classe',
                element: <UniClasse />
            },

            //////
            {
                path: 'List/matieres/',
                element: <ListMatieres />
            },
            {
                path: 'Edit/matieres/:id',
                element: <EditMatieres />
            },
            //////
            {   path: 'List/groupes/',
                element: <ListGroupes />
            },
            //////
            {
                path: 'List/enseignants/',
                element: <EnseignantsListe />
            },
            {
                path: 'Add/enseignants/',
                element: <AddEnseignant />
            },
            //////
            {
                path: 'List/princriptions/',
                element: <ListPreinscriptions />
            },
            {
                path: 'Inscription/:niveau/:id',
                element: <InscriptionEleve />
            },
            //////
            {
                path: 'List/evaluations/',
                element: <ListEvaluations />
            },
            //////
            {
                path: 'List/programmes/',
                element: <ListProgramme />
            },
            {
                path: 'Classes/programmes/:idprogramme',
                element: <ClassesProgrammes />
            },
            {
                path: 'Edit/programmes/:niveau/:classe/:idprogramme',
                element: <EditClasseProgramme />
            },
            //////
            {
                path: 'List/Classes/Notes/',
                element: <AdminListClassesNotes />
            },
            {
                path: 'Admin/List/Evaluations/Notes/:niveau/:classe',
                element: <AdminListEvaluationsNotes />
            },
            {
                path: 'Admin/List/Matieres/Notes/:niveau/:classe/:evaluation',
                element: <AdminMatieresNotesEleves />
            },
            {
                path: 'Admin/Edit/Notes/:niveau/:classe/:evaluation/:matiere',
                element: <AdminEditNotes />
            },
            ///
            {
                path: 'ReportMark/',
                element: <BulletinEleve />
            },
            ///
            {
                path: 'List/Requetes/:role',
                element: <AdminListRequest />
            },
            ///
            {
                path: 'Admin/List/Classes/Cours/',
                element: <AdminListClassesCours />
            },
            {
                path: 'Admin/List/Matieres/Cours/:niveau/:classe',
                element: <AdminListMatieresCours />
            },
            {
                path: 'Admin/List/Chapitres/Cours/:niveau/:classe/:matiere',
                element: <Admin_list_Chapitre />
            },
            {
                path: 'Admin/List/Lecons/Cours/:niveau/:classe/:matiere/:chapitre',
                element: <AdminLeconsChapitre />
            },
            ////
            {
                path: 'Admin/List/Documents/Eleves/',
                element: <AdminlistdocumentsEleves />
            },
    
            /////////14/07/2023
            {
                path: 'Admin/list/classes/documents/:niveau/:idoc',
                element: <AdminlistdocumentsElevesClasses />
            },
            {
                path: 'Admin/list/classes/load/documents/:niveau/:idoc',
                element: <AdminlistdocumentsElevesLoad />
            },
            {
                path: 'Document/list/classes/eleves/documents/:niveau/:classe/:idoc',
                element: <DocumentsListNiveauClasseEleves />
            },
            {
                path: 'Document/Of/classes/eleves/:ideleve/:idoc',
                element: <AdminlistdocumentsOfEleves />
            },
            ////Pensions
            {
                path: 'Admin/Comptabilite/List/',
                element: <ListPensions />
            },
            {
                path: 'Admin/Comptabilite/Edit/:idpension',
                element: <EditPensions />
            },
            {
                path: 'Payement/List/Niveau/',
                element: <PayementsListNiveaux />
            },
            {
                path: 'Payement/List/Niveau/Classes/:niveau',
                element: <PayementsListNiveauClasses />
            },

            {
                path: 'Payement/List/Niveau/Classes/:niveau/:classe',
                element: <PayementsListNiveauClasseEleves />
            },
            {
                path: 'Payements/List/Eleve/Classes/:niveau/:classe/:ideleve/:idpension',
                element: <PayementsListEleve />
            },
            ////Discipline
            {
                path: 'Discipline/List/classes',
                element: <DisciplineListClasses />
            },
            {
                path: 'Discipline/List/classes/Eleves/:classe',
                element: <DisciplineListClassesEleves />
            },
            {
                path: 'Discipline/List/classes/Eleves/Info/:id/:classe',
                element: <DisciplineEleveInfo />
            },

     ////edit_eleve 20/07/2023
            {
                path: 'Edit/:niveau/:id',
                element: <EditEleve />

            },

            ///////////////////////////////////////////////////////////////////////////Eleves
            ////////////
            {
                path: 'Eleve/Edit/Profil/:id',
                element: <EleveEditProfil />
            },
            {
                path: 'Discipline/Info',
                element: <DisciplineInfoForEleve />
            },


            {
                path: 'badge',
                element: <Badge />
            },

            {
                path: 'print',
                element: <Print />
            },

            {
                path: 'Eleve/Request/List/',
                element: <EleveListRequest />
            },
            {
                path: 'Eleve/Request/Add/',
                element: <EleveAddRequest />
            },
            /////
            {
                path: 'Eleve/List/Planning/',
                element: <EleveListPlanning />
            },
            {
                path: 'Eleve/Planning/Detail/:idprogramme/:intituleprogramme',
                element: <ElevePlanningDetail />
            },
            /////
            {
                path: 'Eleve/List/Evaluations/Notes',
                element: <ElevesListEvaluationsNotes />
            },
            {
                path: 'Eleve/List/Notes/Evaluation/:evaluation',
                element: <EleveListNotesEval />
            },
            ////
            {
                path: 'Eleve/List/Evaluations/',
                element: <EleveListEvaluations />
            },
            {
                path: 'Eleve/Bulletin/Notes/:evaluation',
                element: <EleveBulletinNotes />
            },
            ////
            {
                path: 'Eleve/List/Matieres/Cours',
                element: <EleveMatieresClasse />
            },
            {
                path: 'Eleve/List/Chapitres/Cours/:matiere',
                element: <Eleve_list_Chapitre />
            },
            {
                path: 'Eleve/List/Lecons/Chapitres/Cours/:chapitre/:matiere',
                element: <EleveLeconChapitre />
            },
            ////
            {
                path: 'Eleve/List/Documents/',
                element: <ElevelistdocumentsEleves />
            },

        
            {
                path: 'Eleve/Load/Documents/:idoc',
                element: <ElevelistdocumentsElevesLoad />
            },
            {
                path: 'Eleve/Regularite',
                element: <EleveRegularite />
            },

    ////21/07/2023
            {
                path: 'List/SansClasse',
                element: <ListSansclasse />
            },
    //27/07/2023
            {
                path: 'Parent/Discipline/Info',
                element: <DisciplineInfoForParent />
            },

            ///////////

    ///////////////////////////////////////////////////////parents

      {
        path: "Parents/Edit/Profil/:id",
        element: <ParentsEditProfil />,
      },

      {
        path: "Parents/Request/List/",
        element: <ParentsListRequest />,
      },
      {
        path: "print",
        element: <Print_parent />,
      },

      {
        path: "badge",
        element: <Badge_p />,
      },

      {
        path: "Parents/Request/List/",
        element: <ParentsAddRequest />,
      },
      /////////
      {
        path: "Parents/List/Planning/",
        element: <ParentsListPlanning />,
      },
      {
        path: "Parents/Planning/Detail/:idprogramme/:intituleprogramme",
        element: <ParentsPlanningDetail />,
      },
      /////
      {
        path: "Parents/List/Evaluations/Notes",
        element: <ParentsListEvaluationsNotes />,
      },
      {
        path: "Parents/List/Notes/Evaluation/:evaluation",
        element: <ParentsListNotesEval />,
      },
      ////

      {
        path: "Parents/Bulletin/Notes/:evaluation",
        element: <ParentsBulletinNotes />,
      },
      ////
      {
        path: "Parents/List/Matieres/Cours",
        element: <ParentsMatieresClasse />,
      },
      {
        path: "Parents/List/Chapitres/Cours/:matiere",
        element: <Parents_list_Chapitre />,
      },
      {
        path: "Parents/List/Lecons/Chapitres/Cours/:chapitre/:matiere",
        element: <ParentsLeconChapitre />,
      },
      ////
      {
        path: "Parents/List/Documents/",
        element: <ParentslistdocumentsEleves />,
      },

      {
        path: "Parents/Load/Documents/:etab/:userid/:idoc",
        element: <ParentslistdocumentsElevesLoad />,
      },
    //////


            /////////////////////////////////////////////////////////Enseignant

            ///chapitres
            {
                path: 'Enseignant/Matieres/Chapitres',
                element: <Enseignant_matieres_chapitres />
            },
            {
                path: 'Enseignant/List/Chapitres/:classe/:matiere',
                element: <Enseignant_list_Chapitre />
            },
            {
                path: 'Enseignant/List/Lecons/:chapitre/:classe/:matiere',
                element: <EnseignantLeconChapitre />
            },
            ////notes
            {
                path: 'Enseignant/Matieres/Notes',
                element: <Enseignant_matieres_notes />
            },
            {
                path: 'Enseignant/List/Notes/:evaluation/:classe/:matiere',
                element: <EnseignantAddNote />
            },
            {
                path: 'Enseignant/List/Evaluations/:niveau/:classe/:matiere',
                element: <EnseignantListEvaluations />
            },
            ////Cahier de texte
            {
                path: 'Enseignant/Planning/',
                element: <Enseignant_planning />
            },
            {
                path: 'Enseignant/Planning/Periodes/Matieres/:niveau/:classe/:matiere',
                element: <Enseignant_planning_periodesmatieres />
            },
            ////Cahier de texte
            {
                path: 'Enseignant/Text/Book/Matieres/',
                element: <Enseignant_cdtexte_matieres />
            },
            {
                path: 'Enseignant/Text/Book/Periodes/Matieres/:classe/:matiere',
                element: <Enseignant_cdtexte_periodesmatieres />
            },

            {
                path: 'Enseignant/Text/Book/Chapitres/Matiere/:classe/:matiere/:idperiode',
                element: <Enseignant_cdtextes_Chapitres />
            },
            {
                path: 'Enseignant/Edit/Text/Book/:classe/:matiere/:chapitre/:idperiode',
                element: <Enseignant_Edit_CahierTexte />
            },
            {
                path: 'Enseignant/Appel/Text/Book/:classe/:matiere/:chapitre/:idperiode/:idtexte',
                element: <EnseignantAppel_cd_texte />
            },
            {
                path: 'Enseignant/Bordereau/:classe/:matiere',
                element: <AllNotes />
            },
              /////////////////////////////////07/07/2023
              {
                path: "/Edit/filières/:id",
                element: <EditFilieres />,
              },
        
              /////////////////////////////////07/07/2023
              {
                path: "/Edit/users/:id",
                element: <EditUsers />,
              },
                {
                    path: 'Eleve/Forum/Matieres',
                    element: <EleveForumsMatieres />
                },
                {
                    path: 'Eleve/Forum/Discussion/:matiere',
                    element: <EleveForumDiscussion />
                },

            ////////////////
            {
                path: 'dashboard/special-pages/billing',
                element: <Billing />
            },
            {
                path: 'dashboard/special-pages/calender',
                element: <Calender />
            },
            {
                path: 'dashboard/special-pages/kanban',
                element: <Kanban />
            },
            {
                path: 'dashboard/special-pages/pricing',
                element: <Pricing />
            },
            {
                path: 'dashboard/special-pages/timeline',
                element: <Timeline />
            },
            {
                path: 'dashboard/special-pages/rtl-support',
                element: <RtlSupport />,
            },
            {
                path: 'dashboard/app/user-profile',
                element: <UserProfile />
            },
            {
                path: 'dashboard/app/user-add',
                element: <UserAdd />
            },
            {
                path: 'dashboard/app/user-list',
                element: <UserList />
            },
            {
                path: 'dashboard/admin/admin',
                element: <Admin />
            },
            // Widget
            {
                path: 'dashboard/widget/widgetbasic',
                element: <Widgetbasic />
            },
            {
                path: 'dashboard/widget/widgetchart',
                element: <Widgetchart />
            },
            {
                path: 'dashboard/widget/widgetcard',
                element: <Widgetcard />
            },
            // Map
            {
                path: 'dashboard/map/google',
                element: <Google />
            },
            {
                path: 'dashboard/map/vector',
                element: <Vector />
            },
            // Form
            {
                path: 'dashboard/form/form-element',
                element: <FormElement />
            },
            {
                path: 'dashboard/form/form-wizard',
                element: <FormWizard />
            },
            {
                path: 'dashboard/form/form-validation',
                element: <FormValidation />
            },
            // Table
            {
                path: 'dashboard/table/bootstrap-table',
                element: <BootstrapTable />
            },
            {
                path: 'dashboard/table/table-data',
                element: <TableData />
            },
            // Icon
            {
                path: 'dashboard/icon/solid',
                element: <Solid />
            },
            {
                path: 'dashboard/icon/outline',
                element: <Outline />
            },
            {
                path: 'dashboard/icon/dual-tone',
                element: <DualTone />
            }
        ]
    }
]
// const DefaultRouter = () => {
//     return (
//         <TransitionGroup>
//             <CSSTransition classNames="fadein" timeout={300}>
//                 <Switch>
//                     <Route path="/dashboard" exact component={Index} />
//                     {/* user */}
//                     <Route path="/dashboard/app/user-profile"     exact component={UserProfile} />
//                     <Route path="/dashboard/app/user-add"         exact component={UserAdd}/>
//                     <Route path="/dashboard/app/user-list"        exact component={UserList}/>
//                     <Route path="/dashboard/app/user-privacy-setting" exact component={userProfileEdit}/>
//                      {/* widget */}
//                      <Route path="/dashboard/widget/widgetbasic"   exact component={Widgetbasic}/>
//                      <Route path="/dashboard/widget/widgetcard"    exact component={Widgetcard}/>
//                      <Route path="/dashboard/widget/widgetchart"   exact component={Widgetchart}/>
//                      {/* icon */}
//                      <Route path="/dashboard/icon/solid"           exact component={Solid}/>
//                      <Route path="/dashboard/icon/outline"         exact component={Outline}/>
//                      <Route path="/dashboard/icon/dual-tone"       exact component={DualTone}/>
//                      {/* From */}
//                      <Route path="/dashboard/form/form-element"    exact component={FormElement}/>
//                      <Route path="/dashboard/form/form-validation" exact component={FormValidation}/>
//                      <Route path="/dashboard/form/form-wizard"     exact component={FormWizard}/>
//                      {/* table */}
//                      <Route path="/dashboard/table/bootstrap-table" exact component={BootstrapTable}/>
//                      <Route path="/dashboard/table/table-data"      exact component={TableData}/>
//                      {/*special pages */}
//                      <Route path="/dashboard/special-pages/billing" exact component={Billing}/>
//                      <Route path="/dashboard/special-pages/kanban" exact component={Kanban}/>
//                      <Route path="/dashboard/special-pages/pricing" exact component={Pricing}/>
//                      <Route path="/dashboard/special-pages/timeline" exact component={Timeline}/>
//                      <Route path="/dashboard/special-pages/calender" exact component={Calender}/>
//                      {/* map */}
//                      <Route path="/dashboard/map/vector" exact component={Vector}/>
//                      <Route path="/dashboard/map/google" exact component={Google}/>
//                      {/* extra */}
//                      <Route path="/dashboard/extra/privacy-policy" exact component={PrivacyPolicy}/>
//                      <Route path="/dashboard/extra/terms-of-service" exact component={TermsofService}/>
//                      {/*admin*/}
//                      <Route path="/dashboard/admin/admin" exact component={Admin}/>
//                 </Switch>
//             </CSSTransition>
//         </TransitionGroup>
//     )
// }

// export default DefaultRouter
