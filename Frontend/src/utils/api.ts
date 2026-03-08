// LabourHand API Client
// All API calls go through here. JWT token is auto-attached from localStorage.

const BASE_URL = 'http://localhost:8081/api';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

async function request<T>(method: Method, path: string, body?: unknown): Promise<T> {
    const sessionStr = localStorage.getItem('labourhand_session');
    let token = null;
    if (sessionStr) {
        try {
            token = JSON.parse(sessionStr).token;
        } catch (e) {
            console.error("Error parsing session string", e);
        }
    }

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${BASE_URL}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
        const err = await res.text();
        throw new Error(err || `HTTP ${res.status}`);
    }

    // 204 No Content
    if (res.status === 204) return undefined as T;
    return res.json() as Promise<T>;
}

// ─── Auth ────────────────────────────────────────────────────────────────────
export interface AuthUser {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: 'WORKER' | 'OWNER';
    avatar?: string;
    verified: boolean;
    language: string;
    // Worker fields
    specialization?: string;
    yearsExperience?: number;
    rating?: number;
    completedJobs?: number;
    bio?: string;
    skillsIndiaVerified?: boolean;
    onTimeRate?: number;
    rehireRate?: number;
    workerStatus?: string;
    skills?: string[];
    // Owner fields
    companyName?: string;
    projectsPosted?: number;
}

export interface AuthResponse {
    token: string;
    user: AuthUser;
}

export const authApi = {
    login: (email: string, password: string) =>
        request<AuthResponse>('POST', '/auth/login', { email, password }),

    register: (data: {
        name: string; email: string; phone: string; password: string;
        role: 'WORKER' | 'OWNER'; companyName?: string; specialization?: string; language?: string;
    }) => request<AuthResponse>('POST', '/auth/register', data),
};

// ─── Users ───────────────────────────────────────────────────────────────────
export const userApi = {
    getMe: () => request<AuthUser>('GET', '/users/me'),
    updateMe: (data: Partial<AuthUser>) => request<AuthUser>('PUT', '/users/me', data),
    getAll: () => request<AuthUser[]>('GET', '/users'),
    getById: (id: number) => request<AuthUser>('GET', `/users/${id}`),
};

// ─── Projects ────────────────────────────────────────────────────────────────
export interface Project {
    id: number;
    title: string;
    description: string;
    category: string;
    budget: number;
    timelineDays: number;
    location: string;
    lat?: number;
    lng?: number;
    status: string;
    ownerId: number;
    ownerName: string;
    progress: number;
    deadline?: string;
    postedAt: string;
    bidCount: number;
    distanceKm?: number;
}

export const projectApi = {
    getAll: () => request<Project[]>('GET', '/projects'),
    getNearby: (lat = 12.9716, lng = 77.5946, radius = 10.0) =>
        request<Project[]>('GET', `/projects/nearby?lat=${lat}&lng=${lng}&radius=${radius}`),
    getByCategory: (cat: string) => request<Project[]>('GET', `/projects/category/${cat}`),
    getMyProjects: () => request<Project[]>('GET', '/projects/my'),
    getById: (id: number | string) => request<Project>('GET', `/projects/${id}`),
    create: (data: Partial<Project>) => request<Project>('POST', '/projects', data),
    update: (id: number, data: Partial<Project>) => request<Project>('PUT', `/projects/${id}`, data),
    updateProgress: (id: number, progress: number, status?: string) =>
        request<Project>('PUT', `/projects/${id}/progress`, { progress, status }),
    delete: (id: number) => request<void>('DELETE', `/projects/${id}`),
};

// ─── Bids ────────────────────────────────────────────────────────────────────
export interface Bid {
    id: number;
    projectId: number;
    projectTitle: string;
    projectLocation: string;
    projectStatus: string;
    progress: number;
    workerId: number;
    workerName: string;
    workerAvatar?: string;
    workerRating: number;
    workerCompletedJobs: number;
    workerVerified: boolean;
    amount: number;
    estimatedDays: number;
    message: string;
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
    recommended: boolean;
    submittedAt: string;
    distanceKm?: number;
}

