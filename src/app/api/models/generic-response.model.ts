export class GenericResponse<T> {
    isSuccess: boolean;
    message: string;
    payload: T;
}