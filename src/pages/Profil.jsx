import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../features/profile/profileSlice";
import { useNavigate } from "react-router-dom";

import "../styles/pages/profile.scss";
import Containeraccount from "../components/Containeraccount";

const Profil = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.profile.profile);
  const loading = useSelector((state) => state.profile.loading);
  const error = useSelector((state) => state.profile.error);
  const [isEditing, setIsEditing] = useState(false);
  const [newUserName, setNewUserName] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (!profile) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, user, profile, navigate]);

  useEffect(() => {
    if (profile) {
      setNewUserName(profile.userName);
    }
  }, [profile]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(newUserName)).then(() => {
      setIsEditing(false);
    });
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error.message}</p>;

  return (
    <main className="main bg-dark">
      <div className="header">
        {isEditing ? (
          <form onSubmit={handleFormSubmit}>
            <h1>Edit User info</h1>
            <div>
              <label>First Name</label>
              <input
                type="text"
                value={profile.firstName}
                readOnly
                aria-label="First name"
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                value={profile.lastName}
                readOnly
                aria-label="Last name"
              />
            </div>
            <div>
              <label>Username</label>
              <input
                type="text"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancelClick}>
              Cancel
            </button>
          </form>
        ) : (
          <>
            <h1>
              Welcome back
              <br />
              {profile ? profile.firstName : ""}{" "}
              {profile ? profile.lastName : ""}
            </h1>
            <button className="edit-button" onClick={handleEditClick}>
              Edit Name
            </button>
          </>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <Containeraccount />
    </main>
  );
};

export default Profil;
