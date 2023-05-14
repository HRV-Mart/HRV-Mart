import {deleteRequest, getRequest} from "@/service/network/network";

export default async function handler (req, res) {
    const authentication = req.headers.authentication;
    const token = authentication.split(":")[1];

    switch(req.method) {
        case "GET":
            try {
                const response = await getRequest(
                    `${process.env.BACKEND_URL}/cart/${req.query.productId}`,
                    token,
                    true
                )
                res.status(response.status).json(parseInt(response.data, 10));
            }
            catch(_) {
                res.status(500).json("Something went wrong");
            }
            break;
        case "DELETE":
            try {
                const response = await deleteRequest(
                    `${process.env.BACKEND_URL}/cart/${req.query.productId}`,
                    {},
                    {authentication: `bearer:${token}`},
                    false
                );
                res.status(response.status).json(response.data);
            }
            catch(_) {
                res.status(500).json("Something went wrong");
            }
            break
    }
}