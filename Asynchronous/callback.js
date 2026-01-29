// Callback Hell(Nested callbacks)

function getUser(userId, callback) {
    setTimeout(() => {
        callback(null, {id: userId});
    }, 1000);
}

function getUserPosts(user, callback) {
    setTimeout(() => {
        callback(null, ['Post 1', 'Post 2']);
    }, 1000);
}

// These nested callbacks create a callback hell
getUser(1, (error, user) => {
    if(error) {
        console.error(error);
        return;
    }
    console.log('User:', user.id);
    getUserPosts(user, (error, posts) => {
        if(error) {
            console.error(error);
            return;
        }
        console.log('Posts:', posts);
    });
});