import React from "react";

const RegisterSW: React.FC = () => {
  React.useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(
        function (registration) {
          console.log(
            "ServiceWorker registration successful with scope: ",
            registration.scope
          );
        },
        function (err) {
          console.log("ServiceWorker registration failed: ", err);
        }
      );
    }

    window.addEventListener("beforeinstallprompt", (e) => e.preventDefault());
  }, []);

  return null;
};

export default RegisterSW;
