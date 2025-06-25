"use strict";
/**
 * User entity model based on the ECHO data model
 * Represents a user within an organization who can respond to questions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_PERMISSIONS = exports.USER_VALIDATION = exports.USER_DEFAULTS = exports.USER_STATUSES = exports.USER_ROLES = void 0;
/**
 * Constants for user roles
 */
exports.USER_ROLES = ['admin', 'user'];
/**
 * Constants for user statuses
 */
exports.USER_STATUSES = ['active', 'suspended', 'pending', 'inactive'];
/**
 * Default values for user creation
 */
exports.USER_DEFAULTS = {
    role: 'user',
    status: 'active',
    preferences: {
        timezone: 'UTC',
        email_notifications: true,
        push_notifications: false,
        language: 'en',
        show_anonymous_responses: false,
        theme: 'auto',
    },
    metadata: {},
};
/**
 * Validation rules for users
 */
exports.USER_VALIDATION = {
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
exports.USER_PERMISSIONS = {
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
