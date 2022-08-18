import React, { Component } from 'react';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
    state = {
        query: '',
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.query.trim() === '') {
            toast.error('Please enter your choise');
            return;
          }
        this.props.onSubmit(this.state.query);
        this.setState({
            query: '',
        })
    }

    handleChange = (e) => {
        this.setState({query: e.target.value})
    }


        render() {
            return (
                <header className={css.Searchbar}>
                    <form className={css.SearchForm} onSubmit={this.handleSubmit}>
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
                            onChange={this.handleChange}
                        />
                    </form>
                </header>
            );
        }
    }

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func,
};