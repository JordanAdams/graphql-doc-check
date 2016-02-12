import nodeUrl from 'url'

export default function (url) {
  // Ensure protocol
  if (/^.*?:\/\//.test(url) === false) {
    url = 'http://' + url
  }

  // Parse url
  const parsedUrl = nodeUrl.parse(url)
  parsedUrl.host = null

  // Ensure path
  if (/[^\/]$/.test(url)) {
    parsedUrl.pathname = '/graphql'
  }

  // Ensure port
  parsedUrl.port = parsedUrl.port || 80

  return parsedUrl.format()
}
