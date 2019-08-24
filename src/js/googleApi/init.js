import {API_KEY, Client_ID} from "../validation";
import {execute} from "./loadcomment";

export const googleToken = () => {
  window.gapi.load("client:auth2", () => {
    window.gapi.auth2.init({ client_id: Client_ID }).then(() => {
      window.gapi.auth2.getAuthInstance()
        .signIn({ scope: "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly" })
        .then((res) => {
          localStorage.setItem('googleUser_token',res.Zi.access_token)
          loadClient()
        },
        function (err) {
          console.error("Error signing in", err);
        });
    });
  });
}

export const loadClient = () => {
  window.gapi.client.setApiKey(API_KEY);
  return window.gapi.client.load("https://content.googleapis.com/discovery/v1/apis/drive/v2/rest")
    .then(() => {
        execute()
      },
      function (err) {
        console.error("Error loading GAPI client for API", err);
      });
}