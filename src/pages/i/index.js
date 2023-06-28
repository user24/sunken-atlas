import { useEffect } from 'react';
import { useRouter } from 'next/router'
 
export default function NoIndex() {
  const router = useRouter();
  useEffect(() => {
    router.push('/');
  }, [router]);
}