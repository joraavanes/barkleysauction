import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return res.status(404).json({
    status: 404,
    error: 'Path not found'
  });
}