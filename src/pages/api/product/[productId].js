import { logMessage } from "@/service/logging/logging";
import {getRequest} from "@/service/network/network";
export default async function handler(req, res) {
    const response = await getRequest(`${process.env.BACKEND_URL}/product/${req.query.productId}`, {}, true);

    const authentication = req.headers.authentication;
    if (authentication !== undefined) {
        const token = authentication.split(":")[1];

        const like_response = await getRequest(
            `${process.env.BACKEND_URL}/like/${req.query.productId}`,
            token,
            false
        );

        logMessage(like_response);
    }

    res.status(response.status).json(response.data);
}
