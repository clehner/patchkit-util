# Patchkit Util

```js
import * as u from 'patchkit-util'
import * as social from 'patchkit-util/social'

u.plural(0) // => 's'
u.plural(1) // => ''
u.plural(2) // => 's'

u.shortString('123456789') // => '123456...'
u.shortString('123456789', 3) // => '123...'

u.bytesHuman(500) => '500b'
u.bytesHuman(1024) => '1kb'
u.bytesHuman(1024*1024) => '1mb'
// etc

u.niceDate(Date.now()) // => '4:35pm'
u.niceDate(Date.now() - ONEDAY) // => 'Mon 4:35pm'
u.niceDate(Date.now() - ONEWEEK) // => 'Jan 5'
u.niceDate(Date.now(), true) // 'a few seconds ago'
u.niceDate(Date.now() - ONEDAY, true) // => 'one day ago'
u.niceDate(Date.now() - ONEWEEK, true) // => '7 days ago'

u.getName(users, knownUserId) => 'bob'
u.getName(users, unknownUserId) => '@dkc12e...'

u.getProfilePic(users, userId) => blob link
u.getProfilePicRef(users, userId) => blob ref
u.getProfilePicUrl(users, userId, toUrl) => blob url

// does `a` follow `b`?
social.follows(users, a, b) => bool

// did `a` flag `b`?
social.flags(users, a, b) => bool

// get all who `a` follows
social.followeds(users, a) => userIds

// get all who `a` follows, but who doesnt follow `a` back
social.followedNonfriends(users, a) => userIds

// get all who follow `a`
social.followers(users, b) => userIds

// get all who follow `a`, but who `a` doesnt follow back
social.followerNonfriends(users, a) => userIds

// get all who follow `c`, who are followed by `a`
social.followedFollowers(users, a, c, includeA?) => userIds

// get all who follow `c`, who are not followed by `a`
social.unfollowedFollowers(users, a, c) => userIds

// get all who flag `c`, who are followed by `a`
social.followedFlaggers(users, a, c, includeA?) => userIds

// get all who follow `a`, and who `a` follows back
social.friends(users, a) => userIds

// user-sort by # of followers
social.sortByPopularity(users, a, b) => sort integer (-1|0|1)
```