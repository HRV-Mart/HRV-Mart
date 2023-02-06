import {postRequest} from "@/service/network/network";
import {logMessage} from "@/service/logging/logging";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const response = await postRequest(
                `${process.env.BACKEND_URL}/login`,
                {
                    email: req.body.email,
                    password: req.body.password
                },
                {
                    "Content-Type": "application/json"
                },
                true
            );
            res.status(response.status).json(response.data);
        }
        catch (_) {
            res.status(404).send("Auth not found")
        }
    }
    else {
        res.status(404).send("NOT FOUND");
    }
}
