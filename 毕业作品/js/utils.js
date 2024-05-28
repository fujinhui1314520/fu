function $(element){
    return typeof element === "string" ? document.querySelector(element) : null;
}

function $_all(element){
    return typeof element === "string" ? document.querySelectorAll(element) : null;
}