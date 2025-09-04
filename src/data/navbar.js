// Navbar navigation links
export const navLinks = [
  'Home', 
  'Kitchen', 
  'Wardrobe', 
  'Products', 
  'Gallery', 
  'About'
];

// Mega menu dropdown data
export const menuData = {
  'Wardrobe': [
    { 
      id: 1, 
      title: 'Classical Wardrobes', 
      image: '/images/wardrobe-1.jpg', 
      href: '/wardrobe/walk-in',
      description: 'Explore our premium classical wardrobes collection'
    },
    { 
      id: 2, 
      title: 'Modern Wardrobes', 
      image: '/images/wardrobe-2.jpg', 
      href: '/wardrobe/sliding',
      description: 'Explore our premium modern wardrobes collection'
    },
    { 
      id: 3, 
      title: 'Neo-Classical Wardrobes', 
      image: '/images/wardrobe-3.jpg', 
      href: '/wardrobe/hinged',
      description: 'Explore our premium neo-classical wardrobes collection'
    },
  ],
  'Kitchen': [
    { 
      id: 1, 
      title: 'Modular Kitchen', 
      image: '/images/kitchen-1.jpg', 
      href: '/kitchen/modular',
      description: 'Explore our premium modular kitchen collection'
    },
    { 
      id: 2, 
      title: 'L-Shaped Kitchen', 
      image: '/images/kitchen-2.jpg', 
      href: '/kitchen/l-shaped',
      description: 'Explore our premium l-shaped kitchen collection'
    },
    { 
      id: 3, 
      title: 'U-Shaped Kitchen', 
      image: '/images/kitchen-3.jpg', 
      href: '/kitchen/u-shaped',
      description: 'Explore our premium u-shaped kitchen collection'
    },
    { 
      id: 4, 
      title: 'Island Kitchen', 
      image: '/images/kitchen-4.jpg', 
      href: '/kitchen/island',
      description: 'Explore our premium island kitchen collection'
    },
  ],
  'Products': [
    { 
      id: 1, 
      title: '3D Design', 
      image: '/images/service-1.jpg', 
      href: '/services/3d-design',
      description: 'Explore our premium 3d design collection'
    },
    { 
      id: 2, 
      title: 'Installation', 
      image: '/images/service-2.jpg', 
      href: '/services/installation',
      description: 'Explore our premium installation collection'
    },
    { 
      id: 3, 
      title: 'Maintenance', 
      image: '/images/service-3.jpg', 
      href: '/services/maintenance',
      description: 'Explore our premium maintenance collection'
    },
  ],
  'Gallery': [
    { 
      id: 1, 
      title: 'Recent Projects', 
      image: '/images/gallery-1.jpg', 
      href: '/gallery/recent',
      description: 'Explore our premium recent projects collection'
    },
    { 
      id: 2, 
      title: 'Kitchen Gallery', 
      image: '/images/gallery-2.jpg', 
      href: '/gallery/kitchen',
      description: 'Explore our premium kitchen gallery collection'
    },
    { 
      id: 3, 
      title: 'Wardrobe Gallery', 
      image: '/images/gallery-3.jpg', 
      href: '/gallery/wardrobe',
      description: 'Explore our premium wardrobe gallery collection'
    },
    { 
      id: 4, 
      title: 'Living Room', 
      image: '/images/gallery-4.jpg', 
      href: '/gallery/living',
      description: 'Explore our premium living room collection'
    },
  ],
  'About': [
    { 
      id: 1, 
      title: 'Our Story', 
      image: '/images/about-1.jpg', 
      href: '/about/story',
      description: 'Explore our premium our story collection'
    },
    { 
      id: 2, 
      title: 'Our Team', 
      image: '/images/about-2.jpg', 
      href: '/about/team',
      description: 'Explore our premium our team collection'
    },
  ]
};

// Brand information
export const brandInfo = {
  logoSrc: '/logo-nomatic.png',
  logoAlt: 'Nomatic Kitchens & Wardrobes',
  companyName: 'Nomatic',
  tagline: 'Kitchens & Wardrobes'
};

// Contact information
export const contactInfo = {
  href: '/contact',
  label: 'Contact'
};
