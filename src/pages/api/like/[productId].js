import { logError } from "@/service/logging/logging";
import { deleteRequest, getRequest} from "@/service/network/network";

export default async function handler(req, res) {
    const authentication = req.headers.authentication;
    const token = authentication.split(":")[1];
    switch (req.method) {
        case "GET":
            const get_response = await getRequest(
                `${process.env.BACKEND_URL}/like/${req.query.productId}`,
                token,
                false
            );
            res.status(get_response.status).send(get_response.data);
            break;
        case "DELETE":
            try {
                const delete_response = await deleteRequest(
                    `${process.env.BACKEND_URL}/like/${req.query.productId}`,
                    {},
                    {authentication: `bearer:${token}`},
                    false
                );
                res.status(delete_response.status).json(delete_response.data)
                break
            }
            catch(error) {
                logError(error)
                res.status(500).send(error.message);
                    
            }
        default:
            res.status(404).json({message: "Not found"})
    }
}