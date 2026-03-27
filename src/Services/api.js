import { GenerateHash, getUserToken } from "@/utils/helper";
import { getCachedToken, setCachedToken } from "@/utils/TokenCache";

const ApiCall = async ({
    url,
    method = 'GET',
    body,
    header = {},
    extra_payload = {},
    skipVerify = false,
    cache = "no-store"
}) => {
    try {
        const cacheToken = getCachedToken()
        const token = cacheToken ? { token: cacheToken?.jwt_token, } : await getUserToken();
        if (!skipVerify) {
            const urlObj = new URL(url);
            const params = Object.fromEntries(urlObj.searchParams.entries());
            const BODY = body ? body : {}

            const extraPayload = Object.fromEntries(
                Object.entries(extra_payload).map(([key, value]) => [key, typeof value === 'number' ? String(value) : value])
            );
            const DATA = { ...BODY, ...params, ...extraPayload }
            if (Object.keys(DATA).length > 0) {
                const hash = GenerateHash(JSON.stringify(DATA))
                header['x-verify'] = hash
            }
        }
        const res = await fetch(url, {
            method,
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json', "Authorization": token.token || token || null, ...header, },
            cache: cache
        });
        if (res.status == 406) {
            // it means jwt token revoked
            await deleteTokenCall()
        } else {
            const DATA = await res.json();
            if (DATA?.jwt_token) {
                setCachedToken({ jwt_token: DATA?.jwt_token, });
                await ApiCall({ url: '/api/set-cookie', body: { token: { jwt_token: DATA?.jwt_token } }, method: "POST", skipVerify: true });
            }
            return DATA
        }

    } catch (error) {
        console.log(error)
        return null;
    }
};


export const TokenApiCall = async ({
    url,
    cache = "no-store"
}) => {
    try {
        const res = await fetch(url, {
            method: "GET",
            headers: { 'Content-Type': 'application/json', },
            cache: cache
        });
        return await res.json();
    } catch (error) {
        return null;
    }
};



export default ApiCall;
