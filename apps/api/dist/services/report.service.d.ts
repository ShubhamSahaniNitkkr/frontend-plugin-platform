import type { GenerateReportInput } from '@fpp/shared';
export declare function listReports(userId: string): {
    id: string;
    type: string;
    title: string;
    data: any;
    createdAt: string;
    userId: string;
}[];
export declare function generateReport(userId: string, input: GenerateReportInput): {
    id: string;
    type: string;
    title: string;
    data: any;
    createdAt: string;
    userId: string;
};
export declare function exportReport(userId: string, reportId: string, format: 'json' | 'csv'): string | null;
//# sourceMappingURL=report.service.d.ts.map