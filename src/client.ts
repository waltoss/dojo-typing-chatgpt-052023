import axios, { AxiosInstance } from 'axios';

export type PatientEvent = {
  id: string;
  name: string;
  date: string;
};
export type CreatePatientEvent = Omit<PatientEvent, 'id'>;

export class Client {
  client: AxiosInstance;

  constructor(baseUrl: string) {
    this.client = axios.create({ baseURL: baseUrl });
  }

  async post<TData, TResponse>(url: string, data: TData): Promise<TResponse> {
    return this.client.post(url, data);
  }

  async postPatientEvent(event: CreatePatientEvent): Promise<PatientEvent> {
    return this.post('/patient', event);
  }
}

export const client = new Client(process.env.API_ENDPOINT!);
