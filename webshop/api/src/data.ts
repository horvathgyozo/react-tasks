import type { Product } from './types'

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Espresso',
    priceHuf: 890,
    imageUrl:
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80',
    description: 'Rövid, intenzív. 30 ml klasszikus presszó.',
    origin: 'Brazil',
    preparation:
      '18 g őrlemény • 9 bar • 25–30 mp • kb. 30 ml. Melegítsd elő a csészét, és figyeld a lefolyás egyenletességét.',
  },
  {
    id: 'p2',
    name: 'Cappuccino',
    priceHuf: 1290,
    imageUrl:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
    description: 'Presszó + gőzölt tej + tejhab. Krémes és kiegyensúlyozott.',
    origin: 'Colombia',
    preparation:
      '1 presszó • 120–150 ml gőzölt tej • 1–2 cm tejhab. A tej legyen selymes, mikrohabos állagú.',
  },
  {
    id: 'p3',
    name: 'Caffè Latte',
    priceHuf: 1390,
    imageUrl:
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1200&q=80',
    description: 'Selymes tej, lágy kávéalap. Hosszabb, “könnyebb” ital.',
    origin: 'Ethiopia',
    preparation:
      '1 presszó • 200–250 ml gőzölt tej. A hab vékony legyen, inkább “krémes” mint vastag.',
  },
  {
    id: 'p4',
    name: 'Americano',
    priceHuf: 1090,
    imageUrl:
      'https://images.unsplash.com/photo-1521302080334-4bebac2763a6?auto=format&fit=crop&w=1200&q=80',
    description: 'Presszó forró vízzel felöntve. Tiszta, aromás, könnyen iható.',
    origin: 'Guatemala',
    preparation:
      '1–2 presszó • 120–180 ml forró víz. Először a vizet öntsd, majd a presszót (így szebb crema marad).',
  },
  {
    id: 'p5',
    name: 'Mocha',
    priceHuf: 1490,
    imageUrl:
      'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=1200&q=80',
    description: 'Csoki + kávé + tej. Édesebb, desszert jellegű kedvenc.',
    origin: 'Costa Rica',
    preparation:
      '1 presszó • 20–30 g csoki szirup • 150–200 ml gőzölt tej • opcionálisan tejszínhab a tetejére.',
  },
  {
    id: 'p6',
    name: 'Cold Brew',
    priceHuf: 1590,
    imageUrl:
      'https://images.unsplash.com/photo-1507915135761-41a0a222c709?auto=format&fit=crop&w=1200&q=80',
    description: 'Hidegen áztatott kávé, alacsony savasság, frissítő ízprofil.',
    origin: 'Kenya',
    preparation:
      'Durva őrlemény • 1:8 arány • 12–16 óra hűtőben. Szűrés után jéggel, vízzel/tejjel hígítva tálald.',
  },
]

