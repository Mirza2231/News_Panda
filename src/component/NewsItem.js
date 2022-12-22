import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { tittle, description, imageUrl, newsUrl } = this.props;
    return (
      <div className='my-3'>
        <div className="card" >
          <img style={{height:'256px'}} src={!imageUrl?"https://cdn.benzinga.com/files/images/story/2022/12/14/shutterstock_1018654609.jpg?width=1200&height=800&fit=crop":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{tittle.length > 60?tittle.slice(0,60) + "...":tittle}</h5>
            <p className="card-text">{description.length > 60?description.slice(0,60) + "...":description}</p>
            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
