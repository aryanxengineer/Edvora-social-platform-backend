import { asyncHandler } from "@common/utils/asyncHandler.js";
import type { FollowService } from "./follow.service.js";

export class FollowController {
  constructor(private followService: FollowService) {}

  public followUser = asyncHandler(async (req: Request, res: Response) => {});
}
