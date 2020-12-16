import useSWR from 'swr'


const fetcher = (...args) => fetch(...args).then((res) => res.json());

/**
 * @returns {[worlds, loading, error]}
 */
export function useAlliance(id) {
    const { data, error } = useSWR(id ? `/api/alliance/${id}` : null, fetcher);
    console.log('R: /api/alliance/', id, { data, error });
    return [data, !data, error];
}

export default useAlliance;
