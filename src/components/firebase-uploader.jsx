import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";

export default class Navbar extends Component {

    state = {
        avatar: "",
        isUploading: false,
        progress: 0,
        avatarURL: ""
    };


    handleUploadSuccess = filename => {
        this.setState({ avatar: filename, progress: 100, isUploading: false });
        firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then(url => {
                this.setState({ url: url });
                return this.setState({ avatarURL: url });
            });

        console.log(this.state);
    };



    render() {
        return (
            <div>
                <form>
                    <label>Avatar:</label>
                    {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
                    <FileUploader
                        accept="image/*"
                        name="avatar"
                        randomizeFilename
                        storageRef={firebase.storage().ref("images")}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                        onProgress={this.handleProgress}
                    />

                    {this.state.avatarURL && <img src={this.state.avatarURL} />}

                </form>
            </div>
        );
    }
}