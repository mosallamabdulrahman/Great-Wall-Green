import {languages} from '../content';
import {siteRoutes} from '../routes';
export default function sitemap(){const base='https://greatwall-greensource.com';return Object.keys(languages).flatMap(l=>siteRoutes.map(r=>({url:`${base}/${l}/${r}`,alternates:{languages:Object.fromEntries(Object.keys(languages).map(lang=>[lang,`${base}/${lang}/${r}`]))}})));}
