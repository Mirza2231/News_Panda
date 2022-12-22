import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";




export class News extends Component {

  static defaultProps = {
    country: "us",
    pageSize: 8,
    category: 'general',
  }

  static propsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string

  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,

    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} | News Panda`;
  }


  async updateNews() {
    this.props.setProgress(0);
    // https://newsapi.org/v2/everything?q=tesla&from=2022-11-20&sortBy=publishedAt&apiKey=36e62a05b9d1474a9f95385359aa0235
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });

    let data = await fetch(url);
    this.props.setProgress(40);

    let parsedata = await data.json();
    this.props.setProgress(60);

    this.setState({
      articles: parsedata.articles,
      totalResults: parsedata.totalResults,
      loading: false,

    })
    this.props.setProgress(100);

  }


  async componentDidMount() {
    this.updateNews();

  };

  fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1
    });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });

    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedata.articles),
      totalResults: parsedata.totalResults,
      loading: false,
    })
  };

  render() {
    return (
      < >
        <h1 className='text-center'>{this.props.newsPageHead} {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className='container'>
          <div className='row' >

            {this.state.articles.map((element,index) => {
              return <div className='col-md-4' key={index}>
                <NewsItem tittle={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
              </div>
            })}

          </div>
          </div>

        </InfiniteScroll>
      </>
    )
  }
}

export default News

