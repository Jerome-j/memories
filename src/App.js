import React from 'react';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route } from "react-router-dom";


// Components Import Statements
import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component";
import IndividualHawker from './components/view_individual_hawkers';
import AddHawker from './components/add-hawker';
import FirebaseUploader from './components/firebase-uploader';
import FirebaseUploaderMultiple from './components/firebase-uploader-multiple';



function App() {


  return (
    <Router>

      {/* Component Imports */}
      <Navbar />

      <Route path="memories/" exact component={ExercisesList} />
      <Route path="memories/hawkers/:id" component={IndividualHawker} />
      <Route path="memories/add-hawker" exact component={AddHawker} />
      <Route path="memories/firebase-uploader" exact component={FirebaseUploader} />
      <Route path="memories/firebase-uploader-multiple" exact component={FirebaseUploaderMultiple} />


    </Router>

  );
}

export default App;
