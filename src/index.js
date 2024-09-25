import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// Bendras komentaras

// Siulyciau naudoti kodo struktura pagal featuresus ir kad augant projektui jo sudetingukas nedidetu

// pvz:

// -src
//   -components
//     -Header
//     -Footer
//     -Main
//     -MovieCard
//   -features
//     -Login
//       -components
//         -LoginForm
//       -hooks
//       -state
//       -constants
//     -Registration
//       -components
//         -RegistrationForm
//       -hooks
//       -state
//       -constants

// src->components folderyje tik tureti kvailus komponentus be jokios biznio logikos
// biznio logika turetu buti features folderyje ir suskirstyta pagal featuresus

// Taip pat darant uzduoti siulyciau fokusuotis ne i projekto dizaina ar funkcionaluma, o i koda, jo kokybe, struktura, readability. Trukstant laiko geriau jau nepabaigti funkcionalumo
