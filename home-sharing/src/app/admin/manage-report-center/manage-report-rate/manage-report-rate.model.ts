export interface ReportRateResponse {
  message: string;
  data: ReportRateData;
}

export class ReportRateData {
  SizePage: number;
  ReportRate: ReportRate[];
}

export interface ReportRate {
  reportID: number;
  username: string;
  imageUrl: string;
  description: string;
  reportTypeID: number;
  nameReportType: string;
  status: number;
}
