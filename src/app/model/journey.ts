export interface Journey {
    id: number,
    departure_time: string,
    return_time: string,
    departure_station_name: string,
    return_station_name: string,    
    distance: number,
    duration: number
}

export interface JourneyDetails {
    id: number,
    departure_time: string,
    return_time: string,
    departure_station_name: string,
    return_station_name: string,    
    distance: number,
    duration: number,
    departure_station_coordinate_x: number,
    departure_station_coordinate_y: number,
    return_station_coordinate_x: number,
    return_station_coordinate_y: number
}

