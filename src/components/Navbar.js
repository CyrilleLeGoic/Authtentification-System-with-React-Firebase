import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";

export default function Navbar() {
  /* importer le state du contexte */
  const { toggleModals } = React.useContext(UserContext);

  const navigate = useNavigate();

  /* ouvrir la modal SignUp */
  const handleSignUp = () => {
    toggleModals("signUp");
  };

  /* ouvrir la modal SignIn */
  const handleSignIn = () => {
    toggleModals("signIn");
  };

  /* se déconnecter */
  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar navbar-light bg-light px-4">
      <Link to="/" className="navbar-brand">
        AuthJS
      </Link>

      <div>
        <button onClick={handleSignUp} className="btn btn-primary">
          Sign Up
        </button>

        <button onClick={handleSignIn} className="btn btn-primary ms-2">
          Sign In
        </button>

        <button onClick={logOut} className="btn btn-danger ms-2">
          Sign Out
        </button>
      </div>
    </nav>
  );
}

/* toutes les classes bootstrap sont ici: https://getbootstrap.com/docs/5.0/getting-started/introduction/ */
