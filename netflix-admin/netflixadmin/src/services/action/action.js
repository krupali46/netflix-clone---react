import { ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACT, SINGLE_CONTACT } from './ActionType';
import generateUniqueId from 'generate-unique-id';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
// import { storage } from '../../../FireBase';
import { collection, addDoc, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../../FireBase';



// Action Creators
export const addContact = (contact) => {
    return {
        type: ADD_CONTACT,
        payload: contact
    };
};

export const deleteItem = (id) => {
    return {
        type: DELETE_CONTACT,
        payload: id
    };
};

export const updateItem = (newRec) => {
    return {
        type: UPDATE_CONTACT,
        payload: newRec
    };
};

export const singleContact = (data) => {
    return {
        type: SINGLE_CONTACT,
        payload: data
    };
};

export const loading = () => {
    return {
        type: "loading",
        isloading: true
    };
};

const addContactsSuccess = (data) => {
    return {
        type: 'ADDCONTACTSUC',
        payload: data
    };
};

// Firebase Async Operations
export const addContactAsync = (contact) => {
    return async (dispatch) => {
        dispatch(loading());
        contact.id = generateUniqueId({ length: 4, useLetters: false });

        try {
            const docRef = await addDoc(collection(db, "contacts"), contact);
            console.log("Document written with ID: ", docRef.id);
            dispatch(getContactsAsync());
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };
};

export const getContactsAsync = () => {
    return async (dispatch) => {
        dispatch(loading());
        try {
            const querySnapshot = await getDocs(collection(db, "contacts"));
            const contacts = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            dispatch(addContactsSuccess(contacts));
        } catch (error) {
            console.error("Error getting documents: ", error);
        }
    };
};

export const deleteContactAsync = (id) => {
    return async (dispatch) => {
        try {
            await deleteDoc(doc(db, "contacts", id));
            dispatch(getContactsAsync());
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };
};

export const singleContactAsync = (id) => {
    return async (dispatch) => {
        try {
            const docRef = doc(db, "contacts", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                dispatch(singleContact({ ...docSnap.data(), id: docSnap.id }));
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error getting document: ", error);
        }
    };
};

export const editContactAsync = (contact) => {
    return async (dispatch) => {
        try {
            const contactRef = doc(db, "contacts", contact.id);
            await updateDoc(contactRef, contact);
            dispatch(getContactsAsync());
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };
};

export const uploadImg = (file) => {
    return async (dispatch) => {
        const storageRef = ref(storage, `img/${file.name}`);

        try {
            const snapshot = await uploadBytes(storageRef, file);
            const url = await getDownloadURL(snapshot.ref);
            console.log('Uploaded file and got URL!', url);
            return url;
        } catch (error) {
            console.error("Error uploading file: ", error);
            throw error;
        }
    };
};
