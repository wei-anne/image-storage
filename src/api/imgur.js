// https://api.imgur.com/oauth2/authorize
// ? client_id=YOUR_CLIENT_ID
// & response_type=REQUESTED_RESPONSE_TYPE
// & state=APPLICATION_STATE

import qs from "qs";
import axios from "axios";
import { router } from "../main";

const CLIENT_ID = "b97fa3d74059657";
const ROOT_URL = "https://api.imgur.com";

export default {
    login() {
        const querystring = {
            client_id: CLIENT_ID,
            response_type: "token",
        };

        window.location = `${ROOT_URL}/oauth2/authorize?${qs.stringify(querystring)}`;
    },
    fetchImages(token) {
        return axios.get(`${ROOT_URL}/3/account/me/images`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    },
    upload(images, token) {
        router.push({name: "loading", params: { token: token } });

        // since the files uploaded which we see in the console showing filelist, is array-like object, thus we use 'Array.from()' to turn it into real array
        // use '.map()' to iterate through each item in the array
        // to let any other file or function that calls this function know when the overall upload is complete, take the array of promises, each of which represents the one upload request, returned from map function, and const it
        const promises = Array.from(images).map(image => {
            // the 'FormData()' object is part of vanilla JS spec; it allows us to take the reference to a file and actually attach the real file to the post request making to the Imgur API
            const formData = new FormData();
            // and then append that real file, which is retrieved from file reference, on a property called 'image' which is written on imgur API documentation
            formData.append("image", image);

            return axios.post(`${ROOT_URL}/3/image`, formData, {
                headers: {
                    Authorization: `Bearer ${ token }`
                },
            });
        });

        // 'Promise.all' is a built-in function that take an array of promises and waits for every one of those to be resolved before allowing this function gets called by others
        // in other words, it prevent other actions happen until all images are uploaded
        return Promise.all(promises);
    },
    delete(hashes, token) {
        router.push({ name: "loading", params: { token: token } });
        
        const promises = hashes.map(hash => {
            const imageHash = hash;
            return axios.delete(`${ROOT_URL}/3/account/me/image/${ imageHash }`, {
                headers: {
                    Authorization: `Bearer ${ token }`
                },
            });
        });

        return Promise.all(promises);
    },
};
