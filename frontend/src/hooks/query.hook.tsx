import { useMutation, useQueryClient, QueryKey, useQuery, QueryFunction, MutationFunction } from '@tanstack/react-query'

export const useCustomMutation = <TArguments, TResult>(func: MutationFunction<TResult, TArguments>, key: QueryKey) => {
    const queryClient = useQueryClient();
    return useMutation(func, {
        onSuccess: (data) => {
            console.log(`mutation data`, data);
        },
        onError: (error) => {
            process.env.NODE_ENV !== "production" && console.error(error);
        },
        onSettled: () => {
            queryClient.invalidateQueries(key);
        }
    });
};

export const useCustomQuery = <TArguments, TResult>(key: QueryKey, queryFunc: QueryFunction<TResult>, args: TArguments,) => {
    return useQuery([key, args], queryFunc)
}