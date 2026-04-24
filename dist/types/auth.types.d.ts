import type { JwtPayload as BaseJwtPayload } from "jsonwebtoken";
export interface AuthJwtPayload extends BaseJwtPayload {
    userId: string;
}
//# sourceMappingURL=auth.types.d.ts.map