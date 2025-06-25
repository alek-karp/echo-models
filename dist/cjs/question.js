"use strict";
/**
 * Question entity model based on the ECHO data model
 * Represents a question that can be scheduled and presented to users
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUESTION_DEFAULTS = exports.QUESTION_VISIBILITY = exports.QUESTION_TYPES = void 0;
/**
 * Constants for question types
 */
exports.QUESTION_TYPES = ['multiple_choice', 'text', 'scale'];
/**
 * Constants for visibility states
 */
exports.QUESTION_VISIBILITY = ['live', 'draft', 'private'];
/**
 * Default values for question creation
 */
exports.QUESTION_DEFAULTS = {
    allow_multiple: false,
    is_active: false,
    is_anonymous: false,
    visibility: 'draft',
    tags: [],
    asset_url: null,
};
