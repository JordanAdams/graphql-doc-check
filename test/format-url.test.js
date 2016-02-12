/* eslint-env mocha */

import expect from 'expect'
import formatUrl from '../src/format-url'

describe('formatUrl', () => {
  it('should support full urls', () => {
    expect(formatUrl('http://example.com:80/graphql'))
      .toEqual('http://example.com:80/graphql')
  })

  it('should support missing path', () => {
    expect(formatUrl('http://example.com:80'))
      .toEqual('http://example.com:80/graphql')
  })

  it('should support missing port', () => {
    expect(formatUrl('http://example.com/graphql'))
      .toEqual('http://example.com:80/graphql')
  })

  it('should support missing protocol', () => {
    expect(formatUrl('example.com/graphql'))
      .toEqual('http://example.com:80/graphql')
  })
})
