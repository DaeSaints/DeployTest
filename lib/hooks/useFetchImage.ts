import axios from "axios";
import React, { useEffect, useState } from "react";

const useFetchImage = (url: string) => {
  const [image, setImage] = useState<string>("");
  useEffect(() => {
    axios
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
        setImage(imageBase64);
      })
      .catch((error) => {
        console.log(error);
        setImage("");
      });
  }, []);

  return image;
};

export default useFetchImage;
