import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContactAsync, getContactsAsync, singleContactAsync } from '../../services/action/action';
import './Home.css';

const Home = () => {
    const { contact, contacts } = useSelector(state => state.Reducer);
    const [search, setSearch] = useState('');
    const [viewContacts, setViewContacts] = useState([]);
    const [recid, setRecId] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleEdit = (id) => {
        setRecId(id);
        dispatch(singleContactAsync(id));
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        const searchResult = contacts.filter((contact) =>
            contact.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setViewContacts(searchResult);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const searchResult = contacts.filter((contact) =>
            contact.name.toLowerCase().includes(search.toLowerCase())
        );
        setViewContacts(searchResult);
    };

    const handleDelete = (id) => {
        dispatch(deleteContactAsync(id));
    };

    useEffect(() => {
        if (contact) {
            navigate(`/edit/${recid}`);
        }
    }, [contact, navigate, recid]);

    useEffect(() => {
        dispatch(getContactsAsync());
    }, [dispatch]);

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <h2 className='text-center pb-5 fw-bold text-white'>Movies Management</h2>
                    
                    <table className='custom-table'>
                        <thead>
                            <tr className='text-center'>
                                <th>Image</th>
                                <th onClick={() => handleSort('title', 'asc')}>Title</th>
                                <th onClick={() => handleSort('author', 'asc')}>Author</th>
                                <th onClick={() => handleSort('description', 'asc')}>Description</th>
                                <th onClick={() => handleSort('year', 'asc')}>Year</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((contact) => (
                                <tr key={contact.id}>
                                    <td><img src={contact.imgUrl} alt={contact.name} className="netflix" /></td>
                                    <td>{contact.title}</td>
                                    <td>{contact.author}</td>
                                    <td>{contact.description}</td>
                                    <td>{contact.year}</td>
                                    <td>
                                        <Button className='me-2 btn-edit' onClick={() => handleEdit(contact.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                                            </svg>
                                        </Button>
                                        <Button className='btn-delete' onClick={() => handleDelete(contact.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                            </svg>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
