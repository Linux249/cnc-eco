import useSWR from 'swr';


const fetcher = (...args) => fetch(...args).then((res) => res.json());

/**
 * @returns {[worlds, loading, error]}
 */
export function usePlayer(id) {
    const { data, error } = useSWR(id ? `/api/player/${id}` : null, fetcher);
    console.log('R: /api/player/bases', id, { data, error });
    return [data, !data, error];
}

export default usePlayer;
