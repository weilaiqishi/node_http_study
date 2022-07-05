export class http {
  httpMessage: {
    method?
    url?
    version?
    headers?: Record<string, string>
  }
  parse(message): void {
    this.httpMessage = {}
    const messages = message.split('\r\n');
    const [head] = messages;
    const headers = messages.slice(1, -2);
    const [body] = messages.slice(-1);
    this.parseHead(head);
    this.parseHeaders(headers);
    this.parseBody(body);
  }
  private parseHead(headStr) {
    const [method, url, version] = headStr.split(' ');
    this.httpMessage.method = method;
    this.httpMessage.url = url;
    this.httpMessage.version = version;
  }
  private parseHeaders(headers) {
    this.httpMessage.headers = {};
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      let [key, value] = header.split(":");
      key = key.toLocaleLowerCase();
      value = value.trim();
      this.httpMessage.headers[key] = value;
    }
  }
  private parseBody(str: string) {
    return str
  }
  static format(req: {
    method
    url
    version
    headers
    body
  }) {
    const head = `${req.method} ${req.url} ${req.version}`;
    let headers = '';
    for (let key in req.headers) {
    const value = req.headers[key];
    headers += `${key.toLocaleLowerCase()}: ${value}\r\n`;
    }
    const combineData = [head, headers, req.body].join('\r\n');
    return combineData;
  }
  static formatRes(res: {
    version
    status
    message
    headers
    body
  }) {
    const head = `${res.version} ${res.status} ${res.message}`;
    let headers = '';
    for (let key in res.headers) {
    const value = res.headers[key];
    headers += `${key.toLocaleLowerCase()}: ${value}\r\n`;
    }
    const combineData = [head, headers, res.body].join('\r\n');
    return combineData;
  }
}