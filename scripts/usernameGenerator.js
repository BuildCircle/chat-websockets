function newUser(users) {
    const color = ["Red", "Green", "Blue", "Yellow", "Purple"]
    const adjective = ["Shy", "Brave", "Hungry", "Diminutive", "Intelligent"]
    const animal = ["Racoon", "Bear", "Ox", "Panda", "Gecko"]

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    let username = `${color[getRandomInt(5)]}${adjective[getRandomInt(5)]}${animal[getRandomInt(5)]}`
    users.push(username);
}

module.exports = newUser;
