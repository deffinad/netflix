// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { retrieveDataById, retrieveHome } from "@/lib/firebase/service";


export default async function handler(req, res) {
  const id = req.query.movie[1]

  if (id) {
    const data = await retrieveDataById('movie', id)
    res.status(200).json({ status: true, statusCode: 200, data: data });
  } else {
    const data = await retrieveHome()
    res.status(200).json({ status: true, statusCode: 200, data: data });
  }
}
