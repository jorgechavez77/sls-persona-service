const repo = require('../repository')
const handler = require('../handler')

jest.mock('../repository')


describe(`handler`, () => {

  describe(`createPersona`, () => {
    test(`should complete happy path`, async () => {
      // given
      const data = {
        foo: 'bar'
      }
      const event = {
        body: data
      }
      repo.createPersona = jest.fn().mockResolvedValueOnce(123)
      repo.findPersona = jest.fn().mockResolvedValueOnce({ id: 123, foo: 'bar', other: 'other' })

      // when
      const result = await handler.createPersona(event)

      // then it should
      expect(repo.createPersona).toHaveBeenCalledWith(data)
      expect(repo.findPersona).toHaveBeenCalledWith(123)
      expect(result).toEqual({
        statusCode: 201,
        body: { id: 123, foo: 'bar', other: 'other' }
      })
    })
  })

  describe(`findPersona`, () => {
    test(`should complete happy path`, async () => {
      // given
      const event = {
        pathParameters: {
          id: 123
        }
      }
      repo.findPersona = jest.fn().mockResolvedValueOnce({
        id: 123,
        foo: 'bar'
      })


      // when
      const result = await handler.findPersona(event)

      // it should
      expect(repo.findPersona).toHaveBeenCalledWith(123)
      expect(result).toEqual({
        statusCode: 201,
        body: {
          id: 123,
          foo: 'bar'
        }
      })
    })
  })

  describe(`updatePersona`, () => {
    test(`should complete happy path`, async () => {
      // given
      const event = {
        pathParameters: {
          id: 123
        },
        body: {
          foo: 'baz'
        }
      }
      repo.updatePersona = jest.fn().mockResolvedValueOnce({
        nModified: 1
      })

      // when
      const result = await handler.updatePersona(event)

      // then it should
      expect(repo.updatePersona).toHaveBeenCalledWith(123, { foo: 'baz' })
      expect({
        statusCode: 200,
        body: {
          message: "Resource updated successfully"
        }
      })
    })

    test(`should complete not updated path`, async () => {
      // given
      const event = {
        pathParameters: {
          id: 125
        },
        body: {
          foo: 'baz'
        }
      }
      repo.updatePersona = jest.fn().mockResolvedValueOnce({
        nModified: 0
      })

      // when
      const result = await handler.updatePersona(event)

      // then it should
      expect(repo.updatePersona).toHaveBeenCalledWith(125, { foo: 'baz' })
      expect({
        statusCode: 200,
        body: {
          message: "Resource not updated"
        }
      })
    })
  })
})