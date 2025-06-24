/**
 * User entity model based on the ECHO data model
 * Represents a user within an organization who can respond to questions
 */

export interface User {
    /** Unique identifier for the user (Cognito sub) */
    id: string;
    
    /** Email address of the user */
    email: string;
    
    /** Display name of the user (optional) */
    name?: string;
    
    /** Organization ID that the user belongs to */
    organization_id: string;
    
    /** User role within the organization */
    role: UserRole;
    
    /** Current status of the user account */
    status: UserStatus;
    
    /** Timestamp of the user's last login (ISO 8601 datetime) */
    last_login_at: string;
    
    /** Timestamp when the user was created (ISO 8601 datetime) */
    created_at: string;
    
    /** Optional user preferences and settings */
    preferences?: UserPreferences;
    
    /** Optional metadata for additional user data */
    metadata?: Record<string, any>;
}

/**
 * Valid user roles
 */
export type UserRole = 'admin' | 'user';

/**
 * Valid user statuses
 */
export type UserStatus = 'active' | 'suspended' | 'pending' | 'inactive';

/**
 * User preferences and settings
 */
export interface UserPreferences {
    /** Preferred timezone for the user */
    timezone: string;
    
    /** Whether to receive email notifications */
    email_notifications: boolean;
    
    /** Whether to receive push notifications */
    push_notifications: boolean;
    
    /** Preferred language for the interface */
    language: string;
    
    /** Whether to show anonymous responses in analytics */
    show_anonymous_responses: boolean;
    
    /** Theme preference */
    theme: 'light' | 'dark' | 'auto';
}

/**
 * Query parameters for listing users
 */
export interface ListUsersParams {
    /** Number of items per page (default: 50, max: 100) */
    limit?: number;
    
    /** Pagination token for getting next page */
    lastEvaluatedKey?: string;
    
    /** Filter by organization ID */
    organization_id?: string;
    
    /** Filter by user role */
    role?: UserRole | 'all';
    
    /** Filter by user status */
    status?: UserStatus | 'all';
    
    /** Filter by creation date range (start date in YYYY-MM-DD format) */
    start_date?: string;
    
    /** Filter by creation date range (end date in YYYY-MM-DD format) */
    end_date?: string;
    
    /** Search by name or email */
    search?: string;
}

/**
 * Response for listing users
 */
export interface ListUsersResponse {
    /** Array of users */
    users: User[];
    
    /** Total count of users matching the filters */
    totalCount: number;
    
    /** Number of items scanned by DynamoDB */
    scannedCount: number;
    
    /** Pagination token for next page */
    lastEvaluatedKey?: any;
    
    /** Whether there are more results available */
    hasMore: boolean;
    
    /** Applied filters */
    filters: {
        organization_id?: string;
        role?: string;
        status?: string;
        start_date?: string;
        end_date?: string;
        search?: string;
        limit: number;
    };
}

/**
 * Request payload for creating a user
 */
export interface CreateUserRequest {
    /** Email address of the user */
    email: string;
    
    /** Display name of the user */
    name?: string;
    
    /** Organization ID that the user belongs to */
    organization_id: string;
    
    /** User role within the organization (default: 'user') */
    role?: UserRole;
    
    /** Current status of the user account (default: 'active') */
    status?: UserStatus;
    
    /** Optional user preferences */
    preferences?: Partial<UserPreferences>;
    
    /** Optional metadata for additional user data */
    metadata?: Record<string, any>;
}

/**
 * Response for creating a user
 */
export interface CreateUserResponse {
    /** Unique identifier for the created user */
    id: string;
    
    /** Email address of the user */
    email: string;
    
    /** Display name of the user */
    name?: string;
    
    /** Organization ID that the user belongs to */
    organization_id: string;
    
    /** User role within the organization */
    role: UserRole;
    
    /** Current status of the user account */
    status: UserStatus;
    
    /** Timestamp when the user was created */
    created_at: string;
    
    /** User preferences */
    preferences: UserPreferences;
}

/**
 * Request payload for updating a user
 */
export interface UpdateUserRequest {
    /** Display name of the user */
    name?: string;
    
    /** User role within the organization */
    role?: UserRole;
    
    /** Current status of the user account */
    status?: UserStatus;
    
    /** User preferences to update */
    preferences?: Partial<UserPreferences>;
    
    /** Metadata to update */
    metadata?: Record<string, any>;
}

/**
 * Request payload for updating user login time
 */
export interface UpdateUserLoginRequest {
    /** Timestamp of the user's last login */
    last_login_at: string;
}

/**
 * User statistics
 */
export interface UserStats {
    /** Total number of responses submitted */
    total_responses: number;
    
    /** Number of questions responded to */
    questions_responded: number;
    
    /** Number of anonymous responses */
    anonymous_responses: number;
    
    /** Average response time in seconds */
    avg_response_time: number;
    
    /** Date range of activity */
    activity_range: {
        earliest: string;
        latest: string;
    };
    
    /** Response completion rate */
    completion_rate: number;
}

/**
 * User authentication information
 */
export interface UserAuth {
    /** Whether the user is authenticated */
    is_authenticated: boolean;
    
    /** Authentication provider (e.g., 'cognito') */
    provider: string;
    
    /** User's Cognito sub */
    sub: string;
    
    /** User's email */
    email: string;
    
    /** User's organization ID */
    organization_id: string;
    
    /** User's role */
    role: UserRole;
    
    /** User's status */
    status: UserStatus;
}

/**
 * Constants for user roles
 */
export const USER_ROLES: UserRole[] = ['admin', 'user'];

/**
 * Constants for user statuses
 */
export const USER_STATUSES: UserStatus[] = ['active', 'suspended', 'pending', 'inactive'];

/**
 * Default values for user creation
 */
export const USER_DEFAULTS = {
    role: 'user' as UserRole,
    status: 'active' as UserStatus,
    preferences: {
        timezone: 'UTC',
        email_notifications: true,
        push_notifications: false,
        language: 'en',
        show_anonymous_responses: false,
        theme: 'auto' as 'light' | 'dark' | 'auto',
    } as UserPreferences,
    metadata: {} as Record<string, any>,
};

/**
 * Validation rules for users
 */
export const USER_VALIDATION = {
    /** Maximum length for user name */
    max_name_length: 100,
    
    /** Maximum length for email address */
    max_email_length: 254,
    
    /** Valid email pattern */
    email_pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    
    /** Maximum size of metadata object (in bytes) */
    max_metadata_size: 1024,
    
    /** Minimum password length */
    min_password_length: 8,
    
    /** Maximum password length */
    max_password_length: 128,
};

/**
 * User permissions by role
 */
export const USER_PERMISSIONS = {
    admin: {
        can_create_questions: true,
        can_edit_questions: true,
        can_delete_questions: true,
        can_view_analytics: true,
        can_manage_users: true,
        can_manage_organization: true,
        can_export_data: true,
    },
    user: {
        can_create_questions: false,
        can_edit_questions: false,
        can_delete_questions: false,
        can_view_analytics: false,
        can_manage_users: false,
        can_manage_organization: false,
        can_export_data: false,
    },
};