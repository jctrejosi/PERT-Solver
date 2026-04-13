import axios from "axios";

export const ApiHealthCheck = async (): Promise<boolean> => {
  try {
    const response = await axios.get("/api/v1.0/health");
    return response.status === 200;
  } catch {
    return false;
  }
};
