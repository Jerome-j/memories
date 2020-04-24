import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import ImageGallery from 'react-image-gallery';

// https://www.npmjs.com/package/react-firebase-file-uploader
export default class Navbar extends Component {


    state = {
        filenames: [],
        downloadURLs: [],
        isUploading: false,
        uploadProgress: 0,
        images: []
    };

    handleUploadStart = () =>
        this.setState({
            isUploading: true,
            uploadProgress: 0
        });

    handleProgress = progress =>
        this.setState({
            uploadProgress: progress
        });

    handleUploadError = error => {
        this.setState({
            isUploading: false
            // Todo: handle error
        });
        console.error(error);
    };

    handleUploadSuccess = async filename => {
        const downloadURL = await firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL();

        this.setState(oldState => ({
            filenames: [...oldState.filenames, filename],
            downloadURLs: [...oldState.downloadURLs, downloadURL],
            images: [...oldState.images, { original: downloadURL, thumbnail: downloadURL }],
            uploadProgress: 100,
            isUploading: false
        }));

        console.log(this.state)
    };




    render() {



        return (
            <div>
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



                < ImageGallery items={this.state.images} />




            </div>
        );
    }
}