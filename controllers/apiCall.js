// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = process.env.API_CLARIFAI_PAT;
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = 'yyuqss';
const APP_ID = 'face_recognition_brain';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';


const handleApiCall = (req, res) => {
    const { input } = req.body;

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": input
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(result => {
            res.json(result.outputs[0].data.regions)
        })
        .catch(err => res.status(400).json("Couldn't calculate the face location"));
}

module.exports = {
    handleApiCall: handleApiCall
};