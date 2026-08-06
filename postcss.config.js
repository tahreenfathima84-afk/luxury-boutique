export type Category =
  | 'Bridal Collection'
  | 'Designer Sarees'
  | 'Luxury Lehengas'
  | 'Premium Gowns'
  | 'Party Wear'
  | 'Cocktail Dresses'
  | 'Abayas'
  | 'Premium Hijabs'
  | 'Indo-Western'
  | 'Luxury Kurtis'
  | 'Co-ord Sets'
  | 'Handbags'
  | 'Luxury Jewellery'
  | 'Footwear'
  | 'Luxury Accessories';

export type Occasion =
  | 'Bridal'
  | 'Wedding'
  | 'Reception'
  | 'Cocktail'
  | 'Party'
  | 'Festive'
  | 'Everyday'
  | 'Formal'
  | 'Modest';

export interface Review {
  name: string;
  rating: number;
  date: string;
  text: string;
  avatar: string;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  originalPrice?: number;
  image: string;
  gallery: string[];
  colours: { name: string; hex: string }[];
  sizes: string[];
  fabric: string;
  occasion: Occasion;
  collection: string;
  description: string;
  fabricDetails: string;
  care: string[];
  trending?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
  limitedEdition?: boolean;
  reviews: Review[];
  rating: number;
  reviewCount: number;
}

export interface Collection {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  count: number;
}

export const collections: Collection[] = [
  {
    id: 'bridal',
    name: 'Bridal Collection',
    tagline: 'Vows in couture',
    description: 'Heirloom bridalwear hand-embroidered over hundreds of hours.',
    image: 'https://images.pexels.com/photos/27269998/pexels-photo-27269998.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
    count: 48,
  },
  {
    id: 'sarees',
    name: 'Designer Sarees',
    tagline: 'Six yards of poetry',
    description: 'Silks and organzas woven by master artisans across India.',
    image: 'https://images.pexels.com/photos/34058551/pexels-photo-34058551.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
    count: 62,
  },
  {
    id: 'lehengas',
    name: 'Designer Lehengas',
    tagline: 'The celebration skirt',
    description: 'Hand-worked lehengas for the bride, the bridesmaid, the muse.',
    image: 'https://images.pexels.com/photos/12959396/pexels-photo-12959396.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
    count: 54,
  },
  {
    id: 'abayas',
    name: 'Abayas',
    tagline: 'Modest, magnificent',
    description: 'Flowing silhouettes in deep, considered tones.',
    image: 'https://images.pexels.com/photos/32178223/pexels-photo-32178223.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
    count: 36,
  },
  {
    id: 'hijabs',
    name: 'Luxury Hijabs',
    tagline: 'The graceful drape',
    description: 'Buttery silks and chiffons in a curated, seasonal palette.',
    image: 'https://images.pexels.com/photos/35344026/pexels-photo-35344026.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
    count: 28,
  },
  {
    id: 'party',
    name: 'Party Wear',
    tagline: 'After-dark elegance',
    description: 'Statement pieces for the season of soirees.',
    image: 'https://images.pexels.com/photos/34952212/pexels-photo-34952212.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
    count: 41,
  },
  {
    id: 'accessories',
    name: 'Accessories',
    tagline: 'The finishing touch',
    description: 'Jewellery, handbags and footwear to complete the look.',
    image: 'https://images.pexels.com/photos/17833830/pexels-photo-17833830.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
    count: 73,
  },
  {
    id: 'limited',
    name: 'Limited Edition',
    tagline: 'Once made, never repeated',
    description: 'Numbered editions for the discerning collector.',
    image: 'https://images.pexels.com/photos/20177238/pexels-photo-20177238.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
    count: 12,
  },
];

const r = (name: string, rating: number, date: string, text: string, avatar: string): Review => ({
  name, rating, date, text, avatar,
});

