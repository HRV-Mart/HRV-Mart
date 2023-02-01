function logError(error) {
    console.error({
        type: "ERROR",
        message: error
    });
}
function logMessage(message) {
    console.log({
        type: "MESSAGE",
        message: message
    });
}

export {logError, logMessage}