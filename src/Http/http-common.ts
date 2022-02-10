import axios from "axios";

export default axios.create({
  baseURL: "https://centralus.api.cognitive.microsoft.com/luis/prediction/v3.0/apps/"
});
