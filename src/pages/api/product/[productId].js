import {getRequest} from "@/service/network/network";
import {logMessage} from "@/service/logging/logging";

export default async function handler(req, res) {
    const response = await getRequest(`${process.env.BACKEND_URL}/product/${req.query.productId}`, {}, true);
    logMessage(response);
    res.status(response.status).json(response.data);
}
