export const headersConfig = token => {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}