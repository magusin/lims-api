import { prisma } from "../../../lib/prisma"

export default async function handler(req,res){

if(req.method !== "POST"){
return res.status(405).json({error:"Method not allowed"})
}

const {client_id,order_reference,received_date,status} = req.body

const existing = await prisma.requests.findFirst({
where:{
client_id,
order_reference
}
})

if(existing){
return res.status(409).json({
error:"Request déjà existante"
})
}

const count = await prisma.requests.count()

const request_code = "REQ-" + String(count+1).padStart(6,"0")

const request = await prisma.requests.create({
data:{
request_code,
client_id,
order_reference,
received_date:new Date(received_date),
status
}
})

res.status(201).json(request)

}