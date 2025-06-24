/**
 * Organization entity model based on the ECHO data model
 * Represents an organization that can create and manage questions
 */

export interface Organization {
    /** Unique identifier for the organization */
    id: string;                     // UUID or short ID
    
    /** Display name of the organization */
    name: string;
    
    /** URL-friendly slug for the organization (e.g., "acme") */
    slug: string;
    
    /** IANA timezone identifier (e.g., "America/Los_Angeles") */
    timezone: string;
    
    /** Subscription plan tier */
    plan: OrganizationPlan;
    
    /** Timestamp when the organization was created (ISO 8601 datetime) */
    created_at: string;
    
    /** Optional organization settings and preferences */
    settings?: OrganizationSettings;
    
    /** Optional metadata for additional organization data */
    metadata?: Record<string, any>;
}

/**
 * Valid organization plan types
 */
export type OrganizationPlan = 'free' | 'pro' | 'enterprise';

/**
 * Organization settings and preferences
 */
export interface OrganizationSettings {
    /** Whether anonymous responses are allowed by default */
    allow_anonymous_responses: boolean;
    
    /** Default timezone for new questions */
    default_timezone: string;
    
    /** Maximum number of questions allowed */
    max_questions: number;
    
    /** Maximum number of users allowed */
    max_users: number;
    
    /** Whether advanced analytics are enabled */
    analytics_enabled: boolean;
    
    /** Custom branding settings */
    branding?: {
        logo_url?: string;
        primary_color?: string;
        secondary_color?: string;
    };
}

/**
 * Query parameters for listing organizations
 */
export interface ListOrganizationsParams {
    /** Number of items per page (default: 50, max: 100) */
    limit?: number;
    
    /** Pagination token for getting next page */
    lastEvaluatedKey?: string;
    
    /** Filter by plan type */
    plan?: OrganizationPlan | 'all';
    
    /** Filter by creation date range (start date in YYYY-MM-DD format) */
    start_date?: string;
    
    /** Filter by creation date range (end date in YYYY-MM-DD format) */
    end_date?: string;
}

/**
 * Response for listing organizations
 */
export interface ListOrganizationsResponse {
    /** Array of organizations */
    organizations: Organization[];
    
    /** Total count of organizations matching the filters */
    totalCount: number;
    
    /** Number of items scanned by DynamoDB */
    scannedCount: number;
    
    /** Pagination token for next page */
    lastEvaluatedKey?: any;
    
    /** Whether there are more results available */
    hasMore: boolean;
    
    /** Applied filters */
    filters: {
        plan?: string;
        start_date?: string;
        end_date?: string;
        limit: number;
    };
}

/**
 * Request payload for creating an organization
 */
export interface CreateOrganizationRequest {
    /** Display name of the organization */
    name: string;
    
    /** URL-friendly slug for the organization */
    slug: string;
    
    /** IANA timezone identifier */
    timezone: string;
    
    /** Subscription plan tier (default: 'free') */
    plan?: OrganizationPlan;
    
    /** Optional organization settings */
    settings?: Partial<OrganizationSettings>;
    
    /** Optional metadata for additional organization data */
    metadata?: Record<string, any>;
}

/**
 * Response for creating an organization
 */
export interface CreateOrganizationResponse {
    /** Unique identifier for the created organization */
    id: string;
    
    /** Display name of the organization */
    name: string;
    
    /** URL-friendly slug for the organization */
    slug: string;
    
    /** IANA timezone identifier */
    timezone: string;
    
    /** Subscription plan tier */
    plan: OrganizationPlan;
    
    /** Timestamp when the organization was created */
    created_at: string;
    
    /** Organization settings */
    settings: OrganizationSettings;
}

/**
 * Request payload for updating an organization
 */
export interface UpdateOrganizationRequest {
    /** Display name of the organization */
    name?: string;
    
    /** URL-friendly slug for the organization */
    slug?: string;
    
    /** IANA timezone identifier */
    timezone?: string;
    
    /** Subscription plan tier */
    plan?: OrganizationPlan;
    
    /** Organization settings to update */
    settings?: Partial<OrganizationSettings>;
    
    /** Metadata to update */
    metadata?: Record<string, any>;
}

/**
 * Organization statistics
 */
export interface OrganizationStats {
    /** Total number of users in the organization */
    total_users: number;
    
    /** Total number of questions created */
    total_questions: number;
    
    /** Total number of responses received */
    total_responses: number;
    
    /** Number of active questions */
    active_questions: number;
    
    /** Average responses per question */
    avg_responses_per_question: number;
    
    /** Date range of activity */
    activity_range: {
        earliest: string;
        latest: string;
    };
}

/**
 * Constants for organization plans
 */
export const ORGANIZATION_PLANS: OrganizationPlan[] = ['free', 'pro', 'enterprise'];

/**
 * Default values for organization creation
 */
export const ORGANIZATION_DEFAULTS = {
    plan: 'free' as OrganizationPlan,
    settings: {
        allow_anonymous_responses: true,
        default_timezone: 'UTC',
        max_questions: 10,
        max_users: 5,
        analytics_enabled: false,
    } as OrganizationSettings,
    metadata: {} as Record<string, any>,
};

/**
 * Plan limits and features
 */
export const PLAN_LIMITS = {
    free: {
        max_questions: 10,
        max_users: 5,
        analytics_enabled: false,
        custom_branding: false,
    },
    pro: {
        max_questions: 100,
        max_users: 50,
        analytics_enabled: true,
        custom_branding: true,
    },
    enterprise: {
        max_questions: -1, // unlimited
        max_users: -1, // unlimited
        analytics_enabled: true,
        custom_branding: true,
    },
};

/**
 * Validation rules for organizations
 */
export const ORGANIZATION_VALIDATION = {
    /** Maximum length for organization name */
    max_name_length: 100,
    
    /** Maximum length for organization slug */
    max_slug_length: 50,
    
    /** Minimum length for organization slug */
    min_slug_length: 3,
    
    /** Maximum size of metadata object (in bytes) */
    max_metadata_size: 2048,
    
    /** Valid slug pattern (alphanumeric and hyphens only) */
    slug_pattern: /^[a-z0-9-]+$/,
};
  