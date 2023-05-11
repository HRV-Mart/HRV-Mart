import { deleteRequest} from "@/service/network/network";

export default async function handler(req, res) {
    const authentication = req.headers.authentication;
    const token = authentication.split(":")[1];
    switch (req.method) {
        case "DELETE":
            const delete_response = await deleteRequest(
                `${process.env.BACKEND_URL}/like/${req.query.productId}`,
                {},
                {Authentication: `bearer:${token}`},
                false
            );
            res.status(delete_response.status).json(delete_response.data)
            break
        default:
            res.status(404).json({message: "Not found"})
    }
}