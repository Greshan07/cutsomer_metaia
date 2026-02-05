// Comprehensive Dress Dataset for METAIA Tailor App
// All images are from Unsplash - free to use

export interface DressImage {
  id: string;
  url: string;
  alt: string;
}

export interface DressType {
  name: string;
  category: string;
  subcategory: 'Top Wear' | 'Bottom Wear' | 'Full Body' | 'Traditional' | 'Formal' | 'Casual';
  images: DressImage[];
  description?: string;
  popularFor?: string[];
}

export interface DressDataset {
  men: DressType[];
  women: DressType[];
  kids: DressType[];
}

export const dressDataset: DressDataset = {
  // ==================== MEN'S COLLECTION ====================
  men: [
    // TOP WEAR
    {
      name: 'Shirt',
      category: 'men',
      subcategory: 'Top Wear',
      description: 'Formal and casual shirts',
      popularFor: ['Office', 'Casual', 'Party'],
      images: [
        { id: 'm-shirt-1', url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600', alt: 'White formal shirt' },
        { id: 'm-shirt-2', url: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600', alt: 'Blue business shirt' },
        { id: 'm-shirt-3', url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600', alt: 'Casual shirt' },
        { id: 'm-shirt-4', url: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600', alt: 'Striped shirt' },
        { id: 'm-shirt-5', url: 'https://images.unsplash.com/photo-1598032895397-b9e5e6e8e1d6?w=600', alt: 'Check pattern shirt' },
        { id: 'm-shirt-6', url: 'https://images.unsplash.com/photo-1639372964829-ef91010c2911?w=600', alt: 'Dress shirt' },
      ]
    },
    {
      name: 'T-Shirt',
      category: 'men',
      subcategory: 'Casual',
      description: 'Comfortable casual t-shirts',
      popularFor: ['Daily wear', 'Gym', 'Casual outings'],
      images: [
        { id: 'm-tshirt-1', url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600', alt: 'Black t-shirt' },
        { id: 'm-tshirt-2', url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600', alt: 'White t-shirt' },
        { id: 'm-tshirt-3', url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600', alt: 'Graphic t-shirt' },
        { id: 'm-tshirt-4', url: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600', alt: 'Colored t-shirt' },
        { id: 'm-tshirt-5', url: 'https://images.unsplash.com/photo-1759596450534-0a960be607e1?w=600', alt: 'Casual t-shirt' },
      ]
    },
    {
      name: 'Kurta',
      category: 'men',
      subcategory: 'Traditional',
      description: 'Traditional Indian kurta',
      popularFor: ['Festivals', 'Weddings', 'Traditional events'],
      images: [
        { id: 'm-kurta-1', url: 'https://images.unsplash.com/photo-1610030469307-01e34c6e67a3?w=600', alt: 'White kurta' },
        { id: 'm-kurta-2', url: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600', alt: 'Embroidered kurta' },
        { id: 'm-kurta-3', url: 'https://images.unsplash.com/photo-1583391733981-1796957d5d33?w=600', alt: 'Festive kurta' },
        { id: 'm-kurta-4', url: 'https://images.unsplash.com/photo-1744551358303-46edae8b374b?w=600', alt: 'Traditional kurta' },
        { id: 'm-kurta-5', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600', alt: 'Designer kurta' },
      ]
    },
    {
      name: 'Jacket',
      category: 'men',
      subcategory: 'Top Wear',
      description: 'Stylish jackets for all occasions',
      popularFor: ['Winter', 'Party', 'Casual'],
      images: [
        { id: 'm-jacket-1', url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600', alt: 'Leather jacket' },
        { id: 'm-jacket-2', url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600', alt: 'Denim jacket' },
        { id: 'm-jacket-3', url: 'https://images.unsplash.com/photo-1766113492895-2d8711c4b126?w=600', alt: 'Formal jacket' },
        { id: 'm-jacket-4', url: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=600', alt: 'Winter jacket' },
      ]
    },
    {
      name: 'Blazer',
      category: 'men',
      subcategory: 'Formal',
      description: 'Professional blazers and suit jackets',
      popularFor: ['Office', 'Meetings', 'Formal events'],
      images: [
        { id: 'm-blazer-1', url: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600', alt: 'Navy blazer' },
        { id: 'm-blazer-2', url: 'https://images.unsplash.com/photo-1598915850252-fb07ad1e6768?w=600', alt: 'Suit jacket' },
        { id: 'm-blazer-3', url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600', alt: 'Grey blazer' },
        { id: 'm-blazer-4', url: 'https://images.unsplash.com/photo-1594938384794-e20a26a89f46?w=600', alt: 'Business blazer' },
      ]
    },
    // BOTTOM WEAR
    {
      name: 'Pants',
      category: 'men',
      subcategory: 'Bottom Wear',
      description: 'Formal and casual trousers',
      popularFor: ['Office', 'Casual', 'Formal'],
      images: [
        { id: 'm-pants-1', url: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600', alt: 'Formal trousers' },
        { id: 'm-pants-2', url: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600', alt: 'Casual pants' },
        { id: 'm-pants-3', url: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=600', alt: 'Dress pants' },
        { id: 'm-pants-4', url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600', alt: 'Chinos' },
      ]
    },
    {
      name: 'Jeans',
      category: 'men',
      subcategory: 'Casual',
      description: 'Denim jeans',
      popularFor: ['Daily wear', 'Casual outings'],
      images: [
        { id: 'm-jeans-1', url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600', alt: 'Blue jeans' },
        { id: 'm-jeans-2', url: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=600', alt: 'Denim jeans' },
        { id: 'm-jeans-3', url: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600', alt: 'Casual jeans' },
        { id: 'm-jeans-4', url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600', alt: 'Dark jeans' },
      ]
    },
    // FULL BODY
    {
      name: 'Suit',
      category: 'men',
      subcategory: 'Formal',
      description: 'Complete formal suits',
      popularFor: ['Weddings', 'Business', 'Formal events'],
      images: [
        { id: 'm-suit-1', url: 'https://images.unsplash.com/photo-1594938384794-e20a26a89f46?w=600', alt: 'Black suit' },
        { id: 'm-suit-2', url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600', alt: 'Business suit' },
        { id: 'm-suit-3', url: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600', alt: 'Wedding suit' },
        { id: 'm-suit-4', url: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600', alt: 'Three piece suit' },
      ]
    },
    {
      name: 'Sherwani',
      category: 'men',
      subcategory: 'Traditional',
      description: 'Traditional wedding attire',
      popularFor: ['Weddings', 'Festivals', 'Special occasions'],
      images: [
        { id: 'm-sherwani-1', url: 'https://images.unsplash.com/photo-1665686308827-eb62e4f6604d?w=600', alt: 'Wedding sherwani' },
        { id: 'm-sherwani-2', url: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=600', alt: 'Embroidered sherwani' },
        { id: 'm-sherwani-3', url: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600', alt: 'Traditional sherwani' },
      ]
    },
  ],

  // ==================== WOMEN'S COLLECTION ====================
  women: [
    // TOP WEAR
    {
      name: 'Blouse',
      category: 'women',
      subcategory: 'Top Wear',
      description: 'Stylish blouses and tops',
      popularFor: ['Office', 'Party', 'Casual'],
      images: [
        { id: 'w-blouse-1', url: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600', alt: 'Elegant blouse' },
        { id: 'w-blouse-2', url: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600', alt: 'Formal blouse' },
        { id: 'w-blouse-3', url: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600', alt: 'Silk blouse' },
        { id: 'w-blouse-4', url: 'https://images.unsplash.com/photo-1578681994506-b8f463449011?w=600', alt: 'Designer blouse' },
      ]
    },
    {
      name: 'Kurti',
      category: 'women',
      subcategory: 'Traditional',
      description: 'Traditional and modern kurtis',
      popularFor: ['Daily wear', 'Office', 'Festivals'],
      images: [
        { id: 'w-kurti-1', url: 'https://images.unsplash.com/photo-1588013273468-315fd88ea34c?w=600', alt: 'Printed kurti' },
        { id: 'w-kurti-2', url: 'https://images.unsplash.com/photo-1612979782992-2f8e20c0c6b3?w=600', alt: 'Designer kurti' },
        { id: 'w-kurti-3', url: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600', alt: 'Ethnic kurti' },
        { id: 'w-kurti-4', url: 'https://images.unsplash.com/photo-1610030469307-01e34c6e67a3?w=600', alt: 'Long kurti' },
        { id: 'w-kurti-5', url: 'https://images.unsplash.com/photo-1583391733981-1796957d5d33?w=600', alt: 'Traditional kurti' },
      ]
    },
    {
      name: 'Saree Blouse',
      category: 'women',
      subcategory: 'Traditional',
      description: 'Blouses for sarees',
      popularFor: ['Weddings', 'Festivals', 'Traditional events'],
      images: [
        { id: 'w-saree-blouse-1', url: 'https://images.unsplash.com/photo-1583391733981-1796957d5d33?w=600', alt: 'Designer saree blouse' },
        { id: 'w-saree-blouse-2', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600', alt: 'Embroidered blouse' },
        { id: 'w-saree-blouse-3', url: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600', alt: 'Traditional blouse' },
        { id: 'w-saree-blouse-4', url: 'https://images.unsplash.com/photo-1610030469307-01e34c6e67a3?w=600', alt: 'Silk saree blouse' },
      ]
    },
    // BOTTOM WEAR
    {
      name: 'Palazzo',
      category: 'women',
      subcategory: 'Bottom Wear',
      description: 'Comfortable palazzo pants',
      popularFor: ['Daily wear', 'Casual', 'Comfort'],
      images: [
        { id: 'w-palazzo-1', url: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=600', alt: 'Palazzo pants' },
        { id: 'w-palazzo-2', url: 'https://images.unsplash.com/photo-1559563458-527698bf5295?w=600', alt: 'Wide leg palazzo' },
        { id: 'w-palazzo-3', url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600', alt: 'Designer palazzo' },
      ]
    },
    {
      name: 'Salwar',
      category: 'women',
      subcategory: 'Traditional',
      description: 'Traditional salwar pants',
      popularFor: ['Daily wear', 'Traditional events'],
      images: [
        { id: 'w-salwar-1', url: 'https://images.unsplash.com/photo-1612979782992-2f8e20c0c6b3?w=600', alt: 'Cotton salwar' },
        { id: 'w-salwar-2', url: 'https://images.unsplash.com/photo-1588013273468-315fd88ea34c?w=600', alt: 'Patiala salwar' },
        { id: 'w-salwar-3', url: 'https://images.unsplash.com/photo-1583391733981-1796957d5d33?w=600', alt: 'Churidar salwar' },
      ]
    },
    // FULL BODY
    {
      name: 'Dress',
      category: 'women',
      subcategory: 'Full Body',
      description: 'Western dresses',
      popularFor: ['Party', 'Casual', 'Office'],
      images: [
        { id: 'w-dress-1', url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600', alt: 'Party dress' },
        { id: 'w-dress-2', url: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600', alt: 'Cocktail dress' },
        { id: 'w-dress-3', url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600', alt: 'Summer dress' },
        { id: 'w-dress-4', url: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600', alt: 'Maxi dress' },
        { id: 'w-dress-5', url: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600', alt: 'Evening dress' },
      ]
    },
    {
      name: 'Lehenga',
      category: 'women',
      subcategory: 'Traditional',
      description: 'Bridal and festive lehengas',
      popularFor: ['Weddings', 'Festivals', 'Special occasions'],
      images: [
        { id: 'w-lehenga-1', url: 'https://images.unsplash.com/photo-1583391733981-1796957d5d33?w=600', alt: 'Bridal lehenga' },
        { id: 'w-lehenga-2', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600', alt: 'Designer lehenga' },
        { id: 'w-lehenga-3', url: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600', alt: 'Embroidered lehenga' },
        { id: 'w-lehenga-4', url: 'https://images.unsplash.com/photo-1610030469307-01e34c6e67a3?w=600', alt: 'Party lehenga' },
      ]
    },
    {
      name: 'Anarkali',
      category: 'women',
      subcategory: 'Traditional',
      description: 'Flowing anarkali suits',
      popularFor: ['Weddings', 'Festivals', 'Traditional events'],
      images: [
        { id: 'w-anarkali-1', url: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600', alt: 'Floor length anarkali' },
        { id: 'w-anarkali-2', url: 'https://images.unsplash.com/photo-1583391733981-1796957d5d33?w=600', alt: 'Designer anarkali' },
        { id: 'w-anarkali-3', url: 'https://images.unsplash.com/photo-1610030469307-01e34c6e67a3?w=600', alt: 'Embroidered anarkali' },
      ]
    },
    {
      name: 'Salwar Kameez',
      category: 'women',
      subcategory: 'Traditional',
      description: 'Complete salwar kameez set',
      popularFor: ['Daily wear', 'Office', 'Traditional events'],
      images: [
        { id: 'w-salwar-kameez-1', url: 'https://images.unsplash.com/photo-1588013273468-315fd88ea34c?w=600', alt: 'Designer salwar kameez' },
        { id: 'w-salwar-kameez-2', url: 'https://images.unsplash.com/photo-1612979782992-2f8e20c0c6b3?w=600', alt: 'Printed salwar kameez' },
        { id: 'w-salwar-kameez-3', url: 'https://images.unsplash.com/photo-1610030469307-01e34c6e67a3?w=600', alt: 'Traditional salwar kameez' },
        { id: 'w-salwar-kameez-4', url: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600', alt: 'Party salwar kameez' },
      ]
    },
    {
      name: 'Gown',
      category: 'women',
      subcategory: 'Formal',
      description: 'Elegant gowns',
      popularFor: ['Parties', 'Weddings', 'Formal events'],
      images: [
        { id: 'w-gown-1', url: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600', alt: 'Evening gown' },
        { id: 'w-gown-2', url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600', alt: 'Party gown' },
        { id: 'w-gown-3', url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600', alt: 'Designer gown' },
      ]
    },
  ],

  // ==================== KIDS COLLECTION ====================
  kids: [
    {
      name: 'T-Shirt',
      category: 'kids',
      subcategory: 'Casual',
      description: 'Comfortable kids t-shirts',
      popularFor: ['Daily wear', 'School', 'Play'],
      images: [
        { id: 'k-tshirt-1', url: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600', alt: 'Kids t-shirt' },
        { id: 'k-tshirt-2', url: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600', alt: 'Cartoon t-shirt' },
        { id: 'k-tshirt-3', url: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600', alt: 'Colorful t-shirt' },
      ]
    },
    {
      name: 'Shirt',
      category: 'kids',
      subcategory: 'Formal',
      description: 'Formal shirts for kids',
      popularFor: ['School', 'Functions', 'Parties'],
      images: [
        { id: 'k-shirt-1', url: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600', alt: 'Kids formal shirt' },
        { id: 'k-shirt-2', url: 'https://images.unsplash.com/photo-1519689373023-dd07c7988603?w=600', alt: 'School shirt' },
        { id: 'k-shirt-3', url: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600', alt: 'Party shirt' },
      ]
    },
    {
      name: 'Dress',
      category: 'kids',
      subcategory: 'Full Body',
      description: 'Girls dresses',
      popularFor: ['Parties', 'Functions', 'Daily wear'],
      images: [
        { id: 'k-dress-1', url: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600', alt: 'Girls party dress' },
        { id: 'k-dress-2', url: 'https://images.unsplash.com/photo-1519689373023-dd07c7988603?w=600', alt: 'Floral dress' },
        { id: 'k-dress-3', url: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600', alt: 'Casual dress' },
        { id: 'k-dress-4', url: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600', alt: 'Summer dress' },
      ]
    },
    {
      name: 'Kurta',
      category: 'kids',
      subcategory: 'Traditional',
      description: 'Traditional kids kurta',
      popularFor: ['Festivals', 'Weddings', 'Traditional events'],
      images: [
        { id: 'k-kurta-1', url: 'https://images.unsplash.com/photo-1597586124394-fbd6ef244026?w=600', alt: 'Kids kurta' },
        { id: 'k-kurta-2', url: 'https://images.unsplash.com/photo-1519689373023-dd07c7988603?w=600', alt: 'Traditional kurta' },
        { id: 'k-kurta-3', url: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600', alt: 'Festival kurta' },
      ]
    },
    {
      name: 'Shorts',
      category: 'kids',
      subcategory: 'Casual',
      description: 'Comfortable shorts',
      popularFor: ['Play', 'Summer', 'Daily wear'],
      images: [
        { id: 'k-shorts-1', url: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600', alt: 'Kids shorts' },
        { id: 'k-shorts-2', url: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600', alt: 'Denim shorts' },
        { id: 'k-shorts-3', url: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600', alt: 'Summer shorts' },
      ]
    },
    {
      name: 'Lehenga Choli',
      category: 'kids',
      subcategory: 'Traditional',
      description: 'Traditional wear for girls',
      popularFor: ['Weddings', 'Festivals', 'Special occasions'],
      images: [
        { id: 'k-lehenga-1', url: 'https://images.unsplash.com/photo-1583391733981-1796957d5d33?w=600', alt: 'Kids lehenga' },
        { id: 'k-lehenga-2', url: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600', alt: 'Designer lehenga' },
        { id: 'k-lehenga-3', url: 'https://images.unsplash.com/photo-1519689373023-dd07c7988603?w=600', alt: 'Party lehenga' },
      ]
    },
  ]
};

// Helper function to get images by category
export const getImagesByCategory = (category: 'men' | 'women' | 'kids') => {
  return dressDataset[category];
};

// Helper function to get images by dress type
export const getImagesByDressType = (category: 'men' | 'women' | 'kids', dressName: string) => {
  const categoryData = dressDataset[category];
  const dressType = categoryData.find(d => d.name.toLowerCase() === dressName.toLowerCase());
  return dressType?.images || [];
};

// Helper function to search dresses
export const searchDresses = (query: string) => {
  const results: DressType[] = [];
  Object.values(dressDataset).forEach(categoryData => {
    categoryData.forEach(dress => {
      if (
        dress.name.toLowerCase().includes(query.toLowerCase()) ||
        dress.description?.toLowerCase().includes(query.toLowerCase()) ||
        dress.subcategory.toLowerCase().includes(query.toLowerCase())
      ) {
        results.push(dress);
      }
    });
  });
  return results;
};

export default dressDataset;
