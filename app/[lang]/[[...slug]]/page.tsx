import {notFound} from 'next/navigation';
import Site from '../../site';
import {getCopy,languages,type Lang} from '../../../content';
import {siteRoutes} from '../../../routes';
const origin='https://greatwall-greensource.com';

export function generateStaticParams() {
  const params: { lang: string; slug?: string[] }[] = [];
  for (const lang of Object.keys(languages)) {
    for (const route of siteRoutes) {
      params.push({
        lang,
        slug: route ? route.split('/') : undefined,
      });
    }
  }
  return params;
}

export async function generateMetadata({params}:{params:Promise<{lang:string,slug?:string[]}>}){
 const p=await params;if(!(p.lang in languages))return {};const lang=p.lang as Lang,c=getCopy(lang),s=p.slug||[],route=s.join('/');
 const titles:Record<string,string>={'':c.hero,about:c.aboutTitle,products:c.titleProducts,oem:c.oemHero,manufacturing:c.manufacturing,quality:c.quality,contact:c.contactTitle,insights:c.insightTitle};
 const isProduct = route.startsWith('products/');
 const productTitle = isProduct ? route.split('/')[1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : '';
 const title=titles[route]||(isProduct ? productTitle : '404');
 const description=route==='products'?c.productsBody:route==='oem'?c.oemBody:route==='manufacturing'?c.factoryBody:route==='quality'?c.qualityBody:route==='about'?c.aboutBody:route==='contact'?c.contactBody:route==='insights'?c.guideIntro:isProduct?c.skuNote:c.heroBody;
 const url=`${origin}/${lang}/${route}`;
 return {title:`${title} | Great Wall Green Source`,description,alternates:{canonical:url,languages:Object.fromEntries(Object.keys(languages).map(l=>[l,`${origin}/${l}/${route}`]))},openGraph:{title,description,url,siteName:'Great Wall Green Source',type:'website',locale:lang,images:[]},twitter:{card:'summary',title,description,images:[]}};
}

export default async function Page({params}:{params:Promise<{lang:string,slug?:string[]}>}){
 const p=await params;if(!(p.lang in languages))notFound();const path=p.slug||[];if(!siteRoutes.includes(path.join('/')))notFound();
 return <Site lang={p.lang as Lang} path={path}/>;
}
