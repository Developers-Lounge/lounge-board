import { Migration } from 'rake-db'

export const change = (db: Migration, up: boolean) => {
  db.createTable('user', (t) => {
    t.string('username', { null: false, unique: true, index: true })
    t.string('email', { null: false, unique: true, index: true })
    t.string('password', { null: false })
    t.string('firstName', { null: false })
    t.string('lastName', { null: false })
    t.timestamp('confirmationSentAt')
    t.timestamp('confirmedAt')
    t.timestamp('resetPasswordSentAt')
    t.timestamps()
  })
}
