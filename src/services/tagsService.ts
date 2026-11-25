import { request } from '../lib/apiClient';
import type { ControllerTag } from '../types/controllers';

export function listarTags(): Promise<ControllerTag[]> {
  return request('/tags');
}
