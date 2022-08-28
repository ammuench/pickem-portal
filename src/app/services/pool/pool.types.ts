export interface CreatePoolObject {
  poolTitle: string;
  poolDescription?: string;
  poolStartDate: string;
  poolEndDate: string;
  poolIsPublic: boolean;
  poolGameType: "NFL" | "CFB";
}