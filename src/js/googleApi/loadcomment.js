import { fileId } from "../validation";

export const execute = () => {
  return window.gapi.client.drive.comments.list({
    "fileId": fileId
  })
    .then(function (response) {
        console.log("Response", response);
      },
      function (err) {
        console.error("Execute error", err);
      });
}