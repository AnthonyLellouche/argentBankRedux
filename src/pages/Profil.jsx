import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../features/profile/profileSlice";
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

  useEffect(() => {
    if (user) {
      dispatch(fetchUserProfile());
    } else {
      navigate("/login");
    }
  }, [dispatch, user, navigate]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error.message}</p>;

  return (
    // <div>
    //   <h1>Profile Page</h1>
    //   {profile ? (
    //     <div>
    //       <p>Email: {profile.email}</p>
    //       <p>Pseudo: {profile.userName}</p>
    //     </div>
    //   ) : (
    //     <p>Les données ne sont pas disponible.</p>
    //   )}
    // </div>
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {profile.userName}
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <Containeraccount />
    </main>
  );
};

export default Profil;
