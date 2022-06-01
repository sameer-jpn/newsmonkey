import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
      country: "in",
      pageSize: 5,
      category: "general"
    }

    static propTypes = {
      country: PropTypes.string,
      pageSize: PropTypes.number,
      category: PropTypes.string,
    }

    constructor() {
        super();
        console.log("I am a connstructor inside News Component");
        this.state = {
            articles: [],
            loading: false,            // being used to show spinner on the screen if something is loading from database OR being calculated
            page:1
        }
    }

  async componentDidMount(){
    //   this is a lifecycle method of react;;  called after render() is called 
      console.log("cdm");
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cf0721a65e894978ae1f60ce6ac03558&page=1&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({
        articles: parsedData.articles, 
        totalResults: parsedData.totalResults,
      loading: false});
  }

  handlePrevPage = async ()=> {
      console.log("Previous");
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cf0721a65e894978ae1f60ce6ac03558&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({
          page: this.state.page - 1,
          articles: parsedData.articles,
          loading: false
      })
    }
    handleNextPage = async ()=> {
        console.log("Next");

        if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))) {
          let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cf0721a65e894978ae1f60ce6ac03558&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
          this.setState({loading: true});
          let data = await fetch(url);
          let parsedData = await data.json();
          this.setState({
              page: this.state.page + 1,
              articles: parsedData.articles,
              loading: false
          })
        }
    }

  render() {
      console.log("render");
    return (
        <div className="container my-3">
          <h1 className="text-center">NewsMonkey - Top Headlines</h1>
          {this.state.loading && <Spinner/>}
            <div className="row my-4">
            {!this.state.loading && this.state.articles.map((element)=>{
                return <div className="col-md-4 my-3" key={element.url}>
                        <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url}/>
                       </div>
            })}
            </div>
            <div className="d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevPage}>&larr; Previous</button>
                <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextPage}>Next &rarr;</button>
            </div>
      </div>
    )
  }
}

export default News