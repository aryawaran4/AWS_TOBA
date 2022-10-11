export interface TobaType{
    id_aws: string,
    start_datetime: string,
    end_datetime: string,
    data: TobaDataType[]
}

export interface TobaDataType{
    waktu: string,
    windspeed: string,
    winddir: string,
    temp: string,
    rh: string,
    pressure: string,
    rain: string,
    solrad: string,
    netrad: string,
    watertemp: string,
    waterlevel: string,
    ta_min: string,
    ta_max: string,
    pancilevel: string,
    pancitemp: string
}


export interface FormTobaType{
    id_aws : string
    start_datetime : string,
    end_datetime : string
}