export interface ICustomAppContext {
  render: (...args: unknown[]) => Promise<unknown>;
}
