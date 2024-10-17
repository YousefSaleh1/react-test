export type TProtectedRouteProps = {
    element: JSX.Element;
}

export type TPagination = {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
}

export type TTask = {
    id: number;
    title: string;
    description: string;
    status: string;
    due_date: string;
}