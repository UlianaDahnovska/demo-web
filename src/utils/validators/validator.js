
export const required = (value) => {
    if (value) return undefined
    return 'Field is required'
}

export const MaxLengthCreator = (maxLength) => (value) => {
    if (value && value.length > maxLength) return `Max length is ${maxLength} symbols`
}


