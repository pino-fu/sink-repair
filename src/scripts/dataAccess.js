const applicationState = { // local state
    requests: [],
    plumbers: [],
    completions: []
}


const API = "http://localhost:8088" // location of database.json 

export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.plumbers = data
            }
        )
}

fetchPlumbers()


export const getPlumbers = () => {
    return [...applicationState.plumbers]
}


export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

fetchRequests()

export const getRequests = () => {
    return [...applicationState.requests] // creates copy 
}


export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (completions) => {
                applicationState.completions = completions
            }
        )
}

export const getCompletions = () => {
    return [...applicationState.completions]
}


export const sendRequest = (userServiceRequest) => {
    const mainContainer = document.querySelector("#container")

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    } 

    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}


export const sendCompletion = (serviceReciept) => {
    const mainContainer = document.querySelector("#container")

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(serviceReciept)
    }

    return fetch(`${API}/completions`, fetchOptions)
    .then(response => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
}


export const deleteRequest = (id) => {
    const mainContainer = document.querySelector("#container")

    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
    .then(
        () => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        }
    )
}

