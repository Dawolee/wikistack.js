const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

function encoder(title) {
  if (title) {
    return title.split(' ').map(fragment => fragment.replace(/[\W]+/gi, '')).join('_');
  } else {
    return Math.random().toString(36).substring(2, 7);
  }
}

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  route: {
    type: new Sequelize.VIRTUAL,
    get() {
      const root = `/wiki/${this.getDataValue('urlTitle')}`;
      return root;
    }
  },
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  },
  date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
});

Page.hook('beforeValidate', (page) => {
  page.urlTitle = encoder(page.title);
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isAlpha: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  }
});

Page.belongsTo(User, { as: 'author'});

module.exports = {
  db,
  Page,
  User
}
