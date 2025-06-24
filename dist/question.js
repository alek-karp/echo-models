/**
 * Question entity model based on the ECHO data model
 * Represents a question that can be scheduled and presented to users
 */
/**
 * Constants for question types
 */
export const QUESTION_TYPES = ['multiple_choice', 'text', 'scale'];
/**
 * Constants for visibility states
 */
export const QUESTION_VISIBILITY = ['live', 'draft', 'private'];
/**
 * Default values for question creation
 */
export const QUESTION_DEFAULTS = {
    allow_multiple: false,
    is_active: false,
    is_anonymous: false,
    visibility: 'draft',
    tags: [],
    asset_url: null,
};
