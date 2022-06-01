import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
      let {title, description, imageUrl, newsUrl} = this.props;
        return (
        <div>
            <div className="card">
            <img src={imageUrl?imageUrl:"https://static.tnn.in/thumb/msid-91862618,imgsize-100,width-1280,height-720,resizemode-75/91862618.jpg"} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">
                    {description}
                </p>
                <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
            </div>
            </div>
        </div>
        );
  }
}

export default NewsItem;
