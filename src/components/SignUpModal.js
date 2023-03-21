import React, { Fragment, useContext, useRef, useState } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export default function SignUpModal() {
  // Importer le state du contexte
  const { modalState, toggleModals, signUp } = useContext(UserContext);

  const navigate = useNavigate();

  const [validation, setValidation] = useState("");

  const inputs = useRef([]);

  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };

  const formRef = useRef();


  const handleForm = async (e) => {
    e.preventDefault();
    if (
      (inputs.current[1].value.length || inputs.current[2].value.length) <= 6
    ) {
      setValidation("6 characters minimum");
      return;
    } else if (inputs.current[1].value !== inputs.current[2].value) {
      setValidation("Passwords don't match");
      return;
    }

    try {
      const cred = await signUp(
        inputs.current[0].value,
        inputs.current[1].value
      );
      formRef.current.reset();
      setValidation("");
      toggleModals("close");
      navigate("/private/private-home");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setValidation("Email already in use");
      }
      if (error.code === "auth/invalid-email") {
        setValidation("Invalid email");
      }
    }
  };

  const closeModal = () => {
    setValidation("");
    toggleModals("close");
  };

  return (
    <Fragment>
      {modalState.signUpModal && (
        <div className="position-fixed top-0 vw-100 vh-100">
          <div
            className="w-100 h-100 bg-dark bg-opacity-75"
            onClick={closeModal}
          ></div>
          <div
            className="position-absolute top-50 start-50 translate-middle bg-white p-3 rounded"
            style={{ minWidth: "400px" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header mb-3">
                  <h5 className="modal-title fs-2 fw-bold text-secondary">
                    Sign Up
                  </h5>
                  <button
                    className="btn-close p-2"
                    onClick={closeModal}
                  ></button>
                </div>

                <div className="modal-body">
                  <form
                    ref={formRef}
                    onSubmit={handleForm}
                    className="sign-up-form"
                  >
                    <div className="mb-3">
                      <label
                        className="form-label fw-bold text-primary"
                        htmlFor="signUpEmail"
                      >
                        Email address
                      </label>
                      <input
                        ref={addInputs}
                        type="email"
                        name="email"
                        required
                        className="form-control"
                        id="signUpEmail"
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        className="form-label fw-bold text-primary"
                        htmlFor="signUpPwd"
                      >
                        Password
                      </label>
                      <input
                        ref={addInputs}
                        type="password"
                        name="pwd"
                        required
                        className="form-control"
                        id="signUpPwd"
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        className="form-label fw-bold text-primary"
                        htmlFor="repeatPwd"
                      >
                        Confirm password
                      </label>
                      <input
                        ref={addInputs}
                        type="password"
                        name="pwd"
                        required
                        className="form-control"
                        id="repeatPwd"
                      />

                      <p className="text-danger mt-3">{validation}</p>
                    </div>

                    <button className="btn btn-primary w-100 fw-bold mt-4 mb-4">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
