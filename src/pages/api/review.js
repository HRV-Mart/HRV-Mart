import { getQueryFromURL, getRequest, postRequest } from "@/service/network/network";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            const query = getQueryFromURL(req.url, 'api/review');
            const get_response = await getRequest(`${process.env.BACKEND_URL}/review${query}`, {}, true);
            res.status(get_response.status).json(get_response.data);
            break;
        case "POST":
            const authentication = req.headers.authentication;
            const token = authentication.split(":")[1];
            const post_response = await postRequest(
                `${process.env.BACKEND_URL}/review`,
                {
                    productId: req.body.productId,
                    title: req.body.title,
                    description: req.body.description,
                    images: req.body.images
                },
                {
                    Authentication: `bearer:${token}`,
                    "Content-Type": "application/json"
                },
                false
            );
            res.status(post_response.status).json(post_response.data);
            break;
        default:
            res.status(404).json("Not Found");
            break;
    }
}
