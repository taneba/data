import { datatype } from 'faker'
import { factory, primaryKey } from '@mswjs/data'

test('returns all entities', () => {
  const db = factory({
    user: {
      id: primaryKey(datatype.uuid),
      firstName: String,
    },
  })

  db.user.create({ firstName: 'John' })
  db.user.create({ firstName: 'Kate' })
  db.user.create({ firstName: 'Alice' })

  const allUsers = db.user.getAll()
  expect(allUsers).toHaveLength(3)

  const userNames = allUsers.map((user) => user.firstName)
  expect(userNames).toEqual(['John', 'Kate', 'Alice'])
})

test('returns an empty list when found no entities', () => {
  const db = factory({
    user: {
      id: primaryKey(datatype.uuid),
      firstName: String,
    },
  })

  const allUsers = db.user.getAll()
  expect(allUsers).toEqual([])
})
