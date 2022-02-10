import http from "./http-common";
export async function getCall(endPoint: string) {

    let response = await http.get<any>(endPoint);

    return response;
}