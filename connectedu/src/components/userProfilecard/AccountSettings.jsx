import React, { useState, useEffect } from "react";
import FormInput from "../../pages/register/featured/FormInput";
import "./AccountSettings.scss";
import newRequest from "../../utils/newRequest";
import getCurrentUser from "../../utils/getCurrentUser";
import upload from "../../utils/upload";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updatePersonalInfo } from "../../utils/updateCurrentUser";

const AccountSettings = () => {
  const currentUser = getCurrentUser();

  const fetchCurrentUser = async () => {
    const response = await newRequest.get(`/users/${currentUser?._id}`);
    return response.data;
  };

  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: fetchCurrentUser,
  });

  const mutation = useMutation({
    mutationFn: updatePersonalInfo,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['user']);
      setMessage("Profile updated successfully!");

      // Update local storage with the new user info
      localStorage.setItem("currentUser", JSON.stringify(data.user));

      setTimeout(() => {
        setMessage(""); // Clear message after a delay
      }, 3000); // Set delay duration in milliseconds
    },
    onError: () => {
      setMessage("Failed to update profile.");
    }
  });

  const [message, setMessage] = useState("");
  const [values, setValues] = useState({
    username: '',
    email: '',
    fullName: '',
    phoneNumber: '',
  });
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (data && data.user) {
      setValues({
        username: data.user.username || '',
        email: data.user.email || '',
        fullName: data.user.fullName || '',
        phoneNumber: data.user.phoneNumber || '',
      });
      setPreviewUrl(data.user.photoUrl || null);
    }
  }, [data]);

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      required: true,
      autoComplete: "username",
    },
    {
      id: 2,
      name: "fullName",
      type: "text",
      placeholder: "Full name",
      label: "Full name",
      required: true,
      autoComplete: "name",
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      required: true,
      autoComplete: "email",
    },
    {
      id: 4,
      name: "phoneNumber",
      type: "tel",
      placeholder: "Mobile Phone",
      label: "Phone/Mobile",
      required: true,
      autoComplete: "tel",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    let photoUrl = previewUrl;

    if (file) {
      photoUrl = await upload(file);
    }

    mutation.mutate({ ...values, photoUrl });
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleRemoveImage = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user</div>;

  return (
    <div className='accountSettings'>
      <h1 className='mainHead1'>Personal Information</h1>
      <form onSubmit={handleSubmit}>
        <div className="image-upload">
          <label htmlFor="profileImage">Profile Image</label>
          <input type="file" id="profileImage" accept="image/*" onChange={handleFileChange} />
          {previewUrl && (
            <div className="image-preview">
              <img src={previewUrl} alt="Profile Preview" />
              <button type="button" onClick={handleRemoveImage}>Remove</button>
            </div>
          )}
        </div>
        {inputs.map((input) => (
          <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
        ))}
        {message && <p>{message}</p>}
        <button type="submit">Save changes</button>
      </form>
    </div>
  );
};

export default AccountSettings;
