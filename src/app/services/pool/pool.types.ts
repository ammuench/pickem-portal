export interface CreatePoolObject {
  poolTitle: string;
  poolDescription?: string;
  poolStartDate: string;
  poolEndDate: string;
  poolIsPublic: boolean;
  poolGameType: "NFL" | "CFB";
}

export interface PickemPool {
  poolTitle: string;
  poolDescription: string;
  poolStartDate: string;
  poolEndDate: string;
  poolIsPublic: boolean;
  poolGameType: "NFL" | "CFB";
  poolOwnerId: string;
  poolMemberIds: string[];
  poolWeekIds: any[];
  poolInviteCode: string;
}