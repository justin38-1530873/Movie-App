import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap';
import React, { Component } from 'react';
import './style.css';
let items = [];


class MainCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }
  findTopFive() {
    let movie = this.props.movies;
    let topMovie = movie.filter(function (elem) {
      return elem.vote_average > 7;
    });
    return topMovie;
  }
  render() {
    items = this.findTopFive();
    const { activeIndex } = this.state;
    let slides = items.map((elem) => {
      return (
          <CarouselItem key={elem.id} onExiting={this.onExiting} onExited={this.onExited} >
            <img src={'http://image.tmdb.org/t/p/w300//' + elem.backdrop_path} alt={elem.title + 'image'} />
            <CarouselCaption captionHeader='Recommended Movies:' captionText= {elem.title}/>
          </CarouselItem>
      )
    });


    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}

export default MainCarousel