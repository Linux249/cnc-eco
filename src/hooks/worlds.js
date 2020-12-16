import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

/**
 * @returns {[worlds, loading, error]}
 */
export function useWorlds() {
    const { data, error } = useSWR('/api/user/worlds', fetcher);
    return [data?.worlds || [], !data, error];
}

export default useWorlds;
