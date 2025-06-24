/**
 * Question entity model based on the ECHO data model
 * Represents a question that can be scheduled and presented to users
 */

export interface Question {
    /** Unique identifier for the question */
    id: string;
    
    /** Organization ID that owns this question */
    organization_id: string;
    
    /** The question text/content */
    text: string;
    
    /** Array of possible answer options */
    options: string[];
    
    /** Type of question */
    type: QuestionType;
    
    /** Whether multiple selections are allowed */
    allow_multiple: boolean;
    
    /** Date when the question is scheduled to be active (YYYY-MM-DD format) */
    scheduled_for: string;
    
    /** Whether the question is currently active */
    is_active: boolean;
    
    /** Whether responses should be anonymous */
    is_anonymous: boolean;
    
    /** Optional URL to an image or video asset */
    asset_url?: string | null;
    
    /** ID of the admin user who created the question */
    created_by: string;
    
    /** Visibility status of the question */
    visibility: QuestionVisibility;
    
    /** Optional tags for categorization */
    tags: string[];
    
    /** Timestamp when the question was created */
    created_at: string;
  }
  
  /**
   * Valid question types
   */
  export type QuestionType = 'multiple_choice' | 'text' | 'scale';
  
  /**
   * Valid visibility states
   */
  export type QuestionVisibility = 'live' | 'draft' | 'private';
  
  /**
   * Query parameters for listing questions
   */
  export interface ListQuestionsParams {
    /** Number of items per page (default: 50, max: 100) */
    limit?: number;
    
    /** Pagination token for getting next page */
    lastEvaluatedKey?: string;
    
    /** Filter by status: 'active', 'inactive', or 'all' */
    status?: 'active' | 'inactive' | 'all';
    
    /** Filter by visibility: 'live', 'draft', 'private', or 'all' */
    visibility?: 'live' | 'draft' | 'private' | 'all';
  }
  
  /**
   * Response for listing questions
   */
  export interface ListQuestionsResponse {
    /** Array of questions */
    questions: Question[];
    
    /** Total count of questions matching the filters */
    totalCount: number;
    
    /** Number of items scanned by DynamoDB */
    scannedCount: number;
    
    /** Pagination token for next page */
    lastEvaluatedKey?: any;
    
    /** Whether there are more results available */
    hasMore: boolean;
    
    /** Applied filters */
    filters: {
      status: string;
      visibility: string;
      limit: number;
    };
  }
  
  /**
   * Request payload for creating a question
   */
  export interface CreateQuestionRequest {
    /** The question text/content */
    text: string;
    
    /** Array of possible answer options */
    options: string[];
    
    /** Type of question */
    type: QuestionType;
    
    /** Whether multiple selections are allowed (default: false) */
    allow_multiple?: boolean;
    
    /** Whether the question is currently active (default: false) */
    is_active?: boolean;
    
    /** Whether responses should be anonymous (default: false) */
    is_anonymous?: boolean;
    
    /** Optional URL to an image or video asset */
    asset_url?: string;
    
    /** Visibility status of the question (default: 'draft') */
    visibility?: QuestionVisibility;
    
    /** Optional tags for categorization */
    tags?: string[];
  }
  
  /**
   * Response for creating a question
   */
  export interface CreateQuestionResponse {
    /** Unique identifier for the created question */
    id: string;
    
    /** Organization ID that owns this question */
    organization_id: string;
    
    /** The question text/content */
    text: string;
    
    /** Array of possible answer options */
    options: string[];
    
    /** Type of question */
    type: QuestionType;
    
    /** Date when the question is scheduled to be active */
    scheduled_for: string;
    
    /** ID of the admin user who created the question */
    created_by: string;
    
    /** Timestamp when the question was created */
    created_at: string;
  }
  
  /**
   * Constants for question types
   */
  export const QUESTION_TYPES: QuestionType[] = ['multiple_choice', 'text', 'scale'];
  
  /**
   * Constants for visibility states
   */
  export const QUESTION_VISIBILITY: QuestionVisibility[] = ['live', 'draft', 'private'];
  
  /**
   * Default values for question creation
   */
  export const QUESTION_DEFAULTS = {
    allow_multiple: false,
    is_active: false,
    is_anonymous: false,
    visibility: 'draft' as QuestionVisibility,
    tags: [] as string[],
    asset_url: null as string | null,
  }; 