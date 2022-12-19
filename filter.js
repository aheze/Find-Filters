// ?title=title&description=some%20devs&icon=bubble.left&color=4283699240&dateCreated=2022-03-28T19%3A33%3A10Z&words=another%20word,hi

/** @typedef {{ name: string; value: string }} SearchParam */

var r = document.querySelector(':root');

const applink = document.getElementById("applink");
const titleElement = document.getElementById("title");
const descriptionElement = document.getElementById("description");

/**
 * Get the search parameters
 * @param {string} search - A query string
 * @returns {SearchParam[]} The search parameters
 */
const getSearchQueries = (search) => {
    let parameters = search.split("&");
    let queries = [];

    for (i = 0; i < parameters.length; i++) {
        let parameter = parameters[i];
        let parameterSplit = parameter.split("=");

        let name = parameterSplit[0];
        let value = parameterSplit[1];

        let query = { name: name, value: value };
        queries.push(query);
    }

    return queries;
};


const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

window.onload = () => {

    titleElement.innerText = params.title ?? "Untitled";
    descriptionElement.innerText = params.description ?? "No Description";

    const kind = params.kind ?? "";
    const data = params.data ?? "";
    console.log(data);

    const payload = `?type=filter&kind=${kind}&data=${encodeURIComponent(data)}`;
    const deepLink = `findapp://${payload}`;
    console.log(deepLink);

    applink.href = deepLink;
};
