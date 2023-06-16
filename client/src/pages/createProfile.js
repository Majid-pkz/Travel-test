import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_PROFILE } from '../utils/mutations';
import { PROFILE_EXISTS } from '../utils/queries';
import Auth from '../utils/auth';
import Upload from '../components/Upload';

const Profile = () => {
  const [profileExists, setProfileExists] = useState(false);
  // const [profileExistsError, setProfileExistsError] = useState('');
  const [redirectToProfile, setRedirectToProfile] = useState(false);

  const token = localStorage.getItem('id_token');
  const userData = Auth.getProfile(token);
  const [formState, setFormState] = useState({
    profileUser: userData.data._id,
    location: null,
    gender: null,
    age: null,
    bio: null
  });

  const [createProfile, { error, data }] = useMutation(CREATE_PROFILE);

  const { loading: profileExistsLoading, data: profileExistsData } = useQuery(PROFILE_EXISTS, {
    variables: { profileUser: userData.data._id },
  });

  useEffect(() => {
    if (profileExistsData && profileExistsData.profileExist) {
      console.log('profile exists', profileExistsData);
      setProfileExists(true);
      setRedirectToProfile(true);
    }
  }, [profileExistsData]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createProfile({
        variables: { ...formState, age: formState.age ? parseInt(formState.age) : null },
      });
      window.location.href = "/my-profile";

    } catch (e) {
      console.error(e);
    }
  };

  if (redirectToProfile) {
    // Replace '/my-profile' with the desired redirect path
    return <Navigate to="/my-profile" replace />;
  }

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Create your Profile</h4>
          <div className="card-body">
          

            {data ? (
              <p>
                Success! You may now head <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>

                <input
                  className="form-input"
                  placeholder="Location"
                  name="location"
                  type="text"
                  value={formState.location || ""}
                  onChange={handleChange}
                />

                <select
                  className="form-select"
                  name="gender"
                  value={formState.gender || ""}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <input
                  className="form-input"
                  placeholder="Age"
                  name="age"
                  type="text"
                  value={formState.age || ""}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Bio"
                  name="bio"
                  type="text"
                  value={formState.bio || ""}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Interests"
                  name="interests"

                  value={formState.interests || ""}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-info"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;