class Room {
  constructor(id, users = [], map = null) {
    this.id = id
    this.name = `room ${id}`
    this.users = users
    this.messages = []
    this.map = map ?? { rdv: null, usersPositions: [], restoSelected: null }
  }

  getId() {
    return this.id
  }

  getName() {
    return this.name
  }

  getUsers() {
    return this.users
  }

  addUser(user) {
    this.users.push(user)
  }

  removeUser(user) {
    this.users.splice(
      this.users.findIndex((u) => u.id === user.id),
      1
    )
  }

  getMessages() {
    return this.messages
  }

  addMessage(message) {
    this.messages.push(message)
  }

  getMap() {
    return this.map
  }

  setMap(map) {
    this.map = map
  }

  processMap(newMapData) {}
}

module.exports = Room
