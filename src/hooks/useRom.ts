// // hooks/useRom.ts - Force binary response
// import { useQuery } from "@tanstack/react-query";
// export const useRom = (url: string | null) => {
//   return useQuery({
//     queryKey: ['rom', url],
//     queryFn: async () => {
//       const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url!)}`;
      
//       const res = await fetch(proxyUrl, {
//         headers: {
//           'Accept': 'application/octet-stream, */*',
//         },
//       });
      
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
//       // Verify we got binary data, not HTML
//       const contentType = res.headers.get('content-type');
//       if (contentType?.includes('text/html')) {
//         throw new Error('Proxy returned HTML instead of ROM file');
//       }
      
//       return res.arrayBuffer();
//     },
//     enabled: !!url,
//     staleTime: Infinity,
//   });
// };