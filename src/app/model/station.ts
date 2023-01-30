export interface Station {
    station_id: number,
    name: string,
    address: string,
    city: string,
    operator: string,
    capacity: number,
    coordinate_x: number,
    coordinate_y: number
}


export interface StationDetails {
    station_id: number,
    name: string,
    returned_journeys_total: number,
    departed_journeys_total: number,
    avg_return_distance: number,
    avg_departure_distance: number,
    address: string,
    city: string,
    operator: string,
    capacity: number,
    coordinate_x: number,
    coordinate_y: number
}