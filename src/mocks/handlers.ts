import { RestHandler, rest } from 'msw'
import { OPERATIONS, RECORDS, postRecord } from '.'

export const handlers: RestHandler[] = [
    rest.get('/v1/operations', (_, res, ctx) =>
        res(ctx.json(OPERATIONS))
    ),

    rest.post('/v1/records', async (req, res, ctx) =>
        res(
            ctx.delay(333),
            ctx.json(postRecord(await req.json())),
            ctx.status(201),
        )
    ),

    rest.get('/v1/records', (_, res, ctx) =>
        res(ctx.json(RECORDS))
    ),
]