import {getRequest} from "@/service/network/network";
import {logMessage} from "@/service/logging/logging";

export default async function handler(req, res) {
    const response = await getRequest(`${process.env.BACKEND_URL}/product`, {}, true);
    logMessage(response);
    res.status(response.status).json(response.data);
}
