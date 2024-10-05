import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Location } from "../mocks/db";
export type paramsType = { location_name?: string, robot_id?: string, is_starred?: string; page:string} | undefined
export const useLocations = (params:paramsType) => {
    
    const queryClient = useQueryClient();
    const starredQuery = useQuery({
        queryKey: ['starredId'],
        queryFn: () => fetch(`/starred_location_ids`, {
            headers: {
                accept: 'application/json',
                'User-agent': 'learning app',
            },
                     
        }).then(response => response.json()),
        select: (data) => {
         
            return data.location_ids;
        }
    });
  const locationsQuery = useQuery<{ locations: Array<Location> }, Error>({
    queryKey: ['locations', params], // params를 쿼리 키에 포함하여 캐싱합니다.
    queryFn: async () => {
        const data = new URLSearchParams();
        Object.entries(params!).forEach(([key, value]) => {
            data.append(key, value);
        });

        

        // GET 요청일 경우 URL에 쿼리 매개변수를 추가해야 합니다.
        const response = await fetch(`/locations?${data.toString()}`, {
            headers: {
                accept: 'application/json',
                'User-agent': 'learning app',
            },
        });

     
      
        if (!response.ok) {
            const errorDetails = await response.text(); // 에러 메시지 상세 확인
            throw new Error(`Network response was not ok: ${errorDetails}`);
        }
        
        return response.json(); // JSON 데이터 반환
    },
    enabled: !!params,
});
 
    const addStarredLocation = useMutation({
        mutationFn: (starredIds:number) =>  fetch('/starred_location_ids', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json', // 요청 본문 형식 지정
                },
                body: JSON.stringify(starredIds), // JSON 형태로 요청 본문 설정
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['locations'] })
            queryClient.invalidateQueries({ queryKey: ['starredId'] })
        }
    })
    return {starredQuery,locationsQuery,addStarredLocation}
}