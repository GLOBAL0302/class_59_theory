const makeRequest = async <ResponseType>(url:string):Promise<ResponseType>=>{
    const response = await  fetch(url);
    if(response.ok){
        return response.json()
    }

    throw new Error("Something went wrong with network request")
}


export default  makeRequest