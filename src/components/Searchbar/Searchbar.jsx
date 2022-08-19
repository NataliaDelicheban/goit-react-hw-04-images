import { useState } from 'react';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export function Searchbar({onSubmit}) {
    const [query, setQuery] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() === '') {
            toast.error('Please enter your choise');
            return;
          }
        onSubmit(query);
        setQuery('');
    }

    const handleChange = (e) => {
        setQuery(e.target.value)
    }

            return (
                <header className={css.Searchbar}>
                    <form className={css.SearchForm} onSubmit={handleSubmit}>
                        <button type="submit" className={css.SearchFormButton}>
                            <FcSearch/>
                            <span className={css.SearchFormButtonLabel}>Search</span>
                        </button>

                        <input
                            className={css.SearchFormInput}
                            type="text"
                            autoComplete="off"
                            autoFocus
                            placeholder="Search images and photos"
                            onChange={handleChange}
                        />
                    </form>
                </header>
            );
        }

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func,
};