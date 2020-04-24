import React, { Component } from 'react';
import axios from 'axios';
// import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
// import Image from 'react-bootstrap/Image'
// import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
// import SimpleImageSlider from "react-simple-image-slider";
// import "~react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css'

export default class IndividualHawker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            telephone: '',
            title_image: '',
            address: '',
            date: new Date(),
            image: [],
        }
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_API_ADD + '/hawkers/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    description: response.data.description,
                    duration: response.data.duration,
                    date: new Date(response.data.date),
                    title_image: response.data.title_image,
                    image: response.data.image,
                    address: response.data.address
                })
            })
            .catch(function (error) {
                console.log(error);
            })

        console.log(this.state.image);


    }


    render() {

        var images = this.state.image.map(function (val, index) {
            return { original: val, thumbnail: val };
        })


        // const images = [
        //     {
        //         original: 'https://picsum.photos/id/1018/1000/600/',
        //         thumbnail: 'https://picsum.photos/id/1018/250/150/',
        //     },
        //     {
        //         original: 'https://picsum.photos/id/1015/1000/600/',
        //         thumbnail: 'https://picsum.photos/id/1015/250/150/',
        //     },
        //     {
        //         original: 'https://picsum.photos/id/1019/1000/600/',
        //         thumbnail: 'https://picsum.photos/id/1019/250/150/',
        //     },
        // ];


        return (


            <div>



                <Row debug>
                    <Col md={7} debug>
                        <ImageGallery items={images} />;
                    </Col>


                    <Col md={4} debug> <h1>{this.state.name}</h1>
                        <h5>{this.state.description}</h5>
                        <br></br>
                        <h5>Address: {this.state.address}</h5>
                    </Col>
                </Row>








            </div>
        )
    }
}
