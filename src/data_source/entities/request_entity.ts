
export enum BuiltinSocketEvent {
  connect = "connect",
  disconnect = "disconnect",
  socket_response = "socket_response",
  socket_error = "socket_error",
  send_message = "send_message",
  server_response = "server_response",
  connect_error = "connect_error",
  reconnect_error = "reconnect_error",
  reconnect = "reconnect",
}

export enum RequestEvent {
  getAnnouncement = "getAnnouncement",
  addAnnouncement = "addAnnouncement",
  getUser = "getUser",
  updateUser = "updateUser",
}