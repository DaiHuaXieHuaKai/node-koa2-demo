const prod = process.NODE_ENV === "production"
export default {
    URL: prod ? '' : 'https://infinite.bestfullstack.com'
}