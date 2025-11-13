export const adminStorageKeys = {
  invitationCodes: "ctb_admin_invitation_codes",
  adminAuth: "ctb_admin_auth",
};

export const adminStorage = {
  // Invitation Codes Management
  generateInvitationCode: () => {
    const code = `CTB-${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`;
    return code;
  },

  addInvitationCode: (code: string, metadata?: any) => {
    if (typeof window !== "undefined") {
      const existing = localStorage.getItem(adminStorageKeys.invitationCodes);
      const codes = existing ? JSON.parse(existing) : [];
      codes.push({
        code,
        created: new Date().toISOString(),
        used: false,
        usedBy: null,
        usedAt: null,
        ...metadata,
      });
      localStorage.setItem(
        adminStorageKeys.invitationCodes,
        JSON.stringify(codes)
      );
    }
  },

  getInvitationCodes: () => {
    if (typeof window !== "undefined") {
      const codes = localStorage.getItem(adminStorageKeys.invitationCodes);
      return codes ? JSON.parse(codes) : [];
    }
    return [];
  },

  deleteInvitationCode: (code: string) => {
    if (typeof window !== "undefined") {
      const existing = localStorage.getItem(adminStorageKeys.invitationCodes);
      if (existing) {
        const codes = JSON.parse(existing);
        const filtered = codes.filter((c: any) => c.code !== code);
        localStorage.setItem(
          adminStorageKeys.invitationCodes,
          JSON.stringify(filtered)
        );
      }
    }
  },

  // Admin Authentication
  setAdminAuth: (authenticated: boolean, password?: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        adminStorageKeys.adminAuth,
        JSON.stringify({
          authenticated,
          timestamp: new Date().toISOString(),
        })
      );
    }
  },

  isAdminAuthenticated: () => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem(adminStorageKeys.adminAuth);
      if (!auth) return false;
      const parsed = JSON.parse(auth);
      return parsed.authenticated === true;
    }
    return false;
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(adminStorageKeys.adminAuth);
    }
  },
};
