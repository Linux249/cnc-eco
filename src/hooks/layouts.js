
import useSWR from 'swr'


const fetcher = (...args) => fetch(...args).then((res) => res.json());

/**
 * @returns {[worlds, loading, error]}
 */
export function useLayouts(id, limit, sort) {
    const { data, error } = useSWR(id ? `/api/layouts/${id}?limit=${limit}&skip=0&sort=${sort}` : null, fetcher);
    console.log('R: /api/layouts/', id, { data, error });
    return [data, !data, error];
}

export default useLayouts;
