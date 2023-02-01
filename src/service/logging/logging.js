function logError(error) {
    console.error({
        type: "ERROR",
        message: error,
        time: new Date()
    });
}
function logMessage(message) {
    console.log({
        type: "MESSAGE",
        message: message,
        time: new Date()
    });
}

export {logError, logMessage}