const avatars = [
  'https://images.pexels.com/photos/38707525/pexels-photo-38707525.jpeg?auto=compress&cs=tinysrgb&h=120&w=120',
  'https://images.pexels.com/photos/325865/pexels-photo-325865.jpeg?auto=compress&cs=tinysrgb&h=120&w=120',
  'https://images.pexels.com/photos/1820575/pexels-photo-1820575.jpeg?auto=compress&cs=tinysrgb&h=120&w=120',
  'https://images.pexels.com/photos/10426587/pexels-photo-10426587.jpeg?auto=compress&cs=tinysrgb&h=120&w=120',
  'https://images.pexels.com/photos/6497112/pexels-photo-6497112.jpeg?auto=compress&cs=tinysrgb&h=120&w=120',
  'https://images.pexels.com/photos/751235/pexels-photo-751235.jpeg?auto=compress&cs=tinysrgb&h=120&w=120',
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Aurelia Bridal Gown',
    category: 'Bridal Collection',
    price: 248000,
    originalPrice: 285000,
    image: 'https://images.pexels.com/photos/27269998/pexels-photo-27269998.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
    gallery: [
      'https://images.pexels.com/photos/27269998/pexels-photo-27269998.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
      'https://images.pexels.com/photos/9004584/pexels-photo-9004584.png?auto=compress&cs=tinysrgb&h=900&w=640',
      'https://images.pexels.com/photos/10050389/pexels-photo-10050389.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
    ],
    colours: [
      { name: 'Ivory', hex: '#f4ecdd' },
      { name: 'Champagne', hex: '#c5a572' },
      { name: 'Blush', hex: '#e8c9c9' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    fabric: 'Hand-embroidered French lace over raw silk',
    occasion: 'Bridal',
    collection: 'The Élise Bridal Series',
    description: 'A couture bridal gown shaped by three hundred hours of hand-embroidery, with a cathedral train and a sculpted silk lining that moves like water.',
    fabricDetails: 'Pure French Chantilly lace layered over raw silk habotai; glass beads and freshwater pearls applied by hand.',
    care: ['Professional dry clean only', 'Store in breathable garment bag', 'Avoid prolonged sunlight'],
    bestSeller: true,
    trending: true,
    limitedEdition: true,
    rating: 5,
    reviewCount: 47,
    reviews: [
      r('Ananya Mehra', 5, '2025-11-02', 'The embroidery took my breath away. Every pearl was placed with intention. I felt like a painting come to life.', avatars[0]),
      r('Priya Nair', 5, '2025-10-18', 'Worth every rupee. The fit was couture-perfect after the in-store styling appointment.', avatars[1]),
      r('Sara Khan', 5, '2025-09-30', 'Photographs do not do justice. The train is theatrical and the lace is impossibly soft.', avatars[2]),
    ],
  },
  {
    id: 'p2',
    name: 'Noor Embroidered Abaya',
    category: 'Abayas',
    price: 38500,
    image: 'https://images.pexels.com/photos/32178223/pexels-photo-32178223.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
    gallery: [
      'https://images.pexels.com/photos/32178223/pexels-photo-32178223.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
      'https://images.pexels.com/photos/35150034/pexels-photo-35150034.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
      'https://images.pexels.com/photos/35150035/pexels-photo-35150035.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
    ],
    colours: [
      { name: 'Onyx', hex: '#1a1714' },
      { name: 'Emerald', hex: '#0b5d4b' },
      { name: 'Midnight', hex: '#073d31' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Crepe with hand-couched gold thread',
    occasion: 'Modest',
    collection: 'Noor Modest Line',
    description: 'A fluid abaya with tone-on-tone gold embroidery traced along the cuffs and placket, designed to fall in a single graceful line.',
    fabricDetails: 'Heavyweight matte crepe with a sandwashed finish; gold metallic thread couched by hand.',
    care: ['Dry clean only', 'Iron on reverse with low heat', 'Hang on padded hanger'],
    newArrival: true,
    trending: true,
    rating: 4.8,
    reviewCount: 23,
    reviews: [
      r('Layla Rahman', 5, '2025-12-04', 'The drape is regal. The gold detail is subtle in person, which I loved.', avatars[3]),
      r('Yasmin Ali', 4, '2025-11-21', 'Beautiful fabric — runs slightly long, perfect if you are tall.', avatars[4]),
    ],
  },
  {
    id: 'p3',
    name: 'Meera Banarasi Saree',
    category: 'Designer Sarees',
    price: 64000,
    originalPrice: 72000,
    image: 'https://images.pexels.com/photos/34058551/pexels-photo-34058551.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
    gallery: [
      'https://images.pexels.com/photos/34058551/pexels-photo-34058551.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
      'https://images.pexels.com/photos/7176438/pexels-photo-7176438.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
      'https://images.pexels.com/photos/34210956/pexels-photo-34210956.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
    ],
    colours: [
      { name: 'Ruby', hex: '#9b1c2e' },
      { name: 'Emerald', hex: '#0b5d4b' },
      { name: 'Saffron', hex: '#c98b3a' },
    ],
    sizes: ['Free Size'],
    fabric: 'Pure Banarasi silk with real zari',
    occasion: 'Wedding',
    collection: 'The Heritage Silk Edit',
    description: 'A woven-in-Benaras silk saree with a gold zari pallu, finished with a hand-stitched fall and tassels.',
    fabricDetails: 'Pure mulberry silk woven on handlooms; real gold-tone zari brocade pallu.',
    care: ['Dry clean only', 'Wrap in muslin for storage', 'Refold every few months to prevent zari creasing'],
    bestSeller: true,
    rating: 4.9,
    reviewCount: 58,
    reviews: [
      r('Divya Sharma', 5, '2025-12-10', 'The zari catches light like nothing I own. A true heirloom piece.', avatars[5]),
      r('Meera Iyer', 5, '2025-11-15', 'The fall and finish are impeccable. Drapes beautifully.', avatars[0]),
      r('Kavya Reddy', 5, '2025-10-28', 'Gifted this to my mother and she nearly cried. The silk is sumptuous.', avatars[1]),
    ],
  },
  {
    id: 'p4',
    name: 'Saanjh Ruby Lehenga',
    category: 'Luxury Lehengas',
    price: 156000,
    image: 'https://images.pexels.com/photos/12959396/pexels-photo-12959396.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
    gallery: [
      'https://images.pexels.com/photos/12959396/pexels-photo-12959396.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
      'https://images.pexels.com/photos/33101418/pexels-photo-33101418.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
      'https://images.pexels.com/photos/37396069/pexels-photo-37396069.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
    ],
    colours: [
      { name: 'Ruby', hex: '#9b1c2e' },
      { name: 'Wine', hex: '#7d1625' },
      { name: 'Ivory', hex: '#f4ecdd' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    fabric: 'Raw silk with sequin and dabka embroidery',
    occasion: 'Reception',
    collection: 'Saanjh Celebration Series',
    description: 'A reception lehenga in deep ruby, hand-embroidered with dabka, sequins and mirror work across a sculpted blouse and flowing skirt.',
    fabricDetails: 'Raw silk blouse and skirt; gold dabka, cut-dana and mirror hand embroidery.',
    care: ['Dry clean only', 'Store flat with tissue between layers', 'Avoid contact with perfume'],
    bestSeller: true,
    trending: true,
    rating: 5,
    reviewCount: 34,
    reviews: [
      r('Rhea Kapoor', 5, '2025-12-01', 'The mirror work glows under evening light. Got endless compliments.', avatars[2]),
      r('Ishita Gupta', 5, '2025-11-08', 'Heavy in the best way — feels like real occasion wear, not costume.', avatars[3]),
    ],
  },
  {
    id: 'p5',
    name: 'Aurora Champagne Gown',
    category: 'Premium Gowns',
    price: 89000,
    image: 'https://images.pexels.com/photos/34952212/pexels-photo-34952212.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
    gallery: [
      'https://images.pexels.com/photos/34952212/pexels-photo-34952212.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
      'https://images.pexels.com/photos/37015073/pexels-photo-37015073.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
      'https://images.pexels.com/photos/33417641/pexels-photo-33417641.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
    ],
    colours: [
      { name: 'Champagne', hex: '#c5a572' },
      { name: 'Blush', hex: '#e8c9c9' },
      { name: 'Onyx', hex: '#1a1714' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    fabric: 'Liquid satin with a cowl back',
    occasion: 'Cocktail',
    collection: 'The Evening Edit',
    description: 'A floor-skimming gown in champagne satin with a sculpted cowl back and a thigh-high slit that moves with you.',
    fabricDetails: 'Heavyweight stretch satin; concealed boned bodice; hand-rolled hem.',
    care: ['Dry clean only', 'Store hung', 'Avoid jewellery snags on satin'],
    newArrival: true,
    rating: 4.7,
    reviewCount: 19,
    reviews: [
      r('Naina Sethi', 5, '2025-12-12', 'The satin is genuinely liquid. The cowl back is the star of the gown.', avatars[4]),
      r('Tara Malhotra', 4, '2025-11-25', 'Stunning fit. Size down if between sizes — the satin is generous.', avatars[5]),
    ],
  },
  {
    id: 'p6',
    name: 'Velvet Noir Cocktail Dress',
    category: 'Cocktail Dresses',
    price: 42000,
    image: 'https://images.pexels.com/photos/14801162/pexels-photo-14801162.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
    gallery: [
      'https://images.pexels.com/photos/14801162/pexels-photo-14801162.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
      'https://images.pexels.com/photos/30691550/pexels-photo-30691550.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
      'https://images.pexels.com/photos/19397648/pexels-photo-19397648.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
    ],
    colours: [
      { name: 'Onyx', hex: '#1a1714' },
      { name: 'Ruby', hex: '#9b1c2e' },
      { name: 'Emerald', hex: '#0b5d4b' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    fabric: 'Silk velvet with a sequin underlay',
    occasion: 'Cocktail',
    collection: 'After Dark',
    description: 'A body-skimming velvet cocktail dress that catches the light from every angle, with a subtle slit and a jewel neckline.',
    fabricDetails: 'Silk velvet over a sequined mesh base for quiet shimmer.',
    care: ['Dry clean only', 'Store hung in garment bag', 'Steam gently to refresh pile'],
    trending: true,
    rating: 4.8,
    reviewCount: 27,
    reviews: [
      r('Aisha Bhat', 5, '2025-12-06', 'The velvet has a sheen that reads expensive. My new go-to for gallery openings.', avatars[0]),
    ],
  },
  {
    id: 'p7',
    name: 'Élise Pearl Handbag',
    category: 'Handbags',
    price: 28000,
    image: 'https://images.pexels.com/photos/31929486/pexels-photo-31929486.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
    gallery: [
      'https://images.pexels.com/photos/31929486/pexels-photo-31929486.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
      'https://images.pexels.com/photos/8989582/pexels-photo-8989582.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
      'https://images.pexels.com/photos/22432991/pexels-photo-22432991.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
    ],
    colours: [
      { name: 'Pearl', hex: '#f2ece1' },
      { name: 'Champagne', hex: '#c5a572' },
      { name: 'Onyx', hex: '#1a1714' },
    ],
    sizes: ['One Size'],
    fabric: 'Pebbled leather with gold chain',
    occasion: 'Formal',
    collection: 'The Accessory Atelier',
    description: 'A structured top-handle bag in pearl leather with a removable gold chain, sized for an evening out.',
    fabricDetails: 'Full-grain pebbled leather; gold-tone hardware; suede-lined interior.',
    care: ['Stuff with tissue when storing', 'Keep away from water', 'Polish hardware with soft cloth'],
    newArrival: true,
    rating: 4.6,
    reviewCount: 41,
    reviews: [
      r('Zara Qureshi', 5, '2025-12-08', 'The chain is heavy in a luxe way. Holds a phone, lipstick and cards.', avatars[1]),
      r('Riya Anand', 4, '2025-11-19', 'Gorgeous — the white leather marks a little easily, keep the dust bag.', avatars[2]),
    ],
  },
  {
    id: 'p8',
    name: 'Maharani Polki Necklace',
    category: 'Luxury Jewellery',
    price: 96000,
    originalPrice: 110000,
    image: 'https://images.pexels.com/photos/17833830/pexels-photo-17833830.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
    gallery: [
      'https://images.pexels.com/photos/17833830/pexels-photo-17833830.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
      'https://images.pexels.com/photos/32797482/pexels-photo-32797482.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
      'https://images.pexels.com/photos/4889719/pexels-photo-4889719.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
    ],
    colours: [
      { name: 'Gold', hex: '#c5a572' },
    ],
    sizes: ['Adjustable'],
    fabric: '22k gold-plated brass with uncut polki',
    occasion: 'Wedding',
    collection: 'The Heirloom Jewels',
    description: 'A cascading polki necklace inspired by Mughal miniature paintings, with a gold-plated setting and adjustable dori.',
    fabricDetails: '22k gold plating over brass; uncut polki stones; silk cord closure.',
    care: ['Wipe with soft dry cloth', 'Store in anti-tarnish pouch', 'Avoid contact with water and perfume'],
    bestSeller: true,
    limitedEdition: true,
    rating: 5,
    reviewCount: 15,
    reviews: [
      r('Pooja Agarwal', 5, '2025-11-30', 'Wore it for my reception and it stole the show. Looks far more expensive than it is.', avatars[3]),
    ],
  },
  {
    id: 'p9',
    name: 'Stiletto Rouge Heels',
    category: 'Footwear',
    price: 24500,
    image: 'https://images.pexels.com/photos/5713781/pexels-photo-5713781.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
    gallery: [
      'https://images.pexels.com/photos/5713781/pexels-photo-5713781.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
      'https://images.pexels.com/photos/13862209/pexels-photo-13862209.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
      'https://images.pexels.com/photos/28821783/pexels-photo-28821783.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
    ],
    colours: [
      { name: 'Ruby', hex: '#9b1c2e' },
      { name: 'Onyx', hex: '#1a1714' },
      { name: 'Champagne', hex: '#c5a572' },
    ],
    sizes: ['36', '37', '38', '39', '40', '41'],
    fabric: 'Patent leather stiletto, 95mm',
    occasion: 'Party',
    collection: 'The Accessory Atelier',
    description: 'A 95mm patent stiletto with a razor-thin heel and a pointed toe, finished with a discreet gold sole plaque.',
    fabricDetails: 'Glossed patent leather upper; leather sole; padded leather footbed.',
    care: ['Use a soft damp cloth', 'Store with shoe trees', 'Resole at a cobbler as needed'],
    trending: true,
    rating: 4.5,
    reviewCount: 33,
    reviews: [
      r('Neha Joshi', 4, '2025-12-02', 'Beautiful and surprisingly stable for the heel height.', avatars[4]),
    ],
  },
  {
    id: 'p10',
    name: 'Sehr Indo-Western Co-ord Set',
    category: 'Indo-Western',
    price: 36000,
    image: 'https://images.pexels.com/photos/38264826/pexels-photo-38264826.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
    gallery: [
      'https://images.pexels.com/photos/38264826/pexels-photo-38264826.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
      'https://images.pexels.com/photos/35730946/pexels-photo-35730946.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
      'https://images.pexels.com/photos/20227845/pexels-photo-20227845.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
    ],
    colours: [
      { name: 'Onyx', hex: '#1a1714' },
      { name: 'Beige', hex: '#e8dfd0' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    fabric: 'Satin blazer with wide-leg trousers',
    occasion: 'Festive',
    collection: 'Indo-Modern',
    description: 'A tailored satin blazer paired with fluid wide-leg trousers, finished with tonal beadwork along the lapel.',
    fabricDetails: 'Stretch satin blazer; crepe wide-leg trousers; bead-embellished lapel.',
    care: ['Dry clean only', 'Hang trousers to avoid creasing', 'Store blazer on a padded hanger'],
    newArrival: true,
    rating: 4.7,
    reviewCount: 12,
    reviews: [
      r('Aditi Rao', 5, '2025-12-09', 'The cut is sharp and modern. Wore it to a sangeet and felt powerful.', avatars[5]),
    ],
  },
  {
    id: 'p11',
    name: 'Roshni Chikankari Kurti',
    category: 'Luxury Kurtis',
    price: 18500,
    image: 'https://images.pexels.com/photos/28512787/pexels-photo-28512787.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
    gallery: [
      'https://images.pexels.com/photos/28512787/pexels-photo-28512787.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
      'https://images.pexels.com/photos/8770996/pexels-photo-8770996.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
      'https://images.pexels.com/photos/13178920/pexels-photo-13178920.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
    ],
    colours: [
      { name: 'Pistachio', hex: '#9bc28a' },
      { name: 'Ivory', hex: '#f4ecdd' },
      { name: 'Sky', hex: '#9fc4d8' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    fabric: 'Lucknowi chikankari on mulmul cotton',
    occasion: 'Everyday',
    collection: 'Everyday Élise',
    description: 'A breezy chikankari kurti in mulmul, hand-embroidered in Lucknow with traditional shadow-work motifs.',
    fabricDetails: 'Fine mulmul cotton; hand chikankari embroidery; wooden button placket.',
    care: ['Hand wash cold', 'Dry in shade', 'Iron while slightly damp'],
    bestSeller: true,
    rating: 4.8,
    reviewCount: 64,
    reviews: [
      r('Shreya Bansal', 5, '2025-12-11', 'So light and breathable. The chikankari is genuinely hand-done, you can feel it.', avatars[0]),
      r('Kiran Mathur', 5, '2025-11-22', 'Bought three colours. My everyday uniform now.', avatars[1]),
    ],
  },
  {
    id: 'p12',
    name: 'Étoile Silk Hijab',
    category: 'Premium Hijabs',
    price: 8200,
    image: 'https://images.pexels.com/photos/35344026/pexels-photo-35344026.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
    gallery: [
      'https://images.pexels.com/photos/35344026/pexels-photo-35344026.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
      'https://images.pexels.com/photos/35263643/pexels-photo-35263643.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
      'https://images.pexels.com/photos/29273204/pexels-photo-29273204.jpeg?auto=compress&cs=tinysrgb&h=900&w=640',
    ],
    colours: [
      { name: 'Champagne', hex: '#c5a572' },
      { name: 'Emerald', hex: '#0b5d4b' },
      { name: 'Onyx', hex: '#1a1714' },
      { name: 'Blush', hex: '#e8c9c9' },
    ],
    sizes: ['One Size'],
    fabric: 'Pure mulberry silk, 180gsm',
    occasion: 'Everyday',
    collection: 'Noor Modest Line',
    description: 'A buttery silk hijab with a soft, non-slip finish and a hand-rolled edge, sized to drape generously.',
    fabricDetails: '180gsm mulberry silk with matte finish; hand-rolled hem.',
    care: ['Hand wash with silk detergent', 'Air dry away from heat', 'Iron on silk setting'],
    newArrival: true,
    rating: 4.9,
    reviewCount: 38,
    reviews: [
      r('Hana Yusuf', 5, '2025-12-05', 'The silk is so soft and does not slip. The champagne colour is gorgeous.', avatars[2]),
    ],
  },
];

export const allCategories: Category[] = [
  'Bridal Collection', 'Designer Sarees', 'Luxury Lehengas', 'Premium Gowns',
  'Party Wear', 'Cocktail Dresses', 'Abayas', 'Premium Hijabs',
  'Indo-Western', 'Luxury Kurtis', 'Co-ord Sets', 'Handbags',
  'Luxury Jewellery', 'Footwear', 'Luxury Accessories',
];

export const allColours = [
  { name: 'Ivory', hex: '#f4ecdd' },
  { name: 'Champagne', hex: '#c5a572' },
  { name: 'Ruby', hex: '#9b1c2e' },
  { name: 'Emerald', hex: '#0b5d4b' },
  { name: 'Onyx', hex: '#1a1714' },
  { name: 'Blush', hex: '#e8c9c9' },
  { name: 'Beige', hex: '#e8dfd0' },
];

export const allFabrics = [
  'Silk', 'Velvet', 'Cotton', 'Satin', 'Lace', 'Leather', 'Crepe',
];

export const allOccasions: Occasion[] = [
  'Bridal', 'Wedding', 'Reception', 'Cocktail', 'Party', 'Festive', 'Everyday', 'Formal', 'Modest',
];

export const formatINR = (n: number) =>
  '₹' + n.toLocaleString('en-IN');
