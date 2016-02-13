/* eslint-env mocha */

import expect from 'expect'
import sinon from 'sinon'
import 'sinon-as-promised'
import retriever from '../src/retriever'

describe('retriever', function (done) {
  it('should retrieve a schema', function (done) {
    const request = sinon.stub().resolves({
      data: { schema: {} }
    })

    retriever(request).get()
      .then(() => {
        expect(request.calledOnce).toEqual(true)
        done()
      })
      .catch(console.error)
  })
})
