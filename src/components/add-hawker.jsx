import React, { Component } from 'react';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import ImageGallery from 'react-image-gallery';
import Alert from 'react-bootstrap/Alert';

export default class CreateExercise extends React.Component {


    constructor(props) {
        super(props); // must start with this

        // Databinding
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeTelephone = this.onChangeTelephone.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeTitleImage = this.onChangeTitleImage.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);

        this.onSubmit = this.onSubmit.bind(this);


        // Variables in React
        this.state = {
            name: '',
            description: '',
            telephone: '',
            // title_image: '',
            address: '',
            date: new Date(),
            images: [],
            image: [],
            filenames: [],
            downloadURLs: [],
            isUploading: false,
            uploadProgress: 0,
            success: false
        }

        console.log(this.state);
    }



    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeTelephone(e) {
        this.setState({
            telephone: e.target.value
        });
    }

    onChangeTitleImage(e) {
        this.setState({
            title_image: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
    }


    onChangeImage(e) {
        console.log(`on change image called`)
        this.setState({
            image: e.target.value
        });

        this.state.images = this.state.image.map(function (val, index) {
            return { original: val, thumbnail: val };
        })

    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }


    handleUploadSuccess = async filename => {
        const downloadURL = await firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL();

        this.setState(oldState => ({
            filenames: [...oldState.filenames, filename],
            downloadURLs: [...oldState.downloadURLs, downloadURL],
            uploadProgress: 100,
            isUploading: false,
            image: [...oldState.downloadURLs, downloadURL],
            images: [...oldState.images, { original: downloadURL, thumbnail: downloadURL }],
            success: true
        }));

        console.log(this.state)
    };


    onSubmit(e) {
        e.preventDefault(); // prevent default html behaviour

        const exercise = {
            name: this.state.name,
            description: this.state.description,
            date: this.state.date,
            title_image: this.state.title_image,
            image: this.state.image,
            address: this.state.address,
            telephone: this.state.telephone
        }

        console.log(exercise);

        axios.post(process.env.REACT_APP_API_ADD + '/hawkers', exercise)
            .then(res => console.log(res.data));

        window.location = '/'; // Go back to the list of exercise
    }


    render() {
        return <div>
            <h3>Add a hawker store here!</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Name: </label>

                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.name}
                        onChange={this.onChangeName}
                    />

                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                    />
                </div>
                <div className="form-group">
                    <label>Telephone: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.telephone}
                        onChange={this.onChangeTelephone}
                    />
                </div>

                <div className="form-group">
                    <label>Address: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.address}
                        onChange={this.onChangeAddress}
                    />
                </div>

                <div className="form-group">
                    <label>Date started: </label>
                    <div>
                        <DatePicker
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                        />
                    </div>
                </div>


                {/* <div className="form-group">
                    <label>Image: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.image}
                        onChange={this.onChangeImage}
                    />
                </div> */}

                <div className="form-group">
                    <label>Title Image: </label>
                    <FileUploader
                        accept="image/*"
                        name="image-uploader-multiple"
                        randomizeFilename
                        storageRef={firebase.storage().ref("images")}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                        onProgress={this.handleProgress}
                        multiple
                    />

                    <p>Progress: {this.state.uploadProgress}</p>

                    <p>Filenames: {this.state.filenames.join(", ")}</p>

                    {/* <div>
                        {this.state.downloadURLs.map((downloadURL, i) => {
                            return <img key={i} src={downloadURL} />;
                        })}
                    </div> */}

                    {this.state.success && <Alert variant="success">
                        Image successfully uploaded.
                        {/* <Alert.Link href="#">an example link</Alert.Link>. Give it a click if you */}
                        {/* like. */}
                    </Alert>
                    }
                    {<ImageGallery items={this.state.images} bulletOnClick={console.log(`test`)} />}



                </div>

                <div className="form-group">
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>;
    }
}