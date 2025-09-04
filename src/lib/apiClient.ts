/**
 * API Client Helper for Project Integration
 * =========================================
 * 
 * This module provides helper functions for making API calls to our backend service.
 * It handles authentication, error handling, and request formatting.
 */

// Configuration - you can set this in your environment
const API_BASE_URL = 'http://localhost:8000'; // Replace with your actual API URL

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface UploadChunkResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface FinalizeUploadResponse {
  success: boolean;
  message: string;
  data?: any;
}

/**
 * Get all available categories from the API.
 */
export async function getCategories(token: string): Promise<ApiResponse<Category[]>> {
  if (!token) {
    return { success: false, error: "No authentication token provided" };
  }

  try {
    const headers = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Accept": "application/json"
    };

    const endpoint = `${API_BASE_URL}/api/v1/categories`;

    const response = await fetch(endpoint, {
      method: 'GET',
      headers,
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      const errorText = await response.text();
      return { success: false, error: `Failed to get categories: ${response.status} - ${errorText}` };
    }
  } catch (error) {
    return { success: false, error: `Connection error: ${error}` };
  }
}

/**
 * Convert a category ID to a human-readable name.
 */
export function getCategoryName(categoryId: string): string {
  if (!categoryId) {
    return "Uncategorized";
  }

  // Fixed category mappings
  const fixedCategories: Record<string, string> = {
    "ab7f2757-ccdf-4ef6-9850-2cdfe6e1b422": "Local History",
    "ab9fa2ce-1f83-4e91-b89d-cca18e8b301e": "Culture",
    "4366cab1-031e-4b37-816b-311ee34461a9": "Images",
    "94a13c20-8a03-45da-8829-10e2fe1e61a1": "Architecture",
    "96e5104f-c786-4928-b932-f59f5b4ddbf0": "Places"
  };

  return fixedCategories[categoryId] || `Category (${categoryId.slice(0, 8)}...)`;
}

/**
 * Upload a file chunk to the API (for large files).
 */
export async function uploadChunk(
  token: string,
  chunkData: Blob,
  filename: string,
  chunkIndex: number,
  totalChunks: number,
  uploadUuid: string
): Promise<UploadChunkResponse> {
  try {
    const headers = {
      "Authorization": `Bearer ${token}`
    };

    const formData = new FormData();
    formData.append('chunk', chunkData, filename);
    formData.append('chunk_index', chunkIndex.toString());
    formData.append('total_chunks', totalChunks.toString());
    formData.append('upload_uuid', uploadUuid);
    formData.append('filename', filename);

    const endpoint = `${API_BASE_URL}/api/v1/records/upload/chunk`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, message: "Chunk uploaded successfully", data };
    } else {
      const errorText = await response.text();
      return { success: false, message: `Chunk upload failed: ${response.status} - ${errorText}` };
    }
  } catch (error) {
    return { success: false, message: `Connection error: ${error}` };
  }
}

/**
 * Finalize an upload and create a record with metadata.
 */
export async function finalizeUpload(params: {
  token: string;
  title: string;
  description: string;
  categoryId: string;
  userId: string;
  mediaType: 'text' | 'audio' | 'video' | 'image';
  uploadUuid: string;
  filename: string;
  totalChunks: number;
  language: string;
  releaseRights?: 'creator' | 'family_or_friend' | 'downloaded' | 'NA';
  latitude?: number;
  longitude?: number;
  useUidFilename?: boolean;
}): Promise<FinalizeUploadResponse> {
  try {
    const headers = {
      "Authorization": `Bearer ${params.token}`
    };

    const formData = new FormData();
    formData.append('title', params.title);
    formData.append('description', params.description);
    formData.append('category_id', params.categoryId);
    formData.append('user_id', params.userId);
    formData.append('media_type', params.mediaType);
    formData.append('upload_uuid', params.uploadUuid);
    formData.append('filename', params.filename);
    formData.append('total_chunks', params.totalChunks.toString());
    formData.append('language', params.language);
    formData.append('release_rights', params.releaseRights || 'creator');
    formData.append('use_uid_filename', (params.useUidFilename ?? true).toString());

    if (params.latitude !== undefined) {
      formData.append('latitude', params.latitude.toString());
    }
    if (params.longitude !== undefined) {
      formData.append('longitude', params.longitude.toString());
    }

    const endpoint = `${API_BASE_URL}/api/v1/records/upload`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, message: "Record created successfully", data };
    } else {
      const errorText = await response.text();
      return { success: false, message: `Record creation failed: ${response.status} - ${errorText}` };
    }
  } catch (error) {
    return { success: false, message: `Connection error: ${error}` };
  }
}

/**
 * Generate a unique UUID for upload sessions
 */
export function generateUploadId(): string {
  return crypto.randomUUID();
}

/**
 * Complete file upload utility function
 */
export async function uploadFile(
  token: string,
  file: File,
  title: string,
  description: string,
  categoryId: string,
  userId: string,
  mediaType: 'text' | 'audio' | 'video' | 'image',
  language: string,
  onProgress?: (progress: number) => void
): Promise<FinalizeUploadResponse> {
  const uploadId = generateUploadId();
  const chunkSize = 1024 * 1024; // 1MB chunks
  const totalChunks = Math.ceil(file.size / chunkSize);

  // Upload each chunk
  for (let i = 0; i < totalChunks; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, end);

    const result = await uploadChunk(token, chunk, file.name, i, totalChunks, uploadId);
    if (!result.success) {
      return { success: false, message: result.message };
    }

    // Report progress
    if (onProgress) {
      onProgress(((i + 1) / totalChunks) * 90); // 90% for upload, 10% for finalization
    }
  }

  // Finalize the upload
  const finalResult = await finalizeUpload({
    token,
    title,
    description,
    categoryId,
    userId,
    mediaType,
    uploadUuid: uploadId,
    filename: file.name,
    totalChunks,
    language,
  });

  if (onProgress) {
    onProgress(100);
  }

  return finalResult;
}