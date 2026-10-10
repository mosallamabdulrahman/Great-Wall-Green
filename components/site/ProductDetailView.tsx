import React, { useState } from "react";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Download,
  FileText,
  Boxes,
  Award,
  Clock,
  Layers,
  UtensilsCrossed,
  Leaf,
} from "lucide-react";
import { type Lang } from "../../content";
import { SiteImage } from "./Image";
import type { SiteCopy } from "./types";

interface ProductDetailViewProps {
  lang: Lang;
  c: SiteCopy;
  productId: string;
  href: (r?: string) => string;
  rfq: (product?: string, intent?: string, message?: string) => string;
}

export function ProductDetailView({
  lang,
  c,
  productId,
  href,
  rfq,
}: ProductDetailViewProps) {
  // Normalize product ID (support aliases)
  const normId =
    productId === "dried-sweet-potato" || productId === "sweet-potato-chunks"
      ? "sweet-potato"
      : productId === "roasted-chickpeas"
        ? "chickpeas"
        : productId === "hollow-hawthorn"
          ? "hawthorn"
          : productId;

  // Product data dictionary
  const productData: Record<
    string,
    {
      name: Record<Lang, string>;
      category: Record<Lang, string>;
      pill: Record<Lang, string>;
      desc: Record<Lang, string>;
      mainImg: string;
      thumbnails: string[];
      specs: { label: Record<Lang, string>; value: Record<Lang, string> }[];
      overview: Record<Lang, string>;
      highlights: {
        title: Record<Lang, string>;
        iconType: "raw" | "organic" | "pure" | "ready";
      }[];
    }
  > = {
    "organic-chestnut-kernels": {
      name: {
        en: "Organic Chestnut Kernels",
        ar: "حبات كستناء عضوية",
        zh: "有机栗仁",
        ja: "有機むき栗",
        ko: "유기농 깐밤",
        ru: "Органические очищенные каштаны",
      },
      category: {
        en: "Chestnuts",
        ar: "كستناء",
        zh: "板栗系列",
        ja: "栗シリーズ",
        ko: "밤 시리즈",
        ru: "Каштаны",
      },
      pill: {
        en: "READY-TO-EAT CHESTNUTS",
        ar: "كستناء جاهزة للأكل",
        zh: "即食开袋板栗",
        ja: "そのまま食べられる栗",
        ko: "즉석 섭취 밤",
        ru: "ГОТОВЫЕ К УПОТРЕБЛЕНИЮ КАШТАНЫ",
      },
      desc: {
        en: "Certified organic, peeled roasted chestnut kernels developed for convenient retail and private-label applications.",
        ar: "حبات كستناء محمصة ومقشرة عضوية معتمدة تم تطويرها لتناسب أسواق التجزئة والعلامات الخاصة العالمية.",
        zh: "精选有机板栗，精心脱壳烘烤而成，专为国际零售商与自有品牌客户打造。",
        ja: "厳選された有機栽培の栗を丁寧に皮むき・焙煎。小売およびプライベートブランド向けに最適です。",
        ko: "엄선된 유기농 밤을 껍질 벗겨 로스팅하여 글로벌 소매 및 PB 브랜드에 최적화된 제품입니다.",
        ru: "Сертифицированные органические очищенные обжаренные каштаны для розничных сетей и частных марок.",
      },
      mainImg: "kernels",
      thumbnails: ["kernels", "rte", "honey"],
      specs: [
        {
          label: {
            en: "Origin",
            ar: "المنشأ",
            zh: "产地",
            ja: "産地",
            ko: "원산지",
            ru: "Происхождение",
          },
          value: {
            en: "Hebei, China",
            ar: "خبي، الصين",
            zh: "中国河北",
            ja: "中国・河北省",
            ko: "중국 허베이",
            ru: "Хэбэй, Китай",
          },
        },
        {
          label: {
            en: "Format",
            ar: "الشكل والمواصفة",
            zh: "产品形态",
            ja: "仕様形態",
            ko: "형태",
            ru: "Формат",
          },
          value: {
            en: "Peeled, roasted",
            ar: "مقشر، محمص",
            zh: "去壳熟制",
            ja: "むき栗・焙煎",
            ko: "탈피, 로스팅",
            ru: "Очищенные, обжаренные",
          },
        },
        {
          label: {
            en: "Available Sizes",
            ar: "الأحجام المتاحة",
            zh: "规格重量",
            ja: "内容量規格",
            ko: "규격",
            ru: "Доступные объемы",
          },
          value: {
            en: "50g / 80g / 100g / 120g",
            ar: "50جم / 80جم / 100جم / 120جم",
            zh: "50g / 80g / 100g / 120g",
            ja: "50g / 80g / 100g / 120g",
            ko: "50g / 80g / 100g / 120g",
            ru: "50г / 80г / 100г / 120г",
          },
        },
        {
          label: {
            en: "Multi-pack",
            ar: "عبوة مجمعة",
            zh: "组合包装",
            ja: "マルチパック",
            ko: "묶음 포장",
            ru: "Мультипак",
          },
          value: {
            en: "50g * 10 (box)",
            ar: "50جم * 10 (صندوق)",
            zh: "50g * 10包（盒装）",
            ja: "50g * 10袋（化粧箱）",
            ko: "50g * 10입 (박스)",
            ru: "50г * 10 (коробка)",
          },
        },
        {
          label: {
            en: "Private Label",
            ar: "العلامة الخاصة",
            zh: "自有品牌",
            ja: "OEM・PB",
            ko: "PB 제조",
            ru: "Частная марка",
          },
          value: {
            en: "Available",
            ar: "متاح",
            zh: "支持定制",
            ja: "対応可能",
            ko: "가능",
            ru: "Доступно",
          },
        },
        {
          label: {
            en: "Packaging",
            ar: "خيارات التعبئة",
            zh: "包装形式",
            ja: "包装",
            ko: "포장",
            ru: "Упаковка",
          },
          value: {
            en: "Customization available",
            ar: "تخصيص كامل متاح",
            zh: "支持按需定制",
            ja: "オーダーメイド対応",
            ko: "맞춤 포장 가능",
            ru: "Индивидуальная упаковка",
          },
        },
        {
          label: {
            en: "MOQ",
            ar: "الحد الأدنى للطلب",
            zh: "起订量",
            ja: "最小発注数量",
            ko: "최소 주문 수량",
            ru: "Мин. заказ",
          },
          value: {
            en: "Based on product and specification",
            ar: "وفقاً للمنتج والمواصفات",
            zh: "按产品及定制规格确定",
            ja: "製品および仕様に基づき確認",
            ko: "제품 및 사양에 따라 협의",
            ru: "В зависимости от спецификации",
          },
        },
        {
          label: {
            en: "Lead Time",
            ar: "مدة التسليم",
            zh: "交货周期",
            ja: "リードタイム",
            ko: "납기",
            ru: "Сроки поставки",
          },
          value: {
            en: "Confirmed according to order requirements",
            ar: "تُحدد وفقاً لمتطلبات الطلب",
            zh: "根据订单及物流确认",
            ja: "ご注文条件に基づき確定",
            ko: "주문 수량에 따라 확정",
            ru: "Подтверждается по запросу",
          },
        },
      ],
      overview: {
        en: "Our organic chestnut kernels are made from selected Yan Mountain chestnuts, with a soft texture and natural sweetness. They are suitable for retail, wholesale and private-label markets.",
        ar: "تُصنع حبات الكستناء العضوية لدينا من كستناء جبال يانشان المنتقاة بعناية، وتتميز بملمس طري وحلاوة طبيعية مميزة. مناسبة لأسواق التجزئة والجملة ومشاريع العلامات الخاصة.",
        zh: "我们的有机栗仁采摘自燕山天然核心产区，果肉香糯细腻，甘甜天成，适合高端零售、大宗批发及全球商超自有品牌。",
        ja: "当社の有機むき栗は、名高い燕山山脈の厳選栗を使用。しっとり柔らかな食感と自然な甘みが特長で、小売・卸売・PB市場に最適です。",
        ko: "옌산 산맥의 엄선된 유기농 밤으로 만들어 부드러운 식감과 깊은 천연 단맛을 자랑합니다.",
        ru: "Наши органические каштаны собраны в экологически чистом регионе гор Яньшань. Обладают мягкой текстурой и естественной сладостью.",
      },
      highlights: [
        {
          title: {
            en: "Selected Raw Materials",
            ar: "مواد خام منتقاة",
            zh: "源头优选原料",
            ja: "厳選原料",
            ko: "엄선된 원료",
            ru: "Отборное сырье",
          },
          iconType: "raw",
        },
        {
          title: {
            en: "Certified Organic",
            ar: "عضوي معتمد",
            zh: "权威有机认证",
            ja: "有機認証取得",
            ko: "유기농 인증",
            ru: "Органический сертификат",
          },
          iconType: "organic",
        },
        {
          title: {
            en: "No Additives",
            ar: "بدون إضافات",
            zh: "无任何添加剂",
            ja: "無添加・純粋",
            ko: "무첨가",
            ru: "Без добавок",
          },
          iconType: "pure",
        },
        {
          title: {
            en: "Ready to Eat",
            ar: "جاهزة للأكل",
            zh: "开袋即食便携",
            ja: "開けてすぐ美味しい",
            ko: "즉석 섭취",
            ru: "Готово к употреблению",
          },
          iconType: "ready",
        },
      ],
    },
    "ready-to-eat-chestnuts": {
      name: {
        en: "Ready-to-Eat Chestnuts",
        ar: "كستناء جاهزة للأكل",
        zh: "即食板栗",
        ja: "そのまま食べられる栗",
        ko: "바로 먹는 밤",
        ru: "Готовые к употреблению каштаны",
      },
      category: {
        en: "Chestnuts",
        ar: "كستناء",
        zh: "板栗系列",
        ja: "栗シリーズ",
        ko: "밤 시리즈",
        ru: "Каштаны",
      },
      pill: {
        en: "ROASTED CHESTNUTS",
        ar: "كستناء محمصة",
        zh: "传统烘烤即食",
        ja: "焙煎栗",
        ko: "로스팅 밤",
        ru: "ОБЖАРЕННЫЕ КАШТАНЫ",
      },
      desc: {
        en: "Convenient snack packs made with roasted Yanshan chestnuts. Rich natural sweetness without added preservatives.",
        ar: "عبوات خفيفة جاهزة مصنوعة من كستناء يانشان المحمصة. حلاوة طبيعية غنية دون مواد حافظة مضافة.",
        zh: "燕山板栗传统熟化工艺加工，香甜纯正，不添加任何防腐剂，方便开袋即食。",
        ja: "香ばしく焼き上げた燕山栗。保存料不使用、自然な甘さとほくほく感を手軽に楽しめます。",
        ko: "옌산 밤을 고소하게 구워낸 간편 간식. 합성 보존료 없이 자연의 맛을 담았습니다.",
        ru: "Удобные порционные упаковки обжаренных каштанов Яньшань. Натуральная сладость без консервантов.",
      },
      mainImg: "rte",
      thumbnails: ["rte", "kernels", "honey"],
      specs: [
        {
          label: {
            en: "Origin",
            ar: "المنشأ",
            zh: "产地",
            ja: "産地",
            ko: "원산지",
            ru: "Происхождение",
          },
          value: {
            en: "Hebei, China",
            ar: "خبي، الصين",
            zh: "中国河北",
            ja: "中国・河北省",
            ko: "중국 허베이",
            ru: "Хэбэй, Китай",
          },
        },
        {
          label: {
            en: "Format",
            ar: "الشكل والمواصفة",
            zh: "产品形态",
            ja: "仕様形態",
            ko: "형태",
            ru: "Формат",
          },
          value: {
            en: "Peeled, cooked",
            ar: "مقشر، مطبوخ",
            zh: "去壳熟制",
            ja: "むき栗・加熱済み",
            ko: "탈피, 조리",
            ru: "Очищенные, готовые",
          },
        },
        {
          label: {
            en: "Available Sizes",
            ar: "الأحجام المتاحة",
            zh: "规格重量",
            ja: "内容量規格",
            ko: "규격",
            ru: "Доступные объемы",
          },
          value: {
            en: "60g / 80g / 100g / 150g",
            ar: "60جم / 80جم / 100جم / 150جم",
            zh: "60g / 80g / 100g / 150g",
            ja: "60g / 80g / 100g / 150g",
            ko: "60g / 80g / 100g / 150g",
            ru: "60г / 80г / 100г / 150г",
          },
        },
        {
          label: {
            en: "Multi-pack",
            ar: "عبوة مجمعة",
            zh: "组合包装",
            ja: "マルチパック",
            ko: "묶음 포장",
            ru: "Мультипак",
          },
          value: {
            en: "80g * 6 (carton)",
            ar: "80جم * 6 (كرتون)",
            zh: "80g * 6包（盒装）",
            ja: "80g * 6袋（箱入り）",
            ko: "80g * 6입",
            ru: "80г * 6 (коробка)",
          },
        },
        {
          label: {
            en: "Private Label",
            ar: "العلامة الخاصة",
            zh: "自有品牌",
            ja: "OEM・PB",
            ko: "PB 제조",
            ru: "Частная марка",
          },
          value: {
            en: "Available",
            ar: "متاح",
            zh: "支持定制",
            ja: "対応可能",
            ko: "가능",
            ru: "Доступно",
          },
        },
        {
          label: {
            en: "Packaging",
            ar: "خيارات التعبئة",
            zh: "包装形式",
            ja: "包装",
            ko: "포장",
            ru: "Упаковка",
          },
          value: {
            en: "Nitrogen foil pouch / Stand-up pouch",
            ar: "أكياس فويل مفرغة بالنيتروجين / أكياس قائمة",
            zh: "充氮铝箔袋 / 自立袋",
            ja: "アルミ窒素充填パック / スタンドパウチ",
            ko: "질소 충전 파우치",
            ru: "Фольгированные пакеты с азотом",
          },
        },
        {
          label: {
            en: "MOQ",
            ar: "الحد الأدنى للطلب",
            zh: "起订量",
            ja: "最小発注数量",
            ko: "최소 주문 수량",
            ru: "Мин. заказ",
          },
          value: {
            en: "Negotiable by packaging type",
            ar: "حسب نوع التعبئة",
            zh: "根据包装形式商定",
            ja: "包装仕様により相談",
            ko: "포장 사양에 따라 협의",
            ru: "По согласованию",
          },
        },
        {
          label: {
            en: "Lead Time",
            ar: "مدة التسليم",
            zh: "交货周期",
            ja: "リードタイム",
            ko: "납기",
            ru: "Сроки поставки",
          },
          value: {
            en: "20-30 days after artwork confirmation",
            ar: "20-30 يوماً من اعتماد التصميم",
            zh: "设计确认后20-30天",
            ja: "デザイン確定後20〜30日",
            ko: "디자인 확정 후 20~30일",
            ru: "20-30 дней",
          },
        },
      ],
      overview: {
        en: "Roasted ready-to-eat chestnuts prepared using advanced automated retort processing, retaining freshness and natural taste without chemical preservatives.",
        ar: "كستناء جاهزة للأكل محمصة باستخدام أحدث تقنيات التعقيم بالضغط العالي، لتحافظ على نضارتها وطعمها الطبيعي الطازج دون أي مواد كيميائية.",
        zh: "采用高温高压物理杀菌工艺，锁住现烤风味与丰富营养，常温下保持新鲜口感。",
        ja: "高温高圧殺菌技術を採用し、焼きたてのような香ばしさと栄養を逃さず閉じ込めました。",
        ko: "고온 고압 살균 기술을 적용하여 방부제 없이도 갓 구운 풍미를 신선하게 유지합니다.",
        ru: "Приготовлены методом высокотемпературной стерилизации без консервантов.",
      },
      highlights: [
        {
          title: {
            en: "Selected Raw Materials",
            ar: "مواد خام منتقاة",
            zh: "精选燕山原栗",
            ja: "厳選原料",
            ko: "엄선된 원료",
            ru: "Отборное сырье",
          },
          iconType: "raw",
        },
        {
          title: {
            en: "Certified Quality",
            ar: "جودة معتمدة",
            zh: "ISO/HACCP认证",
            ja: "品質認証",
            ko: "품질 인증",
            ru: "Стандарты качества",
          },
          iconType: "organic",
        },
        {
          title: {
            en: "No Additives",
            ar: "بدون إضافات",
            zh: "无防腐剂添加",
            ja: "無添加",
            ko: "무첨가",
            ru: "Без добавок",
          },
          iconType: "pure",
        },
        {
          title: {
            en: "Ready to Eat",
            ar: "جاهزة للأكل",
            zh: "即开即享美味",
            ja: "手軽に楽しめる",
            ko: "즉석 섭취",
            ru: "Готово к употреблению",
          },
          iconType: "ready",
        },
      ],
    },
    "sweetened-chestnuts": {
      name: {
        en: "Sweetened Chestnuts",
        ar: "كستناء مُحلّاة",
        zh: "甜味板栗",
        ja: "甘味付き栗",
        ko: "가당 밤",
        ru: "Подслащённые каштаны",
      },
      category: {
        en: "Chestnuts",
        ar: "كستناء",
        zh: "板栗系列",
        ja: "栗シリーズ",
        ko: "밤 시리즈",
        ru: "Каштаны",
      },
      pill: {
        en: "GLAZED / SWEETENED",
        ar: "كستناء محلاة",
        zh: "传统甜度特调",
        ja: "甘露仕立て",
        ko: "달콤한 밤",
        ru: "ПОДСЛАЩЕННЫЕ КАШТАНЫ",
      },
      desc: {
        en: "Gently glazed chestnut snacks offering balanced sweetness and firm texture for confectionery and snack markets.",
        ar: "وجبات خفيفة من الكستناء المحلاة بتوازن مثالي لتلبي متطلبات قطاع الحلويات والأغذية الخفيفة.",
        zh: "清甜微裹，口感绵密，深受亚洲及中东零食市场青睐。",
        ja: "ほんのり甘さを加えた上品な味わい。製菓原料やおやつに幅広く活用できます。",
        ko: "은은한 단맛을 더해 더욱 부드럽고 풍부한 맛을 선사하는 프리미엄 밤 스낵입니다.",
        ru: "Каштаны с гармоничным сладким вкусом для кондитерских и снековых сетей.",
      },
      mainImg: "sweetened",
      thumbnails: ["sweetened", "kernels", "rte"],
      specs: [
        {
          label: {
            en: "Origin",
            ar: "المنشأ",
            zh: "产地",
            ja: "産地",
            ko: "원산지",
            ru: "Происхождение",
          },
          value: {
            en: "Hebei, China",
            ar: "خبي، الصين",
            zh: "中国河北",
            ja: "中国・河北省",
            ko: "중국 허베이",
            ru: "Хэбэй, Китай",
          },
        },
        {
          label: {
            en: "Format",
            ar: "الشكل والمواصفة",
            zh: "产品形态",
            ja: "仕様形態",
            ko: "형태",
            ru: "Формат",
          },
          value: {
            en: "Glazed whole kernels",
            ar: "حبات كاملة محلاة",
            zh: "糖渍整粒栗仁",
            ja: "ホール栗・甘味",
            ko: "통밤 가당",
            ru: "Цельные каштаны в сиропе",
          },
        },
        {
          label: {
            en: "Available Sizes",
            ar: "الأحجام المتاحة",
            zh: "规格重量",
            ja: "内容量規格",
            ko: "규격",
            ru: "Доступные объемы",
          },
          value: {
            en: "80g / 100g / 120g / 250g",
            ar: "80جم / 100جم / 120جم / 250جم",
            zh: "80g / 100g / 120g / 250g",
            ja: "80g / 100g / 120g / 250g",
            ko: "80g / 100g / 120g / 250g",
            ru: "80г / 100г / 120г / 250г",
          },
        },
        {
          label: {
            en: "Private Label",
            ar: "العلامة الخاصة",
            zh: "自有品牌",
            ja: "OEM・PB",
            ko: "PB 제조",
            ru: "Частная марка",
          },
          value: {
            en: "Available",
            ar: "متاح",
            zh: "支持定制",
            ja: "対応可能",
            ko: "가능",
            ru: "Доступно",
          },
        },
        {
          label: {
            en: "Packaging",
            ar: "خيارات التعبئة",
            zh: "包装形式",
            ja: "包装",
            ko: "포장",
            ru: "Упаковка",
          },
          value: {
            en: "Foil pouch, customized carton",
            ar: "أكياس فويل، كرتون مخصص",
            zh: "复合袋、定制外箱",
            ja: "アルミパック・外箱",
            ko: "맞춤형 포장",
            ru: "Пакет из фольги",
          },
        },
        {
          label: {
            en: "MOQ",
            ar: "الحد الأدنى للطلب",
            zh: "起订量",
            ja: "最小発注数量",
            ko: "최소 주문 수량",
            ru: "Мин. заказ",
          },
          value: {
            en: "Based on specification",
            ar: "حسب المواصفات",
            zh: "按规格确认",
            ja: "仕様により確認",
            ko: "사양에 따름",
            ru: "По спецификации",
          },
        },
        {
          label: {
            en: "Lead Time",
            ar: "مدة التسليم",
            zh: "交货周期",
            ja: "リードタイム",
            ko: "납기",
            ru: "Сроки поставки",
          },
          value: {
            en: "Confirmed upon order",
            ar: "تُؤكد عند الطلب",
            zh: "下单确认",
            ja: "受注後確定",
            ko: "주문 시 확정",
            ru: "При заказе",
          },
        },
      ],
      overview: {
        en: "Prepared with controlled sweetness to preserve the rich chestnut flavor while satisfying consumer preferences for sweetened snack options.",
        ar: "مجهزة بدرجة حلاوة مدروسة تحافظ على نكهة الكستناء الغنية وتلبي رغبات المستهلكين في الوجبات الخفيفة اللذيذة.",
        zh: "精准温和调味，在保留天然栗香的同时呈现甜润风味，颗粒饱满完整。",
        ja: "栗本来の風味を引き立てる絶妙な甘さ。粒揃いが良く、贅沢なおやつに最適です。",
        ko: "밤 본연의 고소함과 달콤함의 조화가 뛰어납니다.",
        ru: "Сбалансированная сладость, сохраняющая натуральный аромат каштана.",
      },
      highlights: [
        {
          title: {
            en: "Selected Raw Materials",
            ar: "مواد خام منتقاة",
            zh: "优质产地原料",
            ja: "厳選原料",
            ko: "엄선된 원료",
            ru: "Отборное сырье",
          },
          iconType: "raw",
        },
        {
          title: {
            en: "Balanced Taste",
            ar: "طعم متوازن",
            zh: "香甜醇正配方",
            ja: "上品な甘み",
            ko: "균형 잡힌 맛",
            ru: "Сбалансированный вкус",
          },
          iconType: "organic",
        },
        {
          title: {
            en: "No Artificial Flavors",
            ar: "بدون نكهات صناعية",
            zh: "无人工香精",
            ja: "香料不使用",
            ko: "인공 향료 무첨가",
            ru: "Без ароматизаторов",
          },
          iconType: "pure",
        },
        {
          title: {
            en: "Ready to Eat",
            ar: "جاهزة للأكل",
            zh: "开袋即食",
            ja: "手軽に美味しい",
            ko: "즉석 섭취",
            ru: "Готово к употреблению",
          },
          iconType: "ready",
        },
      ],
    },
    "honey-chestnuts": {
      name: {
        en: "Honey Chestnuts",
        ar: "كستناء بالعسل",
        zh: "蜂蜜板栗",
        ja: "はちみつ栗",
        ko: "꿀밤",
        ru: "Каштаны с мёдом",
      },
      category: {
        en: "Chestnuts",
        ar: "كستناء",
        zh: "板栗系列",
        ja: "栗シリーズ",
        ko: "밤 시리즈",
        ru: "Каштаны",
      },
      pill: {
        en: "HONEY INFUSED",
        ar: "منقوعة بالعسل",
        zh: "蜂蜜醇香风味",
        ja: "はちみつ仕立て",
        ko: "천연 꿀 함유",
        ru: "С НАТУРАЛЬНЫМ МЁДОМ",
      },
      desc: {
        en: "Infused with pure honey for a smooth, aromatic gourmet profile popular in export retail channels.",
        ar: "منقوعة بالعسل الصافي لتعطي نكهة عطرية غنية ومميزة تحظى بإقبال واسع في منافذ التجزئة العالمية.",
        zh: "融入天然纯蜂蜜浸润，甘醇芳香，香糯甜润，出口高端渠道畅销单品。",
        ja: "純粋はちみつをじっくり染み込ませた芳醇な風味。海外の高級食品コーナーで好評です。",
        ko: "순수 천연 꿀을 더해 은은한 향과 깊은 단맛이 일품인 프리미엄 스낵입니다.",
        ru: "Пропитаны натуральным медом для нежного вкуса и аромата.",
      },
      mainImg: "honey",
      thumbnails: ["honey", "sweetened", "kernels"],
      specs: [
        {
          label: {
            en: "Origin",
            ar: "المنشأ",
            zh: "产地",
            ja: "産地",
            ko: "원산지",
            ru: "Происхождение",
          },
          value: {
            en: "Hebei, China",
            ar: "خبي، الصين",
            zh: "中国河北",
            ja: "中国・河北省",
            ko: "중국 허베이",
            ru: "Хэбэй, Китай",
          },
        },
        {
          label: {
            en: "Format",
            ar: "الشكل والمواصفة",
            zh: "产品形态",
            ja: "仕様形態",
            ko: "형태",
            ru: "Формат",
          },
          value: {
            en: "Honey glazed kernels",
            ar: "حبات محلاة بالعسل",
            zh: "蜜渍熟栗仁",
            ja: "はちみつ漬け栗",
            ko: "꿀 코팅 밤",
            ru: "Каштаны в меду",
          },
        },
        {
          label: {
            en: "Available Sizes",
            ar: "الأحجام المتاحة",
            zh: "规格重量",
            ja: "内容量規格",
            ko: "규격",
            ru: "Доступные объемы",
          },
          value: {
            en: "50g / 80g / 100g",
            ar: "50جم / 80جم / 100جم",
            zh: "50g / 80g / 100g",
            ja: "50g / 80g / 100g",
            ko: "50g / 80g / 100g",
            ru: "50г / 80г / 100г",
          },
        },
        {
          label: {
            en: "Private Label",
            ar: "العلامة الخاصة",
            zh: "自有品牌",
            ja: "OEM・PB",
            ko: "PB 제조",
            ru: "Частная марка",
          },
          value: {
            en: "Available",
            ar: "متاح",
            zh: "支持定制",
            ja: "対応可能",
            ko: "가능",
            ru: "Доступно",
          },
        },
        {
          label: {
            en: "Packaging",
            ar: "خيارات التعبئة",
            zh: "包装形式",
            ja: "包装",
            ko: "포장",
            ru: "Упаковка",
          },
          value: {
            en: "Retail bag, multi-pack box",
            ar: "أكياس تجزئة، علب مجمعة",
            zh: "零售袋装、礼盒装",
            ja: "リテール袋、ギフト箱",
            ko: "소포장 파우치",
            ru: "Пакеты и коробки",
          },
        },
        {
          label: {
            en: "MOQ",
            ar: "الحد الأدنى للطلب",
            zh: "起订量",
            ja: "最小発注数量",
            ko: "최소 주문 수량",
            ru: "Мин. заказ",
          },
          value: {
            en: "Project-specific",
            ar: "حسب متطلبات المشروع",
            zh: "按项目商议",
            ja: "企画に応じて確認",
            ko: "프로젝트별 협의",
            ru: "По запросу",
          },
        },
        {
          label: {
            en: "Lead Time",
            ar: "مدة التسليم",
            zh: "交货周期",
            ja: "リードタイム",
            ko: "납기",
            ru: "Сроки поставки",
          },
          value: {
            en: "Confirmed upon order",
            ar: "تُؤكد عند الطلب",
            zh: "订单确认",
            ja: "注文時確定",
            ko: "주문 시 확정",
            ru: "При заказе",
          },
        },
      ],
      overview: {
        en: "Real honey coats each tender chestnut kernel, delivering a sweet glaze that appeals to premium healthy snack consumers worldwide.",
        ar: "عسل نقي طبيعي يغلف حبات الكستناء الطرية ليمنحها لمعاناً ومذاقاً غنياً يفضله عشاق الوجبات الخفيفة الفاخرة حول العالم.",
        zh: "严选天然纯蜜，均匀裹润每一颗金黄栗仁，香甜滋润，回味悠长。",
        ja: "天然のはちみつが栗を優しくコーティング。甘美でリッチな味わいが広がります。",
        ko: "천연 꿀이 선사하는 자연 그대로의 고급스러운 단맛을 경험해보세요.",
        ru: "Натуральный мед раскрывает все богатство вкуса отборных каштанов.",
      },
      highlights: [
        {
          title: {
            en: "Selected Raw Materials",
            ar: "مواد خام منتقاة",
            zh: "甄选优级栗仁",
            ja: "厳選原料",
            ko: "엄선된 원료",
            ru: "Отборное сырье",
          },
          iconType: "raw",
        },
        {
          title: {
            en: "Pure Natural Honey",
            ar: "عسل نحل طبيعي",
            zh: "纯天然百花蜜",
            ja: "天然はちみつ",
            ko: "천연 꿀",
            ru: "Натуральный мед",
          },
          iconType: "organic",
        },
        {
          title: {
            en: "No Additives",
            ar: "بدون إضافات",
            zh: "无人工防腐剂",
            ja: "無添加",
            ko: "무첨가",
            ru: "Без добавок",
          },
          iconType: "pure",
        },
        {
          title: {
            en: "Ready to Eat",
            ar: "جاهزة للأكل",
            zh: "随享美味",
            ja: "そのまま美味しい",
            ko: "즉석 섭취",
            ru: "Готово к употреблению",
          },
          iconType: "ready",
        },
      ],
    },
    "frozen-chestnuts": {
      name: {
        en: "Frozen Chestnuts",
        ar: "كستناء مجمدة",
        zh: "冷冻板栗",
        ja: "冷凍栗",
        ko: "냉동 밤",
        ru: "Замороженные каштаны",
      },
      category: {
        en: "Chestnuts",
        ar: "كستناء",
        zh: "板栗系列",
        ja: "栗シリーズ",
        ko: "밤 시리즈",
        ru: "Каштаны",
      },
      pill: {
        en: "IQF FROZEN INGREDIENTS",
        ar: "مكونات مجمدة بتقنية IQF",
        zh: "IQF单冻食品原料",
        ja: "IQF急速冷凍・業務用",
        ko: "IQF 급속 냉동",
        ru: "IQF ЗАМОРОЗКА ДЛЯ ПРОИЗВОДСТВА",
      },
      desc: {
        en: "IQF peeled chestnuts designed for bakery, catering, purée production and commercial food processing.",
        ar: "كستناء مقشرة ومجمدة بتقنية التجميد الفردي السريع (IQF)، مخصصة للمخابز وخدمات الأغذية والمصانع ومصنعي البيوريه.",
        zh: "采用IQF急速单冻锁鲜技术，专为国际烘焙、中央厨房、食品深加工客户稳定供应。",
        ja: "IQF（個別急速冷凍）技術により鮮度を保持。製菓・ベーカリー・外食チェーンの業務用原料に最適。",
        ko: "IQF 개별 급속 냉동 기술로 신선도를 유지하여 베이커리 및 식품 가공 원료로 최적입니다.",
        ru: "Каштаны быстрой заморозки IQF для пищевых производств, пекарен и HoReCa.",
      },
      mainImg: "frozen",
      thumbnails: ["frozen", "kernels", "rte"],
      specs: [
        {
          label: {
            en: "Origin",
            ar: "المنشأ",
            zh: "产地",
            ja: "産地",
            ko: "원산지",
            ru: "Происхождение",
          },
          value: {
            en: "Hebei, China",
            ar: "خبي، الصين",
            zh: "中国河北",
            ja: "中国・河北省",
            ko: "중국 허베이",
            ru: "Хэбэй, Китай",
          },
        },
        {
          label: {
            en: "Format",
            ar: "الشكل والمواصفة",
            zh: "产品形态",
            ja: "仕様形態",
            ko: "형태",
            ru: "Формат",
          },
          value: {
            en: "IQF peeled raw / blanched",
            ar: "مقشر ومجمد بتقنية IQF خام / مسلوق خفيف",
            zh: "IQF脱壳生冻 / 焯水单冻",
            ja: "むき栗・IQF生またはブランチング",
            ko: "탈피 급속 냉동",
            ru: "IQF очищенные",
          },
        },
        {
          label: {
            en: "Packaging",
            ar: "خيارات التعبئة",
            zh: "包装形式",
            ja: "包装",
            ko: "포장",
            ru: "Упаковка",
          },
          value: {
            en: "1kg bag / 10kg master carton",
            ar: "أكياس 1كجم / كرتون رئيسي 10كجم",
            zh: "1kg袋装 / 10kg外箱",
            ja: "1kgパック / 10kg段ボール",
            ko: "1kg / 10kg 마스터 박스",
            ru: "1 кг пакет / 10 кг короб",
          },
        },
        {
          label: {
            en: "Private Label",
            ar: "العلامة الخاصة",
            zh: "自有品牌",
            ja: "OEM・PB",
            ko: "PB 제조",
            ru: "Частная марка",
          },
          value: {
            en: "Available",
            ar: "متاح",
            zh: "支持定制",
            ja: "対応可能",
            ko: "가능",
            ru: "Доступно",
          },
        },
        {
          label: {
            en: "Storage",
            ar: "ظروف التخزين",
            zh: "储存条件",
            ja: "保管条件",
            ko: "보관 조건",
            ru: "Хранение",
          },
          value: {
            en: "-18°C or below",
            ar: "-18 درجة مئوية أو أقل",
            zh: "-18℃以下冷冻",
            ja: "-18℃以下冷凍保管",
            ko: "-18℃ 이하 냉동",
            ru: "-18°C и ниже",
          },
        },
        {
          label: {
            en: "Shelf Life",
            ar: "مدة الصلاحية",
            zh: "保质期",
            ja: "賞味期限",
            ko: "유통기한",
            ru: "Срок годности",
          },
          value: {
            en: "24 months",
            ar: "24 شهراً",
            zh: "24个月",
            ja: "24ヶ月",
            ko: "24개월",
            ru: "24 месяца",
          },
        },
        {
          label: {
            en: "Lead Time",
            ar: "مدة التسليم",
            zh: "交货周期",
            ja: "リードタイム",
            ko: "납기",
            ru: "Сроки поставки",
          },
          value: {
            en: "Confirmed per container schedule",
            ar: "حسب جدول شحن الحاويات",
            zh: "根据集装箱航期确认",
            ja: "コンテナ手配スケジュールによる",
            ko: "컨테이너 일정에 따름",
            ru: "По графику контейнерных поставок",
          },
        },
      ],
      overview: {
        en: "Our IQF frozen chestnuts are processed during the peak harvest season to lock in freshness, offering high yield and uniform quality for commercial kitchens and food factories.",
        ar: "تتم معالجة الكستناء المجمدة IQF خلال ذروة موسم الحصاد للاحتفاظ بالنضارة والجودة العالية، موفرة حلاً مثالياً للمطابخ التجارية والمصانع الغذائية.",
        zh: "当季采摘即刻入库深加工，保留完整原粒形态与自然风味，出成率高，无黑斑碎果。",
        ja: "収穫最盛期に急速冷凍することで、採れたての鮮度と形を保持。割れや傷みの少ない高品質原料です。",
        ko: "수확 직후 급속 냉동하여 최상의 신선도와 원형을 유지합니다.",
        ru: "Заморожены в пик сезона сбора урожая с сохранением питательных свойств.",
      },
      highlights: [
        {
          title: {
            en: "Selected Raw Materials",
            ar: "مواد خام منتقاة",
            zh: "精选燕山原果",
            ja: "厳選原料",
            ko: "엄선된 원료",
            ru: "Отборное сырье",
          },
          iconType: "raw",
        },
        {
          title: {
            en: "IQF Freezing Technology",
            ar: "تقنية تجميد IQF",
            zh: "急速单冻锁鲜",
            ja: "急速冷凍技術",
            ko: "IQF 급속 냉동",
            ru: "Технология IQF",
          },
          iconType: "organic",
        },
        {
          title: {
            en: "100% Pure & Clean",
            ar: "نقية ونظيفة 100%",
            zh: "纯正洁净",
            ja: "徹底洗浄・選別",
            ko: "100% 순수 원물",
            ru: "Чистота 100%",
          },
          iconType: "pure",
        },
        {
          title: {
            en: "Consistent B2B Supply",
            ar: "توريد مستقر للمصانع",
            zh: "全年稳定供应",
            ja: "安定供給体制",
            ko: "안정적 공급",
            ru: "Стабильные поставки",
          },
          iconType: "ready",
        },
      ],
    },
    "sweet-potato": {
      name: {
        en: "Dried Sweet Potato",
        ar: "بطاطا حلوة مجففة",
        zh: "红薯干 / 地瓜干",
        ja: "干し芋 / さつまいも",
        ko: "말린 고구마",
        ru: "Сушёный батат",
      },
      category: {
        en: "Snack Products",
        ar: "منتجات خفيفة",
        zh: "健康零食",
        ja: "スナックシリーズ",
        ko: "스낵 시리즈",
        ru: "Снеки",
      },
      pill: {
        en: "HEALTHY ROOT SNACKS",
        ar: "وجبات جذور صحية",
        zh: "无油健康零食",
        ja: "ヘルシースナック",
        ko: "건강 간식",
        ru: "ПОЛЕЗНЫЕ СНЕКИ",
      },
      desc: {
        en: "Soft-dried sweet potato strips with natural sweetness, rich fiber and no added sugar or sulfur treatment.",
        ar: "شرائح بطاطا حلوة مجففة بحلاوة طبيعية وألياف غنية دون سكر مضاف أو معالجة بالكبريت.",
        zh: "软糯香甜，富含膳食纤维，不添加蔗糖，无硫熏处理，健康美味。",
        ja: "自然な甘みとしっとり食感。食物繊維が豊富で、砂糖・保存料不使用の伝統製法。",
        ko: "설탕이나 보존료 없이 자연 건조하여 쫀득하고 달콤한 고구마 말랭이입니다.",
        ru: "Мягкие ломтики батата естественной сушки без добавления сахара и консервантов.",
      },
      mainImg: "sweet-potato",
      thumbnails: ["sweet-potato", "kernels", "rte"],
      specs: [
        {
          label: {
            en: "Origin",
            ar: "المنشأ",
            zh: "产地",
            ja: "産地",
            ko: "원산지",
            ru: "Происхождение",
          },
          value: {
            en: "Hebei, China",
            ar: "خبي، الصين",
            zh: "中国河北",
            ja: "中国・河北省",
            ko: "중국 허베이",
            ru: "Хэбэй, Китай",
          },
        },
        {
          label: {
            en: "Format",
            ar: "الشكل والمواصفة",
            zh: "产品形态",
            ja: "仕様形態",
            ko: "형태",
            ru: "Формат",
          },
          value: {
            en: "Soft-dried strips / slices",
            ar: "شرائح / أصابع مجففة طرية",
            zh: "软糯条状 / 块状",
            ja: "スティック状・スライス",
            ko: "말랭이 스틱",
            ru: "Сушеные полоски",
          },
        },
        {
          label: {
            en: "Packaging",
            ar: "خيارات التعبئة",
            zh: "包装形式",
            ja: "包装",
            ko: "포장",
            ru: "Упаковка",
          },
          value: {
            en: "100g / 200g / 500g pouch",
            ar: "أكياس 100جم / 200جم / 500جم",
            zh: "100g / 200g / 500g 袋装",
            ja: "100g / 200g / 500g パウチ",
            ko: "100g / 200g / 500g 파우치",
            ru: "100г / 200г / 500г пакет",
          },
        },
        {
          label: {
            en: "Private Label",
            ar: "العلامة الخاصة",
            zh: "自有品牌",
            ja: "OEM・PB",
            ko: "PB 제조",
            ru: "Частная марка",
          },
          value: {
            en: "Available",
            ar: "متاح",
            zh: "支持定制",
            ja: "対応可能",
            ko: "가능",
            ru: "Доступно",
          },
        },
      ],
      overview: {
        en: "Our dried sweet potato snacks are made through controlled low-temperature dehydration, maintaining the rich golden color, nutrients and sweet flavor of farm-fresh sweet potatoes.",
        ar: "تُصنع وجبات البطاطا الحلوة المجففة عبر التجفيف بدرجات حرارة منخفضة ومدروسة، لتحافظ على اللون الذهبي الغني والقيمة الغذائية والطعم السكري الطبيعي.",
        zh: "精选沙土优质鲜薯，传统蒸熟低温慢烘工艺，锁住天然甜度与软糯口感。",
        ja: "低温除湿乾燥により、色鮮やかで栄養価の高い干し芋を実現しました。",
        ko: "저온 건조 공법으로 영양소 파괴를 최소화하고 황금빛 색감과 쫀득함을 살렸습니다.",
        ru: "Низкотемпературная сушка сохраняет золотистый цвет и полезные волокна.",
      },
      highlights: [
        {
          title: {
            en: "Farm Fresh Sweet Potato",
            ar: "بطاطا طازجة من المزرعة",
            zh: "农场直采优薯",
            ja: "新鮮な原料",
            ko: "신선한 원료",
            ru: "Свежий урожай",
          },
          iconType: "raw",
        },
        {
          title: {
            en: "No Added Sugar",
            ar: "بدون سكر مضاف",
            zh: "0添加蔗糖",
            ja: "砂糖不使用",
            ko: "무설탕",
            ru: "Без сахара",
          },
          iconType: "organic",
        },
        {
          title: {
            en: "No Preservatives",
            ar: "بدون مواد حافظة",
            zh: "不含防腐剂",
            ja: "保存料不使用",
            ko: "보존료 무첨가",
            ru: "Без консервантов",
          },
          iconType: "pure",
        },
        {
          title: {
            en: "High Dietary Fiber",
            ar: "غنية بالألياف الغذائية",
            zh: "富含膳食纤维",
            ja: "食物繊維豊富",
            ko: "풍부한 식이섬유",
            ru: "Богат клетчаткой",
          },
          iconType: "ready",
        },
      ],
    },
    chickpeas: {
      name: {
        en: "Roasted Chickpeas",
        ar: "حمص محمص",
        zh: "烤鹰嘴豆",
        ja: "ローストひよこ豆",
        ko: "구운 병아리콩",
        ru: "Обжаренный нут",
      },
      category: {
        en: "Snack Products",
        ar: "منتجات خفيفة",
        zh: "健康零食",
        ja: "スナックシリーズ",
        ko: "스낵 시리즈",
        ru: "Снеки",
      },
      pill: {
        en: "HIGH PROTEIN CRUNCH",
        ar: "مقرمشات بروتين عالي",
        zh: "高蛋白香脆零食",
        ja: "高プロテインスナック",
        ko: "고단백 스낵",
        ru: "БЕЛКОВЫЙ СНЕК",
      },
      desc: {
        en: "Crunchy roasted chickpeas with light seasoning. High-protein, high-fiber healthy snack option for international retailers.",
        ar: "حمص محمص مقرمش بتتبيلة خفيفة. خيار صحي غني بالبروتين والألياف لمنافذ البيع بالتجزئة العالمية.",
        zh: "非油炸烘烤轻咸工艺，酥脆可口，富含优质植物蛋白与膳食纤维。",
        ja: "ノンフライで香ばしくロースト。植物性プロテインが豊富でヘルシーなクランチスナック。",
        ko: "기름에 튀기지 않고 구워내어 바삭하고 단백질이 풍부한 웰빙 스낵입니다.",
        ru: "Хрустящий запеченный нут с легкими специями. Источник растительного белка.",
      },
      mainImg: "chickpeas",
      thumbnails: ["chickpeas", "kernels", "rte"],
      specs: [
        {
          label: {
            en: "Origin",
            ar: "المنشأ",
            zh: "产地",
            ja: "産地",
            ko: "원산지",
            ru: "Происхождение",
          },
          value: {
            en: "Hebei, China",
            ar: "خبي، الصين",
            zh: "中国",
            ja: "中国",
            ko: "중국",
            ru: "Китай",
          },
        },
        {
          label: {
            en: "Format",
            ar: "الشكل والمواصفة",
            zh: "产品形态",
            ja: "仕様形態",
            ko: "형태",
            ru: "Формат",
          },
          value: {
            en: "Dry-roasted whole chickpeas",
            ar: "حمص كامل محمص جاف",
            zh: "干烤整粒",
            ja: "ノンフライロースト",
            ko: "로스팅 통병아리콩",
            ru: "Запеченный цельный",
          },
        },
        {
          label: {
            en: "Packaging",
            ar: "خيارات التعبئة",
            zh: "包装形式",
            ja: "包装",
            ko: "포장",
            ru: "Упаковка",
          },
          value: {
            en: "50g / 100g / 250g / Bulk",
            ar: "50جم / 100جم / 250جم / جملة",
            zh: "50g / 100g / 250g / 大宗散装",
            ja: "50g / 100g / 250g / バルク",
            ko: "50g / 100g / 250g / 대용량",
            ru: "50г / 100г / 250г / опт",
          },
        },
        {
          label: {
            en: "Private Label",
            ar: "العلامة الخاصة",
            zh: "自有品牌",
            ja: "OEM・PB",
            ko: "PB 제조",
            ru: "Частная марка",
          },
          value: {
            en: "Available",
            ar: "متاح",
            zh: "支持定制",
            ja: "対応可能",
            ko: "가능",
            ru: "Доступно",
          },
        },
      ],
      overview: {
        en: "Dry-roasted using advanced hot-air technology without excess oil, preserving the natural nutty flavor and providing an energizing crunchy snack.",
        ar: "محمص بالهواء الساخن بدون زيوت إضافية، للحفاظ على النكهة الطبيعية الأصلية وتقديم مقرمشات صحية مغذية.",
        zh: "热风对流烘烤技术加工，少油少盐，香脆不油腻，健身休闲理想选择。",
        ja: "熱風ロースト技術により余分な油を使わずヘルシーに焼き上げました。",
        ko: "열풍 로스팅으로 기름기 없이 담백하고 바삭하게 구워냈습니다.",
        ru: "Приготовлен методом сухого запекания горячим воздухом без лишнего масла.",
      },
      highlights: [
        {
          title: {
            en: "High Plant Protein",
            ar: "بروتين نباتي عالي",
            zh: "优质植物蛋白",
            ja: "植物性プロテイン",
            ko: "식물성 단백질",
            ru: "Растительный белок",
          },
          iconType: "raw",
        },
        {
          title: {
            en: "Non-Fried & Light",
            ar: "غير مقلي وخفيف",
            zh: "非油炸更轻盈",
            ja: "ノンフライ製法",
            ko: "기름에 튀기지 않음",
            ru: "Не обжарен в масле",
          },
          iconType: "organic",
        },
        {
          title: {
            en: "Clean Ingredients",
            ar: "مكونات نقية بسيطة",
            zh: "纯净配料表",
            ja: "シンプル原料",
            ko: "착한 성분",
            ru: "Простой состав",
          },
          iconType: "pure",
        },
        {
          title: {
            en: "Crispy & Ready to Eat",
            ar: "مقرمش وجاهز للأكل",
            zh: "酥脆开袋即享",
            ja: "カリッと香ばしい",
            ko: "바삭한 즉석 스낵",
            ru: "Готово к употреблению",
          },
          iconType: "ready",
        },
      ],
    },
    hawthorn: {
      name: {
        en: "Hawthorn Snacks",
        ar: "منتجات الزعرور",
        zh: "山楂零食",
        ja: "サンザシスナック",
        ko: "산사 스낵",
        ru: "Снеки из боярышника",
      },
      category: {
        en: "Snack Products",
        ar: "منتجات خفيفة",
        zh: "果干蜜饯",
        ja: "スナックシリーズ",
        ko: "스낵 시리즈",
        ru: "Снеки",
      },
      pill: {
        en: "NATURAL TANGY FRUIT",
        ar: "فاكهة طبيعية منعشة",
        zh: "天然酸甜果品",
        ja: "甘酸っぱい果実",
        ko: "상큼한 천연 과일",
        ru: "НАТУРАЛЬНЫЕ ФРУКТЫ",
      },
      desc: {
        en: "Delicious hollowed or sliced hawthorn snacks with a refreshing sweet-tart flavor and digestive benefits.",
        ar: "وجبات خفيفة لذيذة من الزعرور المفرغ أو الشرائح بنكهة حلوة ولاذعة منعشة وفوائد صحية للهضم.",
        zh: "传统去核空心山楂，酸甜开胃，果香浓郁，助消化天然健康果品。",
        ja: "種を抜いた甘酸っぱいサンザシ。食欲をそそる爽やかな味わいと健康メリット。",
        ko: "씨를 제거해 먹기 편하며 새콤달콤한 맛으로 입맛을 돋우는 건강 간식입니다.",
        ru: "Очищенные плоды боярышника с кисло-сладким вкусом для поддержки пищеварения.",
      },
      mainImg: "hawthorn",
      thumbnails: ["hawthorn", "kernels", "rte"],
      specs: [
        {
          label: {
            en: "Origin",
            ar: "المنشأ",
            zh: "产地",
            ja: "产地",
            ko: "원산지",
            ru: "Происхождение",
          },
          value: {
            en: "Hebei, China",
            ar: "خبي، الصين",
            zh: "中国河北",
            ja: "中国・河北省",
            ko: "중국 허베이",
            ru: "Хэбэй, Китай",
          },
        },
        {
          label: {
            en: "Format",
            ar: "الشكل والمواصفة",
            zh: "产品形态",
            ja: "仕様形態",
            ko: "형태",
            ru: "Формат",
          },
          value: {
            en: "Pitted hollow / Roll / Strips",
            ar: "مفرغ من النوى / لفائف / أصابع",
            zh: "去核空心 / 山楂卷 / 条状",
            ja: "種抜き・ロール・スティック",
            ko: "씨 없는 산사",
            ru: "Без косточек / рулетики",
          },
        },
        {
          label: {
            en: "Packaging",
            ar: "خيارات التعبئة",
            zh: "包装形式",
            ja: "包装",
            ko: "포장",
            ru: "Упаковка",
          },
          value: {
            en: "80g / 150g pouch",
            ar: "أكياس 80جم / 150جم",
            zh: "80g / 150g 袋装",
            ja: "80g / 150g パック",
            ko: "80g / 150g 파우치",
            ru: "80г / 150г пакет",
          },
        },
        {
          label: {
            en: "Private Label",
            ar: "العلامة الخاصة",
            zh: "自有品牌",
            ja: "OEM・PB",
            ko: "PB 제조",
            ru: "Частная марка",
          },
          value: {
            en: "Available",
            ar: "متاح",
            zh: "支持定制",
            ja: "対応可能",
            ko: "가능",
            ru: "Доступно",
          },
        },
      ],
      overview: {
        en: "Selected premium mountain hawthorn fruit prepared with strict sanitation and seed-removal processes for an appetizing, clean, and nutritious fruit snack.",
        ar: "ثمار زعرور جبلية منتقاة مجهزة بأعلى معايير النظافة وإزالة البذور لنقدم وجبة فواكه صحية منعشة ومغذية.",
        zh: "精选山楂鲜果，经现代自动化去核与无尘烘干，酸甜适口，肉质饱满。",
        ja: "厳選した山査子を丁寧に種抜き加工。自然な酸味と甘みの絶妙なバランス。",
        ko: "엄선된 고품질 산사를 위생적으로 가공하여 깔끔하고 상큼한 맛을 제공합니다.",
        ru: "Отборный горный боярышник бережной сушки без косточек.",
      },
      highlights: [
        {
          title: {
            en: "Fresh Mountain Fruit",
            ar: "فواكه جبلية طازجة",
            zh: "天然高山鲜果",
            ja: "高山果実",
            ko: "신선한 원과",
            ru: "Горные плоды",
          },
          iconType: "raw",
        },
        {
          title: {
            en: "Pitted & Clean",
            ar: "مفرغ ونظيف تماماً",
            zh: "无籽洁净去核",
            ja: "丁寧な種抜き",
            ko: "씨 제거 가공",
            ru: "Без косточек",
          },
          iconType: "organic",
        },
        {
          title: {
            en: "No Artificial Colors",
            ar: "بدون ألوان صناعية",
            zh: "无人工合成色素",
            ja: "着色料不使用",
            ko: "인공 색소 무첨가",
            ru: "Без красителей",
          },
          iconType: "pure",
        },
        {
          title: {
            en: "Sweet & Tangy Taste",
            ar: "طعم حلو ولاذع منعش",
            zh: "生津开胃酸甜",
            ja: "爽やかな酸味",
            ko: "새콤달콤한 맛",
            ru: "Освежающий вкус",
          },
          iconType: "ready",
        },
      ],
    },
  };

  // Fallback to organic-chestnut-kernels if not found
  const product = productData[normId] || productData["organic-chestnut-kernels"];

  const [activeThumb, setActiveThumb] = useState(0);
  const [activeTab, setActiveTab] = useState<
    "overview" | "specifications" | "packaging" | "quality" | "downloads"
  >("overview");

  const currentImg = product.thumbnails[activeThumb] || product.mainImg;

  const renderHighlightIcon = (type: string) => {
    switch (type) {
      case "raw":
        return (
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Selected Raw Materials: Nut / Harvest on angled stem */}
            <path d="M5 20l4-4" />
            <path d="M10.5 14.5C8 12.5 7 8.5 9.5 5.5s7-1 9.5 1.5 2 7-.5 9.5-6 .5-8-2z" />
            <path d="M10 10.5c2.5-.5 5.5.5 7 2" />
          </svg>
        );
      case "organic":
        return (
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Certified Organic: Double leaf sprout & checkmark */}
            <path d="M12 21a9 9 0 0 0 9-9c0-5-4-8-9-8" />
            <path d="M3 12c0 5 4 9 9 9" />
            <path d="M7 13l3.5 3.5L18 8" />
          </svg>
        );
      case "pure":
        return (
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* No Additives: Square prohibition badge with diagonal slash */}
            <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
            <path d="M4.5 4.5l15 15" />
            <path d="M8.5 15.5c.5-2.5 2.5-4 5-4" />
          </svg>
        );
      case "ready":
      default:
        return (
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Ready to Eat: Standup snack pouch with food badge */}
            <rect x="5.5" y="4" width="13" height="16.5" rx="3" />
            <path d="M9 4v2.5" />
            <path d="M15 4v2.5" />
            <circle cx="12" cy="13" r="2.8" />
            <path d="M12 11.5v3" />
          </svg>
        );
    }
  };

  return (
    <div className="product-detail-page-wrapper">
      {/* Top Half Wrapper: Theme Warm Ivory Background */}
      <div className="product-detail-top-wrapper">
        {/* 1. Breadcrumbs Bar */}
        <div className="product-detail-breadcrumbs-bar">
          <div className="container">
            <nav className="breadcrumbs" aria-label="Breadcrumbs">
              <a href={href()}>{c.home}</a>
              <span className="separator">&gt;</span>
              <a href={href("products")}>{c.products}</a>
              <span className="separator">&gt;</span>
              <span className="crumb-category">{product.category[lang]}</span>
              <span className="separator">&gt;</span>
              <span className="current">{product.name[lang]}</span>
            </nav>
          </div>
        </div>

        {/* 2. Top Product Showcase Section (2-Col Grid) */}
        <section className="product-detail-showcase-section">
          <div className="container">
            <div className="product-detail-top-grid">
            {/* Left: Gallery (Main Image + 3 Thumbnails) */}
            <div className="product-detail-gallery">
              <div className="product-detail-main-img-card">
                <SiteImage
                  name={currentImg}
                  alt={product.name[lang]}
                  priority
                />
              </div>
              <div className="product-detail-thumbnails-row">
                {product.thumbnails.map((thumbName, idx) => (
                  <button
                    key={`${thumbName}-${idx}`}
                    type="button"
                    className={`product-detail-thumb-btn ${activeThumb === idx ? "active" : ""}`}
                    onClick={() => setActiveThumb(idx)}
                    aria-label={`Preview ${idx + 1}`}
                  >
                    <SiteImage name={thumbName} alt="" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Info, Specs Table & Actions */}
            <div className="product-detail-info-col">
              <div className="product-detail-badge-pill">
                {product.pill[lang]}
              </div>

              <h1 className="product-detail-title">{product.name[lang]}</h1>

              <p className="product-detail-short-desc">{product.desc[lang]}</p>

              {/* Specifications Table */}
              <div className="product-detail-specs-table">
                {product.specs.map((item, idx) => (
                  <div key={idx} className="product-spec-row">
                    <span className="product-spec-key">{item.label[lang]}</span>
                    <span className="product-spec-val">{item.value[lang]}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="product-detail-actions-row">
                <a
                  className="btn btn-detail-quote"
                  href={rfq(product.name[lang], "Bulk Supply")}
                >
                  {c.quote}
                  <ArrowRight size={16} className="btn-arrow-icon" />
                </a>

                <a
                  className="btn btn-detail-oem"
                  href={rfq(product.name[lang], "Private Label")}
                >
                  {c.privateLabel}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

      {/* 3. Bottom 5 Tabs & Ivory Container Card matching Mockup 3 */}
      <section className="product-detail-bottom-section">
        <div className="container">
          {/* 5 Tabs Bar */}
          <div className="product-detail-tabs-bar">
            {[
              {
                id: "overview" as const,
                label: lang === "ar" ? "نظرة عامة على المنتج" : "Product Overview",
              },
              {
                id: "specifications" as const,
                label: lang === "ar" ? "المواصفات الفنية" : "Specifications",
              },
              {
                id: "packaging" as const,
                label: lang === "ar" ? "خيارات التعبئة" : "Packaging",
              },
              {
                id: "quality" as const,
                label: lang === "ar" ? "الجودة والشهادات" : "Quality",
              },
              {
                id: "downloads" as const,
                label: lang === "ar" ? "ملفات التنزيل" : "Downloads",
              },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`product-detail-tab-btn ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Ivory Container Card */}
          <div className="product-detail-tab-card">
            {activeTab === "overview" && (
              <div className="product-tab-pane product-tab-overview">
                <h2>
                  {lang === "ar" ? "نظرة عامة على المنتج" : "Product Overview"}
                </h2>
                <p className="product-overview-paragraph">
                  {product.overview[lang]}
                </p>

                {/* 4 Circular Highlight Badges */}
                <div className="product-highlights-4grid">
                  {product.highlights.map((h, i) => (
                    <div key={i} className="product-highlight-card">
                      <div className="product-highlight-circle">
                        {renderHighlightIcon(h.iconType)}
                      </div>
                      <span className="product-highlight-label">
                        {h.title[lang]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="product-tab-pane product-tab-specs">
                <h2>
                  {lang === "ar" ? "المواصفات الفنية المعتمدة" : "Technical Specifications"}
                </h2>
                <p>
                  {lang === "ar"
                    ? "تخضع جميع شحناتنا لاختبارات الجودة الدقيقة لضمان أعلى معايير النقاء وسلامة الغذاء."
                    : "All export batches undergo strict laboratory testing to ensure international compliance and stability."}
                </p>
                <div className="specs-details-grid">
                  <div className="spec-detail-box">
                    <strong>
                      {lang === "ar" ? "المكونات الأساسية" : "Ingredients"}
                    </strong>
                    <span>
                      {lang === "ar"
                        ? "كستناء عضوية نقية 100% (بدون نكهات أو ألوان مضافة)"
                        : "100% Organic Chestnuts (no artificial ingredients)"}
                    </span>
                  </div>
                  <div className="spec-detail-box">
                    <strong>
                      {lang === "ar" ? "طريقة الحفظ والتعقيم" : "Processing Method"}
                    </strong>
                    <span>
                      {lang === "ar"
                        ? "تعقيم حراري عالي بالضغط (Retort Sterilization)"
                        : "High-temperature Retort Sterilization"}
                    </span>
                  </div>
                  <div className="spec-detail-box">
                    <strong>
                      {lang === "ar" ? "مدة الصلاحية" : "Shelf Life"}
                    </strong>
                    <span>
                      {lang === "ar"
                        ? "12 - 18 شهراً في درجة حرارة الغرفة"
                        : "12 - 18 months at room temperature"}
                    </span>
                  </div>
                  <div className="spec-detail-box">
                    <strong>
                      {lang === "ar" ? "ظروف التخزين" : "Storage Conditions"}
                    </strong>
                    <span>
                      {lang === "ar"
                        ? "مكان بارد وجاف، بعيداً عن أشعة الشمس المباشرة"
                        : "Cool and dry place, away from direct sunlight"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "packaging" && (
              <div className="product-tab-pane product-tab-packaging">
                <h2>
                  {lang === "ar" ? "حلول التعبئة والتغليف المخصصة" : "Packaging & OEM Solutions"}
                </h2>
                <p>
                  {lang === "ar"
                    ? "نوفر حلول تغليف مرنة تناسب سلاسل التجزئة وتجار الجملة مع إمكانية طباعة علامتك التجارية بكافة اللغات العالمية."
                    : "Flexible retail and bulk packaging options supporting full OEM artwork, localized languages and custom barcodes."}
                </p>
                <div className="packaging-options-grid">
                  <div className="packaging-opt-card">
                    <Boxes size={28} />
                    <h3>{lang === "ar" ? "أكياس فويل مفرغة" : "Foil Barrier Pouches"}</h3>
                    <p>
                      {lang === "ar"
                        ? "طبقات حماية متعددة مع حقن النيتروجين لحفظ النكهة والرطوبة المثالية."
                        : "Multi-layer barrier pouches with nitrogen flush for maximum freshness."}
                    </p>
                  </div>
                  <div className="packaging-opt-card">
                    <Layers size={28} />
                    <h3>{lang === "ar" ? "صناديق عرض كرتونية" : "Retail Multi-Pack Boxes"}</h3>
                    <p>
                      {lang === "ar"
                        ? "علب عرض فاخرة (Shelf-Ready Packaging) لسهولة التوزيع داخل السوبرماركت."
                        : "Shelf-ready display boxes customized for supermarket retail presentation."}
                    </p>
                  </div>
                  <div className="packaging-opt-card">
                    <Award size={28} />
                    <h3>{lang === "ar" ? "تخصيص العلامة الخاصة" : "Private Label Branding"}</h3>
                    <p>
                      {lang === "ar"
                        ? "تصميم متكامل لعلامتك التجارية مع الباركود واللغة والتوافق القانوني للسوق."
                        : "Complete artwork execution, barcode integration and target market compliance."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "quality" && (
              <div className="product-tab-pane product-tab-quality">
                <h2>
                  {lang === "ar" ? "الجودة والشهادات الدولية" : "Quality Assurance & Standards"}
                </h2>
                <p>
                  {lang === "ar"
                    ? "مصانعنا معتمدة دولياً ومجهزة بأحدث أجهزة الكشف عن المعادن والفرز البصري الدقيق."
                    : "Manufactured in BRCGS, HACCP, ISO 9001 and EU Organic certified facilities."}
                </p>
                <div className="quality-cert-badges-row">
                  {["BRCGS", "HACCP", "ISO 9001", "EU Organic", "Halal"].map(
                    (cert) => (
                      <div key={cert} className="quality-badge-item">
                        <CheckCircle2 size={20} className="check-icon" />
                        <span>{cert}</span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

            {activeTab === "downloads" && (
              <div className="product-tab-pane product-tab-downloads">
                <h2>
                  {lang === "ar" ? "الملفات والوثائق الفنية" : "Specification & Documents"}
                </h2>
                <p>
                  {lang === "ar"
                    ? "قم بتنزيل بطاقة المواصفات الفنية أو ملخص الشهادات لتقييم الشراء لمؤسستك."
                    : "Download official product specification sheets and procurement briefs."}
                </p>
                <div className="downloads-list">
                  <a
                    href={rfq(product.name[lang], "Product Spec Sheet")}
                    className="download-file-row"
                  >
                    <FileText size={24} />
                    <div className="download-file-info">
                      <strong>{product.name[lang]} - Technical Data Sheet</strong>
                      <span>PDF Specification · Export Version</span>
                    </div>
                    <Download size={20} className="download-icon" />
                  </a>
                  <a href={href("quality")} className="download-file-row">
                    <Award size={24} />
                    <div className="download-file-info">
                      <strong>Quality Certifications Summary (BRCGS, Organic, Halal)</strong>
                      <span>Compliance Portfolio</span>
                    </div>
                    <ArrowRight size={20} className="download-icon" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Conversion CTA Banner */}
      <section className="conversion">
        <div className="container conversion-inner">
          <div>
            <span className="eyebrow">GREAT WALL GREEN SOURCE</span>
            <h2>{c.finalTitle}</h2>
            <p>{c.finalBody}</p>
          </div>
          <div className="banner-actions">
            <a className="btn" href={rfq(product.name[lang], "Bulk Supply")}>
              {c.quote}
            </a>
            <a href={href("contact")} className="text-link light">
              {c.contactSales}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
