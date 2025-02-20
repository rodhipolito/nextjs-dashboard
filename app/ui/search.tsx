'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    console.log(`Searching... ${term}`);

    // Cria um novo objeto URLSearchParams com os parâmetros atuais
    const params = new URLSearchParams(searchParams);

    // Sempre define ou redefine o parâmetro 'page' para 1
    params.set('page', '1');

    // Atualiza o parâmetro 'query' com o termo de busca
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query'); // Remove o parâmetro se o termo estiver vazio
    }

    // Atualiza a URL com os novos parâmetros de busca
    replace(`${pathname}?${params.toString()}`);
  }, 300); // 300ms de delay

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value); // Chama a função de busca ao digitar
        }}
        defaultValue={searchParams.get('query')?.toString()} // Mantém o valor do input sincronizado com a URL
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
