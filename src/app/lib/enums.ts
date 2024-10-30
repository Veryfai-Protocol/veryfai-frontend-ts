export enum SERVER_STATUS {
  NotConnected = '> Not connected to server.',
  Connected = '> Connected to server',
  Sending = '> Sending heatbeat to server.',
  Heartbeat = '> Heatbeat acknowledged.',
  Awaiting = '> Awaiting request from server...',
  Received = '> Request received.',
  Executing = '> Executing...',
  Submitting = 'Submitting result',
  Done = 'Process done',
}
