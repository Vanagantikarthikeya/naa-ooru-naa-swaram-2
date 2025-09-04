/**
 * Gallery API client for fetching user records and content
 */

const API_BASE_URL = 'http://localhost:8000'; // Replace with your actual API URL

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  author: string;
  district: string;
  category: string;
  mediaType: 'text' | 'audio' | 'video' | 'image';
  fileUrl?: string;
  thumbnailUrl?: string;
  language: string;
  createdAt: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  isSaved?: boolean;
}

export interface GalleryResponse {
  success: boolean;
  data?: {
    records: GalleryItem[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
  error?: string;
}

/**
 * Fetch gallery items with filtering and pagination
 */
export async function fetchGalleryItems(params: {
  token?: string;
  page?: number;
  pageSize?: number;
  search?: string;
  category?: string;
  district?: string;
  mediaType?: string;
  language?: string;
}): Promise<GalleryResponse> {
  try {
    const searchParams = new URLSearchParams();
    
    if (params.page) searchParams.set('page', params.page.toString());
    if (params.pageSize) searchParams.set('page_size', params.pageSize.toString());
    if (params.search) searchParams.set('search', params.search);
    if (params.category) searchParams.set('category', params.category);
    if (params.district) searchParams.set('district', params.district);
    if (params.mediaType) searchParams.set('media_type', params.mediaType);
    if (params.language) searchParams.set('language', params.language);

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (params.token) {
      headers['Authorization'] = `Bearer ${params.token}`;
    }

    const endpoint = `${API_BASE_URL}/api/v1/records/search?${searchParams}`;

    const response = await fetch(endpoint, {
      method: 'GET',
      headers,
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      const errorText = await response.text();
      return { success: false, error: `Failed to fetch gallery items: ${response.status} - ${errorText}` };
    }
  } catch (error) {
    return { success: false, error: `Connection error: ${error}` };
  }
}

/**
 * Like or unlike a record
 */
export async function toggleLike(token: string, recordId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    const endpoint = `${API_BASE_URL}/api/v1/records/${recordId}/like`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
    });

    if (response.ok) {
      return { success: true };
    } else {
      const errorText = await response.text();
      return { success: false, error: `Failed to toggle like: ${response.status} - ${errorText}` };
    }
  } catch (error) {
    return { success: false, error: `Connection error: ${error}` };
  }
}

/**
 * Save or unsave a record
 */
export async function toggleSave(token: string, recordId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    const endpoint = `${API_BASE_URL}/api/v1/records/${recordId}/save`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
    });

    if (response.ok) {
      return { success: true };
    } else {
      const errorText = await response.text();
      return { success: false, error: `Failed to toggle save: ${response.status} - ${errorText}` };
    }
  } catch (error) {
    return { success: false, error: `Connection error: ${error}` };
  }
}

/**
 * Add a comment to a record
 */
export async function addComment(
  token: string, 
  recordId: string, 
  content: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    const endpoint = `${API_BASE_URL}/api/v1/records/${recordId}/comments`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({ content }),
    });

    if (response.ok) {
      return { success: true };
    } else {
      const errorText = await response.text();
      return { success: false, error: `Failed to add comment: ${response.status} - ${errorText}` };
    }
  } catch (error) {
    return { success: false, error: `Connection error: ${error}` };
  }
}