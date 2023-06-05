async function fetchData(path, body, header, method, isJson) {
    if (path.charAt(path.length - 1) == `/`) {
        path = path.slice(0, path.length - 1);
    }
    path = path.replace("/?", "?");

    try {
        const configs = {
            method: method,
            headers: header,
        };
        if (method != "GET" &&  method != "DELETE") {
            configs["body"] = JSON.stringify(body);
        }
        const result = await fetch(path, configs);

        if (isJson) {
            const data = {
                data: await result.json(),
                status: result.status
            }
            return data;
        }
        else {
            const data = {
                data: await result.text(),
                status: result.status
            }
            return data;
        }
    }
    catch (error) {
        const data = {
            data: error,
            status: 500
        }
        return data
    }
}
async function getRequest(path, token, isJson) {
    return await fetchData(
        path,
        {},
        {authentication: `bearer:${token}`},
        "GET",
        isJson
    )
}
async function postRequest(path, body, header, isJson) {
    const result = await fetchData(path, body, header, "POST", isJson);
    return result
}
async function putRequest(path, body, header, isJson) {
    const result = await fetchData(path, body, header, "PUT", isJson);
    return result
}
async function deleteRequest(path, body, header, isJson) {
    const result = await fetchData(path, body, header, "DELETE", isJson);
    return result
}
function getQueryFromURL(url, basePath) {
    // eg. of basePath = /api/product
    const query = url.replace(basePath, "").replace("/", "")
    return query
}
export { getRequest, postRequest, putRequest, deleteRequest, getQueryFromURL}