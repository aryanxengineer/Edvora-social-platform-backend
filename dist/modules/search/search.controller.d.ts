import { SearchService } from "./search.service.js";
import { Request, Response } from "express";
export declare class SearchController {
    private searchServce;
    constructor(searchServce: SearchService);
    searchQuery: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=search.controller.d.ts.map