export const bidApi = {
    getProjectBids: (projectId: number | string) =>
        request<Bid[]>('GET', `/projects/${projectId}/bids`),
    getMyBids: () => request<Bid[]>('GET', '/bids/my'),
    getById: (id: number) => request<Bid>('GET', `/bids/${id}`),
    place: (data: { projectId: number; amount: number; estimatedDays: number; message: string }) =>
        request<Bid>('POST', '/bids', data),
    update: (id: number, data: { amount: number; estimatedDays: number; message: string }) =>
        request<Bid>('PUT', `/bids/${id}`, data),
    withdraw: (id: number) => request<void>('DELETE', `/bids/${id}`),
    accept: (id: number) => request<Bid>('PUT', `/bids/${id}/accept`),
    reject: (id: number) => request<Bid>('PUT', `/bids/${id}/reject`),
};

// ─── Workers ─────────────────────────────────────────────────────────────────
export interface WorkerReview {
    id: number;
    projectId: number;
    projectName: string;
    clientName: string;
    rating: number;
    comment: string;
    duration: string;
    createdAt: string;
}

export interface Certification {
    id: number;
    name: string;
    issuer: string;
    year: string;
}

export const workerApi = {
    getAll: () => request<AuthUser[]>('GET', '/workers'),
    getById: (id: number | string) => request<AuthUser>('GET', `/workers/${id}`),
    getReviews: (id: number | string) => request<WorkerReview[]>('GET', `/workers/${id}/reviews`),
    getCertifications: (id: number | string) =>
        request<Certification[]>('GET', `/workers/${id}/certifications`),
    addCertification: (data: { name: string; issuer: string; year: string }) =>
        request<Certification>('POST', '/workers/certifications', data),
    deleteCertification: (id: number) => request<void>('DELETE', `/workers/certifications/${id}`),
};

// ─── Reviews ─────────────────────────────────────────────────────────────────
export const reviewApi = {
    getAll: () => request<WorkerReview[]>('GET', '/reviews'),
    create: (data: { projectId: number; revieweeId: number; rating: number; comment: string; duration?: string }) =>
        request<WorkerReview>('POST', '/reviews', data),
    delete: (id: number) => request<void>('DELETE', `/reviews/${id}`),
};

// ─── Messages ────────────────────────────────────────────────────────────────
export interface Conversation {
    conversationId: number;
    otherUserId: number;
    otherUserName: string;
    otherUserAvatar?: string;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
    projectName?: string;
    projectId?: number;
}

export interface ApiMessage {
    id: number;
    conversationId: number;
    senderId: number;
    content: string;
    sentAt: string;
    isRead: boolean;
}

export const messageApi = {
    getConversations: () => request<Conversation[]>('GET', '/messages'),
    getMessages: (conversationId: number) =>
        request<ApiMessage[]>('GET', `/messages/${conversationId}`),
    send: (receiverId: number, content: string, projectId?: number) =>
        request<ApiMessage>('POST', '/messages', { receiverId, content, projectId }),
    delete: (messageId: number) => request<void>('DELETE', `/messages/${messageId}`),
};

// ─── Skills ──────────────────────────────────────────────────────────────────
export const skillApi = {
    getAll: () => request<{ id: number; name: string }[]>('GET', '/skills'),
    create: (name: string) => request<{ id: number; name: string }>('POST', '/skills', { name }),
};

// ─── Contractor ──────────────────────────────────────────────────────────────
export interface ContractorProject {
    id: number;
    name: string;
    location: string;
    progress: number;
    workersAssigned: number;
    deadline: string;
    status: string;
}

export interface EarningsResponse {
    data: { label: string; amount: number }[];
    total: number;
    average: number;
    peak: number;
}

export interface ScheduleEvent {
    id: number;
    workerId: number;
    workerName: string;
    projectId: number;
    projectName: string;
    date: string;
    startTime: string;
    endTime: string;
}

export const contractorApi = {
    getTeam: () => request<AuthUser[]>('GET', '/contractor/team'),
    getProjects: () => request<ContractorProject[]>('GET', '/contractor/projects'),
    getEarnings: (period: 'week' | 'month' = 'week') =>
        request<EarningsResponse>('GET', `/contractor/earnings?period=${period}`),
    getSchedule: () => request<ScheduleEvent[]>('GET', '/contractor/schedule'),
    createScheduleEvent: (data: { workerId: number; projectId: number; date: string; startTime: string; endTime: string }) =>
        request<ScheduleEvent>('POST', '/contractor/schedule', data),
    deleteScheduleEvent: (id: number) => request<void>('DELETE', `/contractor/schedule/${id}`),
};
