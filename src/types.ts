export interface RsvpData {
  id?: string;
  name: string;
  guestCount: number;
  attendance: 'accepted' | 'declined';
  dietaryNotes?: string;
  message?: string;
  submittedAt: string;
}

export interface WishNote {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  relation?: string;
}
