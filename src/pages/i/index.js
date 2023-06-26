'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/router'
 
export default function noIndex() {
  const router = useRouter();
  useEffect(() => {
    router.push('/');
  }, [router]);
}