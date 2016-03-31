var moment = require('moment')

// helper to put an s at the end of words if they're plural only
var plural =
module.exports.plural = function (n) {
  return n === 1 ? '' : 's'
}

var shortString =
module.exports.shortString = function (str, len) {
  len = len || 6
  if (str.length - 3 > len)
    return str.slice(0, len) + '...'
  return str
}

var dataSizes = ['kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb']
var bytesHuman =
module.exports.bytesHuman = function (nBytes) {
  var str = nBytes + 'b'
  for (var i = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, i++) {
    str = nApprox.toFixed(2) + dataSizes[i]
  }
  return str
}

const startOfDay = moment().startOf('day')
const lastWeek = moment().subtract(1, 'weeks')
const lastYear = moment().subtract(1, 'years')
var niceDate =
module.exports.niceDate = function (ts, ago) {
  var d = moment(ts)
  if (ago)
    return d.fromNow()
  if (d.isBefore(lastYear))
    d = d.format('')
  else if (d.isBefore(lastWeek))
    d = d.format('MMM D')
  else if (d.isBefore(startOfDay))
    d = d.format('ddd h:mma')
  else
    d = d.format('h:mma')
  return d
}

var getName =
module.exports.getName = function (users, id) {
  return users.names[id] || shortString(id, 6)
}

var getProfilePic =
module.exports.getProfilePic = function (users, id) {
  var profile = users.profiles[id]
  if (profile) {
    var link

    // lookup the image link
    if (profile.byMe.image)
      return profile.byMe.image // use local user's choice...
    else if (profile.self.image)
      return profile.self.image // ...fallback to their choice
  }
  return false
}

var getProfilePicRef =
module.exports.getProfilePicRef = function (users, id) {
  var link = getProfilePic(users, id)
  return link ? link.link : false
}

var getProfilePicUrl =
module.exports.getProfilePicUrl = function (users, id, toUrl) {
  var link = getProfilePic(users, id)
  return toUrl(link && link.link, { isProfilePic: true })
}
