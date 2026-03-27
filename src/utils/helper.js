import { TokenApiCall } from "@/Services/api";
import { getCachedToken } from "./TokenCache";

export function GenerateHash(dictInput) {
    try {
        let text = Buffer.from(dictInput).toString("base64")
        text = text + process.env.HASH_KEY
        const shaObj = new jsSHA("SHA-256", "TEXT", { encoding: "UTF8" });
        shaObj.update(text);

        const hash = shaObj.getHash("HEX");
        return hash;
    } catch (ex) {
    }
}


export const getUserToken = async () => {
    const cacheToken = getCachedToken()
    if (cacheToken) {
        return { token: cacheToken?.jwt_token }
    } else {
        const res = await TokenApiCall({ url: '/api/get-cookie', });
        return { token: res?.token, refresh_token: res?.refresh_token }
    }
};
