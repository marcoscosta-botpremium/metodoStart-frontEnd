export const getExtension = () => {
    const host = document.location.hostname;
    const extension = host.split('.').slice(-1)[0];
    return host !== extension ? extension : '';
}