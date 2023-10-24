import axios from "axios";

export const fetchUpload = async (url: string) => {
  const image = await axios
    .get(url, {
      responseType: "arraybuffer",
    })
    .then((response) => {
      const image = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      const imageBase64 = `data:${response.headers[
        "content-type"
      ].toLowerCase()};base64,${image}`;
      return imageBase64;
    })
    .catch((error) => {
      console.log(error);
      return "";
    });

  return image;
};
