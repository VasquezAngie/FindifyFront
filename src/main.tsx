import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";

const store = createStore({
  authType: "cookie", 
  authName: "_auth",
  cookieDomain: window.location.hostname, 
  cookieSecure: false, 
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider store={store}>
    <App />
  </AuthProvider>
);
