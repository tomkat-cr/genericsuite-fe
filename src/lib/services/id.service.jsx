// ID Service

export const convertId = (id) => {
    return (id === null || id ==='' || typeof id === 'string' ? id : id.$oid);
}
