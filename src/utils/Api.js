import axios from "axios";

const BASE_URL = "https://localhost:7263";

const getAuthHeaders = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        throw new Error("No access token found. Please log in.");
    }
    return { Authorization: `Bearer ${token}`, Accept: "*/*" };
};


export const loginApiCall = async (payload) => {
    try {
        const response = await axios.post(`${BASE_URL}/users/login`, payload);
        return response;
    } catch (error) {
        console.error("Error during login API call:", error);
        throw error;
    }
};


export const registerApiCall = async (payload) => {
    try {
        const response = await axios.post(`${BASE_URL}/users`, payload);
        return response;
    } catch (error) {
        console.error("Error during registration API call:", error);
        throw error;
    }
};

export const getNotes = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/notes`, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error("Error during getting notes API call:", error);
        throw error;
    }
};
export const getArchivedNotes = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/notes/archived`, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error("Error during getting archived notes API call:", error);
        throw error;
    }
};


export const getBinNotes = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/notes/bin`, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error("Error during getting bin notes API call:", error);
        throw error;
    }
};

export const createNote = async (payload) => {
    try {
        const response = await axios.post(`${BASE_URL}/notes`, payload, { headers: getAuthHeaders() });
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const deleteNote = async (noteId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/notes/${noteId}`, {
            headers: getAuthHeaders(),
            
        });
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error deleting note:", error.response?.data || error.message);
        throw error;
    }
};

export const archiveNote = async (noteId) => {
    try {
        const response = await axios.put(`${BASE_URL}/notes/${noteId}/archive`, {}, {
            headers: getAuthHeaders(),
        });
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error archiving note:", error.response?.data || error.message);
        throw error;
    }
};

export const unarchiveNote = async (noteId) => {
    try {
        const response = await axios.put(`${BASE_URL}/notes/${noteId}/unarchive`, {}, {
            headers: getAuthHeaders(),
        });
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error unarchiving note:", error.response?.data || error.message);
        throw error;
    }
};

export const restoreNoteFromBin = async (noteId) => {
    try {
        const response = await axios.put(`${BASE_URL}/notes/${noteId}/restore-from-bin`, {}, {
            headers: getAuthHeaders(),
        });
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error restoring note from bin:", error.response?.data || error.message);
        throw error;
    }
};

export const deleteNotePermanently = async (noteId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/notes/${noteId}/delete-permanently`, {
            headers: getAuthHeaders(),
        });
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error permanently deleting note:", error.response?.data || error.message);
        throw error;
    }

};

 