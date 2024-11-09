export enum SERVER_STATUS {
  NotConnected = '> Not connected to server.',
  Connecting = '> Connecting to server...',
  Connected = '> Connected to server',
  Sending = '> Sending heatbeat to server...',
  Heartbeat = '> Heatbeat acknowledged.',
  Heartbeat_failed = "> Couldn't send heatbeat",
  Awaiting = '> Awaiting request from server...',
  Received = '> Request received.',
  Nothing = '> No task Received',
  Executing = '> Executing...',
  Submitting = '> Submitting result...',
  Done = '> Executed',
  Model = '> Setting up model...',
}

export enum COOKIE_KEYS {
  AccessToken = 'access_token',
}
