import { asyncHandler } from "@common/utils/asyncHandler.js";
import { SearchService } from "./search.service.js";
import { Request, Response } from "express";
import { UnauthorizedError } from "@common/errors/unauthorized.error.js";
import { BadRequestError } from "@common/errors/badRequest.error.js";
import { sendResponse } from "@common/utils/sendResponse.js";

export class SearchController {
  constructor(private searchServce: SearchService) {}

  searchQuery = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.session.user?.userId;
    const { query } = req.query;

    if (!userId) throw new UnauthorizedError();
    if (!query) throw new BadRequestError();

    if (query && query?.toString().trim() === "") {
      throw new BadRequestError("Search query should have minimum 1 character");
    }

    const results = await this.searchServce.searchQuery(
      userId,
      query.toString().trim(),
    );

    return sendResponse({
      res,
      statusCode: 200,
      message: "Users found successfully",
      data: results,
    });
  });
}
