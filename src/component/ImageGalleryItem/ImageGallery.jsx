import { Component } from 'react'
import FetchApi from '../ApiServer/ApiServer'
import styles from './ImageGalleryItem.module.scss'
import ImageGalleryItem from './ImageGalleryItem.jsx'
import Button from '../Button/Button'
import React from 'react'
import { BallTriangle } from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class ImageGallery extends Component {
  state = {
    image: [],
    status: 'idle',
    error: null,
    page: 1,
    myRef: React.createRef(),
  }
  componentDidUpdate(prevProps, prevSet) {
    if (
      prevProps.imageName !== this.props.imageName ||
      prevSet.page !== this.state.page
    ) {
      if (prevProps.imageName !== this.props.imageName)
        this.setState({ image: [], status: 'pending' })
      FetchApi(this.props.imageName, this.state.page)
        .then((image) => {
          if (image.hits.length === 0) {
            return Promise.reject(
              new Error(`No results were found for your search.`),
            )
          }
          image.hits[0] = { ...image.hits[0], myRef: this.state.myRef }
          this.setState({
            image: [...this.state.image, ...image.hits],
            status: 'resolved',
          })
          this.scrollInto(this.state.myRef)
        })
        .catch((error) => this.setState({ error, status: 'rejected' }))
    }
  }
  LoadMore = (e) => {
    this.setState({
      page: this.state.page + 1,
    })
  }
  scrollInto = (elem) => {
    elem.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
  }

  render() {
    const { image, status, error } = this.state

    return (
      <>
        {status === 'idle' && <p className={styles.InputValue}>Input value</p>}
        {status === 'rejected' && (
          <h1 className={styles.ErrorName}>{error.message}</h1>
        )}
        {image.length > 0 && (
          <ul className={styles.Ullist}>
            {image.map((img) => (
              <ImageGalleryItem
                key={img.id}
                srcs={img.webformatURL}
                alt={img.tags}
                onClick={this.props.onClick}
                largeImageURL={img.largeImageURL}
                myRef={img.myRef}
              />
            ))}
          </ul>
        )}
        {status === 'pending' && (
          <BallTriangle
            heigth="100"
            width="100"
            color="red"
            ariaLabel="loading"
            timeout={3000}
          />
        )}
        {status === 'resolved' && <Button onClick={this.LoadMore} />}
      </>
    )
  }
}
export default ImageGallery
