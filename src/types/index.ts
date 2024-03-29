export type JwtPayload = {
  email: string;
  id: number;
};

export interface HttpSuccessResponse<T> {
  readonly data: T;
}

export interface FailResponse {
  readonly message: string;
  readonly code: number;
}

export interface HttpFailResponse {
  readonly error: FailResponse;
}
