import {postRequest} from "@/service/network/network";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const response = await postRequest(
                `${process.env.BACKEND_URL}/login`,
                {
                    jwt: req.body.jwt
                },
                {
                    "Content-Type": "application/json"
                },
                true
            );
            res.status(response.status).json(response.data);
        }
        catch (_) {
            res.status(404).json({message: "Auth not found"})
        }
    }
    else {
        res.status(404).json({message: "Not found"})
    }
}
