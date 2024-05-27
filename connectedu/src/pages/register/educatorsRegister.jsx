import FormInput from './featured/FormInput'
import "./educatorRegister.scss"
import React, { useEffect, useState } from "react"

import newRequest from "../../utils/newRequest";
import getCurrentUser from '../../utils/getCurrentUser';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { educatorRegister } from '../../utils/updateCurrentUser';

const EducatorRegister = () => {
  const currentUser = getCurrentUser();
  const [hasApplied, setHasApplied] = useState(false);
  const [message, setMessage] = useState("");
  const [values, setValues] = useState({
    username: "No User Name Provided",
    email: "No Email Provided",
    educationalBackground: "No qualifications Provided",
    professionalExperience: "No Experience Provided",
    skillsAndQualifications: "No Educational Background Provided",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage: "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
      autoComplete: "username", // Add autoComplete attribute
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email!",
      label: "Email",
      required: true,
      autoComplete: "email", // Add autoComplete attribute
    },
    {
      id: 3,
      name: "skills",
      type: "text",
      placeholder: "Educational Skills",
      errorMessage: "Enter your education skills",
      label: "Educational Skills",
      required: true,
      autoComplete: "skills", // Add autoComplete attribute
    },
    {
      id: 4,
      name: "educationalBackground",
      type: "text",
      placeholder: "Educational Background",
      errorMessage: "Enter your education level",
      label: "Educational Background",
      required: true,
      autoComplete: "education", // Add autoComplete attribute
    },
    {
      id: 5,
      name: "professionalExperience",
      type: "text",
      placeholder: "Previous Teaching Experience (if any)",
      label: "Professional Experience",
      autoComplete: "experience", // Add autoComplete attribute
    },
    {
      id: 6,
      name: "qualifications",
      type: "text",
      placeholder: "Qualifications",
      label: "Qualifications",
      autoComplete: "qualifications", // Add autoComplete attribute
    },
  ]

  const fetchCurrentUserProfile = async () => {
    const response = await newRequest.get(`/users/${currentUser?._id}`);
    return response.data;
  };

  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchCurrentUserProfile,
  });

  useEffect(() => {
    const fetchUserApplicationStatus = async () => {
      try {
        const response = await newRequest.post("/auth/check-application");
        setHasApplied(response.data.hasApplied);
      } catch (error) {
        console.error("Error fetching user application status:", error);
      }
    };

    fetchUserApplicationStatus();
  }, [data]);

  const mutation = useMutation({
    mutationFn: educatorRegister,
    onSuccess: () => {
      queryClient.invalidateQueries(['userProfile']);
      setMessage("Registered successfully!");
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
        username: data.user?.username || "No User Name Provided",
        email: data.user?.email || "No Email Provided",
        skills: data.userProfile?.skills || "No Skills Provided",
        qualifications: data.userProfile?.qualifications || "No qualifications Provided",
        professionalExperience: data.userProfile?.professionalExperience || "No Experience Provided",
        educationalBackground: data.userProfile?.educationalBackground || "No Educational Background Provided",
      });
    }
  }, [data]);

  const onChange =(e)=>{
    setValues({...values,[e.target.name]:e.target.value})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage('');

    // Validate email and username before making the API call
    if (values.email !== data.user?.email) {
      setMessage('Wrong email');
      return; // Exit the function if email is wrong
    }

    if (values.username !== data.user?.username) {
      setMessage('Wrong username');
      return; // Exit the function if username is wrong
    }

    mutation.mutate(values);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user</div>;

  return (
    <div className='educatorRegister'>
      <div className="container">
        <div className="left">
          <div className='header'>
            <div>
              <h1>Empower Minds, Shape Futures:</h1>
              {hasApplied ? (
                <h2> Thank you for applying with us as an educator</h2>
              ) : (
                <h2> Join us as an educator</h2>
              )}
            </div>
            <div>
              <img src={"/images/ConnectEduLogo-bg.png"} alt="ConnectEdu Logo" />
            </div>
          </div>
          {hasApplied ? (
            <form onSubmit={handleSubmit}>
              <p>You have already applied as an educator.</p>
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              {inputs.map((input) => (
                <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
              ))}
              {message && <p>{message}</p>}
              <button type="submit">Submit</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default EducatorRegister
