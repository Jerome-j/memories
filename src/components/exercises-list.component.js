
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CardDeck from 'react-bootstrap/CardDeck';
import axios from 'axios';
import CardColumns from 'react-bootstrap/CardColumns';

const Exercise = props => (
    // <tr>
    //     <td>{props.exercise.name}</td>
    //     <td>{props.exercise.description}</td>
    //     <td>{props.exercise.address}</td>
    //     <td>{props.exercise.date.substring(0, 10)}</td>
    //     <td>
    //         <Link to={"/edit/" + props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    //     </td>
    // </tr>

    <Card>
        <Card.Img variant="top" src={props.exercise.image[0]} />
        <Card.Body>
            <Card.Title>{props.exercise.name}</Card.Title>
            <Card.Text>
                {props.exercise.description}
            </Card.Text>
            {/* Button to hyperlink to specific user page */}
            <Link to={"/hawkers/" + props.exercise._id}><Button variant="primary" size="lg" block>View</Button></Link>

        </Card.Body>
    </Card>


)

export default class ExercisesList extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this)

        this.state = { exercises: [] };
    }

    componentDidMount() {
        console.log(process.env.REACT_APP_API_ADD);

        axios.get(process.env.REACT_APP_API_ADD + '/hawkers')
            .then(response => {
                this.setState({ exercises: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/' + id)
            .then(response => { console.log(response.data) });

        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList() {
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />;
        })
    }

    render() {
        return (
            <div>
                <h1>Browse all events</h1>


                <CardColumns>

                    {/* <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Stall</th>
                            <th>Description</th>
                            <th>Address</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody> */}
                    {this.exerciseList()}
                    {/* </tbody>
                </table> */}
                </CardColumns></div>
        )
    }
}