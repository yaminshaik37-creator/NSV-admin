let cachedToken = null;

export const setCachedToken = ({ jwt_token, }) => {
    cachedToken = { jwt_token, };
};

export const getCachedToken = () => cachedToken;
