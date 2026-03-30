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

    /* ── Common UI Helpers ────────────────────────────────────────────── */
    static initCommonUI() {
        const user = SessionManager.getCurrentUser();
        if (!user) return;
        const isOwner = user.role === 'owner';

        document.getElementById('hdr-name') && (document.getElementById('hdr-name').textContent = user.name || 'User');
        document.getElementById('hdr-role') && (document.getElementById('hdr-role').textContent = user.specialization || (isOwner ? 'Employer' : 'Worker'));
        if (user.avatar && document.getElementById('hdr-avatar')) document.getElementById('hdr-avatar').src = user.avatar;
        if (!user.verified && document.getElementById('hdr-verified')) document.getElementById('hdr-verified').style.display = 'none';

        const profileLink = document.getElementById('sidebar-profile');
        if (profileLink && user.id) profileLink.href = `worker-profile.html?id=${user.id}`;
        const bottomProfile = document.getElementById('bottom-profile');
        if (bottomProfile && user.id) bottomProfile.href = `worker-profile.html?id=${user.id}`;

        const modeSwitch = document.getElementById('mode-switch');
        if (modeSwitch) {
            modeSwitch.checked = isOwner;
            SessionManager.applyMode(isOwner);
        }
        SessionManager.applyLanguage(SessionManager.getLanguage());
    }

    static toggleMode(ownerOn) {
        SessionManager.applyMode(ownerOn);
    }

    static applyMode(ownerOn) {
        const dWorker = document.getElementById('mode-worker');
        if (dWorker) dWorker.classList.toggle('active', !ownerOn);
        const dOwner = document.getElementById('mode-owner');
        if (dOwner) dOwner.classList.toggle('active', ownerOn);
        const ownerActions = document.getElementById('owner-actions');
        if (ownerActions) ownerActions.style.cssText = ownerOn ? '' : 'display:none!important;';
        const fab = document.getElementById('fab-btn');
        if (fab) { ownerOn ? fab.classList.remove('d-none') : fab.classList.add('d-none'); }
    }

    static toggleLanguage() {
        let lang = SessionManager.getLanguage() === 'en' ? 'hi' : 'en';
        SessionManager.setLanguage(lang);
        SessionManager.applyLanguage(lang);
    }

    static applyLanguage(l) {
        document.documentElement.setAttribute('data-lang', l);
        const langBtn = document.getElementById('lang-btn');
        if (langBtn) langBtn.textContent = l === 'en' ? 'हिंदी' : 'English';
        document.querySelectorAll('[data-en]').forEach(el => {
            el.textContent = l === 'en' ? el.dataset.en : el.dataset.hi;
        });
    }
}

// Make available globally
window.SessionManager = SessionManager;
