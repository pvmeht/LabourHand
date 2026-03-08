import { AuthUser } from "./api";

/**
 * Calculates a profile completeness percentage based on the user's role.
 * Works with both `AuthUser` (from API) and `User` (from SessionManager).
 */
export function calculateProfileCompleteness(user: any): number {
  if (!user) return 0;

  let totalWeight = 0;
  let earnedWeight = 0;

  // ─── Common Fields ──────────────────────────────────────
  const commonFields = [
    { value: user.name, weight: 15 },
    { value: user.phone, weight: 15 },
    { value: user.avatar, weight: 10 },
  ];

  commonFields.forEach(field => {
    totalWeight += field.weight;
    if (field.value && field.value.toString().trim() !== '') {
      earnedWeight += field.weight;
    }
  });

  // ─── Role-Specific Fields ───────────────────────────────
  if (user.role === 'WORKER') {
    const workerFields = [
      { value: user.specialization, weight: 20 },
      { value: user.bio, weight: 20 },
      { value: user.skills && user.skills.length > 0 ? true : '', weight: 20 },
    ];
    
    workerFields.forEach(field => {
      totalWeight += field.weight;
      if (field.value && field.value.toString().trim() !== '') {
        earnedWeight += field.weight;
      }
    });
  } else {
    // OWNER
    const ownerFields = [
      { value: user.companyName, weight: 60 },
    ];

    ownerFields.forEach(field => {
      totalWeight += field.weight;
      if (field.value && field.value.toString().trim() !== '') {
        earnedWeight += field.weight;
      }
    });
  }

  return Math.round((earnedWeight / totalWeight) * 100);
}
