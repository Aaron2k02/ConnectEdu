import React, { useState, useEffect } from "react";
import FormInput from "../../pages/register/featured/FormInput";
import "./AccountSettings.scss";
import newRequest from "../../utils/newRequest";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "../../utils/updateCurrentUser";

const PersonalExperience = () => {
  const currentUser = getCurrentUser();
  const [values, setValues] = useState({
    skills: "No Skills Provided",
    qualifications: "No qualifications Provided",
    professionalExperience: "No Experience Provided",
    educationalBackground: "No Educational Background Provided",
  });

  const fetchCurrentUserProfile = async () => {
    const response = await newRequest.get(`/users/${currentUser?._id}`);
    return response.data;
  };

  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchCurrentUserProfile,
  });

  const mutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(['userProfile']);
      setMessage("Profile updated successfully!");
      setTimeout(() => {
        setMessage(""); // Clear message after a delay
      }, 3000); // Set delay duration in milliseconds
    },
    onError: () => {
      setMessage("Failed to update profile.");
    }
  });

  useEffect(() => {
    if (data && data.userProfile) {
      setValues({
        skills: data.userProfile?.skills || "No Skills Provided",
        qualifications: data.userProfile?.qualifications || "No qualifications Provided",
        professionalExperience: data.userProfile?.professionalExperience || "No Experience Provided",
        educationalBackground: data.userProfile?.educationalBackground || "No Educational Background Provided",
      });
    }
  }, [data]);

  const [message, setMessage] = useState("");

  const inputs = [
    {
      id: 1,
      name: "educationalBackground",
      type: "text",
      placeholder: "Educational Background",
      errorMessage: "Enter your education level",
      label: "Educational Background",
      required: true
    },
    {
      id: 2,
      name: "professionalExperience",
      type: "text",
      placeholder: "Previous Teaching Experience (if any)",
      label: "Professional Experience",
    },
    {
      id: 3,
      name: "skills",
      type: "text",
      placeholder: "Skills and Qualifications",
      label: "Skills and Qualifications",
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
      <h1 className='mainHead1'>Personal Experience</h1>
      <form onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <FormInput key={input.id} {...input} value={values ? values[input.name] : ""} onChange={onChange} />
        ))}
        {message && <p>{message}</p>}
        <button type="submit">Save changes</button>
      </form>
    </div>
  );
};

export default PersonalExperience;
