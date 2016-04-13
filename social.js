// var ip = require('ip')

// does `a` follow `b`?
var follows =
exports.follows = function (users, a, b) {
  var bp = users.profiles[b]
  if (!bp) return false
  return bp.followers[a]
}

// did `a` flag `b`?
var flags =
exports.flags = function (users, a, b) {
  var bp = users.profiles[b]
  if (!bp) return false
  return bp.flaggers[a]
}

// get all who `a` follows
var followeds =
exports.followeds = function (users, a) {
  var ids = []
  for (var b in users.profiles) {
    if (follows(users, a, b))
      ids.push(b)
  }
  return ids
}

// get all who `a` follows, but who doesnt follow `a` back
var followedNonfriends =
exports.followedNonfriends = function (users, a) {
  var ids = []
  for (var b in users.profiles) {
    if (follows(users, a, b) && !follows(users, b, a))
      ids.push(b)
  }
  return ids
}

// get all who follow `a`
var followers =
exports.followers = function (users, b) {
  var bp = users.profiles[b]
  if (!bp) return []
  return Object.keys(bp.followers)
}

// get all who follow `a`, but who `a` doesnt follow back
var followerNonfriends =
exports.followerNonfriends = function (users, a) {
  var ids = []
  for (var b in users.profiles) {
    if (follows(users, b, a) && !follows(users, a, b))
      ids.push(b)
  }
  return ids
}

// get all who follow `c`, who are followed by `a`
var followedFollowers =
exports.followedFollowers = function (users, a, c, includeA) {
  var ids = []
  for (var b in users.profiles) {
    if (follows(users, a, b) && follows(users, b, c))
      ids.push(b)
  }
  if (includeA && follows(users, a, c))
    ids.push(a)
  return ids
}

// get all who follow `c`, who are not followed by `a`
var unfollowedFollowers =
exports.unfollowedFollowers = function (users, a, c) {
  var ids = []
  for (var b in users.profiles) {
    if (a != b && !follows(users, a, b) && follows(users, b, c))
      ids.push(b)
  }
  return ids
}

// get all who flag `c`, who are followed by `a`
var followedFlaggers =
exports.followedFlaggers = function (users, a, c, includeA) {
  var ids = []
  for (var b in users.profiles) {
    if (follows(users, a, b) && flags(users, b, c))
      ids.push(b)
  }
  if (includeA && flags(users, a, c))
    ids.push(a)
  return ids
}

// get all who follow `a`, and who `a` follows back
var friends =
exports.friends = function (users, a) {
  // all two-way follows
  return followers(users, a).filter(function (b) {
    return follows(users, a, b)
  })
}

// TODO
// // is `id` a pub?
// var isPub =
// exports.isPub = function (id) {
//   // try to find the ID in the peerlist, and see if it's a public peer if so
//   for (var i=0; i < peers.length; i++) {
//     var peer = peers[i]
//     if (peer.key === id && !ip.isPrivate(peer.host))
//       return true
//   }
//   return false
// }

// user-sort by popularity
var sortByPopularity =
exports.sortByPopularity = function (users, a, b) {
  return followers(users, b).length - followers(users, a).length
}