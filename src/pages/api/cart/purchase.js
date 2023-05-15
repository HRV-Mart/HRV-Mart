import { getRequest } from "@/service/network/network";
import {logMessage} from "@/service/logging/logging";

export default async function handler (req, res) {
    const authentication = req.headers.authentication;
    const token = authentication.split(":")[1];

    switch(req.method) {
        case "GET":
            try {
                const response = await getRequest(`${process.env.BACKEND_URL}/cart/purchase`, token, false);
                logMessage(response)
                res.status(response.status).json(response.data);
                break;
            }
            catch(_) {
                res.status(500).json("Something went wrong");
            }
    }
}