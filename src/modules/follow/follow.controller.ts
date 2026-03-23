import { asyncHandler } from "@common/utils/asyncHandler.js";
import type { FollowService } from "./follow.service.js";

export class FollowController {
  constructor(private followService: FollowService) {}

  public followProfile = asyncHandler(async (req: Request, res: Response) => {});
  public unfollowProfile = asyncHandler(async (req: Request, res: Response) => {});
  public followBackProfile = asyncHandler(async (req: Request, res: Response) => {});
  public allFollowerProfiles = asyncHandler(async (req: Request, res: Response) => {});
  public allFollowingProfiles = asyncHandler(async (req: Request, res: Response) => {});

}
