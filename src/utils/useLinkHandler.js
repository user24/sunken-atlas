// https://gist.github.com/devongovett/919dc0f06585bd88af053562fd7c41b7
// Turn all HTML <a> elements into client side router links, no special framework-specific <Link> component necessary!
// Example using the Next.js App Router.
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function useLinkHandler() {
  let router = useRouter();

  useEffect(() => {
    let onClick = e => {
      let link = e.target.closest('a');
      if (
        link &&
        link instanceof HTMLAnchorElement &&
        link.href &&
        (!link.target || link.target === '_self') &&
        link.origin === location.origin &&
        !link.hasAttribute('download') &&
        e.button === 0 && // left clicks only
        !e.metaKey && // open in new tab (mac)
        !e.ctrlKey && // open in new tab (windows)
        !e.altKey && // download
        !e.shiftKey &&
        !e.defaultPrevented
      ) {
        e.preventDefault();
        router.push(link.href);
      }
    };

    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
    };
  }, [router]);
}

export default useLinkHandler;