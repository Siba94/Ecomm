const isEmpty = (value) => {
    return value && Object.keys(value).length === 0;
}

module.exports = {isEmpty}