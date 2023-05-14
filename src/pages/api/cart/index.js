import {getRequest, putRequest} from "@/service/network/network";

export default async function handler (req, res) {
    const authentication = req.headers.authentication;
    const token = authentication.split(":")[1];

    switch(req.method) {
        case "GET":
            try {
                const response = await getRequest(`${process.env.BACKEND_URL}/cart`, token, true);
                res.status(response.status).json(response.data);
            }
            catch(_) {
                res.status(500).json("Something went wrong");
            }
            break
        case "PUT":
            try {
                const update_response = await putRequest(
                    `${process.env.BACKEND_URL}/cart`, {
                        productId: req.body.productId,
                        quantity: req.body.quantity
                }, {
                        "Content-Type": "application/json",
                        authentication: `bearer:${token}`
                    }, false
                )
                res.status(update_response.status).send(update_response.data)
            }
            catch(_) {
                res.status(500).json("Something went wrong");
            }
            break
        default:
            res.status(404).send("Not Found")
    }
}