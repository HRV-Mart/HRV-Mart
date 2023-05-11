import {getRequest, postRequest} from "@/service/network/network";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            let index = req.query.page;
            if (index === undefined) {
                index = 0;
            }
            const authentication = req.headers.authentication;
            const token = authentication.split(":")[1];

            const response = await getRequest(
                `${process.env.BACKEND_URL}/like?page=${index}`,
                token,
                true
            );
            res.status(response.status).json(response.data)
            break
        default:
            res.status(404).json({message: "Not found"})
    }
}