export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; reason: string; message: string; fieldErrors?: Record<string, string[]> };
