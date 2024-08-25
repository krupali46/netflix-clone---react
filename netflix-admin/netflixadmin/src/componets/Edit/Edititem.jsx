import React, { useEffect, useState } from 'react';
import { Container, Form, Row, Button, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editContactAsync } from '../../services/action/action';
import './Edititem.css'

function Edititem() {
    const { id } = useParams();
    console.log("Id", id);
    const { contact } = useSelector(state => state.Reducer);
    const [inputState, setInputState] = useState({
        id: 'id',
        imgUrl: '',
        author: '',
        title: '',
        description: '',
        year: '',
    });

    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInputState({ ...inputState, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("hello", inputState);
        dispatch(editContactAsync(inputState));
        // setIsSubmit(true);
        // navigate('/');
    }

    useEffect(() => {
        if (contact) {
            setInputState(contact);
        } else {
            navigate('/')
        }
    }, [contact, navigate]);

    return (
        <>
            <Container className="mt-5 custom-container">
                <Row>
                    <div className="form-card1 justify-content-center d-flex mt-5">
                        <div className="form-card2">
                            <form className="form" onSubmit={handleSubmit}>
                                <p className="form-heading">Edit Movies</p>

                                <div className="form-field">
                                    <input placeholder="add Url" className="input-field" value={inputState.imgUrl} onChange={handleInput} type="text" name="imgUrl" />
                                </div>

                                <div className="form-field">
                                    <input placeholder="Title"  className="input-field" value={inputState.title} onChange={handleInput}  type="text"  name="title" />
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

                                <button type="submit" className="sendMessage-btn mt-2" >
                                    Edit
                                </button>
                            </form>
                        </div>
                    </div>
                </Row>
            </Container>
        </>
    );
}

export default Edititem;
