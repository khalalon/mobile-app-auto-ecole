import React from "react";
import { Amplify } from "aws-amplify";
import { awsConfig } from "./aws-exports";
import AuthNavigator from "./navigation/AuthNavigator";
import "./globals.css";


Amplify.configure(awsConfig);

export default function App() {
  return <AuthNavigator />;
}
