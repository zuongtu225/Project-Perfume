import axios from "axios";
import { IRole } from "../Interface";
import BaseAxios from "./requsetToken";

export const createRole = (data: IRole) => {
  return axios
    .post("http://localhost:9000/api/v1/roles", data)
    .then((response) => response)
    .catch((error) => error);
};

export const updateRole = (data: any) => {
  return BaseAxios.put(`http://localhost:9000/api/v1/roles/${data.id}`, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};

export const deleteRole = (id: number) => {
  return BaseAxios.delete(`http://localhost:9000/api/v1/roles/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};
