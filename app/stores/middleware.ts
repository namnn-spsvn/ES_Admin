import { authApis } from "@/fer-framework/fe-module-auth/apis";
import { middleware } from "fe-base/reducers";

const _middleware = middleware([authApis.middleware]);

export { _middleware };
