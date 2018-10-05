import React, { Component } from 'react';
import _ from 'lodash';
import './style.css';
import ReviewBox from './ReviewBox';
import ReviewList from './ReviewList';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class MoviePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: undefined,
            toggle: false
        };
    }

    componentDidMount() {
        let movieName = this.props.match.params.name;
        let movArray = this.props.movie;
        let movObj = _.find(movArray, { name: movieName });
        this.setState({ movie: movObj });
    }

    render() {
        let movie = this.state.movie;
        let buttons = undefined;
        if (!this.props.userStatus) {
            buttons = (
                <div>
                    <div className="basketB">
                    <Button disabled onClick={() => this.props.handleClick(movie)}>Put in Basket</Button>
                    </div>
                    <div>
                        <Modal className="modalPopup" isOpen={true} fade={false}>
                            <ModalHeader>Warning!</ModalHeader>
                            <ModalBody>
                                <img src={'https://cdn0.iconfinder.com/data/icons/streamline-emoji-1/48/102-weary-cat-face-512.png'} alt='Warning' />
                                <div className="warning">
                                    <h3>Welcome new Guest? </h3>
                                    <p>Hello! and Sorry! If you want to continue viewing this movie's information please either sign-in or sign-up via our login page.</p>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={() => this.props.history.push('/login')}>Go to Login</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </div>
            )
        } else {
            buttons = (
                <div>
                    <div className="basketB">
                    <Button onClick={() => this.props.handleClick(movie, this.props.userStatus.uid)}>Put in Basket</Button>
                    </div>
                    <ReviewBox currentUser={this.props.reviewBox} currentMovie={movie}>
                    </ReviewBox>
                    <ReviewList currentUser={this.props.reviewBox} currentMovie={movie}></ReviewList>
                </div>
            )
        }
        if (!movie) return <h2> No movie specified </h2>

        return (
            <div className="moviePage">
                <main>
                    <div className="info .col-sm-12 .col-md-6 .col-md-offset-3">
                        <div className="wrapper">
                            <h2>{movie.title}</h2>
                        </div>
                        <img src={'http://image.tmdb.org/t/p/w200//' + movie.poster_path} alt={movie.poster_path} />
                        <h3>Release Date</h3>
                        <p>{movie.release_date}</p>
                        <h3>Vote Average</h3>
                        <p>{movie.vote_average}</p>
                    </div>
                    <h3 className="overview">Overview</h3>
                    <p className="overview">{movie.overview}</p>
                    <div className="buttons">
                        {buttons}
                    </div>
                    <div>

                    </div>
                </main>
            </div>
        );
    }
}

export default MoviePage;