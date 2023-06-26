'use client';

import { useRouter } from "next/router";
import Main from "@/app/main";

export default function Home() {
  const router = useRouter();
  const islandString = router.query.string;
    return <Main islandString={islandString} />;
}