import { Note } from '../types/note';

const BASE_URL = '/api/notes';

export const noteApi = {
  async getNotes(campaignId: string): Promise<Note[]> {
    const response = await fetch(`${BASE_URL}?campaign=${campaignId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch notes');
    }
    return response.json();
  },

  async getNote(noteId: string): Promise<Note> {
    const response = await fetch(`${BASE_URL}/${noteId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch note');
    }
    return response.json();
  },

  async createNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
    if (!response.ok) {
      throw new Error('Failed to create note');
    }
    return response.json();
  },

  async updateNote(noteId: string, note: Partial<Note>): Promise<Note> {
    const response = await fetch(`${BASE_URL}/${noteId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
    if (!response.ok) {
      throw new Error('Failed to update note');
    }
    return response.json();
  },

  async deleteNote(noteId: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/${noteId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete note');
    }
  }
};
