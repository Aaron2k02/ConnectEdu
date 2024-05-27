import newRequest from "./newRequest";

export const fetchUser = async (userId) => {
    const response = await newRequest.get(`/users/${userId}`);
    return response.data;
};

export const updateUserProfile = async (data) => {
    const response = await newRequest.put(`/auth/profile`, data);
    return response.data;
};

export const updatePersonalInfo = async (data) => {
    const response = await newRequest.put(`/auth/personal-info`, data);
    return response.data;
};

export const validateCurrentPassword = async (currentPassword) => {
    try {
        const res = await newRequest.post(`/auth/validate-password`, {
            currentPassword: currentPassword,
        });
        return res.data.match; // Assuming the server returns whether the password is correct
    } catch (error) {
        console.error("Error validating current password:", error);
        return false; // Return false if there's an error or the password is incorrect
    }
};

export const changePassword = async (data) => {
    const response = await newRequest.post(`/auth/change-password`, data);
    return response.data;
};

export const educatorRegister = async (data) => {
    const response = await newRequest.put(`/users/register-educator`, data);
    return response.data;
};
