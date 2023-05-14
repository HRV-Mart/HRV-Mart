import {deleteRequest} from "@/service/network/network";

export default async function handler (req, res) {
    const authentication = req.headers.authentication;
    const token = authentication.split(":")[1];

    switch(req.method) {
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