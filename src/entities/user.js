const { EntitySchema, BaseEntity } = require('typeorm');

class Users extends BaseEntity {
  constructor(firstName, lastName, email, message, date, location, isEmailSent,createdAt,updatedAt) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.message = message;
    this.date = date;
    this.location = location;
    this.isEmailSent = isEmailSent;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

const UserSchema = new EntitySchema({
  name: 'users',
  target: Users,
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    firstName: {
      type: 'varchar',
    },
    lastName: {
      type: 'varchar',
    },
    email: {
      type: 'varchar',
    },
    message: {
      type: 'text',
    },
    date: {
      type: 'date',
    },
    location: {
      type: 'text',
    },
    isEmailSent: {
      type: 'boolean',
      default: false,
    },
    createdAt: {
      createDate: true,
      type: 'timestamp',
    },
    updatedAt: {
      type: 'timestamp',
      updateDate: true,
    },
  },
});

module.exports = {
  Users,
  UserSchema,
};