import axios from "axios";
import { ISize } from "../Interface";
import BaseAxios from "./requsetToken";

export const createSizes = (data: ISize) => {
  return BaseAxios.post("http://localhost:9000/api/v1/sizes", data)
    .then((response) => response)
    .catch((error) => error);
};

export const updateSize = (data: any) => {
  return BaseAxios.put(`http://localhost:9000/api/v1/sizes/${data.id}`, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};

export const deleteSize = (id: number) => {
  return BaseAxios.delete(`http://localhost:9000/api/v1/sizes/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};
