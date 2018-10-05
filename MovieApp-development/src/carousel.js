import './style.css';
import React, { Component } from "react";
import Slider from "react-slick";
import firebase from 'firebase/app';
import {Button} from 'reactstrap';

export class Carousel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      basketRef: undefined,
      emptyBasket: false
    };
  }

  componentDidMount() {
    let basketRef = firebase.database().ref('baskets').child(this.props.user.uid);
    basketRef.on('value', (snapshot) => {
      let snap = snapshot.val();
      if (snap) {
        let keys = Object.keys(snap);
        let array = [];
        keys.map((key) => {
          basketRef.child(key).once('value', function (snapshot) {
            let val = snapshot.val();
            let key = Object.keys(val);
            val.key = key;
            array.push(val[key]);
          });
          return array;
        });
        this.setState({
          movies: array,
          basketRef: basketRef,
          emptyBasket: false
        })
      }
      else {
        this.setState({
          emptyBasket: true
        })
      }
    });
  }

  componentWillUnmount() {
    if (this.state.basketRef) {
      this.state.basketRef.off();
    }
  }

  render() {
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    if(this.state.movies.length > 1){
      settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2
      };
    } 

    let slider = undefined;
    if (this.state.emptyBasket) {
      slider = (
        <div className="empty-basket-msg">
          <h3>Nothing in here right now</h3>
          <img src='https://cdn0.iconfinder.com/data/icons/popo_emotions_the_blacy_png/128/nothing.png' alt='empty here face' />
        </div>
      )
    } else {
      let cards = this.state.movies.map((key) => {
        return <Card key={key.id} movieCard={key} uid={this.props.user.uid} remove={this.props.remove}/>
      });
      slider = (
        <Slider {...settings}>

          {cards}

        </Slider>
      )
    }

    return (
      <div className="carouselCard ">
        <h2> My Basket </h2>
        {slider}
      </div>
    );
  }
}

class Card extends Component {
  render() {
    let movieCard = this.props.movieCard;
    let uid = this.props.uid;
    return (
      <div className="carouselCard">
          <div className="card" >
            <img className="card-img-top" src={'http://image.tmdb.org/t/p/w185//' + movieCard.poster_path} alt={movieCard.title} />
            <div className="card-body">
              <h3 className="card-title">{movieCard.title}</h3>
              <p className="card-date">{movieCard.release_date}</p>
              <p className="card-popularity">{"Popularity: " + movieCard.popularity}</p>
              <p className="card-review">{"Vote Average: " + movieCard.vote_average}</p>
              <Button onClick={() => this.props.remove(movieCard.name, uid)}>Remove</Button>
            </div>
          </div>
      </div>
    );
  }



}



export default Carousel