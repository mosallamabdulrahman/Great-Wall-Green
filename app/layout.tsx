import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'Great Wall Green Source',description:'International B2B chestnut manufacturing, OEM and private-label supply.',robots:{index:false,follow:false},icons:{icon:'/favicon.svg'}};
export default async function RootLayout({children,params}:{children:React.ReactNode,params:Promise<{lang?:string}>}){const p=await params;const lang=p.lang||"en";return <html lang={lang} dir={lang==="ar"?"rtl":"ltr"}><body>{children}</body></html>;}
