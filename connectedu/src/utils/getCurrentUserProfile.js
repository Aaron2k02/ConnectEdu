const getCurrentUserProfile = () => {
    return JSON.parse(localStorage.getItem("userProfile"));
}

export default getCurrentUserProfile;