import React, { Component } from 'react';
import firebase from 'firebase/app';
import StarRatingComponent from 'react-star-rating-component';

export default class ReviewBox extends Component {
    constructor(props){
      super(props);
      this.state = {
        post:'',
        rating: 1
      };
    }

    onStarClick(nextValue) {
      this.setState({rating: nextValue});
    }

    updatePost(event) {
        this.setState({post: event.target.value});
    }

    postReview(event){
        event.preventDefault(); 
        
        let newReview = {
          text: this.state.post,
          userId: this.props.currentUser.uid,
          userName: this.props.currentUser.displayName,
          rating: this.state.rating
        };

        let tasksRef = firebase.database().ref('reviews').child(this.props.currentMovie.title);
    
        tasksRef.push(newReview);
        
    
        this.setState({post:''}); 
    }

    render() {
        const { rating } = this.state;
    
        return (
          <div className="container">
            <div className="row py-3 chirp-box">
              <div className="col pl-4 pl-lg-1">
                <form>
                  <textarea name="text" className="form-control mb-2" placeholder="Leave a comment!" 
                    
                    value={this.state.post} 
                    onChange={(e) => this.updatePost(e)}
                    />
                  <div>
                    <StarRatingComponent 
                      name="rate1" 
                      starCount={5}
                      value={rating}
                      onStarClick={this.onStarClick.bind(this)}
                    />
                  </div>  
    
                  {this.state.post.length > 130 &&
                    <small className="form-text">130 character limit!</small>
                  }
                  
                  <div className="text-right">
                    <button className="btn btn-primary" 
                      disabled={this.state.post.length === 0 || this.state.post.length > 130}
                      onClick={(e) => this.postReview(e)} 
                      >
                      <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Share
                    </button> 					
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      }
}