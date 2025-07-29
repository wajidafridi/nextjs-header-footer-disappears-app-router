// @ import dependencies
import { createNavigation } from 'next-intl/navigation';
// @ import component
import { routing } from './routing';

export const {
  Link,
  getPathname,
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} = createNavigation(routing);
