import { useState, useEffect } from "react";
import getImages from '../service/image-service';
import { toast, ToastContainer } from 'react-toastify';
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";

export function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  
  useEffect(() => {
    if (query === '') {
      return;
    }
      setIsLoading(true);
      getImages(query, page)
        .then(data => {
          if (data.total === 0)
            toast.warn(
          `Invalid request. Please try again`
      )
          setImages(prevState => [...prevState, ...data.hits]);
        })
      .catch (error => console.log(error))
      .finally (() => setIsLoading(false));
    }, [query, page]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setLargeImageURL(null);
  }

  const setlargeImageURL = (largeUrl) => {
    setLargeImageURL(largeUrl);
  }

  const onSubmit = query => {
    setImages([]);
    setPage(1);
    setQuery(query);
  };

  const handleClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showBtnLoadMore = () => {
    return images.length !== 0 &&
      page * 12 <= images.length;
  };
  
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSubmit={onSubmit} />
        
        {images.length !== 0 && (
          <ImageGallery images={images} onClick={setlargeImageURL} />)}
                
        { showBtnLoadMore() && (
          <Button onClick={handleClick} />
        )}

        {largeImageURL && (
          <Modal onClose={toggleModal}>
            <img src={largeImageURL} alt={query} />
          </Modal>
        )}
      
        <Loader visible={isLoading} />

        <ToastContainer autoClose={1500} />
      </div>
    );
  }