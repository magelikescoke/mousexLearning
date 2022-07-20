export interface ReqData {
    query: Record<string, unknown>,
    page: {
        current: number,
        size: number,
        total: number
    }
}