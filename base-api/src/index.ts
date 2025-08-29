import { ofetch } from "ofetch";

class ApiBase {
  fetch: any;

  constructor(opts: any) {
    // @ts-ignore
    const myFetch = globalThis.$fetch || ofetch;
    this.fetch = myFetch.create(opts);
  }
}

export class ThingApi extends ApiBase {
  constructor(opts: any) {
    super(opts);
  }

  async getThings(page?: number) {
    return this.fetch(`/api/things?page=${page || 0}`);
  }
}
