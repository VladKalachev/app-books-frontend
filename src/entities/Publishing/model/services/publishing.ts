import { AxiosResponse } from "axios";
import $api from "@/shared/plugins/http";
import { IPublishing, IPublishingCreate } from "../types/publishing";

export class PublishingService {
  static fetchPublishing(): Promise<AxiosResponse<IPublishing[]>> {
    return $api.get<IPublishing[]>("/publishing");
  }

  static addPublishing(formData: any): Promise<AxiosResponse<IPublishing>> {
    return $api.post<IPublishing>("/publishing/create", formData);
  }

  static getPublishingById(id: string): Promise<AxiosResponse<IPublishing>> {
    return $api.get<IPublishing>(`/publishing/${id}`);
  }

  static updatePublishing(
    id: string,
    genre: IPublishingCreate
  ): Promise<AxiosResponse<IPublishing>> {
    return $api.put<IPublishing>(`/publishing/${id}`, genre);
  }

  static deletePublishingById(id: string): Promise<AxiosResponse<IPublishing>> {
    return $api.delete<IPublishing>(`/publishing/${id}`);
  }
}
