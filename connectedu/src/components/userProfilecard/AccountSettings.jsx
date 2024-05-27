import React, { useState, useEffect } from "react";
import FormInput from "../../pages/register/featured/FormInput";
import "./AccountSettings.scss";
import newRequest from "../../utils/newRequest";
import getCurrentUser from "../../utils/getCurrentUser";
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
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
      setMessage("Profile updated successfully!");
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

  useEffect(() => {
    if (data && data.user) {
      setValues({
        username: data.user.username || '',
        email: data.user.email || '',
        fullName: data.user.fullName || '',
        phoneNumber: data.user.phoneNumber || '',
      });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(values);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user</div>;

  return (
    <div className='accountSettings'>
      <h1 className='mainHead1'>Personal Information</h1>
      <form onSubmit={handleSubmit}>
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
