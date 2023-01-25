export interface Journey {
    id: number,
    departure_time: string,
    return_time: string,
    departure_station_id: number,
    return_station_id: number,
    distance: number,
    duration: number
}
