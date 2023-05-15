import {getRequest} from "@/service/network/network";

export default async function handler (req, res) {
    const authentication = req.headers.authentication;
    const token = authentication.split(":")[1];

    switch(req.method) {
        case "GET":
            try {
                const response = await getRequest(`${process.env.BACKEND_URL}/order`, token, true);
                res.status(response.status).json(response.data);
            } catch (_) {
                res.status(500).json("Something went wrong");
            }
            break
        default:
            res.status(404).send("Not found")
    }
}