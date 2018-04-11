/* SystemJS module definition */
declare var module: NodeModule;
declare var Stripe: any;
declare var elements: any;
interface NodeModule {
  id: string;
}
declare module "*.json" {
    const value: any;
    export default value;
}
