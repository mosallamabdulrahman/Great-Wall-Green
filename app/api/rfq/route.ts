import { env } from "cloudflare:workers";
import { productIds } from "../../../content";
const fields = ["intent","product","quantity","packaging","market","message","name","company","country","email","phone","language"] as const;
export async function POST(request:Request){
 try {
  const url=new URL(request.url), origin=request.headers.get("origin");
  if(origin && origin!==url.origin) return Response.json({error:"Invalid origin"},{status:403});
  if(Number(request.headers.get("content-length")||0)>16000) return Response.json({error:"Request too large"},{status:413});
  const payload=await request.json();
  if(!payload || typeof payload!=="object" || Array.isArray(payload))return Response.json({error:"Invalid request"},{status:400});
  const body=payload as Record<string,unknown>;
  if(body.website) return Response.json({error:"Please retry your request."},{status:400});
  const data=Object.fromEntries(fields.map(f=>[f,typeof body[f]==="string"?body[f].trim().slice(0,f==="message"?4000:300):""]));
  if(!productIds.includes(data.product) || !["Bulk Supply","Private Label","OEM Manufacturing","Distribution Partnership","Other"].includes(data.intent) || ["intent","product","quantity","market","name","company","country","email"].some(f=>!data[f]) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || body.consent!==true) return Response.json({error:"Please complete all required fields."},{status:400});
  if(!env.DB) return Response.json({error:"Request service is temporarily unavailable. Please try again."},{status:503});
  const id=crypto.randomUUID(), at=new Date().toISOString();
  await env.DB.prepare("INSERT INTO inquiries (id, created_at, intent, product, quantity, packaging, market, message, name, company, country, email, phone, language) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").bind(id,at,...fields.map(f=>data[f])).run();
  return Response.json({ok:true,reference:id},{status:201});
 }catch(error){ console.error("RFQ save failed",error); return Response.json({error:"Your request could not be saved. Please try again."},{status:503}); }
}
