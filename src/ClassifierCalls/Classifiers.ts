import { getCall } from "../Http/http-helpers";

export async function QuestionsClassifier(text: string) {
    let response = await getCall("30596328-6649-4564-abee-923973e4632d/slots/staging/predict?verbose=true&show-all-intents=true&log=true&subscription-key=1178a63d6a6a4872a50a27eee7056a8b&query=" + text)
    return response.data["prediction"]["topIntent"];
}

export async function CommentsClassifier(text: string) {
    let response = await getCall("6a72741b-9af2-4193-96ae-9f6a3cf66c12/slots/production/predict?verbose=true&show-all-intents=true&log=true&subscription-key=1178a63d6a6a4872a50a27eee7056a8b&query=" + text)
    return response.data["prediction"]["topIntent"];
}