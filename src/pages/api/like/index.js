import { logMessage } from "@/service/logging/logging";
import {getRequest, postRequest} from "@/service/network/network";

export default async function handler(req, res) {
    const authentication = req.headers.authentication;
    const token = authentication.split(":")[1];
    switch (req.method) {
        case "GET":
            let index = req.query.page;
            if (index === undefined) {
                index = 0;
            }

            const get_response = await getRequest(
                `${process.env.BACKEND_URL}/like?page=${index}`,
                token,
                true
            );
            res.status(get_response.status).json(get_response.data)
            break
        case "POST":
            const post_response = await postRequest(
                `${process.env.BACKEND_URL}/like`,
                {
                    productId: req.body.productId,
                },
                {Authentication: `bearer:${token}`, "Content-Type": "application/json"},
                false
            );
            logMessage(post_response)
            res.status(post_response.status).send(post_response.data)
            break
        default:
            res.status(404).json({message: "Not found"})
    }
}