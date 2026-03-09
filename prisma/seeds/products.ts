// Product dataset for VibeShop Advisor
// Each category has at least 10 products with detailed specifications

export interface Product {
  name: string;
  brand: string;
  category: string;
  price: number;
  specs: Record<string, string | number>;
  battery: number; // hours
  performanceLevel: number; // 1-10
  weight: number; // kg
}

export const products: Product[] = [
  // ============ SMARTPHONES (12 products) ============
  {
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    category: "smartphone",
    price: 1199,
    specs: {
      display: "6.7\" Super Retina XDR",
      processor: "A17 Pro Chip",
      ram: "8GB",
      storage: "256GB",
      camera: "48MP Main + 12MP Ultra Wide",
      os: "iOS 17"
    },
    battery: 29,
    performanceLevel: 10,
    weight: 0.221
  },
  {
    name: "iPhone 15",
    brand: "Apple",
    category: "smartphone",
    price: 799,
    specs: {
      display: "6.1\" Super Retina XDR",
      processor: "A16 Bionic",
      ram: "6GB",
      storage: "128GB",
      camera: "48MP Main + 12MP Ultra Wide",
      os: "iOS 17"
    },
    battery: 26,
    performanceLevel: 9,
    weight: 0.171
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    category: "smartphone",
    price: 1299,
    specs: {
      display: "6.8\" Dynamic AMOLED 2X",
      processor: "Snapdragon 8 Gen 3",
      ram: "12GB",
      storage: "256GB",
      camera: "200MP Main + 50MP Periscope",
      os: "Android 14"
    },
    battery: 27,
    performanceLevel: 10,
    weight: 0.232
  },
  {
    name: "Samsung Galaxy S24",
    brand: "Samsung",
    category: "smartphone",
    price: 799,
    specs: {
      display: "6.2\" Dynamic AMOLED 2X",
      processor: "Exynos 2400",
      ram: "8GB",
      storage: "128GB",
      camera: "50MP Main + 12MP Ultra Wide",
      os: "Android 14"
    },
    battery: 25,
    performanceLevel: 8,
    weight: 0.167
  },
  {
    name: "Google Pixel 8 Pro",
    brand: "Google",
    category: "smartphone",
    price: 999,
    specs: {
      display: "6.7\" LTPO OLED",
      processor: "Tensor G3",
      ram: "12GB",
      storage: "128GB",
      camera: "50MP Main + 48MP Ultra Wide",
      os: "Android 14"
    },
    battery: 24,
    performanceLevel: 9,
    weight: 0.213
  },
  {
    name: "Google Pixel 7a",
    brand: "Google",
    category: "smartphone",
    price: 499,
    specs: {
      display: "6.1\" OLED",
      processor: "Tensor G2",
      ram: "8GB",
      storage: "128GB",
      camera: "64MP Main + 13MP Ultra Wide",
      os: "Android 13"
    },
    battery: 22,
    performanceLevel: 7,
    weight: 0.194
  },
  {
    name: "OnePlus 12",
    brand: "OnePlus",
    category: "smartphone",
    price: 799,
    specs: {
      display: "6.82\" LTPO AMOLED",
      processor: "Snapdragon 8 Gen 3",
      ram: "12GB",
      storage: "256GB",
      camera: "50MP Main + 64MP Periscope",
      os: "Android 14"
    },
    battery: 28,
    performanceLevel: 9,
    weight: 0.220
  },
  {
    name: "OnePlus Nord N30",
    brand: "OnePlus",
    category: "smartphone",
    price: 299,
    specs: {
      display: "6.72\" IPS LCD",
      processor: "Snapdragon 695",
      ram: "8GB",
      storage: "128GB",
      camera: "108MP Main + 2MP Depth",
      os: "Android 13"
    },
    battery: 20,
    performanceLevel: 5,
    weight: 0.195
  },
  {
    name: "Xiaomi 14 Ultra",
    brand: "Xiaomi",
    category: "smartphone",
    price: 1099,
    specs: {
      display: "6.73\" LTPO AMOLED",
      processor: "Snapdragon 8 Gen 3",
      ram: "16GB",
      storage: "512GB",
      camera: "50MP Leica Quad Camera",
      os: "Android 14"
    },
    battery: 25,
    performanceLevel: 10,
    weight: 0.219
  },
  {
    name: "Xiaomi Redmi Note 13 Pro",
    brand: "Xiaomi",
    category: "smartphone",
    price: 299,
    specs: {
      display: "6.67\" AMOLED",
      processor: "MediaTek Dimensity 7200",
      ram: "8GB",
      storage: "256GB",
      camera: "200MP Main + 8MP Ultra Wide",
      os: "Android 13"
    },
    battery: 22,
    performanceLevel: 6,
    weight: 0.187
  },
  {
    name: "Sony Xperia 1 V",
    brand: "Sony",
    category: "smartphone",
    price: 1399,
    specs: {
      display: "6.5\" 4K HDR OLED",
      processor: "Snapdragon 8 Gen 2",
      ram: "12GB",
      storage: "256GB",
      camera: "48MP Main + 12MP Ultra Wide",
      os: "Android 13"
    },
    battery: 22,
    performanceLevel: 9,
    weight: 0.187
  },
  {
    name: "Samsung Galaxy A54",
    brand: "Samsung",
    category: "smartphone",
    price: 449,
    specs: {
      display: "6.4\" Super AMOLED",
      processor: "Exynos 1380",
      ram: "8GB",
      storage: "128GB",
      camera: "50MP Main + 12MP Ultra Wide",
      os: "Android 14"
    },
    battery: 24,
    performanceLevel: 7,
    weight: 0.202
  },

  // ============ LAPTOPS (12 products) ============
  {
    name: "MacBook Pro 16\" M3 Max",
    brand: "Apple",
    category: "laptop",
    price: 3499,
    specs: {
      display: "16.2\" Liquid Retina XDR",
      processor: "Apple M3 Max",
      ram: "36GB Unified",
      storage: "512GB SSD",
      graphics: "40-core GPU",
      os: "macOS Sonoma"
    },
    battery: 22,
    performanceLevel: 10,
    weight: 2.14
  },
  {
    name: "MacBook Air 15\" M3",
    brand: "Apple",
    category: "laptop",
    price: 1299,
    specs: {
      display: "15.3\" Liquid Retina",
      processor: "Apple M3",
      ram: "8GB Unified",
      storage: "256GB SSD",
      graphics: "10-core GPU",
      os: "macOS Sonoma"
    },
    battery: 18,
    performanceLevel: 8,
    weight: 1.51
  },
  {
    name: "MacBook Air 13\" M2",
    brand: "Apple",
    category: "laptop",
    price: 999,
    specs: {
      display: "13.6\" Liquid Retina",
      processor: "Apple M2",
      ram: "8GB Unified",
      storage: "256GB SSD",
      graphics: "8-core GPU",
      os: "macOS Sonoma"
    },
    battery: 18,
    performanceLevel: 8,
    weight: 1.24
  },
  {
    name: "Dell XPS 15",
    brand: "Dell",
    category: "laptop",
    price: 1799,
    specs: {
      display: "15.6\" OLED 3.5K",
      processor: "Intel Core i7-13700H",
      ram: "16GB DDR5",
      storage: "512GB SSD",
      graphics: "NVIDIA RTX 4050",
      os: "Windows 11"
    },
    battery: 13,
    performanceLevel: 9,
    weight: 1.86
  },
  {
    name: "Dell XPS 13 Plus",
    brand: "Dell",
    category: "laptop",
    price: 1299,
    specs: {
      display: "13.4\" OLED 3.5K",
      processor: "Intel Core i7-1360P",
      ram: "16GB LPDDR5",
      storage: "512GB SSD",
      graphics: "Intel Iris Xe",
      os: "Windows 11"
    },
    battery: 12,
    performanceLevel: 8,
    weight: 1.24
  },
  {
    name: "ASUS ROG Zephyrus G16",
    brand: "ASUS",
    category: "laptop",
    price: 2299,
    specs: {
      display: "16\" QHD+ 240Hz",
      processor: "Intel Core i9-14900HX",
      ram: "32GB DDR5",
      storage: "1TB SSD",
      graphics: "NVIDIA RTX 4080",
      os: "Windows 11"
    },
    battery: 10,
    performanceLevel: 10,
    weight: 2.1
  },
  {
    name: "ASUS ZenBook 14",
    brand: "ASUS",
    category: "laptop",
    price: 999,
    specs: {
      display: "14\" OLED 2.8K",
      processor: "Intel Core i7-1360P",
      ram: "16GB LPDDR5",
      storage: "512GB SSD",
      graphics: "Intel Iris Xe",
      os: "Windows 11"
    },
    battery: 15,
    performanceLevel: 7,
    weight: 1.2
  },
  {
    name: "Lenovo ThinkPad X1 Carbon Gen 11",
    brand: "Lenovo",
    category: "laptop",
    price: 1649,
    specs: {
      display: "14\" 2.8K OLED",
      processor: "Intel Core i7-1365U",
      ram: "16GB LPDDR5",
      storage: "512GB SSD",
      graphics: "Intel Iris Xe",
      os: "Windows 11 Pro"
    },
    battery: 15,
    performanceLevel: 8,
    weight: 1.12
  },
  {
    name: "Lenovo Legion Pro 7i",
    brand: "Lenovo",
    category: "laptop",
    price: 2499,
    specs: {
      display: "16\" WQXGA 240Hz",
      processor: "Intel Core i9-14900HX",
      ram: "32GB DDR5",
      storage: "1TB SSD",
      graphics: "NVIDIA RTX 4080",
      os: "Windows 11"
    },
    battery: 8,
    performanceLevel: 10,
    weight: 2.6
  },
  {
    name: "HP Spectre x360 14",
    brand: "HP",
    category: "laptop",
    price: 1499,
    specs: {
      display: "14\" OLED 2.8K Touch",
      processor: "Intel Core i7-1360P",
      ram: "16GB LPDDR5",
      storage: "512GB SSD",
      graphics: "Intel Iris Xe",
      os: "Windows 11"
    },
    battery: 14,
    performanceLevel: 8,
    weight: 1.36
  },
  {
    name: "Razer Blade 15",
    brand: "Razer",
    category: "laptop",
    price: 2799,
    specs: {
      display: "15.6\" QHD 240Hz",
      processor: "Intel Core i9-14900HX",
      ram: "32GB DDR5",
      storage: "1TB SSD",
      graphics: "NVIDIA RTX 4080",
      os: "Windows 11"
    },
    battery: 6,
    performanceLevel: 10,
    weight: 2.01
  },
  {
    name: "Microsoft Surface Laptop 5",
    brand: "Microsoft",
    category: "laptop",
    price: 999,
    specs: {
      display: "13.5\" PixelSense",
      processor: "Intel Core i7-1255U",
      ram: "16GB DDR4",
      storage: "256GB SSD",
      graphics: "Intel Iris Xe",
      os: "Windows 11"
    },
    battery: 13,
    performanceLevel: 7,
    weight: 1.27
  },

  // ============ GAMING GEAR (12 products) ============
  {
    name: "PlayStation 5",
    brand: "Sony",
    category: "gaming",
    price: 499,
    specs: {
      processor: "AMD Zen 2 8-core",
      graphics: "AMD RDNA 2 10.28 TFLOPS",
      storage: "825GB SSD",
      resolution: "4K@120Hz",
      features: "Ray Tracing, Tempest 3D Audio"
    },
    battery: 0,
    performanceLevel: 10,
    weight: 4.5
  },
  {
    name: "Xbox Series X",
    brand: "Microsoft",
    category: "gaming",
    price: 499,
    specs: {
      processor: "AMD Zen 2 8-core",
      graphics: "AMD RDNA 2 12 TFLOPS",
      storage: "1TB SSD",
      resolution: "4K@120Hz",
      features: "Quick Resume, Game Pass"
    },
    battery: 0,
    performanceLevel: 10,
    weight: 4.45
  },
  {
    name: "Nintendo Switch OLED",
    brand: "Nintendo",
    category: "gaming",
    price: 349,
    specs: {
      display: "7\" OLED Touch",
      processor: "NVIDIA Tegra X1",
      storage: "64GB",
      resolution: "1080p (Docked)",
      features: "Portable, Joy-Con Controllers"
    },
    battery: 9,
    performanceLevel: 6,
    weight: 0.42
  },
  {
    name: "Steam Deck OLED",
    brand: "Valve",
    category: "gaming",
    price: 549,
    specs: {
      display: "7.4\" OLED HDR",
      processor: "AMD Zen 2 APU",
      storage: "512GB SSD",
      resolution: "1280x800",
      features: "Steam OS, Portable PC Gaming"
    },
    battery: 8,
    performanceLevel: 8,
    weight: 0.67
  },
  {
    name: "ASUS ROG Ally",
    brand: "ASUS",
    category: "gaming",
    price: 699,
    specs: {
      display: "7\" 1080p 120Hz",
      processor: "AMD Ryzen Z1 Extreme",
      storage: "512GB SSD",
      resolution: "1920x1080",
      features: "Windows 11, Handheld"
    },
    battery: 6,
    performanceLevel: 9,
    weight: 0.61
  },
  {
    name: "Logitech G Pro X Superlight 2",
    brand: "Logitech",
    category: "gaming",
    price: 159,
    specs: {
      sensor: "HERO 25K",
      dpi: "25600",
      weight: "60g",
      connectivity: "LIGHTSPEED Wireless",
      battery: "95 hours"
    },
    battery: 95,
    performanceLevel: 10,
    weight: 0.06
  },
  {
    name: "Razer DeathAdder V3 Pro",
    brand: "Razer",
    category: "gaming",
    price: 149,
    specs: {
      sensor: "Focus Pro 30K",
      dpi: "30000",
      weight: "63g",
      connectivity: "Razer HyperSpeed",
      battery: "90 hours"
    },
    battery: 90,
    performanceLevel: 10,
    weight: 0.063
  },
  {
    name: "SteelSeries Arctis Nova Pro Wireless",
    brand: "SteelSeries",
    category: "gaming",
    price: 349,
    specs: {
      drivers: "40mm Neodymium",
      surround: "360° Spatial Audio",
      connectivity: "2.4GHz + Bluetooth",
      battery: "36 hours",
      features: "ANC, Hot-swap batteries"
    },
    battery: 36,
    performanceLevel: 10,
    weight: 0.33
  },
  {
    name: "Logitech G915 TKL",
    brand: "Logitech",
    category: "gaming",
    price: 229,
    specs: {
      switches: "GL Low Profile",
      layout: "Tenkeyless",
      connectivity: "LIGHTSPEED + Bluetooth",
      rgb: "16.8M Colors",
      battery: "40 hours (RGB on)"
    },
    battery: 40,
    performanceLevel: 9,
    weight: 0.81
  },
  {
    name: "Razer BlackWidow V4 Pro",
    brand: "Razer",
    category: "gaming",
    price: 229,
    specs: {
      switches: "Razer Green Mechanical",
      layout: "Full Size",
      connectivity: "Wired USB",
      rgb: "Razer Chroma",
      features: "Wrist Rest, Macro Keys"
    },
    battery: 0,
    performanceLevel: 9,
    weight: 1.5
  },
  {
    name: "Xbox Elite Controller Series 2",
    brand: "Microsoft",
    category: "gaming",
    price: 179,
    specs: {
      triggers: "Hair Trigger Locks",
      sticks: "Interchangeable",
      paddles: "6 Remappable",
      connectivity: "USB-C + Wireless",
      battery: "40 hours"
    },
    battery: 40,
    performanceLevel: 10,
    weight: 0.34
  },
  {
    name: "PlayStation DualSense Edge",
    brand: "Sony",
    category: "gaming",
    price: 199,
    specs: {
      triggers: "Adjustable Trigger Length",
      sticks: "Interchangeable Modules",
      paddles: "2 Remappable",
      connectivity: "USB-C + Bluetooth",
      features: "Haptic Feedback, Adaptive Triggers"
    },
    battery: 8,
    performanceLevel: 9,
    weight: 0.32
  }
];

export default products;
