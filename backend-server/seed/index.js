const models = require('../libraries/dbPgConnect');
const fs = require('fs');

/** Models */
const {
  Application,
  DataSource,
  TargetAudience,
  Contributor,
  User,
  Phase,
  Support,
  Rating,
  Comment,
  Sequelize,
  sequelize,
  Metrics
} = models;

/** Data */
const appData = require('./applications.json');
const dataSources = require('./dataSources.json');
const targetAudience = require('./targetAudience.json');
const contributors = require('./contributors.json');
const users = require('./users.json');
const appPhases = require('./appPhases.json');

models.sequelize.sync({ sync: true }).then(async () => {
  sequelize
    .query('ALTER TABLE applications ADD COLUMN "contributors" json[] DEFAULT ARRAY[]::json[]')
    .then(() => {
      console.log('true');
      process.exit();
    })
    .catch(err => {
      console.log(err);
      process.exit();
    });
  //
  // await Rating.destroy({ truncate: true });
  // await Rating.bulkCreate([
  //   {
  //     createdAt: '2019-10-01',
  //     stars: 3,
  //     userId: '986a4a67-4298-4ce1-adbe-277eb576651a',
  //     appId: 'e57d1e93-f344-42ac-b145-d7ddab78791b'
  //   },
  //   {
  //     createdAt: '2019-10-01',
  //     stars: 4,
  //     userId: '986a4a67-4298-4ce1-adbe-277eb576651a',
  //     appId: '6fecf291-b1e0-4e79-bdbf-a0f6a71ef9a3'
  //   }
  // ]);
  // await Rating.drop();
  // await Comment.drop();
  // models.sequelize
  //   .query("select _id, 'createdAt'::text  from ratings", { raw: true })
  //   .then(ratings => {
  //     console.log(ratings);
  //     process.exit();
  //   });
  // await Rating.destroy({ truncate: true });
  // await Comment.destroy({ truncate: true });
  // await User.update({ ratings: [] }, { where: { _id: { [Sequelize.Op.ne]: null } } });
  // await Application.bulkCreate(appData);
  // await DataSource.bulkCreate(dataSources);
  // await TargetAudience.bulkCreate(targetAudience);
  // await Contributor.bulkCreate(contributors);
  // await User.bulkCreate(users);
  // await Phase.bulkCreate(appPhases);
  //
});
