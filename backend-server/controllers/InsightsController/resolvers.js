const moment = require('moment');

function doubleDigitMonth(month) {
  return month < 10 ? `0${month}` : month;
}

function getBetweenDates(year, from, to) {
  const startDate = `${year}-${doubleDigitMonth(from)}-01`;

  const date = new Date(year, to, 0);
  const endDate = `${year}-${doubleDigitMonth(to)}-${date.getDate()}`;

  return { startDate, endDate };
}

module.exports = {
  Query: {
    getAppSummary: async (_, { appId, from, to, year }, { Metrics, Op, sequelize }) => {
      const { startDate, endDate } = getBetweenDates(year, from + 1, to + 1);

      const metricsQuery = await Metrics.findAndCountAll({
        where: {
          appId,
          [Op.and]: [
            sequelize.where(sequelize.fn('date', sequelize.col('createdAt')), '>=', startDate),
            sequelize.where(sequelize.fn('date', sequelize.col('createdAt')), '<=', endDate)
          ]
        }
      });

      const metrics = {
        visitors: {},
        visitorsByDay: {},
        visitorsByMonth: {},
        trafficByDay: {},
        trafficByMonth: {},
        hitsPerPage: {}
      };
      if (metricsQuery.count > 0) {
        metricsQuery.rows.forEach(item => {
          metrics['visitors'][item.ipAddress] = 1;

          const dayMonth = item.createdAt.substring(5, 10);
          const month = item.createdAt.substring(5, 7);
          metrics['visitorsByDay'][dayMonth] = metrics['visitorsByDay'][dayMonth] || {};
          metrics['visitorsByDay'][dayMonth][item.ipAddress] = 1;
          metrics['visitorsByMonth'][month] = metrics['visitorsByMonth'][month] || {};
          metrics['visitorsByMonth'][month][item.ipAddress] = 1;

          metrics['trafficByDay'][dayMonth] = metrics['trafficByDay'][dayMonth] || 0;
          metrics['trafficByDay'][dayMonth] = metrics['trafficByDay'][dayMonth] + 1;
          metrics['trafficByMonth'][month] = metrics['trafficByMonth'][month] || 0;
          metrics['trafficByMonth'][month] = metrics['trafficByMonth'][month] + 1;

          metrics['hitsPerPage'][item.pageName] = metrics['hitsPerPage'][item.pageName] || 0;
          metrics['hitsPerPage'][item.pageName] = metrics['hitsPerPage'][item.pageName] + 1;
        });
      }

      const start = moment(startDate);
      const end = moment(endDate);

      const dayCounter = end.diff(start, 'day');
      const weekCounter = end.diff(start, 'week');
      const monthCounter = end.diff(start, 'month');

      const result = { visitors: { day: 0, month: 0, week: 0 } };

      result['visitors']['day'] = Object.keys(metrics['visitors']).length / (dayCounter + 1);
      result['visitors']['week'] = Object.keys(metrics['visitors']).length / weekCounter;
      result['visitors']['month'] = Object.keys(metrics['visitors']).length / (monthCounter + 1);

      result['visitorsByDay'] = metrics['visitorsByDay'];
      result['visitorsByMonth'] = metrics['visitorsByMonth'];
      result['trafficByDay'] = metrics['trafficByDay'];
      result['trafficByMonth'] = metrics['trafficByMonth'];
      result['hitsPerPage'] = metrics['hitsPerPage'];

      return JSON.stringify(result);
    },
    getSummary: async (
      _,
      { from, to, year },
      { Metrics, Op, sequelize, Rating, Comment, Application, User }
    ) => {
      const { startDate, endDate } = getBetweenDates(year, from + 1, to + 1);

      const whereQuery = [
        sequelize.where(sequelize.fn('date', sequelize.col('createdAt')), '>=', startDate),
        sequelize.where(sequelize.fn('date', sequelize.col('createdAt')), '<=', endDate)
      ];

      const metricsQuery = await Metrics.findAndCountAll({
        where: {
          [Op.and]: whereQuery
        }
      });

      const ratingsQuery = await Rating.findAndCountAll({
        where: {
          [Op.and]: whereQuery
        }
      });

      const commentsQuery = await Comment.findAndCountAll({
        where: {
          [Op.and]: whereQuery
        }
      });

      const usersNo = await User.count();

      // //group metrics
      const metrics = {
        visitors: {},
        traffic: {},
        clickThrough: {},
        agVisitors: {}
      };

      if (metricsQuery.count > 0) {
        metricsQuery.rows.forEach(item => {
          metrics['visitors'][item.ipAddress] = 1;

          metrics['traffic'][item.appId] = metrics['traffic'][item.appId] || 0;
          metrics['traffic'][item.appId] = metrics['traffic'][item.appId] + 1;

          if (item.appId === 'c5515c13-36f2-4374-a210-86dcd22d865d') {
            metrics['agVisitors'][item.ipAddress] = 1;
          }

          if (item.type === 'clickThrough') {
            metrics['clickThrough'][item.appId] = metrics['clickThrough'][item.appId] || 0;
            metrics['clickThrough'][item.appId] = metrics['clickThrough'][item.appId] + 1;
          }
        });
      }

      //group ratings
      const ratings = {};
      if (ratingsQuery.count > 0) {
        ratingsQuery.rows.forEach(item => {
          ratings[item.appId] = ratings[item.appId] || {};
          ratings[item.appId]['noOfStars'] = ratings[item.appId]['noOfStars'] || 0;
          ratings[item.appId]['sumOfStars'] = ratings[item.appId]['sumOfStars'] || 0;

          ratings[item.appId]['noOfStars'] = ratings[item.appId]['noOfStars'] + 1;
          ratings[item.appId]['sumOfStars'] = ratings[item.appId]['sumOfStars'] + item.stars;
        });
      }

      const result = { apps: {} };
      const applications = await Application.findAndCountAll({
        where: { archived: false, _id: { [Op.not]: 'c5515c13-36f2-4374-a210-86dcd22d865d' } },
        order: [['title', 'ASC']]
      });

      applications.rows.forEach(app => {
        result['apps'][app._id] = {
          title: app.title,
          traffic: metrics['traffic'][app._id] ? metrics['traffic'][app._id] : 0,
          clickThrough: metrics['clickThrough'][app._id] ? metrics['clickThrough'][app._id] : 0,
          ratings: ratings[app._id]
            ? ratings[app._id]['sumOfStars'] / ratings[app._id]['noOfStars']
            : 0
        };
      });

      const start = moment(startDate);
      const end = moment(endDate);

      const dayCounter = end.diff(start, 'day');
      const weekCounter = end.diff(start, 'week');
      const monthCounter = end.diff(start, 'month');

      result['visitors'] = { day: 0, week: 0, month: 0 };

      if (Object.keys(metrics['visitors']).length > 0) {
        result['visitors']['day'] = Object.keys(metrics['visitors']).length / (dayCounter + 1);
        result['visitors']['week'] = Object.keys(metrics['visitors']).length / weekCounter;
        result['visitors']['month'] = Object.keys(metrics['visitors']).length / (monthCounter + 1);
      }

      //AG visitors
      result['AGTraffic'] = { day: 0, week: 0, month: 0 };

      const agVisitors = Object.keys(metrics['agVisitors']).length;
      if (agVisitors > 0) {
        result['AGTraffic']['day'] = agVisitors / (dayCounter + 1);
        result['AGTraffic']['week'] = agVisitors / weekCounter;
        result['AGTraffic']['month'] = agVisitors / (monthCounter + 1);
      }

      result['ratings'] = ratingsQuery.count;
      result['comments'] = commentsQuery.count;
      result['applications'] = applications.count;
      result['users'] = usersNo;

      return JSON.stringify(result);
    }
  }
};
