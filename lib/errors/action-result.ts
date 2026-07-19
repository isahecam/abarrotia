export type ActionResult<T = void> =
  | { success: true; data: T; message?: string }
  | { success: false; reason: string; message: string; fieldErrors?: Record<string, string[]> };
