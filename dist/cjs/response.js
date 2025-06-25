"use strict";
/**
 * Response entity model based on the ECHO data model
 * Represents a user's response to a question
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESPONSE_VALIDATION = exports.RESPONSE_DEFAULTS = exports.RESPONSE_STATUSES = void 0;
/**
 * Constants for response statuses
 */
exports.RESPONSE_STATUSES = ['submitted', 'pending', 'invalid'];
/**
 * Default values for response submission
 */
exports.RESPONSE_DEFAULTS = {
    metadata: {},
    text_answer: undefined,
};
/**
 * Validation rules for responses
 */
exports.RESPONSE_VALIDATION = {
    /** Maximum length for text answers */
    max_text_length: 1000,
    /** Maximum number of answer options that can be selected */
    max_answer_selections: 10,
    /** Maximum size of metadata object (in bytes) */
    max_metadata_size: 1024,
};
