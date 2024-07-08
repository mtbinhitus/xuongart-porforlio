import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const baseGetAxios = async (url) => {
    try {
        const response = await axios.get(BASE_URL + url, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const basePutAxios = async (url) => {
    try {
        const response = await axios.put(BASE_URL + url, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const getInfor = async () => {
    return await baseGetAxios('/api/infor/1');
};

const getTags = async () => {
    return await baseGetAxios('/api/tags');
};

const getCollections = async () => {
    return await baseGetAxios('/api/collections');
};

const getCollectionByID = async (id) => {
    return await baseGetAxios('/api/collections/' + id);
};

const getImages = async (collectionID) => {
    return await baseGetAxios('/api/image-details/' + collectionID);
};

const increaseView = async (collectionID) => {
    return await basePutAxios('/api/increase/view/' + collectionID);
};

const Api = {
    getInfor,
    getTags,
    getCollections,
    getImages,
    getCollectionByID,
    increaseView,
};

export default Api;
