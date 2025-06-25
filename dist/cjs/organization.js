"use strict";
/**
 * Organization entity model based on the ECHO data model
 * Represents an organization that can create and manage questions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORGANIZATION_VALIDATION = exports.PLAN_LIMITS = exports.ORGANIZATION_DEFAULTS = exports.ORGANIZATION_PLANS = void 0;
/**
 * Constants for organization plans
 */
exports.ORGANIZATION_PLANS = ['free', 'pro', 'enterprise'];
/**
 * Default values for organization creation
 */
exports.ORGANIZATION_DEFAULTS = {
    plan: 'free',
    settings: {
        allow_anonymous_responses: true,
        default_timezone: 'UTC',
        max_questions: 10,
        max_users: 5,
        analytics_enabled: false,
    },
    metadata: {},
};
/**
 * Plan limits and features
 */
exports.PLAN_LIMITS = {
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
exports.ORGANIZATION_VALIDATION = {
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
