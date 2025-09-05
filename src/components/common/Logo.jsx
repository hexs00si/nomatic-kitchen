import { brandInfo } from '@/data/navbar';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Reusable Logo Component
 * @param {number} width - Image width
 * @param {number} height - Image height  
 * @param {string} className - CSS classes for styling
 * @param {boolean} priority - Next.js Image priority prop
 * @param {boolean} isLink - Whether to wrap logo in Link component
 * @param {string} href - Link destination when isLink is true
 * @param {object} linkClassName - CSS classes for Link wrapper
 * @param {object} props - Additional props passed to Image component
 */
const Logo = ({ 
  width = 120, 
  height = 20, 
  priority = true,
  isLink = false,
  href = "/",
  linkClassName = "inline-block",
  ...props 
}) => {
  const logoElement = (
    <Image
      src={brandInfo.logoSrc}
      alt={brandInfo.logoAlt}
      width={width}
      height={height}
      priority={priority}
      {...props}
    />
  );

  if (isLink) {
    return (
      <Link href={href} className={linkClassName}>
        {logoElement}
      </Link>
    );
  }

  return logoElement;
};

export default Logo;
