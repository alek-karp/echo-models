/**
 * Response entity model based on the ECHO data model
 * Represents a user's response to a question
 */

export interface Response {
    /** Unique identifier for the response */
    id: string;
    
    /** Organization ID that owns this response */
    organization_id: string;
    
    /** ID of the question this response is for */
    question_id: string;
    
    /** ID of the user who submitted the response (null if anonymous) */
    user_id: string | null;
    
    /** Array of selected answer options (always array, even for single selections) */
    answer: string[];
    
    /** Optional text answer for text-type questions */
    text_answer?: string;
    
    /** Timestamp when the response was submitted (ISO 8601 datetime) */
    submitted_at: string;
    
    /** Date when the response was submitted (ISO 8601 date YYYY-MM-DD) */
    date: string;
    
    /** Optional metadata object for additional response data */
    metadata?: Record<string, any>;
}

/**
 * Response status types
 */
export type ResponseStatus = 'submitted' | 'pending' | 'invalid';

/**
 * Query parameters for listing responses
 */
export interface ListResponsesParams {
    /** Number of items per page (default: 50, max: 100) */
    limit?: number;
    
    /** Pagination token for getting next page */
    lastEvaluatedKey?: string;
    
    /** Filter by question ID */
    question_id?: string;
    
    /** Filter by user ID */
    user_id?: string;
    
    /** Filter by date range (start date in YYYY-MM-DD format) */
    start_date?: string;
    
    /** Filter by date range (end date in YYYY-MM-DD format) */
    end_date?: string;
    
    /** Whether to include anonymous responses */
    include_anonymous?: boolean;
}

/**
 * Response for listing responses
 */
export interface ListResponsesResponse {
    /** Array of responses */
    responses: Response[];
    
    /** Total count of responses matching the filters */
    totalCount: number;
    
    /** Number of items scanned by DynamoDB */
    scannedCount: number;
    
    /** Pagination token for next page */
    lastEvaluatedKey?: any;
    
    /** Whether there are more results available */
    hasMore: boolean;
    
    /** Applied filters */
    filters: {
        question_id?: string;
        user_id?: string;
        start_date?: string;
        end_date?: string;
        include_anonymous: boolean;
        limit: number;
    };
}

/**
 * Request payload for submitting a response
 */
export interface SubmitResponseRequest {
    /** ID of the question being responded to */
    question_id: string;
    
    /** Array of selected answer options */
    answer: string[];
    
    /** Optional text answer for text-type questions */
    text_answer?: string;
    
    /** Optional metadata object for additional response data */
    metadata?: Record<string, any>;
}

/**
 * Response for submitting a response
 */
export interface SubmitResponseResponse {
    /** Unique identifier for the created response */
    id: string;
    
    /** Organization ID that owns this response */
    organization_id: string;
    
    /** ID of the question this response is for */
    question_id: string;
    
    /** ID of the user who submitted the response (null if anonymous) */
    user_id: string | null;
    
    /** Array of selected answer options */
    answer: string[];
    
    /** Optional text answer for text-type questions */
    text_answer?: string;
    
    /** Timestamp when the response was submitted */
    submitted_at: string;
    
    /** Date when the response was submitted */
    date: string;
    
    /** Whether the response was submitted anonymously */
    is_anonymous: boolean;
}

/**
 * Request payload for getting responses by question ID
 */
export interface GetQuestionResponsesRequest {
    /** ID of the question to get responses for */
    question_id: string;
    
    /** Number of items per page (default: 50, max: 100) */
    limit?: number;
    
    /** Pagination token for getting next page */
    lastEvaluatedKey?: string;
    
    /** Whether to include anonymous responses */
    include_anonymous?: boolean;
}

/**
 * Response for getting responses by question ID
 */
export interface GetQuestionResponsesResponse {
    /** Array of responses for the question */
    responses: Response[];
    
    /** Total count of responses for the question */
    totalCount: number;
    
    /** Number of items scanned by DynamoDB */
    scannedCount: number;
    
    /** Pagination token for next page */
    lastEvaluatedKey?: any;
    
    /** Whether there are more results available */
    hasMore: boolean;
    
    /** Question information */
    question: {
        id: string;
        text: string;
        options: string[];
        type: string;
    };
}

/**
 * Request payload for checking if a user has submitted a response
 */
export interface CheckResponseSubmittedRequest {
    /** ID of the question to check */
    question_id: string;
    
    /** ID of the user to check (optional for anonymous responses) */
    user_id?: string;
}

/**
 * Response for checking if a user has submitted a response
 */
export interface CheckResponseSubmittedResponse {
    /** Whether the user has submitted a response */
    has_submitted: boolean;
    
    /** ID of the existing response if one exists */
    response_id?: string;
    
    /** Timestamp when the response was submitted (if exists) */
    submitted_at?: string;
}

/**
 * Response statistics for a question
 */
export interface QuestionResponseStats {
    /** Total number of responses */
    total_responses: number;
    
    /** Number of anonymous responses */
    anonymous_responses: number;
    
    /** Number of identified user responses */
    identified_responses: number;
    
    /** Answer distribution (option -> count) */
    answer_distribution: Record<string, number>;
    
    /** Date range of responses */
    date_range: {
        earliest: string;
        latest: string;
    };
}

/**
 * Constants for response statuses
 */
export const RESPONSE_STATUSES: ResponseStatus[] = ['submitted', 'pending', 'invalid'];

/**
 * Default values for response submission
 */
export const RESPONSE_DEFAULTS = {
    metadata: {} as Record<string, any>,
    text_answer: undefined as string | undefined,
};

/**
 * Validation rules for responses
 */
export const RESPONSE_VALIDATION = {
    /** Maximum length for text answers */
    max_text_length: 1000,
    
    /** Maximum number of answer options that can be selected */
    max_answer_selections: 10,
    
    /** Maximum size of metadata object (in bytes) */
    max_metadata_size: 1024,
};