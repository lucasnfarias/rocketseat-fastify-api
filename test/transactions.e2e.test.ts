import { execSync } from 'child_process'
import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { app } from '../src/app'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('should be able to create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 500,
        type: 'credit',
      })
      .expect(201)
  })

  it('should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 500,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie') as string[]

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies[0])
      .send()

    expect(listTransactionsResponse.status).toEqual(200)
    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New transaction',
        amount: 500,
      }),
    ])
  })

  it('should be able to get a specific transaction', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 500,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie') as string[]

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies[0])
      .send()

    const transactionId = listTransactionsResponse.body.transactions[0].id

    const getTransactionResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies[0])
      .send()

    expect(getTransactionResponse.status).toEqual(200)
    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: 'New transaction',
        amount: 500,
      }),
    )
  })

  it('should be able to get the summary', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 500,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie') as string[]

    await request(app.server)
      .post('/transactions')
      .set('Cookie', cookies[0])
      .send({
        title: 'Debit transaction',
        amount: 200,
        type: 'debit',
      })

    const summaryResponse = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies[0])
      .send()

    expect(summaryResponse.status).toEqual(200)
    expect(summaryResponse.body.summary).toStrictEqual({
      amount: 300,
    })
  })
})
