import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getInfor = async () => {
  try {
    const response = await axios.get(BASE_URL + "/api/infor/1", {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const postInfor = async (data) => {
  try {
    const response = await axios.put(BASE_URL + "/api/infor/1", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const uploadImage = (image) => {
  return new Promise(async (resolve, reject) => {
    const formData = new FormData();
    formData.append("image", image);
    try {
      const response = await axios.post(
        BASE_URL + "/api/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};

const getCollections = async () => {
  try {
    const response = await axios.get(BASE_URL + "/api/collections", {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getCollectionByID = async (id) => {
  try {
    const response = await axios.get(BASE_URL + "/api/collections/" + id, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const updateCollectionByID = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.put(
        BASE_URL + "/api/collections/" + id,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};

const deleteCollectionByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.delete(BASE_URL + "/api/collections/" + id, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};

const getTags = async () => {
  try {
    const response = await axios.get(BASE_URL + "/api/tags");

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const addTags = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(BASE_URL + "/api/tags/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};

const postCollection = async (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(BASE_URL + "/api/collections", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const putCollection = async (data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(BASE_URL + "/api/collections", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const postImage = async (data) => {
  data.id_collection = parseInt(data.id_collection);
  try {
    const response = await axios.post(BASE_URL + "/api/image-details", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const getImageByID = async (id) => {
  try {
    const response = await axios.get(BASE_URL + "/api/image-details/" + id, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const deleteImageByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.delete(
        BASE_URL + "/api/image-details/" + id,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};

const postVideoCollection = async (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(BASE_URL + "/api/videos", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const putVideoCollection = async (id, data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(BASE_URL + "/api/videos/" + id, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getVideos = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(BASE_URL + "/api/videos", {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};
const getVideoByID = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(BASE_URL + "/api/videos/" + id, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};

const deleteTagByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.delete(BASE_URL + "/api/tags/" + id, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};
const sortCollection = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.put(
        BASE_URL + "/api/sort/collection",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};

const sortImage = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.put(BASE_URL + "/api/sort/images", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};

const deleteVideoByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.delete(BASE_URL + "/api/videos/" + id, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};

const login = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(BASE_URL + "/api/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};

const Api = {
  getInfor,
  postInfor,
  updateCollectionByID,
  deleteCollectionByID,
  uploadImage,
  getCollections,
  getTags,
  postCollection,
  postImage,
  getImage: getImageByID,
  deleteImageByID,
  putCollection,
  getCollectionByID,
  postVideoCollection,
  getVideos,
  putVideoCollection,
  getVideoByID,
  deleteVideoByID,
  addTags,
  deleteTagByID,
  sortCollection,
  sortImage,
  login,
};

export default Api;
