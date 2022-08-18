import React, { Component } from "react";
import getImages from '../service/image-service';
import { toast, ToastContainer } from 'react-toastify';
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    isOpen: false,
    largeImageURL: null,
  }

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });
        const data = await getImages(query, page);
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
        }));

        if (data.total === 0)
          toast.warn(
            `Invalid request. Please try again`
          );
      } catch (error) {
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  toggleModal = () => {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen,
      largeImageURL: null,
    }));
  }

  setlargeImageURL = (largeUrl) => {
    this.setState({ largeImageURL: largeUrl });
  }

  onSubmit = query => {
    this.setState({
      images: [],
      page: 1,
      query,
    });
  };

  handleClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  showBtnLoadMore = () => {
    const { images, page } = this.state;
    return (
      images.length !== 0 &&
      page * 12 <= images.length
    );
  }
  
  render() {
    const { images, isLoading, largeImageURL, query } = this.state;
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSubmit={this.onSubmit} />
        
        {images.length !== 0 && (
          <ImageGallery images={images} onClick={this.setlargeImageURL} />)}
                
        { this.showBtnLoadMore() && (
          <Button onClick={this.handleClick} />
        )}

        {largeImageURL && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={query} />
          </Modal>
        )}
      
        <Loader visible={isLoading} />

        <ToastContainer autoClose={1500} />
      </div>
    );
  }
}