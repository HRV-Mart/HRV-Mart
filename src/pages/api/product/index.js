import {getQueryFromURL, getRequest} from "@/service/network/network";

export default async function handler(req, res) {
    const query = getQueryFromURL(req.url, 'api/product');
    const response = await getRequest(`${process.env.BACKEND_URL}/product${query}`, {}, true);
    res.status(response.status).json(response.data);
}
