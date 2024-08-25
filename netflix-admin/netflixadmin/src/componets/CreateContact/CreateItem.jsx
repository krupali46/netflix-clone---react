import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addContactAsync, uploadImg } from '../../services/action/action';
import './CreateItem.css';

const CreateItem = () => {
    const initialState = {
        id: '',
        imgUrl: '',
        author: '',
        title: '',
        description: '',
        year: ''
    };

    const [inputState, setInputState] = useState(initialState);
    const [isSubmit, setIsSubmit] = useState(false);
    const isLoading = useSelector(state => state.Reducer.isLoading);
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Handle form input changes
    const handleInput = (e) => {
        const { name, value } = e.target;
        setInputState({
            ...inputState,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addContactAsync(inputState));
        setIsSubmit(true);
        setInputState(initialState);
    };

    useEffect(() => {
        if (isSubmit && !isLoading) {
            navigate('/');
        }
    }, [isSubmit, navigate, isLoading]);

    const handleImg = async (e) => {
        const file = e.target.files[0];
        setUploading(true);
        try {
            const url = await dispatch(uploadImg(file)).unwrap();
            setInputState(prevContact => ({ ...prevContact, avatar: url }));
        } catch (error) {
            console.error('Error uploading image:', error);
        }
        setUploading(false);
    };

    return (
        <Container className="mt-5 custom-container">
            <Row>
                <div className="form-card1 justify-content-center d-flex mt-5">
                    <div className="form-card2">
                        <form className="form" onSubmit={handleSubmit}>
                            <h2 className="form-heading">Create Movie Card</h2>

                            <div className="form-field">
                                <input placeholder="add Url" className="input-field" value={inputState.imgUrl} onChange={handleInput} type="text" name="imgUrl" />
                            </div>

                            <div className="form-field">
                                <input placeholder="Title" className="input-field" value={inputState.title} onChange={handleInput} type="text" name="title" />
                            </div>

                            <div className="form-field">
                                <input placeholder="Author" className="input-field" value={inputState.author} onChange={handleInput} type="text" name="author" />
                            </div>

                            <div className="form-field">
                                <input placeholder="Description" className="input-field" value={inputState.description} onChange={handleInput} type="text" name="description" />
                            </div>

                            <div className="form-field">
                                <input placeholder="Year" className="input-field" value={inputState.year} onChange={handleInput} type="number" name="year" />
                            </div>

                            <button type="submit" className="sendMessage-btn mt-2" disabled={uploading}>
                                {isLoading || uploading ? (
                                    <div className="spinner-grow" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                ) : (
                                    'Submit'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </Row>
        </Container>
    );
};

export default CreateItem;
