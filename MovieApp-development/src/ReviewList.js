import React, { Component } from 'react'; 
import './style.css'; 
import firebase from 'firebase/app'

export default class ReviewList extends Component {
  constructor(props){
    super(props);
    this.state = {reviews:[]};
  }
  componentDidMount() {
    this.reviewsRef = firebase.database().ref('reviews').child(this.props.currentMovie.title);
    this.reviewsRef.on('value', (snapshot) => {
      this.setState({
        reviews: snapshot.val()
      })
    });
  }

  componentWillUnmount() {
    this.reviewsRef.off();
  }

  render() {
    if (!this.state.reviews) return null;

    let reviewArray = Object.keys(this.state.reviews).map((key) =>
    {
      let reviewObj = this.state.reviews[key];
      reviewObj.id = key;
      return reviewObj;
    });
    let reviewItems = reviewArray.map((key) => {
      return <ReviewItem key= {key.id} review= {key} currentUser= {this.props.currentUser} currentMovie={this.props.currentMovie}/>
    });
    return (
      <div className="container">
        {reviewItems}
      </div>);
  }
}

class ReviewItem extends Component {
  likeReview() {
    let likes  = firebase.database().ref('reviews/').child(this.props.currentMovie.title).child(this.props.review.id + '/likes');
    let update = this.props.review.likes;
    if(update === undefined){
      update = {};
    }
    let uid = this.props.currentUser.uid;
    if(update[uid] === true){
      update[uid] = null;
    }else{
      update[uid] = true;
    }

    likes.set(update)
    .catch((error) => {
      this.setState({errorMessage: error.message});
    })
  }
 
  render() {
    let review = this.props.review; 

    let likeCount = 0; 
    let userLikes = false; 
    if(review.likes){
      likeCount = Object.keys(review.likes).length;
      if(review.likes[this.props.currentUser.uid]) 
        userLikes = true; 
    }

    

    return (
      <div className="row py-4 bg-white border">
        
        <div className="col pl-4 pl-lg-1">

          <span className="handle">{review.userName}</span>

          <div className="review">{review.text}</div>

          <div className="rating">{review.rating}<i className="fa fa-star" aria-label="star ratings"></i></div>

          <div className="likes">          
            <i className={'fa fa-thumbs-up '+(userLikes ? 'user-liked': '')} aria-label="like" onClick={() => this.likeReview()} ></i>            
            <span>{likeCount}</span>
          </div>
        </div>
      </div>      
    );
  }
}