import { getCall } from "../Http/http-helpers";

export async function QuestionsClassifier(text: string) {
    let response = await getCall("f00f7597-396a-42ab-b54c-ac09d2ed8d7d/slots/production/predict?verbose=true&show-all-intents=true&log=true&subscription-key=8bd7ad09a79241e697fcd097a176ba89&query=" + text)
    return response.data["prediction"]["topIntent"];
}

export async function CommentsClassifier(text: string) {
    let response = await getCall("7dd97ba7-33c3-4cda-b70c-ddb4d9eb80f2/slots/production/predict?verbose=true&show-all-intents=true&log=true&subscription-key=8bd7ad09a79241e697fcd097a176ba89&query=" + text)
    return response.data["prediction"]["topIntent"];
}