import {getRequest} from "@/service/network/network";
export default async function handler(req, res) {
    const response = await getRequest(`${process.env.BACKEND_URL}/product/${req.query.productId}`, {}, true);
    res.status(response.status).json(response.data);
}
