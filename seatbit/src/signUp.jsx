import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { auth } from "./shared/firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import bg from "./assets/bg.png";

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const showError = (message) => {
    set