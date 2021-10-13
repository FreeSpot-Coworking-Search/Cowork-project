function getHost() {
    const {
        NODE_ENV,
        REACT_APP_API_LOCAL_SERVER_HOST: localHost,
        REACT_APP_API_REMOTE_SERVER_HOST: remoteHost,
    } = process.env;

    const host = NODE_ENV === 'development' ? localHost : remoteHost;
    return host;
}

export { getHost };
