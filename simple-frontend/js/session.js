/**
 * LabourHand – SessionManager
 * Direct port of src/utils/session.ts  →  plain ES6 class
 */

const SESSION_KEY = 'labourhand_session';
const USER_KEY = 'labourhand_user';

class SessionManager {

    /** Create a new session and persist to localStorage */
    static createSession(user, token) {
        const sessionData = {
            user,
            token: token || SessionManager._generateToken(),
            createdAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    /** Return the full session object, or null if absent / expired */
    static getSession() {
        try {
            const raw = localStorage.getItem(SESSION_KEY);
            if (!raw) return null;
            const session = JSON.parse(raw);
            if (new Date(session.expiresAt) < new Date()) {
                SessionManager.clearSession();
                return null;
            }
            return session;
        } catch {
            return null;
        }
    }

    /** Return the User object from the current session */
    static getCurrentUser() {
        const session = SessionManager.getSession();
        return session ? session.user : null;
    }

    /** Return the JWT token from the current session */
    static getToken() {
        const session = SessionManager.getSession();
        return session ? session.token : null;
    }

    /** Patch user fields without destroying the session */
    static updateUser(updates) {
        const session = SessionManager.getSession();
        if (!session) return;
        session.user = { ...session.user, ...updates };
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        localStorage.setItem(USER_KEY, JSON.stringify(session.user));
    }

    static isLoggedIn() { return SessionManager.getSession() !== null; }
    static isWorker() { return SessionManager.getCurrentUser()?.role === 'worker'; }
    static isOwner() { return SessionManager.getCurrentUser()?.role === 'owner'; }

    /** Destroy session (logout) */
    static clearSession() {
        localStorage.removeItem(SESSION_KEY);
        localStorage.removeItem(USER_KEY);
    }

    /** Language helpers */
    static setLanguage(lang) {
        if (SessionManager.isLoggedIn()) {
            SessionManager.updateUser({ language: lang });
        } else {
            localStorage.setItem('labourhand_language', lang);
        }
    }

    static getLanguage() {
        return SessionManager.getCurrentUser()?.language
            || localStorage.getItem('labourhand_language')
            || 'en';
    }

    /** Internal token generator */
    static _generateToken() {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    }
}

// Make available globally
window.SessionManager = SessionManager;
