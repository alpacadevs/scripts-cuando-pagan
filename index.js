var moment = require('moment-business-days')
moment.locale('es')

module.exports = function(app) {  
  app.message(/cuando pagan/, async ({ command, say }) => {  
    try {
      var today = moment(`${moment().format('YYYY-MM-DD')}T00:00:00-04:00`)
      var lastBusinessDayMoment = moment()
        .endOf('month')
        .isBusinessDay()
        ? moment().endOf('month')
        : moment()
          .endOf('month')
          .prevBusinessDay()
      var dateLastBusinessDay = lastBusinessDayMoment.format('YYYY-MM-DD')
      var lastBusinessDay = moment(`${dateLastBusinessDay}T00:00:00-04:00`)
      var dayMessage = moment.duration(lastBusinessDay.diff(today)).humanize()
      var dayCount = lastBusinessDay.diff(today, 'days')
      var message = ''
      var plural = dayCount > 1 ? 'n' : ''
      if (dayCount === 0) {
        message = ':tada: Hoy pagan :tada:'
      } else {
        message = `Falta${plural} ${dayMessage} para que paguen. Este mes pagan el ${lastBusinessDay.format(
          'D'
        )}, que cae ${lastBusinessDay.format('dddd')} :tired_face:`
      }
      say(message)
    } catch (error) {
      console.error(error);   
    }
  });
}
