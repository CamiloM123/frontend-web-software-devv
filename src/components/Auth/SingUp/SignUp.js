import React, { useEffect, useState } from "react";
import { Auth } from "../../../api/auth";
import {
  Autocomplete,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./SignUp.scss";

export const SignUp = () => {
  const auth = new Auth();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(""); // Agregamos un estado para el error de correo electrónico

  useEffect(() => {
    console.log("signup");
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSetFirstname = (event) => {
    setFirstname(event.target.value);
  };

  const handleSetLastname = (event) => {
    setLastname(event.target.value);
  };

  const handleSetEmail = (event) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);

    // Validar el correo electrónico
    const regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    if (!regex.test(inputEmail)) {
      setEmailError("Email address is invalid");
    } else {
      setEmailError("");
    }
  };

  const handleSave = async () => {
    // Validar el correo electrónico antes de guardar
    if (emailError) {
      // Si hay un error en el correo electrónico, no se guarda
      console.log("Validation errors: ", emailError);
    } else {
      const data = {
        firstname: firstname,
        lastname: lastname,
        email,
        currentPassword,
      };
      console.log(data);
      try {
        const response = await auth.signUp(data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const documentTypeOptions = [
    { value: "CC", label: "Cédula de ciudadanía" },
    { value: "CE", label: "Cédula extranjera" },
    { value: "TI", label: "Tarjeta de identidad" },
    { value: "Pasaporte", label: "Pasaporte" },
  ];

  return (
    <>
      <div>
        <h2>SignUp</h2>
        <div className="auth-container">
          <form>
            <div className="auth-form">
              <div className="auth-form__row">
                <TextField
                  className="input-auth-form"
                  id="firstname"
                  value={firstname}
                  label="Firstname"
                  variant="standard"
                  onChange={handleSetFirstname}
                />
                <TextField
                  className="input-auth-form"
                  id="lastname"
                  value={lastname}
                  label="Lastname"
                  variant="standard"
                  onChange={handleSetLastname}
                />
              </div>
              <div className="auth-form__row">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={documentTypeOptions}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="DocumentType" />
                  )}
                />
              </div>
              <div className="auth-form__row">
                <TextField
                  className="input-auth-form"
                  id="email"
                  value={email}
                  label="Email"
                  variant="standard"
                  onChange={handleSetEmail}
                  error={Boolean(emailError)}
                  helperText={emailError}
                />
              </div>
              <div className="auth-form__row">
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </div>
            </div>
          </form>
          <button onClick={handleSave}>Enviar</button>
        </div>
      </div>
    </>
  );
};
